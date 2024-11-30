
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './home'
import AddOwner from './addowner'
import UpdateUser from './updateuser'
import Nav from './nav'
import OwnerView from './ownerview'
import EmployeeView from './employeeview'
import DriverView from './driverview'
import LocationView from './locationview'
import ProductView from './productview'
import ServiceView from './serviceview'


function App() {
  

  return (
    <BrowserRouter> 
    <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/addowner' element={<AddOwner />}></Route>
        <Route path='/update/:username' element={<UpdateUser />}></Route>
        <Route path='/ownerview' element={<OwnerView />}></Route>
        <Route path='/employeeview' element={<EmployeeView />}></Route>
        <Route path='/driverview' element={<DriverView />}></Route>
        <Route path='/locationview' element={<LocationView />}></Route>
        <Route path='/productview' element={<ProductView />}></Route>
        <Route path='/serviceview' element={<ServiceView />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
