import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect} from "next/navigation";
import Link from "next/link";
import Image from "next/image";


async function Page(){
    const user= await currentUser();
    if(!user) return null;
    const userInfo= await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboading');
// get activity or notification
    const activity = await getActivity(userInfo._id)
    return (
             <section>
                <h1 className="head-text mb-10">       Activity Now   </h1> 
             <section className="mt-10 flex flex-col gap-5">
               {activity.length> 0? ( 
                  <>
               {activity.map((act)=>(
               <Link key={act._id} href={`/thread/${act.parentId}`}>
                  <article className="activity-card">
                     <Image
                      src={act.author.image}
                      alt="profile picture"
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                      />
                      <p className=" text-light-1">
                        <span>
                        {"   "} 
                         {act.author.name}  
                        </span>
                          {"  "} replied to your Thread
                      </p>
                  </article>
               </Link>))}
               </>) : <p className="!text-base-regular text-light-3"> No Acitivity Yet</p> }


             </section>
             </section>
           )
}

export default Page;