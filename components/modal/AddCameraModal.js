import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useSWRConfig } from 'swr'
import LocationsService from '../services/LocationsService'
import AddCameraForm from '../forms/AddCameraForm'

export default function AddCameraModal({open, setOpen}) {
    const {mutate} = useSWRConfig()
    const cancelButtonRef = useRef(null)
    const [allValues, setAllValues] = useState({
        deviceName:'',
        deviceIp:'',
        devicePort:'',
        location:'',
        recording:'off',
        deviceUsername:'',
        devicePassword:'',
        deviceStreamPath:'',
        passthrough: true, 
        });
   
    const changeHandler = e => {
        setAllValues( prevValues => {
        return { ...prevValues,[e.target.name]: e.target.value}
        })
    }
  
    const handleRegisterCamera = async(e) => {
        e.preventDefault();
        if(allValues.deviceUsername === '' || allValues.devicePassword === ''){
          return alert('Username/Password cannot be empty')
        }
        const url = '/api/cameras/';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceName: allValues.deviceName,
                deviceLocation: allValues.location,
                deviceIp: allValues.deviceIp,
                devicePort: allValues.devicePort,
                deviceUsername: allValues.deviceUsername,
                devicePassword: allValues.devicePassword,
                deviceStreamPath: allValues.deviceStreamPath,
                passthrough: allValues.passthrough
            })
        })
        .then(function (res) {
              return res.json()
            // `data` is the parsed version of the JSON returned from the above endpoint.
        }).then(function (data) {
            if(data.success){
              mutate(`/api/cameras`)
              setOpen(false)
            }
            console.log(data)
        }).catch((err) => {
            console.log(err)
          });
      }
    
    return (
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full  sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-2xl">
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      {/* <Dialog.Title className="text-lg font-medium text-gray-900"> Panel title </Dialog.Title> */}
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                        <div>
                         
                          <AddCameraForm changeHandler={changeHandler} allValues={allValues} handleRegisterCamera={handleRegisterCamera} setOpen={setOpen} />
                        </div>
                        
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    )
}

