import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register');
    return (
        <div>
            {!noHeaderFooter && <Header></Header>}
            {/* {noHeaderFooter || <Header></Header>}   same as {!noHeaderFooter && <Header></Header>} */}
            <Outlet></Outlet>
            {!noHeaderFooter && <Footer></Footer>}
        </div>
    );
};

export default MainLayout;