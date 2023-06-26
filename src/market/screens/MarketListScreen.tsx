import { TagListWidget, TokenListWidget } from "src/market/widgets";
import { Container } from "src/uikits";

const MarketListScreen = () => {
  return (
    <Container>
      <TagListWidget />
      <div className="divider my-0 before:bg-gray-800 after:bg-black" />
      <TokenListWidget />
    </Container>
  );
};

export { MarketListScreen };
