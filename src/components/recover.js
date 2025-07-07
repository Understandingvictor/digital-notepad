 import { useState, useRef, useContext } from "react"
 import { useNavigate, Link } from "react-router-dom";
 import {isLoggedInContext} from '../context.js/context2'
 import Spinner from "./spinner";
 import getRandomInt from "../utilities/passcodeGenerate";
import Footer from './footer';
 import sendEmail from "../utilities/sendEmail";
 import '../styles/recover.css'




 function Recover(){
    const navigate = useNavigate();

    const contexts = useContext(isLoggedInContext)
    const [input, setInput] = useState();
    const [placeholder, setPlaceholder] = useState("enter an email");
    const [buttonText, setButtonText] = useState("SUBMIT");
    const [number, setNumber] = useState(1);
    const [loader, setLoader] = useState(false);
    const Form = useRef();
    let passcodeRef = useRef();
    const passwordRef = useRef();
    const passcode =  getRandomInt(10000, 99000);


    const login = ()=>{
        contexts.setIsLoggedIn(true);
        navigate('/dashboard');
    }

    //this function is used to change the password
    const changePassword = ()=>{
        try {
            const newPassword = input.trim();
            //const value = JSON.parse(localStorage.getItem('notepadUser'));
            const changedCredentials = {password:newPassword};//password changed here
            localStorage.setItem('notepadUser', JSON.stringify(changedCredentials));
            alert ('KUDOS!, password set successfully, enter password to continue adding note');
        } catch (error) {
            alert('change password error');
        }

    }
    const setNumberState = ()=>{
        setNumber(prev=>{
            return prev + 1;
        })
    }
    const submit = async(e)=>{
        try {
            e.preventDefault();
            //checks if a user exists
            if (number === 1){
                if (!localStorage.getItem("notepadUser")){
                    alert('no account exist, pls create one first by entering password and adding a note');
                    return;
                }
                
                    setLoader(true);
                    const emailSent = await sendEmail(e, Form);
                    if (emailSent){
                        setLoader(false);
                        passcodeRef.current = passcode;
                        setPlaceholder("enter code sent to the email");
                        setButtonText('VERIFY');
                        setNumberState();
                        Form.current.reset();
                    }
                    else{
                        alert('check your internet');
                        return;
                    }
            }
            if (number === 2){
                if (passcodeRef.current === Number(input)){
                    setPlaceholder("enter new password");
                    setButtonText('CHANGE PASSWORD');
                    setNumberState(); //here is next
                    Form.current.reset();
                }
                else{
                    alert("invalid OTP entered");
                      return;
                }
                
            }
            if (number === 3){
                changePassword()
                setPlaceholder("enter password again to verify");
                setButtonText('CONTINUE TO ADD NOTE');
                setNumberState();
                Form.current.reset();
            }
            if (number === 4){
                if (passwordRef.current === input.trim()){
                login();
                }
                else{
                    alert('password are not the same, retry')
                    return;
                }

            }

            
        } catch (error) {
            alert ("something went wrong");
              return;
        }
       
    }
    return(
        <>
        <div className="login-form">
            {loader && <Spinner/>}
            <form ref={Form} onSubmit={submit}>
                <input className="signup-input" onChange={(e)=>{setInput(e.target.value)}} name="email"  placeholder={placeholder}></input>
                <input type="hidden" value={passcode} name="passcode"></input>
                <button className="login-button">{buttonText}</button> <Link to={'/'}>| <small style={{marginTop:'60px', color:'#c5c3bc'}}>back</small></Link>
            </form>
            
        </div>
        <div>
    <Footer/>
        </div>
        
        </>
    )
 }
 export  {Recover};