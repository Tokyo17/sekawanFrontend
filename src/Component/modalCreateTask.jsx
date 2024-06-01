import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useContext, useState } from "react"
import Label from "./label"
import { gql, useMutation } from "@apollo/client"
import { MyContext } from "../MyContext"



const INSERT_TASK=gql`
mutation MyMutation($task: String = "", $level: String = "") {
    insert_task(objects: {task: $task, level: $level}) {
      returning {
        level
        task
      }
    }
  }
   
  `

const ModalCreateTask=({isOpen,setIsopen,get_task})=>{

    const [level,setLevel]=useState('NON_URGENT')
    const [task,setTask]=useState('')


    const [insert_task,{data,loading,error}]=useMutation(INSERT_TASK,{
        onCompleted:()=>{
            console.log(data)
            get_task()
            setIsopen(false)
        },
        onError:()=>{
            console.log(error)
        }
    })
    const changeLevel=(e)=>{
        // console.log(e.target.value)
        setLevel(e.target.value)
    }

      const submit=()=>{
        insert_task({
            variables:{
                task:task.charAt(0).toUpperCase() + task.slice(1),
                level:level
            }
        })
      }

      
    const { state, setState } = useContext(MyContext);
    
    const style={
        backgroundText:{
            background:state?"#363740":"",
        color:state?"white":""
        },
        text:{
             color:state?"white":""
        },
        textInput :{
            color:"black"
        }
    }
    return(
        <Dialog open={isOpen} onClose={() => setIsopen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel style={style.backgroundText} className="max-w-lg space-y-4 border rounded bg-white p-12">
            <div>
                <label style={style.text} class="block text-gray-700 text-sm font-bold mb-2">Enter Task :</label>
                <input
                     style={style.textInput}
                    type="text"
                    id="inputText"
                    name="inputText"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type here..."
                    onChange={(e)=>setTask(e.target.value)}
                />
            </div>
            <div className="flex justify-center mt-[-20px]">
                                        <input checked={level == 'URGENT'} onChange={changeLevel} value="URGENT" type="radio" id="age1" name="age"/>
                                        <label  htmlFor="age1" className="m-2"><Label name="URGENT"/></label>
                                        <input checked={level == "NON_URGENT"} onChange={changeLevel}  value="NON_URGENT"   type="radio" id="age2" name="age"/>
                                        <label  htmlFor="age2" className="m-2"><Label name="NON_URGENT"/></label> 
                                        <input checked={level == 'OPTIONAL'} onChange={changeLevel}  value="OPTIONAL"   type="radio" id="age3" name="age"/>
                                        <label htmlFor="age3" className="m-2"><Label name="OPTIONAL"/></label><br/>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={submit} className="me-6 bg-blue-500  px-4 py-2 flex rounded text-white " >Submit</button>
              <button onClick={()=>setIsopen(false)} className=" bg-slate-500  px-4 py-2 flex rounded text-white " >Cancel</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    )
}

export default ModalCreateTask