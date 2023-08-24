"use client"

import * as z from 'Zod';
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import {zodResolver} from "@hookform/resolvers/zod";
import { usePathname , useRouter} from 'next/navigation';


 import { CommentValidation } from "@/lib/validations/thread";
import { Input } from '../ui/input';
import Image from 'next/image';
import { addCommentToThread } from '@/lib/actions/thread.actions';
import { currentUser } from '@clerk/nextjs';
//import { createThread } from '@/lib/actions/thread.actions';


interface Props{

    threadId: string ;
    currentuserImg:string;
    currentUserId:string;

}






const Comment = ({ threadId , currentuserImg, currentUserId}: Props)=>{
    
const router = useRouter();
const pathName = usePathname();

  const form= useForm({
      resolver:zodResolver(CommentValidation),
      defaultValues:{
          thread :'',
         
             
      }
  })
  const onSubmit = async (values:z.infer<typeof CommentValidation>) => {
    await addCommentToThread
    (

         threadId,  values.thread, JSON.parse(currentUserId), pathName
    );
     form.reset();
   } 

    return(
       <div>
        
        <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(onSubmit)}
      className=" comment-form"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-centre gap-3 w-full">
              <FormLabel>
               <Image
                src={currentuserImg} alt="profile image" width={48} height={48} className='rounded-full object-cover'/>
              </FormLabel>
              <FormControl className=" border-none bg-transparent">
                <Input 
                       type="text"
                       placeholder='comment...'
                       className='no-focus text-light-1 outline-none'
                        {...field}
                
                />
              </FormControl>
              
              
            </FormItem>

            
          )}
        />
        <Button type="submit" className="comment-form_btn">Reply</Button>
      </form>
      </Form>
       </div>
    )
}

    export default Comment;