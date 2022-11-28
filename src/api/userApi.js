import axiosClient from './axiosClient';

const userApi = {
  getProfile: () => {
    const url = '/user/profile';
    return axiosClient.get(url);
  },
  addNewComment: (data) => {
    const url = `/comments/create`;
    return axiosClient.post(url, data);
  },
  updateLikedMovie: (data) => {
    const url = `/user/liked-movies/update`;
    return axiosClient.patch(url, data);
  },
  getListLikedMovie: () => {
    const url = `/user/liked-movies`;
    return axiosClient.get(url);
  },
};

export default userApi;
