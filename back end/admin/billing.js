const API = "http://localhost:3000";

// ===============================
// LOAD BILLS
// ===============================

function loadBills() {

    fetch(API + "/billing")
        .then(response => response.json())
        .then(bills => {

            const table =
                document.getElementById("billingTable");

            table.innerHTML = "";

            bills.forEach(bill => {

                table.innerHTML += `
                    <tr>
                        <td>${bill.id}</td>
                        <td>${bill.patient}</td>
                        <td>${bill.amount}</td>
                        <td>${bill.status}</td>
                        <td>
                            <button onclick="deleteBill(${bill.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

            });

        })
        .catch(error => {
            console.error("Error loading bills:", error);
        });

}


// ===============================
// ADD BILL
// ===============================

document
    .getElementById("billingForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const bill = {

            patient:
                document.getElementById("patient").value,

            amount:
                document.getElementById("amount").value,

            status:
                document.getElementById("status").value

        };

        fetch(API + "/billing", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bill)

        })
        .then(response => response.json())
        .then(() => {

            document
                .getElementById("billingForm")
                .reset();

            loadBills();

        })
        .catch(error => {
            console.error("Error adding bill:", error);
        });

    });


// ===============================
// DELETE BILL
// ===============================

function deleteBill(id) {

    fetch(API + "/billing/" + id, {

        method: "DELETE"

    })
    .then(response => response.json())
    .then(() => {

        loadBills();

    })
    .catch(error => {
        console.error("Error deleting bill:", error);
    });

}


// ===============================
// START
// ===============================

loadBills();
