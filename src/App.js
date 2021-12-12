import './App.css';
import { MenuBar } from './components/sidebar';
import { CartPage } from './pages/cartPage';
import { Home } from './pages/home';
import { PizzaPage } from './pages/pizza';
import { SinglePage } from './pages/singlePage';
import {Box} from '@mui/material';
import { Searchbar } from './components/searchbar';
import { Footer } from './components/footer';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import { ComboPage } from './pages/comboPage';
import { SingleExtraPage } from './pages/singleExtraPage';
import { fetchAllDesserts } from "./store/categories/dessertSlice";
import { fetchAllDrinks } from "./store/categories/drinkSlice";
import { fetchAllVegetables } from "./store/categories/vegetableSlice";
import { fetchAllKids } from "./store/categories/kidSlice";
import { fetchAllPizzas} from "./store/pizzaSlice";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAllPizzas())
    dispatch(fetchAllVegetables())
    dispatch(fetchAllDesserts())
    dispatch(fetchAllDrinks())
    dispatch(fetchAllKids())
  })
  return (
    <html>
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <div className="App">
        <div style={{
            backgroundColor: 'rgba(252, 237, 227, 0.3)',
            display: 'flex',
            position: 'relative',
            minHeight: '1000px'
        }}>
          <BrowserRouter>
          <MenuBar/>
          <Box style={{
            width: '100%',
          }}>
            <Searchbar/>
            
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path = "/menu/:category" element={<PizzaPage/>}/>
                <Route path="/pizza/:productId" element={<SinglePage/>}/>
                <Route path="/:category/:productId" element={<SingleExtraPage/>}/>
                <Route path="/combo" element={<ComboPage/>}/>
              </Routes>
            <Footer/>
          </Box>
          </BrowserRouter>
        </div>
    </div>
    </body>
    </html>
  );
}
export default App;