import React, { useState } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import { LoggedIn } from "./Navbar";
import axios from "axios";

export let RegFname, RegLname, RegContact = null;

function Register ({close, log}) {

    const [FName, setFName] = useState('')
    const [LName, setLName] = useState('')
    const [Phone, setPhone] = useState('')
    const [reg, setreg] = useState(null)
    const Registeing = () => {
        axios.post("http://localhost:3001/register", {
            fname: FName,
            lname: LName,
            phone: Phone
        }).then((response) => {
            if (response.data === "Already Registered") {
                console.log(response.data)
                setreg(response.data);
            }
            else {
                RegFname = response.data[0].fname
                RegLname = response.data[0].lname
                RegContact = response.data[0].phone
                let CustID = response.data[0].CustID
                LoggedIn(CustID)
                close()
            }
            }
            
            //response for id
            // Fname = FName,
            // Lname = LName,
            // Contact = Phone,
            
        );
    }

    return (
        
            <div className='w-2/6 h-2/4 z-10 rounded-2xl border-4 border-black fixed bg-white p-5 grid top-1/3 left-1/3'>
                <label>First Name:</label>
                <input className="border-2 mb-2 rounded-md" type='text' onChange={(event) => {setFName(event.target.value)}}/>
                <label>Last Name:</label>
                <input className="border-2 mb-2 rounded-md" type='text' onChange={(event) => {setLName(event.target.value)}}/>
                <label>Phone Number:</label>
                <input className="border-2 rounded-md appearance-none" type='tel' onChange={(event) => {setPhone(event.target.value)}}/>
                {reg ? <p className='text-red-500 text-sm'>{reg}</p> : null}
                <button className="border-2 mt-4 rounded-md bg-green-500 border-black" onClick={Registeing}>Submit</button>
                <AiOutlineClose className='absolute right-4 top-4' size={20} onClick={close}/>
            </div>
        
    );
}

export default Register;