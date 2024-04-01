import url from '../data/db.json'
import { useMemo } from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { Cantidad, Guitar } from '../interfaces'


export default function useCart() {
  const initializeCart = () => {
    const cartData = localStorage.getItem('cart')
    return cartData ? JSON.parse(cartData) : []
  }
  
    const initializeCantidad = () => {
      const cantidadData = localStorage.getItem('cantidad')
      return cantidadData ? JSON.parse(cantidadData) : []
    }
  
    const [ data ] = useState(url);
    const [ cart, setCart ] = useState(initializeCart);
    const [ cantidad, setCantidad ] = useState(initializeCantidad);
    
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
      localStorage.setItem('cantidad', JSON.stringify(cantidad))
    }, [cart, cantidad])
    
    const MAX_TIMES = 5
    
    function addToCart(item: Guitar) {
      const id = item.id;
  
      if(cart.find((item: Guitar) => item.id === id) === undefined) {
        setCart([...cart, item]);
        setCantidad([...cantidad, {id, times: 1}]);
      } else {
        const cantidadCopy: Cantidad[] = [...cantidad];
        const thisTimes: Cantidad | undefined = cantidadCopy.find((item) => item.id === id);
        
        if(thisTimes !== undefined && thisTimes.times < MAX_TIMES) {
            thisTimes.times += 1;
            setCantidad([...cantidadCopy]);
          }
        }
    }
  
    const itemLessTimes = (id: number) => {
      const cantidadCopy = [...cantidad]
      const thisTimes = cantidadCopy.find((item: Guitar) => Number(item.id) === id)
  
      if(thisTimes.times > 1){
          thisTimes.times -= 1
          setCantidad([...cantidadCopy])
      }
    }
  
    const removeItem = (id: number) => {
      const thisItem: Guitar | undefined = cart.find((item: Guitar) => Number(item.id) === id)
  
      setCart(cart.filter((item: Guitar) => item !== thisItem))
      setCantidad(cantidad.filter((item: Guitar) => Number(item.id) !== id))
    };
  
    const flushCart = () => { setCart([]); setCantidad([]) };
  
    const totalPrice: number = useMemo(
      () => cart.reduce((totalAcc: number, item: Guitar) => {
          const thisQuantity = cantidad.find((i:Guitar) => i.id === item.id)
  
          return totalAcc + (item.price * thisQuantity.times)
      }, 0), [cart, cantidad])
  

    const itemsAdded = (id: number): number => (cantidad.find((item: Guitar) => Number(item.id) === id).times);

    const isCartEmpty = useMemo(() => cart.length === 0, [cart]);

  return {
    data,
    cart,
    addToCart,
    itemLessTimes,
    removeItem,
    flushCart,
    totalPrice,
    itemsAdded,
    isCartEmpty,
  }
}