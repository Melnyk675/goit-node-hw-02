const { contact, addSchema, updateFavoriteSchema } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await contact.find(favorite ? { owner, favorite } : { owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email subscription");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
 
  if (error) {
    throw HttpError(400, error.message);
  }
  const { _id: owner } = req.user;
  const result = await contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const updateById = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
 
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }
  
  const { contactId } = req.params;
  const result = await contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
  updateById: ctrlWrapper(updateById),
};