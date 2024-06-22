import React, { useContext, useState } from 'react';
import { Context } from "../../main";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi"

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);
    const navigateto = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/user/logout",
                {
                    withCredentials: true
                });
            toast.success(response.data.message);
            setIsAuthorized(false);
            navigateto("/login")
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthorized(true);
        }
    };
    return (<>
        <nav className={isAuthorized ? "nanbarShow" : "navbarHide"}>
            <div className='container'>
                <div className='logo'>
                    <img src='JobZee-logos__white.png' alt="logo" />
                </div>
                <ul className={!show ? "menu" : "show-menu menu"}>
                    <li>
                        <Link to={"/"} onClick={() => setShow(false)}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/job/getall"} onClick={() => setShow(false)}>ALL JOBS</Link>
                    </li>
                    <li>
                        <Link to={"/application/me"}
                            onClick={() => setShow(false)}>
                            {
                                user && user.role === "Employer" ?
                                    "APPLICANT'S APPLICATIONS" : "MyApplication"
                            }
                        </Link>
                    </li>
                    {
                        user && user.role === "Employer" ? (
                            <>
                                <li>
                                    <Link to={"/job/post"}
                                        onClick={() => setShow(false)}>
                                        POST NEW JOBS</Link>
                                </li>
                                <li>
                                    <Link to={"/job/me"}
                                        onClick={() => setShow(false)}>
                                        VIEW YOUR JOBS</Link>
                                </li>
                            </>
                        ) : (
                            <></>
                        )}
                    <button onClick={handleLogout}>LOGOUT</button>
                </ul>
                <div className='hamberger'>
                    <GiHamburgerMenu onClick={() => setShow(!show)} />
                </div>
            </div>
        </nav >
    </>
    );
};

export default Navbar