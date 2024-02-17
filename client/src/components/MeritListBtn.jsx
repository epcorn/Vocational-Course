import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export function MeritListBtn({ links }) {
    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center rounded-2xl bg-yellow-400 px-4 py-3 whitespace-nowrap text-base font-semibold text-white hover:bg-yellow-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70">
                        Merit List
                        <DownArrow />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y z-50 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            {links?.map((link, idx) => (
                                <Menu.Item key={idx}>
                                    {({ active }) => (
                                        <a href={link} target="_blank" rel="noopener noreferrer">
                                            <button
                                                className={`${active ? 'bg-yellow-100 text-slate-500' : 'text-gray-900'
                                                    } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <Document className="text-yellow-200" />
                                                {`Merit List ${idx + 1}`}
                                            </button>
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div >
    );
}


function DownArrow(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
        </svg>
    );
}

function Document(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
        </svg>

    );
}



