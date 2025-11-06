import bcrypt from 'bcrypt'
import User from '../models/user.js'

//صفحه ثبت نام
export function getRegister(req,res) {
    try {
        res.send("register");
    } catch (error) {
        res.send(error)
    }
};

//صفحه ورود
export function getLogin(req,res) {
    try {
        res.send("login");
    } catch (error) {
        res.send(error)
    }
};

//ثبت نام
export async function register(req,res){
    try {
        const { email, password, name, role } = req.body; //برای ثبت نام این موارد را در فرم وارد کنید
        const user = await User.findOne({email:email});
        if (user) return res.send('a user with this email exist');
        const hashedPass = await bcrypt.hash(password,10);
        const newUser = new User({
            email:email, //الزامی
            password:hashedPass, //الزامی
            name:name, //الزامی
            role:role // نقش فقط دو مقدار admin و user است. الزامی
        });
        await newUser.save();
        let userSession = {email:email, name:name, role:role};
        req.session.user = userSession;
        switch (role) {
            case 'admin':
                res.send('admin dashboard');
                break;
            case 'user':
                res.send('user dashboard');
                break;
            default:
                res.send('dashboard');
                break;
        };
    } catch (error) {
        res.send(error);
    }
};

//ورود
export async function login(req,res){
    try {
        const {email,password} = req.body; //برای ورود این موارد را در فرم وارد کنید
        const user = await User.findOne({email:email});
        if (!user) return res.send('this email is not registered');
        const hashedPass = user.password;
        const isMatch = await bcrypt.compare(password,hashedPass);
        if (!isMatch) return res.send('incorrect info');
        let userSession = {email:email, name:user.name, role:user.role};
        req.session.user = userSession;
        res.redirect('/dashboard');
    } catch (error) {
        res.send(error);
    }
};

//خروج
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
// // }

// export function resetPass(req,res){
//     try {
        
//     } catch (error) {
        
//     }
// }

// export function getForgetPass(req,res) {
//     try {
//         res.send('forgetPass');
//     } catch (error) {
//         res.send(error)
//     }
// };

// export function getResetPass(req,res) {
//     try {
//         res.send('resetPass');
//     } catch (error) {
//         res.send(error)
//     }
// };