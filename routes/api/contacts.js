const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts");
const { IdValid, authenticate } = require("../../middlewares");

router.get("/", authenticate, contactsController.getListContacts);

router.get("/:contactId", authenticate, IdValid, contactsController.getContactById);

router.post("/", authenticate, contactsController.addContact);

router.delete("/:contactId", authenticate, contactsController.removeContact);

router.put("/:contactId", authenticate, IdValid, contactsController.updateById);

router.patch("/:contactId/favorite", authenticate, IdValid, contactsController.updateFavorite);

module.exports = router;