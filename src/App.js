import './App.css';
import { MenuBar } from './components/sidebar';
import { CartPage } from './pages/cartPage';
import { Home } from './pages/home';
import { PizzaPage } from './pages/pizza';
import { SinglePage } from './pages/singlePage';
import {Box} from '@mui/material';
import { Searchbar } from './components/searchbar';
import { Footer } from './components/footer';
import {BrowserRouter , Routes, Route,Navigate} from 'react-router-dom';
import { ComboPage } from './pages/comboPage';
import SignIn from './pages/SignIn';
import AuthContextProvider from './context/AuthContext';
import { SingleExtraPage } from './pages/singleExtraPage';
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
                <Route exact path='/signin' element ={<SignIn/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path = "/menu/:category" element={<PizzaPage/>}/>
                <Route path="product/:productId" element={<SinglePage/>}/>
                <Route path="extra/:productId" element={<SingleExtraPage/>}/>
                <Route path="/combo" element={<ComboPage/>}/>
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