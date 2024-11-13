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
    res.json(usuarios)
})

// Ruta para obtener un Usuario Id
app.get('/usuarios/:id',(req, res)=>{
    const usuario = usuarios.find(u => u.id == req.params.id);
    //Validar  objeto
    if(usuario){
    //MOSTRAR
    res.json(usuario)
    }else{
        res.status(404).json({mensaje:"Usuario no se encuentra"})
    }
})

//Crear la Ruta para Actualizar un usuario PuT
app.put('/usuarios/:id',(req,res)=>{
    const {nombre, email} = req.body
    const usuario = usuarios.find(u => u.id == req.params.id);
    if(usuario){
    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email ||usuario.email;
    res.json({mensaje: 'Usuario Actualizado..', usuario});

    }else{
    res.status(404).json({mensaje:'Usuario No Encontrado'});
    }
})

//Ruta Para Eliminar un usuario
app.delete('/usuario/:id', (req, res)=>{
const index = usuarios.findIndex(u => u.id == req.params.id);
if(index !== -1){
    const ususarioEliminado = usuarios.splice(index,1);
    res.json({mensaje:'Usuario Eliminado', usuario: ususarioEliminado});
}else{
    res.status(404).json({mensaje:'Usuario no Encontrado...'})
}
})

//Iniciar el Servidor
app.listen(port,()=>{
    console.log(`Servidor ejecutandose en  http://localhost:${port}`)
})