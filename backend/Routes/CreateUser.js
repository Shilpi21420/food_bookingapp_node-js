const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "MynameisShilpiChoudhryfrompurneBihar";

//Signup.............................................
router.post(
  "/creatuser",
  [
    body("email", "Incorrect Email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//login................................................................

router.post(
  "/loginuser",
  [
    body("email", "Incorrect Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try login with correct Email" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password, userdata.password);

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try login with correct Password" });
      }


      const data = {
        user: {
          id:userdata.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret);

      return res.json({ success: true ,authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//..................................................................................................................

module.exports = router;
