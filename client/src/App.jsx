
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import CreateUser from './pages/CreateUser'
import HomePage from './pages/HomePage'

import './App.css'

function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} ></Route>
          <Route path='/create' element={<CreateUser/>} ></Route>
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
