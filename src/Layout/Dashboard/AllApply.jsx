import React, { useEffect, useState } from 'react';
import { FaCheck, FaComment, FaPrint } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllApply = () => {
  const [appliedItems, setAppliedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [disabledButtons, setDisabledButtons] = useState(() => {
    // Initialize disabledButtons state from local storage or an empty array
    const storedButtons = JSON.parse(localStorage.getItem('disabledButtons')) || [];
    return Array(appliedItems.length).fill(false).map((_, index) => storedButtons[index] || false);
  });

  useEffect(() => {
    // Fetch the applied items from your backend API
    fetch('http://localhost:3000/allapply')
      .then((res) => res.json())
      .then((data) => {
        setAppliedItems(data);
      });
  }, []);

  // Function to update the disabled state and save it to local storage
  const updateDisabledButtons = (index, status) => {
    setDisabledButtons((prevDisabledButtons) => {
      const updatedButtons = [...prevDisabledButtons];
      updatedButtons[index] = status;
      // Save the updated state to local storage
      localStorage.setItem('disabledButtons', JSON.stringify(updatedButtons));
      return updatedButtons;
    });
  };

  // Filter the appliedItems based on the search criteria
  const filteredItems = appliedItems.filter((row) => {
    const searchText = searchQuery.toLowerCase();
    const club = row.club ? row.club.toLowerCase() : '';
    const email = row.email ? row.email.toLowerCase() : '';
    return club.includes(searchText) || email.includes(searchText);
  });

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    const columns = ['#', 'Club', 'Stu. Email'];
    const data = filteredItems.map((row, i) => [
      i + 1,
      row.club,
      row.email,
    ]);

    doc.autoTable({
      head: [columns],
      body: data,
    });

    doc.save('application.pdf');
  };

  const handleStatusUpdate = (id, index, status) => {
    // Send a PUT or PATCH request to update the status
    fetch(`http://localhost:3000/apply/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Status updated:', data);
        // Update the disabled state for the specific button that was clicked
        updateDisabledButtons(index, true);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl text-center text-red-500 mb-2 uppercase font-bold">
        ----Requested Application----
      </h1>
      <div className="divider"></div>
      <div className="uppercase text-blue-400 font-bold flex justify-evenly">
        <h2 className="text-2xl m-3">Total application: {filteredItems.length}</h2>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <label htmlFor="search" className="text-xl font-bold mr-2">
            Search by Club or Name:
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 rounded-md border border-blue-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-700"
            placeholder="Search by club or email"
          />
        </div>
        <button onClick={handleGeneratePDF} className="btn btn-outline btn-primary">
          <FaPrint className="text-2xl"></FaPrint> Generate PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table border border-blue-600">
          {/* head */}
          <thead className="text-xl text-green-600">
            <tr>
              <th className="border border-gray-300">#</th>
              <th className="border border-gray-300">Club</th>
              <th className="border border-gray-300">Stu. Email</th>
              <th className="border border-gray-300">Approve</th>
              <th className="border border-gray-300">Denied</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((row, i) => (
              <tr key={row._id} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border border-gray-300">{i + 1}</td>
                <td className="border border-gray-300">
                  <div className="flex items-center space-x-3">
                    <div className="font-bold">{row.club}</div>
                    <div>
                      <div className="font-bold">{row.class}</div>
                    </div>
                  </div>
                </td>
                <td className="border border-gray-300 text-sm font-bold underline text-blue-600">
                  <a href={`mailto:${row.email}`}>{row.email}</a>
                </td>
                <td className="border border-gray-300">
                  <button
                    onClick={() => {
                      handleStatusUpdate(row._id, i, 'approved');
                    }}
                    className="btn btn-circle btn-success btn-outline"
                    disabled={disabledButtons[i] || row.status === 'approved'}
                  >
                    <FaCheck />
                  </button>
                </td>
                <td className="border border-gray-300">
                  <button
                    onClick={() => {
                      handleStatusUpdate(row._id, i, 'denied');
                    }}
                    className="btn btn-circle btn-error btn-outline"
                    disabled={disabledButtons[i] || row.status === 'denied'}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllApply;
