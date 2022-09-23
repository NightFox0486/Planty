import React, { useState } from 'react';
import styled from 'styled-components';
import GardenItem from '../../components/garden/GardenItem';
import GardenUserInfo from '../../components/garden/GardenUserInfo';
import GardenCreateModal from '../../components/garden/GardenCreateModal';

const dummyPlants = [
  {
    cntntsSj: '해바라기',
    date_grow: '2022.09.05',
  },
  {
    cntntsSj: '무궁화',
    date_grow: '2022.09.05',
  },
  {
    cntntsSj: '방울 토마토',
    date_grow: '2022.09.05',
  },
  {
    cntntsSj: '해바라기',
    date_grow: '2022.09.05',
  },
  {
    cntntsSj: '무궁화',
    date_grow: '2022.09.05',
  },
  {
    cntntsSj: '방울 토마토',
    date_grow: '2022.09.05',
  },
];

const GardenPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <GardenCreateModal modalOpen={modalOpen} closeModal={closeModal} />
      <Wrapper>
        <GardenUserInfo />
        <div className="toggle-div">
          <span>|</span>
          <div className="toggle-btn1">반려식물</div>
          <div className="toggle-btn2">피드</div>
        </div>
        <GardenWrapper>
          <button onClick={openModal}>식물 등록</button>
          {dummyPlants.map((plant, idx) => (
            <GardenItem plant={plant} key={idx} />
          ))}
        </GardenWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;

  flex-direction: column;
  & .toggle-div {
    position: relative;
    width: 300px;
    & span {
      position: absolute;
      left: 50%;
    }
    height: 50px;
    display: flex;
    align-items: end;
    justify-content: center;
    font-size: 20px;
  }
  & .toggle-btn1 {
    position: absolute;
    /* top: 0; */
    left: 50%;
    transform: translateX(calc(-100% - 16px));
  }
  & .toggle-btn2 {
    position: absolute;
    left: 50%;
    transform: translateX(20px);
  }
`;

const GardenWrapper = styled.div`
  margin-top: 80px;
  position: relative;
  display: grid;
  justify-content: center;
  grid-column-gap: 14px;
  grid-row-gap: 20px;
  background-color: white;
  & button {
    position: absolute;
    right: 0;
    transform: translateY(-140%);
    background-color: ${({ theme }) => theme.themeColor[1]};
    color: white;
    border: none;
    border-radius: 10px;
    width: 130px;
    height: 42px;
    font-size: 20px;
  }

  /* 반응형 */
  @media (min-width: 1500px) {
    grid-template-columns: repeat(3, 436px);
    width: 1336px;
  }
  @media (max-width: 1499px) and (min-width: 1021px) {
    grid-template-columns: repeat(2, 436px);
    width: 886px;
  }
  @media (max-width: 1020px) and (min-width: 801px) {
  }
  @media (max-width: 800px) {
  }
`;

export default GardenPage;