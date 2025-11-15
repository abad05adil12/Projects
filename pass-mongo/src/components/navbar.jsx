import React from "react";
import { Link } from "react-router-dom";
const navbar = () => {
  return (
    <nav className="bg-black text-white cursor-pointer">
      <div className="my-container flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl hover:text-gray-600">
          <span className="text-green-900">&lt;</span>
          Pass-
          <span className="text-green-900">Mgmt/&gt;</span>
        </div>
        <ul>
          <li className="flex gap-20 font-light">
            <a className="hover:text-gray-500" href="/home">
              Home
            </a>
            <a className="hover:text-gray-500" href="/about">
              About
            </a>
            <a className="hover:text-gray-500" href="/contact">
              Contact
            </a>
          </li>
        </ul>
        <button className="flex text-white rounded-lg my-5 cursor-pointer">
          <a href="https://github.com/abad05adil12/Projects"><img className='invert p-3 w-16 rounded-4xl hover:scale-x-105' src="/github.png" alt="" ></img></a>
          <a href="https://instagram.com/abadadil_"><img className='invert p-3 w-16 rounded-4xl hover:scale-x-105' src="/insta.png" alt="" />
        </a></button>
      </div>
    </nav>
  );
};
export default navbar;
