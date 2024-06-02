import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"


const Avatar=({dataLogin,setDataLogin})=>{
    return(
        <Popover>
            <PopoverButton className="text-sm/6 font-semibold  focus:outline-none   data-[focus]:outline-1 ">
            <img
                className={"rounded-full w-8 h-8 "}
                src={dataLogin.url}
                alt={"Picture"}
            />
            </PopoverButton>
                <PopoverPanel
                anchor="bottom end"
                className="divide-y rounded-xl bg-white z-50 shadow-md text-sm/6 mt-2"
                >
                <div className="p-3">
                    <button onClick={()=>setDataLogin({name:'',level:'',url:''})} className=" bg-red-500  px-4 py-2 flex rounded text-white " >Logout</button>
                </div>
                </PopoverPanel>
        </Popover>
    )
}

export default Avatar