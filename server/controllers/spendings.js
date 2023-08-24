const db = require('../database')
//   CREATE TABLE spendings(
//     id SERIAL PRIMARY KEY,
//     income INT,
//     selected_option VARCHAR(255),
//     amount_money INT,
//     date DATE
//  )
module.exports = {
    addSpendings:(req,res)=>{
        const {income,selected_option,amount_money,date}=req.body
        if (income === undefined || income === "" || 
            date === undefined || date === "" || 
            selected_option === undefined || selected_option === "" || 
            amount_money === undefined || amount_money === "") {
            return res.status(400).send('Invalid input');
        }
        console.log(req.body)
        db.query(`
         INSERT INTO spendings(income,selected_option,amount_money,date)
         VALUES(
            '${income}',
            '${selected_option}',
            '${amount_money}',
            '${date}'
         )
         RETURNING *;   
        `)
        .then((dbRes)=>{
            res.status(200).send(dbRes[0])
        })
    },
    getSpendings:(req,res)=>{
        db.query(`
        SELECT *FROM spendings
        ORDER BY date ASC;
        `)
        .then((dbRes)=>{
            res.status(200).send(dbRes[0])
        })
    }
}