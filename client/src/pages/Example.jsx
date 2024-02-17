/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import Card from "../adminComponents/Card";
import { Table } from 'flowbite-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [anylytics, setAnylytics] = useState(null);
  const [demography, setDemography] = useState(null);
  const [getData, setData] = useState("totalVisitors");
  const [visitor, setVisitor] = useState(null);
  const [activeCard, setActiveCard] = useState(0);


  const handleClick = (key, idx) => {
    setData(key);
    setActiveCard(idx);
  };
  useEffect(() => {
    const fetchVisitors = async () => {
      if (getData === "Total_Visitors") {
        try {
          const res = await fetch("/api/visitor/");
          const data = await res.json();
          if (res.ok) {
            setVisitor(data.visitors);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchVisitors();
  }, [getData]);

  useEffect(() => {
    const fetchAnylytics = async () => {
      try {
        const res = await fetch("/api/admin/anylytics");
        const data = await res.json();
        setAnylytics(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnylytics();
  }, []);
  useEffect(() => {
    const fetchAnylytics = async () => {
      try {
        const res2 = await fetch("/api/admin/demography");
        const data2 = await res2.json();
        setDemography(data2);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnylytics();
  }, []);
  let [categories] = useState({
    Anylytics: [

    ],
    Demography: [

    ],
    Download: [

    ],
  });
  return (
    <>
      <div className="w-full max-w-7xl px-2 sm:px-0">
        <Tab.Group onChange={(index) => {
          setActiveCard(index);
        }}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
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
                        <Card moreClasses={activeCard === idx ? "bg-blue-300" : ""}  >
                          <p className=''>{Object.keys(a)}</p>
                          <span>{Object.values(a)}</span>
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
                <li className="relative rounded-md p-3 hover:bg-gray-100">
                  <div className='mx-auto p-3 flex justify-between flex-wrap gap-8 py-7'>
                    {demography?.map((a, idx) => (
                      <div key={idx} onClick={() => handleClick(Object.keys(a)[0], idx)}>
                        <Card moreClasses={activeCard === idx ? "bg-blue-300" : ""}  >
                          <p className=''>{Object.keys(a)}</p>
                          <span>{Object.values(a)}</span>
                        </Card>
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div >
      {getData === "Total_Visitors" && visitor?.length > 0 ? (
        <div className="table-auto  md:mx-auto p-3  scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

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
      ) : (
        <p className='mx-auto'>You have no user yet </p>
      )
      }


    </>
  );
}
