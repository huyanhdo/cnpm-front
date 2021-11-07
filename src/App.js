import './App.css';
import {CarouselExample} from './components/carousel.js';
function App() {
  return (
    <html>
    <head>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&family=Poppins:wght@200&display=swap');
      </style>
    </head>
    <body>
    <div className="App"
      style={{
        backgroundColor: "rgba(255, 246, 216, 0.3)",
        marginTop: "100px",
        padding: "100px 0px"
      }}
    > 
        <CarouselExample/>

      </div>
      </body>
      </html>
  );
}

export default App;
