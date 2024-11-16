import { Route, Routes, } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"


function App() {

  return (
    <div className='h-screen w-screen flex '>




      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>





    </div>
  )
}

export default App
