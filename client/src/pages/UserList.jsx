import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';

function UserList() {
  const {user}=useSelector((state)=>state.user)
  const[users,setUsers]=useState([])
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);



  // Calculate pagination values
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  async function fetchUsers() {
    try {
      const response = await axios.get('http://localhost:8000/api-v1/admin/getusers', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
          // Include any necessary authentication headers here
        },
      });
       console.log(response)
      // console.log('Total Users:', response.data.totalUsers);
      // console.log('Users:', response.data.users);
     setUsers(response.data.users)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  useEffect(()=>{
    fetchUsers()
  },[])


  const handleDelete = async (userId) => {
  
    try {
      console.log("called")
      const response = await axios.delete(`http://localhost:8000/api-v1/admin/deleteuser/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
          // Include any necessary authentication headers here
        },
      });
      console.log(response)

      // Remove the deleted user from the state
       setUsers(users.filter(user => user._id !== userId));
      
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  
  if (error) return <p className="text-red-500">{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div className='p-[20px]'>
      <div className="flex flex-wrap justify-center gap-4">
        {currentUsers.map((user) => (
          <div key={user._id} className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full">
             <img
              src={user.profileUrl} // URL to the user's profile picture
              alt={`${user.name}'s profile`}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-center">{user.firstName}</h3>
            <p className="text-gray-700 text-center">{user.email}</p>
            {/* Add more user details as needed */}
            <div className='flex justify-center items-center'>
            <button
              onClick={() => handleDelete(user._id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 "
            >
             
              <MdDelete size={20} />
            </button>
            </div>
           
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-[50px]">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-700 text-white rounded-lg mr-2 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-700 text-white rounded-lg ml-2 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default UserList