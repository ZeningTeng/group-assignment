require("dotenv").config({ path: ".env" });
const app = require("./src/app");

const PORT = process.env.PORT;

app.listen(PORT, () => {});
