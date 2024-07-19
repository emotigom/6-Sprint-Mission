import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, LineDivider, StyledLink } from "../../styles/CommonStyles";
import ItemProfileSection from "./components/ItemProfileSection";
import ItemCommentSection from "./components/ItemCommentSection";
import { ReactComponent as BackIcon } from "../../assets/images/icons/ic_back.svg";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useProductDetail } from "../../api/itemApi";

const BackToMarketPageLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
`;

const ItemPage: React.FC = () => {
  const { productId } = useParams();
  const productIdNumber = Number(productId);
  
  const { data: product, error, isLoading } = useProductDetail(productIdNumber);

  if (error) {
    alert(`오류: ${(error as Error).message}`);
  }

  if (!productId || !product) return null;

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <Container>
        <ItemProfileSection product={product} />

        <LineDivider />

        <ItemCommentSection productId={productIdNumber} />

        <BackToMarketPageLink $pill to="/items">
          목록으로 돌아가기
          <BackIcon />
        </BackToMarketPageLink>
      </Container>
    </>
  );
};

export default ItemPage;
