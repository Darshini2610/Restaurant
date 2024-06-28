import React, {useState} from "react";
import pepper_barbeque_chicken from './pepper_barbeque_chicken.webp'
import veggie_paradise from './veggie_paradise.webp'
import peppy_paneer from './peppy_paneer.webp'
import chicken_dominator from './chicken_dominator.webp'
import non_veg_supreme from './non_veg_supreme.webp'
import {BiCheckboxSquare} from 'react-icons/bi'
import FoodDes from "./FoodDes";

export let pizzas = []

function Pizzas () {

    const [showFoodDes, setshowFoodDes] = useState(false)

    function showDes (pizza) {
        setshowFoodDes(pizza)
    }

    function closeDes () {
        setshowFoodDes(false)
    }

    pizzas = [
        {src: peppy_paneer, name: 'Peppy Paneer', cost: '459', category: <BiCheckboxSquare className='text-green-500' size={25} />,
            des: 'Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika'},
        {src: veggie_paradise, name: 'Veggie Paradise', cost: '459', category: <BiCheckboxSquare className='text-green-500' size={25}/>,
            des: 'The awesome foursome! Golden corn, black olives, capsicum, red paprika'},
        {src: pepper_barbeque_chicken, name: 'Pepper Barbeque Chicken', cost: '449', category: <BiCheckboxSquare className='text-red-600' size={25}/>,
            des: 'Pepper barbecue chicken for that extra zing'},
        {src: chicken_dominator, name: 'Chicken Dominator', cost: '599',category: <BiCheckboxSquare className='text-red-600' size={25}/>,
            des: 'Loaded with double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken rashers'},
        {src: non_veg_supreme, name: 'Non Veg Supreme', cost: '599', category: <BiCheckboxSquare className='text-red-600' size={25}/>,
            des: 'Supreme combination of black olives, onion, capsicum, grilled mushroom, pepper barbecue chicken, peri-peri chicken & grilled chicken rashers'}        
    ]
    
    return (
        <div className="grid place-items-center p-10 pt-0" id='pizzas'>
            <h2 className='font-serif text-2xl font-bold text-white mt-3'>Pizza</h2>
            <div className="grid grid-cols-5 text-lg font-serif text-white">
                    {pizzas.map((pizza, index) => (
                        <div className='bg-cyan-800 grid m-5 p-2 rounded-xl border-2 border-black relative hover:border-white'
                        key={index}
                        onClick={(event) => showDes(pizza)}>
                        <img src={pizza.src} alt='pizza' className="h-32 place-self-center bg-cyan-950 p-2 rounded-lg"></img>
                        <div className="m-2 mr-5">
                            <p className="flex right-3 absolute ">{pizza.category}</p>
                        {pizza.name}</div>
                        <p className="mx-2">Rs. {pizza.cost}</p>
                    </div>
                    ))}
            </div>
            {showFoodDes ? <FoodDes food={showFoodDes} close={closeDes}/> : ''}
        </div>
    );
}

export default Pizzas;