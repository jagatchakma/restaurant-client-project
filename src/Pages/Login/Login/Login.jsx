import React, { useContext, useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, } from 'react-simple-captcha';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import SocialLogin from '../../../components/SocialLogin/SocialLogin';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();


    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
         // console.log('Email:', email);
        // console.log('Password:', password);

        // const captcha = form.captcha.value;
        // if (validateCaptcha(captcha)) {
        //     console.log('Captcha is valid');
        //     loginUser(email, password)
        //         .then(userCredential => {
        //             const loggedUser = userCredential.user;
        //             console.log('Logged in user:', loggedUser);
        //             navigate(from, { replace: true });
        //             Swal.fire({
        //                 title: "Logged in successfully!",
        //                 icon: "success",
        //                 draggable: true
        //             });
        //         })
        //         .catch(error => {
        //             console.error('Login error:', error);
        //         });
        // } else {
        //     console.log('Captcha is invalid');
        // }

        loginUser(email, password)
            .then(userCredential => {
                const loggedUser = userCredential.user;
                console.log('Logged in user:', loggedUser);
                navigate(from, { replace: true });
                Swal.fire({
                    title: "Logged in successfully!",
                    icon: "success",
                    draggable: true
                });
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="hero  min-h-screen">
                <div className="hero-content flex-col md:flex-row">
                    <div className="text-center lg:text-left md:w-1/2">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 md:w-1/2  shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" />
                                <div className='my-2'>
                                    <LoadCanvasTemplate />
                                    <input type="text" name='captcha' className="input my-2" placeholder="Type the text above" />
                                </div>
                                {/* <div>
                                <LoadCanvasTemplateNoReload />
                            </div> */}
                                <div><a className="link link-hover">Forgot password?</a></div>
                                {/* <button type='submit' className="btn btn-neutral mt-4">Login</button>  */}
                                <input type='submit' className="btn btn-neutral mt-4" value="Login" />
                                <div >
                                    <SocialLogin />
                                </div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    If you are new here, <Link to={"/register2"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
                                </p>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;