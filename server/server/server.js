import app from "./app.js";
import dotenv from "dotenv";
import cleanup from "./cleanup.js";

dotenv.config();
const port = process.env.PORT;

app.listen(port, ()=>{
    cleanup();
    console.log(`\x1b[36mServer started on port \x1b[35m${port}`,"\x1b[0m")
})
