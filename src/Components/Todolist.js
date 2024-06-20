import * as React from 'react';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import  Container  from '@mui/material/Container';
import  Divider  from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';

import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid'; 


import Todo from './Todo';





    export default function Todolist() {
        const[todos,setTodos]= useState([]);
        const [value,setValue]= useState("");

        

        const addTodo = todo =>{
            const updatedTodos=[...todos, {id: uuidv4(), todo: todo,   isCompleted: false}]
            setTodos(updatedTodos);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            setValue('');
        }
        
            useEffect(() => {
                try {
                    const storageTodos = localStorage.getItem("todos");
                    if (storageTodos) {
                        const parsedTodos = JSON.parse(storageTodos);
                        if (Array.isArray(parsedTodos)) {
                            setTodos(parsedTodos);
                        }
                    }
                } catch (error) {
                    console.error("Failed to parse todos from localStorage:", error);
                }
             
            },[]);



        function handleSubmit (e){
            e.preventDefault(); 
            addTodo(value);

        };
        const deleteTodo = (id) => {
            const updatedTodos= todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
           
        };

        const toggleComplete =(id) =>{
            const updatedTodos =todos.map((todo)=>
                todo.id === id ? {...todo,isCompleted: !todo.isCompleted}:todo
            ) ;
            setTodos(updatedTodos);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            
        };

        const editTodo = (id, newTodo) =>{
            const updatedTodos=todos.map((todo) => (todo.id === id ?{...todo, todo: newTodo} : todo));
            setTodos(updatedTodos);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            
        }
    
    

    return (
        <Container maxWidth="sm">
        
        <Card sx={{ minWidth: 200 , background:"#fff" , color:"#000", maxHeight:"80vh", overflow:"scroll"}}>
        <CardContent>
            <Typography variant='h3' marginBottom='10px' fontFamily="-moz-initial">
            My Todos
            </Typography>
            <Divider/>
            
            
            <form  style={{marginTop: "20px"}} onSubmit={handleSubmit} >
            <Grid container spacing={2} >
        <Grid xs={10} >
        <TextField fullWidth label="What To do.." id="fullWidth" value={value}  onChange={(e)=> setValue(e.target.value)}/>
            </Grid>
            <Grid xs={2}>
            <Button   type="submit" variant="contained"  sx={{  width: "100%", height:"100%", textTransform:"inherit"}} disabled={value.length === 0}>
           Add
           
    </Button>
            

            </Grid>
        
            </Grid>
            </form>
            <div>
            {todos.map((todo) =>(
                <Todo key={todo.id} id={todo.id} todo ={todo.todo} deleteTodo ={deleteTodo}  isCompleted={todo.isCompleted} toggleComplete ={toggleComplete} editTodo={editTodo}/>
            
            ))}

            </div>

            
            
            
            
        </CardContent>
        </Card>
        
        
        </Container>
    );
    }
