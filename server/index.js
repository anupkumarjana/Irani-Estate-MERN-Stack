import express from "express";

const app = express();

app.get("/",(req, res)=>{
    res.send(`<h1>Hi this is server</h1>`)
})


const port = 8000;
app.listen(port, () => {
  console.log("The server is running on 8000");
});
