// console.log('Connected')
const spendingsList = document.getElementById('spendings-display');
const inputContainer = document.getElementById('input-container');

const deleteSpendings=(id)=>{
    axios.delete(`http://localhost:4000/api/deleteSpendings/${id}`)
          .then((res)=>{
            inputContainer.innerHTML=""
            res.data.forEach(displaySpendings)
            window.location.reload();
          })
          
}
const updateSpendings=(id,amountInput,optionInput,dateInput,incomeInput)=>{
    let body={
        income:incomeInput.value,
        amount_money:amountInput.value,
        date:dateInput.value,
        selected_option:optionInput.value
    }
    axios.put(`http://localhost:4000/api/updateSpendings/${id}`,body)
          .then((res)=>{
            console.log(res.data)
            window.alert('Successfully updated!')
          })
}



const displaySpendings = () => {
    axios.get('http://localhost:4000/api/getSpendings')
        .then((res) => {
            const spendings = res.data;

            spendingsList.innerHTML = ''; 
            if (spendings.length === 0) {
                const noDataMessage = document.createElement('p');
                noDataMessage.textContent = 'There are no added spendings.';
                spendingsList.appendChild(noDataMessage);
            }else{
            spendings.forEach((spending) => {
          
                const inputRow = document.createElement('div');
                inputRow.classList.add('input-row'); 

                const incomeInput = document.createElement('input');
                incomeInput.type = 'text';
                incomeInput.value = spending.income;
                const incomeText=document.createElement('span')
                incomeText.textContent="Income:"
                inputRow.appendChild(incomeText)
                inputRow.appendChild(incomeInput);

                const optionInput = document.createElement('input');
                optionInput.type = 'text';
                optionInput.value = spending.selected_option;
                const optionText=document.createElement('span')
                optionText.textContent="Option:"
                inputRow.appendChild(optionText)
                inputRow.appendChild(optionInput);

                const amountInput = document.createElement('input');
                amountInput.type = 'text';
                amountInput.value = spending.amount_money;
                const moneyText=document.createElement('span')
                moneyText.textContent="Dollars:"
                inputRow.appendChild(moneyText)
                inputRow.appendChild(amountInput);


                const deleteBtn=document.createElement('img')
                deleteBtn.addEventListener('click', ()=>deleteSpendings(spending.id))
                const updateBtn=document.createElement('img')
                updateBtn.addEventListener('click',()=>updateSpendings(spending.id,amountInput,optionInput,dateInput,incomeInput))
                const dateInput = document.createElement('input');
                dateInput.type = 'text';
                dateInput.value =spending.date;
                const dateText=document.createElement('span')
                dateText.textContent="Date:"
                deleteBtn.src='../img/delete.png'
                updateBtn.src='../img/update.png'

                inputRow.appendChild(dateText)
                inputRow.appendChild(dateInput);
                inputRow.appendChild(deleteBtn)
                inputRow.appendChild(updateBtn)

                inputContainer.appendChild(inputRow);
            })
        }
                
        })
    
        .catch((error) => {
            console.log(error);
        });
    }



displaySpendings()