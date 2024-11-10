// import React, { useContext } from 'react'
// import { Context } from '../context/ContextGlobal'
// import BtnRadius from './BtnRadius'

// import { RiFolderMusicLine } from "react-icons/ri";
// import { CgRadioChecked } from "react-icons/cg";
// import { VscPieChart } from "react-icons/vsc";
// import { IoIosRadio } from "react-icons/io";


// function SearchBarMobile() {
//   const context = useContext(Context)

//   const handleActiveSidebarContext = () => {
//     return context.handleActiveSidebar()
//   }

//   return (
//     <div className={`fixed pl-3%3 pr-2%9 flex justify-between gap-x-4 xl:left-60 lg:hidden xs:left-0 right-0 bottom-0 z-30 items-center text-white bg-[#231b2e] select-none`}>       
//               <div className=' flex w-full xs:justify-between'>

//                 <BtnRadius classMore='xl:hidden sm:block flex items-center justify-center hover:bg-transparent' onClick={() => handleActiveSidebarContext()}>
//                   <RiFolderMusicLine  className={`${context.iconSetting} m-auto w-4 min-h-32 object-cover`}/>
//                   <p>Thư viện</p>
//                 </BtnRadius>

//                 <BtnRadius classMore='flex flex-col flex-1'>
//                     <CgRadioChecked />
//                     <p>Khám phá</p>

//                 </BtnRadius>

//                 <BtnRadius classMore='flex flex-col flex-1'>
//                     <VscPieChart />
//                     <p>#zingchart</p>
//                 </BtnRadius>

//                 <BtnRadius classMore='flex flex-col flex-1'>
//                     <IoIosRadio />
//                     <p>Radio</p>
//                 </BtnRadius>

//                 <BtnRadius classMore='hover:bg-transparent '>
//                     <img 
//                       src='/images/avatar-jisoo.jpg' 
//                       alt='avatar' 
//                       className='rounded-full w-9 h-9 object-cover '
//                     />
//                     <p>Cá nhân</p>
//                 </BtnRadius>
//               </div>   
//       </div>
//   )
// }

// export default SearchBarMobile