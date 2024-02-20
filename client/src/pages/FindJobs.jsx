import React, { useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Header from '../components/Header'

function FindJobs() {

  const location=useLocation()
  const navigate=useNavigate()


  const [sort,setSort]=useState("Newest")
  const [page,setPage]=useState(1)
  const [numPage,setNumPage]=useState(1)
  const [recordCount,setRecordCount]=useState(0)
  const[data,setData]=useState([])

  const[searchQuery,setSearchQuery]=useState("")
  const[jobLocation,setJobLocation]=useState("")

  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const[fiterExp,setFilterExp]=useState([])

  const[isFetching,setIsFetching]=useState(false)

  return (
    <div>
      <Header
         title=" Empowering Your Job Search Journey "
         type='home'
         searchQuery={searchQuery}
         setSearchQuery={setSearchQuery}
         location={jobLocation}
         setLocation={setJobLocation}
        handleClick={()=>{}}
 />
    </div>
  )
}

export default FindJobs