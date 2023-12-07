const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.urlencoded({ extended:true }));
app.use(express.json());


const conn = mysql.createConnection({
    host     : 'dbalejopalacios.c968etm8fphq.us-east-2.rds.amazonaws.com', // Your connection adress.
    user     : 'admin',     // Your database's username.
    password : 'alejopass1700',        // Your database's password.
    database : 'alejopalacios'   // Your database's name.
});


conn.connect((err) => {
    if(err) throw err;
    console.log('Conectado a MySQL Server');
});

app.get('/usu', function(req,res){
    conn.query('select * from usuarios;', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

/*CONSULTAS PRODUCTOS*/

app.get('/SubirCategorias', function(req,res){
    conn.query('SELECT * from categorias', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaProductosXCat', function(req,res){
    console.log("Consulta Categoria");
    console.log(req.body);
    const data = req.body;
    let Categoria = data.Categoria;
    conn.query('select p.idProducto, p.Nombre as Producto, p.Descripcion from productos as p INNER JOIN subcategorias as sc on p.idSubCategoria = sc.idSubCategoria INNER JOIN categorias as c on c.idCategoria = sc.idCategoria WHERE c.Concepto = \"'+Categoria+'\" ORDER BY p.Nombre;'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaProductosASurtir', function(req,res){
    console.log("Consulta Categoria");
    console.log(req.body);
    const data = req.body;
    let Categoria = data.Categoria;
    conn.query('select p.idProducto, p.Nombre as Producto, p.Existencia from productos as p INNER JOIN subcategorias as sc on p.idSubCategoria = sc.idSubCategoria INNER JOIN categorias as c on c.idCategoria = sc.idCategoria WHERE c.Concepto = \"'+Categoria+'\" and p.Existencia <= p.Minimo ORDER BY p.Nombre;'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaListaPrecios', function(req,res){
    console.log("Consulta Categoria");
    console.log(req.body);
    const data = req.body;
    let Categoria = data.Categoria;
    conn.query('select p.Nombre as Producto, p.PrecioDist, p.PrecioMay, p.PrecioMedMay, p.PrecioPub from productos as p INNER JOIN subcategorias as sc on p.idSubCategoria = sc.idSubCategoria INNER JOIN categorias as c on c.idCategoria = sc.idCategoria WHERE c.Concepto = \"'+Categoria+'\" ORDER BY p.Nombre;'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaXExistencia', function(req,res){
    console.log("Consulta Categoria");
    console.log(req.body);
    const data = req.body;
    let Categoria = data.Categoria;
    conn.query('select p.idProducto, p.Nombre as Producto, p.Existencia from productos as p INNER JOIN subcategorias as sc on p.idSubCategoria = sc.idSubCategoria INNER JOIN categorias as c on c.idCategoria = sc.idCategoria WHERE c.Concepto = \"'+Categoria+'\" ORDER BY p.Nombre;'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

/*CONSULTAS SERVICIOS*/

app.get('/SubirServicios', function(req,res){
    conn.query('SELECT * from tiposervicio', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaServiciosXTipo', function(req,res){
    console.log(req.body);
    const data = req.body;
    let TipoServicio = data.TipoServicio;
    conn.query('SELECT s.idServicio, s.Descripcion, ss.Concepto as SubServicio, s.Existencia from servicios as s INNER JOIN subservicio as ss on s.idSubServicio = ss.idSubServicio INNER JOIN tiposervicio as ts on ts.idTipoServicio = ss.idTipoServicio WHERE ts.Concepto = \"'+TipoServicio+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

/*CONSULTAS CLIENES*/

app.get('/SubirClientes', function(req,res){
    conn.query('SELECT Nombre from clientes', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

/*Sube Usuarios */
app.get('/SubirUsuarios', function(req,res){
    conn.query('SELECT Nombre from usuarios', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})
/*Sube Usuarios */

app.get('/ConsultaGClientes', function(req,res){
    conn.query('SELECT idCliente, Nombre, Saldo from clientes', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.get('/ConsultaClientesSaldo', function(req,res){
    conn.query('SELECT idCliente, Nombre, Saldo from clientes where Saldo > 0', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.get('/ConsultaClientesSinSaldo', function(req,res){
    conn.query('SELECT idCliente, Nombre, Saldo from clientes where Saldo <= 0', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaTipoCliente', function(req,res){
    console.log(req.body);
    const data = req.body;
    let TipoCliente = data.TipoCliente;
    conn.query('SELECT idCliente, Nombre, Saldo from clientes WHERE TipoCliente = \"'+TipoCliente+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

/*CONSULTAS PROVEEDORES*/

app.get('/SubirRepres', function(req,res){
    conn.query('SELECT Representante from proveedores', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.get('/SubirProv', function(req,res){
    conn.query('SELECT Nombre from proveedores', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.get('/ConsultaGProv', function(req,res){
    conn.query('SELECT idProveedor, Nombre, Saldo from proveedores', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.get('/ConsultaProvSaldo', function(req,res){
    conn.query('SELECT idProveedor, Nombre, Saldo from proveedores where Saldo > 0', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.get('/ConsultaProvSinSaldo', function(req,res){
    conn.query('SELECT idProveedor, Nombre, Saldo from proveedores where Saldo <= 0', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaProvRepre', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Repre = data.Repre;
    conn.query('SELECT idProveedor, Nombre, Saldo from proveedores WHERE Representante = \"'+Repre+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

/*CONSULTAS VENTAS*/

app.post('/ConsultaVentasPeriodo', function(req,res){
    console.log(req.body);
    const data = req.body;
    let FI = data.FI;
    let FF = data.FF;
    conn.query('select v.idVenta, c.Nombre, v.Fecha, v.Total, v.Saldo from ventas as v inner join clientes as c on v.idCliente = c.idCliente where v.Fecha between \"'+FI+'\" and \"'+FF+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaVentasXCte', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Cte = data.Cte;
    conn.query('select v.idVenta, c.Nombre, v.Fecha, v.Total, v.Saldo from ventas as v inner join clientes as c on v.idCliente = c.idCliente where c.Nombre = \"'+Cte+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaVentasXUsu', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Usu = data.Usu;
    conn.query('select v.idVenta, u.Nombre, v.Fecha, v.Total, v.Saldo from ventas as v inner join usuarios as u on v.idUsuario = u.idUsuario where u.Nombre = \"'+Usu+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaVentasVencidas', function(req,res){
    console.log(req.body);
    const data = req.body;
    let FV = data.FV;
    conn.query('select v.idVenta, c.Nombre, v.Fecha, v.Total, v.Saldo from ventas as v inner join clientes as c on v.idCliente = c.idCliente where v.FechaVencimiento <= \"'+FV+'\" and v.Condicion = "Credito";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaVentasXSaldo', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Condicion = data.Condicion;
    if (Condicion == "Con Saldo") {
        console.log("Saldo")
        conn.query('select v.idVenta, u.Nombre, v.Fecha, v.Total, v.Saldo from ventas as v inner join usuarios as u on v.idUsuario = u.idUsuario where v.Saldo > 0;'
        , (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    else if(Condicion == "Sin Saldo"){
        console.log("Sin Saldo")
        conn.query('select v.idVenta, u.Nombre, v.Fecha, v.Total, v.Saldo from ventas as v inner join usuarios as u on v.idUsuario = u.idUsuario where v.Saldo <= 0;'
        , (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    else if(Condicion == "Todas"){
        console.log("Todas")
        conn.query('select v.idVenta, u.Nombre, v.Fecha, v.Total, v.Saldo from ventas as v inner join usuarios as u on v.idUsuario = u.idUsuario;'
        , (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
})


/*CONSULTAS COMPRAS*/

app.post('/ConsultaComprasVencidas', function(req,res){
    console.log(req.body);
    const data = req.body;
    let FV = data.FV;
    conn.query('select c.idCompra, p.Nombre, c.Fecha, c.Total, c.Saldo from compras as c inner join proveedores as p on p.idProveedor = c.idProveedor where c.FechaVencimiento <= \"'+FV+'\" and c.Condicion = "Credito";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaComprasPeriodo', function(req,res){
    console.log(req.body);
    const data = req.body;
    let FI = data.FI;
    let FF = data.FF;
    conn.query('select c.idCompra, p.Nombre, c.Fecha, c.Total, c.Saldo from compras as c inner join proveedores as p on p.idProveedor = c.idProveedor where c.Fecha between \"'+FI+'\" and \"'+FF+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaComprasXProv', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Prov = data.Prov;
    conn.query('select c.idCompra, p.Nombre, c.Fecha, c.Total, c.Saldo from compras as c inner join proveedores as p on p.idProveedor = c.idProveedor where p.Nombre = \"'+Prov+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaComprasXSaldo', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Condicion = data.Condicion;
    if (Condicion == "Con Saldo") {
        console.log("Saldo")
        conn.query('select c.idCompra, p.Nombre, c.Fecha, c.Total, c.Saldo from compras as c inner join proveedores as p on p.idProveedor = c.idProveedor where c.Saldo > 0;'
        , (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    else if(Condicion == "Sin Saldo"){
        console.log("Sin Saldo")
        conn.query('select c.idCompra, p.Nombre, c.Fecha, c.Total, c.Saldo from compras as c inner join proveedores as p on p.idProveedor = c.idProveedor where c.Saldo <= 0;'
        , (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
    else if(Condicion == "Todas"){
        console.log("Todas")
        conn.query('select c.idCompra, p.Nombre, c.Fecha, c.Total, c.Saldo from compras as c inner join proveedores as p on p.idProveedor = c.idProveedor;'
        , (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
})

/*CONSULTAS PAGOS*/
app.get('/ConsultaGPagos', function(req,res){
    conn.query('select p.idPago, pr.Nombre, p.Fecha, p.Importe from pagos as p INNER JOIN compras as c on p.idCompra = c.idCompra INNER JOIN proveedores as pr on c.idProveedor = pr.idProveedor;', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaPagosXPeriodo', function(req,res){
    console.log(req.body);
    const data = req.body;
    let FI = data.FI;
    let FF = data.FF;
    conn.query('select p.idPago, pr.Nombre, p.Fecha, p.Importe from pagos as p INNER JOIN compras as c on p.idCompra = c.idCompra INNER JOIN proveedores as pr on c.idProveedor = pr.idProveedor where p.Fecha between \"'+FI+'\" and \"'+FF+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaPagosXProv', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Prov = data.Prov;
    conn.query('select p.idPago, pr.Nombre, p.Fecha, p.Importe from pagos as p INNER JOIN compras as c on p.idCompra = c.idCompra INNER JOIN proveedores as pr on c.idProveedor = pr.idProveedor where pr.Nombre = \"'+Prov+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaPagosXForma', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Forma = data.Forma;
    conn.query('select p.idPago, pr.Nombre, p.Fecha, p.Importe from pagos as p INNER JOIN compras as c on p.idCompra = c.idCompra INNER JOIN proveedores as pr on c.idProveedor = pr.idProveedor where p.FormaPago = \"'+Forma+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

/*CONSULTAS COBROS*/
app.get('/ConsultaGCobros', function(req,res){
    conn.query('select c.idCobro, cl.Nombre, c.Fecha, c.Importe from cobros as c INNER JOIN ventas as v on c.idVenta = v.idVenta INNER JOIN clientes as cl on cl.idCliente = v.idCliente;', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaCobrosXPeriodo', function(req,res){
    console.log(req.body);
    const data = req.body;
    let FI = data.FI;
    let FF = data.FF;
    conn.query('select c.idCobro, cl.Nombre, c.Fecha, c.Importe from cobros as c INNER JOIN ventas as v on c.idVenta = v.idVenta INNER JOIN clientes as cl on cl.idCliente = v.idCliente where c.Fecha between \"'+FI+'\" and \"'+FF+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaCobrosXCliente', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Cte = data.Cte;
    conn.query('select c.idCobro, cl.Nombre, c.Fecha, c.Importe from cobros as c INNER JOIN ventas as v on c.idVenta = v.idVenta INNER JOIN clientes as cl on cl.idCliente = v.idCliente where cl.Nombre = \"'+Cte+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaCobrosXTipo', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Tipo = data.Tipo;
    conn.query('select c.idCobro, cl.Nombre, c.Fecha, c.Importe from cobros as c INNER JOIN ventas as v on c.idVenta = v.idVenta INNER JOIN clientes as cl on cl.idCliente = v.idCliente where c.TipoCobro = \"'+Tipo+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

/*CONSULTAS PEDIDOS CLIENTES*/
app.get('/ConsultaGPedidosCteG', function(req,res){
    conn.query('select p.idPedido, c.Nombre, p.Fecha, p.FechaEntrega, p.Estado, p.Total from pedidosclientes as p INNER JOIN clientes as c on p.idCliente = c.idCliente;', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaPedidosCteXCte', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Cte = data.Cte;
    conn.query('select p.idPedido, c.Nombre, p.Fecha, p.FechaEntrega, p.Estado, p.Total from pedidosclientes as p INNER JOIN clientes as c on p.idCliente = c.idCliente where c.Nombre = \"'+Cte+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaPedidosCteXPeriodo', function(req,res){
    console.log(req.body);
    const data = req.body;
    let FI = data.FI;
    let FF = data.FF;
    conn.query('select p.idPedido, c.Nombre, p.Fecha, p.FechaEntrega, p.Estado, p.Total from pedidosclientes as p INNER JOIN clientes as c on p.idCliente = c.idCliente where p.Fecha between \"'+FI+'\" and \"'+FF+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaPedidosCteXEstado', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Estado = data.Estado;
    conn.query('select p.idPedido, c.Nombre, p.Fecha, p.FechaEntrega, p.Estado, p.Total from pedidosclientes as p INNER JOIN clientes as c on p.idCliente = c.idCliente where p.Estado = \"'+Estado+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

/*CONSULTAS PEDIDOS PROVEEDORES*/
app.get('/ConsultaGPedidosProvG', function(req,res){
    conn.query('select p.idPedido, pr.Nombre, p.Fecha, p.FechaEntrega, p.Estado, p.Total from pedidosproveedores as p INNER JOIN proveedores as pr on pr.idProveedor = p.idProveedor;', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaPedidosProvXProv', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Prov = data.Prov;
    conn.query('select p.idPedido, pr.Nombre, p.Fecha, p.FechaEntrega, p.Estado, p.Total from pedidosproveedores as p INNER JOIN proveedores as pr on pr.idProveedor = p.idProveedor where pr.Nombre = \"'+Prov+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaPedidosProvXPeriodo', function(req,res){
    console.log(req.body);
    const data = req.body;
    let FI = data.FI;
    let FF = data.FF;
    conn.query('select p.idPedido, pr.Nombre, p.Fecha, p.FechaEntrega, p.Estado, p.Total from pedidosproveedores as p INNER JOIN proveedores as pr on pr.idProveedor = p.idProveedor where p.Fecha between \"'+FI+'\" and \"'+FF+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaPedidosProvXEstado', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Estado = data.Estado;
    conn.query('select p.idPedido, pr.Nombre, p.Fecha, p.FechaEntrega, p.Estado, p.Total from pedidosproveedores as p INNER JOIN proveedores as pr on pr.idProveedor = p.idProveedor where p.Estado = \"'+Estado+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

/*CONSULTAS CARGOS*/
app.get('/ConsultaGCargos', function(req,res){
    conn.query('select c.idCargo, cl.Nombre, c.Fecha, c.Concepto, c.Importe from cargos as c INNER JOIN ventas as v on c.idVenta = v.idVenta INNER JOIN clientes as cl on v.idCliente = cl.idCliente;', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaCargosXCte', function(req,res){
    console.log(req.body);
    const data = req.body;
    let Cte = data.Cte;
    conn.query('select c.idCargo, cl.Nombre, c.Fecha, c.Concepto, c.Importe from cargos as c INNER JOIN ventas as v on c.idVenta = v.idVenta INNER JOIN clientes as cl on v.idCliente = cl.idCliente where cl.Nombre = \"'+Cte+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.post('/ConsultaCargosXPeriodo', function(req,res){
    console.log(req.body);
    const data = req.body;
    let FI = data.FI;
    let FF = data.FF;
    conn.query('select c.idCargo, cl.Nombre, c.Fecha, c.Concepto, c.Importe from cargos as c INNER JOIN ventas as v on c.idVenta = v.idVenta INNER JOIN clientes as cl on v.idCliente = cl.idCliente where c.Fecha between \"'+FI+'\" and \"'+FF+'\";'
    , (err, rows) => {
        if (err) throw err;
        res.json(rows);
      });
})

app.get('/ip', (req, res) => {

    console.log(req.socket.remoteAddress); // Returns user IP
    res.send('Response complete');
  })


app.listen(3000, () => {
    console.log('Servidor iniciado');
})