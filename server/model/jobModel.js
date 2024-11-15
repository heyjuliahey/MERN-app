import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String, 
        required: true
    },
    vacancy: {
        type: String, 
        required: true
    },
    company: {
        type: String, 
        required: true
    },
    fromSalary: {
        type: Number, 
        required: true
    },
    toSalary: {
        type: Number, 
        required: true
    },
    status: {
        type: String, 
        required: true
    },
    note: {
        type: String, 
        required: true
    }
})
export default mongoose.model("Job", jobSchema);