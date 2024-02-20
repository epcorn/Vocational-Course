/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import Card from "./Card";
import { Table } from 'flowbite-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../components/Loading';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs() {
  const [anylytics, setAnylytics] = useState(null);
  const [list, setList] = useState("Total_Visitors");
  const [visitor, setVisitor] = useState(null);
  const [totalApplicants, setTotalApplicants] = useState(null);
  const [finishedApplicants, setFinishedApplicants] = useState(null);
  const [demography, setDemography] = useState(null);
  const [passed10, setPassed10] = useState(null);
  const [passed12, setPassed12] = useState(null);
  const [graduate, setGraduate] = useState(null);
  const [isLoading, setLoading] = useState(false);


  const [activeCard, setActiveCard] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);


  const handleClick = (key, idx) => {
    setList(key);
    setActiveCard(idx);
  };
  useEffect(() => {
    const fetchAnylytics = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admins/anylytics");
        const data = await res.json();
        setAnylytics(data);
        setVisitor(data[1].list);
        setTotalApplicants(data[2].list);
        setFinishedApplicants(data[3].list);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    const fetchDemography = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admins/demography");
        const data = await res.json();
        setDemography(data);
        setPassed10(data[0].list);
        setPassed12(data[1].list);
        setGraduate(data[2].list);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    if (selectedIndex === 0) {
      fetchAnylytics();
    }
    if (selectedIndex === 1) {
      fetchDemography();
    }
  }, [selectedIndex]);

  const uploadDocument = async ({ file, eventId }) => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("eventId", eventId);
      form.append("image", file); // Append a single file
      await axios.post("/api/admins/documentUpload", form);
      setLoading(false);
      toast.success("Document Uploaded");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Document Upload Failed");
    }
  };


  const categories = ["Anylytics", "Demography", "Download/Upload"];

  return (
    <>
      <div className="w-full max-w-7xl px-2 sm:px-0">
        {isLoading && <Loading />}
        <ToastContainer position="top-center" autoClose={3000} />
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex} >
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-400 p-1">
            {categories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-slate-600 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-gray-100 p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none '
              )}
            >
              <ul>
                <li
                  className="relative rounded-md p-3 hover:bg-gray-100"
                >
                  <div className='mx-auto p-3 flex justify-between flex-wrap gap-8 py-7'>
                    {anylytics?.map((a, idx) => (
                      <div key={idx} onClick={() => handleClick(Object.keys(a)[0], idx)}>
                        <Card moreClasses={activeCard == idx ? "bg-blue-300" : ""}  >
                          <p className=''>{Object.keys(a)[0]}</p>
                          <span>{Object.values(a)[0]}</span>
                        </Card>
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </Tab.Panel>

            <Tab.Panel
              className={classNames(
                'rounded-xl bg-gray-100 p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none '
              )}
            >
              <ul>
                <li
                  className="relative rounded-md p-3 hover:bg-gray-100"
                >
                  <div className='mx-auto p-3 flex justify-between flex-wrap gap-8 py-7'>
                    {demography?.map((a, idx) => (
                      <div key={idx} onClick={() => handleClick(Object.keys(a)[0], idx)}>
                        <Card moreClasses={activeCard === idx ? "bg-blue-300" : ""}  >
                          <p className=''>{Object.keys(a)[0]}</p>
                          <span className='text-slate-600'>{Object.values(a)[0]}</span>
                        </Card>
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              {selectedIndex === 2 && totalApplicants?.length > 0 ? (
                <div className="table-auto  md:mx-auto p-3  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

                  <Table hoverable className=" shadow-lg ">
                    <Table.Head>
                      <Table.HeadCell>File Name</Table.HeadCell>
                      <Table.HeadCell>Upload</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                          Merit List
                        </Table.Cell>
                        <Table.Cell>
                          <div className="ml-10 md:w-64">
                            <div className="w-72">
                              <label
                                className="text-sm font-medium leading-none text-gray-800"
                                htmlFor='meritList'
                              >
                                Choose merit list
                                <span className="text-red-500 required-dot ml-0.5">
                                  *
                                </span>
                              </label>
                              <input
                                id="meritList"
                                type="file"
                                className="mt-1"
                                onChange={(e) =>
                                  uploadDocument({ file: e.target.files[0], eventId: e.target.id })
                                }
                              />
                            </div>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                          Prospectus
                        </Table.Cell>
                        <Table.Cell>
                          <div className="ml-10 md:w-64">
                            <div className="w-72">
                              <label
                                className="text-sm font-medium leading-none text-gray-800"
                                htmlFor='prospectus'
                              >
                                Choose Prospectus
                                <span className="text-red-500 required-dot ml-0.5">
                                  *
                                </span>
                              </label>
                              <input
                                id="prospectus"
                                type="file"
                                className="mt-1"
                                onChange={(e) =>
                                  uploadDocument({ file: e.target.files[0], eventId: e.target.id })
                                }
                              />
                            </div>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              ) : null}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      {selectedIndex === 0 && list === "Total_Visitors" && visitor?.length > 0 ? (
        <div className="table-auto overflow-x-scroll  md:mx-auto p-3 scrollbar  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
          <Table hoverable className=" shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
            </Table.Head>
            {visitor.map((v) => (
              <Table.Body key={v._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(v.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{v.email}</Table.Cell>
                  <Table.Cell>{v.phone}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      ) : null}

      {selectedIndex === 0 && list === "Total_Applicants" && totalApplicants?.length > 0 ? (
        <div className="table-auto overflow-x-scroll  md:mx-auto p-3 scrollbar  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

          <Table hoverable className=" shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Caste</Table.HeadCell>
            </Table.Head>
            {totalApplicants?.map((t) => (
              <Table.Body key={t._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(t.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{t.details.email === "" ? "null" : t.details.email}</Table.Cell>
                  <Table.Cell>{t.details.phone === "" ? "null" : t.details.phone}</Table.Cell>
                  <Table.Cell>{t.details.caste === "" ? "null" : t.details.caste}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      ) : null}

      {selectedIndex === 0 && list === "Finished_Applicants" && finishedApplicants?.length > 0 ? (
        <div className="table-auto  md:mx-auto p-3  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

          <Table hoverable className=" shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Caste</Table.HeadCell>
            </Table.Head>
            {totalApplicants.map((t) => (
              <Table.Body key={t._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(t.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{t.details.email === "" ? "null" : t.details.email}</Table.Cell>
                  <Table.Cell>{t.details.phone === "" ? "null" : t.details.phone}</Table.Cell>
                  <Table.Cell>{t.details.caste}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      ) : null}

      {selectedIndex === 1 && list === "Only_10_Passed" && passed10?.length > 0 ? (
        <div className="table-auto  md:mx-auto p-3  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
          <Table hoverable className=" shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Caste</Table.HeadCell>
            </Table.Head>
            {passed10?.map((p) => (
              <Table.Body key={p._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{p.details.firstName === "" ? "null" : p.details.name}</Table.Cell>
                  <Table.Cell>{p.details.email === "" ? "null" : p.details.email}</Table.Cell>
                  <Table.Cell>{p.details.phone === "" ? "null" : p.details.phone}</Table.Cell>
                  <Table.Cell>{p.details.caste}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      ) : null}

      {selectedIndex === 1 && list === "Till_12_Passed" && passed12?.length > 0 ? (
        <div className="table-auto  md:mx-auto p-3  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
          <Table hoverable className=" shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Caste</Table.HeadCell>
            </Table.Head>
            {passed12?.map((p) => (
              <Table.Body key={p._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{p.details.firstName === "" ? "null" : p.details.name}</Table.Cell>
                  <Table.Cell>{p.details.email === "" ? "null" : p.details.email}</Table.Cell>
                  <Table.Cell>{p.details.phone === "" ? "null" : p.details.phone}</Table.Cell>
                  <Table.Cell>{p.details.caste === "" ? "null" : p.details.caste}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      ) : null}

      {selectedIndex === 1 && list === "Graduate" && graduate?.length > 0 ? (
        <div className="table-auto  md:mx-auto p-3  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
          <Table hoverable className=" shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Caste</Table.HeadCell>
            </Table.Head>
            {graduate?.map((p) => (
              <Table.Body key={p._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{p.details.firstName === "" ? "null" : p.details.name}</Table.Cell>
                  <Table.Cell>{p.details.lastName === "" ? "null" : p.details.name}</Table.Cell>
                  <Table.Cell>{p.details.email === "" ? "null" : p.details.email}</Table.Cell>
                  <Table.Cell>{p.details.phone === "" ? "null" : p.details.phone}</Table.Cell>
                  <Table.Cell>{p.details.caste === "" ? "null" : p.details.phone}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      ) : null}


    </>
  );
}
