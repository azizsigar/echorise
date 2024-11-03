import express from "express";
import passport from "passport";

const router = express.Router();

// Google ile giriş
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google geri dönüş
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/"); // Başarılı girişte yönlendirme
});

// Çıkış yapma
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
