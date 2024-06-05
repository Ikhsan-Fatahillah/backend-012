import User from "../models/UserModel.js";
import Akun from "../models/UserModel2.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAkun = async(req, res) => {
    try {
        const akun = await Akun.findAll({
            attributes: ['id', 'username']
        });
        res.json(akun);
    } catch (error) {
        console.log(error);
    }
}

//Initial endpoint
export const initialEnpoint = async (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Connected to Ticket-StandUp Backend!!",
    })
}

export const Register = async(req, res) => {
    const {username, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password & Confirm Eror"});
    try {
        await Akun.create({
            username: username,
            password: password
        });
        res.json({msg: "Register Berhasil"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const akun = await Akun.findAll({
            where: {
                username: req.body.username
            }
        });

        // Cek jika akun tidak ditemukan
        if (akun.length === 0) {
            return res.status(404).json({ msg: "Username tidak ditemukan" });
        }

        //const match = await bcrypt.compare(req.body.password, akun[0].password);
        const pwDb = akun[0].password;
        if (req.body.password !== pwDb) return res.status(400).json({ msg: "Password salah" });

        const akunId = akun[0].id;
        const username = akun[0].username;

        const accessToken = jwt.sign({ akunId, username }, "ashd874hfefhuefhwefnweifownfoienofowe", {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ akunId, username }, "fdnkjfkewhufih4ff2b32efjfknrf940r02", {
            expiresIn: '1D'
        });

        await Akun.update({ refresh_token: refreshToken }, {
            where: {
                id: akunId
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // Perbaiki perhitungan maxAge
        });

        res.json({ accessToken });
    } catch (error) {
        console.error(error); // Tambahkan log untuk debugging
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const akun = await Akun.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!akun[0]) return res.sendStatus(204);
    const akunId = akun[0].id;
    await Akun.update({refresh_token: null}, {
        where:{
            id: akunId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}


export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createUser = async(req, res) =>{
    try {
        await User.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
} 

export const updateUser = async(req, res) =>{
    try {
        await User.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
} 

export const deleteUser = async(req, res) =>{
    try {
        await User.destroy ({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
} 