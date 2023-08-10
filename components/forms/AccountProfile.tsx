"use client"
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea"

import * as z from 'Zod';
import { ChangeEvent } from "react";

interface Props{

    user:{
        id:string;
        objectId:string;
        username:string;
        name:string;
        bio:string;
        image:string
    };
    btnTitle:string;
}

const AccountProfile=({user , btnTitle}: Props)=>{
    const form= useForm({
        resolver:zodResolver(UserValidation),
        defaultValues:{
            profile_photo:'',
            name:'',
            username:'',
            bio:'',    
        }
    })

    const handleImage = (e:ChangeEvent , fieldChange: (value:string) => void) =>{e.preventDefault();}
    function onSubmit(values: z.infer<typeof UserValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
    return(
    <div className="text-light-2">

    
<Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
        >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">{
                field.value?(
                    <Image 
                              src={field.value} alt={""} 
                              alt="profile photo"                     
                              width={96}
                              height={96}
                              priority
                              className="rounded-full object-contain"
                              />
                ):(
                    <Image 
                              src="/assets/profile.svg" 
                              alt="profile photo"                     
                              width={24}
                              height={24}
                              priority
                              className="object-contain"
                              />
                )
              }</FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input 
                type="file"
                accept="image/*"
                placeholder="Upload a photo"
                className="account-form_image-input"
                onChange={(e)=>handleImage(e,field.onChange)}
                
                />
              </FormControl>
              
            </FormItem>

            
          )}
        />


<FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
               Name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input 
                
                type="text"
                className="account-form_input no-focus"
                {...field}
                
                />
              </FormControl>
              
            </FormItem>

            
          )}
        />

<FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
              username 
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input 
                
                type="text"
                className="account-form_input no-focus"
                {...field}
                
                />
              </FormControl>
              
            </FormItem>

            
          )}
        />

<FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
               bio
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea 
                rows={10}
                
                className="account-form_input no-focus"
                {...field}
                
                />
              </FormControl>
              
            </FormItem>

            
          )}
        />


        <Button type="submit" className="bg-primary-500">Submit</Button>
      </form>
    </Form>
    </div>

    )
}

export default AccountProfile;