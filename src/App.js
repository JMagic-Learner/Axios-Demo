import logo from './logo.svg';
import './App.css';
import Sales from './Pages/Sales/index.js'
import Table from './Component/Table/index.js'
import Navigation from './Component/Navigation';
import Employees from './Pages/Employees';
import {  BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';

function App() {



  return (
    <div className="App">
      <BrowserRouter>
      <Navigation/>
        <Routes>
            <Route exact path="/" element={<Table/>}/>
            <Route exact path="/Employees" element={<Employees/>}/>
            <Route exact path="/Sales" element={<Sales/>}/>              
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
