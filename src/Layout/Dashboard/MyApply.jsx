import React from 'react';
import { FaTrash, FaUser, FaWallet } from 'react-icons/fa';
import Swal from "sweetalert2"
import { Link } from 'react-router-dom';
import useApply from '../../hooks/useApply';

const MyApply = () => {
  const [apply, refetch] = useApply();
  
  const handleDelete = (row) => {
    console.log(row._id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this record!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/apply/${row._id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire('Error', 'An error occurred while deleting the record.', 'error');
          });
      }
    });
  };

  return (
    <div className='w-full'>
      <h1 className='text-3xl text-center text-red-500 mb-2 uppercase font-bold'>----Selected Clubs----</h1>
      <div className="divider"></div>
      <div className='uppercase text-blue-400 font-bold flex justify-evenly '>
        <h2 className='text-2xl'>Total Applied: {apply.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table border border-gray-300">
          {/* head */}
          <thead className='text-xl text-green-600'>
            <tr>
              <th className="border border-gray-300">
                #
              </th>
              <th className="border border-gray-300">Club Name</th>
              <th className="border border-gray-300">Withdraw</th>
              <th className="border border-gray-300">Pending Status</th>
            </tr>
          </thead>
          <tbody>
            {
              apply.map((row, i) => (
                <tr key={row._id}>
                  <th className="border border-gray-300">
                    {i + 1}
                  </th>
                  <td className="border border-gray-300">
                    <div className="flex items-center space-x-3 ">
                      <div className="font-bold">EWU {row.clubName}</div>
                      <div>
                        <div className="font-bold">{row.class}</div>
                        <div className="text-sm opacity-100">{row.instructor}</div>
                      </div>
                    </div>
                  </td>
                  <th className="border border-gray-300">
                    <button
                      onClick={() => handleDelete(row)}
                      className="btn btn-circle btn-error btn-outline"
                      disabled={row.status === 'denied'} // Disable the button when status is 'Denied'
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </th>
                  <td className="border border-gray-300">
                    {row.status === 'denied' ? (
                      <div className="badge text-white bg-red-600 ms-2">Cancelled</div>
                    ) : (
                      row.status ? (
                        <div className="badge text-white bg-green-600 ms-2">{row.status}</div>
                      ) : (
                        <div className="badge text-white badge-primary ms-2">Pending</div>
                      )
                    )}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApply;
