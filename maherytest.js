const express = require('express');
const app = express();

const { calculer } = require("./getConso");
app.get("/getConso", async (req, res) => {
    console.log('mande ny clg')
    try {
        const {startDate, endDate } = req.query
        const startD = new Date(startDate)
        const endD = new Date(endDate)
        console.log(startD, endD)
        const conso = await calculer(startD, endD)
        res.json({conso: conso})
    } catch (err) {
        console.error(err.message)
    }
});
app.listen(3000, () => console.log('server running'))
