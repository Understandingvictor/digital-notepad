import github from '../icons/github.png'
import code from '../icons/code.png'
import twitter from '../icons/twitter.png'
function Footer(){
    return(
            <footer className="footer">
                <ul>
                   <li> <a href='https://x.com/Victor762948531' target='_blank' rel="noreferrer"> <img style={{width:"20px"}} src={twitter} alt="x"/></a></li>
                    <li><a href='https://github.com/Understandingvictor/digital-notepad' target='_blank' rel="noreferrer"> <img style={{width:"20px"}} src={code} alt="code"/></a></li>
                    <li><a href="https://github.com/Understandingvictor/" target='_blank' rel="noreferrer"> <img style={{width:"20px"}} src={github} alt="git"/></a></li>
                </ul>
            </footer>
    )
}
export default Footer;