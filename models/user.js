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
  creationDate: {
    type: Date
  }
    

});

userSchema.virtual("fullName").get(function() {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.statics.userExistsWithEmail = async (email) => {
    let user = await User.findOne({email: email});
    if (user && (user.confirmationDate || user.creationDate.setHours(user.creationDate.getHours() + 24) >= new Date() )) {
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

  let prexUser = await User.findOne({email: user.email});
  if(prexUser) { //This can happen if a user doesn't confirm their account within 24 hours of creating it.
    await User.deleteOne({email: user.email});
  }
  
  let newUser = new User();
  newUser.email = user.email;
  newUser.firstName = user.firstName;
  newUser.lastName = user.lastName;
  newUser.pwdHash = pwHash.hash;
  newUser.pwdSalt = pwHash.salt;
  newUser.passwordSetDate = new Date();
  newUser.creationDate = new Date();
  
  let confKey = hasher.genResetkey();
  let confHash = hasher.hashPwd(confKey);
  newUser.confirmationSalt = confHash.salt;
  newUser.confirmationHash = confHash.hash;
  newUser = await newUser.save();
  try {
    let confirmationLink = `${inputUser.confirmationRoute}/${newUser.id}/key/${confKey}`;
    let mailSuccess = await mailer.registrationMail(newUser,confirmationLink);
    if(!mailSuccess) {
      let del = await User.deleteOne(newUser);
      throw new Error('Failed to send registration email.')  
    }
  } catch(ex) {
    // registration mail failed delete new user
    let del = await User.deleteOne(newUser);
    throw ex;
  }
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

userSchema.statics.confirm = async (userID, key) => {
  try {
    let user = await User.findById(userID)
    if(user && user.confirmationDate) {
      return await User.desensitize(user);
    } else if(user && hasher.hash(user.confirmationSalt, key) === user.confirmationHash) {
      user.confirmationDate = new Date();
      let s = await user.save();
      return await User.desensitize(user);
    }
  } catch (err) {
    console.log(err);
    return false;
  }
  
}

userSchema.statics.authenticate = async (email, password) => {
  let user = await User.findOne({email: email});
  if (user && hasher.hash(user.pwdSalt, password) === user.pwdHash) {
    return await User.desensitize(user);
  } else {
    return null;
  }
}

userSchema.statics.isConfirmed = async (userID) => {
  let user = await User.findById(userID).lean();
  return user.confirmationDate !== undefined && user.confirmationDate !== null;
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