import './App.css';
import Main from "./components/Main";
import Banner from "./components/Banner.jsx"
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="App">
      <Banner />
      <Main />
      <Footer className="absolute bottom-0 left-0 w-full" />
    </div>
  );
}

export default App;
