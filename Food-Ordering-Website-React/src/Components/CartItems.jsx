import React from "react";

function CartItems(props) {
  
  return (
    <div className="container-child2 dark_icon">
      <div className="title" id="dark_color">
        Cart Items
      </div>
      <hr />
      {props.data.length === 0 ? (
        <h1 style={{margin:"40px 0px"}}>Your cart is empty.</h1>
      ) : (
        props.data.map((item, index) => (
          <div className="cart-item-card">
            <div>  
              <h4>{item.name}</h4>
              <h4 id="dark_color">${item.price}</h4>
            </div>
            <h5 id="dark_color">Hot Nacho Chips</h5>
            <div>
              <li id="dark_color"> Serves 1 </li>
              <div className="cart-item-counter">
                <button className="cartbuttons" onClick={()=>{props.subfun(item)}}>-</button>
                <div>{item.quantity}</div>
                <button onClick={()=>{props.addfun(item)}} className="cartbuttons">+</button>
              </div>
            </div>
            <hr />
          </div>
        ))
      )}

      <div className="bill">
        <div className="title" id="dark_color">
          Bill Details
        </div>
        <div className="subtotal">
          <h5 id="dark_color">Subtotal</h5>
          <h5 id="dark_color">{props.amount}</h5>
        </div>
        <div className="discount">
          <h5 id="dark_color">Discount(10%)</h5>
          <h5 id="dark_color">{0.1*props.amount}</h5>
        </div>
        <hr />
        <div className="topay">
          <h4 id="dark_color">TO Pay</h4>
          <h4 id="dark_color">{props.amount-props.amount*0.1}</h4>
        </div>
      </div>
      <div className="pay-button">PROCEED TO PAYMENT</div>
    </div>
  );
}

export default CartItems;
