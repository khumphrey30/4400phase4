
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Users from './users'
import CreateUser from './createuser'
import UpdateUser from './updateuser'
import Nav from './nav'

function App() {
  

  return (
    <BrowserRouter> 
    <Nav />
      <Routes>
        <Route path='/' element={<Users />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/update/:username' element={<UpdateUser />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
