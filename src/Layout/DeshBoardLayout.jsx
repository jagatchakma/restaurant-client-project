import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBasketShopping } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { RiChatHistoryFill } from "react-icons/ri";
import { MdReviews } from "react-icons/md";
import { RiHomeOfficeFill } from "react-icons/ri";
import { ImSpoonKnife } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLibraryBooks } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import useAdmin from '../hooks/useAdmin';

const DeshBoardLayout = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className='flex'>
            {/* Deshboard sidebar section */}
            <div className='w-64 min-h-screen bg-orange-500'>
                <div className='flex flex-col items-center m-5'>
                    <h2 className='text-2xl font-bold tracking-wide'>Restaurant</h2>
                    <p className='text-xl tracking-[0.5em]'>project</p>
                </div>
                {/* Sidebar item list */}
                <ul className='menu m-2'>
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/admin-home">
                                        <IoHome className='inline-block mr-2' />
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/additems">
                                        <ImSpoonKnife  className='inline-block mr-2' />
                                        Add Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-items">
                                        <GiHamburgerMenu className='inline-block mr-2' />
                                        Manage items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-bookings">
                                        <MdLibraryBooks className='inline-block mr-2' />
                                        Manage bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allUsers">
                                        <FaUsers className='inline-block mr-2' />
                                        All users
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/user-home">
                                        <IoHome className='inline-block mr-2' />
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <BsBookmarkCheckFill className='inline-block mr-2' />
                                        Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payment-history">
                                        <RiChatHistoryFill className='inline-block mr-2' />
                                        Payment history
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/dashboard-cart">
                                        <FaBasketShopping className='inline-block mr-2' />
                                        My Cart
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-review">
                                        <MdReviews className='inline-block mr-2' />
                                        Add Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-booking">
                                        <RiHomeOfficeFill className='inline-block mr-2' />
                                        My booking
                                    </NavLink>
                                </li>
                            </>
                    }

                    <hr className='text-white ' />
                    <li>
                        <NavLink to="/">
                            <IoHome className='inline-block mr-2' />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <IoHome className='inline-block mr-2' />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <IoHome className='inline-block mr-2' />
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <IoHome className='inline-block mr-2' />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Deshboard content section */}
            <div className='flex-1 m-8 p-8 bg-gray-100 rounded-xl'>
                <Outlet />
            </div>
        </div>
    );
};

export default DeshBoardLayout;