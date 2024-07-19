import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { useProducts } from "../../../api/itemApi"; // React Query 훅
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { Product } from "../../../types/productTypes";
import styled from "styled-components";
import { MarketSectionTitle } from "../MarketStyles";

const BestItemsContainer = styled.div`
  padding-top: 17px;
  padding-bottom: 24px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-bottom: 40px;
  }
`;

const BestItemsCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px 8px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 1;
  } else if (width < 1280) {
    return 2;
  } else {
    return 4;
  }
};

const BestItemsSection: React.FC = () => {
  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data: itemListResponse, isLoading, error } = useProducts({
    orderBy: "favorite",
    pageSize,
  });

  const itemList = itemListResponse?.list || [];

  if (error) {
    console.error("오류: ", (error as Error).message);
  }

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <BestItemsContainer>
        <MarketSectionTitle>베스트 상품</MarketSectionTitle>

        <BestItemsCardSection>
          {itemList.map((item: Product) => (
            <ItemCard product={item} key={`best-item-${item.id}`} />
          ))}
        </BestItemsCardSection>
      </BestItemsContainer>
    </>
  );
};

export default BestItemsSection;
