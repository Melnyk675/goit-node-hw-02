const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { IdValid } = require("../../middlewares");

router.get("/", ctrl.getListContacts);
router.get("/:contactId", IdValid, ctrl.getContactById);
router.post("/", ctrl.addContact);
router.delete("/:contactId", ctrl.removeContact);
router.put("/:contactId", IdValid, ctrl.updateById);
router.patch("/:contactId/favorite", IdValid, ctrl.updateFavorite);

module.exports = router;