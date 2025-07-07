import '../styles/homepage.css'
import {Link} from 'react-router-dom'
import Footer from './footer';
function Homepage(){
    return(
        <div>
           

            <div className="main-heading-container">
                <div className='pen-it-down-container'>
                     <h1 className="pen-it-down">PEN IT </h1>
                     <span className='down-span'>DOWN</span>
                </div>
           
               <Link to="/signup"><button className="sign-up-button">SIGN UP</button></Link>  | <Link to="/login"><button className="login-button">LOG IN</button></Link>
            </div>
            <Footer/>
        </div>
    )
}

export default Homepage;