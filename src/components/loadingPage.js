import Footer from './footer';
import Spinner from './spinner';
function LoadingPage(){
    return(
        <div>
            <Spinner/>
            <h1 style=
            {{color:'#c5c3bc', position:'absolute', top:'30%',
                left:'50%', transform:'translate(-50%, -50%)',
                fontSize:'small'
            }}
            >SETTING UP YOUR NOTEPAD...</h1>

            <Footer/>
        </div>
    )
}
export default LoadingPage;