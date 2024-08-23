document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseTableBody = document.getElementById('expense-list');
    const totalBalanceSpan = document.getElementById('total-balance');
    const slider = document.getElementById('slider');
    const creditBox = document.getElementById('credit-box');
    const debitBox = document.getElementById('debit-box');

    let totalBalance = 0;
    let transactionType = 'credit'; // Default to credit

    expenseForm.addEventListener('submit', addTransaction);

    // Toggle between Credit and Debit
    creditBox.addEventListener('click', () => {
        if (transactionType !== 'credit') {
            transactionType = 'credit';
            slider.style.transform = 'translateX(0)';
            slider.style.backgroundColor = '#5cb85c'; // Green for credit
            creditBox.style.color = 'white';
            debitBox.style.color = 'black';
        }
    });

    debitBox.addEventListener('click', () => {
        if (transactionType !== 'debit') {
            transactionType = 'debit';
            slider.style.transform = 'translateX(100%)';
            slider.style.backgroundColor = '#d9534f'; // Red for debit
            creditBox.style.color = 'black';
            debitBox.style.color = 'white';
        }
    });

    function updateBalance(amount, type) {
        if (type === 'credit') {
            totalBalance += amount;
        } else if (type === 'debit') {
            totalBalance -= amount;
        }
        totalBalanceSpan.textContent = `₹${totalBalance.toFixed(2)}`;
    }

    function addTransaction(event) {
        event.preventDefault();

        const descriptionInput = document.getElementById('description');
        const amountInput = document.getElementById('amount');

        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);

        if (description && !isNaN(amount) && amount > 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${description}</td>
                <td>₹${amount.toFixed(2)}</td>
                <td>${transactionType}</td>
                <td><button class="delete" onclick="deleteTransaction(this, ${amount}, '${transactionType}')">Delete</button></td>
            `;

            expenseTableBody.appendChild(tr);

            updateBalance(amount, transactionType);

            descriptionInput.value = '';
            amountInput.value = '';
        } else {
            alert('Please enter a valid description and amount.');
        }
    }

    window.deleteTransaction = function(button, amount, type) {
        const tr = button.parentElement.parentElement;
        expenseTableBody.removeChild(tr);

        // Adjust the balance based on the type of transaction
        if (type === 'credit') {
            totalBalance -= amount;
        } else if (type === 'debit') {
            totalBalance += amount;
        }

        totalBalanceSpan.textContent = `₹${totalBalance.toFixed(2)}`;
    }
});
