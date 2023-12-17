const { calculer } = require("./getConso");

const startDate = new Date("2023-12-14");
const endDate = new Date("2024-1-14");
calculer(startDate, endDate)

app.get("/getConso?dateDebut=", async (req, res) => {
    try {
        const { startDate, endDate } = req.query;dateFin
        const conso = await calculer(startDate, endDate)
        res.json({conso: conso})
    } catch (err) {
        console.error(err.message)
    }
});

