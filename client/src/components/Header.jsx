import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";
import Notice from "./Notice";
import { useEffect, useState } from "react";
import { MeritListBtn } from "./MeritListBtn";
import { StudentBtn } from "./StudentBtn";
import { useSelector } from "react-redux";

export function Header() {
  const [links, setLinks] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
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
            {currentUser?.student ? "Welcome" : <Button href="/admission">Application Form</Button>}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
            <a href={links?.prospectus.link} target="_blank" rel="noopener noreferrer">
              <Button
                className="bg-pink-500 hover:bg-pink-400"
                onClick={handleClick}
              >
                Prospectus
              </Button>
            </a>
          </div>
          <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
            <StudentBtn />
          </div>
          <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
            <MeritListBtn links={links?.meritList} />
          </div>
          {
            (currentUser?.student || currentUser?.isAdmin) ? "" : (<div className="flex items-center justify-center">
              <Link to="/admin/login">
                <div className=" flex flex-col  justify-center items-center ">
                  <span className="w-1 h-1  rounded-full bg-black mt-[0.8px]"></span>
                  <span className="w-1 h-1  rounded-full bg-black mt-[0.8px]"></span>
                  <span className="w-1 h-1  rounded-full bg-black mt-[0.8px]"></span>
                </div>
              </Link>
            </div>)
          }
        </div>
      </Container>
      {
        (currentUser?.student || currentUser?.isAdmin) ? "" : <Notice />
      }
    </header>
  );
}
