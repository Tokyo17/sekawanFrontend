import Label from "./label"
import ModalCreateTickets from "./modalCreateTickets"

const Tabel=({data,isOpen,setIsopen,setDataApprove,dataLogin})=>{
    return(
        
        <div className="content  h-4/5">


        {data?.map(v=>(
                      
        <div className="tabel flex mb-5 small-tabel">
            {/* <ModalCreateTickets   isOpen={isOpen} setIsopen={setIsopen}/> */}
                <div>             
                     <div className="h-[50px] w-[50px] mr-2.5 rounded-full overflow-hidden flex justify-center items-center">
                            <img className="transform scale-150"  src={v.url} />
                     </div>
                 </div>
                 <div className="flex-1 ms-3">
                    <div className="flex i gap-3">
                        <div className="">
                            <p className="font-semibold">{v.name}</p>
                            <p className="text-sm mt-[-3px] text-gray-400">25 mei 2024</p>
                        </div>
                        <div>
                            <Label name={v.priority}/>  
                        </div>
                    </div>
                    <div>
                       {v.tickets}
                    </div>
                 </div>
        
        
        </div>
         ))} 
        
        
        
        <table className="big-tabel">
          <tr>
            <th>Tickets details</th>
            <th>Customer name</th>
            <th>Date</th>
            <th>Priority</th>
          </tr>
          
            {data?.map(v=>(
                <tr onClick={()=>{
                    if(dataLogin.level=="admin"){
                    setIsopen(true)
                    setDataApprove(v)
                    }
                }}>
                    
                <td>
                    <div className="flex h-10 items-center">
                        <div className="h-[50px] w-[50px] mr-2.5 rounded-full overflow-hidden flex justify-center items-center">
                            <img className="transform scale-150"  src={v.url} />
                        </div>

                        <span className="ms-5">{v.tickets}</span>
                    </div>
                </td>
                <td>{v.name}</td>
                <td>{v.date}</td>
                <td> 
                    <Label name={v.priority}/>
                </td>
            </tr>
            ))}
        
        </table> 
                            </div>
    )
}

export default Tabel