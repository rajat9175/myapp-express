var express = require("express");
var mysql = require("mysql");
var app = new express();

var connection = mysql.createConnection({
    host:"172.18.5.104",
    user:"root",
    database:"myapp_db",
    password:"dac",
    port:9099

})
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json());

app.get("/categories",(request,response)=>{
    var queryText = `SELECT *FROM category`;
    connection.query(queryText,(err,result)=>{
        if(err == null)
        {
            response.send(JSON.stringify(result));
        }
        else 
        {

            response.send(JSON.stringify(err));
        }
    })
})
app.post("/products",(request,response)=>{
   
    var title = request.body.title;
    var description = request.body.description;
    var price = request.body.price;
    
    queryText = `INSERT INTO products (title,description,price) values ('${title}','${description}',${price})`;
    connection.query(queryText,(err,result)=>{
        if(err == null)
        {
            response.send(JSON.stringify(result));
        }
        else 
        {

            response.send(JSON.stringify(err));
        }
    })
})
app.get("/products",(request,response)=>{
    var queryText = `SELECT *FROM products`;
    connection.query(queryText,(err,result)=>{
        if(err == null)
        {
            response.send(JSON.stringify(result));
        }
        else 
        {

            response.send(JSON.stringify(err));
        }
    })
})
app.listen(9898,()=>{
    console.log("Server started at port 9898.....")
})
