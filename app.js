/**
 * This is your server file
 */
 
 // Add all your require statements here
 const { todos, createTodo } = require("./todos");
 const express = require('express');
 const cors = require('cors');
 let id = todos.length + 1
 
 // Your port of choice here
 const PORT = 3000;
 
 // Create your app (server) here
 const app = express();
 
 // Add middleware here
 app.use(cors());
 app.use(express.json());
 
 // Add express routes here
 app.get('/', (req, res) => {
     res.send('Hello World')
 });
 
 app.get('/todos', (req, res) => {
     res.status(200).json(todos);
 })
 
 app.post('/todos', (req, res) => {
     let newTask = {id: id, description: req.body.description, completed: false}
     todos.push(newTask)
     id++;
     res.status(200).json(newTask);
 })
 
 app.delete('/todos/:id', (req, res) => {
     let id = req.params.id;
     todos.splice(todos.findIndex(task => task.id === parseInt(id)), 1);
     res.status(204).end();
 })
 
 app.put('/todos/:id', (req, res) => {
     let id = req.params.id;
     let index = todos.findIndex(task => task.id === parseInt(id))
     todos[index].completed = true;
     res.status(204).end();
 })
 // Add server listen call here
 app.listen(PORT, () => {
     console.log("List of todos server")
 })