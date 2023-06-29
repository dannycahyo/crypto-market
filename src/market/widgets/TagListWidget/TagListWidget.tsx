import Link from "next/link";
import { TagCard } from "src/market/components";
import { useGetMarketTags } from "src/market/services";
import { GeneralError, Skeleton } from "src/uikits";

const TagListWidget = () => {
  const {
    data: marketTags,
    isLoading: isLoadingMarketTags,
    isError: isErrorMarketTags,
  } = useGetMarketTags({
    language: "ID",
    sort: "ASC",
  });

  if (isLoadingMarketTags) return <Skeleton />;
  if (isErrorMarketTags)
    return (
      <GeneralError message="There is something wrong when getting the tag list content. Please try again later." />
    );

  return (
    <div className="mb-4 overflow-x-auto whitespace-nowrap">
      <div className="flex gap-2">
        {marketTags?.map((tag) => (
          <Link href={`/market/tags/${tag.slug}`} key={tag.id}>
            <TagCard title={tag.title} iconURL={tag.icon.url} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export { TagListWidget };
