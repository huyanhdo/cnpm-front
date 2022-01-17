import { Box, Divider , IconButton, Rating, Stack, Typography, Button, TextField, Modal, Fade, InputAdornment,MenuItem,
Radio,RadioGroup, FormControlLabel, FormControl, FormLabel} from "@mui/material";
import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useDispatch} from "react-redux";
import { delete1Pizza } from "../store/categories/pizzaSlice";
import { delete1Appetizer } from "../store/categories/appetizerSlice";
import { delete1Dessert } from "../store/categories/dessertSlice";
import { delete1Drink } from "../store/categories/drinkSlice";
import { delete1Kid } from "../store/categories/kidSlice";
import { delete1Vegetable } from "../store/categories/vegetableSlice";
import { delete1Combo } from "../store/comboSlice";

import axios from 'axios';
const timeToDate = (time) =>{
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1;
    let day = date.getDate()
    return year + '/' + month + '/' + day;   
}
// Card Pizza with 'edit' and 'delete' button
export const PizzaManageCard = (props)=>{
    const dispatch = useDispatch();
    const categories = {
        'pizza':{
            delete: delete1Pizza
        },
        'dessert':{
            delete: delete1Dessert

        },
        'drink':{
            delete: delete1Drink

        },
        'vegetable':{
            delete: delete1Vegetable

        },
        'kid':{
            delete: delete1Kid

        },
        'appetizer':{
            delete: delete1Appetizer

        }
    }
    const category = props.category;
    const url = props.cardUrl;
    const id = props.id;
    const [hov, setHov] = useState(false);
    const [editPizza, setEditPizza] = useState(false); //State of modal edit
    const [deletePizza, setDeletePizza] = useState(false); //State of modal delete
    const [name, setName] = useState(props.item.title);
    const [price, setPrice] = useState(props.item.price);
    const [sizes, setSizes] = useState(props.item.size);
    const [description, setDescription] = useState(props.item.description);
    const [image, setImage] = useState(props.item.image_url);
    const [toppings, setToppings] = useState(props.item.topping);
    const switchHov = ()=>{
        setHov(prev => !prev);
    }

    const checkItem = () => {
        if(category == 'pizza'){
            if(name.length == 0 || description.length ==0 || image.length == 0 || price.length == 0 ||
                (toppings[0].topping_name.length ==0 && toppings[0].topping_price.length ==0) || sizes[0].type_price.length ==0 ||
                sizes[0].type_detail.length == 0 ){
                    alert("Hãy điền đủ thông tin!")
                    return false;
                }
            if(isNaN(parseInt(price)) ){
                alert("Giá trị không hợp lệ !");
                return false;
            }
            sizes.forEach(a => {
                if(isNaN(parseInt(a.type_price)) || parseInt(a.type_price) < 0 || a.type_detail.length == 0){
                    alert("Giá trị không hợp lệ !");
                    return false;
                }
            });
            if(!((toppings[0].topping_name.length ==0 && toppings[0].topping_price.length ==0) && toppings.length == 1))
            toppings.forEach(a => {
                if(isNaN(parseInt(a.topping_price)) || parseInt(a.topping_price) <= 0 || a.topping_name.length == 0){
                    alert("Giá trị không hợp lệ !");
                    return false;
                }
            });
        }
        else{
            if(name.length == 0 || description.length ==0 || image.length == 0 || price.length == 0){
                    alert("Hãy điền đủ thông tin!")
                    return false;
                }
            if(isNaN(parseInt(price)) ){
                alert("Giá trị không hợp lệ!");
                return false;
            }
        }
        return true;
    }

    //handle the dynamic Sizes in Modal
    const handleSizeChange = (index, e) => {
        const Sizes = [...sizes];
        Sizes[index][e.target.name] =e.target.value ;
        setSizes(Sizes);
    }

    const handleAddSize = () => {
        setSizes([...sizes, {type_detail: '', type_price: ''}]);
    }

    const handleRemoveSize = (index) => {
        const Sizes = [...sizes];
        Sizes.splice(index,1);
        setSizes(Sizes);
    }
    // ...........

    //handle the dynamic Toppings in Modal
    const handleToppingChange = (index, e) => {
        const Toppings = [...toppings];
        Toppings[index][e.target.name] = e.target.value;
        setToppings(Toppings);
    }

    const handleAddTopping = () => {
        setToppings([...toppings, {topping_name: '', topping_price: ''}]);
    }

    const handleRemoveTopping = (index) => {
        const Toppings = [...toppings];
        Toppings.splice(index,1);
        setToppings(Toppings);
    }
    // ...........
    const EditHandle = async () => {
        const newItem = {
            comment: props.item.comment,
            description: description,
            image_url: image,
            order_number: props.item.order_number,
            price: parseInt(price), 
            rating: props.item.rating,
            title: name,
        };
        if(category == 'pizza'){
            newItem['size'] = [];
            sizes.forEach(a => newItem['size'].push({"type_detail":a.type_detail, "type_price": parseInt(a.type_price)}));
            newItem['topping'] = [];
            toppings.forEach(a => newItem['topping'].push({ "topping_name":a.topping_name, "topping_price": parseInt(a.topping_price)}));
            newItem['type'] = ["Đế giòn","Đế mềm xốp truyền thống"];
        }
        try {
            const resp = await axios.put(url, newItem);
            if (resp.statusText === "OK"){

            }else{
                alert("Sua khong thanh cong !");
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }


    const DeleteHandle = async () => { 
        try {
            const resp = await axios.delete(url);
            console.log(resp);
            if (resp.statusText === "OK"){
                // setInterval(window.location.reload(), 1000);
                dispatch(categories[category].delete({id: id}));
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    return (
        <Box
        sx={{
            marginTop: '100px'
        }}
        >
        <Box
        onMouseEnter={switchHov}
        onMouseLeave = {() => {if(hov === true) switchHov()}}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'start',
            backgroundColor: hov ?'rgba(234, 106, 18, 0.7)': 'rgba(255, 255, 255, 0.4)',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            maxWidth: '200px',
            height: '350px',
            borderRadius: '24px',
            p: 3,
            boxSizing: 'border-box',
            marginRight: {md: 0, sm: 2, xs: 2}
        }}
        >
            <img 
            src={image}
            alt={name}
            style={{
            borderRadius: '50%',
            boxShadow: '0px 30px 30px rgba(234, 106, 18, 0.05)',
            alignSelf: 'center',
            transform: 'translateY(-34px)',
            objectFit: 'cover',
            // boxShadow: '1px -1px 5px rgba(0,0,0, 0.5)',
            width: '150px', height: '150px',
            marginTop: '-1000px',
            }}
            />
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '175%',
                        color: hov? 'white': 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >{name.length < 16 ? name : name.slice(0, 15) + '...' }
            </Typography>
            <Rating value={props.item.rating} readOnly
            sx={{
                color: hov? 'white':'#EA6A12',
            }}
            icon={<StarRoundedIcon/>}
            emptyIcon={<StarRoundedIcon/>}
            />
            <Stack
            direction='row'
            spacing={3}
            sx={{
                marginTop: '20px'
            }}
            >
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: hov? 'white': '#EA6A12',
                        textAlign: 'start'
                    }}
                    > {price} VND
                </Typography>
            </Stack>
            <Stack
            spacing={2}
            sx={{width:'100%', marginTop:'14px'}}
            >
                <Button variant="contained" startIcon = {<EditIcon sx={{color: hov?  '#EA6A12': 'white'}}/>}
                sx={{
                    backgroundColor: hov? 'white': 'rgba(234, 106, 18, 0.7)',
                    '&:active, &:hover':{
                        backgroundColor:  'white'
                    }
                }}
                onClick={(e)=>{
                    e.stopPropagation();
                    return setEditPizza(true)}}
                >
                    <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '175%',
                        color: hov?  '#EA6A12': 'white',
                        textAlign: 'center',
                        
                    }}
                    >Sửa
                </Typography>
                </Button>
                <Button variant="contained" startIcon = {<DeleteIcon sx={{color: hov?  '#EA6A12': 'white'}}/>}
                sx={{
                    backgroundColor: hov? 'white': 'rgba(234, 106, 18, 0.7)',
                    '&:active, &:hover':{
                        backgroundColor:  'white'
                    }
                }}
                onClick={(e)=>{
                    e.stopPropagation();
                    return setDeletePizza(true)}}
                >
                    <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '175%',
                        color: hov?  '#EA6A12': 'white',
                        textAlign: 'center'
                    }}
                    >Xóa
                </Typography>
                </Button>
            </Stack>
        </Box>
        <Modal open={editPizza} onClose = {() => {if(hov === true) switchHov() ;setEditPizza(false)}}>
            <Fade in={editPizza} timeout={500}>
            <Stack
            spacing = {2}
            sx={{
                borderRadius: '24px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 3,
                boxShadow: 24,
                width: {md: '50%', sm: '80%', xs: '90%'}
            }}
            >
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Sửa món
                </Typography>

                <Stack direction="row" spacing={2}>
                <TextField onChange={(e) => {setName(e.target.value)}}
                required defaultValue={name}
                variant="standard"
                id="name-field"
                label="Tên"
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                sx={{
                    width: '60%'
                }}
                />
                <TextField onChange={(e) => {setPrice(e.target.value)}}
                    required defaultValue={price}
                    variant="standard"
                    id="price-field"
                    label="Giá"
                    multiline
                    maxRows={1}
                    color='warning'
                    InputProps={{style: {fontFamily: 'be Vietnam'}, endAdornment: <InputAdornment position="end">VND</InputAdornment>,}} // font size of input text
                    InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                    sx={{
                        width: '40%'
                    }}
                />
                </Stack>

                {
                    category ==='pizza' &&
                    <Box 
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight:'162px',
                    overflow: 'auto',
                    }}
                    >
                    {sizes.map((size, index) => (
                        <Stack key={index} direction='row' spacing={2} sx={{marginTop:'6px'}}
                        >
                            <TextField onChange={(e) => {handleSizeChange(index, e)}}
                            required value={size.type_detail}
                            variant="standard" defaultValue={size.type_detail}
                            name="type_detail"
                            label="Cỡ"
                            multiline
                            maxRows={1}
                            color='warning'
                            InputProps={{style: {fontFamily: 'be Vietnam'},}} // font size of input text
                            InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                            sx={{
                                width: '40%'
                            }}
                            />
                            <TextField onChange={(e) => {handleSizeChange(index, e)}}
                            required value={size.type_price}
                            variant="standard" defaultValue={size.type_price}
                            name="type_price"
                            label="Giá cỡ"
                            multiline
                            maxRows={1}
                            color='warning'
                            InputProps={{style: {fontFamily: 'be Vietnam'}, endAdornment: <InputAdornment position="end">VND</InputAdornment>,}} // font size of input text
                            InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                            sx={{
                                width: '40%'
                            }}
                            />
                            <IconButton disabled={sizes.length === 1} onClick={(index) => handleRemoveSize(index)}>
                                <RemoveCircleOutlineIcon 
                                sx={{
                                    color:  '#EA6A12',
                                    '&:hover, &:active':{
                                    color: '#07143B'
                                    },
                                }}
                                ></RemoveCircleOutlineIcon>
                            </IconButton>
                            <IconButton onClick={() => handleAddSize()}>
                                <AddCircleOutlineIcon
                                sx={{
                                    color:  '#EA6A12',
                                    '&:hover, &:active':{
                                    color: '#07143B'
                                    },
                                }}
                                ></AddCircleOutlineIcon>
                            </IconButton>
                        </Stack>
                    ))}
                    </Box>
                    
                }

                <TextField onChange={(e) => {setDescription(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={4}
                id="description-field" label="Mô tả" defaultValue={description}
                inputProps={{style: {fontFamily: 'be Vietnam'},}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                />
                <TextField onChange={(e) => {setImage(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={1}
                id="image-field" label="URL Ảnh" defaultValue={image}
                inputProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                />

                {
                    category ==='pizza' &&
                    <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight:'162px',
                        overflow: 'auto',
                    }}
                    >
                    {toppings.map((topping, index) => (
                        <Stack key={index} direction='row' spacing={2} sx={{marginTop:'6px'}}
                        >
                            <TextField onChange={(e) => {handleToppingChange(index, e)}}
                            required value={topping.topping_name}
                            variant="standard" defaultValue={topping.topping_name}
                            name="topping_name"
                            label="Tên Topping"
                            multiline
                            maxRows={1}
                            color='warning'
                            InputProps={{style: {fontFamily: 'be Vietnam'},}} // font size of input text
                            InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                            sx={{
                                width: '40%'
                            }}
                            />
                            <TextField onChange={(e) => {handleToppingChange(index, e)}}
                            required value={topping.topping_price}
                            variant="standard" defaultValue={topping.topping_price}
                            name="topping_price"
                            label="Giá Topping"
                            multiline
                            maxRows={1}
                            color='warning'
                            InputProps={{style: {fontFamily: 'be Vietnam'}, endAdornment: <InputAdornment position="end">VND</InputAdornment>,}} // font size of input text
                            InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                            sx={{
                                width: '40%'
                            }}
                            />
                            <IconButton disabled={toppings.length === 1} onClick={(index) => handleRemoveTopping(index)}>
                                <RemoveCircleOutlineIcon 
                                sx={{
                                    color:  '#EA6A12',
                                    '&:hover, &:active':{
                                    color: '#07143B'
                                    },
                                }}
                                ></RemoveCircleOutlineIcon>
                            </IconButton>
                            <IconButton onClick={() => handleAddTopping()}>
                                <AddCircleOutlineIcon
                                sx={{
                                    color:  '#EA6A12',
                                    '&:hover, &:active':{
                                    color: '#07143B'
                                    },
                                }}
                                ></AddCircleOutlineIcon>
                            </IconButton>
                        </Stack>
                    ))}
                    </Box>
                }
                <Button variant="contained" 
                    onClick={()=>{
                        
                            if(hov === true) switchHov()
                            setEditPizza(false);
                            EditHandle()}}
                        
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        alignSelf: 'center',
                        fontFamily: 'be Vietnam',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        marginBottom: 2
                    }}
                    >
                    Lưu
                </Button>
               
            </Stack>
            </Fade>
        </Modal>
        <Modal open={deletePizza} onClose = {() => {if(hov === true ) switchHov() ;setDeletePizza(false)}}>
            <Fade in={deletePizza} timeout={500}>
            <Stack
            spacing = {2}
            sx={{
                borderRadius: '24px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 3,
                boxShadow: 24,
                width: {md: '50%', sm: '60%', xs: '60%'}
            }}
            >
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Bạn có chắc muốn xóa món này ?
                </Typography>

                <Stack direction="row" spacing={2}>
                <Button variant="contained" 
                    onClick={()=>{setDeletePizza(false);
                        return DeleteHandle()}}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        alignSelf: 'center',
                        fontFamily: 'be Vietnam',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        width: '50%'
                    }}
                    >
                    Có
                </Button>
                <Button variant="contained" 
                    onClick={()=>{setDeletePizza(false)}}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        alignSelf: 'center',
                        fontFamily: 'be Vietnam',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        width: '50%'
                    }}
                    >
                    Không
                </Button>
                </Stack>
               
            </Stack>
            </Fade>
        </Modal>
        </Box>
    )
}

export const ComboManageCard = (props) =>{
    const dispatch = useDispatch();
    const combo = props.combo;
    const [hov, setHov] = useState(false);
    const [editCombo, setEditCombo] = useState(false);
    const [deleteCombo, setDeleteCombo] = useState(false);
    const url = props.cardUrl;
    const comboId = props.comboId;


    const currencies = [
        {
          value: 'dessert',
          label: 'Dessert',
        },
        {
          value: 'kid',
          label: 'Kid',
        },
        {
          value: 'vegetable',
          label: 'Vegetable',
        },
        {
          value: 'drink',
          label: 'Drink',
        },
        {
            value: 'appetizer',
            label: 'Appetizer',
          },
    ];

    //Variable of new Combo
    const [title, setTitle] = useState(combo.title);
    const [subtitle, setSubTitle] = useState(combo.subtitle);
    const [banner, setBanner] = useState(combo.banner);
    
    const [description, setDescription] = useState(combo.description);
    const [image, setImage] = useState(combo.image);
    const [start, setStart] = useState(new Date(combo.start * 1000).toLocaleString());
    const [end, setEnd] = useState(new Date(combo.end * 1000).toLocaleString());
    const [off, setOff] = useState(combo.off);
    const [persons, setPerson] = useState(combo.persons);
    const [pizza, setPizza] = useState(combo.pizza);
    let b =[{name: '', number:''},];
    if(combo.hasOwnProperty('free') ){
        b = [];
        let key = Object.keys(combo.free);
        for (const k of key ) b.push({'name' : k, 'number' : combo.free[k]})
        
    }
    const [free, setFree] = useState(b);
    
    let keys = Object.keys(combo);
    let a =[];
    for (const k of keys ) {
        if(k !== "title" && k !== "subtitle" && k !== "banner" && k !== "image" && k !== "description" && k !== "start"
        && k !== "end" && k !== "persons" && k !== "pizza" && k !== "off" && k !== "free"){
            a.push({'name' : k, 'number' : combo[k],})
        }
    }
    const [categorys, setCategorys] = useState(a);
    const [comboType, setComboType] = useState(combo.hasOwnProperty('free') ? "free" : "off");
    const [type, setType] = useState(comboType == 'off' ? true : false);
    const switchHov = ()=>{
        setHov(prev => !prev);
    }
    const handleChangeType = (event) => {
        setComboType(event.target.value);
        setType(!type);
        
    };

    const checkCombo = () => {
        if(title.length == 0 || subtitle.length == 0 || (off.length == 0 && (free[0].number == ''))
        || persons.length == 0 || pizza.length ==0 || categorys[0].number =='' || description.length ==0
        || banner.length == 0 || image.length == 0){
            alert("Chưa điền đủ thông tin !")
            return false;
        }
        if(isNaN(parseInt(persons)) || isNaN(parseInt(pizza)) || (isNaN(parseInt(off)) && comboType == 'off') ){
            alert("Giá trị không hợp lệ !");
            return false;
        }
        if(comboType == 'free'){
            free.forEach(a => {
                if(isNaN(parseInt(a.number)) || parseInt(a.number) <= 0){
                    alert("Giá trị không hợp lệ !");
                    return false;
                }
            });
        }
        categorys.forEach(a => {
            if(isNaN(parseInt(a.number)) || parseInt(a.number) <= 0){
                alert("Giá trị không hợp lệ !");
                return false;
            }
        })
        return true;
    }

    //handle the dynamic Sizes in Modal
    const handleCategoryChange = (index, e) => {
        const Categories = [...categorys];
        Categories[index][e.target.name] =e.target.name ==='name' ? e.target.value : parseInt(e.target.value);
        setCategorys(Categories);
    }

    const handleAddCategory = () => {
        setCategorys([...categorys, {name: '', number: ''}]);
    }

    const handleRemoveCategory = (index,e ) => {
        const Categories = [...categorys];
        Categories.splice(index,1);
        setCategorys(Categories);
    }
    // ...........
    //handle the dynamic Free in Modal
    const handleFreeChange = (index, e) => {
        const Free = [...free];
        Free[index][e.target.name] =e.target.name ==='name' ? e.target.value : parseInt(e.target.value);
        setFree(Free);
    }

    const handleAddFree = () => {
        setFree([...free, {name: '', number: ''}]);
    }

    const handleRemoveFree = (index) => {
        const Free = [...free];
        Free.splice(index,1);
        setFree(Free);
    }
    // ...........


    const handleEditCombo = async () => {
        const newItem = {
            banner: banner,
            description: description,
            image: image,
            start: Date.parse(start) / 1000,
            end: Date.parse(end) / 1000, 
            persons: parseInt(persons),
            title: title,
            subtitle: subtitle,
            pizza: parseInt(pizza),
            off: parseInt(off),
        };
        if(categorys[0].name !== ''){
            categorys.forEach(a => newItem[a.name] = parseInt(a.number));
        }
        if(comboType == 'free'){
            newItem['free'] = {};
            free.forEach(a => newItem['free'][a.name] =parseInt(a.number));
            newItem.off = 0;
        }

        try {
            const resp = await axios.put(url, newItem);
            if (resp.statusText !== "OK"){
                alert("Sửa không thành công !");
            }
        } catch (err) {
            // Handle Error Here
            alert(err);
        }
    }

    const handleDeleteCombo = async () => { 
        try {
            const resp = await axios.delete(url);
            if (resp.statusText === "OK"){
                dispatch(delete1Combo({id: comboId}));
                // setInterval(window.location.reload(), 1000);
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    return(
        <Box
        sx={{
            marginTop: '100px'
        }}
        >
        <Box
        onMouseEnter={switchHov}
        onMouseLeave = {() => {if(hov === true) switchHov()}}
        sx={{
            display: 'flex',
            flexDirection:'column',
            backgroundColor: hov ?'rgba(234, 106, 18, 0.7)': 'rgba(255, 255, 255, 0.4)',
            maxWidth: '274px',
            maxHeight: '400px',
            borderRadius: '24px',
            p: 3,
            boxSizing: 'border-box',
            marginRight: '2.5%',
            marginLeft: '2.5%',
            boxShadow: '1px 1px 5px rgba(0,0,0, 0.5)'
        }}
        >
            <Box
            sx={{display: 'flex',
            alignItems: 'center',}}
            >
            <Stack spacing={1} sx={{minWidth: '150px'}}>
            <Typography variant="subtitle1" 
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: hov? 'white':'#EA6A12',
                        textAlign: 'start'
                    }}
                    >❤️ {subtitle.length <= 20 ? subtitle : subtitle.slice(0, 17) + '...'}
            </Typography>
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '175%',
                        color: hov? 'white': 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >{title.slice(0, 15)}
            </Typography>
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: hov? 'white': '#959895',
                        textAlign: 'start',
                        marginBottom: '20px'
                    }}
                    >{new Date() / 1000 > end/1000 ? "Expired" : timeToDate(start) + " - " + timeToDate(end)}   
            </Typography>
            <Divider variant="light"  sx={{
                width: '50%',
                color: hov?'white': 'rgb(0,0,0,0.5)'
            }}/>
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        textAlign: 'start',
                        color: hov? 'white': '#959895',
                        marginBottom: '20px'
                    }}
                    >{persons} người             
            </Typography>
            <Stack
            direction='row'
            spacing={1}
            sx={{
                marginTop: '20px'
            }}
            >
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: hov? 'white': '#EA6A12',
                        textAlign: 'start'
                    }}
                    >{off == 0 ? 'Bonus' : off + '% Off'}
                </Typography>
    
            </Stack>
            
            </Stack>
            <img
            src={image}
            alt={title}
            style={{
            borderRadius: '50%',
            objectFit: 'cover',
            //boxShadow: '-10px 0px 30px rgba(0, 0, 0, 0.1)',
            alignItems:'center',
            //transform: 'translateY(-30%)',
            width: '159px', height: '159px',
            }}
            />
            </Box>
            <Box
            >
                <Stack
                spacing={2}
                sx={{width:'100%', marginTop:'14px'}}
                >
                    <Button variant="contained" startIcon = {<EditIcon sx={{color: hov?  '#EA6A12': 'white'}}/>}
                    sx={{
                        width:'100%',
                        backgroundColor: hov? 'white': 'rgba(234, 106, 18, 0.7)',
                        '&:active, &:hover':{
                            backgroundColor:  'white'
                        }
                    }}
                    onClick={(e)=>{
                        e.stopPropagation();
                        return setEditCombo(true)}}
                    >
                    <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '175%',
                        color: hov?  '#EA6A12': 'white',
                        textAlign: 'center',
                        
                    }}
                    >Sửa
                </Typography>
                </Button>
                <Button variant="contained" startIcon = {<DeleteIcon sx={{color: hov?  '#EA6A12': 'white'}}/>}
                sx={{
                    backgroundColor: hov? 'white': 'rgba(234, 106, 18, 0.7)',
                    '&:active, &:hover':{
                        backgroundColor:  'white'
                    }
                }}
                onClick={(e)=>{
                    e.stopPropagation();
                    return setDeleteCombo(true)}}
                >
                    <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '175%',
                        color: hov?  '#EA6A12': 'white',
                        textAlign: 'center'
                    }}
                    >Xóa
                </Typography>
                </Button>
            </Stack>
            </Box>
            
            <Modal open={editCombo} onClose = {() => {if(hov === true) switchHov(); setEditCombo(false)}}>
            <Fade in={editCombo} timeout={500}>
            <Stack
            spacing = {1}
            sx={{
                borderRadius: '24px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 3,
                boxShadow: 24,
                width: {md: '50%', sm: '80%', xs: '90%'}
            }}
            >
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >{'Sửa Combo'}
                </Typography>

                <Stack direction="row" spacing={2}>
                <TextField onChange={(e) => {setTitle(e.target.value)}}
                required defaultValue={title}
                variant="standard"
                id="title"
                label="Tên Combo"
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                sx={{
                    width: '50%'
                }}
                />
                <TextField onChange={(e) => {setSubTitle(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={4}
                id="subtitle" label="Phụ đề" defaultValue={subtitle}
                inputProps={{style: {fontFamily: 'be Vietnam'},}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                sx={{
                    width: '50%'
                }}
                />
                </Stack>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Loại Combo</FormLabel>
                    <RadioGroup row
                        aria-label="Type Combo"
                        name="comboType"
                        value={comboType}
                        onChange={(e) => handleChangeType(e)}
                    >
                        <FormControlLabel value="off" control={<Radio />} label="% Giảm giá" />
                        <FormControlLabel value="free" control={<Radio />} label="Miễn phí" />
                    </RadioGroup>
                </FormControl>
                <Stack direction="row" spacing={2}>
                <TextField onChange={(e) => {setOff((e.target.value))}}
                    disabled={!type ? true : false} value={off} 
                    variant="standard"
                    id="off"
                    label="%Giảm giá"
                    multiline
                    maxRows={1}
                    color='warning'
                    InputProps={{style: {fontFamily: 'be Vietnam'}, }} // font size of input text
                    InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                    sx={{
                        width: '40%'
                    }}
                />
                <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight:'60px',
                    overflow: 'auto',
                    width: '54%'
                }}
                >
                {free && free.map((fre, index) => (
                    <Stack key={index} direction='row' spacing={2} 
                    >
                        <TextField
                        name="name" variant="standard" disabled={type ? true : false}
                        select 
                        label="Loại"
                        value={fre.name}
                        onChange={(e) => {handleFreeChange(index, e)}}
                        color='warning'
                        InputProps={{style: {fontFamily: 'be Vietnam'},}} // font size of input text
                        InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                        sx={{
                            width: '70%'
                        }}
                        >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}

                        </TextField>
                        
                        <TextField onChange={(e) => {handleFreeChange(index, e)}}
                        value={'' +  fre.number} disabled={type ? true : false}
                        variant="standard"
                        name="number"
                        label="Số lượng"
                        multiline
                        maxRows={1}
                        color='warning'
                        InputProps={{style: {fontFamily: 'be Vietnam'},}} // font size of input text
                        InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                        sx={{
                            width: '30%'
                        }}
                        />
                        <IconButton disabled={free.length === 1} onClick={(index) => handleRemoveFree(index)}>
                            <RemoveCircleOutlineIcon 
                            sx={{
                                color:  '#EA6A12',
                                '&:hover, &:active':{
                                color: '#07143B'
                                },
                            }}
                            ></RemoveCircleOutlineIcon>
                        </IconButton>
                        <IconButton disabled={type ? true : false} onClick={() => handleAddFree()}>
                            <AddCircleOutlineIcon 
                            sx={{
                                color:  '#EA6A12',
                                '&:hover, &:active':{
                                color: '#07143B'
                                },
                            }}
                            ></AddCircleOutlineIcon>
                        </IconButton>
                    </Stack>
                ))}
                </Box>
                </Stack>

                <Stack direction="row" spacing={2}>
                <TextField onChange={(e) => {setPerson(e.target.value)}}
                    required defaultValue={persons}
                    variant="standard"
                    id="persons"
                    label="Số người"
                    multiline
                    maxRows={1}
                    color='warning'
                    InputProps={{style: {fontFamily: 'be Vietnam'}, }} // font size of input text
                    InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                    sx={{
                        width: '50%'
                    }}
                />
                <TextField onChange={(e) => {setPizza(e.target.value)}}
                    required  defaultValue={pizza}
                    variant="standard"
                    id="pizza"
                    label="Pizza" 
                    multiline
                    maxRows={1}
                    color='warning'
                    InputProps={{style: {fontFamily: 'be Vietnam'}, }} // font size of input text
                    InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                    sx={{
                        width: '50%'
                    }}
                />
                </Stack>

                <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight:'110px',
                    overflow: 'auto',
                }}
                >
                {categorys.map((category, index) => (
                    <Stack key={index} direction='row' spacing={2} sx={{marginTop:'6px'}}
                    >
                        <TextField
                        name="name" variant="standard"
                        select 
                        label="Loại"
                        value={category.name}
                        onChange={(e) => {handleCategoryChange(index, e)}}
                        color='warning'
                        InputProps={{style: {fontFamily: 'be Vietnam'},}} // font size of input text
                        InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                        sx={{
                            width: '40%'
                        }}
                        >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}

                        </TextField>

                        <TextField onChange={(e) => {handleCategoryChange(index, e)}}
                        required defaultValue={category.number}
                        variant="standard"
                        name="number"
                        label="Số lượng"
                        multiline
                        maxRows={1}
                        color='warning'
                        InputProps={{style: {fontFamily: 'be Vietnam'},}} // font size of input text
                        InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                        sx={{
                            width: '40%'
                        }}
                        />
                        <IconButton disabled={categorys.length === 1} onClick={(e) => handleRemoveCategory(index,e)}>
                            <RemoveCircleOutlineIcon 
                            sx={{
                                color:  '#EA6A12',
                                '&:hover, &:active':{
                                color: '#07143B'
                                },
                            }}
                            ></RemoveCircleOutlineIcon>
                        </IconButton>
                        <IconButton onClick={() => handleAddCategory()}>
                            <AddCircleOutlineIcon
                            sx={{
                                color:  '#EA6A12',
                                '&:hover, &:active':{
                                color: '#07143B'
                                },
                            }}
                            ></AddCircleOutlineIcon>
                        </IconButton>
                    </Stack>
                ))}
                </Box>
                <TextField onChange={(e) => {setDescription(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={4}
                id="description" label="Mô tả" defaultValue={description}
                inputProps={{style: {fontFamily: 'be Vietnam'},}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                />
                <TextField onChange={(e) => {setBanner(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={1}
                id="banner" label="URL Banner" defaultValue={banner}
                inputProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                />
                <TextField onChange={(e) => {setImage(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={1}
                id="image" label="URL Ảnh" defaultValue = {image}
                inputProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack
                direction={'row'} spacing={4}
                >
                    <DateTimePicker
                    sx={{width:'50%'}} 
                    label="Bắt đầu" 
                    value={start}
                    onChange={(newValue) => {
                        setStart(newValue);
                      }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    <DateTimePicker
                    sx={{width:'50%'}}
                    label="Kết thúc"
                    value={end}
                    onChange={(newValue) => {setEnd(newValue)}}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
                </LocalizationProvider>
                <Button variant="contained" 
                    onClick={()=>{
                        if(checkCombo()){
                            if(hov === true) switchHov()
                            setEditCombo(false);
                            handleEditCombo();
                        }
                    }}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        alignSelf: 'center',
                        fontFamily: 'be Vietnam',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        marginBottom: 2
                    }}
                    >
                    Lưu 
                </Button>
               
            </Stack>

            </Fade>
            </Modal>

            <Modal open={deleteCombo} onClose = {() => {if(hov === true) switchHov() ;setDeleteCombo(false)}}>
            <Fade in={deleteCombo} timeout={500}>
            <Stack
            spacing = {2}
            sx={{
                borderRadius: '24px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 3,
                boxShadow: 24,
                width: {md: '50%', sm: '60%', xs: '60%'}
            }}
            >
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Bạn có muốn xóa combo này?
                </Typography>

                <Stack direction="row" spacing={2}>
                <Button variant="contained" 
                    onClick={()=>{setDeleteCombo(false);
                        return handleDeleteCombo()}}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        alignSelf: 'center',
                        fontFamily: 'be Vietnam',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        width: '50%'
                    }}
                    >
                    Có
                </Button>
                <Button variant="contained" 
                    onClick={()=>{setDeleteCombo(false)}}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        alignSelf: 'center',
                        fontFamily: 'be Vietnam',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        width: '50%'
                    }}
                    >
                    Không
                </Button>
                </Stack>
               
            </Stack>
            </Fade>
        </Modal>
        </Box>
        </Box>
    )
}