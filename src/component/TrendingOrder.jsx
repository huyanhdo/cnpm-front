
import React, { useState, useEffect } from 'react';
import Order from './Order'
import './TrendingOrder.css'


function TrendingOrder() {
    const [trendingorderList, setTrendingorderList] = useState([
        {
            id: 1,
            top: "week",
            cal: 500,
            title: "pizza",
            person: 5,
            price: 7.49,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6BiEad3ASAlthVZG5WvRPFZxolEvUlmA4w&usqp=CAU'
        },

        {
            id: 1,
            top: "week",
            cal: 500,
            title: "pizza",
            person: 5,
            price: 7.49,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6BiEad3ASAlthVZG5WvRPFZxolEvUlmA4w&usqp=CAU'
        },

        {
            id: 1,
            top: "week",
            cal: 500,
            title: "pizza",
            person: 5,
            price: 7.49,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6BiEad3ASAlthVZG5WvRPFZxolEvUlmA4w&usqp=CAU'
        },

        {
            id: 1,
            top: "week",
            cal: 500,
            title: "pizza",
            person: 5,
            price: 7.49,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6BiEad3ASAlthVZG5WvRPFZxolEvUlmA4w&usqp=CAU'
        },

        {
            id: 1,
            top: "week",
            cal: 500,
            title: "pizza",
            person: 5,
            price: 7.49,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6BiEad3ASAlthVZG5WvRPFZxolEvUlmA4w&usqp=CAU'
        },

        {
            id: 1,
            top: "week",
            cal: 500,
            title: "pizza",
            person: 5,
            price: 7.49,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6BiEad3ASAlthVZG5WvRPFZxolEvUlmA4w&usqp=CAU'
        },
        {
            id: 1,
            top: "week",
            cal: 500,
            title: "pizza",
            person: 5,
            price: 7.49,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6BiEad3ASAlthVZG5WvRPFZxolEvUlmA4w&usqp=CAU'
        },
        {
            id: 1,
            top: "week",
            cal: 500,
            title: "pizza",
            person: 5,
            price: 7.49,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6BiEad3ASAlthVZG5WvRPFZxolEvUlmA4w&usqp=CAU'
        },
        {
            id: 1,
            top: "week",
            cal: 500,
            title: "pizza",
            person: 5,
            price: 7.49,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6BiEad3ASAlthVZG5WvRPFZxolEvUlmA4w&usqp=CAU'
        },
        {
            id: 1,
            top: "week",
            cal: 500,
            title: "pizza",
            person: 5,
            price: 7.49,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6BiEad3ASAlthVZG5WvRPFZxolEvUlmA4w&usqp=CAU'
        },
    ])

    return (
        <div className="TrendingOrder">

            <div className="Trending-title">

                <h2>Trending Orders</h2>
                <div className="view-all">
                    <p>View all <i class="fas fa-chevron-circle-right"></i></p>

                </div>

            </div>

            <div className="cards">
                <Order orders={trendingorderList} />
                {/* <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order /> */}

            </div>


        </div>

    );
}

export default TrendingOrder;