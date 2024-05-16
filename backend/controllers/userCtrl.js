const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { prm, email, name, surname, username, password } = req.body;

      const prmdeger = "pasa";
      if (prm !== prmdeger) {
        return res.status(400).json({ msg: "..." });
      }
      const user = await Users.findOne({ username });
      if (user)
        return res
          .status(400)
          .json({ msg: "Bu kullanıcı adı daha önce alınmıştır." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Şifre en az 6 karakterden oluşmalıdır." });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        email,
        name,
        surname,
        username,
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();
      res.json("Kullanıcı veya kullanıcılar başarıyla oluştu.");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await Users.findOne({ username });
      if (!user) return res.status(400).json({ msg: "Kullanıcı Bulunamadı." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Şifre yanlış." });

      const accesstoken = createAccessToken({
        id: user._id,
        username: user.username,
        name: user.name,
        surname: user.surname,
        email: user.email,
      });

      res.json({ token: accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // logout: async (req, res) =>{
  //     try {
  //         res.clearCookie('refreshtoken', {path: 'http://localhost:3001/user/refresh_token'})
  //         return res.json({msg: "Logged out"})
  //     } catch (err) {
  //         return res.status(500).json({msg: err.message})
  //     }
  // },
  // refreshToken: (req, res) =>{
  //     try {
  //         const rf_token = req.cookies.refreshtoken;
  //         if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

  //         jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
  //             if(err) return res.status(400).json({msg: "Please Login or Register"})

  //             const accesstoken = createAccessToken({id: user.id})

  //             res.json({accesstoken})
  //         })

  //     } catch (err) {
  //         return res.status(500).json({msg: err.message})
  //     }

  // },
  // getUser: async (req, res) =>{
  //     try {
  //         const user = await Users.findById(req.user.id).select('-password')
  //         if(!user) return res.status(400).json({msg: "User does not exist."})

  //         res.json(user)
  //     } catch (err) {
  //         return res.status(500).json({msg: err.message})
  //     }
  // },
  // addCart: async (req, res) =>{
  //     try {
  //         const user = await Users.findById(req.user.id)
  //         if(!user) return res.status(400).json({msg: "User does not exist."})

  //         await Users.findOneAndUpdate({_id: req.user.id}, {
  //             cart: req.body.cart
  //         })

  //         return res.json({msg: "Added to cart"})
  //     } catch (err) {
  //         return res.status(500).json({msg: err.message})
  //     }
  // },
  // history: async(req, res) =>{
  //     try {
  //         const history = await Payments.find({user_id: req.user.id})

  //         res.json(history)
  //     } catch (err) {
  //         return res.status(500).json({msg: err.message})
  //     }
  // }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "121m" });
};
// const createRefreshToken = (user) => {
//   return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
// };

module.exports = userCtrl;
