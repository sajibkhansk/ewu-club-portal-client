import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import useApply from '../hooks/useApply';

const ApplyNow = () => {
  const [, refetch] = useApply();
  const user = useContext(AuthContext);
  console.log(user.user.email);
  const [clubs, setClubs] = useState([]);
  const [appliedItems, setAppliedItems] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState({}); // State to track disabled buttons

  useEffect(() => {
    fetch('http://localhost:3000/clubs')
      .then((res) => res.json())
      .then((data) => setClubs(data));
  }, []);

  useEffect(() => {
    if (user && user.user.email) {
      fetch(`http://localhost:3000/apply?email=${user.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const appliedItemIds = data.map((item) => item.applyItemId);
          setAppliedItems(appliedItemIds);
        });
    }
  }, [user]);

  const handleApply = (item) => {
    console.log(item);
    if (user && user.user.email) {
      const applyItem = {
        applyItemId: item._id,
        email: user.user.email,
        club: item.club,
        clubName: item.clubName,
        image: item.image,
      };

      // Check if the item is already applied for
      if (appliedItems.includes(item._id) || disabledButtons[item._id]) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'You have already applied for this item',
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }

      // Disable the button immediately
      setDisabledButtons((prevState) => ({
        ...prevState,
        [item._id]: true,
      }));

      fetch('http://localhost:3000/apply', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(applyItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Apply Successfully',
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="bg-base-300">
        <h1 className="text-center font-bold text-4xl">APPLY HERE</h1>
        <div className="grid ms-2 me-2 md:grid-cols-2 gap-4 mt-2 max-w-screen-xl mx-auto">
          {clubs.map((item) => (
            <div className="card lg:card-side bg-base-100 shadow-xl" key={item._id}>
              <figure>
                <img
                  src={item.image}
                  alt="Album"
                  style={{ width: '200px', height: '200px' }}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.clubName}</h2>
                <h1 className="">
                  Club Member: <b>{item.clubMember}</b>
                </h1>
                <h1>
                  Established In: <b>{item.establish}</b>
                </h1>
                <h1>
                  Status: <div className="badge badge-secondary ms-2">{item.status}</div>
                </h1>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleApply(item)}
                    className="btn btn-primary"
                    disabled={appliedItems.includes(item._id) || disabledButtons[item._id]}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplyNow;
