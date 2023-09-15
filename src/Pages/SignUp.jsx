import React, { useContext } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import Swal from 'sweetalert2';

const SignUp = ({children}) => {
    const {createUser, updateProfileData, logOut} =  useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password)
        if(password.length < 6){
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Password must be at least 6 characters',
                showConfirmButton: false,
                timer: 1500
              })
            return ;
        }
        createUser(email, password)
    .then(result => {
        console.log(result.user);
        updateProfileData(name);
        logOut();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Account created successfully. Now you can login',
            showConfirmButton: false,
            timer: 3500
          })
         navigate("/login")

    })
    .catch(error=>{
        Swal.fire({
            position: 'error',
            icon: 'warning',
            title: 'Fill all the fields',
            showConfirmButton: false,
            timer: 1500
          })
    })

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src="https://www.pngitem.com/pimgs/m/623-6230347_registration-online-vector-png-transparent-png.png" alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Sign Up</h1>
                        <form onSubmit={handleSignUp}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='my-4 text-center'>Already Have an Account? <Link className='text-orange-600 font-bold' to="/login">Login</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;