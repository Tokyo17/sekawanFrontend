
const Label=({name})=>{
        if(name=="LOW"||name=="URGENT"){
            return(
            <span className="w-fit px-3 py-1 rounded-lg font-medium  text-xs bg-yellow-500 text-white p-2 rounded-md ">
                    {name}
             </span>
            )
        }else if(name=="NORMAL"||name=="NON_URGENT"||name=="APPROVE"){
            return(
            <span className="w-fit px-3 py-1 rounded-lg font-medium  text-xs bg-green-700 text-white p-2 rounded-md ">
                    {name}
             </span>
            )
        }else if(name=="HIGH"||name=="REJECT"){
            return(
            <span className="w-fit px-3 py-1 rounded-lg font-medium  text-xs bg-red-500 text-white p-2 rounded-md ">
                    {name}
             </span>
            )
        }else if(name=="ALL"||name=="OPTIONAL"||name=="NOT YET"){
            return(
            <span className="w-fit px-3 py-1 rounded-lg font-medium  text-xs bg-slate-500 text-white p-2 rounded-md ">
                    {name}
             </span>
            )
        }

    
}

export default Label