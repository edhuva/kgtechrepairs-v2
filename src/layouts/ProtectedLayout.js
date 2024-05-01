import { Outlet } from "react-router-dom";
import DashNavbar from "../components/dashNavbar/DashNavbar";
import Footer from "../components/footer/Footer";

//Protected Layout
const ProtectedLayout = () => {
  return (
    <>
      <DashNavbar />
      <section className="main__dash--section main__section-margin">
        <Outlet />
      </section>
      <Footer />
    </>
  )
}

export default ProtectedLayout
