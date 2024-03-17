import axiosClient from './axiosClient'

const boardApi = {
  create: () => axiosClient.post('boards'),
  getAll: () => axiosClient.get('boards'),
  updatePosition: (params) => axiosClient.put('boards', params),
  getOne: (boardId) => axiosClient.get(`boards/${boardId}`),
  delete: (id) => axiosClient.delete(`boards/${id}`),
  update: (boardId, params) => axiosClient.put(`boards/${boardId}`, params),
  getFavourites: () => axiosClient.get('boards/favourites'),
  updateFavouritePosition: (params) => axiosClient.put('boards/favourites', params)
}

export default boardApi