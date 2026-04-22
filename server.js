const express = require("express");
const db=require("./db")
const app = express();

app.use(express.json());

//Api for products

app.get("/products",(req,res)=>{
  const query="select*from products"
  db.execute(query,(err,results)=>{
   if(err)
    return res.status(500).json({error:err.message})
    res.json(results)
  })
})

app.post("/products",(req,res)=>{
  const {ProductName, Price, StockQuantity, SupplierID}=req.body
  const query=`insert into products (ProductName, Price, StockQuantity, SupplierID)values(?,?,?,?)`
  db.execute(query,[ProductName, Price, StockQuantity, SupplierID],(err,results)=>{
      if(err)return res.status(500).json(({error:err.message}))
        res.json({message:"product add successfully",id:results.insertId})
    })
})
app.patch("/products/:id",(req,res)=>{
  const {id}=req.params
  const {ProductName, Price, StockQuantity, SupplierID}=req.body
  const query=`update products set productName=?,price=?,StockQuantity=? where productID=?`
  db.execute(query,[ProductName, Price, StockQuantity,id],(err,results)=>{
  if(err)return res.status(500).json(({error:err.message}))
        res.json({message:"product update successfully"})
    })


})

app.delete("/products/:id",(req,res)=>{
  const {id}=req.params
  const query=`delete from products where productID=?`
  db.execute(query,[id],(err,results)=>{
  if(err)return res.status(500).json(({error:err.message}))
        res.json({message:"product deleted successfully"})
    })

})

// suppliers Api
app.get("/suppliers",(req,res)=>{
   const query="select*from suppliers"
  db.execute(query,(err,results)=>{
   if(err)
    return res.status(500).json({error:err.message})
    res.json(results)
  })
})

app.post("/suppliers",(req,res)=>{
  const {SupplierName,ContactNumber}=req.body
  const query=`insert into suppliers (SupplierName,ContactNumber)values(?,?)`
  db.execute(query,[SupplierName,ContactNumber],(err,results)=>{
      if(err)return res.status(500).json(({error:err.message}))
        res.json({message:"supplier add successfully",id:results.insertId})
    })
})

//sales Api
app.post("/sales",(req,res)=>{
  const {ProductID,QuantitySold,SaleDate}=req.body
  const query=`insert into sales (ProductID,QuantitySold,SaleDate)values(?,?,?)`
  db.execute(query,[ProductID,QuantitySold,SaleDate],(err,results)=>{
      if(err)return res.status(500).json(({error:err.message}))
        res.json({message:"sales recorded successfully",saleId:results.insertId})
    })
})

app.get("/sales-report",(req,res)=>{
   const query="select sales.SaleID,products.ProductName,sales.QuantitySold,sales.SaleDate from sales join products on sales.ProductID=products.ProductID"
  db.execute(query,(err,results)=>{
   if(err)
    return res.status(500).json({error:err.message})
    res.json(results)
  })
})

app.delete("/sales/:id",(req,res)=>{
  const {id}=req.params
  const query=`delete from sales where SaleID=?`
  db.execute(query,[id],(err,results)=>{
  if(err)return res.status(500).json(({error:err.message}))
        res.json({message:"sale recorded deleted"})
    })

})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});