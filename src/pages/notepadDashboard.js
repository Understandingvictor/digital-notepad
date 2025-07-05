import '../styles/notepadDashboard.css';
import filter from '../icons/filter.png';
import mode from '../icons/mode.png';
import {useState, useRef, useEffect, useContext} from 'react';
import {stack as Menu} from 'react-burger-menu';
import { Dialog, ExitIcon, MyBurgerIcon, Modal } from '../components/NotePadComponents';
import Logout from '../components/logout';
import { useNavigate } from 'react-router-dom';
import { isLoggedInContext } from '../context.js/context2';
import { Editor } from '@tinymce/tinymce-react';
import {formatDate, getLocalStorageSize} from '../utilities/util';


const usedKB = Math.round(getLocalStorageSize() / 1024 * 100) / 100;
function NotepadDashboard(){
    const navigate = useNavigate();
    const {isLoggedIn,  setIsLoggedIn} = useContext(isLoggedInContext);
   const dialogRef = useRef(null);
   const [isFilterOn, setIsFilterOn] = useState(false); //used to toggle filter on or off
   const [input, setInput] = useState({}); //used to ttrack what user enters in form
   const [array, setArray] = useState([]);//the data fetched from localstorage is pushed into an array, this state holds/tracks the array
   const [isRefresh, setIsrefresh] = useState(true);//this is used to cause state change and make the component reloads, immediately useeffect detects it
   const [taskOpened, setTaskOpened] = useState(null); //for tracking opened task.
   const [isDialogOpen, setIsDialogOpen] = useState(false); //for tracking dialog state
   const [isTrackingFormerData, setIsTrackingFormerData] = useState();
   const  [selectedCategory, setSelectedCategory] = useState("all");
   const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
   const [draftModal, setDraftModal] = useState(false);
   const [draftAlertMessage, setDraftAlertMessage] = useState(null); //used to track the message to be displayed in <Modal/>
   const [preventUseEffect, setPreventUseEffect] = useState(false);//used to prevent useeffect from mounting
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [topLeft, setTopLeft]=useState({top:'36', left:'12'}); //used to adjust the position of the hamburger button
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [isDarkMode , setIsDarkMode] = useState(false);
 
   //THIS USEEFFECT IS USED TO TOOGLE ON SIDE MENU BY DEFAULT ON LARGE SCREEN
   useEffect(()=>{
    const handleResize = ()=>{
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);

    };
    window.addEventListener('resize', handleResize);
        if (screenWidth >= 1024){
            setIsMenuBarOpen(true);
        }
       return ()=>{ //THIS RETURN BLOCK IS USED TO UNMOUNT THIS LISTENER
    window.removeEventListener('resize', handleResize)
   };
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   //this function handles button inside the modal for draft tasks
   const draftModalHandler=()=>{
    console.log(draftAlertMessage);
    openDialog(draftAlertMessage, {isEditable:"editable-data"});
    setDraftModal(false);
    setTaskOpened(draftAlertMessage);
   }


   //this function opens the alert bos for an existing draft for you to edit and save
    const toggleDraftModal=()=>{
     const draft = localStorage.getItem('task-draft');
    setDraftAlertMessage(JSON.parse(draft));  // Parse the string back to an object
    setDraftModal(true);
    
   }

   
//    const saveAsDraft=()=>{
//         localStorage.setItem('taskDraft', JSON.stringify(input));
//         console.log(localStorage);
//    }

   //this is used to log the user out
   const logout =()=>{
    setIsLoggedIn(false);
    navigate('/login');
    console.log(isLoggedIn);
   }
  

   //This function is used to set the state when a user chooses a particular filter for his notes
   const filterHandler = (event)=>{
    const eventValue = event.target.value;
     setSelectedCategory(prev => {
        return eventValue;
    });
      setIsrefresh(!isRefresh);   //this is used to force a rerender of the component
   }

   //this function deletes a task when user clicks delete
   const deleteTask = (incomingData)=>{
    let key;
    let value;
    for (let i=0; i<localStorage.length; i++){
        if (localStorage.key(i).slice(0, 4) === "task"){
                    key = localStorage.key(i);
                    value = JSON.parse(localStorage.getItem(key));
                    incomingData.title === value.title && localStorage.removeItem(key);
        }
    }
    closeTaskDialog();//after user deletes task this part closes dialog
    setIsrefresh(!isRefresh);   //this is used to force a rerender of the component
   }

   const createDraftMemory=()=>{
    localStorage.setItem('task-draft', JSON.stringify({}));
   }

   const openDialog = (incomingData, {isEditable})=>{
        setIsMenuBarOpen(false);//opens meu
        console.log(incomingData, "this is the incoming data");
        incomingData != null ? setIsTrackingFormerData(true): setIsTrackingFormerData(false);
        if (isEditable === "new-data"){//this blocks checks to see if the caller of this function calls to input new data
            console.log("this is new data");
            setInput({});
            if (localStorage.getItem('task-draft')){
                toggleDraftModal();
                //alert ('save your draft first to continue');
                setPreventUseEffect(true);
                return;
            }
            /*for(let i=0; i<localStorage.length; i++){
                 if (localStorage.key(i).slice(0, 10) === "draft"){
                let key = localStorage.key(i);
                let value = JSON.parse(localStorage.getItem(key));
                console.log(value, "this is the value");
                //setDraftModal(true);
                //setDraftAlertMessage(value);
                //console.log(draftAlertMessage);
                //console.log(draftModal);
                return;
            } 
 
            }*/
                if (!localStorage.getItem('task-draft') || JSON.stringify(JSON.parse(localStorage.getItem('task-draft'))) === '{}'){
                    setPreventUseEffect(false);
                    createDraftMemory();
                console.log('i create something regardless');
            }
            //setInterval(saveAsDraft, 1000)
        }
        else if (isEditable === "editable-data"){  //this blocks checks to see if the caller of this function calls it to editing mode
            //setIsMenuBarOpen(!isMenuBarOpen); //this line exits the dialog when you click edit
            if(incomingData !== null){
                console.log("incoming data is not null");
                console.log(incomingData);
                console.log(taskOpened, "is the task opened");
                
                //setIsTrackingFormerData(true);
                let title = incomingData.title;
                let category = incomingData.category;
                let text = incomingData.text;
                setPreventUseEffect(true); //error point
                setInput(()=>({title, category, text}));
                
            }
        }
            dialogRef.current.show();
            if (screenWidth < 768){ //this block adjusts the placing of the hamburger button on mobile when the editing mode is enabled
                setTopLeft({top:'-70', left:'-15'});
            }
        }


    useEffect(()=>{
        if (preventUseEffect){
            return;
        }
        if (localStorage.getItem('task-draft') ||  JSON.stringify(JSON.parse(localStorage.getItem('task-draft'))) === '{}'){
            let taskDraftData = {...input, id:"task-draft-id"};
            localStorage.setItem('task-draft', JSON.stringify(taskDraftData));
        }
        setIsrefresh(!isRefresh);   //this is used to force a rerender of the component
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    //basically used in closing dialog
    const closeDialog = ()=>{
        dialogRef.current.close();
        if (screenWidth < 768){ //this block adjusts the placing of the hamburger button on mobile when the editing mode is enabled
                setTopLeft({top:'36', left:'12'});
            }

    }

    //this is the handler for the individual inputs by user
//1. First, modify your formHandler to handle both regular inputs and TinyMCE content
const formHandler = (eventOrContent) => {
  // Handle TinyMCE editor changes (which passes just the content)
  if (typeof eventOrContent === 'string') {
    setInput(prev => ({
      ...prev,
      text: eventOrContent,
      timeStamp: new Date().toISOString()
    }));
    return;
  }
  // Handle regular input changes (event object)
  const { name, value } = eventOrContent.target;
  setInput(prev => ({
    ...prev,
    [name]: value,
    timeStamp: new Date().toISOString()
  }));
};


    //this is the handler for each task item being clicked, it opens up the task on read Mode
    const individualTaskHandler = (element)=>{
        setTaskOpened(element);
        setIsDialogOpen(true);
    }
    const closeTaskDialog=()=>{ //closes dialog from read mode when X button is clicked
        setIsDialogOpen(false);
    }

    //this submits the form  by the user when user clicks submit and sets the timestamp before saving in Local storage.
    const submit = (event)=>{
                    console.log(localStorage) 
        let key = null;
        let value = null;
        let task = `task ${localStorage.length + 1}`;
        const timeStamp = new Date().toISOString(); //this is the timestamp
        event.preventDefault();
        if (isTrackingFormerData){
            console.log('i entered here');
            for (let i=0; i<localStorage.length; i++){
                if (localStorage.key(i).slice(0, 4) === "task"){
                     key = localStorage.key(i);
                     value = JSON.parse(localStorage.getItem(localStorage.key(i)));

                     
                    if (value.id === Number(taskOpened.id)){ // this if block is for when request is coming for a saved task
                        console.log(value.id, "is id in memory", taskOpened.id, "is id opened");
                        let updatedInput = {...input, timeStamp, id:localStorage.length + 1}; //setting a timestamp for each submit. adding just the "timeStamp" at spreading creates key and evaluates timestamp value as the actual value
                        localStorage.setItem(key, JSON.stringify(updatedInput));
                        console.log("i found it", localStorage.getItem(key));
                         closeDialog();
                          setIsrefresh(!isRefresh);   //this is used to force a rerender of the component
                        return;
                    }
                    else if (key === 'task-draft' && taskOpened.id === 'task-draft-id'){ //this compares if the current key is "task-draft" and the ide is 'task-draft-id'
                        console.log(key, "is the draft key", taskOpened.id, "is the task opeend id")
                        let updatedInput = {...input, timeStamp, id:localStorage.length + 1}; //setting a timestamp for each submit. adding just the "timeStamp" at spreading creates key and evaluates timestamp value as the actual value
                        localStorage.setItem(task, JSON.stringify(updatedInput));
                        console.log("i found it", localStorage.getItem(key));
                    }
            }}
    }
        else{
            let updatedInput = {...input, timeStamp, id:localStorage.length + 1}; //setting a timestamp for each submit. adding just the "timeStamp" at spreading creates key and evaluates timestamp value as the actual value
            console.log('is not tracking any data');
            console.log(isTrackingFormerData);
            localStorage.setItem(task, JSON.stringify(updatedInput));
             setIsrefresh(!isRefresh);   //this is used to force a rerender of the component
             setInput({});
        }
        localStorage.removeItem('task-draft');
        setIsrefresh(!isRefresh);   //this is used to force a rerender of the component
        closeDialog(); //this is used to close modal when a user submits a task
        setIsMenuBarOpen(true);
    }
    

    //This fetches the task in localstorage && entry point for array sorting
    const tasks=()=>{
        let myArr = [];
        for (let i=0; i<localStorage.length; i++){//forloop used to iterate over items in local storage and get the ones which the key starts with "task", which is the prefix and key for each task submitted by a user
            if (localStorage.key(i).slice(0, 4) === "task"){
                let value = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if (value.timeStamp !== undefined){
                    let formatedate = formatDate(`${value.timeStamp}`)
                    value.timeStamp = formatedate ;
                }
                myArr.push(value);
            }  
 
        }

        const filteredTask = selectedCategory === "all" ? myArr:myArr.filter(element=>element.category === selectedCategory);
        myArr = filteredTask;
        myArr.sort((a, b)=> //this is used to sort tasks in the myArr in order there where created
            new Date(b.timeStamp) - new Date(a.timeStamp)
        )
        return myArr;   
    }

  
    //used for tracking the state of the menu(sidebar) which is a library whether open and then using that data to set the state
    const isMenuOpenChecking =(state)=>{
        const menuBarState = state.isOpen;
        setIsMenuBarOpen(menuBarState);
    }

    
    //this is used to load the tasks in myArr which was fetched from localstorage earlier when this component ( NotepadDashboard) mounts
  useEffect(()=>{
    const task = tasks();
    setArray(task);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefresh]);//this line is used as a dependency.  when it changes, it causes the react component rerender and it reloads whats in the myArr array
    
  return(
        <div className="main">
         <div>
            <section className='section-header'>
                <header className="dash-header">
                        <h1 className="headline"><span className="dash-user-name">{localStorage.getItem('username')}</span >NOTEPAD</h1>
                
                </header>
            </section>
                <section>
                    <div className='outer-container'>
                        <Menu 
                        customBurgerIcon={ <MyBurgerIcon/>} 
                        customCrossIcon={ <ExitIcon/>}
                        noOverlay={true}
                        onStateChange={ isMenuOpenChecking }
                        isOpen={isMenuBarOpen}

                        styles={{
                            bmBurgerButton: {
                            position: 'absolute',
                            width: '36px',
                            height: '30px',
                            left: `${topLeft.left}px`,  // Dynamic value
                            top: `${topLeft.top}px`,     // Dynamic value
                            paddingTop: '2px',
                            marginLeft:'10px',
                            borderRadius: '10px',
                            border:'1px solid #FFD54F',
                            boxShadow: '1px 0px 6px rgb(37, 33, 33)'
                            }
                        }}
                        > 
                            <div className="main-1">
                                <h3 className="notes">NOTES ({array.length})<div style={{display:'column', fontSize:'x-small', fontStyle:'italic', color:'white', opacity:'70%'}}><small>used: {usedKB + ' KB'}</small><br></br><small>Max: 5 MB</small></div> </h3>
                                <div className='filter-conttainer'onClick={()=>setIsFilterOn(!isFilterOn)}>
                                    <img style={{width:"20px"}} src={filter} alt="filter" />
                                </div>
                                <div className={`filterButton ${isFilterOn ? "active": ""}`}>
                                    <select onChange={filterHandler}  value={selectedCategory}>
                                        <option value="all">all</option>
                                        <option value="personal">Personal</option>
                                        <option value="work">Work</option>
                                        <option value="to-do">To-Do</option>
                                        <option value="study">Study/Learning</option>
                                        <option value="reminders">Reminders</option>
                                        <option value="health">health</option>
                                        <option value="spiritual">Spiritual/Faith</option>
                                        <option value="misc">other</option>
                                        <option value="misc">Miscellanous</option>
                                    </select>
                                </div> 
                                <div className='data-from-database' style={{maxHeight:`${screenHeight - 300}px`, overflow:'auto', backgroundColor:'#333333'}}>
                                    {
                                        array.map((element, index)=>(
                                        <div className='container-for-tasks-rendering' key={index} onClick={()=>individualTaskHandler(element)}>
                                            <div className='element-titleAnd-category-container'>
                                                <span className='taskTitle'>{element.title}</span>
                                                <span className='taskCategory'><i>{element.category} | {element.timeStamp}</i></span>
                                            </div>
                                        </div>
                                        ))
                                    }
                                </div>
                                <Logout text="LOGOUT" onclick={logout}/>
                            </div>
                            
                        </Menu>
                    </div>
                <div className="dash-main ">
                    <div className="main-2">
                        <div className="addnote-text-container" onClick={()=>openDialog(null, {isEditable:"new-data"})}><h1 className="add-note-text">ADD NOTE <span className="plus-button">+</span></h1></div>
                    </div>
                </div>
            </section>
            <section>
                <dialog className="task-input-dialog" ref={dialogRef}>
                    <div style={{ width:'100%', textAlign:'center', display:'flex', justifyContent:'center', padding:'0'}}>
                        <button className='new-task-input-main' onClick={closeDialog}>X</button>
                        <div className={` mode-icon ${ isDarkMode ? 'dark-mode': 'light-mode'}`}  onClick={()=>setIsDarkMode(!isDarkMode)}><img  style={{ paddingTop: isDarkMode ? "20px":"0px", width:"60%"}} src={mode} alt="filter"/></div>
                    </div>
                    <div className='form-container'>
                        <form style={{height:  screenWidth < 768 ? 'calc(100vh - 80px)':'calc(100vh - 100px)'}} onSubmit={submit}>
                            <div><input className='task-input' name='title' onChange={formHandler} value={input.title || ""} placeholder='title'/></div>
                            <div >
                                <select required className='task-input-select' name="category" onChange={formHandler} value={input.category || ""}>
                                    <option value="" disabled>select category</option>
                                    <option value="personal">Personal</option>
                                    <option value="work">Work</option>
                                    <option value="to-do">To-Do</option>
                                    <option value="study">Study/Learning</option>
                                    <option value="reminders">Reminders</option>
                                    <option value="health">health</option>
                                    <option value="spiritual">Spiritual/Faith</option>
                                    <option value="misc">other</option>
                                    <option value="misc">Miscellanous</option>
                                </select>
                            </div>
                            <div className='textarea-container'> 
                                <Editor 
                                apiKey= 'tc95ix6qrzvrqgta95xrts1skmbwj1t9di82tiw2kzdvxqj6'
                                value={input.text || ""}
                                 key={isDarkMode ? 'dark' : 'light'}
                                init={{
                                    mobile: {
                                        toolbar_mode: 'sliding', // or 'wrap'
                                        autocorrect: true
                                        },
                                    skin: isDarkMode ? 'oxide-dark' : 'oxide', // Built-in skins
                                    content_css: isDarkMode ? 'dark' : 'default',
                                    height:'100%',
                                    menubar:false,
                                    link_quicklink: true, // Easier link creation
                                    plugins: 'lists link lineheight  insertdatetime',
                                    branding: false, 
                                    spellchecker_active: true,
                                    toolbar_mode: 'floating',
                                    toolbar_sticky: false,
                                    capitalize:true,
                                    spellchecker_language: 'en_UK',
                                    toolbar: screenWidth < 768? ' fontfamily fontsize blocks bold italic | undo redo | numlist | link':
                                     'undo redo | bold italic insertdatetime |fontfamily fontsize blocks| bullist numlist | alignleft aligncenter alignright alignjustify | lineheight | link',
                                }}
                                onEditorChange={(content) => {
                                    // Call formHandler with just the content string
                                    formHandler(content);
                                }}
                                />
                                <input name='createdAt' type="hidden" value={new Date().toISOString()}/>
                            </div>
                            <button className='submit-button'>SAVE</button>
                        </form>
                    </div>
                </dialog>  
            </section>
         </div>
                      {
                    isDialogOpen && (
                        <Dialog data={taskOpened}  closeDdialog={closeTaskDialog} edit={openDialog} deLete={deleteTask}/>
                    )
                }
                {
                    draftModal && (
                        <Modal onclickFunction={()=>setDraftModal(false)}>
                            <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', width:'100%', borderRadius:'5px'}}>
                                 <small style={{opacity:'70%'}}>you have a <span style={{opacity:'100%', fontSize:'150%'}}>DRAFT</span>, click edit to save it and continue</small>
                                <h1>{draftAlertMessage.title}</h1>
                                <p>{draftAlertMessage.text}</p>
                                <button onClick={draftModalHandler} className='alertModalButton'>EDIT</button>
                            </div>
                           
                        </Modal>
                    )
                }
        </div>
    )
}
export default NotepadDashboard;