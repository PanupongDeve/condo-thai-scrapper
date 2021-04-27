const { app } = require("./application/http/app");


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server Listen PORT: ', PORT);
});
