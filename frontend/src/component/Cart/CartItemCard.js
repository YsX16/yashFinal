import React from "react";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction"


const CartItemCard = ({ item, deletecartitem }) => {
  

  // const dispatch = useDispatch();

  

 
//   const increaseQuantity = (id, quantity, stock)=> {
//     const newQty = quantity + 1;
//     if(stock <= quantity){
//         return;
//     }
//     dispatch(addItemsToCart(id, newQty))
// }

// const decreaseQuantity = (id, quantity)=> {
//   const newQty = quantity - 1;
//   if(1 >= quantity){
//       return;
//   }
//   dispatch(addItemsToCart(id, newQty))

// }




 

  
  return (
    <>
      <tbody>
        <td>
          <h5 onClick={() => deletecartitem(item.product)}>
            <i className="far fa-times-circle"></i>
          </h5>
        </td>
        <td>
          <img src={item.image} alt="cloths" />
        </td>
        <td><p>{item.name}</p></td>
        <td> {`$ ${item.price}`} </td>
        <td>{item.size}</td>
      

        <td>
          
          <input type="number" className="quantity" readOnly value={item.quantity}></input>
          
        </td>
        <td>{`$ ${item.price * item.quantity}`}</td>
      </tbody>

     
    </>
  );
};

export default CartItemCard;
