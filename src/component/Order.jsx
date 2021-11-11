import React from 'react';
import './Order.css'
import PropTypes from 'prop-types'
import crown from './img/noto_crown.jpg'

// Order.PropTypes = {
//     orders: PropTypes.array,
// };
// Order.defaultProps = {
//     order: [],
// };

function Order(props) {
    const { orders } = props;

    return (<div className="trending-content">
        {orders.map(order => (
            <div className="card" key={order.id}>
                <div className="card-content">
                    <div className="card-content-top">
                        <img src={crown} />
                        Top of the {order.top}
                    </div>
                    <div className="card-title"><h3 className="card-content-title">{order.title}</h3></div>
                    <div className="card-content-cal">{`${order.cal} Calories`}</div>
                    <div style={{
                        width: '31px',
                        height: '0px',
                        border: '1px solid #E3E1E1'
                    }}></div>
                    <div className="card-content-person">{`${order.person} person`}</div>
                    <div className="card-content-price">
                        <div className="price">{`$ ${order.price}`}</div>
                        <button className="add"> + </button>
                    </div>


                </div>
                <img id="thumbnail1" src={order.img} alt="" />

            </div>))}
    </div>
    );
}

export default Order;