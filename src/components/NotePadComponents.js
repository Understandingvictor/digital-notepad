function MyBurgerIcon(){
    return(
        <div style={{ height:'20px',}}>
        <div style={{ width: '20px', height: '2px', background: '#000', margin: '4px 0'}} />
        <div style={{ width: '10px', height: '2px', background: '#000', margin: '4px 0' }} />
        <div style={{ width: '20px', height: '2px', background: '#000', margin: '4px 0' }} />
        </div>
    )
};
function ExitIcon(){
    return(
        <div style={{ fontSize:'large', textAlign:'center'}}>
        {`<`}
        </div>
    )
};
function Dialog({data, closeDdialog, edit, deLete}){
    return(
        <div>
            <div className='dropShadow'>
            </div>
            
            <div className='lastDialog'>
                <button onClick={closeDdialog} style={{backgroundColor:'#20011a', color:'#bcc3c5'}}>X</button><br/>
                <h1>{data.title}</h1><br/>
                <small style={{fontStyle:'italic', opacity:'70%'}}>{data.category}</small><br/>
                <p  className='data-read-mode' dangerouslySetInnerHTML={{__html: data.text}} />
                <div className='editButton-and-deleteButton'>
                    <button className='editButton' onClick={()=>{
                        edit(data, {isEditable:"editable-data"});
                        closeDdialog();
                     }}>EDIT</button><button className='deleteButton' onClick={()=>deLete(data)}>DELETE</button><br/>
                </div>
                
            </div>
        </div>
    )
}

function Modal({children, onclickFunction}){
   
    return(
        <div>
            <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(13, 30, 37, 0.8)', // Dark semi-transparent
                        zIndex: 2000 }} >
            </div>
            
            <div style={{ backgroundColor:"black", color:"white", zIndex:5000, position: 'fixed',  // Required for zIndex
                top: '50%', left: '50%', transform: 'translate(-50%, -50%)',  width:'50%', height:'50%',
                paddingLeft:'10px', paddingRight:'10px', boxShadow:"1px 0 6px #0f0f0f", borderRadius:"10px"
                }}>
                <button onClick={onclickFunction} style={{backgroundColor:'#0f0f0f', color:'#c5c3bc'}}>X</button><br></br>
                {children}
                
            </div> 
        </div>
    )
}

 function Button({buttonText, onclick}){
    return(
        <button style={{zIndex:20000}} 
        onClick={onclick}>
            {buttonText}
        </button>
    )
 }
export {MyBurgerIcon, ExitIcon, Dialog, Modal, Button};