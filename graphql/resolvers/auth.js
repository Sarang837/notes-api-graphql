const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },
    login: args => {
      let userId;
      let userEmail;
      return User.findOne({ email: args.userInput.email })
      .then(user => {
        if(!user) {
          throw new Error("Email does not exist");
        }
        userId = user.id;
        userEmail = user.email;
        return bcrypt.compare(args.userInput.password, user.password)
      })
      .then(isEqual => {
        if(!isEqual) {
          throw new Error("Invalid password");
        }
        return jwt.sign({userId: userId, email: userEmail}, 'somesupersecretkey', { expiresIn: '1hr' })
      })
      .then(token => {
        return {
          userId: userId,
          token: token,
          tokenExpiration: 1
        }
      })
      .catch(err => {
        throw err;
      })
    }
  };