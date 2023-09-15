import { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Providers/AuthProviders";
import { Link } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className="text-center flex justify-center "><span className="loading loading-spinner text-secondary loading-lg"></span> <button className="btn btn-primary mt-5 "><Link to="/login">Please Login first</Link></button> </div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;