import { Outlet } from "react-router-dom";
import DashSideBar from "../components/dashSideBar/DashSideBar";
import DashHeader from "../components/dashheader/DashHeader";

//Dash Layout
const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <section className="main__section">
        <aside className="sideBar">
          <DashSideBar />
        </aside>

        <main className='main__section-padding content__section' >
         <Outlet />
        </main>
      </section>
    </>
  )
}

export default DashLayout