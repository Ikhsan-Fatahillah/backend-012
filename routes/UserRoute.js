import express from "express";
import { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controller/UserController.js";
import { getAkun, Register, Login, Logout } from "../controller/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/akun', verifyToken, getAkun);
router.post('/akun', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;