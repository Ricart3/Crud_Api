//importamos bibliotecas cargar el modulo-- en este archivo
const express = require('express');
//importar el modulo path
const path= require('path')
//creacion de la instancia
const app=express();
//Definir el puerto escuchar las solicitudes
const port = 3000;

//Analizador de Json
app.use(express.json());


// creacion de las rutas
/*app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});*/

//Datos en Memoria (temporal)
let usuarios = [];

//Creacion de una Ruta POST
app.post('/usuarios', (req, res)=>{
 // Variables Los campos BD
    const{id,nombre,email}=req.body;
    //Agregar elementos al Arreglo
    usuarios.push({id,nombre,email});
    res.status(201).json({mensaje:'Usuario Creado', usuario:{id,nombre,email}});
})

//Creacion de una Ruta GET
app.get('/usuarios', (req, res)=>{
    res.send('Obtener todos los usuarios');
})


//Iniciar el Servidor
app.listen(port,()=>{
    console.log(`Servidor ejecutandose en  http://localhost:${port}`)
})