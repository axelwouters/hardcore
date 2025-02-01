import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import Profil from './pages/user/Profil'
import Product from './pages/Product'
import Detail from './pages/Detail'
import Basket from './pages/Basket'
import Payment from './pages/Payment'
import Success from './pages/Success'
import Admin from './pages/admin/Admin'
import AddHardcore from './pages/admin/hardcore/AddHardcore'
import EditHardcore from './pages/admin/hardcore/EditHardcore'
import OrderDetail from './pages/admin/order/OrderDetail'
import MyOrders from './pages/user/MyOrders'
import Rgpd from './pages/Rgpd'
import Contacts from './pages/Contacts'

import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import RequireAuth from './helpers/require-auth'

function App() {
  
  return (
    <>
      <div>
        <Header />
          <Routes>
            <Route path='/' element={<RequireAuth child={Home} auth={false} admin={false}/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/contacts' element={<Contacts/>} />
            <Route path='/profil' element={<RequireAuth child={Profil} auth={true} admin={false}/>} />
            <Route path='/product' element={<RequireAuth child={Product} auth={false} admin={false} />} />
            <Route path='/detail/:id' element={<RequireAuth child={Detail} auth={false} admin={false} />} />
            <Route path='/basket' element={<RequireAuth child={Basket} auth={false} admib={false}/>} /> 
            <Route path='/payment/:orderId' element={<RequireAuth child={Payment} auth={true} admin={false} /> } />
            <Route path='/success' element={<RequireAuth child={Success} auth={true} admin={false} />} />
            <Route path='/admin' element={<RequireAuth child={Admin} auth={true} admin={true}/>} />
            <Route path='/addHardcore' element={<RequireAuth child={AddHardcore} auth={true} admin={true}/>} />
            <Route path='/editHardcore/:id' element={<RequireAuth child={EditHardcore} auth={true} admin={true}/>} />
            <Route path='/orderDetail/:id' element={<RequireAuth child={OrderDetail} auth={true} admin={true} />} />
            <Route path="/my-orders" element={<RequireAuth child={MyOrders} auth={true} admin={false} />}/>            
            <Route path='*' element={<Navigate to="/" />} />
            <Route path="/rgpd" element={<Rgpd />} />
          </Routes>
          <Footer />
      </div>
      
    </>
  )
}

export default App
