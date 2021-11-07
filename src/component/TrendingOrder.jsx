
import React, { useState, useEffect } from 'react';
import Order from './Order'
import './TrendingOrder.css'


function TrendingOrder() {


    return (
        <div className="TrendingOrder">

            <div className="Trending-title">
                <div className="Trending-top">
                    <h2>Trending Orders</h2>
                    <div className="view-all">
                        <p>View all <i class="fas fa-chevron-circle-right"></i></p>

                    </div>
                </div>
            </div>

            <div className="cards">

                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
            </div>


        </div>

    );
}

export default TrendingOrder;