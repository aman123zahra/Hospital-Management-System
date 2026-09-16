const API = "http://localhost:3000";

async function loadDoctors() {
    const response = await fetch(`${API}/doctors`);
    const doctors = await response.json();

    const list = document.getElementById("doctorList");

    list.innerHTML = "";

    doctors.forEach(doctor => {
        list.innerHTML += `
            <div>
                <strong>${doctor.name}</strong>
                - ${doctor.specialization}

                <button onclick="deleteDoctor(${doctor.id})">
                    Delete
                </button>
            </div>

            <hr>
        `;
    });
}

async function addDoctor() {

    const name = document.getElementById("name").value;
    const specialization =
        document.getElementById("specialization").value;

    await fetch(`${API}/doctors`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            specialization: specialization
        })
    });

    document.getElementById("name").value = "";
    document.getElementById("specialization").value = "";

    loadDoctors();
}

async function deleteDoctor(id) {

    await fetch(`${API}/doctors/${id}`, {
        method: "DELETE"
    });

    loadDoctors();
}

loadDoctors();