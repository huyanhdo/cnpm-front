import React, { useState } from "react";
import {Box, Typography, styled, Pagination, Grow, Button, Modal, Fade, Stack, TextField,IconButton, Snackbar} from '@mui/material';
import { useSelector ,useDispatch} from "react-redux";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InputAdornment from '@mui/material/InputAdornment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { add1Combo } from "../store/comboSlice";
import { add1Pizza } from "../store/categories/pizzaSlice";
import { add1Appetizer } from "../store/categories/appetizerSlice";
import { add1Dessert } from "../store/categories/dessertSlice";
import { add1Drink } from "../store/categories/drinkSlice";
import { add1Kid } from "../store/categories/kidSlice";
import { add1Vegetable } from "../store/categories/vegetableSlice";
import { PizzaManageCard, ComboManageCard } from "./manageCard";


const axios = require('axios');
export const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
        fontFamily: 'Poppins'
    },
    "& .MuiPaginationItem-root:active": {
        backgroundColor: 'rgb(234, 106, 18, 0.5)',
    },
    '& .Mui-selected': {
        backgroundColor: 'rgb(234, 106, 18, 0.5)',
    }
})

export const ComboManage = ()=> {
    const dispatch = useDispatch();
    const products = useSelector(state => state.combos.entities);
    const ids = useSelector(state => state.combos.ids);
    const [addCombo, setAddCombo] = useState(false);
    const url= 'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/combo.json';
    const max = 16;
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];
    //Variable of new Combo
    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [banner, setBanner] = useState('');
    const [categorys, setCategorys] = useState([
       {name: '', number:''},
    ]);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [off, setOff] = useState('');
    const [persons, setPerson] = useState('');
    const [pizza, setPizza] = useState('');
    //

    //handle the dynamic Sizes in Modal
    const handleCategoryChange = (index, e) => {
        const Categories = [...categorys];
        Categories[index][e.target.id] =e.target.id ==='name' ? e.target.value : parseInt(e.target.value);
        setCategorys(Categories);
    }

    const handleAddCategory = () => {
        setCategorys([...categorys, {name: '', number: ''}]);
    }

    const handleRemoveCategory = (index) => {
        const Categories = [...categorys];
        Categories.splice(index,1);
        setCategorys(Categories);
    }
    // ...........

    

    // const handleaddPizza = () => {
    //     console.log( {
    //         comment : [],
    //         description : newDescription,
    //         image_url : newImage,
    //         order_number : 0,
    //         price : newPrice,
    //         rating: 0,
    //         size: newSizes,
    //         title: newName,
    //         topping: newToppings,
    //         type: ["Đế giòn","Đế mềm xốp truyền thống"]
    //     })
    // }
    

    const handleAddCombo = async () => {
        const newItem = {
            banner: banner,
            description: description,
            image: image,
            start: Date.parse(start) / 1000,
            end: Date.parse(end) / 1000, 
            persons: persons,
            title: title,
            subtitle: subtitle,
            pizza: pizza,
            off: off,
        };
        if(categorys.length !== 0){
            categorys.forEach(a => newItem[a.name] = a.number);
        }

        try {
            const resp = await axios.post(url, newItem);
            if (resp.statusText === "OK"){
                dispatch(add1Combo({id: resp.data.name, itm: newItem}));
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }


    for(let i = 1;i <= totalPage;i++)pageList.push(i);
    return(
        <Box sx={{p: 5, marginBottom: '100px', width: '100%'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '0 50px 30px 50px'}}
        >
        <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                    >Combos
        </Typography>
        <Button variant="contained" 
                    onClick ={() => setAddCombo(true)}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        fontFamily: 'Poppins',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        marginBottom: 2,
                        marginRight: 2
                    }}
                    >
                        Add Combo
        </Button>
        <Modal open={addCombo} onClose = {() => {setAddCombo(false)}}>
            <Fade in={addCombo} timeout={500}>
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
                    >{'Your Combo'}
                </Typography>
                <Stack direction="row" spacing={2}>
                <TextField onChange={(e) => {setTitle(e.target.value)}}
                required
                variant="standard"
                id="title"
                label="Title"
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '80%'
                }}
                />
                <TextField onChange={(e) => {setOff(parseInt(e.target.value))}}
                    required 
                    variant="standard"
                    id="off"
                    label="% Off"
                    multiline
                    maxRows={1}
                    color='warning'
                    InputProps={{style: {fontFamily: 'Poppins'}, }} // font size of input text
                    InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                    sx={{
                        width: '20%'
                    }}
                />
                
                </Stack>
                <Stack direction="row" spacing={2}>
                <TextField onChange={(e) => {setPerson(parseInt(e.target.value))}}
                    required 
                    variant="standard"
                    id="person"
                    label="Person"
                    multiline
                    maxRows={1}
                    color='warning'
                    InputProps={{style: {fontFamily: 'Poppins'}, }} // font size of input text
                    InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                    sx={{
                        width: '50%'
                    }}
                />
                <TextField onChange={(e) => {setPizza(parseInt(e.target.value))}}
                    required 
                    variant="standard"
                    id="pizza"
                    label="Pizza"
                    multiline
                    maxRows={1}
                    color='warning'
                    InputProps={{style: {fontFamily: 'Poppins'}, }} // font size of input text
                    InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                    sx={{
                        width: '50%'
                    }}
                />
                </Stack>

                <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight:'162px',
                    overflow: 'auto',
                }}
                >
                {categorys.map((category, index) => (
                    <Stack key={index} direction='row' spacing={2} sx={{marginTop:'6px'}}
                    >
                        <TextField onChange={(e) => {handleCategoryChange(index, e)}}
                        required value={category.name}
                        variant="standard"
                        id="name"
                        label="Category Name"
                        multiline
                        maxRows={1}
                        color='warning'
                        InputProps={{style: {fontFamily: 'Poppins'},}} // font size of input text
                        InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                        sx={{
                            width: '40%'
                        }}
                        />
                        <TextField onChange={(e) => {handleCategoryChange(index, e)}}
                        required value={'' +  category.number}
                        variant="standard"
                        id="number"
                        label="Number"
                        multiline
                        maxRows={1}
                        color='warning'
                        InputProps={{style: {fontFamily: 'Poppins'},}} // font size of input text
                        InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                        sx={{
                            width: '40%'
                        }}
                        />
                        <IconButton disabled={categorys.length === 1} onClick={(index) => handleRemoveCategory(index)}>
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
                <TextField onChange={(e) => {setSubTitle(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={4}
                id="subtitle" label="Subtitle"
                inputProps={{style: {fontFamily: 'Poppins'},}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                />
                <TextField onChange={(e) => {setDescription(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={4}
                id="description" label="Description"
                inputProps={{style: {fontFamily: 'Poppins'},}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                />
                <TextField onChange={(e) => {setBanner(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={1}
                id="banner" label="URL Banner"
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                />
                <TextField onChange={(e) => {setImage(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={1}
                id="image" label="URL Image"
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack
                direction={'row'} spacing={4}
                >
                    <DateTimePicker
                    sx={{width:'50%'}} variant="standard"
                    label="Time start" 
                    value={start}
                    onChange={(newValue) => {
                        setStart(newValue);
                      }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    <DateTimePicker
                    sx={{width:'50%'}}
                    label="Time end"
                    value={end}
                    onChange={(newValue) => setEnd(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
                </LocalizationProvider>
                <Button variant="contained" 
                    onClick={()=>{
                        setAddCombo(false);
                        handleAddCombo();
                    }}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        alignSelf: 'center',
                        fontFamily: 'Poppins',
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
                    Add
                </Button>
               
            </Stack>
            </Fade>
        </Modal>
        </Box>
        
        {
            pageList.map(p => {return(
            <Grow in={page===p} mountOnEnter unmountOnExit timeout={page===p ? 1000: 0}>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap'
            }}
            >
            {
                ids
                .map((id, index) =>{
                    return (index >= (page - 1)*max && index < page * max) ?
                        <Box sx={{marginRight: '90px'}}>
                            <ComboManageCard combo = {products[id]}
                            comboId = {id} 
                            cardUrl = {'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/combo/'  + id + '.json'}
                            />
                            
                        </Box>
                    : false
                })
            }
            </Box>
                </Grow>   
            )})
        }
        <Box sx={{marginTop: '100px', alignItems: 'center', width: '100%', marginLeft: '40%'}}>
        <CustomPagination variant="outlined" shape="rounded" count={totalPage}
            onChange={(event, value) => {setPage(value)}} size="large" page={page}
        />
        </Box>
        </Box>
    )
}


export const PizzaManage = (props)=> {
    const dispatch = useDispatch();
    const categories = {
        'pizza':{
            selector: useSelector(state => state.pizzas),
            menuName: 'Pizzas',
            add: add1Pizza,
            dbPath: 'main_courses',
        },
        'dessert':{
            selector: useSelector(state => state.desserts),
            menuName: 'Desserts',
            add: add1Dessert,
            dbPath: 'dessert'
        },
        'drink':{
            selector: useSelector(state => state.drinks),
            menuName: 'Drinks',
            add: add1Drink,
            dbPath: 'drink'
        },
        'vegetable':{
            selector: useSelector(state => state.vegetables),
            menuName: 'Vegetables',
            add: add1Vegetable,
            dbPath: 'vegetarian'
        },
        'kid':{
            selector: useSelector(state => state.kids),
            menuName: 'Kids',
            add: add1Kid,
            dbPath: 'kid'
        },
        'appetizer':{
            selector: useSelector(state => state.appetizers),
            menuName: 'Appetizers',
            add: add1Appetizer,
            dbPath: 'appetizer'
        }
    }
    const category = props.category;
    const products = categories[category].selector.entities;
    const ids = categories[category].selector.ids;
    const [addPizza, setAddPizza] = useState(false);
    const url= 'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu/menu_' + categories[category].dbPath + '.json';
    const max = 30;
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];
    //Variable of new Pizza
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [newSizes, setNewSizes] = useState([
       {type_detail: '', type_price:''},
    ]);
    const [newToppings, setNewToppings] = useState([
        {topping_name: '', topping_price:''},
     ]);
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState('');
    //
    const [cmt, setCmt] = useState(false);
    const [posted, setPosted] = useState(false);
    const [message, setMess] = useState('');

    const closeCmt = () =>{
        setCmt(false)
}

    //handle the dynamic Sizes in Modal
    const handleSizeChange = (index, e) => {
        const Sizes = [...newSizes];
        Sizes[index][e.target.id] =e.target.id ==='type_detail' ? e.target.value : parseInt(e.target.value);
        setNewSizes(Sizes);
    }

    const handleAddSize = () => {
        setNewSizes([...newSizes, {type_detail: '', type_price: ''}]);
    }

    const handleRemoveSize = (index) => {
        const Sizes = [...newSizes];
        Sizes.splice(index,1);
        setNewSizes(Sizes);
    }
    // ...........

    //handle the dynamic Toppings in Modal
    const handleToppingChange = (index, e) => {
        const Toppings = [...newToppings];
        Toppings[index][e.target.id] = e.target.id === 'topping_name' ? e.target.value : parseInt(e.target.value);
        setNewToppings(Toppings);
    }

    const handleAddTopping = () => {
        setNewToppings([...newToppings, {topping_name: '', topping_price: ''}]);
    }

    const handleRemoveTopping = (index) => {
        const Toppings = [...newToppings];
        Toppings.splice(index,1);
        setNewToppings(Toppings);
    }
    // ...........

    // const handleaddPizza = () => {
    //     console.log( {
    //         comment : [],
    //         description : newDescription,
    //         image_url : newImage,
    //         order_number : 0,
    //         price : newPrice,
    //         rating: 0,
    //         size: newSizes,
    //         title: newName,
    //         topping: newToppings,
    //         type: ["Đế giòn","Đế mềm xốp truyền thống"]
    //     })
    // }
    

    const handleAddPizza = async () => {
        const newItem = {
            comment: [],
            description: newDescription,
            image_url: newImage,
            order_number: 0,
            price: newPrice, 
            rating: 0,
            title: newName,
        };
        if(category !== 'pizza'){
            newItem['size'] = newSizes;
            newItem['topping'] = newToppings;
            newItem['type'] = ["Đế giòn","Đế mềm xốp truyền thống"];

        }
        try {
            const resp = await axios.post(url, newItem);
            if (resp.status === 200){
                dispatch(categories[category].add({id: resp.data.name, itm: newItem}));


                setMess('Your item has been posted successfully');
                setPosted(true);
                // setInterval(window.location.reload(), 1000);
            }
            closeCmt()
        } catch (err) {
            // Handle Error Here
            console.error(err);
            setMess('Sorry, Failed to post your comment');
            setPosted(true);
        }
    }



    for(let i = 1;i <= totalPage;i++)pageList.push(i);
    return(
        <Box sx={{p: 5, marginBottom: '100px', width: '100%'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '0 50px 30px 50px'}}
        >
        <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                    >{categories[category].menuName}
        </Typography>
        <Button variant="contained" 
                    onClick ={() => setAddPizza(true)}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        fontFamily: 'Poppins',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        marginBottom: 2,
                        marginRight: 2
                    }}
                    >
                        {'Add ' + categories[category].menuName.slice(0, categories[category].menuName.length - 1)}
        </Button>
        <Modal open={addPizza} onClose = {() => {setAddPizza(false)}}>
            <Fade in={addPizza} timeout={500}>
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
                    >{'Your ' + categories[category].menuName.slice(0, categories[category].menuName.length - 1)}
                </Typography>
                <Stack direction="row" spacing={2}>
                <TextField onChange={(e) => {setNewName(e.target.value)}}
                required
                variant="standard"
                id="name-field"
                label="Name"
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '60%'
                }}
                />
                <TextField onChange={(e) => {setNewPrice(parseInt(e.target.value))}}
                    required 
                    variant="standard"
                    id="price-field"
                    label="Price"
                    multiline
                    maxRows={1}
                    color='warning'
                    InputProps={{style: {fontFamily: 'Poppins'}, endAdornment: <InputAdornment position="end">$</InputAdornment>,}} // font size of input text
                    InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                    sx={{
                        width: '40%'
                    }}
                />
                </Stack>

                {category ==='pizza' &&
                    <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight:'162px',
                        overflow: 'auto',
                    }}
                    >
                    {newSizes.map((newSize, index) => (
                        <Stack key={index} direction='row' spacing={2} sx={{marginTop:'6px'}}
                        >
                            <TextField onChange={(e) => {handleSizeChange(index, e)}}
                            required value={newSize.type_detail}
                            variant="standard"
                            id="type_detail"
                            label="Size Name"
                            multiline
                            maxRows={1}
                            color='warning'
                            InputProps={{style: {fontFamily: 'Poppins'},}} // font size of input text
                            InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                            sx={{
                                width: '40%'
                            }}
                            />
                            <TextField onChange={(e) => {handleSizeChange(index, e)}}
                            required value={newSize.type_price}
                            variant="standard"
                            id="type_price"
                            label="Size Price"
                            multiline
                            maxRows={1}
                            color='warning'
                            InputProps={{style: {fontFamily: 'Poppins'}, endAdornment: <InputAdornment position="end">$</InputAdornment>,}} // font size of input text
                            InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                            sx={{
                                width: '40%'
                            }}
                            />
                            <IconButton disabled={newSizes.length === 1} onClick={(index) => handleRemoveSize(index)}>
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

                <TextField onChange={(e) => {setNewDescription(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={4}
                id="description-field" label="Description"
                inputProps={{style: {fontFamily: 'Poppins'},}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                />
                <TextField onChange={(e) => {setNewImage(e.target.value)}}
                required variant="standard" multiline color='warning' maxRows={1}
                id="image-field" label="URL Image"
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                />
                
                { category ==='pizza' &&
                    <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight:'162px',
                        overflow: 'auto',
                    }}
                    >
                    {newToppings.map((newTopping, index) => (
                        <Stack key={index} direction='row' spacing={2} sx={{marginTop:'6px'}}
                        >
                            <TextField onChange={(e) => {handleToppingChange(index, e)}}
                            required value={newTopping.topping_name}
                            variant="standard"
                            id="topping_name"
                            label="Topping Name"
                            multiline
                            maxRows={1}
                            color='warning'
                            InputProps={{style: {fontFamily: 'Poppins'},}} // font size of input text
                            InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                            sx={{
                                width: '40%'
                            }}
                            />
                            <TextField onChange={(e) => {handleToppingChange(index, e)}}
                            required value={newTopping.topping_price}
                            variant="standard"
                            id="topping_price"
                            label="Topping Price"
                            multiline
                            maxRows={1}
                            color='warning'
                            InputProps={{style: {fontFamily: 'Poppins'}, endAdornment: <InputAdornment position="end">$</InputAdornment>,}} // font size of input text
                            InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                            sx={{
                                width: '40%'
                            }}
                            />
                            <IconButton disabled={newToppings.length === 1} onClick={(index) => handleRemoveTopping(index)}>
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
                        setAddPizza(false);
                        handleAddPizza();
                        
                    }}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        alignSelf: 'center',
                        fontFamily: 'Poppins',
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
                    Add
                </Button>
               
            </Stack>
            </Fade>
        </Modal>
        <Snackbar
        open={posted}
        onClose={() => {setPosted(false)}}
        message={message}
        autoHideDuration={6000}
        />
        </Box>
        
        {
            pageList.map(p => {return(
            <Grow in={page===p} mountOnEnter unmountOnExit timeout={page===p ? 1000: 0}>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap'
            }}
            >
            {
                ids
                .map((id, index) =>{
                    return (index >= (page - 1)*max && index < page * max) ?
                        <Box sx={{marginLeft: '40px'}}>
                            <PizzaManageCard item = {products[id]} category ={category}
                            id = {id} 
                            cardUrl = {'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu/menu_' 
                            + categories[category].dbPath + '/' + id + '.json'}
                            />
                            
                        </Box>
                    : false
                })
            }
            </Box>
                </Grow>   
            )})
        }
        <Box sx={{marginTop: '100px', alignItems: 'center', width: '100%', marginLeft: '40%'}}>
        <CustomPagination variant="outlined" shape="rounded" count={totalPage}
            onChange={(event, value) => {setPage(value)}} size="large" page={page}
        />
        </Box>
        </Box>
    )
}