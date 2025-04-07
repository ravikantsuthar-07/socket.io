import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage.js';
import CreateUserPage from './Pages/CreateUserPage.js'
import LoginUserPage from './Pages/LoginUserPage.js';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/create' exact element={<CreateUserPage />} />
        <Route path='/login' exact element={<LoginUserPage />} />
       </Routes>
    </>
  )
}

export default App;
