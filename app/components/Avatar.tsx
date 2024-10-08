'use client';

import Image from "next/image";
import { User } from "@prisma/client";
import useActiveList from "@/app/hooks/useActiveList";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({
  user
}) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return ( 
    <div className="relative">
      <div
        className="
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-9
          w-9
          md:h-11
          md:w-11
        "
      >
        <Image
          alt="Avatar"
          src={user?.image || '/images/placeholder.jpg'}
          fill
        />
      </div>
      {isActive && (
        <span
          className="
            absolute
            block
            rounded-full
            bg-green-500
            ring-2
            ring-gray-100
            top-[2px]
            right-[2px]
            size-2
          "
        />
      )}
    </div>
   );
}
 
export default Avatar;