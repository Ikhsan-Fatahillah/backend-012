import Akun from "../models/UserModel2.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const akun = await Akun.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!akun[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, "fdnkjfkewhufih4ff2b32efjfknrf940r02", (err, decoded) => {
            if(err) return res.sendStatus(403);
            const akunId = akun[0].id;
            const username = akun[0].username;
            const accessToken = jwt.sign({akunId, username}, "ashd874hfefhuefhwefnweifownfoienofowe", {
                expiresIn: '15s'
            });
            res.json({accessToken});
        })
    } catch (error) {
        console.log(error);
    }
}