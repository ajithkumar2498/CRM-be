import userModel from "../Models/userModel.js";
import { createJWT, hashCompare, hashPassword } from "../Utils/index.js";

export const signUp = async (req, res) => {
  try {
  

       if (!req.body) {
      return res.status(400).json({ message: "No data provided" });
    }

        const { name, email, password, company, tag } = req.body;
 
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    } else {
     const hashedPassword = await hashPassword(password)
     const user = await userModel.create({
      name,
      email,
      company,
      tag,
      password: hashedPassword
    });
    res.status(201).send({
             user,
             message:"User Signed up Successful"
            })
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};


export const login = async(req, res)=>{
    try {
         let user = await userModel.findOne({email:req.body.email})

        if(user)
        {
            if(await hashCompare(req.body.password, user.password))
            {
                let token = createJWT(user._id, user.email)
                res.status(200).send({
                    message:"Login Successful",
                    name:user.name,
                    id:user._id,
                    token,
                    email:user.email
                })
            }
            else
            {
                res.status(400).send({
                    message:"Incorrect Password"
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`User with ${req.body.email} does not exists`
            })
        }
    } catch (error) {
       console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId)

    console.log(user)
    if(user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user.userId,
      { ...req.body },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Update failed" });
  }
};
