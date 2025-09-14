import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { Helmet } from 'react-helmet';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import SocialLogin from '../../../components/SocialLogin/SocialLogin';

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // console.log(watch("example"));
    const strongPwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const navigate = useNavigate();

    const { createUser, loading, updateUserProfile } = useContext(AuthContext);
    // const handleRegister = event => {
    //     event.preventDefault();
    //     const form = event.target;
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     const coPassword = form['confirm-password'].value;
    //     // password strength check
    //     // const strongPwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //     // if (!strongPwdRegex.test(password)) {
    //     //     const message = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
    //     //     console.error(message);
    //     //     alert(message);
    //     //     return;
    //     // }
    //     // match pass and confirm pass
    //     if (password !== coPassword) {
    //         const message = "Passwords do not match.";
    //         console.error(message);
    //         alert(message);
    //         return;
    //     }
    //     createUser(email, password)
    //         .then((userCredential) => {
    //             const newUser = userCredential.user;
    //             console.log('User created successfully:', newUser);
    //             navigate('/');
    //             loading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error creating user:', error);
    //         });
    //     console.log('Name:', name);
    //     console.log('Email:', email);
    //     console.log('Password:', password);
    //     console.log('Confirm Password:', coPassword);
    // };

    const onSubmit = data => {
        // console.log(data);
        createUser(data.email, data.password)
            .then((userCredential) => {
                // const newUser = userCredential.user;
                // console.log('User created successfully:', newUser);

                // Update user profile
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // console.log('User profile updated successfully');
                        // console.log(data.name, data.photoURL);
                        // console.log(data);
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic('/users', {
                            method: 'POST',
                            data: userInfo
                        }).then(res => {
                            if (res.data.insertedId) {
                                reset(); // Reset form after successful registration
                                navigate('/');
                                loading(false);
                            }
                        })

                    })
                    .catch(error => {
                        console.error('Error updating user profile:', error);
                    });
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    };
    return (
        <>
            <Helmet>
                <title>Register two</title>
            </Helmet>
            <section className=" dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register two
                            </h1>
                            <hr />
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input type="text" {...register("name", { required: true })} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your name" required="" />
                                    {errors.name && <p className='text-yellow-600'>Name field is required</p>}
                                </div>
                                <div>
                                    <label for="photoUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your photo URL</label>
                                    <input type="text" {...register("photoUrl", { required: true })} name="photoUrl" id="photoUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your photo URL" required="" />
                                    {errors.photoUrl && <p className='text-yellow-600'>Photo URL field is required</p>}
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" {...register("email")} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" {...register("password", { required: true, pattern: strongPwdRegex })} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    {errors.password?.type === "required" && <p className='text-yellow-600'>Password is required</p>}
                                    {errors.password && <p className='text-yellow-600'>Password must be at least 8 characters long and include uppercase, lowercase, number, and special character</p>}
                                </div>
                                <div>
                                    <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="password" {...register("confirm-password")} name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                {/* <button className="btn btn-block text-white bg-blue-600 hover:bg-blue-700">block</button> */}
                                <div>
                                    <SocialLogin />
                                </div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                </p>
                            </form>             
                            <div>
                                <button className="btn">Default</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;