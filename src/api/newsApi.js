import axiosClient from './axiosClient';

const newsApi = {
  getPagingNews: (params) => {
    const url = '/news/getPagingNews';
    return axiosClient.get(url, { params });
  },
  insertNews: (data) => {
    const url = '/news/insert';
    console.log(data, 'sss');
    return axiosClient.post(url, data);
  },
  updateNews: (id, data) => {
    const url = `/news/update/${id}`;
    return axiosClient.put(url, data);
  },
  deleteNews: (id) => {
    const url = `/news/delete/${id}`;
    return axiosClient.delete(url);
  },
  getById: (id) => {
    const url = `/news/getNewById/${id}`;
    return axiosClient.get(url);
  },
  getBySlug: (slug) => {
    const url = `/news/getNewBySlug/${slug}`;
    return axiosClient.get(url);
  },
  getPagingByCate: (cateSlug, data) => {
    const url = `/news/getNewsByCategory/${cateSlug}`;
    return axiosClient.get(url, data);
  },
  getByCount: (data) => {
    const url = `/news/getNewsByCount`;
    return axiosClient.get(url);
  },
  getRelative: (slug, data) => {
    const url = `/news/getRelativeNews/${slug}?category=${data.category}`;
    return axiosClient.get(url);
  },
};

export default newsApi;
