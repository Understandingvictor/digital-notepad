import Footer from './footer';
function Welcome(){
    return(
        <div>
            <h1 style=
            {{color:'#c5c3bc', position:'absolute', top:'30%',
                left:'50%', transform:'translate(-50%, -50%)',
                fontSize:'large', backgroundColor:'#20011a'
            }}
            >IDEAS CAN BE FORGOTTEN BUT NOTES REMEMBERS THEM...</h1>

            <Footer/>
        </div>
    )
}
export default Welcome;