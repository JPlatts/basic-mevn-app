const mongoose = require('mongoose');
const hasher = require('../modules/hasher');
const mailer = require('../modules/mailer');


const userSchema = mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true
    }, 
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    }, 
    pwdHash: {
        type: String
    },
    pwdSalt: {
        type: String
    },
    passwordSetDate: { 
        type: Date
    },
    loginAttemptCount: {
        type: Number,
        default: 0
    },
    isLocked: {
        type: Boolean,
        required: true,
        default: false
    },
    confirmationHash: {
        type: String
    },
    confirmationSalt: {
        type: String
    },
    confirmationDate: {
        type: Date
    },
    lastLoginDate: {
        type: Date
    },
    

});

userSchema.virtual("fullName").get(function() {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.statics.userExistsWithEmail = async (email) => {
    let user = await User.findOne({email: email});
    if (user) {
        return true;
    } else {
        return false;
    }
};

userSchema.statics.sanitizeNewUser = (user) => {
  user.email = user.email ? user.email.trim() : '';
  user.firstName = user.firstName ? user.firstName.trim() : '';
  user.lastName = user.lastName ? user.lastName.trim() : '';
  user.password = user.password ? user.password.trim() : '';
  user.confirmationRoute = user.confirmationRoute ? user.confirmationRoute.trim() : '';

  return user;
}

userSchema.statics.createAndSave = async (inputUser) => {
  let user = userSchema.statics.sanitizeNewUser(inputUser);
  let pwHash = hasher.hashPwd(user.password);
  let newUser = new User();
  newUser.email = user.email;
  newUser.firstName = user.firstName;
  newUser.lastName = user.lastName;
  newUser.pwdHash = pwHash.hash;
  newUser.pwdSalt = pwHash.salt;
  newUser.passwordSetDate = new Date();
  
  let confKey = hasher.genResetkey();
  let confHash = hasher.hashPwd(confKey);
  newUser.confirmationSalt = confHash.salt;
  newUser.confirmationHash = confHash.hash;
  newUser = await newUser.save();

  let confirmationLink = `${inputUser.confirmationRoute}/${newUser.id}.${confKey}`;
  mailer.registrationMail(newUser,confirmationLink);
  return newUser;
  

}

userSchema.statics.desensitize = async (user) => {
  let retVal = await User.findById(user.id).lean();
  delete retVal.confirmationHash;
  delete retVal.confirmationSalt;
  delete retVal.pwdHash;
  delete retVal.pwdSalt;
  return retVal;
}

userSchema.statics.validateNewUser = (user) => {
  let saniUser = userSchema.statics.sanitizeNewUser(user)
  let valid = true;
  let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
  if(!saniUser.email || !emailRegex.test(saniUser.email)) {
    valid = false;
  }

  if (!saniUser.firstName || saniUser.firstName == '') {
    valid = false;
  }

  if (!saniUser.lastName || saniUser.lastName == '') {
    valid = false;
  }

  let pwRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  if (!saniUser.password || !pwRegex.test(saniUser.password)) {
    valid = false;
  }

  if (!saniUser.confirmationRoute || saniUser.confirmationRoute == '') {
    valid = false;
  }

  return valid;

}

const User = mongoose.model('User', userSchema);
module.exports = User;