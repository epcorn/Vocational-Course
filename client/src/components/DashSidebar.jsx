import { Sidebar } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HiArrowCircleRight, HiShoppingBag } from "react-icons/hi";
import { GiBookshelf } from "react-icons/gi";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Sidebar className="w-full wd:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
            <Link to="/dashboard/dash?tab=settings">
              <Sidebar.Item
                active={tab === "settings"}
                icon={HiArrowCircleRight}
                label={currentUser.isAdmin ? "Admin" : "Student"}
                labelColor="dark"
                as="div"
              >
                Settings
              </Sidebar.Item>
            </Link>
            <Sidebar.Collapse icon={HiShoppingBag} label="Resource">
              <Link to="/dashboard/dash?tab=resource">
                <Sidebar.Item
                  active={tab === "resource"}
                  icon={GiBookshelf}
                  labelColor="dark"
                  as="div"
                >
                  Pdf&apos;s
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard/dash?tab=videos">
                <Sidebar.Item
                  active={tab === "videos"}
                  icon={GiBookshelf}
                  labelColor="dark"
                  as="div"
                >
                  Videos
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard/dash?tab=books">
                <Sidebar.Item
                  active={tab === "books"}
                  icon={GiBookshelf}
                  labelColor="dark"
                  as="div"
                >
                  Books
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard/dash?tab=ppts">
                <Sidebar.Item
                  active={tab === "ppts"}
                  icon={GiBookshelf}
                  labelColor="dark"
                  as="div"
                >
                  PPTS
                </Sidebar.Item>
              </Link>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
