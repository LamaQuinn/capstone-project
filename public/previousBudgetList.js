
            const spendingsList = document.getElementById('spendings-display');
            const inputContainer = document.getElementById('input-container');
            const chartContainer = document.getElementById('chart-container');
      

            // Mapping of month names to their numeric representations
            const monthNameToNumber = {
                'January': '01',
                'February': '02',
                'March': '03',
                'April': '04',
                'May': '05',
                'June': '06',
                'July': '07',
                'August': '08',
                'September': '09',
                'October': '10',
                'November': '11',
                'December': '12'
            };
            
            function calculateTotalSpending1() {
                const amountInputs = document.querySelectorAll('.input-row input[name="amount_money"]');
                let totalSpending = 0;
            
                amountInputs.forEach((input) => {
                    const value = parseFloat(input.value);
                    if (!isNaN(value)) {
                        totalSpending += value;
                        console.log(totalSpending)
                    }
                });
            
                return totalSpending;
            }
            
            const deleteSpendings = (id) => {
                axios.delete(`http://localhost:4000/api/deleteSpendings/${id}`)
                    .then((res) => {
                        inputContainer.innerHTML = '';
                        res.data.forEach(displaySpendings);
                        window.location.reload();
                    });
            }
            
            const updateSpendings = (id, amountInput, optionInput, dateInput, incomeInput) => {
                let body = {
                    income: incomeInput.value,
                    amount_money: amountInput.value,
                    date: dateInput.value,
                    selected_option: optionInput.value
                };
                axios.put(`http://localhost:4000/api/updateSpendings/${id}`, body)
                    .then((res) => {
                        console.log(res.data);
                        const totalSpending1 = calculateTotalSpending1();
            
                        // Check if the total spending exceeds income
                        if (totalSpending1 > parseFloat(incomeInput.value)) {
                            console.log(totalSpending1)
                            window.alert('The sum of spendings exceeds your income. Please adjust your spending.');
                            return;
                        }else{
            
                        window.alert('Successfully updated!');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                    
            }
            
            function extractUniqueMonthNames(spendings) {
                const uniqueMonthNames = new Set();
                const monthNames = [
                    'January', 'February', 'March', 'April',
                    'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'
                ];
            
                spendings.forEach((spending) => {
                    const dateParts = spending.date.split('-');
                    const month = parseInt(dateParts[1], 10);
                    if (!isNaN(month) && month >= 1 && month <= 12) {
                        uniqueMonthNames.add(monthNames[month - 1]);
                    }
                });
            
                return Array.from(uniqueMonthNames);
            }
            
            // Create a Function to Generate the Month Select Element
            function generateMonthSelect(uniqueMonths) {
                const select = document.createElement('select');
                select.id = 'month-select';
                select.name = 'months';
                select.innerHTML = '<option value="">Select a Month</option>';
            
                uniqueMonths.forEach((month) => {
                    const option = document.createElement('option');
                    option.value = month;
                    option.textContent = month;
                    select.appendChild(option);
                });
            
                return select;
            }
            
            function createInputRow(spending,boolean) {
                const inputRow = document.createElement('div');
                inputRow.classList.add('input-row');
            
                function createInputElement(type, value) {
                    const input = document.createElement('input');
                    input.type = type;
                    input.value = value;
                    return input;
                }
            
                // Create income elements
                const incomeText = document.createElement('span');
                incomeText.textContent = "Income:";
                const incomeInput = createInputElement('text', spending.income);
                inputRow.appendChild(incomeText);
                inputRow.appendChild(incomeInput);
            
                // Create option elements
                const optionText = document.createElement('span');
                optionText.textContent = "Option:";
                const optionInput = createInputElement('text', spending.selected_option);
                inputRow.appendChild(optionText);
                inputRow.appendChild(optionInput);
            
                // Create amount elements
                const moneyText = document.createElement('span');
                moneyText.textContent = "Dollars:";
                
                const amountInput = createInputElement('text', spending.amount_money);
                amountInput.name = 'amount_money';
                inputRow.appendChild(moneyText);
                inputRow.appendChild(amountInput);
            
                // Create date elements
                const dateText = document.createElement('span');
                dateText.textContent = "Date:";
                const dateInput = createInputElement('text', spending.date);
                inputRow.appendChild(dateText);
                inputRow.appendChild(dateInput);
            
                // Create delete button
                const deleteBtn = document.createElement('img');
                deleteBtn.addEventListener('click', () => deleteSpendings(spending.id));
                deleteBtn.src = '../img/delete.png';
                inputRow.appendChild(deleteBtn);
            
                // Create update button
                if(boolean===true){
                const updateBtn = document.createElement('img');
                updateBtn.addEventListener('click', () => updateSpendings(spending.id, amountInput, optionInput, dateInput, incomeInput));
                updateBtn.src = '../img/update.png';
                inputRow.appendChild(updateBtn);
                }
                return inputRow;
            }  
     

function displaySpendingsForMonth(spendings, selectedMonth) {
    inputContainer.innerHTML = ''; // Clear previous content
    
    if (selectedMonth === '') {
        chartContainer.style.display = 'block'; // Display the chart
        // Display all spendings
        spendings.forEach((spending) => {
            const inputRow = createInputRow(spending,false);
            inputContainer.appendChild(inputRow);
        });

    } else {
        chartContainer.style.display = 'block';

        // Filter and display spendings for the selected month
        const filteredSpendings = spendings.filter((spending) => {
            const dateParts = spending.date.split('-');
            const month = dateParts[1];
            return month === monthNameToNumber[selectedMonth];
        });

        filteredSpendings.forEach((spending) => {
            const dateParts = spending.date.split('-');
            const month = dateParts[1];
            if (month === monthNameToNumber[selectedMonth]) {
                const inputRow = createInputRow(spending,true);
                inputContainer.appendChild(inputRow);
            }
        });

        // Update the chart with the filtered spendings
        displayChart(filteredSpendings, selectedMonth);
    }
}

function displaySpendings() {
    axios.get('http://localhost:4000/api/getSpendings')
        .then((res) => {
            const spendings = res.data;
            const uniqueMonths = extractUniqueMonthNames(spendings);
            const monthSelect = generateMonthSelect(uniqueMonths);
            const container = document.getElementById('month-select-container');
            container.innerHTML = ''; // Clear previous content
            container.appendChild(monthSelect);

            // Call the function to display spendings for the selected month
            const selectedMonth = monthSelect.value;
            displaySpendingsForMonth(spendings, selectedMonth);

            monthSelect.addEventListener('change', () => {
                const selectedMonth = monthSelect.value;

                // Call the function to display spendings for the selected month
                displaySpendingsForMonth(spendings, selectedMonth);
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

// Define a variable to store the reference to the chart
let spendingChart = null;

function displayChart(spendings, selectedMonth, income) {
    
    const ctx = document.getElementById('spending-chart').getContext('2d');

    // Filter the spendings data for the selected month
    const filteredSpendings = spendings.filter((spending) => {
        const dateParts = spending.date.split('-');
        const month = dateParts[1];

        return month === monthNameToNumber[selectedMonth];
    });

    // Extract labels (dates) and data (spending amounts) for the chart
    const labels = filteredSpendings.map((spending) => spending.date);
    const data = filteredSpendings.map((spending) => parseFloat(spending.amount_money));
    const income1=filteredSpendings.map((spending)=>spending.income)[0];
    console.log(income1)

    // Clear the previous chart if it exists
    if (spendingChart) {
        spendingChart.destroy();
    }

    // Create the new chart
    spendingChart = new Chart(ctx, {
        type: 'bar',
       
        data: {
            labels: labels,
            datasets: [{
                label: 'Spending Amount ($)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            
            scales: {
                yAxes: [{
                   
                    ticks:
                    {
                beginAtZero: true,
                max:income1,
                    },
                   
                    title: {
                        display: true,
                        text: 'Spending Amount ($)'
                    }
                }],
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}
 
displaySpendings()
