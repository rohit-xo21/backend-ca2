const express = require("express");

const app = express();
app.use(express.json());

const users = [
    { email: "alice@example.com", password: "alice123" },
    { email: "bob@example.com", password: "bob123" },
    { email: "charlie@example.com", password: "chalie123" }
];

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.put('/user', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const i = users.findIndex(u => u.email === email);
        if (i === -1) {
            return res.status(404).json({ message: "Email not found" });
        }

        users[i] = { email, password };
        return res.status(200).json({ message: "User updated", data: users });
    } catch (err) {
        res.status(500).json({ message: "Internal Server error" });
    }
});

app.delete('/user', (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email required" });
        }

        const i = users.findIndex(u => u.email === email);
        if (i === -1) {
            return res.status(404).json({ message: "Email not found" });
        }

        users.splice(i, 1);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server error" });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
