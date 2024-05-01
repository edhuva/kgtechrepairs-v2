import { Outlet } from "react-router-dom";
import BackToTopButton from "../components/backToTop/BackToTopButton";

//Layout
const Layout = () => {
    return (
        <>
            <Outlet />
            <BackToTopButton />
        </>
    )
}

export default Layout