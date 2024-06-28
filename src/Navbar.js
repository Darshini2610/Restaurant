import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { RegFname, RegLname, RegContact } from "./Register";
import {FaUserCircle} from 'react-icons/fa'
import {GiShoppingCart} from 'react-icons/gi'

export function LoggedIn() {}

function Navbar () {

    const logged = localStorage.getItem('logged')
    const Fname = localStorage.getItem('FName')
    const Lname = localStorage.getItem('LName')
    const Contact = localStorage.getItem('Phone')

    const location = useLocation();

    const navigate = useNavigate();
    const navigatetoLand = () => {
        navigate('/')
    }
    const navigatetoCart = () => {
        navigate('/Cart')
    }

    const [LogIn, setLogIn] = useState(false)
    const [Logged, setLogged] = useState(null)
    function Logging () {
        setLogIn(true)
    }
    function closeLogIn () {
        setLogIn(false)
    }
    function Log(custID) {
        setLogged(custID)
        setLogIn(false)
    }
    LoggedIn = Log;

    const [Profile, setProfile] = useState(false)
    const viewProfile = () => {
        setProfile(!Profile)
    }

    const logout = () => {
        localStorage.removeItem('logged')
        localStorage.removeItem('FName')
        localStorage.removeItem('LName')
        localStorage.removeItem('Phone')
        window.location.reload();
    }

    return(
        
        <div className="grid place-self-start p-5 w-full h-24 bg-gradient-to-b from-black to-cyan-950 fixed z-20">
           <div className="grid grid-cols-2 relative">
                    <img src={require('./Logo.png')} alt='Logo' className='h-3/6 col-span-1' />
                    <div className="flex flex-row-reverse text-white justify-between">
                        {localStorage.length > 2 ? 
                            <div>
                                <button><GiShoppingCart size={30} onClick={navigatetoCart} className="absolute right-14 top-3"/></button>
                                <button><FaUserCircle size={30} onClick={viewProfile} className='absolute right-0 top-3'/></button>
                                <div className={Profile ? 'mt-10 fixed right-5 bg-white rounded-lg p-3 grid place-items-end' : 'hidden'}> 
                                        <p className="font-serif text-md text-cyan-950 font-semibold inline-block"> {Fname} {Lname} {RegFname} {RegLname}</p>
                                        <p className="text-cyan-950 text-sm">{Contact} {RegContact}</p>
                                        <p className="text-cyan-950" onClick={logout}>Logout</p>
                                </div>
                            </div>
                        : <h3 className="p-3" onClick={Logging}>Log In / Sign Up</h3>}                        
                        <h3 className="px-2 mr-20 truncate w-2/5">{localStorage.getItem('Address')}
                            <p className='text-sm bg-cyan-800 rounded-lg mt-1 px-1 w-fit'
                                onClick={navigatetoLand}>Change Location</p></h3>
                        <h3 className='px-2'>{localStorage.getItem('Mode')}
                            <p className='text-sm bg-cyan-800 rounded-lg px-1 mt-1'
                                onClick={navigatetoLand}>Change Mode</p></h3>
                        
                    </div>
                </div> 
            {!(!LogIn || Logged) ? <Login close={closeLogIn} log={Log}/> : null}
            {logged ==='null' ? localStorage.setItem('logged', Logged) : null}
            {console.log(localStorage)}
        </div>
    );
}

export default Navbar;