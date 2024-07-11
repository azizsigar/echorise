import './App.css'
import { Routes,Route } from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Home from '../src/pages/Home'
import Login from './pages/Login'
import Register from '../src/pages/Register'
import axios from 'axios'
axios.defaults.baseURL='http://localhost:3000'
axios.defaults.withCredentials=true

function App() {

  return (
  <div className='app'>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>

  </div>
  )
}

export default App
