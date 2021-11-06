import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import './MyCart.css';

function MyCart() {

    const orderList = [
        {
            id: 1,
            name: "Mushroom Pizza",
            count: 1,
            price: 7.49,
            image: 'https://scontent-xsp1-2.xx.fbcdn.net/v/t1.15752-9/248667782_3087863764791610_8111441538665772441_n.png?_nc_cat=102&ccb=1-5&_nc_sid=ae9488&_nc_ohc=ntO9YeapJZsAX8qeL2F&_nc_ht=scontent-xsp1-2.xx&oh=c0a39ba99d1635ffa538d2fe8f8b1ce0&oe=61AC6D3F',

        },
        {
            id: 2,
            name: "Italian Pizza",
            count: 1,
            price: 7.49,
            image: 'https://scontent-xsp1-2.xx.fbcdn.net/v/t1.15752-9/248667782_3087863764791610_8111441538665772441_n.png?_nc_cat=102&ccb=1-5&_nc_sid=ae9488&_nc_ohc=ntO9YeapJZsAX8qeL2F&_nc_ht=scontent-xsp1-2.xx&oh=c0a39ba99d1635ffa538d2fe8f8b1ce0&oe=61AC6D3F',
            
        },
        {
            id: 3,
            name: "Sausage Pizza",
            count: 1,
            price: 7.49,
            image: 'https://scontent-xsp1-2.xx.fbcdn.net/v/t1.15752-9/248667782_3087863764791610_8111441538665772441_n.png?_nc_cat=102&ccb=1-5&_nc_sid=ae9488&_nc_ohc=ntO9YeapJZsAX8qeL2F&_nc_ht=scontent-xsp1-2.xx&oh=c0a39ba99d1635ffa538d2fe8f8b1ce0&oe=61AC6D3F',
            
        },
        {
            id: 4,
            name: "Cheese Pizza",
            count: 1,
            price: 7.49,
            image: 'https://scontent-xsp1-2.xx.fbcdn.net/v/t1.15752-9/248667782_3087863764791610_8111441538665772441_n.png?_nc_cat=102&ccb=1-5&_nc_sid=ae9488&_nc_ohc=ntO9YeapJZsAX8qeL2F&_nc_ht=scontent-xsp1-2.xx&oh=c0a39ba99d1635ffa538d2fe8f8b1ce0&oe=61AC6D3F',
            
        },
        {
            id: 5,
            name: "Mushroom Pizza",
            count: 1,
            price: 7.49,
            image: 'https://scontent-xsp1-2.xx.fbcdn.net/v/t1.15752-9/248667782_3087863764791610_8111441538665772441_n.png?_nc_cat=102&ccb=1-5&_nc_sid=ae9488&_nc_ohc=ntO9YeapJZsAX8qeL2F&_nc_ht=scontent-xsp1-2.xx&oh=c0a39ba99d1635ffa538d2fe8f8b1ce0&oe=61AC6D3F',

        },
        
    ]



    return (
        <div className="my-cart">
            <div className="header">
                <h2>My Cart</h2>
                <hr></hr>
            </div>

            <div className="order-list">
                {orderList.map((pizza) => {
                    return (
                        <div className="item" key={pizza.id}>
                            <div className="image-item">
                                <img src={pizza.image}></img>
                            </div>
                            <div className="name-item">{pizza.name}</div>
                            <div className="count-item">{`x${pizza.count}`}</div>
                            <div className="price-item">{`$${pizza.price}`}</div>
                            <div className="delete-item">
                                <DeleteIcon />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="footer">
                <div className="check-out">
                    <button type="submit" >Checkout</button>
                </div>
            </div>

        </div>
    )
}

export default MyCart