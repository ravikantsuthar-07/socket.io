import mongoose from 'mongoose'

const authSchema = mongoose.Schema(
    {
        fristName: {
            type: String,
            trime: true
        },
        lastName: {
            type: String,
            trime: true
        },
        mobileNo: {
            type: String,
            require: true,
            match: /^[0-9]{10}$/
        },
        email: {
            type: String,
            require: true,
            match: /.+\@.+\..+/
        },
        socketId:{
            type: String
        },
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
        },
        loginId: {
            type: String,
            match: /^[a-zA-Z0-9]{8}$/
        },
        password: {
            type: String,
            validate: {
                validator: function (v) {
                    // Regex for at least one uppercase, one lowercase, one number, and one special character
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
                },
                message: props => `${props.value} is not a valid password! It must have at least one uppercase letter, one lowercase letter, one number, and one special character.`,
            }
        },
        token:{
            type: String
        },
        creationsTime: {
            type: Date,
            require: true,
            default: Date.now
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        }
    }
);

export default mongoose.model('auth', authSchema);