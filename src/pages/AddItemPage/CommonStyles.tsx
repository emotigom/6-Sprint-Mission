import styled, { DefaultTheme } from "styled-components";

// 스타일 컴포넌트의 props 타입 정의
interface ContainerProps {
  theme: DefaultTheme;
}
interface FlexContainerProps extends ContainerProps {
  justifyContent?: string;
  alignItems?: string;
}
// 스타일 컴포넌트 타입 정의
export const Container = styled.div<ContainerProps>`
  /* 스타일 정의 */
`;

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "flex-start"};
`;

export const SectionTitle = styled.h2`
  /* 스타일 정의 */
`;

export const Button = styled.button<{ disabled?: boolean }>`
  /* 스타일 정의 */
`;
