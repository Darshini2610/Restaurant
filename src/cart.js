import React, { useState, useEffect } from "react";
import {AiFillHome} from 'react-icons/ai';
import {ImBin} from 'react-icons/im'
import axios from "axios";
import { burgers } from "./Food/Burgers";
import { pizzas } from "./Food/Pizzas";
import { desserts } from "./Food/Desserts";
import { useNavigate } from "react-router-dom";
import { chinese } from "./Food/Chinese";
import Order from "./Order"

function Cart() {

    const logged = localStorage.getItem('logged');

    const navigate = useNavigate();
    const navigatetoRes = () => {
        navigate('/Restaurant')
    }

  const [cartitems, setCartItems] = useState([]);
  const [totalcost, settotalcost] = useState(0)
  const [quantity, setquantity] = useState([]);

  
    useEffect(() => {
    axios.post("http://localhost:3001/cart", {
      custID: logged,
    }).then((response) => {
      const Quantity = response.data.map(item => item.quantity);
      setquantity(Quantity)
      const cartData = response.data.map(item => item.food);
      //let Items = [];
    //   cartData.forEach(item => {
    //     const burger = burgers.find((burger) => burger.name === item.food)
    //     if(burger) {
    //         Items.push(burger);
    //     }
        
      //});
      
      const filteredBurgers = burgers.filter(burger => cartData.includes(burger.name));
      const filteredPizzas = pizzas.filter(pizza => cartData.includes(pizza.name));
      const filteredChinese = chinese.filter(chinese => cartData.includes(chinese.name));
      const filteredDesserts = desserts.filter(dessert => cartData.includes(dessert.name));
      const Items = [...filteredBurgers, ...filteredPizzas, ...filteredChinese, ...filteredDesserts]
      setCartItems(Items);
      console.log(Items)
      getcost(Quantity);
    })
  }, [])

  const deleteitem = (item) => {
    console.log("deleting")
    axios.post("http://localhost:3001/delete", {
        food: item.name
    })
  }

  const decreaseQuan = (item, index) => {
    const Quantity = [...quantity]
    Quantity[index] -= 1;
    axios.post("http://localhost:3001/changeQuan", {
        food: item.name,
        quantity: Quantity[index],
        cost: (item.cost)*Quantity[index]
    })
    setquantity(Quantity)
    getcost(Quantity)
  }

  const increaseQuan = (item, index) => {
    const Quantity = [...quantity]
    Quantity[index] += 1;
    axios.post("http://localhost:3001/changeQuan", {
        food: item.name,
        quantity: Quantity[index],
        cost: (item.cost)*Quantity[index]
    })
    setquantity(Quantity)
    getcost(Quantity)
  }

  const getcost = (Quantity) => {
    let total = 0
    let i = 0
    for (i=0; i<cartitems.length; i++) {
      total = total + (Quantity[i])*(parseInt(cartitems[i].cost))
    }
    settotalcost(total)
  }

  const [pay, setpay] = useState(false)
  function order() {
    setpay(!pay)
  }

  const [Ordered, setOrdered] = useState(false)
  function ordered() {
      order()
      setOrdered(true)
  }

  return (
    <div className="bg-[url('./Background.png')]">
        <div className="p-5 justify-between flex">
            <img src={require('./Logo.png')} alt='Logo' className='h-12 col-span-1' />
            <button><AiFillHome className="text-white m-2" size={30} onClick={(event) => navigatetoRes(-1)}/></button>
        </div>
        <div className="grid place-items-center h-screen font-serif text-white">
        <h1 className='font-bold text-2xl top-10 absolute'>Cart</h1>
        <p className='font-bold text-lg top-24 absolute'>Total Cost: {totalcost}</p>
        {Ordered ? 
          <div className="absolute top-32 grid place-items-center">
            <p className="text-lg font-semibold">Order Placed!</p>
            <p>You'll recieve your order in 15 mins</p>
          </div>
          : <button className="px-2 bg-green-600 my-0 rounded-lg border-white border-2 absolute top-32" onClick={order}>Place Order</button>
        } 
        <div className="grid grid-cols-5 m-10 text-lg mt-0 place-self-start absolute top-1/3">
        {cartitems.length > 0 ? (
            cartitems.map((item, index) => (
            <div className='bg-cyan-800 grid p-2 m-5 rounded-xl border-2 border-black relative' key={index}>
                <img src={item.src} alt='item' className="h-32 place-self-center bg-cyan-950 p-2 rounded-lg" />
                <div className="m-2 mr-5">
                <p className="flex right-3 absolute ">{item.category}</p>
                {item.name}
                </div>
                <div className="m-2 font-sans">
                    <div className="grid grid-cols-3 w-16 text-sm absolute right-5">
                        <button className="border-2 place-items-center grid" onClick={(event) => decreaseQuan(item,index)}>{quantity[index]===1 ? <ImBin size={10} onClick={(event) => deleteitem(item)}/> : '-'}</button>
                        <button className="border-2 bg-transparent">{quantity[index]}</button>
                        <button className=" increase border-2" onClick={(event) => increaseQuan(item,index)}>+</button>
                    </div>
                Rs. {(item.cost)*quantity[index]}</div>
            </div>
            ))
        ) : (<p className='col-span-5'>No items in cart</p>
        )}
        </div>
        </div>
      {pay ? <Order amount={totalcost} close={order} placed={ordered}/> : null}
    </div>
  );
}

export default Cart;