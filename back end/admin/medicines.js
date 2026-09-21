const API = "http://localhost:3000";


// LOAD MEDICINES


function loadMedicines() {

    fetch(API + "/api/medicines")
        .then(response => response.json())
        .then(medicines => {

            const table = document.getElementById("medicineTable");

            table.innerHTML = "";

            medicines.forEach(medicine => {

                table.innerHTML += `
                    <tr>
                        <td>${medicine.id}</td>
                        <td>${medicine.name}</td>
                        <td>${medicine.quantity}</td>
                        <td>${medicine.price}</td>
                        <td>
                            <button onclick="deleteMedicine(${medicine.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

            });

        })
        .catch(error => {
            console.error("Error loading medicines:", error);
        });
}

// ADD MEDICINE
document
    .getElementById("medicineForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const medicine = {

            name: document.getElementById("name").value,

            quantity: document.getElementById("quantity").value,

            price: document.getElementById("price").value

        };

        fetch(API + "/api/medicines", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(medicine)

        })
        .then(response => response.json())
        .then(() => {

            document
                .getElementById("medicineForm")
                .reset();

            loadMedicines();

        })
        .catch(error => {
            console.error("Error adding medicine:", error);
        });

    });



// DELETE MEDICINE


function deleteMedicine(id) {

    fetch(API + "/api/medicines/" + id, {

        method: "DELETE"

    })
    .then(response => response.json())
    .then(() => {

        loadMedicines();

    })
    .catch(error => {
        console.error("Error deleting medicine:", error);
    });

}



// START


loadMedicines();