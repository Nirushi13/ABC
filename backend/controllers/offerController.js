import Offer from '../models/offerModel.js';

// Create a new offer
export const createOffer = async (req, res) => {
  try {
      const { title, description, discountPercentage, startDate, endDate } = req.body;
      const image = req.file ? req.file.filename : null; 
      
      if (!title || !description || !discountPercentage || !startDate || !endDate || !image) {
          return res.status(400).json({ message: 'All fields are required' });
      }
      // Validate discount percentage
      if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
          return res.status(400).json({ message: 'Discount percentage must be a number between 0 and 100' });
      }

      // Validate date range
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start >= end) {
          return res.status(400).json({ message: 'End date must be after the start date' });
      }

      const newOffer = new Offer({ title, description, discountPercentage, startDate, endDate, image });
      await newOffer.save();

      res.status(201).json({ success: true, message: "Offer Created" });
  } catch (error) {
      console.log(error);
      res.status(500).json({success:false, message: 'Failed to create offer' });
  }
};

// Get all offers
export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch offers', error });
  }
};

// Delete an offer
export const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete offer', error });
  }
};
