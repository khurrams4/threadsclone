import * as z from 'zod' ;

export const Threadvalidation = z.object({
    thread :z.string().nonempty().min(3,{message:'Minimum 3 charecters'}),
    accountid :z.string(),
   })

export const CommentValidation = z.object({
    thread :z.string().nonempty().min(3,{message:'Minimum 3 charecters'}),
   

})   