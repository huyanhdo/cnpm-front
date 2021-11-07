import React from 'react';
import './Order.css'
import crown from './img/noto_crown.jpg'

function Order() {

    return (

        <div className="card">
            <div className="card-content">
                <div className="card-content-top">
                    <img src={crown} />
                    Top of the week
                </div>
                <div className="card-title"><h3 className="card-content-title">Pizza</h3></div>
                <div className="card-content-cal">100 Calories</div>
                <div className="card-content-person">5 person</div>
                <div className="card-content-cost">
                    <div className="cost">$ 7.49</div>
                    <button className="add"> + </button>
                </div>


            </div>
            <img id="thumbnail1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6BiEad3ASAlthVZG5WvRPFZxolEvUlmA4w&usqp=CAU" alt="" />

        </div>
    );
}

export default Order;