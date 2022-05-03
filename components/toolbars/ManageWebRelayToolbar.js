import { useState } from "react";
import AddWebRelaySideModal from "../modal/AddWebRelaySideModal";

export default function ManageWebRelayToolbar(props) {
    const [showAddItem, setShowAddItem] = useState(false);

    return (
        <div className="sm:flex sm:flex-row  md:items-center md:justify-between bg-black px-2 py-3 lg:px-8">
            <AddWebRelaySideModal open={showAddItem} setOpen={setShowAddItem} />
        <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">Manage Doors</h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
            {/* <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
            Edit
            </button> */}
            <button
            onClick={() => setShowAddItem(true)}
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
            Add WebRelay
            </button>
        </div>
    </div>
    )
}
