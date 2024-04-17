const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"] 
    },
    stId: {
        type: Number,
        required: [true, "Student ID is required"],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required"],
        unique: true,
        validate: { validator: function(value) {
                return /^\d{10}$/.test(value);
            },
            message: "Invalid phone number format. Please provide a 10-digit number."
        }
    }
});

const StudentModel = mongoose.model("users", StudentsSchema);

module.exports = StudentModel;