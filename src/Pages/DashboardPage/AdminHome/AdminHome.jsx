import React from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h1 className='text-2xl'>Welcome {user?.displayName ? user.displayName : "Admin"}  </h1>
        </div>
    );
};

export default AdminHome;