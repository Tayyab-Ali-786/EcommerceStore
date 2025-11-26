const addUser = async (req, res) => {
    try {
        let { name, email, password, isAdmin } = req.body;
          const user = new userModel({
            name,
            email,
            password,
            isAdmin
          })
          await user.save();
          res.json({ status: "user created", data: user });
    } catch (error) {
        console.log(error);
    }
}

module.exports = addUser;   // <-- REQUIRED
