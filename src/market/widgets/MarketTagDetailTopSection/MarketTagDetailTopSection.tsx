import Link from "next/link";
import Image from "next/image";

import { useGetMarketTagDetail } from "src/market/services";
import { Skeleton } from "src/uikits";

import type React from "react";
type MarketTagDetailTopSectionProps = {
  slug: string;
};

const MarketTagDetailTopSection: React.FC<MarketTagDetailTopSectionProps> = ({
  slug,
}) => {
  const { data: marketTags, isLoading: isLoadingMarketTags } =
    useGetMarketTagDetail({ language: "ID", slug });

  const marketDetail = marketTags?.[0];

  return (
    <div>
      {isLoadingMarketTags ? (
        <Skeleton />
      ) : (
        <>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link href="/">Harga Crypto</Link>
              </li>
              <li>{`${marketDetail?.title} Category`}</li>
            </ul>
          </div>
          <div className="mb-4 mt-6 flex items-center gap-4">
            <Image
              alt={marketDetail?.title ?? ""}
              width={28}
              height={28}
              src={marketDetail?.icon.url ?? ""}
            />
            <h1 className="text-md text-black sm:text-2xl">
              {marketDetail?.title}
            </h1>
          </div>
          <p className="text-md mb-">{marketDetail?.subtitle}</p>
        </>
      )}
    </div>
  );
};

export { MarketTagDetailTopSection };
