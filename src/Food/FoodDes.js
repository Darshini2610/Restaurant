import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Login from "../Login";
import axios from "axios";

function FoodDes ({food, close}) {

    const logged = localStorage.getItem('logged');

    const [LogIn, setLogIn] = useState(false)
    function closeLogIn () {
        setLogIn(false)
        setcart('Added to Cart')
    }

    const [cart, setcart] = useState('Add to Cart')
    const addtocart = () => {
        if (logged) {
            axios.post("http://localhost:3001/addtocart", {
                custID: logged,
                food: food.name,
                cost: food.cost,
            }).then(setcart('Added to Cart'));
        }
        else {
            setLogIn(true)
        }
    }

    return (
        <div className='w-2/4 h-2/4 bottom-14 z-10 rounded-2xl border-4 border-black fixed bg-white grid-cols-2 grid place-items-center pr-5'>
            <img src={food.src} alt='food' className='bg-cyan-800 p-5 w-4/5 h-4/6 rounded-xl border-2 border-black col-span-1'></img>
            <div className=''>
                <p className='font-serif text-lg font-bold'>{food.name}</p>
                <p className="">{food.des}</p>
                <p className="font-serif font-bold py-2">Rs. {food.cost}</p>
                <button className="px-2 py-0.5 border-2 border-black bg-green-500 rounded-lg"
                    onClick={addtocart}>{cart}</button>
            </div>
            <AiOutlineClose className='absolute right-4 top-4' size={20} onClick={close}/>
            {!(!LogIn || logged) ? <Login close={closeLogIn} log={null}/> : null}
        </div>
        
    );
}

export default FoodDes;