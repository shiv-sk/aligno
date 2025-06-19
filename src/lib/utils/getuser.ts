import User from "@/models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromToken(){
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if(!token){
        throw new Error("Token is missing");
    }
    const decodedToken = jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload;
    const userId = decodedToken.id;
    if(!userId){
        throw new Error("Invalid token");
    }
    const user = await User.findById(userId).select("-password");
    if(!user){
        throw new Error("User not found");
    }
    return user;
}