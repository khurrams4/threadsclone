interface Props{

    threadId: string ;
    currentuserImg:string;
    cuucurrentUserId:string;

}

const Comment = ({ threadId , currentuserImg, cuucurrentUserId}: Props)=>{

    return(
       <div>
        <h1 className="text-white"> comment form </h1>
       </div>
    )
}

    export default Comment;