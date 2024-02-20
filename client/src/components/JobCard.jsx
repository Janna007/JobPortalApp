import React from 'react'
import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

function JobCard({job}) {
  return (
    <div>
        <Link to={`/job-detail/${job?.id}`}>

        <div
        className='w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] bg-white flex flex-col justify-between shadow-lg 
                rounded-md px-3 py-5 '
      >
        <div className='flex gap-3'>
          <img
            src={job?.company?.profileUrl}
            alt={job?.company?.name}
            className='w-14 h-14'
          />

          <div className=''>
            <p className='text-lg font-semibold truncate'>{job?.jobTitle}</p>
            <span className='flex gap-2 items-center'>
              <GoLocation className='text-slate-900 text-sm' />
              {job?.location}
            </span>
          </div>
        </div>

        <div className='py-3'>
          <p className='text-sm'>
            {job?.detail[0]?.desc?.slice(0, 150) + "..."}
          </p>
        </div>

      </div>
        </Link>
        

    </div>
  )
}

export default JobCard