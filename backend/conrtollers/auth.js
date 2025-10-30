import bcrypt from 'bcrypt'
import User from '../models/user.js'
export function getRegister(req,res) {
    try {
        res.send("register");
    } catch (error) {
        res.send(error)
    }
};

export function getLogin(req,res) {
    try {
        res.send("login");
    } catch (error) {
        res.send(error)
    }
};

export function getForgetPass(req,res) {
    try {
        res.send('forgetPass');
    } catch (error) {
        res.send(error)
    }
};

export function getResetPass(req,res) {
    try {
        res.send('resetPass');
    } catch (error) {
        res.send(error)
    }
};

export function getLogout(req,res) {
    try {
        res.send("logout");
    } catch (error) {
        res.send(error)
    }
};

export async function register(req,res){
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email:email});
        if (user) return res.send('a user with this email exist');
        const hashedPass = await bcrypt.hash(password,10);
        const newUser = new User({
            email:email,
            password:hashedPass,
        });
        await newUser.save();
        let userSession = {email:email};
        req.session.user = userSession;
        res.redirect('/dashboard');
    } catch (error) {
        res.send(error);
    }
};

export async function login(req,res){
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if (!user) return res.send('this email is not registered');
        const hashedPass = user.password;
        const isMatch = await bcrypt.compare(password,hashedPass);
        if (!isMatch) return res.send('incorrect info');
        let userSession = {email:email};
        req.session.user = userSession;
        res.redirect('/dashboard');
    } catch (error) {
        res.send(error);
    }
};

export function logout(req,res){
    try {
        req.session.user = null;
        req.session.destroy(() => {
            res.redirect('/login');
        });
    } catch (error) {
        res.send(error);
    }
};

// export function forgetPass(req,res){
//     try {
        
//     } catch (error) {
        
//     }
// }
// export function resetPass(req,res){
//     try {
        
//     } catch (error) {
        
//     }
// }
