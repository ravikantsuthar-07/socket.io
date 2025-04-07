import authModel from "../models/authModel.js";

export const createAuthController = async (req, res) => {
    try {
        const {fristName, lastName, mobileNo, email, street, city, state, country, loginId, password} = req.body;
        if (!fristName) {
            return res.status(400).send({
                success: false,
                message: 'Frist Name is Required!'
            });
        }
        if (!lastName) {
            return res.status(400).send({
                success: false,
                message: 'Last Name is Required!'
            });
        }
        if (!mobileNo) {
            return res.status(400).send({
                success: false,
                message: 'Mobile Number is Required!'
            });
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'Email Address is Required!'
            });
        }
        if (!street) {
            return res.status(400).send({
                success: false,
                message: 'Street is Required!'
            });
        }
        if (!city) {
            return res.status(400).send({
                success: false,
                message: 'City is Required!'
            });
        }
        if (!state) {
            return res.status(400).send({
                success: false,
                message: 'State is Required!'
            });
        }
        if (!country) {
            return res.status(400).send({
                success: false,
                message: 'Country is Required!'
            });
        }
        if (!loginId) {
            return res.status(400).send({
                success: false,
                message: 'Login Id is Required!'
            });
        }
        if (!password) {
            return res.status(400).send({
                success: false,
                message: 'Password is Required!'
            });
        }
        
        const existUser = await authModel.findOne( { email } )
        
        if (existUser) {
            return res.status(400).send({
                success: false,
                message: "Already Email is Used"
            })
        }

        
        const user = await new authModel({fristName, lastName, mobileNo, email, address:{ street, city, state, country}, loginId, password}).save();
        res.status(201).send({
            success: true,
            message: 'User Created Succesfully',
            user
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in Register',
            error
        });
    }
}


export const getAuthController = async (req, res) => {
    try {
        const user = await authModel.find({});
        return res.status(200).send({
            success: true,
            message: 'User Getting Successfully',
            user
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in Register',
            error
        });
    }
}


export const getUserByEmailAuthController = async (req, res) => {
    try {
        const user = await authModel.findOne({email: req.params.email});
        return res.status(200).send({
            success: true,
            message: 'Getting User Successfully',
            user
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in Getting User',
            error
        });
    }
}

export const loginAuthController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.send({
                status: 404,
                success: false,
                message: "Invaild email and password"
            });
        }

        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.send({
                status: 404,
                success: false,
                message: "Email is not registed"
            })
        }
        if (password === user.password) {
            
            const token = await JWT.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '5d' });
            res.send({
                status: 200,
                success: true,
                message: "Login Successfully",
                user: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    role: user.role
                },
                token
            })
        } else{
            return res.status(403).send({
                success: false,
                message: 'Invalid Password'
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}