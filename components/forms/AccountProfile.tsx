"use client"

// import { useForm } from "react-hook-form";
// import { Form } from "@/components/ui/form";
// import {zodResolver} from "@hookform/resolvers/zod";
// import { Uservalidation } from "@/lib/validations/user";
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
    // const form= useForm({
    //     resolver:zodResolver(Uservalidation),
    //     defaultValues:{
    //         profile_photo:"",
    //         name:"",
    //         username:"",
    //         bio:"",    
    //     }
    // })
    return(
    <div className="text-light-2">

    accountfrofile
    {/* <Form>
        
      </Form> */}
    </div>

    )
}

export default AccountProfile;