import '../styles/logout.css';
function Logout({text, onclick}){
    return(
        <div>
            <button className="logout-button" onClick={onclick}>{text}</button>
        </div>
    )
}
export default Logout;