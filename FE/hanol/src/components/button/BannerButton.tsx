import React from 'react';
import { ReactComponent as EastArrowIcon } from '../../assets/icons/east_arrow_icon.svg';
import styled from 'styled-components';

const BannerButton = () => {
  return (
    <BannerButtonBox>
      <div className="buton_content">내 두피 분석 하러가기</div>
      <ArrowEclipse>
        <EastArrowIcon className="arrow_icon" />
      </ArrowEclipse>
    </BannerButtonBox>
  );
};

const ArrowEclipse = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.9rem;
  height: 1.9rem;
  flex-shrink: 0;
  background-color: rgba(188, 255, 223, 0.23);
  border-radius: 99px;
  margin-right: 0.643rem;

  .arrow_icon {
    width: 1.285rem;
    height: 1.375rem;
  }
`;

const BannerButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 4.5rem;
  flex-shrink: 0;
  background-color: #3fcc8a;
  border-radius: 12px;
  align-items: center;

  .buton_content {
    display: flex;

    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;

    margin-left: 0.643rem;
    color: var(--white, #fffeff);

    /* Depth2 Header */
    font-family: Noto Sans KR;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px; /* 23.8px */
    letter-spacing: 0.15px;
  }
`;
export default BannerButton;