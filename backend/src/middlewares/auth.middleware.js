import {clerkClient} from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId){
       return res.status(401).json({message:"Not authorized"});
    }
    next()
}

export const requireAdmin = async (req, res, next) => {
    try{
        const currentUser = req.auth.userId;
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        if(!isAdmin){
           return res.status(403).json({message:"Not authorized - must be in admin"});
        }
        next()
    }catch(error){

    }
}