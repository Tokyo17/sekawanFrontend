import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useContext, useState } from "react"
import Label from "./label"
import { gql, useMutation } from "@apollo/client"
import { MyContext } from "../MyContext"
import { Icon } from "../Layout/icon"



const INSERT_TICKETS=gql`
mutation MyMutation($date: date = "", $name: String = "", $priority: String = "", $tickets: String = "", $url: String = "") {
    insert_tickets(objects: {date: $date, name: $name, priority: $priority, tickets: $tickets, url: $url}) {
      returning {
        name
        priority
        status
        tickets
        url
        date
        id
      }
    }
  }  
  `

const ModalCreateTickets=({isOpen,setIsopen,dataLogin,reset})=>{

    const [filter,setFilter]=useState('NORMAL')
    const [tickets,setTickets]=useState('')


    const [insert_tickets,{data,loading,error}]=useMutation(INSERT_TICKETS,{
        onCompleted:()=>{
            console.log(data)
            setIsopen(false)
            reset()
        },
        onError:()=>{
            console.log(error)
        }
    })
    const changeFilter=(e)=>{
        // console.log(e.target.value)
        setFilter(e.target.value)
    }
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const day = String(today.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      }
    
      const submit=()=>{
        insert_tickets({
            variables:{
                name:dataLogin.name,
                url:dataLogin.url,
                date:getCurrentDate(),
                priority:filter,
                tickets:tickets
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
        }
    }
    return(
        <Dialog open={isOpen||false} onClose={() => setIsopen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel style={style.backgroundText} className="max-w-lg space-y-4 border rounded bg-white p-12">
            <div>
                <label style={style.text} class="block text-gray-700 text-sm font-bold mb-2">Enter Tickets :</label>
                <input
                    type="text"
                    id="inputText"
                    name="inputText"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type here..."
                    onChange={(e)=>setTickets(e.target.value)}
                />
            </div>
            <div className="flex justify-center mt-[-20px]">
                                        <input checked={filter == 'HIGH'} onChange={changeFilter} value="HIGH" type="radio" id="age1" name="age"/>
                                        <label  htmlFor="age1" className="m-2"><Label name="HIGH"/></label>
                                        <input checked={filter == 'NORMAL'} onChange={changeFilter}  value="NORMAL"   type="radio" id="age2" name="age"/>
                                        <label  htmlFor="age2" className="m-2"><Label name="NORMAL"/></label> 
                                        <input checked={filter == 'LOW'} onChange={changeFilter}  value="LOW"   type="radio" id="age3" name="age"/>
                                        <label htmlFor="age3" className="m-2"><Label name="LOW"/></label><br/>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={submit} className="me-6 bg-blue-500  px-4 py-2 flex rounded text-white " >{loading?Icon.loadingS:"Submit"}</button>
              <button onClick={()=>setIsopen(false)} className=" bg-slate-500  px-4 py-2 flex rounded text-white " >{loading?Icon.loadingS:"Cancle"}</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    )
}

export default ModalCreateTickets