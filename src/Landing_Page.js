import React, { useState } from "react";
import axios from 'axios'
import {BiCurrentLocation} from 'react-icons/bi';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Landing_page() {

    const location = useLocation();
    const navigate = useNavigate();
    const navigatetoRes = () => {
        if (address) {
            navigate('/Restaurant')
        }
        else {
            setlocerror('Please enter a valid location');
        }
    }

    const [delivery, setdelivery] = useState('on')
    const [TA_DI, setTA_DI] = useState('')
    const [latitude, setlatitude] = useState(0)
    const [longitude, setlongitude] = useState(0)
    const [address, setaddress] = useState('')
    const [locerror, setlocerror] = useState('')

    const selectmode = (event, mode) => {
        if (mode === 1) {
            setdelivery(event.target.value)
            setTA_DI('')
        }
        else if (mode === 2) {
            setTA_DI(event.target.value)
            setdelivery('')
        }
    }

    function success (data) {
        console.log(data)
        setlatitude(data.coords.latitude)
        setlongitude(data.coords.longitude)
    }

    function error(err) {
        setlocerror(`ERROR(${err.code}): ${err.message}`);
      }
    
    function getaddress () {
        navigator.geolocation.getCurrentPosition(success, error)
    }

    if (latitude || longitude) {
        axios
            .get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
            .then((response) => {
                console.log(response.data.address); 
                setaddress(response.data.address.amenity + ', ' + response.data.address.city + ', ' + response.data.address.state + ', ' + response.data.address.country)})
            .catch((error) => console.log(error))
    }

    localStorage.setItem('Address', address);
    if (delivery) {
        let mode = 'Delivery'
        localStorage.setItem('Mode', mode);
    }
    else {
        let mode = 'Take away/Dine in'
        localStorage.setItem('Mode', mode);
    }

    return (
        <div className="h-screen grid place-items-center bg-[url('./Background.png')] text-white">
            <div className='grid place-content-center absolute grid-cols-2'>
                <img src={require('./Logo.png')} alt='Logo' className='col-span-1'></img>
                <div className='grid place-content-center'>
                <div className='w-full'>
                    <input className='Delivery m-2' type='radio' checked={delivery} onChange={(event) => selectmode(event, 1)}/>Delivery
                    <input className='TA/DI ml-5 m-2' type='radio' checked={TA_DI} onChange={(event) => selectmode(event, 2)}/>Take away / Dine-in
                </div>
                <div className='w-full'>
                    <input 
                    className='border-2 border-black m-2 rounded-lg px-1 font-serif text-black'
                    value={address}
                    placeholder="Enter location . . ."
                    onChange={(event) => {setaddress(event.target.value)}}/>
                    <button 
                        className='bg-lime-600 rounded-lg px-1 border-2 border-black font-serif'
                        onClick={getaddress}>
                        <BiCurrentLocation className="inline-block"/> Locate Me
                    </button>
                    <div className='text-red-500 px-2'>{locerror}</div>
                </div>
                <button 
                        className='bg-cyan-700 rounded-lg w-1/4 m-2 border-2 border-black font-serif'
                        onClick={navigatetoRes}>
                        Proceed
                </button>
                </div>
            </div>
        </div>
    )
}

export default Landing_page;