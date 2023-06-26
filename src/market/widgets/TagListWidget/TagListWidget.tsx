import Link from "next/link";
import { TagCard } from "src/market/components";
import { useGetMarketTags } from "src/market/services";
import { Skeleton } from "src/uikits";

const TagListWidget = () => {
  const { data: marketTags, isLoading: isLoadingMarketTags } = useGetMarketTags(
    {
      language: "ID",
      sort: "ASC",
    }
  );

  return (
    <div className="mb-4 overflow-x-auto whitespace-nowrap">
      {isLoadingMarketTags ? (
        <Skeleton />
      ) : (
        <div className="flex gap-2">
          {marketTags?.map((tag) => (
            <Link href={`/market/tags/${tag.slug}`} key={tag.id}>
              <TagCard title={tag.title} iconURL={tag.icon.url} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export { TagListWidget };
