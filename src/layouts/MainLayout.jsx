import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <ToastContainer  position="top-center"/>
        </div>
    );
};

export default MainLayout;