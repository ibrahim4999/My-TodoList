import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';





    export default function Todo({id, todo,  deleteTodo, editTodo, toggleComplete, isCompleted}) {

        const [isEditing, setIsEditing]= useState(false);
        const [newTodo, setNewTodo] = useState(todo);

        const handleEDit = () =>{
            editTodo && editTodo(id,newTodo);
            setIsEditing(false);
        }
    return (
        <div>
        
        <Card sx={{ minWidth: 200 , background:"rgb(62, 62, 223)", color: "white", marginTop:"10px"}}>
        <CardContent>
        <Grid container spacing={2} >
        <Grid xs={8} >
        {isEditing ? (
            <TextField 
            fullWidth
            value={newTodo}
            onChange={(e)=>setNewTodo(e.target.value)}
            onBlur={handleEDit}
            sx={{ input: { color: isEditing ? "#fff" : "" } }}
            ></TextField>
        ):(
            <Typography variant='h5' style={{textAlign:"left", color: isCompleted ? "rgb(255, 255, 255,0.3)": "#fff", textDecoration: isCompleted?"line-through" :"none"}}>{todo}</Typography>
            )}
        </Grid>
            <Grid xs={4} display="flex" justifyContent="space-around" alignItems="center" >
            
            <IconButton aria-label="check" style={{color:isCompleted? "#fff": "#4caf50", background: isCompleted? "#4caf50": "#fff", border:"solid #4caf50 3px", marginRight:"2"}} onClick={()=> toggleComplete(id)} >
            <CheckIcon />
            </IconButton>
            <IconButton aria-label="edit"  style={{color:"#3949ab", background: "#fff", border:"solid #303f9f 3px" }} onClick={()=> setIsEditing(true)}>
            <EditIcon />
            </IconButton>
            
            <IconButton aria-label="delete" style={{color:"#b23c17", background:"#fff", border:"solid #b23c17 3px", marginLeft:"2px"}}  onClick={() => deleteTodo(id)}>
            <DeleteIcon />
        </IconButton>
            
            
            </Grid>
        
            </Grid>
            
        </CardContent>
        </Card>
        
        
        </div>
    );
    }
