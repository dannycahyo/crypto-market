import { MarketTagDetailTopSection, TokenListWidget } from "src/market/widgets";

import { Container } from "src/uikits";

const MarketTagDetailScreen = () => {
  return (
    <Container>
      <MarketTagDetailTopSection />
      <TokenListWidget source="market-tag" />
    </Container>
  );
};

export { MarketTagDetailScreen };
