import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoadin] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoadin) {
        return <progress className='progress w-56'></progress>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to={'/login'} state={{ from: location }} replace> </Navigate>
};

export default AdminRoute;