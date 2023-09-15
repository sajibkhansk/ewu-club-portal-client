import React, { useState } from 'react';
import Swal from 'sweetalert2';
const AddClub = () => {
  const [clubData, setClubData] = useState({
    image: '',
    clubName: '',
    club: '',
    email: '',
    clubMember: 0,
    establish: 0,
    clubVision: '',
    status: 'active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubData({
      ...clubData,
      [name]: value,
    });
  };

  console.log(clubData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/clubs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(clubData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Club Added Successfully',
            showConfirmButton: false,
            timer: 2500,
          });
          
          // Reset the form fields to their initial values
          setClubData({
            image: '',
            clubName: '',
            club: '',
            email: '',
            clubMember: 0,
            establish: 0,
            clubVision: '',
            status: 'active',
          });
        }
      });
  };
  

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center w-[50%]  ">
      <div className="bg-amber-400 p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Add Club</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-600 font-medium mb-2">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={clubData.image}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clubName" className="block text-gray-600 font-medium mb-2">Club Name:</label>
            <input
              type="text"
              id="clubName"
              name="clubName"
              value={clubData.clubName}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="club" className="block text-gray-600 font-medium mb-2">Club:</label>
            <input
              type="text"
              id="club"
              name="club"
              value={clubData.club}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={clubData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clubMember" className="block text-gray-600 font-medium mb-2">Club Member:</label>
            <input
              type="number"
              id="clubMember"
              name="clubMember"
              value={clubData.clubMember}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="establish" className="block text-gray-600 font-medium mb-2">Establish:</label>
            <input
              type="number"
              id="establish"
              name="establish"
              value={clubData.establish}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clubVision" className="block text-gray-600 font-medium mb-2">Club Vision:</label>
            <textarea
              id="clubVision"
              name="clubVision"
              value={clubData.clubVision}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Add Club
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClub;
