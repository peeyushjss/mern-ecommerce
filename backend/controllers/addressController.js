import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, fullName, phone, street, city, state, pincode } = req.body;
    const newAddress = new Address({ userId, fullName, phone, street, city, state, pincode });
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Error adding address", error });
  }
};

// Get Addresses for a User
export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.find({ userId });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses", error });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findByIdAndDelete(id);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address", error });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, phone, street, city, state, pincode } = req.body;
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { fullName, phone, street, city, state, pincode },
      { new: true }
    );
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: "Error updating address", error });
  }
};