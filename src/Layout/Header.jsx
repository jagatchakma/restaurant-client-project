import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCart from '../hooks/useCart';

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigator = useNavigate();

    const [cart] = useCart();

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                navigator('/login');
                Swal.fire({
                    title: "Logged out successfully!",
                    icon: "success",
                    draggable: true
                });
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    }
    const navOptions =
        <>
            <li><Link to="/menu">Our menu</Link></li>
            <li><Link to="/order/salad">Order</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/register2">Register2</Link></li>
            <li><Link to="/secret">Secret test</Link></li>
            <li><span>{user?.displayName}</span> </li>
            <li>
                <Link to="/dashboard/dashboard-cart">
                    <button className="btn">
                        <AiOutlineShoppingCart className='text-xl' />
                        <div className="badge badge-sm badge-secondary">+{cart.length}</div>
                    </button>
                </Link>
            </li>
            <li><Link to="/dashboard">DB</Link></li>
        </>
    // console.log(user);
    return (
        <div className="navbar fixed z-10  max-w-screen-xl text-white bg-black opacity-60 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">Resturent project</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {/* <a className="btn">Button</a> */}
                {user ? <Link onClick={handleLogout} className="btn">LogOut</Link> : <Link to="/login" className="btn">Login</Link>}
            </div>
        </div>
        // <header style={styles.header}>
        //     <div style={styles.logo}>🍽️ Restaurant</div>
        //     <nav style={styles.nav}>
        //         <button style={styles.button}>Home</button>
        //         <button style={styles.button}>Menu</button>
        //         <button style={styles.button}>Contact</button>
        //     </nav>
        // </header>
    );
};
// ......................................................................................................
// const styles = {
//     header: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: '16px 32px',
//         backgroundColor: '#fff',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//     },
//     logo: {
//         fontSize: '1.5rem',
//         fontWeight: 'bold',
//         letterSpacing: '1px',
//     },
//     nav: {
//         display: 'flex',
//         gap: '16px',
//     },
//     button: {
//         padding: '8px 20px',
//         fontSize: '1rem',
//         border: 'none',
//         borderRadius: '4px',
//         background: '#f5f5f5',
//         cursor: 'pointer',
//         transition: 'background 0.2s',
//     },
// };

export default Header;