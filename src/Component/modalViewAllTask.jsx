import { Dialog, DialogPanel } from "@headlessui/react";
import { useContext, useState } from "react";
import { MyContext } from "../MyContext";
import { Icon } from "../Layout/icon";
import Label from "./label";

const ModalViewAllTask = ({ isOpen, setIsopen, dataTask }) => {
    const { state, setState } = useContext(MyContext);
    const [searchQuery, setSearchQuery] = useState("");

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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredTasks = dataTask?.task.filter((v) => 
        v.task.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Dialog open={isOpen} onClose={() => setIsopen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel style={style.backgroundText} className="max-w-lg space-y-4 border rounded bg-white p-12">
                    <div className='bottom-list'>
                        <input
                            style={style.textInput}
                            type="text"
                            id="inputText"
                            name="inputText"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Type here..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="viewTask">
                        {filteredTasks?.map((v, i) => {
                            return (
                                <div className='bottom-list' key={i}>
                                    <p className="w-40">{v.task}</p>
                                    <p><Label name={v.level} /></p>
                                </div>
                            );
                        })}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default ModalViewAllTask;
