import Threadcard from "@/components/cards/Threadcard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ( {params}:{params:{id:string}})=>{
    if(!params.id) return null;
    const user = await currentUser();
    if(!user) return null;

    const userInfo= await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding')

    const thread= await fetchThreadById(params.id);
return (
    <section className="relative">
        <div>
        <Threadcard
                      key={thread._id}
                      id={ thread._id}
                      currentUserId={user?.id||""}
                      parentId={thread.parentId}
                      content={thread.text}
                      author={thread.author}
                      community={thread.community}
                      createdAt={thread.createdAt}
                      comments={thread.children}
                      />
            
        </div>
        <div className="mt-7">
            <Comment
             threadId ={thread.id}
             currentuserImg = {user.imageUrl}
             cuucurrentUserId={JSON.stringify(userInfo._id)}
            />

        </div>
    </section>
)
}

export default Page;