import React from "react";
import Navbar from "./Navbar";
import Menubar from "./Menubar";
import Burgers from "./Food/Burgers";
import Pizzas from "./Food/Pizzas";
import Chinese from "./Food/Chinese";
import Desserts from "./Food/Desserts"

function Restaurant () {
    return (
        <div className="bg-[url('./Background.png')] scroll-smooth">
            <Navbar />
            <Menubar />
            <Burgers />
            <Pizzas />
            <Chinese />
            <Desserts />
        </div>
    );
}

export default Restaurant;