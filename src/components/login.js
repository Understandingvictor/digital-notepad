import '../styles/login.css';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { isLoggedInContext } from '../context.js/context2';
import Footer from './footer';

    function Login(){
      
        const {isLoggedIn} = useContext(isLoggedInContext); //context to set if user is logged in at global state
        const navigate = useNavigate();
        const [userLoginInput, setUserLoginInput] = useState('');
        const [error, setError] = useState('');

        console.log(isLoggedIn, "is the global context")
        //console.log(isLoggedIn, "is the status");
        //console.log(JSON.parse(localStorage.getItem('isLoggedin')) === true, typeof(JSON.parse(localStorage.getItem('isLoggedin'))) + " is state in memory",  typeof(isLoggedIn) + " is the global context");
        //setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedin')));
        // if (JSON.parse(localStorage.getItem('isloggedin')) === true){
        //     navigate('/dashboard');
        // }
        const pleasantries = ()=>{
                navigate('/welcome' );

                setTimeout(()=>{
                    navigate('/loading...');
                }, 3000)

                setTimeout(()=>{
                    navigate('/dashboard');
                }, 4000)

            }


        const submit = (event)=>{
            event.preventDefault();

            if (localStorage.getItem('notepadUser')){
                const value = JSON.parse(localStorage.getItem('notepadUser'));
                if (value.password !== userLoginInput){
                    alert('password incorrect');
                    return;
                }
                //setUsersName(value.password);
                localStorage.setItem('isLoggedin', true);
                //setIsLoggedIn(localStorage.getItem('isLoggedin')); //sets the global if the user is logged in or out
                pleasantries();
            }
            else{
                  //setUsersName(value.password);
                if (!userLoginInput) {
                    setError('password is required');
                    return;
                }
                const credentials = {password:userLoginInput.trim()};
                localStorage.setItem('notepadUser', JSON.stringify(credentials)); //sets password to localstorage
                localStorage.setItem('isLoggedin', true); //tracks whether a user is logged in
                //setIsLoggedIn(localStorage.getItem('isLoggedin')); //sets the global if the user is logged in or out
                
                pleasantries();

            }
        }
        return(
            <div>
                <p style={{color:'red', fontStyle:'italic'}}>{error}</p>
                 <h3 className='nugget'><span className='great-Thought'>GREAT THOUGHTS</span> deserves a page.</h3>
                <div className="login-form">
                <form onSubmit={submit}>
                    <div className='input-container'>
                        <input className="login-input" name="password" value={userLoginInput} onChange={e=>setUserLoginInput(e.target.value)} placeholder="sign up with password"/> <br/>
                    </div>
                    <button className='login-button' >ADD NOTE</button><br/> <Link to={'/recover'}><div style={{marginTop:'10px'}}><small style={{marginTop:'60px', color:'#c5c3bc'}}>forgot passsword?</small></div></Link>
                </form>
                </div>
                <Footer/>
            </div>
        )
    }
export default Login;