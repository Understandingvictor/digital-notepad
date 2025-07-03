import { useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/signUp.css';
import Footer from './footer';

// function RemoveButton({text, onclick}){
//     return(
//         <button onClick={onclick}>{text}</button>
//     )
// }

function SignUp(){

    //const {setIsLoggedIn} = useContext(isLoggedInContext);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username:'',
        email:'',
        password: ''
        })
    const [error, setError] = useState('');

    const handler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setInput(prev=>({...prev, [name]:value}))
         setError(''); // Clear error when typing
    }
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // const clearStorage=()=>{
    //     localStorage.clear();
    // }
    const submit=(event)=>{
        event.preventDefault();

        // Validation checks
        if (!input.username.trim()) {
        setError('Username is required');
        return;
        }
        
        if (!input.email) {
        setError('Email is required');
        return;
        } else if (!validateEmail(input.email)) {
        setError('Please enter a valid email');
        return;
        }
        
        if (!input.password) {
        setError('Password is required');
        return;
        }

        if (localStorage.getItem('notepadUser')){
            alert('you already have an account, kindly login')
            console.log("you already have an account, kindly login");
        }
        else{
            console.log('account creation in progress');
            localStorage.setItem("notepadUser", JSON.stringify(input));
            localStorage.setItem("username", input.username);
            navigate('/welcome');
            setTimeout(()=>{
                navigate('/login');
            }, 4000);
        }
    }
//     useEffect(()=>{
//       localStorage.getItem('notepadUser') ? console.log('got it', JSON.parse(localStorage.getItem('notepadUser'))):console.log('didnt get it');
//     }
//    )

//    const removeUser =()=>{
//     localStorage.removeItem('notepadUser') ? console.log('removed successfully'):console.log('doesnt exist');
//    }
            //  <RemoveButton text={'clear Localstorage'} onclick={clearStorage}/>
            // <RemoveButton text={'remove'} onclick={removeUser}/>
    return(
        <div>
  
            <p style={{color:'red'}}>{error}</p>
            <div className="login-form">
            <form onSubmit={submit}>
                  <input className="signup-input"name="username" onChange={handler} value={input.username} placeholder="username"/><br/>
                 <input className="signup-input"name="email" onChange={handler} value={input.email} placeholder="email"/><br/>
                <input className="signup-input" name="password" onChange={handler} value={input.password} placeholder="password"/> <br/>
                <button className='sign-up-button'>SIGN UP</button><Link to={'/login'}><small className='login-small'>login</small></Link>
            </form>
            </div>
            <Footer/>
        </div>
    )
}

export default SignUp;