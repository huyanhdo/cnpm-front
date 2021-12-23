import './App.css';
import { MenuBar } from './components/sidebar';
import { CartPage } from './pages/cartPage';
import { Home } from './pages/Home';
import { PizzaPage } from './pages/pizza';
import { SinglePage } from './pages/singlePage';
import Dashboard from './components/dashboard'
import {Box} from '@mui/material';
import { Searchbar } from './components/searchbar';
import { Footer } from './components/footer';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import { ComboPage } from './pages/comboPage';
import SignIn from './pages/SignIn';
import AuthContextProvider from './context/AuthContext';
import { SingleExtraPage } from './pages/singleExtraPage';
import ForgetPassword from './pages/ForgetPassword';
import OrderReport from './pages/OrderReport';
function App() {
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
                <Route path="product/:productId" element={<SinglePage/>}/>
                <Route path="extra/:productId" element={<SingleExtraPage/>}/>
                <Route path="/combo" element={<ComboPage/>}/>
                <Route path="/statistic" element={<Dashboard/>}/>
              </Routes>
            <Footer/>
          </Box>
          </AuthContextProvider>
          </BrowserRouter>
        </div>
    </div>
    </body>
  );
}
export default App;