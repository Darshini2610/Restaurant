import React from "react";
import { Link } from "react-scroll";

function Menubar () {
    return (
        <div className='w-full bg-cyan-800 text-white p-2 space-x-20 flex place-content-center font-bold font-serif fixed mt-24 z-10 '>
            <button><Link to='burgers' smooth={true} duration={500} offset={-150} className='hover:text-cyan-950'>Burger</Link></button>
            <button><Link to='pizzas' smooth={true} duration={500} offset={-150} className='hover:text-cyan-950'>Pizza</Link></button>
            <button><Link to='chinese' smooth={true} duration={500} offset={-150} className='hover:text-cyan-950'>Chinese</Link></button>
            <button><Link to="desserts" smooth={true} duration={500} offset={-150} className='hover:text-cyan-950'>Dessert</Link></button>
        </div>
    );
}

export default Menubar;