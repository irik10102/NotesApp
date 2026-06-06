import { useRef, useState } from "react";
import EachNote from "./EachNote";
import axios from 'axios';

interface newNote{
    title:string,
    content:string
}
const Notes = ()=>{
    const [flag, setFlag] = useState<boolean>(false);
    const [notesArray, setNotesArray] = useState<any[]>([]);
    const refContent = useRef<HTMLTextAreaElement>(null);
    const refTitle = useRef<HTMLInputElement>(null);
    const [newNote1 , setnewNote1] = useState<newNote>({title:'', content:''});
    const [editFlag, setEditFlag] = useState<boolean>(false);
    const [editIndex, setEditIndex] = useState<Number>(-1);

    

    const CREATE_URL:string = 'http://localhost:7000/add'; 
    const EDIT_URL:string = 'http://localhost:7000/edit/';
    const DEL_URL:string = 'http://localhost:7000/delete/';



    
    const valueUpdate =(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{   
        const {name, value} = event.target;

        setnewNote1((prev)=>({...prev, [name]:value}));
    }

    const add = async ()=>{
        setFlag(false);
        if(!editFlag){                                                    //Input is require for edit or add
            try {
                if(newNote1.title == '' || newNote1.content == ''){
                    throw new Error('Title or Content is required');
                }
                await axios.post(CREATE_URL, newNote1).then((res)=>{
                    setNotesArray(res.data);
                    console.log(res.data);
                })
            }
            catch(err){
                console.error(err);
                alert('Note not added, Please try again later...')
            }
        }
        else if(editFlag){
            try {
                if(newNote1.title == '' || newNote1.content == ''){
                    throw new Error('Title or Content is required');
                }
                await axios.put(EDIT_URL+editIndex, newNote1).then((res)=>{
                    setNotesArray(res.data);
                    console.log(res.data);
                    alert('Updated Successfully!');
                    setEditFlag(false);
                })
            }
            catch(err){
                console.error(err);
                alert('Note no added, Please try again later...');
            }
        }
    }

    const editNote = (index:number)=>{
        setFlag(true);                  // So that the input area opens up
        setEditFlag(true);             // In order to tell the UI that editing is require

        setEditIndex(index);            // So that this index can be accessed throughout any function
                                        //Could have pass it as an optional argument
                                        //but that requires to call function.
    }
    const delNote = async (index:number)=>{
        try{
            await axios.delete(DEL_URL+index).then((res)=>{
                alert('Note deleted successfully');
                setNotesArray(res.data);
            })
        }
        catch(err){
            alert('Please try again later');

        }
    }
    
    
    return(
        <>
            <div className=" container d-flex-column  mt-5">
                {!flag&&<button onClick={()=>{setFlag(true)}} className="btn btn-outline-success">Create Notes</button>}
                {flag&& <table >
                            <tbody>
                                <tr>
                                    <td><label >Title:</label></td>
                                    <td><input type="text" name="title" onChange={valueUpdate}/></td>
                                </tr>
                                <tr>
                                    <td><label>Content:</label></td>
                                    <td><textarea name="content" rows={10} cols={40} className="me-05" onChange={valueUpdate}></textarea></td>
                                    
                                </tr>
                                <tr><td><button className='btn btn-outline-danger' onClick={add}>Save</button></td></tr>
                                
                            </tbody>
                           
                        </table>}
                <br></br>
                <br></br>
                <h4>Your Notes:-</h4>
                <table></table>{notesArray.length>0 && notesArray.map((note,index)=>{
                    return <tr>
                        <td key={index}><EachNote title={note.title} content={note.content}/></td>
                        <td><button className="btn btn-outline-primary" onClick={()=>{editNote(index)}} >Edit</button></td>
                        <td><button className="btn btn-outline-danger" onClick={()=>{delNote(index)}}>Delete</button></td> 
                    </tr> 
                }) }<table/>
            </div>
        </>
    )
}
export default Notes;