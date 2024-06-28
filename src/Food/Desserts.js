import React, { useState } from "react";
import RedVelvetLavaCake from './RedVelvetLavaCake.jpg'
import ChocoLavaCake from './ChocoLavaCake.png'
import ButterscotchMousseCake from './ButterscotchMousseCake.jpg'
import {BiCheckboxSquare} from 'react-icons/bi'
import FoodDes from "./FoodDes";

export let desserts = []

function Desserts () {

    const [showFoodDes, setshowFoodDes] = useState(false)

    function showDes (event, dessert) {
        setshowFoodDes(dessert)
    }

    function closeDes () {
        setshowFoodDes(false)
    }

    desserts = [
        {src: ButterscotchMousseCake, name: 'Butterscotch Mousse Cake', cost: '109', category: <BiCheckboxSquare className='text-green-500' size={25}/>,
            des: 'Sweet temptation! Butterscotch flavored mousse'},
        {src: ChocoLavaCake, name: 'Choco Lava Cake', cost: '109', category: <BiCheckboxSquare className='text-green-500' size={25}/>,
            des: 'Chocolate lovers delight! Indulgent, gooey molten lava inside chocolate cake'},
        {src: RedVelvetLavaCake, name: 'Red Velvet Lava Cake', cost: '139', category: <BiCheckboxSquare className='text-green-500' size={25}/>,
            des: 'A truly indulgent experience with sweet and rich red velvet cake on a creamy cheese flavoured base to give a burst of flavour in every bite!'},      
    ]
    
    return (
        <div className="grid place-items-center p-10 pt-0" id='desserts'>
            <h2 className='font-serif text-2xl font-bold text-white mt-3'>Dessert</h2>
            <div className="grid grid-cols-3 text-lg font-serif text-white place-items-center">
                {desserts.map((dessert, index) => (
                        <div className='bg-cyan-800 grid m-5 p-2 rounded-xl border-2 border-black relative hover:border-white w-3/5 h-5/6'
                            key={index}
                            onClick={(event) => showDes(event, dessert)}>
                            <img src={dessert.src} alt='dessert' className="h-28 place-self-center bg-cyan-950 p-2 rounded-lg"></img>
                            <div className="m-2">
                                <p className="flex right-3 absolute ">{dessert.category}</p>
                            {dessert.name}</div>
                            <p className="mx-2">Rs. {dessert.cost}</p>
                        </div>
                    ))}
            </div>
            {showFoodDes ? <FoodDes food={showFoodDes} close={closeDes}/> : ''}
        </div>
    );
}

export default Desserts;