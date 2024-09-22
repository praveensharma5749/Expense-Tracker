const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

// Clear expenses from local storage and UI
const clearExpenses = () => {
    localStorage.removeItem('expenses');
    expenseList.innerHTML = '';
};

// Load expenses from local storage
const loadExpenses = () => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <span style="margin-left:50px;">${expense.description} - ${expense.amount} (${expense.category})</span>
            <button onclick="editExpense(${index})" style="margin:10px;" class="btn btn-primary">Edit</button>
            <button onclick="deleteExpense(${index})" class="btn btn-danger">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
    });
};

// Add expense to local storage
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const expenseAmount = document.getElementById('expenseAmount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ amount: expenseAmount, description, category });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    expenseForm.reset();
    loadExpenses();
});

// Delete expense from local storage
const deleteExpense = (index) => {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
};

// Edit expense
const editExpense = (index) => {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    const expense = expenses[index];
    document.getElementById('expenseAmount').value = expense.amount;
    document.getElementById('description').value = expense.description;
    document.getElementById('category').value = expense.category;

    // Remove the expense so it can be updated
    deleteExpense(index);
};

// Clear expenses on page load
clearExpenses();

// Initial load
loadExpenses();
