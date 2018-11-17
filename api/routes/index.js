const express = require('express');
const app = express();

app.use( require("./company") );
app.use( require("./employee") );
app.use( require("./login") );
app.use( require("./order") );
app.use( require("./orderItem") );
app.use( require("./warehouse") );
app.use( require("./user") );
app.use( require("./product") );

module.exports = app ;