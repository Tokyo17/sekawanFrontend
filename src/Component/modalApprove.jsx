import { Dialog, DialogPanel } from "@headlessui/react";
import { useContext, useState } from "react";
import { MyContext } from "../MyContext";
import { Icon } from "../Layout/icon";
import Label from "./label";
import { gql, useMutation } from "@apollo/client";


const UPDATE_TICKETS=gql`
mutation MyMutation($_eq: Int = 10, $status: Boolean = false) {
    update_tickets(where: {id: {_eq: $_eq}}, _set: {status: $status}) {
      returning {
        status
        id
      }
    }
  }
  `
const ModalApprove = ({ isOpen, setIsopen,data,reset }) => {
    const { state, setState } = useContext(MyContext);
    const [searchQuery, setSearchQuery] = useState("");
    const[update_tickets,{data:dataUpdate,loading}]=useMutation(UPDATE_TICKETS,{
        onCompleted:()=>{
            console.log(dataUpdate)
            reset()
            setIsopen(false)
        }
    })

    const style = {
        backgroundText: {
            background: state ? "#363740" : "",
            color: state ? "white" : ""
        },
        text: {
            color: state ? "white" : ""
        },
        textInput: {
            color: "black"
        }
    };

    const approve=()=>{
        update_tickets({
            variables:{
                _eq:data.id,
                status:true
            }
        })
    }
     const reject=()=>{
        update_tickets({
            variables:{
                _eq:data.id,
                status:false
            }
        })
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsopen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel style={style.backgroundText} className="max-w-lg space-y-4 border rounded bg-white p-12">
                    <div>
                        <div>
                             Status : <Label name={data.status==true?"APPROVE":data.status==false?"REJECT":"NOT YET"}/>
                        </div>

                        <div className=" flex mb-5 mt-5">
                            <div>             
                                <div className="h-[50px] w-[50px] mr-2.5 rounded-full overflow-hidden flex justify-center items-center">
                                        <img className="transform scale-150"  src={data.url} />
                                </div>
                            </div>
                            <div className="flex-1 ms-3">
                                <div className="flex i gap-3">
                                    <div className="">
                                        <p className="font-semibold">{data.name}</p>
                                        <p className="text-sm mt-[-3px] text-gray-400">{data.date}</p>
                                    </div>
                                    <div>
                                        <Label name={data.priority}/>  
                                    </div>
                                </div>
                                <div>
                                {data.tickets}
                                </div>
                            </div>
                        </div>
 
                       {data.status!=true&&data.status!=false&&<div className="flex gap-4 justify-center">
                            <button  onClick={approve} className="me-6 bg-blue-500  px-4 py-2 flex rounded text-white " >{loading?Icon.loadingS:"Approve"}</button>
                            <button onClick={reject} className=" bg-red-500  px-4 py-2 flex rounded text-white " >{loading?Icon.loadingS:"Reject"}</button>
                        </div>}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default ModalApprove;
