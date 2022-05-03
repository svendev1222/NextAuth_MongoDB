import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {AiOutlineTablet} from "react-icons/ai"
import { useSWRConfig } from 'swr'
import LocationService from "../../components/services/LocationsService"
import CameraService from "../../components/services/CameraService"
import WebRelayService from "../../components/services/WebRelayService"


export default function AddKioskModal(props) {
    const { setOpen, open} = props;
    const [locations, setLocations] = useState([])
    const [cameras, setCameras] = useState([])
    const [webRelays, setWebRelays] = useState([])
    const cancelButtonRef = useRef(null)
    const {mutate} = useSWRConfig()
    const [allValues, setAllValues] = useState({
       name: '',
       location:'',
       camera_id:'',
       webrelay_id:''
       
    });

    
    const changeHandler = e => {
        setAllValues( prevValues => {
        return { ...prevValues,[e.target.name]: e.target.value}
        })
    }

 
    const handleAddItem = async(e) => {
        e.preventDefault();
        // console.log(contactInput.phone.length)
        if ( allValues.name === ''){
            return alert('Forgot To Add Name')
        }
        const url = '/api/kiosks';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               name: allValues.name,
               location: allValues.location,
               camera_id: allValues.camera_id,
               webrelay_id:allValues.webrelay_id
            })
        })
        .then(function (res) {
            // if(res.ok){
                return res.json()
            // }
            // `data` is the parsed version of the JSON returned from the above endpoint.
        }).then(function (data) {
            if(data.success){
                mutate('/api/kiosks')
                setOpen(false)
            }
        }).catch((err) => {
            console.log(err)
          });
        }

        const getAllLocation = async () => {
            const res = await LocationService.getAllLocation ()
            setLocations(res.data.locations)
        }
        const getAllCameras = async () => {
            const res = await CameraService.getAllCamera ()
            setCameras(res.data.cameras)
        }
        const getAllWebRelays = async () => {
            const res = await WebRelayService.getAllWebRelay ()
            setWebRelays(res.data.webrelays)
        }
        useEffect(() => {
            getAllLocation()
            getAllCameras()
            getAllWebRelays()
        }, [])
    return (
            <div>
                <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
        
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                    </span>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div>
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <AiOutlineTablet className="h-6 w-6 text-green-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Add Kiosk
                                </Dialog.Title>
                                <div className="mt-4">
                                    <div>
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                       Kiosk Name
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                        Name
                                            </span>
                                            <input
                                            type="text"
                                            onChange={changeHandler}
                                            name="name"
                                            id="name"
                                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                            placeholder="Example: Lobby Kiosk"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div>
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                       Kiosk Location
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                        <select
                                        id="location"
                                        name="location"
                                        onChange={changeHandler}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        defaultValue="none"
                                    >
                                        <option value="">None</option>
                                        {locations.map((location) => (
                                            <option key={location._id}>{location.name}</option>
                                        ))}
                                    
                                    </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div>
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                       Kiosk Camera
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                        <select
                                        id="location"
                                        name="camera_id"
                                        onChange={changeHandler}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        defaultValue="none"
                                    >
                                        <option value="">None</option>
                                        {cameras.map((cam) => (
                                            <option key={cam._id } value={cam._id}>{cam.name}</option>
                                        ))}
                                    
                                    </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div>
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                       Kiosk Controller
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                        <select
                                        id="webrelay"
                                        name="webrelay_id"
                                        onChange={changeHandler}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        defaultValue="none"
                                    >
                                        <option value="">None</option>
                                        {webRelays.map((webrelay) => (
                                            <option key={webrelay._id} value={webrelay._id}>{webrelay.name }</option>
                                        ))}
                                    
                                    </select>
                                        </div>
                                    </div>
                                </div>
           
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                onClick={(e) => handleAddItem(e)}
                            >
                            Add Kiosk
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                onClick={() => setOpen(false)}
                                ref={cancelButtonRef}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    </Transition.Child>
                </div>
                </Dialog>
            </Transition.Root>
            </div>
    )
}
