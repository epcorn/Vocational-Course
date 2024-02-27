import axios from "axios";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";


export function Resource() {
    const [resource, setResource] = useState(null);

    useEffect(() => {
        const fetchlinks = async () => {
            const res = await axios.get("/api/links");
            setResource(res.data.resources);
        };
        fetchlinks();
    }, []);

    return (
        <div className='w-full flex justify-evenly items-center gap-5 flex-wrap'>
            {
                resource?.map((res) => (
                    <a href={res.pdfLink} key={res._id} target="_blank" rel="noopener noreferrer">
                        <Card
                            className=" max-w-[200px]"
                            imgAlt={res.title}
                            imgSrc={res.img}
                        >
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {res.title}
                            </p>
                        </Card>
                    </a>
                ))
            }
        </div >
    );
}
