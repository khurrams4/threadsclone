"use client"

import * as z from 'Zod';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { usePathname , useRouter} from 'next/navigation';


 import { Threadvalidation } from "@/lib/validations/thread";
// import { updateUser } from "@/lib/actions/user.actions";

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



function PostThread({userId}:{userId:string}) {
    


  const router = useRouter();
  const pathName = usePathname();
  
    const form= useForm({
        resolver:zodResolver(Threadvalidation),
        defaultValues:{
            thread :'',
            accountid:userId
               
        }
    })


    const onSubmit =  () =>{
        
        }


    return (
    <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold  text-light-2">
               Content
              </FormLabel>
              <FormControl className=" no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea 
                        rows={15}
                        {...field}
                
                />
              </FormControl>
              <FormMessage/>
              
            </FormItem>

            
          )}
        />
        <Button type="submit" className="bg-primary-500">Submit</Button>
      </form>
      </Form>
        )
}

export default PostThread;