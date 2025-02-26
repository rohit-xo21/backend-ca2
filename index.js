const express = require("express");

const app = express();

app.use(express.json());

const users = [
    { email: "alice@example.com", password: "alice123" },
    { email: "bob@example.com", password: "bob123" },
    { email: "charlie@example.com", password: "chalie123" }
]


app.get('/', (req,res)=> {
    res.send("Hello World")
})


app.put('/user', (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields required"});
        }

        const user = users.find(u => u.email == email);


        if(!user){
            return res.status(404).json({message: "Email not found"})
        }

        if(user){
            let i = users.findIndex(user);
            users[i] = {email: email, password: password};
            return res.status(200).json({message: "User updated", data: users});
        }

    } catch(err) {
        res.status(500).json({message: "Internal Server error"});
    }
})

app.delete('/user', (req,res) => {
    try {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({message: "Email required"});
        }

        const user = users.find(u => u.email == email);

        if(!user){
            return res.status(404).json({message: "Email not found"});
        }

        let i = users.findIndex(user);
        users.splice(i,1);
        res.status(200).json({message: "User deleted successfully"});
    } catch(err) {
        res.status(500).json({message: "Internal Server error"});
    }
})




app.listen(5000, () => {
    try{
        console.log("Server running on http://localhost:5000");
    } catch(err) {
        console.log(err);
    }
})