import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const staffSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

staffSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const Staff = mongoose.models.Staff || mongoose.model('Staff', staffSchema);

export default Staff;
