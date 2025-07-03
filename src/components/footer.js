import github from '../icons/github.png';
import code from '../icons/code.png';
import twitter from '../icons/twitter.png';
import '../styles/footer.css';
function Footer(){
    return(
            <footer className="footer">
                <ul className='footer-icon-container'>
                   <li> <button className='credential-button'><a href='https://x.com/Victor762948531' target='_blank' rel="noreferrer"> <img style={{width:"30px"}} src={twitter} alt="x"/></a></button></li>
                    <li><button className='credential-button'><a href='https://github.com/Understandingvictor/digital-notepad' target='_blank' rel="noreferrer"> <img style={{width:"27px"}} src={code} alt="code"/></a></button></li>
                    <li><button className='credential-button'><a href="https://github.com/Understandingvictor/" target='_blank' rel="noreferrer"> <img style={{width:"25px"}} src={github} alt="git"/></a></button></li>
                </ul>
            </footer>
    )
}
export default Footer;