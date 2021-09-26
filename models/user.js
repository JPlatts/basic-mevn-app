const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);
module.exports = User;