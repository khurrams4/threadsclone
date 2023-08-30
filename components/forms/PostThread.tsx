"use client"

import {z}  from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { usePathname , useRouter} from 'next/navigation';
import { Threadvalidation } from "@/lib/validations/thread";
import { createThread } from '@/lib/actions/thread.actions';
import { useOrganization } from "@clerk/nextjs"; 

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
  const {organization} = useOrganization();
  
    const form= useForm({
        resolver:zodResolver(Threadvalidation),
        defaultValues:{
            thread :'',
            accountid:userId
               
        }
    })

    const onSubmit = async (values:z.infer<typeof Threadvalidation>) => {
          
        await createThread
        (
          {
           text: values.thread,
           author:userId,
           communityId: organization!.id ?? '',
           communityName: organization?.name ?? '',
           path:pathName,
           communityImgUrl:organization?.imageUrl ?? ''
          }
          );
           router.push("/")
       }
      
       
      


    return (
    <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(onSubmit)}
      className=" mt-10 flex flex-col justify-start gap-10"
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
        <Button type="submit" className="bg-primary-500">Post Thread</Button>
      </form>
      </Form>
        )
}

export default PostThread;

function creatThread() {
    throw new Error('Function not implemented.');
}
