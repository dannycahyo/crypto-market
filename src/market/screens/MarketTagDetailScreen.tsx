import { MarketTagDetailTopSection, TokenListWidget } from "src/market/widgets";

import { Container } from "src/uikits";

import type React from "react";
import type { MarketTagDetailScreenProps } from "src/pages/market/tags/[slug]";

const MarketTagDetailScreen: React.FC<MarketTagDetailScreenProps> = ({
  slug,
}) => {
  return (
    <Container>
      <MarketTagDetailTopSection slug={slug} />
      <TokenListWidget source="market-tag" slug={slug} />
    </Container>
  );
};

export { MarketTagDetailScreen };
