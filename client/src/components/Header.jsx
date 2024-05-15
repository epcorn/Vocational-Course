import { Link, useLocation } from "react-router-dom";
import { Button } from "flowbite-react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import Notice from "./Notice";
import { useEffect, useState } from "react";
import { StudentBtn } from "./StudentBtn";
import { useSelector } from "react-redux";
import CustomModal from "./CustomModal";
import { Table } from "flowbite-react";
import PopUp from "./PopUp";

export function Header() {
  const [links, setLinks] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [meritModel, setMeritModel] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [popUp, setPopUp] = useState(false);
  const [code, setCode] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch("/api/links");
      const data = await res.json();
      if (res.ok) {
        setLinks(data);
      }
    };
    fetchLinks();
  }, []);
  async function handleClick() {
    await fetch("/api/admins/incProspectusViews");
  }

  return (
    <header className="relative z-50 lg:pt-4 ">
      <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
          <Link to="/">
            <Logo className="h-12 w-auto text-slate-900" />
          </Link>
        </div>
        <div className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm text-blue-600  sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
          <div className="mx-auto flex items-center gap-4 px-4 font-semibold md:text-xl">
            {currentUser?.student ? (
              "Welcome"
            ) : (
              <Button href="/admission">Application Form</Button>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <div className=" mt-10 flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
            <a
              href={links?.prospectus.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="bg-pink-500 hover:bg-pink-400"
                onClick={handleClick}
              >
                Prospectus
              </Button>
            </a>
          </div>
          <div className=" mt-10 flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
            <StudentBtn />
          </div>
          {/* <div className="mt-10 flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
            <MeritListBtn links={links?.meritList} />
          </div> */}
          {location.pathname === "/" && (
            <div className="mt-10 flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
              <Button className="buttonkp" onClick={() => setMeritModel(true)}>
                Merit List
              </Button>
            </div>
          )}
          {currentUser?.student || currentUser?.isAdmin ? (
            ""
          ) : (
            <div className="flex items-center justify-center">
              <Link to="/admin/login">
                <div className=" flex flex-col  justify-center items-center ">
                  <span className="w-1 h-1  rounded-full bg-black mt-[0.8px]"></span>
                  <span className="w-1 h-1  rounded-full bg-black mt-[0.8px]"></span>
                  <span className="w-1 h-1  rounded-full bg-black mt-[0.8px]"></span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </Container>

      <CustomModal
        isOpen={meritModel}
        onClose={() => setMeritModel(!meritModel)}
        heading={
          <div className="flex items-center justify-center gap-10">
            <span>Merit List</span>
            <span className="text-red-600">
              Please check you email for Passcode
            </span>
          </div>
        }
        size="3xl"
      >
        <div className=" overflow-x-auto ">
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Lastname</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {links?.meritList.length > 0 &&
                links.meritList.map((stud) => (
                  <Table.Row key={stud._id}>
                    <Table.Cell>{stud.details.firstName}</Table.Cell>
                    <Table.Cell>{stud.details.lastName}</Table.Cell>
                    <Table.Cell>
                      {stud.details.donePayment ? (
                        <>
                          <span
                            className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
                            style={{ fontSize: "30px" }}
                          >
                            &#127881;
                          </span>
                          <span className="text-gray-900 bold">
                            Successfully Admitted
                          </span>
                          <span
                            className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
                            style={{ fontSize: "30px" }}
                          >
                            &#127881;
                          </span>
                        </>
                      ) : (
                        <PopUp
                          click={popUp}
                          code={code}
                          setCode={setCode}
                          ogCode={stud.code}
                          to={`meritList/${stud._id}`}
                          parentModel={() => setMeritModel(!meritModel)}
                        />
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </CustomModal>
      {currentUser?.student || currentUser?.isAdmin ? "" : <Notice />}
    </header>
  );
}
