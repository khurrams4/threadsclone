"use server"

import { connectToDB } from "../mongoose"
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params{
    text:string,
    author:string,
    communityId:string|null,
    path:string,
}
export async function createThread({
    text,
    author,
    communityId,
    path,
}:Params) : Promise<void>{
    connectToDB();
   try {
    await User.findOneAndUpdate(
        {id:userId},
        {
            username:username.toLowerCase(),
            name,
            bio,
            image,
            onboarded:true
        },
        {upsert:true,}
    );
    if(path==='/profile/edit'){
        revalidatePath(path);
    }
    
   } catch (error:any) {
    throw new Error(`failed to create/update user:${error.message}`);
   }
}

export async function fetchUser(userId: string) {

    try {
        connectToDB();
        return await User.findOne({id:userId})
        // .populate({
        //     path:'communities',
        //     model : Community
        //})
        
    } catch (error:any) {
        throw new Error(`failed to fetch user:${error.message}`);
        
    }
}
