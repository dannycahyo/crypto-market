import {
  SearchAssetWidget,
  TagListWidget,
  TokenListWidget,
  TopMoverWidget,
} from "src/market/widgets";
import { Container } from "src/uikits";

const MarketListScreen = () => {
  return (
    <Container>
      <SearchAssetWidget />
      <TopMoverWidget />
      <TagListWidget />
      <div className="divider my-0 before:bg-gray-800 after:bg-black" />
      <TokenListWidget source="market" />
    </Container>
  );
};

export { MarketListScreen };
