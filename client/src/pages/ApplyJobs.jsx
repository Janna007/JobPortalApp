import React, { useEffect, useState } from 'react'
import { apiRequest } from '../utils'
import { JobCard } from '../components'

function ApplyJobs() {
    const [data,setData]=useState([])
    const fetchData=async ()=>{
        try {
            const res=await apiRequest({
                url:"/jobs/find-jobs"
            })
            setData(res?.data)
           console.log(data)
            
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(()=>{
        fetchData()
    },[])


  return (
    <div className='container mx-auto px-10'>
          <div  className='w-full flex flex-wrap gap-4'>
              {data.map((job,index)=>{
                  const data={
                    name: job?.company?.name,
                    email: job?.company?.email,
                    logo:job?.company?.profileUrl,
                    ...job,
                  }
                   
                  return <JobCard job={data}  key={index}/>
              })}
          </div>
    </div>
  )
}

export default ApplyJobs