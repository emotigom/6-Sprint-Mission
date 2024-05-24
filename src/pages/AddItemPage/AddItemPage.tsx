import React, { useState } from "react";
import {
  Button,
  Container,
  FlexContainer,
  SectionTitle,
} from "../../styles/CommonStyles";
import styled from "styled-components";
import InputItem from "../../components/UI/InputItem";
import TagInput from "../../components/UI/TagInput";
import ImageUpload from "../../components/UI/ImageUpload";

interface AddItemPageState {
  name: string;
  description: string;
  price: string;
  tags: string[];
}

type AddItemPageProps = {};

type AddItemPageFunctions = {
  addTag: (tag: string) => void;
  removeTag: (tagToRemove: string) => void;
};

const AddItemPage: React.FC<AddItemPageProps> = () => {
  // 상태 관리
  const [state, setState] = useState<AddItemPageState>({
    name: "",
    description: "",
    price: "",
    tags: [],
  });

  // 함수 정의
  const addTag: AddItemPageFunctions["addTag"] = (tag) => {
    if (!state.tags.includes(tag)) {
      setState((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, tag],
      }));
    }
  };

  const removeTag: AddItemPageFunctions["removeTag"] = (tagToRemove) => {
    setState((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // 제출 버튼 활성화 조건
  const isSubmitDisabled =
    !state.name || !state.description || !state.price || !state.tags.length;

  return (
    <Container>
      <form>
        <TitleSection>
          <SectionTitle>상품 등록하기</SectionTitle>
          <Button type="submit" disabled={isSubmitDisabled}>
            등록
          </Button>
        </TitleSection>

        <InputSection>
          <ImageUpload title="상품 이미지" />

          <InputItem
            id="name"
            label="상품명"
            value={state.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setState((prevState) => ({ ...prevState, name: e.target.value }))
            }
            placeholder="상품명을 입력해 주세요"
            onKeyDown={() => {}}
            isTextArea={false}
          />

          <InputItem
            id="description"
            label="상품 소개"
            value={state.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setState((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            placeholder="상품 소개를 입력해 주세요"
            onKeyDown={() => {}}
            isTextArea
          />

          <InputItem
            id="price"
            label="판매 가격"
            value={state.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setState((prevState) => ({ ...prevState, price: e.target.value }))
            }
            placeholder="판매 가격을 입력해 주세요"
            onKeyDown={() => {}}
            isTextArea={false}
          />

          <TagInput
            tags={state.tags}
            onAddTag={addTag}
            onRemoveTag={removeTag}
          />
        </InputSection>
      </form>
    </Container>
  );
};

const TitleSection = styled(FlexContainer)`
  margin-bottom: 16px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 24px;
  }
`;

export default AddItemPage;
