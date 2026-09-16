const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// SERVE ADMIN FRONTEND
// ===============================

app.use("/admin", express.static(path.join(__dirname, "admin")));

// ===============================
// TEMPORARY DATA
// ===============================

let patients = [
    {
        id: 1,
        name: "Ali",
        age: 25,
        disease: "Fever"
    }
];

let medicines = [
    {
        id: 1,
        name: "Paracetamol",
        quantity: 50,
        price: 20
    }
];

let bills = [
    {
        id: 1,
        patient: "Ali",
        amount: 5000,
        status: "Pending"
    }
];

// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
    res.send("Hospital Management System Backend is Working");
});

// ===============================
// PATIENTS
// ===============================

app.get("/patients", (req, res) => {
    res.json(patients);
});

// ===============================
// MEDICINES
// ===============================

app.get("/medicines", (req, res) => {
    res.json(medicines);
});

app.post("/medicines", (req, res) => {

    const medicine = {
        id: medicines.length + 1,
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
    };

    medicines.push(medicine);

    res.json(medicine);
});

app.delete("/medicines/:id", (req, res) => {

    const id = parseInt(req.params.id);

    medicines = medicines.filter(medicine => medicine.id !== id);

    res.json({
        message: "Medicine deleted successfully"
    });
});

// ===============================
// BILLING
// ===============================

app.get("/billing", (req, res) => {
    res.json(bills);
});

app.post("/billing", (req, res) => {

    const bill = {
        id: bills.length + 1,
        patient: req.body.patient,
        amount: req.body.amount,
        status: req.body.status
    };

    bills.push(bill);

    res.json(bill);
});

app.delete("/billing/:id", (req, res) => {

    const id = parseInt(req.params.id);

    bills = bills.filter(bill => bill.id !== id);

    res.json({
        message: "Bill deleted successfully"
    });
});

// ===============================
// START SERVER
// ===============================

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});