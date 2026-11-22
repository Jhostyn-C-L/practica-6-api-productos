const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto

    //Aqui se recibe el cuerpo de la peticion con los 3 campos
app.post('/productos',(req, res) =>{
    const datos = req.body || {}
    const {nombre, descripcion} = datos
    const precio = parseFloat(datos.precio)
    //Aqui se valida si faltan nombre, descripcion y precio, ademas de un mensaje de advertencia
    if(!nombre || !descripcion || datos.precio === undefined){
        return res.status(400).json({
            mensaje: 'El nombre, la descripcion y el precio son obligatorios'
        })
    }
    const nuevoId = Math.max(...productos.map(p => p.id), 0) + 1

    //Aqui se genera un ID para que no se repita
    const nuevoProducto ={
        id: nuevoId,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    }
    productos.push(nuevoProducto)
    res.status(201).json(nuevoProducto)
    })

// TODO: PUT /productos/:id - Actualizar producto

    //Aqui se obtiene el id con req.params y se busca la posicion del producto
    app.put('/productos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const indice = productos.findIndex(p => p.id === id)
    
    //Se verifica si el producto existe, de no existir, se devuelve codigo 404 y su respectivo mensaje
    if (indice === -1){
        return res.status(404).json({ mensaje: 'Producto no encontrado'})
    }
    const datos = req.body || {}
    const {nombre, descripcion} = datos
    const precio = parseFloat(datos.precio)

    //Aqui se verifica si los campos nombre, descripcion o precio faltan
    if(!nombre || !descripcion || datos.precio === undefined){
        return res.status(400).json({
            mensaje: 'Los campos nombre, descripcion y precio son obligatorios'
        })
    }
    //Se coserva el mismo id al reemplazar los datos
    const productoActualizado = {
        id: productos[indice].id,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    }
    //Aqui se responde con codigo 200 y con el producto actualizado
    productos[indice] = productoActualizado
    res.status(200).json(productoActualizado)
})
// TODO: DELETE /productos/:id - Eliminar producto
    //Similar con put, aqui se obtiene el id con req.params y se busca la posicion del producto
    app.delete('/productos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const indice = productos.findIndex(p => p.id === id)

        //Se verifica si el producto no existe, de ser el caso devuelve codigo 404 y un mensaje
        if (indice === -1){
            return res.status(404).json({mensaje:'Producto no encontrado'})
        }
        //Aqui se elimina el producto usando splice y responde con un mensaje de confirmacion y datos del producto.
        const productoEliminado = productos.splice(indice, 1)[0]
        res.status(200).json({
            mensaje: 'Producto eliminado',
            producto: productoEliminado
        })
        })

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
