import jwt from 'jsonwebtoken';
import Staff from '../models/staffModel.js';
import bcrypt from 'bcrypt';

// Login an admin
export const staffLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const staff = await Staff.findOne({ email });
        if (!staff) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Add a new staff member
export const addStaff = async (req, res) => {
    const { name, email, password} = req.body;

    try {
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ success: false, message: 'Staff member already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStaff = new Staff({
            name,
            email,
            password: hashedPassword,
        });

        await newStaff.save();
        res.status(201).json({ success: true, message: 'Staff member added successfully' });
    } catch (error) {
        console.error('Error adding staff member:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update staff details
export const updateStaff = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ success: false, message: 'Staff member not found' });
        }

        if (password) {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            staff.password = await bcrypt.hash(password, salt);
        }

        staff.name = name || staff.name;
        staff.email = email || staff.email;

        await staff.save();
        res.json({ success: true, message: 'Staff member updated successfully' });
    } catch (error) {
        console.error('Error updating staff member:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete a staff member
export const deleteStaff = async (req, res) => {
    const { id } = req.params;

    try {
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ success: false, message: 'Staff member not found' });
        }

        await Staff.findByIdAndDelete(id);
        res.json({ success: true, message: 'Staff member deleted successfully' });
    } catch (error) {
        console.error('Error deleting staff member:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all staff members
export const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.json({ success: true, staff });
    } catch (error) {
        console.error('Error fetching staff members:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
