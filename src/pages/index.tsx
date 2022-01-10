import { useRef, useState } from "react";

export default function Home() {
  const sideBarRef = useRef(null);
  const [sideBarOpen,setSideBarOpen] = useState("-translate-x-full")
  
  const toggleSideBar = () => {
    console.log('Menu button is clicked')
    if(sideBarOpen === ""){
      setSideBarOpen("-translate-x-full");
    }else{
      setSideBarOpen("");
    }
  }

  const closeSideBar = () => {
    setSideBarOpen("-translate-x-full");
  }
  
  return (
    <div className="relative min-h-screen md:flex">
      
      {/* mobile menu bar */}
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        {/* logo */}
        <a href="#" className="block p-4 text-white font-bold">NFT Viewer</a>

        {/* mobile menu button */}
        <button className="mobile-menu-button p-4 focus:outlined-none focus:bg-gray-700" onClick={toggleSideBar}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

       {/* sidebar */}
      <div className={`sidebar bg-blue-800 text-blue-100 w-64 space-y-6 px-2 py-7 absolute inset-y-0 left-0 transform  ${sideBarOpen} md:relative md:translate-x-0 transition duration-200 ease-in-out`} ref={sideBarRef} >
        
        <div className="grid justify-items-end  md:hidden">
          <a href="#" className="mr-2" onClick={closeSideBar}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          </a>
        </div>

        <span>
          <a href="#" className="text-white flex items-center space-x-2 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clip-rule="evenodd" />
            </svg>
            <span className="text-2x1 font-extrabold">NFT Viewer</span>
          </a>
          
        </span>
        {/* nav */}
        <nav>
          <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">Home</a>
          <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">About</a>
          <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">Features</a>
          <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">Contact</a>
        </nav>
      </div>

      {/* content */}
      <main className="flex-1 p-10 text-2x1 font-fold" onClick={closeSideBar}>
        <h1 className="font-mono text-xl code">
          Welcome to <span className="text-purple-700">Nextjs</span>, <span className="text-indigo-700">TailwindCSS</span> and <span className="text-gray-700">TypeScript</span>
        </h1>
      </main>
    </div>
  )
}
