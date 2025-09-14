import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    let location = useLocation();

    if (loading) {
        return <div>
            <button className="btn btn-square">
                <span className="loading loading-spinner"></span>
            </button>
        </div>;
    }

    // return (
    //     <div>
    //         {children}
    //     </div>
    // );

    if (user) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;