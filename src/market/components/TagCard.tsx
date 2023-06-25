import Image from "next/image";

import type React from "react";

type TagCardProps = {
  iconURL: string;
  title: string;
};

const TagCard: React.FC<TagCardProps> = ({ iconURL, title }) => {
  return (
    <div className="inline-flex  flex-row items-center justify-between rounded-lg bg-blue-200/[1] p-2 text-blue-500">
      <Image src={iconURL} width={32} height={32} alt={title} />
      <span className="ml-2 text-base text-blue-500">{title}</span>
    </div>
  );
};

export { TagCard };
