const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send({
        sup: 'mawderpuckerrrrrrrrrrr'
    })
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('5000')
})