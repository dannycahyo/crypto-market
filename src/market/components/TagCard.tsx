import Image from "next/image";

import type React from "react";

type TagCardProps = {
  iconURL: string;
  title: string;
};

const TagCard: React.FC<TagCardProps> = ({ iconURL, title }) => {
  return (
    <div className="flex flex-row  items-center gap-2 rounded-lg bg-blue-200/[1] p-2 text-blue-500">
      <div className="h-6 w-6">
        <Image src={iconURL} width={24} height={24} alt={title} />
      </div>
      <div className="whitespace-nowrap">
        <p className=" text-xs text-blue-500">{title}</p>
      </div>
    </div>
  );
};

export { TagCard };
