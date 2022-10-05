import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from '../features/user/userSlice';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Wrapper = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & .btn1 {
    position: absolute;
    margin-left: 40px;
    margin-top: -5px;
  }

  & .nav-logo-img {
    height: 40px;
  }

  & .nav-user-btn {
    & a {
      position: relative;
      margin-left: 16px;
      background-image: 'url( ${require('../image/2.png')} )';
      @media (max-width: 992px) {
        margin-left: 0px;
        margin-right: 16px;
      }
    }
  }

  & .user-info {
    display: flex;
    align-items: center;
  }

  & .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.themeColor[5]};
    margin-left: 8px;
  }

  & .mygarden-disabled {
    cursor: default;
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
  justify-content: end;

  @media (max-width: 992px) {
    width: 100%;
    margin-left: 0px;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  & button {
    margin-right: 5%;
    border: 0px;
    background: white;
    font-size: 16px;
    padding: 0;
  }
`;

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [curIndex, setCurindex] = useState(0);

  const LogOutHandler = () => {
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('Token');
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    Aos.init({ once: false });
  }, []);

  return (
    <Wrapper>
      <Navbar bg="white" expand="lg" className="mb-3" style={{ zIndex: '999' }}>
        <Container>
          <Navbar.Brand href="/index" className="me-5">
            <img
              data-aos="fade-down"
              src="/assets/img/nav-logo.png"
              alt=""
              className="nav-logo-img"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-between">
            <Nav>
              <Col lg={3} className="mb-2 mt-2">
                <Link
                  className="me-4 link"
                  to="/dictionary"
                  onClick={() => {
                    setCurindex(1);
                  }}
                >
                  {curIndex === 1 && (
                    <img
                      width="30px"
                      height="40px"
                      src={require('../image/2.png')}
                      className="btn1"
                    />
                  )}
                  식물 사전
                </Link>
              </Col>
              <Col lg={3} className="mb-2 mt-2 btn2">
                <Link
                  className="me-4"
                  to="/magazine"
                  onClick={() => {
                    setCurindex(2);
                  }}
                >
                  {curIndex === 2 && (
                    <img
                      width="30px"
                      height="40px"
                      src={require('../image/3.png')}
                      className="btn1"
                    />
                  )}
                  읽을 거리
                </Link>
              </Col>
              <Col lg={3} className="mb-2 mt-2">
                {userInfo ? (
                  <Link
                    className="me-4 btn3"
                    to={`/garden/${userInfo?.username}`}
                    onClick={() => {
                      setCurindex(3);
                    }}
                  >
                    {curIndex === 3 && (
                      <img
                        width="30px"
                        height="40px"
                        src={require('../image/3.png')}
                        className="btn1"
                      />
                    )}
                    나의 정원
                  </Link>
                ) : (
                  <Link className="me-4 btn3" to={'/login/'}>
                    나의 정원
                  </Link>
                )}
              </Col>
              <Col lg={3} className="mb-2 mt-2">
                <Link
                  className="me-4"
                  to="/feed"
                  onClick={() => {
                    setCurindex(4);
                  }}
                >
                  {curIndex === 4 && (
                    <img
                      width="30px"
                      height="40px"
                      src={require('../image/3.png')}
                      className="btn1"
                    />
                  )}
                  남의 정원
                </Link>
              </Col>
            </Nav>
            {userInfo ? (
              <UserInfoWrapper>
                <button onClick={LogOutHandler}>로그아웃</button>
                <Link to={`/profile/${userInfo.username}`}>
                  <div className="user-info">
                    <div className="user-name">{userInfo.username}</div>
                    <img
                      className="profile-img"
                      src={userInfo.profile_img}
                      alt=""
                    />
                  </div>
                </Link>
              </UserInfoWrapper>
            ) : (
              <div className="nav-user-btn">
                <Link to="login">로그인</Link>
                <Link to="register">회원가입</Link>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Wrapper>
  );
}

export default React.memo(Header);
