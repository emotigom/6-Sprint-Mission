import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg";
import DropdownMenu from "../../../components/UI/DropdownMenu";
import PaginationBar from "../../../components/UI/PaginationBar";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { useProducts } from "../../../api/itemApi"; // React Query 훅
import { MarketSectionTitle } from "../MarketStyles";
import styled from "styled-components";
import { StyledLink } from "../../../styles/CommonStyles";
import { Product } from '../../../types/productTypes';

const AllItemsSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:first-child {
    padding-bottom: 8px;
  }

  &:nth-child(2) {
    padding-bottom: 16px;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  background-color: var(--gray-100);
  border-radius: 12px;
  padding: 9px 16px;
  flex: 1;
  align-items: center;
`;

const SearchBarInput = styled.input`
  border: none;
  flex: 1;
  background-color: inherit;
  margin-left: 4px;

  &::placeholder {
    color: var(--gray-400);
    font-size: 16px;
  }

  &:focus {
    outline: none;
  }
`;

const AddItemLink = styled(StyledLink)``;

const AllItemsCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 8px;

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 40px 24px;
  }
`;

const PaginationBarWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 80px;
`;

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1280) {
    return 6;
  } else {
    return 10;
  }
};


const AllItemsSection: React.FC = () => {
  const [orderBy, setOrderBy] = useState<ProductSortOption>("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  
  const { data: itemListResponse, isLoading, error } = useProducts({
    orderBy,
    page,
    pageSize,
  });

  const itemList = itemListResponse?.list || [];
  const totalPageNum = itemListResponse ? Math.ceil(itemListResponse.totalCount / pageSize) : 1;

  const handleSortSelection = (sortOption: ProductSortOption) => {
    setOrderBy(sortOption);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <div>
        <AllItemsSectionHeader>
          <MarketSectionTitle>판매 중인 상품</MarketSectionTitle>
          <AddItemLink to="/additem">상품 등록하기</AddItemLink>
        </AllItemsSectionHeader>

        <AllItemsSectionHeader>
          <SearchBarWrapper>
            <SearchIcon />
            <SearchBarInput placeholder="검색할 상품을 입력해 주세요" />
          </SearchBarWrapper>
          <DropdownMenu onSortSelection={handleSortSelection} />
        </AllItemsSectionHeader>

        <AllItemsCardSection>
          {itemList?.map((item: Product) => (
            <ItemCard key={item.id} item={item} />
          ))}
          
        </AllItemsCardSection>

        {itemList && (
          <PaginationBarWrapper>
            <PaginationBar
              totalPageNum={totalPageNum}
              activePageNum={page}
              onPageChange={onPageChange}
            />
          </PaginationBarWrapper>
        )}
      </div>
    </>
  );
};
export type ProductSortOption = "recent" | "favorite" | "price";
export default AllItemsSection;
