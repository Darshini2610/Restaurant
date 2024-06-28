import React, { useState } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import { LoggedIn } from "./Navbar";
import axios from "axios";
import Register from "./Register";

function Login ({close, log}) {

    const [Phone, setPhone] = useState('')
    const [reg, setreg] = useState(null)

    const Logging = () => {
        axios.post("http://localhost:3001/login", {
            phone: Phone
        }).then((response) => {
            
            if (response.data === 'Not Registered') {
                setreg(response.data)
            }
            else {
                localStorage.setItem('FName', response.data[0].fname)
                localStorage.setItem('LName', response.data[0].lname)
                localStorage.setItem('Phone', response.data[0].phone)
                localStorage.setItem('logged', response.data[0].custID)
                let CustID = response.data[0].custID
                LoggedIn(CustID)
                close()
            }
        }
        );
    }

    const [register, setregister] = useState(false)
    const registering = () => {
        setregister(true)
    }
    const closeregistering = () => {
        setregister(false)
        close()
    }

    return (
        
            <div className='w-2/6 h-2/6 z-10 rounded-2xl border-4 border-black fixed bg-white p-5 grid top-1/3 left-1/3'>
                <label>Phone Number:</label>
                <input className="border-2 rounded-md appearance-none" type='tel' onChange={(event) => {setPhone(event.target.value)}}/>
                {reg ? <p className='text-red-500 text-sm'>{reg}</p> : null}
                <button className="border-2 rounded-md bg-green-500 border-black mt-4" onClick={Logging}>Submit</button>
                <AiOutlineClose className='absolute right-4 top-4' size={20} onClick={close}/>
                <div className='flex mt-2 text-sm'><p className="w-fit mr-1">Not Registered?</p><p onClick={registering} className='underline text-cyan-950'>Register</p></div>
                {register ? <Register close={closeregistering} /> : null}
            </div>
        
    );
}

export default Login;