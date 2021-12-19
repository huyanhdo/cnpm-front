const axios = require('axios');
const combo = {
    "m1":{
        banner: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/pizza-banner-design-template-5623a47ee70d2ca4f3a4eca9c19a8039_screen.jpg?ts=1572691129',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDZe7JCSj_eJEnB_ZOL1WkfaIJVlBOqxWzg&usqp=CAU",
        title: 'Happy Christmas',
        subtitle: 'Khuyến mãi đặc biệt nhân dịp Giáng Sinh',
        description: '2 pizza, 2 nước, quẩy cực căng',
        off: 10,
        start: 1640217600,
        end: 1640390400,
        pizza: 2,
        drink: 2,
        persons: 2
    },
    "m2":{
        banner: 'https://glamadelaide.com.au/wp-content/uploads/2019/02/51836836_766711283705155_5455311075324985344_n.jpg',
        image: "https://cdn.chanhtuoi.com/uploads/2015/10/w400/Cowboy-Jacks-khai-truong-pizza-voi-gia-an-thu-chi-150k.jpg.webp",
        title: 'Golden Week',
        subtitle: 'Sale hàng tuần lễ vàng',
        description: '2 pizza, 1 món tráng miệng, 1 cho trẻ em',
        off: 15,
        start: 1640317600,
        end: 1640490400,
        pizza: 2,
        dessert: 1,
        kid: 1,
        persons: 3
    },
    "m3":{
        banner: 'https://image.freepik.com/free-psd/restaurant-banner-template_23-2148466832.jpg',
        image: "https://vcdn1-dulich.vnecdn.net/2014/07/02/1-6347-1404290003.png?w=680&h=0&q=100&dpr=1&fit=crop&s=JeOABmoYLnUBaK3KU_ZmSw",
        title: 'Silver Week',
        subtitle: 'Sale hàng tuần lễ bạc',
        description: '1 pizza, 1 món khai vị, 1 món chay',
        off: 15,
        start: 1640417600,
        end: 1640590400,
        pizza: 1,
        appetizer: 1,
        vegetable: 1,
        persons: 2
    },
}
axios.put('https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/combo.json', combo).then((res, err) => {
    if(!err)
        console.log(res)
    else console.error(err);
})