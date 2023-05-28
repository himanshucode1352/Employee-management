import './App.css';
import Navbar from './component/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Edit from './component/Edit';
import Home from './component/Home';
import AddEmployee from './component/AddEmployee';
import AllRecords from './component/AllRecords';
function App() {
  return (
  <BrowserRouter>
      <Navbar />
      <Routes >
      <Route  path='/' element={<Home />} />
         
          <Route  path="/edit/:id" element={<Edit />} />
          <Route  path='/allrecords' element={<AllRecords />} />
          <Route  path='/addemployee' element={<AddEmployee />} />


      </Routes>
   
  </BrowserRouter>
  );
}

export default App;
