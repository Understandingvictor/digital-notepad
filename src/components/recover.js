 import { useState, useRef, useContext } from "react"
 import { useNavigate } from "react-router-dom";
 import {isLoggedInContext} from '../context.js/context2'
 import Spinner from "./spinner";
 import getRandomInt from "../utilities/passcodeGenerate";
import Footer from './footer';
 import sendEmail from "../utilities/sendEmail";




 function Recover(){
    const navigate = useNavigate();

    const contexts = useContext(isLoggedInContext)
    const [input, setInput] = useState();
    const [placeholder, setPlaceholder] = useState("enter your registered email");
    const [buttonText, setButtonText] = useState("SUBMIT");
    const [number, setNumber] = useState(1);
    const [loader, setLoader] = useState(false);
    const Form = useRef();
    let passcodeRef = useRef();
    const passcode =  getRandomInt(10000, 99000);;


    const login = ()=>{
        contexts.setIsLoggedIn(true);
        navigate('/dashboard');
    }

    const changePassword = ()=>{
        try {
            const newPassword = input.trim();
            const value = JSON.parse(localStorage.getItem('notepadUser'));
            const changedCredentials = {email:value.email, password:newPassword};//password changed here
            localStorage.setItem('notepadUser', JSON.stringify(changedCredentials));
            alert ('password set successfully, now login');
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
            if (number === 1){
                if (!localStorage.getItem("notepadUser")){
                    alert('no accout exist, pls create one first');
                    return;
                }
                if (JSON.parse(localStorage.getItem("notepadUser")).email === input){
                    setLoader(true);
                    const emailSent = await sendEmail(e, Form);
                    if (emailSent){
                        setLoader(false);
                        passcodeRef.current = passcode;
                        setPlaceholder("enter code sent to your email");
                        setButtonText('VERIFY');
                        setNumberState();
                        Form.current.reset();
                    }
                    else{
                        alert('check your internet');
                        return;
                    }
                }
                else{
                    alert('email doesnt exist, pls enter registered email');
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
                setPlaceholder("enter password again to login");
                setButtonText('LOGIN');
                setNumberState();
                Form.current.reset();
            }
            if (number === 4){
                login();
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
                <button className="login-button">{buttonText}</button>
            </form>
            
        </div>
        <div>
    <Footer/>
        </div>
        
        </>
    )
 }
 export  {Recover};