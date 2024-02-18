import React ,{Fragment,useState} from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";

function Navbar() {

  const user={}
  const[isOpen,setIsOpen]=useState()

  const handleCloseNavbar=()=>{
    setIsOpen((prev)=>!prev)
  }
  return (
    <div className='relative bg-[#f7fdfd] z-50'>
      <nav className='container mx-auto flex items-center justify-between py-5'>
          
      </nav>
    </div>
  )
}

export default Navbar