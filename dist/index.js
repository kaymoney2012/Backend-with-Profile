import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
const PORT = 4002;
connectDB();
app.listen(PORT, () => {
    console.log(`sever is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map