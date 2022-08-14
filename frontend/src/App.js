import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SecureRoute from './SecureRoute';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route element={<SecureRoute/>}>
            <Route exact path="/" element={<Home/>} />
          </Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;
