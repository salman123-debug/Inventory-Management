import React from 'react'
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import Hero from './Hero';
import User from './User';
import { FaListUl } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import ProductList from './ProductList';
import Addproduct from './Addproduct';
import Categorylist from './Categorylist';
import Addcategory from './Addcategory';
import { useNavigate } from 'react-router-dom';





function Dashboard() {
    const [showSidebar, setShowSidebar] = React.useState(true);
    const [sidebarIcon, setSidebarIcon] = React.useState(false);
    const [currentview, setCurrentview] = React.useState('home');
    const [activeMenu, setActiveMenu] = React.useState(null);
    const navigate = useNavigate();
    const toggleSubMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
        setSidebarIcon(!sidebarIcon);
    };

    const handleClick = (view) => {
        setCurrentview(view);
    };

    const renderView = () => {
        switch (currentview) {
            case "Hero":
                return <Hero />;
            case "user":
                return <User />;
            case "productList":
                return <ProductList />;
            case "addProduct":
                return <Addproduct />;
            case "categoryList":
                return <Categorylist/>;
            case "addCategory":
                return <Addcategory/>;
            default:
                return <Hero />;
        }
    };

//logout handle by cookie

const handleLogout =async () => {
    try {
        const response = await fetch('http://localhost:8000/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    navigate('/Login');
        console.log(response);
    } catch (error) {
        console.error("Logout Error:", error.response?.data?.message || error.message);
        alert("Failed to log out. Please try again.");
    }
}


    return (
        <div>
            <div className="dashboard-container bg-slate-500 h-full w-full flex ">
                {showSidebar && <div className="dashboard-left h-full w-1/5 bg-gray-200 p-4">
                    <div className="logo-dashboard h-1/5 w-3/4 ">
                        <img src='./logo-light-full.png' alt='logo' className='w-full h-full' />
                    </div>
                    <div className="sidebar-content mt-5 ">
                        <ul className='flex flex-col gap-4'>

                            <li className='px-2 py-3 shadow-sm cursor-pointer rounded-md  hover:shadow-lg flex gap-3  items-center'
                                onClick={() => handleClick("Hero")}
                            > <MdDashboard className='h-6 w-6' />
                                Dashboard</li>

                            <li className='px-2 py-3 shadow-sm cursor-pointer rounded-md  hover:shadow-lg  flex gap-3  items-center'
                                onClick={() => handleClick("user")}
                            ><FaUser className='h-6 w-6' /> User</li>
                            <li className='px-2 py-3 shadow-sm cursor-pointer rounded-md  hover:shadow-lg flex gap-3  items-center '
                                onClick={() => toggleSubMenu("product")}
                            ><FaProductHunt className='h-6 w-6' />
                                Product {activeMenu === "product" ? <FaChevronUp className='h-4 w-4 ml-14' /> : <FaChevronDown className='h-4 w-4  ml-14' />}
                            </li>
                            {activeMenu === "product" && (
                                <ul className="pl-8  flex flex-col gap-2">
                                    <li
                                        className="px-2 py-2 shadow-sm cursor-pointer rounded-md hover:shadow-lg flex items-center gap-3"
                                        onClick={() => handleClick("productList")}
                                    ><FaListUl className='h-4 w-4' />

                                        Product List
                                    </li>
                                    <li
                                        className="px-2 py-2 shadow-sm cursor-pointer rounded-md hover:shadow-lg flex items-center gap-3"
                                        onClick={() => handleClick("addProduct")}
                                    ><IoMdAddCircleOutline className='h-4 w-4' />

                                        Add Product
                                    </li>
                                </ul>
                            )}
                            <li className='px-2 py-3 shadow-sm cursor-pointer rounded-md  hover:shadow-lg flex gap-3  items-center'
                                onClick={() => toggleSubMenu("category")}
                            > <BiSolidCategory className='h-6 w-6' />

                                Category
                                {activeMenu === "category" ? <FaChevronUp className='h-4 w-4 ml-12' /> : <FaChevronDown className='h-4 w-4  ml-12' />}
                            </li>
                            {activeMenu === "category" && (
                                <ul className="pl-8  flex flex-col gap-2">
                                    <li
                                        className="px-2 py-2 shadow-sm cursor-pointer rounded-md hover:shadow-lg flex items-center gap-3"
                                        onClick={() => handleClick("categoryList")}
                                    ><FaListUl className='h-4 w-4' />
                                        Category List
                                    </li>
                                    <li
                                        className="px-2 py-2 shadow-sm cursor-pointer rounded-md hover:shadow-lg flex items-center gap-3"
                                        onClick={() => handleClick("addCategory")}
                                    ><IoMdAddCircleOutline className='h-4 w-4' />
                                        Add Category
                                    </li>
                                </ul>
                            )}
                            <li className='px-2 py-3 shadow-sm cursor-pointer rounded-md  hover:shadow-lg flex gap-3  items-center'
                                onClick={handleLogout}
                            >
                                <IoLogOut className='h-6 w-6' />
                                Logout</li>
                        </ul>
                    </div>
                </div>}
                {sidebarIcon && <div className="dashboard-left h-full w-20 bg-gray-200 p-4">
                    <div className="logo-dashboard h-1/5 w-3/4">
                        <img src='./logo-light-streamline.png' alt='logo' className='w-full h-full' />
                    </div>
                    <div className="sidebar-content mt-5">
                        <ul className='flex flex-col gap-4'>
                            <li className='px-2 py-3 shadow-sm cursor-pointer rounded-md  hover:shadow-lg flex gap-3  items-center'
                                onClick={() => handleClick("Hero")}
                            > <MdDashboard className='h-6 w-6' />
                            </li>

                            <li className='px-2 py-3 shadow-sm cursor-pointer rounded-md  hover:shadow-lg  flex gap-3  items-center'
                                onClick={() => handleClick("user")}
                            ><FaUser className='h-6 w-6' /> </li>

                            <li
                                className="relative px-2 py-3 shadow-sm cursor-pointer rounded-md hover:shadow-lg flex gap-3 items-center group  "
                            ><FaProductHunt className='h-6 w-6' />
                                <ul className="absolute left-full top-0 hidden group-hover:block bg-gray-200 shadow-md rounded-md p-2 w-40 ">
                                    <li
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                                        onClick={() => handleClick("productList")}
                                    >
                                        Product List
                                    </li>
                                    <li
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                                        onClick={() => handleClick("addProduct")}
                                    >
                                        Add Product
                                    </li>
                                </ul>
                            </li>
                            <li className='relative px-2 py-3 shadow-sm cursor-pointer rounded-md  hover:shadow-lg flex gap-3  items-center group'> <BiSolidCategory className='h-6 w-6' />
                            {/*sub menu*/}
                                <ul className="absolute left-full top-0 hidden group-hover:block bg-gray-200 shadow-md rounded-md p-2 w-40">
                                    <li
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                                        onClick={() => handleClick("categoryList")}
                                    >
                                        Category List
                                    </li>
                                    <li
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                                        onClick={() => handleClick("addCategory")}
                                    >
                                        Add Category
                                    </li>
                                </ul>
                            </li>
                            <li className='px-2 py-3 shadow-sm cursor-pointer rounded-md  hover:shadow-lg flex gap-3  items-center'>
                                <IoLogOut className='h-6 w-6' />
                            </li>
                        </ul>
                    </div>
                </div>}
                {/* right panel header */}
                <div className='dashboard-right h-full w-full'>
                    <div className="dashboard-header h-full w-full py-5 flex justify-between px-5 bg-gray-200 border border-gray-400 shadow-lg">

                        <button
                            className="text-gray-700 hover:text-gray-900 focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 80"
                                width="40"
                                height="20"
                                className="fill-current transform transition-transform duration-300"
                            >
                                <rect
                                    className="origin-center transition-transform duration-300"
                                    width="100"
                                    height="20"
                                    rx="8"
                                ></rect>
                                <rect
                                    className="origin-center transition-transform duration-300"
                                    y="30"
                                    width="100"
                                    height="20"
                                    rx="8"
                                ></rect>
                                <rect
                                    className="origin-center transition-transform duration-300"
                                    y="60"
                                    width="100"
                                    height="20"
                                    rx="8"
                                ></rect>
                            </svg>
                        </button>

                    </div>
                    <div className="dashboard-content h-full w-full p-5 bg-white">
                        {renderView()}
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Dashboard
