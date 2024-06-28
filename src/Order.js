import React, { useState } from "react";
import {MdVerified} from 'react-icons/md'
import { AiOutlineClose } from "react-icons/ai";

function Order ({amount, close, placed}) {

    const [UPI, setupi] = useState(true)
    const [NB, setNB] = useState(false)
    const [POD, setPOD] = useState(false)

    function paymentMode(mode) {
        if (mode === 'UPI'){
            setupi(true)
            setNB(false)
            setPOD(false)
        }
        else if (mode === 'NB'){
            setupi(false)
            setNB(true)
            setPOD(false)
        }
        else {
            setupi(false)
            setNB(false)
            setPOD(true)
        }
    }

    

    return (
        <div className='w-2/6 h-2/4 z-10 rounded-2xl border-4 border-black fixed bg-white p-5 grid top-1/3 left-1/3'>
            <AiOutlineClose className="absolute top-4 right-4" size={20} onClick={close}/>
            <div className="mt-2">
                <input className='w-3 m-2' type="radio" checked={UPI} onClick={(event) => paymentMode('UPI')}/>UPI
                <input className='w-3 m-2 ml-5' type="radio" checked={NB} onClick={(event) => paymentMode('NB')}/>Net Banking
                <input className='w-3 m-2 ml-5' type="radio" checked={POD} onClick={(event) => paymentMode('POD')}/>Pay on Delivery
            </div>
            {UPI ? 
                <div className="grid place-items-center">
                    <MdVerified size={50} color="royalblue"/>
                    <p className='font-bold text-lg'>Pay Rs.{amount}</p>
                    to
                    <p className='font-semibold text-lg font-serif'>Restaurant</p>
                    <button className='bg-green-600 font-bold font-serif mt-2 px-2 rounded-md text-lg border-2 border-black' onClick={placed}>Pay</button>
                </div>
                : NB ?
                    <div className="grid place-items-center">
                        <p className='font-bold text-lg'>Pay Rs.{amount}</p>
                        <input className="border-2 border-black rounded-md p-2" placeholder="Card Number"/>
                        <input className="border-2 border-black rounded-md p-2" placeholder="CVV"/>  
                        <button className='bg-green-600 font-bold font-serif mt-2 px-2 rounded-md text-lg border-2 border-black' onClick={placed}>Pay</button>
                    </div>
                    :   
                        <div className="grid place-items-center">
                            Pay Cash or UPI of
                            <p className='font-bold text-lg'>Rs.{amount}</p>
                            on Delivery
                            <button className='bg-green-600 font-bold font-serif mt-2 mb-5 px-2 rounded-md text-lg border-2 border-black' onClick={placed}>Place Order</button>
                        </div>}
        </div>
    );
}

export default Order;