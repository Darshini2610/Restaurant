import React, { useState } from "react";
import VegManchurian from './VegManchurian.jpg'
import Schezwan_Chicken_FriedRice from './Schezwan_Chicken_FriedRice.jpg'
import Veg_FriedRice from './Veg_FriedRice.jpg'
import Chicken_Noodles from './Chicken_Noodles.jpg'
import Schezwan_noodles from './Schezwan_noodles.jpg'
import {BiCheckboxSquare} from 'react-icons/bi'
import FoodDes from "./FoodDes";

export let chinese = []

function Chinese () {

    const [showFoodDes, setshowFoodDes] = useState(false)

    function showDes (event, chinese) {
        setshowFoodDes(chinese)
    }

    function closeDes () {
        setshowFoodDes(false)
    }

    chinese = [
        {src: VegManchurian, name: 'Veg Manchurian', cost: '250', category: <BiCheckboxSquare className='text-green-500' size={25}/>,
            des: 'A flavorful fusion of fresh vegetables, aromatic spices, and savory sauce, creating a perfect balance of taste and texture.'},
        {src: Schezwan_Chicken_FriedRice, name: 'Chicken Schezwan Fried Rice', cost: '359', category: <BiCheckboxSquare className='text-red-600' size={25}/>,
            des: 'Tender chicken pieces wok-tossed with fragrant rice and a symphony of Asian flavors, delivering an irresistible harmony of taste.'},
        {src: Veg_FriedRice, name: 'Veg Fried Rice', cost: '259', category: <BiCheckboxSquare className='text-green-500' size={25}/>,
            des:'A medley of vibrant vegetables and aromatic spices stir-fried to perfection, creating a symphony of flavors in every mouthful.'},
        {src: Chicken_Noodles, name: 'Chicken Noodles', cost: '329', category: <BiCheckboxSquare className='text-red-600' size={25}/>,
            des: 'Succulent chicken entwined with slurp-worthy noodles, drenched in a tantalizing blend of savory sauces for an unforgettable dining journey.'},
        {src: Schezwan_noodles, name: 'Veg Schezwan Noodles', cost: '299', category: <BiCheckboxSquare className='text-green-500' size={25}/>,
            des: 'A tantalizing dance of spices and noodles that will ignite your taste buds and leave you craving for more.'}        
    ]
    
    return (
        <div className="grid place-items-center p-10 pt-0" id='chinese'>
            <h2 className='font-serif text-2xl font-bold text-white mt-3'>Chinese</h2>
            <div className="grid grid-cols-5 text-lg font-serif text-white">
                    {chinese.map((item, index) => (
                        <div className='bg-cyan-800 grid m-5 p-2 rounded-xl border-2 border-black relative hover:border-white'
                            key={index}
                            onClick={(event) => showDes(event, item)}>
                            <img src={item.src} alt='item' className="h-32 place-self-center bg-cyan-950 p-2 rounded-lg"></img>
                            <div className="m-2 mr-5">
                                <p className="flex right-3 absolute ">{item.category}</p>
                            {item.name}</div>
                            <p className="mx-2">Rs. {item.cost}</p>
                        </div>
                    ))}
            </div>
            {showFoodDes ? <FoodDes food={showFoodDes} close={closeDes}/> : ''}
        </div>
    );
}

export default Chinese;