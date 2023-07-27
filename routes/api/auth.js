const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const authController = require("../../controllers/auth");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), authController.register);

router.post("/login", validateBody(schemas.loginSchema), authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch("/users", authenticate, validateBody(schemas.updateSubscriptionSchema), authController.updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar);

router.get("/verify/:verificationToken", authController.verifyEmail);

router.post("/verify", validateBody(schemas.verifySchema), authController.resendVerifyEmail);

module.exports = router;