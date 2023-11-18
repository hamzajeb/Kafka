import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import Login from './pages/Login';
import Predict from './pages/Predict';
import Register from './pages/Register';


function App() {
  return (
    <div className="App" >
          <Router>
      <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Main />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/predict" element={<Predict />} />
          </Route>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
