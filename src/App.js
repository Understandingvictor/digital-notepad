
import './App.css';
// eslint-disable-next-line
import Homepage from './components/homepage';

import Login from './components/login';
import NotepadDashboard from './pages/notepadDashboard';
import Welcome from './components/welcome';
import { Recover } from './components/recover';
import { isLoggedInContext, UserLoggedInComponentProvider } from './context.js/context2';
import { useContext } from 'react';
import LoadingPage from './components/loadingPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  //<Route path='/' element={<Homepage/>}></Route>
  return (
    <div className="App">
      <BrowserRouter>
      <UserLoggedInComponentProvider>
        
      
      <Routes>
       
       <Route path='/' element={<FreeLogin><Login/></FreeLogin>}/>
       <Route path='/recover' element={<Recover/>}></Route>
        <Route path='/dashboard' element={<ProtectedRoute><NotepadDashboard/></ProtectedRoute>}/>
       <Route path='/welcome' element={<Welcome/>}></Route>
       <Route path='/loading...' element={<LoadingPage/>}></Route>
    </Routes>
    </UserLoggedInComponentProvider>
       </BrowserRouter>
    </div>
  );
}

function ProtectedRoute({children}){
  const {setIsLoggedIn, isLoggedIn} = useContext(isLoggedInContext)
 JSON.parse(localStorage.getItem('isLoggedin')) != null &&  setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedin')));
  return isLoggedIn ? children: <Navigate to={'/'} replace/>
}
function FreeLogin({children}){
  const {setIsLoggedIn, isLoggedIn} = useContext(isLoggedInContext)

  JSON.parse(localStorage.getItem('isLoggedin')) != null &&  setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedin')));
  return isLoggedIn ? <Navigate to={'/dashboard'} replace/> : children;
}
export default App;
