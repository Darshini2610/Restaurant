import React, { useState } from "react";
import CornCheese from './CornCheese.png'
import MexicanMcAlooTikki from './MexicanMcAlooTikki.png'
import McSpicyChicken from './McSpicyChicken.png'
import PiriPiriMcSpicyChicken from './PiriPiriMcSpicyChicken.png'
import McVeggieMcSpicywithFries from './McVeggieMcSpicywithFries.png'
import {BiCheckboxSquare} from 'react-icons/bi'
import FoodDes from "./FoodDes";

export let burgers = []

function Burgers () {

    const [showFoodDes, setshowFoodDes] = useState(false)

    function showDes (event, burger) {
        setshowFoodDes(burger)
    }

    function closeDes () {
        setshowFoodDes(false)
    }

    burgers = [
        {src: McSpicyChicken, name: 'McSpicy Chicken Burger', cost: '329', category: <BiCheckboxSquare className='text-red-600' size={25}/>,
            des: 'Hot and spicy 100% chicken breast in a crispy coating, served with crunchy lettuce and a classic sandwich sauce served in a sesame seed bun.'},
        {src: MexicanMcAlooTikki, name: 'Mexican McAloo Tikki Burger', cost: '215', category: <BiCheckboxSquare className='text-green-500' size={25}/>,
            des: 'A fusion of international taste combined with your favourite aloo tikki patty, layered with shredded onion, delicious Chipotle sauce, now with Whole Wheat Bun'},
        {src: PiriPiriMcSpicyChicken, name: 'Piri Piri McSpicy Chicken Burger', cost: '318', category: <BiCheckboxSquare className='text-red-600' size={25}/>,
            des:'Piri Piri seasoned buns, spicy chicken patty, Piri Piri creamy sauce and crunchy lettuce come together, leaving you craving for more!'},
        {src: CornCheese, name: 'Corn & Cheese Burger', cost: '299', category: <BiCheckboxSquare className='text-green-500' size={25}/>,
            des: 'Earlier known as American Cheese Supreme Veg, this is a burger with crispy corn & cheese patty, covered with a slice of cheese, creamy cocktail sauce, jalapenos and shredded onions'},
        {src: McVeggieMcSpicywithFries, name: '2 McVeggie + 2 McSpicy + 2 Fries', cost: '683', category: <BiCheckboxSquare className='text-red-600' size={25}/>,
            des: 'The combo of favourites! Get 2 McVeggie + 2 McSpicy + 2 Fries'}        
    ]
    
    return (
        <div className='grid place-items-center p-10 pt-44' id='burgers'>
            <h2 className='font-serif text-2xl font-bold text-white mt-3'>Burger</h2>
            <div className="grid grid-cols-5 text-lg font-serif text-white pt-1">
                    {burgers.map((burger, index) => (
                        <div className='bg-cyan-800 grid m-5 p-2 rounded-xl border-2 border-black relative hover:border-white'
                            key={index}
                            onClick={(event) => showDes(event, burger)}>
                            <img src={burger.src} alt='burger' className="h-32 place-self-center bg-cyan-950 p-2 rounded-lg"></img>
                            <div className="m-2">
                                <p className="flex right-3 absolute ">{burger.category}</p>
                            {burger.name}</div>
                            <p className="mx-2">Rs. {burger.cost}</p>
                        </div>
                    ))}
            </div>
            {showFoodDes ? <FoodDes food={showFoodDes} close={closeDes}/> : ''}
        </div>
    );
}

export default Burgers;