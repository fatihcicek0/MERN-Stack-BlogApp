import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation";
import './home.css'
export default function Layout() {
    return (
        <div className="container-home" >
            <Navigation />
            <Outlet />
        </div>
    )
}