const API_URL = "http://localhost:3000";

async function loadPatients() {
    try {
        const response = await fetch(API_URL + "/patients");

        if (!response.ok) {
            throw new Error("Could not load patients");
        }

        const patients = await response.json();

        const table = document.getElementById("patientTable");
        table.innerHTML = "";

        patients.forEach(patient => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.disease}</td>
                <td>
                    <button onclick="deletePatient(${patient.id})">
                        Delete
                    </button>
                </td>
            `;

            table.appendChild(row);
        });

    } catch (error) {
        console.error(error);
        alert("Could not connect to the backend.");
    }
}


async function addPatient() {

    const name = document.getElementById("patientName").value;
    const age = document.getElementById("patientAge").value;
    const disease = document.getElementById("patientDisease").value;

    if (!name || !age || !disease) {
        alert("Please fill in all fields.");
        return;
    }

    try {

        const response = await fetch(API_URL + "/patients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                age: age,
                disease: disease
            })
        });

        const result = await response.json();

        alert(result.message || "Patient added successfully!");

        document.getElementById("patientName").value = "";
        document.getElementById("patientAge").value = "";
        document.getElementById("patientDisease").value = "";

        loadPatients();

    } catch (error) {
        console.error(error);
        alert("Could not connect to the backend.");
    }
}


async function deletePatient(id) {

    try {

        const response = await fetch(API_URL + "/patients/" + id, {
            method: "DELETE"
        });

        const result = await response.json();

        alert(result.message || "Patient deleted!");

        loadPatients();

    } catch (error) {
        console.error(error);
        alert("Could not connect to the backend.");
    }
}


loadPatients();