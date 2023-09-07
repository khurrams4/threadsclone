"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const removeThread=async () => {
    const confirmed= confirm("Are You Sure?");
    if(confirmed){
      await deleteThread(JSON.parse(threadId), pathname);
      console.log(`thread removed by user${threadId}`)
      if (!parentId || !isComment) {
        router.push("/");
      }
    }
    
  }

  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <Image
      src='/assets/delete.svg'
      alt='delte'
      width={18}  
      height={18}
      className='cursor-pointer object-contain'
      onClick={removeThread}
    />
  );
}

export default DeleteThread;