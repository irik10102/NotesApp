import express, { urlencoded } from 'express';
import cors from 'cors';

const PORT = 7000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({extended:true}));

const notesArray = [];

app.post("/add", (req,res)=>{
    const {title, content} = req.body;
    console.log(req.body);
    const newId = notesArray.length;
    notesArray.push({id:newId,title, content});
    res.status(200).json(notesArray);
})

app.put("/edit/:id", (req,res)=>{
    const id = Number(req.params.id);
    //console.log(id);
    const {title, content} = req.body;

    notesArray[id] = {title:title,content:content};

    res.status(200).json(notesArray);
   
})

app.delete("/delete/:id", (req,res)=>{
    const id = Number(req.params.id);
    notesArray.splice(id,1);
    notesArray.forEach((note, index)=>{
        note.id = index
    })

    res.status(200).json(notesArray);
})
app.listen(PORT, ()=>{console.log(`App is running at http://localhost:${PORT}`)})