import styled from "styled-components";
import { responsiveProps } from "../../../effects/useResponsive";

const Root = styled.div<{ resx?: responsiveProps }>`
  font-family: "Poppins";
`;

export const AttributeWrapper = styled(Root)`
  align-items: center;
  background: #2a2a2a;
  border-radius: 3px;
  display: flex;
  height: ${p => p.resx && p.resx.isBigScreen ? "1.75rem" : "1.5rem"};
  justify-content: flex-start;
  min-width: 7rem;
`;

export const AttributeLabel = styled(Root)`
  align-items: center;
  color: #fff;
  display: flex;
  font-size: ${p => p.resx?.isBigScreen ? ".9rem" : ".75rem"};
  font-weight: 400;
  justify-content: flex-start;
  padding-left: .5rem;
  text-align: center;
  & span {
    margin-right: .4rem;
  }
`;

export const AttributeValue = styled(Root)`
  align-items: center;
  background-color: rgba(204,0,0,0.8);
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  color: #fff;
  display: flex;
  font-size: ${p => p.resx?.isBigScreen ? ".9rem" : ".75rem"};
  font-weight: 300;
  height: 100%;
  margin-left: auto;
  padding: 0 .5rem;
  white-space: nowrap;
`;

export const IconWrapper = styled(Root)`
  display: flex;
  height: 29px;
  width: 20px;
  & svg {
    width: 100%;
  }
`