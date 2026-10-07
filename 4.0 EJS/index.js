import express from "express";

const app = express();
const port = 3000;

let advice;
const today = new Date();
const dayIndex = today.getDay();

if (dayIndex === 0 || dayIndex === 6) {
    advice = "Hey! It's the weekend,it's time to have fun!";
} else {
    advice = "Hey! It's a weekday,it's time to work hard!";
}


app.get("/", (req, res) => {
    res.render("index.ejs", 
        {day: `${advice}`}
    );
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`);
});