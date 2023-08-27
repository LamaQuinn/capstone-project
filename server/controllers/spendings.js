const db = require('../database')
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
    },
    deleteSpendings:(req,res)=>{
        let{id}=req.params
        db.query(`DELETE FROM spendings WHERE id=${id};
        SELECT *FROM spendings;
        `)
        .then((dbRes)=>{
            res.status(200).send(dbRes[0])
        })
    },
    updateSpendings:(req,res)=>{
    const { id } = req.params;
    const { income, selected_option, amount_money, date } = req.body;
    db.query(`
    UPDATE spendings
    SET income='${income}',
        selected_option='${selected_option}',
        amount_money='${amount_money}',
        date='${date}'
    WHERE id=${id}
    RETURNING *;
`)
    .then((dbRes)=>{
        res.status(200).send(dbRes[0])
    })
    }
}