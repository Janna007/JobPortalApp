import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from 'axios'


const CompanyList = () => {
  // Extended dummy data with more companies
  // const initialCompanies = [
  //   {
  //     id: 1,
  //     name: "TechCorp",
  //     email: "contact@techcorp.com",
  //     location: "San Francisco, CA",
  //     contact: "123-456-7890",
  //     profile: "https://via.placeholder.com/50"
  //   },
  //   {
  //     id: 2,
  //     name: "InnoSoft",
  //     email: "info@innosoft.com",
  //     location: "New York, NY",
  //     contact: "987-654-3210",
  //     profile: "https://via.placeholder.com/50"
  //   },
  //   {
  //     id: 3,
  //     name: "WebWorld",
  //     email: "support@webworld.com",
  //     location: "Chicago, IL",
  //     contact: "234-567-8901",
  //     profile: "https://via.placeholder.com/50"
  //   },
  //   {
  //     id: 4,
  //     name: "AppSolutions",
  //     email: "sales@appsolutions.com",
  //     location: "Austin, TX",
  //     contact: "345-678-9012",
  //     profile: "https://via.placeholder.com/50"
  //   },
  //   {
  //     id: 5,
  //     name: "CodeWorks",
  //     email: "hello@codeworks.com",
  //     location: "Seattle, WA",
  //     contact: "456-789-0123",
  //     profile: "https://via.placeholder.com/50"
  //   },
  //   {
  //     id: 6,
  //     name: "DevInnovations",
  //     email: "info@devinnovations.com",
  //     location: "Boston, MA",
  //     contact: "567-890-1234",
  //     profile: "https://via.placeholder.com/50"
  //   },
  //   // Add more companies as needed
  // ];
  const {user}=useSelector((state)=>state.user)
  // State to manage the list of companies and pagination
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 4;


  
  async function fetchCompanies() {
    try {
      const response = await axios.get('http://localhost:8000/api-v1/admin/getcompanies', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
          // Include any necessary authentication headers here
        },
      });
       console.log(response)
      // console.log('Total Users:', response.data.totalUsers);
      // console.log('Users:', response.data.users);
      setCompanies(response.data.companies)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  useEffect(()=>{
    fetchCompanies()
  },[])

  // Function to handle deletion of a company
  const handleDelete =async (id) => {
    try {
      console.log("called")
      const response = await axios.delete(`http://localhost:8000/api-v1/admin/deletecompany/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
          // Include any necessary authentication headers here
        },
      });
      console.log(response)

      // Remove the deleted user from the state
      setCompanies(companies.filter(user => user._id !== id));
      
    } catch (error) {
      console.error('Error deleting user:', error);
      
    }
  };

  // Get the current companies to display based on pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

  // Function to handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(companies.length / companiesPerPage);

  return (
    <div className="container mx-auto p-[30px]">
      {currentCompanies.map(company => (
        <div key={company.id} className="bg-white shadow-lg rounded-lg p-6 mb-6 flex justify-between items-center w-full ">
          <div className="flex items-center">
            <img 
              src={company.profileUrl} 
              alt={company.name} 
              className="w-12 h-12 rounded-full mr-4" 
            />
            <div>
              <h2 className="text-xl font-semibold">{company.name}</h2>
              <p className="text-gray-600">Email: {company.email}</p>
              <p className="text-gray-600">Location: {company.location}</p>
              <p className="text-gray-600">Contact: {company.contact}</p>
            </div>
          </div>
          <button
            onClick={() => handleDelete(company._id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={20} />
          </button>
        </div>
      ))}
      
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
