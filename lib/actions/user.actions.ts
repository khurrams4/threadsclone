"use server"

import { connectToDB } from "../mongoose"
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";

interface Params{
     userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string,
}
export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
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

export async function fetchUserPost(userId: string) {
    try {
        connectToDB();
        // find all threads author by user with the given userid
        // TODO: populate community
        const threads = await User.findOne({id:userId})
        .populate({
            path:'threads',
            model:Thread,
            populate:{
                path:'children',
                model:Thread,
                populate:{
                    path:'author',
                    model:User,
                    select:'name image id'
                }
            }

        })
        return threads;
    } catch (error:any) {
        throw new Error(`Failed to fetch user post: ${error.message}`) 
    }
}