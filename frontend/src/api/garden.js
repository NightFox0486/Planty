import client from './client';

export const gardenList = async (userName) => {
  const response = client.get(`mygardens/user/${userName}`);

  return response;
};

export const gardenUser = async (userName) => {
  const response = client.get(`accounts/profile/${userName}`);

  return response;
};

export const gardenCreate = async (params) => {
  const configs = {
    'Content-Type': 'multipart/form-data',
  };
  const response = client.post('mygardens/', params, configs);

  return response;
};

export const postFollowUser = async (username) => {
  const response = client.post(`accounts/follow/${username}/`);

  return response;
};

export const userPlant = async (username) => {
  const response = client.get(`mygardens/user/${username}/`);

  return response;
};

export const userFeed = async (username) => {
  const response = client.get(`feeds/user/${username}/`);

  return response;
};

export const myGarden = async (mygardenId) => {
  const response = client.get(`mygardens/${mygardenId}/`);

  return response;
};

export const diaryCreate = async ({ mygardenId, params }) => {
  const response = client.post(`mygardens/${mygardenId}/diary/`, params);

  return response;
};

export const gardenDiary = async ({ gardenId, diaryId }) => {
  const response = client.get(`mygardens/${gardenId}/diary/${diaryId}`);

  return response;
};
