console.log('Connected to planBudget')
let global = 1
const addMoreSpendingsButton = document.getElementById('addMoreSpendings');
const enterIncome = document.getElementById('income-input');
const date = document.getElementById('date');
const form = document.getElementById('spending-form');
const optionsDiv=document.getElementById('add-spending=0')

const addSpendingEntry = () => {
   const spendingEntry = document.createElement('div')
   spendingEntry.setAttribute ('class','spending-entry')
     spendingEntry.innerHTML = `
    <select name="spendingTypes" id="spendings=${global}" style=" margin-right: 10px;">
        <option  value="none" selected disabled hidden>Select an Option</option>
        <option  value="Housing">Housing</option>
        <option  value="Utility">Utility</option>
        <option  value="Entertainment">Entertainment</option>
        <option  value="Food">Food</option>
        <option  value="Savings">Savings</option>
        <option  value="Others">Others</option>
    </select><input type="text" id="enter-money=${global}" class="money1" placeholder="Enter amount of money in dollars" style="padding-left: 10px;"  >  <button id="add-spending=${global}" class="btn"> Add</button> <br>`
    const spendingForm = document.querySelector('.options');
    spendingForm.appendChild(spendingEntry);
    const addBtn=document.getElementById(`add-spending=${global}`)
    addBtn.addEventListener('click',addSpendings)
    global++
};
function calculateTotalSpending() {
    const amountMoneyInputs = document.querySelectorAll('.money1');
    let totalSpending = 0;

    amountMoneyInputs.forEach((input) => {
        const amount = parseFloat(input.value);
        if (!isNaN(amount)) {
            totalSpending += amount;
            console.log(totalSpending)
        }
    });

    return totalSpending;
}

const addSpendings = (e) => {
    console.log(e.target.id.split('=')[1])
    const eventId=e.target.id.split('=')[1]
    const options = document.getElementById(`spendings=${eventId}`)
    const amountMoney=document.getElementById(`enter-money=${eventId}`)
    const totalSpending = calculateTotalSpending();
    if (totalSpending > parseFloat(enterIncome.value)) {
        window.alert('The sum of spendings exceeds your income. Please adjust your spending.');
        return;
    }else{
    let newSpending = {
        income: enterIncome.value,
        selected_option: options.value,
        amount_money: amountMoney.value,
        date: date.value,
    };

    console.log(newSpending);

    axios
        .post('http://localhost:4000/api/addSpendings', newSpending)
        .then((res) => {
            console.log(res.data);
            window.alert('Your savings have been added successfully!');
        })
    
        .catch((error) => {
            console.log(error);
        });
    }
};



addMoreSpendingsButton.addEventListener('click', addSpendingEntry);
optionsDiv.addEventListener('click',addSpendings)

