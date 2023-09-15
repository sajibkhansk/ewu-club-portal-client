
import { FaGoogle, FaGithub, FaEye } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { AuthContext } from '../Providers/AuthProviders';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, googleProvider, signWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const handleLoginWithGoogle = () => {
        signWithGoogle(googleProvider)
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);


        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                /*navigate(from, {replace : true})*/
                navigate("/")

            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Invalid email or password',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }


    return (
        <div>
            <div className="hero-content flex-col lg:flex-row mx-auto">
                <div className="w-1/2 mr-12">
                    <img src="https://img.freepik.com/premium-vector/register-access-login-password-internet-online-website-concept-flat-illustration_385073-108.jpg?w=2000" alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                <label className="label">
                  <span className="password">Password</span>
                </label>
                <div>
                <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" />
                  <button type="button" className="btn btn-outline ms-4" onClick={togglePasswordVisibility}>
                    <span><FaEye /></span>
                  </button>
                </div>
                <div></div>
                
              </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>

                        <p className='text-center font-semibold text-orange-600'> or </p>

                        <button className='flex justify-center items-center ' onClick={handleLoginWithGoogle}>
                            <img src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button-1024x260.png" alt="" style={{ width: '90%', height: 'auto' }} />
                        </button>

                        <p className='my-4 me-2 text-center'>New to Club Portal?<Link className='text-orange-600 ms-4 underline font-bold' to="/signup">Sign Up</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;