import { FaGoogle } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    // const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const axiosPublic = useAxiosPublic();

    const handleLoginWithGoogle = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                const loginUserInfo = {
                    email: loggedUser?.email,
                    name: loggedUser?.displayName,
                }
                axiosPublic("/users", {
                    method: "POST",
                    data: loginUserInfo
                }).then(res => {
                    navigate(from, { replace: true });
                    Swal.fire({
                        title: "Logged in successfully!",
                        icon: "success",
                        draggable: true
                    });
                })

            })
            .catch(error => {
                console.error('Login error:', error);
            });
    }
    return (
        <div className='my-4'>
            <button onClick={handleLoginWithGoogle} className="btn btn-outline btn-primary">
                <FaGoogle />
                with google
            </button>
        </div>
    );
};

export default SocialLogin;