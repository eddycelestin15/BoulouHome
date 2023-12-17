const axios = require("axios")
require("dotenv").config();

const developerId = process.env.DEVELOPER_ID
const email = process.env.DEVELOPER_MAIL
const deviceId = process.env.PLUG_ID
const url = "https://us-central1-boulou-functions-for-devs.cloudfunctions.net"
console.log(developerId, email, deviceId)



const getConsoMonthStart = async (startDate) => {
//startDate est la date de dernier relevee

    const period_value  = startDate.getFullYear() * 100 + (startDate.getMonth() + 1)
    console.log(period_value, 'ilay period value')

    try {       
        //get le tableau de la consommation mensuel
        const res = await axios.get(`
        ${url}/boulou_get_deviceStatistics?developerId=${developerId}&email=${email}&deviceId=${deviceId}&period_type=month&period_value=${period_value}`)
        // console.table(res.data.result)date
        const consoData = res.data.result
        let arrDates = Object.entries(consoData).map(([key, value]) => {
            let date = new Date(key.substring(0, 4), key.substring(4, 6) - 1, key.substring(6, 8));
            return {date, value};
           });           
        arrDates.forEach((item) => {
            if(item.date > startDate){
                console.log(item)
            }
        })
        // console.log(arrDates);

        let sum = arrDates.reduce((total, item) => {
            // > car la on commence a partir de la date apres le dernier date mentionne dans le releve
            if (item.date > startDate) {
              total += parseFloat(item.value);
            }
            return total;
           }, 0);
        return sum
    } catch (err) {
        console.error(err.message)
    }
}
const getConsoMonthEnd = async (endDate) => {
    const period_value  = endDate.getFullYear() * 100 + (endDate.getMonth() + 1)
    console.log(period_value, 'ilay period value')
    try {
        const res = await axios.get(`
        ${url}/boulou_get_deviceStatistics?developerId=${developerId}&email=${email}&deviceId=${deviceId}&period_type=month&period_value=${period_value}`)
        // console.table(res.data.result)date
        const consoData = res.data.result
        let arrDates = Object.entries(consoData).map(([key, value]) => {
            let date = new Date(key.substring(0, 4), key.substring(4, 6) - 1, key.substring(6, 8));
            return {date, value};
           });           
        arrDates.forEach((item) => {
            if(item.date <= endDate){
                console.log(item)
            }
        })

        let sum = arrDates.reduce((total, item) => {
            // > car la on commence a partir de la date apres le dernier date mentionne dans le releve
            if (item.date <= endDate) {
              total += parseFloat(item.value);
            }
            return total;
           }, 0);
        return sum

    } catch (err) {
        console.error(err.message)
    }
}

const startDate = new Date("2023-12-14");
const endDate = new Date("2024-1-14");

const calculer = async (start, end) => {
    const consoMoisPrec = await getConsoMonthStart(start)
    const consoMoisSuiv = await getConsoMonthEnd(end)
    const consommationTotal = consoMoisPrec + consoMoisSuiv
    console.log(consommationTotal, 'ilay consommation total')
}
calculer(startDate, endDate)



