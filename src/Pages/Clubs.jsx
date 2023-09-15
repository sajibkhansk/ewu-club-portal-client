import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Clubs = () => {
    const [clubs, setClubs] = useState([])
    useEffect(() => {
       fetch('http://localhost:3000/clubs')
       .then(res=>res.json())
       .then(data => setClubs(data))
    },[]);
console.log(clubs.length);
    return (
        <div className='bg-base-300'>
            <h1 className='text-center text-3xl'>OUR CLUBS</h1>
            <div className='grid ms-2 me-2 md:grid-cols-2 gap-4 mt-2 max-w-screen-xl mx-auto'>
            {
                clubs.map(item => <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img
          src={item.image}
          alt="Album"
          style={{ width: '200px', height: '200px' }} // Adjust the width and height as needed
        /></figure>
                <div className="card-body">
                  <h2 className="card-title">{item.clubName}
                  
                  </h2>
                  <h1 className=''>Club Member: <b>{item.clubMember}</b></h1>
                  <h1>Established In: <b>{item.establish}</b></h1>
                  <h1 >Status: <div className="badge badge-secondary ms-2">{item.status}</div></h1>
                  <div className="card-actions justify-end">
                    <button className="btn btn-outline btn-primary">
                      <Link to={`/clubs/${item._id}`} >Learn more</Link>
                      </button>
                  </div>
                </div>
              </div>)
            }
            </div>
        </div>
    );
};

export default Clubs;