import '../styles/login.css';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usersNameContext } from '../context.js/context1';
import { isLoggedInContext } from '../context.js/context2';
import Footer from './footer';

    function Login(){
        const { setUsersName} = useContext(usersNameContext); //context to set users name at the global state
        const {setIsLoggedIn} = useContext(isLoggedInContext); //context to set if user is logged in at global state
        const navigate = useNavigate();
        const [userLoginInput, setUserLoginInput] = useState('');

        const submit = (event)=>{
            event.preventDefault();
            if (localStorage.getItem('notepadUser')){
                const value = JSON.parse(localStorage.getItem('notepadUser'));
                if (value.password !== userLoginInput){
                    alert('user doesnt exist');
                    return;
                }
                setUsersName(value.password);
                setIsLoggedIn(true);
                navigate('/dashboard');
            }
            else{
                alert('you dont have account. click sign up')
            }
        }
        return(
            <div>
                <div className="login-form">
                <form onSubmit={submit}>
                    <div className='input-container'>
                        <input className="login-input" name="password" value={userLoginInput} onChange={e=>setUserLoginInput(e.target.value)} placeholder="password"/> <br/>
                    </div>
                    <button className='login-button' >LOGIN</button>|<Link to={'/signup'}><small className='login-small'>sign up</small></Link><br/> <Link to={'/recover'}><small style={{marginTop:'60px', color:'#c5c3bc'}}>forgot passsword?</small></Link>
                </form>
                </div>
                <Footer/>
            </div>
        )
    }
export default Login;