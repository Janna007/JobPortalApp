import React from 'react'
import  { useEffect } from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton, JobCard, JobTypes, TextInput } from "../components";
import { jobs } from "../utils/data";
import { apiRequest } from '../utils';
import { useSelector } from 'react-redux';
import { __DO_NOT_USE__ActionTypes } from '@reduxjs/toolkit';
import { BsDatabaseDash } from 'react-icons/bs';

function ApplyFrom() {
    const {user}=useSelector((state)=>state.user)
    const {
      register,
      handleSubmit,
      getValues,
      watch,
      formState: { errors },
    } = useForm({
      mode: "onChange",
      defaultValues: {},
    });
  
    const [errMsg, setErrMsg] = useState("");

    const onSubmit=()=>{

    }
  return (
    <div>
        <div className='container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5'>
 <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
 <div>
          <p className='text-gray-500 font-semibold text-2xl'>Apply Job</p>
          <form
            className='w-full mt-2 flex flex-col gap-8'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name='Email'
              label='Email'
              placeholder='eg. ayz@gmail.com'
              type='email'
              required={true}
              register={register("Email", {
                required: "Email is required",
              })}
              error={errors.Email ? errors.Email?.message : ""}
            />

            <div className='w-full flex gap-4'>
              <div className={`w-1/2 mt-2`}>
                {/* <label className='text-gray-600 text-sm mb-1'>Job Type</label>
                <JobTypes jobTitle={jobType} setJobTitle={setJobType} /> */}
                <TextInput
              name='Firstname'
              label='Firstname'
              placeholder='eg. akshay'
              type='text'
              required={true}
              register={register("Firstname", {
                required: "First name is required",
              })}
              error={errors.Firstname ? errors.Firstname?.message : ""}
            />

              </div>

              <div className='w-1/2'>
                <TextInput
                  name='Lastanme'
                  label='Lastname'
                  placeholder='eg. kumar'
                  type='text'
                  register={register("Lastname")}
                  error={errors.Lastanme ? errors.Lastanme?.message : ""}
                />
              </div>
            </div>

            <div className='w-full flex gap-4'>
              <div className='w-1/2'>
                <TextInput
                  name='salary'
                  label='Expected Salary'
                  placeholder='salary'
                  type='number'
                  register={register("salary", {
                    required: "Salary is required!",
                  })}
                  error={errors.salary ? errors.salary?.message : ""}
                />
              </div>

              <div className='w-1/2'>
                <TextInput
                  name='experience'
                  label='Years of Experience'
                  placeholder='experience'
                  type='number'
                  register={register("experience", {
                    required: "Experience is required",
                  })}
                  error={errors.experience ? errors.experience?.message : ""}
                />
              </div>
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-600 text-sm mb-1'>
                Resume
              </label>
              {/* <textarea
                className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                rows={4}
                cols={6}
                {...register("desc", {
                  required: "Job Description is required!",
                })}
                aria-invalid={errors.desc ? "true" : "false"}
              ></textarea>
              {errors.desc && (
                <span role='alert' className='text-xs text-red-500 mt-0.5'>
                  {errors.desc?.message}
                </span>
              )} */}
               <TextInput
                  name='resume'
                  label='Upload your resume'
                  placeholder='upload here'
                  type='file'
                  register={register("resume", {
                    required: "resume is required",
                  })}
                  error={errors.resume ? errors.resume?.message : ""}
                />


            </div>

            {/* <div className='flex flex-col'>
              <label className='text-gray-600 text-sm mb-1'>
               Requirements
              </label>
              <textarea
                className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                rows={4}
                cols={6}
                {...register("requirements")}
              ></textarea>
            </div> */}

            {/* {errMsg && (
              <span role='alert' className='text-sm text-red-500 mt-0.5'>
                {errMsg}
              </span>
            )} */}
            <div className='mt-2'>
              <CustomButton
                type='submit'
                containerStyles='inline-flex justify-center rounded-md border border-transparent bg-black px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-black focus:outline-none '
                title='Sumbit'
              />
            </div>
          </form>
  </div>

 
 </div>

 <div className='w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0'>
        <p className='text-gray-500 font-semibold'>Applied Jobs</p>

        {/* <div className='w-full flex flex-wrap gap-6'>
          {recentPost?.slice(0, 4).map((job, index) => {
            const data={
              name:user?.name,
              email:user?.email,
              logo:user?.profileUrl,
              ...job
            }
            
            return <JobCard job={data} key={index} />;
          })}
        </div> */}
      </div>

    </div>
  
    </div>
  )
}

export default ApplyFrom 