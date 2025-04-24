"use strict";
const errorMesgEl = document.querySelector(".error_message");
const budgetInputEl = document.querySelector(".budget_input");
const expenseDesEl = document.querySelector(".expenses_input");
const expenseAmountEl = document.querySelector(".expenses_amount");
const tblRecordEl = document.querySelector(".tbl_data");
const constContainer = document.querySelector(".cards");

// cards content
const budgetCardEl = document.querySelector(".budget_card");
const expensescardEl = document.querySelector(".expenses_card");
const balanceCardEl = document.querySelector(".balance_card");

let itemList = [];
let itemId = 0;

// budget function
function budgetFun() {
    const budgetValue = budgetInputEl.value;
    errorMessage("Please Enter Your Budget or More Than 0");
    if (budgetValue === "" || budgetValue < 0) {
        // Fixed: no need for else block here, handled by early return
    } else {
        budgetCardEl.textContent = budgetValue;
        budgetInputEl.value = "";
        showBalance();
    }
}

// Show Balance
function showBalance() {
    const Expenses = totalExpenses();
    expensescardEl.textContent = Expenses;
    const total = parseInt(budgetCardEl.textContent) - Expenses;
    balanceCardEl.textContent = total;
}

// Total expenses function
function totalExpenses() {
    let total = 0;

    if (itemList.length > 0) {
        total = itemList.reduce(function (acc, curr) {
            acc += curr.amount;
            return acc;
        }, 0);
    }
    expensescardEl.textContent = total;
    return total;
}

// Error message function
function errorMessage(message) {
    errorMesgEl.innerHTML = `<p>${message}</p>`; // Fixed string interpolation
    errorMesgEl.classList.add("error");
    setTimeout(() => {
        errorMesgEl.classList.remove("error");
    }, 2500);
}

// Button events
function btnEvents() {
    const btnBudgetCal = document.querySelector("#btn_budget"); // Corrected ID here
    const btnExpensesCal = document.querySelector("#btn_exp");  // Correct ID here

    // Budget event
    btnBudgetCal.addEventListener("click", (e) => {
        e.preventDefault();
        budgetFun();
    });

    // Expenses event
    btnExpensesCal.addEventListener("click", (e) => {
        e.preventDefault();
        expensesFun();
    });
}

// Calling button events......................
document.addEventListener("DOMContentLoaded", btnEvents);

// expenses function......................
function expensesFun() {
    let expensesDescValue = expenseDesEl.value;
    let expenseAmountValue = expenseAmountEl.value;

    if (
        expensesDescValue === "" ||  // Corrected = to ===
        expenseAmountValue === "" || // Corrected = to ===
        budgetInputEl.value <= 0     // Corrected condition to check input value
    ) {
        errorMessage("Please Enter Expenses Desc or Expenses Amount!");
    } else {
        let amount = parseInt(expenseAmountValue);

        expenseAmountEl.value = "";
        expenseDesEl.value = "";
        // store the value inside the object 
        let expenses = {
            id: itemId,
            tittle: expensesDescValue,
            amount: amount,
        };
        itemId++;
        itemList.push(expenses);
        // add expenses inside the  html page
        addExpenses(expenses);
        showBalance();
    }
}

// add expenses.........................
function addExpenses(expensesPara) {
    const html = `
        <ul class="tbl_tr_content">
            <li data-id=${expensesPara.id}>${expensesPara.id}</li>
            <li>${expensesPara.tittle}</li>
            <li><span>$</span>${expensesPara.amount}</li>
            <li>
                <button type="button" class="btn_edit">Edit</button>
                <button type="button" class="btn_delete">Delete</button>
            </li>
        </ul>`;

    tblRecordEl.insertAdjacentHTML("beforeend", html);

    // edit //////////////////////////////////
    const btnEdit = document.querySelectorAll('.btn_edit');
    const btnDel = document.querySelectorAll('.btn_delete');
    const content_id = document.querySelectorAll('.tbl_tr_content');

    // btn edit events
    btnEdit.forEach((btnedit) => {
        btnedit.addEventListener("click", (el) => {
            let id;

            content_id.forEach((ids) => {
                id = ids.firstElementChild.dataset.id;
            });
            let element = el.target.parentElement.parentElement;
            element.remove();

            let expenses = itemList.filter(function (item) {
                return item.id == id;
            });
            expenseDesEl.value = expenses[0].tittle; // Fixed assignment
            expenseAmountEl.value = expenses[0].amount; // Fixed assignment

            let temp_list = itemList.filter(function (item) {
                return item.id != id;
            });
            itemList = temp_list;
        });
    });

    // btn delete//////////////////////////////////////////
    btnDel.forEach((btnedit) => {
        btnedit.addEventListener("click", (el) => {
            let id;

            content_id.forEach((ids) => {
                id = ids.firstElementChild.dataset.id;
            });
            let element = el.target.parentElement.parentElement;
            element.remove();

            let temp_list = itemList.filter(function (item) {
                return item.id != id;
            });
            itemList = temp_list;
            showBalance();
        });
    });
}

// add expense to table......................
function addExpenseToTable(desc, amount) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${desc}</td>
        <td>${amount}</td>
    `;
    tblRecordEl.appendChild(row);
}
