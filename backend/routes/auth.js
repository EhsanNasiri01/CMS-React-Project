import { Router } from "express";
import {
    getRegister,
    getLogin,
    register,
    login,
    logout
} from '../conrtollers/auth.js'
const router = Router();
export function authRoutes() {
    router.get('/login', getLogin)
    router.get('/register', getRegister)
    router.post('/logout', logout)
    router.post('/login', login)
    router.post('/register', register)
    return router
}