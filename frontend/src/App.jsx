
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
import AddVan from './addvan'
import AddBusiness from './addbusiness'
import HireEmployee from './hireemployee'
import FireEmployee from './fireemployee'
import ManageService from './manageservice'
import RemoveProduct from './removeproduct'
import RemoveVan from './removevan'
import RemoveDriverRole from './removedriverrole'
import AddService from './add_service';
import AddLocation from './add_location';
import StartFunding from './start_funding';
import TakeoverVan from './takeover_van';
import LoadVan from './load_van';
import RefuelVan from './refuel_van';
import DriveVan from './drive_van';
import PurchaseProduct from './purchase_product';
import AddEmployee from './add_employees';
import AddProduct from './add_product';
import AddWorkerRole from './add_worker_role';
import AddDriverRole from './add_driver_role';


function App() {
  

  return (
    <BrowserRouter> 
    <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/addowner' element={<AddOwner />}></Route>
        <Route path='/add_employees' element={<AddEmployee />}></Route>
        <Route path='/add_product' element={<AddProduct />}></Route>
        <Route path='/add_worker_role' element={<AddWorkerRole />}></Route>
        <Route path='/add_driver_role' element={<AddDriverRole />}></Route>
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
        <Route path='/add_location' element={<AddLocation />}></Route>
        <Route path='/start_funding' element={<StartFunding />}></Route>
        <Route path='/takeover_van' element={<TakeoverVan />}></Route>
        <Route path='/load_van' element={<LoadVan />}></Route>
        <Route path='/refuel_van' element={<RefuelVan />}></Route>
        <Route path='/drive_van' element={<DriveVan />}></Route>
        <Route path='/purchase_product' element={<PurchaseProduct />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
