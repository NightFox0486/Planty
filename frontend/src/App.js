import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Header from './layout/Header';
import IndexPage from './pages/IndexPage';
// 식물 사전
import DictionaryPage from './pages/dictionary/DictionaryPage';
import DictionaryDetailPage from './pages/dictionary/DictionaryDetailPage';
// 읽을거리
import MagazinePage from './pages/magazine/MagazinePage';
import MagazineDetailPage from './pages/magazine/MagazineDetailPage';
// 나의 정원
import GardenPage from './pages/garden/GardenPage';
import GardenDetailPage from './pages/garden/GardenDetailPage';
// 남의 정원
import FeedListPage from './pages/feed/FeedListPage';
// 계정 관련
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<IndexPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route path="/dictionary" element={<Outlet />}>
          <Route path="" element={<DictionaryPage />} />
          <Route path=":plantId" element={<DictionaryDetailPage />} />
        </Route>

        <Route path="/magazine" element={<Outlet />}>
          <Route path="" element={<MagazinePage />} />
          <Route path=":articleId" element={<MagazineDetailPage />} />
        </Route>

        <Route path="/garden" element={<Outlet />}>
          <Route path="" element={<GardenPage />} />
          <Route path=":gardenId" element={<GardenDetailPage />} />
        </Route>
        <Route path="/feed" element={<FeedListPage />} />
      </Routes>
    </>
  );
};

export default App;
