import React from 'react';
import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h1>Welcome {user?.displayName ? user.displayName : "User"}</h1>
        </div>
    );
};

export default UserHome;