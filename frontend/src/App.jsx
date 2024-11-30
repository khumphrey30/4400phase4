
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './home'
import CreateUser from './addusers'
import UpdateUser from './updateuser'
import Nav from './nav'
import OwnerView from './ownerview'
import EmployeeView from './employeeview'
import DriverView from './driverview'
import LocationView from './locationview'
import ProductView from './productview'
import ServiceView from './serviceview'
import AddVan from './addvan'
import AddBusiness from './addbusiness'
import HireEmployee from './hireemployee'
import FireEmployee from './fireemployee'
import ManageService from './manageservice'
import RemoveProduct from './removeproduct'
import RemoveVan from './removevan'
import RemoveDriverRole from './removedriverrole'
import AddService from './add_service';

function App() {
  

  return (
    <BrowserRouter> 
    <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/addusers' element={<CreateUser />}></Route>
        <Route path='/update/:username' element={<UpdateUser />}></Route>
        <Route path='/ownerview' element={<OwnerView />}></Route>
        <Route path='/employeeview' element={<EmployeeView />}></Route>
        <Route path='/driverview' element={<DriverView />}></Route>
        <Route path='/locationview' element={<LocationView />}></Route>
        <Route path='/productview' element={<ProductView />}></Route>
        <Route path='/serviceview' element={<ServiceView />}></Route>
        <Route path='/addvan' element={<AddVan />}></Route>
        <Route path='/addbusiness' element={<AddBusiness />}></Route>
        <Route path='/hireemployee' element={<HireEmployee />}></Route>
        <Route path='/fireemployee' element={<FireEmployee />}></Route>
        <Route path='/manageservice' element={<ManageService />}></Route>
        <Route path='/removeproduct' element={<RemoveProduct />}></Route>
        <Route path='/removevan' element={<RemoveVan />}></Route>
        <Route path='/removedriverrole' element={<RemoveDriverRole />}></Route>
        <Route path='/add_service' element={<AddService />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
