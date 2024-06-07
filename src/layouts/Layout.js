import { Outlet } from "react-router-dom";
import Whatsapp from "../components/Whatsapp/Whatsapp";
import BackToTopButton from "../components/backToTop/BackToTopButton";

//Layout
const Layout = () => {
    return (
        <>
            <Outlet />
            <Whatsapp />
            <BackToTopButton />
        </>
    )
}

export default Layout