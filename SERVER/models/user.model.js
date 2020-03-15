const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({

    name: {

        required: true,
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50

    },
    surname: {

        required: true,
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50

    },

    username: {

        required: true,
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50

    },

    password: {

        required: true,
        type: String,
        trim: true,

    },

    email: {

        required: true,
        type: String,
        unique: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("eMAİL İS invalid!!!")
            }
        }
    },
    isEmailVerified: {

        type: Boolean,

    },
    phoneNumber: {

        required: true,
        type: String,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 11

    },
    birthday: {
        required: false,
        type: String,
        trim: true,
        minlength: 1,


    },
    city: {
        required: true,
        type: String,
        trim: true,

    },


    gender: {
        type: String,
        trim: true,

    },


    biography: {
        maxlength: 250,
        type: String

    },


    // profilePicture: {
    //     type: ImageData
    // },


    isProfilePictureVerified: {

        type: Boolean
    },


    status: {

        required: true,
        type: String
    },
    currentTeam: {
        type: mongoose.Schema.Types.ObjectId,
        default: null

    },
    sendedPosts: {
        default: null,
        type: mongoose.Schema.Types.ObjectId
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

});


userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};


userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismyproject') // a unique token is generated 
    console.log(token);

    user.tokens = user.tokens.concat({ token }) // token is added to token area for user

    await user.save() // save operation


    return token
}

// userSchema.methods.removeToken = function(token) {
//     const user = this;
//     return user.updateOne({
//         $pull: {
//             tokens: { token }
//         }
//     });
// };


// userSchema.statics.findByToken = function(token) {
//     const User = this;
//     let decoded;

//     try {
//         decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (e) {
//         return Promise.reject();
//     }

//     return User.findOne({
//         '_id': decoded._id,
//         'tokens.token': token,
//         'tokens.access': 'auth',
//     });
// };



userSchema.statics.findByCredentials = function(email, password) {
    const User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject("There is no such user with given credentials!");
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};
// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// // Delete user tasks when user is removed
// userSchema.pre('remove', async function(next) {
//     const user = this
//     await Task.deleteMany({ owner: user._id })
//     next()
// })


const User = mongoose.model('User', userSchema);
module.exports = { User };