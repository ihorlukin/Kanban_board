import axiosClient from "./axiosClient"

const authApi = {
  signup: params => axiosClient.post('auth/signup', params),
  login: params => axiosClient.post('auth/signin', params),
  verifyToken: () => axiosClient.post('auth/verify-token')
}

export default authApi