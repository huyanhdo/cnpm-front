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
function App() {
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
                <Route path="product/:productId" element={<SinglePage/>}/>
                <Route path="extra/:productId" element={<SingleExtraPage/>}/>
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