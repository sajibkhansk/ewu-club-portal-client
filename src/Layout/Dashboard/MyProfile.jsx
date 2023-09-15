import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';

const MyProfile = () => {
    const user = useContext(AuthContext);
    console.log(user.user.photoURL);
    return (
        <div className='text-3xl mb-12'>
            { user.user.photoURL ? 
               <img  src={user.user.photoURL} className="max-w-sm rounded-lg border h-[200px] border-gray-400 shadow-2xl mb-4"  /> :  <img  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJ5uzamZittLOqysSJNyhD_emWIH_ZDvUBg&usqp=CAU' className="max-w-sm rounded-lg border h-[200px] border-gray-400 shadow-2xl mb-4"  /> }
            <h1>{user.user.displayName}</h1>
            
            <p className='mb-2'>Email: <span className='text-blue-600'>{user.user.email}</span>
                </p>
            <p>East West University</p>
        </div>
    );
};

export default MyProfile;