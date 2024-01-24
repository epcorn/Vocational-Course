import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import Admission from "./pages/Admission";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";

function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <div className="">
          <Outlet />
        </div>
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index="true" path="/" element={<Home />} />,
        <Route path="/admission" element={<Admission />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
