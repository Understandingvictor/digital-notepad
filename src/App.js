
import './App.css';
import Homepage from './components/homepage';
import SignUp from './components/signUp';
import Login from './components/login';
import NotepadDashboard from './pages/notepadDashboard';
import Welcome from './components/welcome';
import { Recover } from './components/recover';
import { isLoggedInContext, UserLoggedInComponentProvider } from './context.js/context2';
import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <UserLoggedInComponentProvider>
        
      
      <Routes>
       <Route path='/' element={<Homepage/>}></Route>
       <Route path='/signup' element={<SignUp/>}></Route>
       <Route path='/login' element={<Login/>}></Route>
       <Route path='/recover' element={<Recover/>}></Route>
        <Route path='/dashboard' element={
          <ProtectedRoute><NotepadDashboard/></ProtectedRoute>
        }/>
       <Route path='/welcome' element={<Welcome/>}></Route>
    </Routes>
    </UserLoggedInComponentProvider>
       </BrowserRouter>
    </div>
  );
}

function ProtectedRoute({children}){
  const {isLoggedIn} = useContext(isLoggedInContext)
  return isLoggedIn ? children: <Navigate to={'/login'} replace/>
}

export default App;
