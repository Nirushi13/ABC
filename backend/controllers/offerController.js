import Offer from '../models/offerModel.js';

// Create a new offer
export const createOffer = async (req, res) => {
    try {
      const { title, description, discountPercentage, startDate, endDate } = req.body;
      const image = req.file ? req.file.filename : null; // Get the filename of the uploaded image
  
      if (!title || !description || !discountPercentage || !startDate || !endDate || !image) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newOffer = new Offer({ title, description, discountPercentage, startDate, endDate, image });
      await newOffer.save();
  
      res.status(201).json(newOffer);
    } catch (error) {
      console.error('Error creating offer:', error);
      res.status(500).json({ message: 'Failed to create offer', error });
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

// Get a single offer by ID
export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch offer', error });
  }
};

// Update an offer
export const updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update offer', error });
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
