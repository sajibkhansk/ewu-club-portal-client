import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

const SingleClub = () => {
  const { id } = useParams();
  const data = useLoaderData();

  return (
    <div className="bg-gradient-to-b from-blue-500 to-indigo-700 text-white">
        <div className="hero h-[300px]" style={{backgroundImage: `url(${data.image})`}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Welcome To {data.club}</h1>
      
    </div>
  </div>
</div>
      <div className="max-w-screen-xl mx-auto mt-10">
        <div className="hero bg-opacity-80">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={data.image} className="max-w-sm rounded-lg border border-gray-400 shadow-2xl" />
            <div>
              <h1 className="text-5xl font-bold">{data.clubName}</h1>
              <br />
              <h1>Club Member: <b>{data.clubMember}</b></h1>
              <h1>Established In: <b>{data.establish}</b></h1>
              <h1>Status: <div className="badge badge-secondary ms-2">{data.status}</div></h1>
              <p className="py-6"><b>Vision: </b>{data.clubVision}</p>
              <button className="btn btn-warning"><Link to='/applynow'>Go For Apply ?</Link></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClub;
