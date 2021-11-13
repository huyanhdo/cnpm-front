import './App.css';
import { Home } from './pages/home';
import { PizzaPage } from './pages/pizza';
import { SinglePage } from './pages/singlePage';

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
      <SinglePage/>
    </div>
    </body>
    </html>
  );
}

export default App;