const db = require('./database')

const seed = () =>{
    db.query (`
    CREATE TABLE spendings(
        id SERIAL PRIMARY KEY,
        income INT,
        selected_option VARCHAR(255),
        amount_money INT,
        date DATE
    )
    `)
    .then(()=>{
        console.log('Seeded')
    })
}
module.exports=seed