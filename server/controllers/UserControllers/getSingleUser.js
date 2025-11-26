let singleUser = async (req, res) => {
    try {
          let userid = req.params.userid;
          let user = await userModel.findOne({userid: userid});
          res.json(user);
    } catch (error) {
     console.log(error);   
    }
}

module.exports = singleUser;