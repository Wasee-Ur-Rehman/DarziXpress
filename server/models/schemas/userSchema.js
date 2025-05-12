import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';



// Define the user schema
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String },
    city: { type: String, required: true },
    userType: { type: String, required: true, enum: ['customer', 'tailor', 'admin'], default: 'customer' }, // Default to 'customer'
}, { timestamps: true });


// Compare entered password with stored hashed password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

//hardcoded admin 
userSchema.statics.ensureAdminExists = async function () {
  const existingAdmin = await this.findOne({ userType: 'admin' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10); // default password
    await this.create({
      fullName: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      phoneNumber: '030012345678',
      city: 'Lahore',
      userType: 'admin'
    });
    console.log('Admin user created');
  }
};
const User = mongoose.model('User', userSchema);

export default User;
