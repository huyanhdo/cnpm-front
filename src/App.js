import './App.css';
import { MenuBar } from './components/sidebar';
import { CartPage } from './pages/cartPage';
import { Home } from './pages/Home';
import { PizzaPage } from './pages/pizza';
import { SinglePage } from './pages/singlePage';
import Dashboard from './components/dashboard'
import {Box} from '@mui/material';
import { Searchbar } from './components/searchbar';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import { ComboPage } from './pages/comboPage';
import SignIn from './pages/SignIn';
import AuthContextProvider from './context/AuthContext';
import { SingleExtraPage } from './pages/singleExtraPage';
import ForgetPassword from './pages/ForgetPassword';
import OrderReport from './pages/OrderReport';
import {ManagePage} from './pages/managePage';
import { fetchAllDesserts } from "./store/categories/dessertSlice";
import { fetchAllDrinks } from "./store/categories/drinkSlice";
import { fetchAllVegetables } from "./store/categories/vegetableSlice";
import { fetchAllKids } from "./store/categories/kidSlice";
import { fetchAllPizzas} from "./store/categories/pizzaSlice";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllAppetizers } from './store/categories/appetizerSlice';
import { fetchAllCombos } from './store/comboSlice';
import { SingleComboPage } from './pages/singleComboPage';
import { OrderPage } from './pages/orderPage';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAllPizzas())
    dispatch(fetchAllVegetables())
    dispatch(fetchAllDesserts())
    dispatch(fetchAllDrinks())
    dispatch(fetchAllKids())
    dispatch(fetchAllAppetizers())
    dispatch(fetchAllCombos())
  })

  return (
      <body>
     
        <div className="App">
        <div style={{
            backgroundColor: 'rgba(252, 237, 227, 0.3)',
            display: 'flex',
            position: 'relative',
            minHeight: '100vh'
        }}>
          <BrowserRouter>
          <AuthContextProvider>
          <MenuBar/>
          <Box style={{
            width: '100%',
          }}>
            <Searchbar/>
            
              <Routes>
                <Route exact path='/order_report' element ={ <OrderReport/>}/>
                <Route exact path='/signin' element ={<SignIn/>}/>
                <Route exact path='/reset_password' element ={<ForgetPassword/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path = "/menu/:category" element={<PizzaPage/>}/>
                <Route path="/pizza/:productId" element={<SinglePage/>}/>
                <Route path="/:category/:productId" element={<SingleExtraPage/>}/>
                <Route path="/combo" element={<ComboPage/>}/>
                <Route path="/statistic" element={<Dashboard/>}/>
                <Route path="/combo/:comboId" element = {<SingleComboPage/>}/>
                <Route path="/order" element={<OrderPage/>}/>
                <Route path="/create_menu" element={<ManagePage/>}/>
              </Routes>
          </Box>
          </AuthContextProvider>
          </BrowserRouter>
        </div>
    </div>
    </body>
  );
}
export default App;