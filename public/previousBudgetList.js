// console.log('Connected')
const spendingsList = document.getElementById('spendings-display');
const inputContainer = document.getElementById('input-container');

const displaySpendings = () => {
    axios.get('http://localhost:4000/api/getSpendings')
        .then((res) => {
            const spendings = res.data;

            spendingsList.innerHTML = ''; 

            spendings.forEach((spending) => {
          
                const inputRow = document.createElement('div');
                inputRow.classList.add('input-row'); 

                const incomeInput = document.createElement('input');
                incomeInput.type = 'text';
                incomeInput.value = spending.income;
                inputRow.appendChild(incomeInput);

                const optionInput = document.createElement('input');
                optionInput.type = 'text';
                optionInput.value = spending.selected_option;
                inputRow.appendChild(optionInput);

                const amountInput = document.createElement('input');
                amountInput.type = 'text';
                amountInput.value = spending.amount_money;
                inputRow.appendChild(amountInput);

                const dateInput = document.createElement('input');
                dateInput.type = 'text';
                dateInput.value = spending.date;
                inputRow.appendChild(dateInput);

                inputContainer.appendChild(inputRow);
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

displaySpendings()