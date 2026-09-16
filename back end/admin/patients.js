const API = "http://localhost:3000";

async function loadPatients() {
    const response = await fetch(`${API}/patients`);
    const patients = await response.json();

    const list = document.getElementById("patientList");

    list.innerHTML = "";

    patients.forEach(patient => {
        list.innerHTML += `
            <div>
                <strong>${patient.name}</strong>
                - Age: ${patient.age}
                - Disease: ${patient.disease}
                <button onclick="deletePatient(${patient.id})">
                    Delete
                </button>
            </div>
            <hr>
        `;
    });
}

async function addPatient() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const disease = document.getElementById("disease").value;

    await fetch(`${API}/patients`, {
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

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("disease").value = "";

    loadPatients();
}

async function deletePatient(id) {
    await fetch(`${API}/patients/${id}`, {
        method: "DELETE"
    });

    loadPatients();
}

loadPatients();