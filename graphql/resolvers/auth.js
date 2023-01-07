const bcrypt = require('bcryptjs');

const User = require('../../models/User');


module.exports = {
    createUser: args => {
      return User.findOne({ email: args.userInput.email })
      .then(user => {
        if(user) {
          throw new Error("User already exists");
        }
        return bcrypt.hash(args.userInput.password, 12)
      })
      .then(hashedPassword => {
        newUser = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
        return newUser.save()
      })
      .then(result => {
        return { ...result._doc, password: null };
      })
      .catch(err => {
        throw err;
      });
    }
  };