import React, { useEffect, useState } from 'react'
import '../App.css'
import logo from '../img/logo.jpg'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


function Header() {
    return (

        <div className="bg-purple-400 w-screen h-[80px] z-10 drop-shadlow-lg">
            <div className="px-2 flex justify-between items-center w-full h-full">
                <div className="flex items-center">
                    <img className=" h-[100px]" src={logo}></img>
                    <ul className="hidden md:flex p-10">
                        <li>
                            <h1 className="text-4xl font-semibold">Bienvenido</h1>
                        </li>
                    </ul>
                </div>
                <div className="hidden md:flex pr-4">
                    <button className="bg-black text-white p-2 rounded-lg"> <a href='/Login'>Salir</a></button>
                </div>
            </div>



        </div>

    )
}

export default Header
