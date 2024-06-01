import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"


const Avatar=({dataLogin})=>{
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
                    <a className="block rounded-lg py-2 px-3 transition " href="#">
                    <p className="font-semibold ">Insights</p>
                    <p className="">Measure actions your users take</p>
                    </a>
                </div>
                </PopoverPanel>
        </Popover>
    )
}

export default Avatar