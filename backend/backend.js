const express = require("express");
const cors = require("cors");
const pg = require("pg");
const path = require("path");

const connectionString = "postgres://pwcjnnph:MdIYAe71hmtX0BUp3HXy2_59BN_XqLVh@john.db.elephantsql.com/pwcjnnph";

const client = new pg.Client(connectionString);

client.connect((err)=>{
    if(err)
    {
        console.log("error connecting database");
    }else console.log("database connected");})


const app = express();
const port = 8000;




app.use(cors());
app.use(express.json());

app.get("/", (req, res)=> {
    client.query("SELECT * FROM users", (err, databaseRes)=> {
        if(err)
        {
            console.log("somethings wrong with query i guess");
            res.status(500).send("error in query or database");
        }
        else{
            res.send(databaseRes.rows);
        }
    })
})

app.post("/adddata", (req, res)=> {
    const secretKey = req.body.secretKey;
    if(Number(secretKey)===1234){
        const newUser = req.body.newUser;
        client.query(`INSERT INTO users (name, email) values ('${newUser.name}', '${newUser.email}')`, (err2, databaseRes2) => {
            if(err2)
            {
                console.log("error during insert query")
                res.status(500).send("error in insert query or database");
            }else{
                client.query("SELECT * FROM users", (err, databaseRes)=> {
                    if(err)
                    {
                        console.log("somethings wrong with query i guess");
                        res.status(500).send("error in query or database");
                    }
                    else{
                        res.send(databaseRes.rows);
                    }
                })
            }
        })
    }else{
        res.status(400).send("user not created");
    }
})

app.listen(port, ()=>{
    console.log(`server started at port ${port}..`);
});


// let data = [
//     {name: "alex", email: "alex@a"},
//     {name: "brat", email: "brat@a"},
//     {name: "car", email: "car@a"},
//     {name: "dummy", email: "dummy@a"},
//     {name: "eliza", email: "eliza@a"},
//     {name: "franky", email: "franky@a"},
//     {name: "gray", email: "gray@a"},
//     {name: "hitler", email: "hitler@a"},
// ]