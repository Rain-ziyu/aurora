import axios from 'axios'
import { app } from '@/main'

axios.interceptors.request.use((config: any) => {
  config.headers['token'] = sessionStorage.getItem('token')
  // 预留之后使用
  config.headers['refreshToken'] = sessionStorage.getItem('refreshToken')
  return config
})

axios.interceptors.response.use(
  (response) => {
    switch (response.data.result) {
      case 1:
        app.config.globalProperties.$notify({
          title: 'Error',
          message: response.data.message,
          type: 'error'
        })
        break
      case 510:
        app.config.globalProperties.$notify({
          title: 'Error',
          message: '用户未登录',
          type: 'error'
        })
        break
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default {
  getTopAndFeaturedArticles: () => {
    return axios.get('/api/articles/topAndFeatured')
  },
  getArticles: (params: any) => {
    return axios.get('/api/articles/all', { params: params })
  },
  getArticlesByCategoryId: (params: any) => {
    return axios.get('/api/articles/categoryId', { params: params })
  },
  getArticeById: (articleId: any) => {
    return axios.get('/api/articles/' + articleId)
  },
  getAllCategories: () => {
    return axios.get('/api/categories/all')
  },
  getAllTags: () => {
    return axios.get('/api/tags/all')
  },
  getTopTenTags: () => {
    return axios.get('/api/tags/topTen')
  },
  getArticlesByTagId: (params: any) => {
    return axios.get('/api/articles/tagId', { params: params })
  },
  getAllArchives: (params: any) => {
    return axios.get('/api/archives/all', { params: params })
  },
  login: (params: any) => {
    return axios.post('/api/login', params)
  },
  getCurrentUserInfo: () => {
    return axios.get('/api/users/info')
  },
  saveComment: (params: any) => {
    return axios.post('/api/comments/save', params)
  },
  getComments: (params: any) => {
    return axios.get('/api/comments', { params: params })
  },
  getTopSixComments: () => {
    return axios.get('/api/comments/topSix')
  },
  getAbout: () => {
    return axios.get('/api/about')
  },
  getFriendLink: () => {
    return axios.get('/api/links')
  },
  submitUserInfo: (params: any) => {
    return axios.put('/api/users/info', params)
  },
  getUserInfoById: (id: any) => {
    return axios.get('/api/users/info/' + id)
  },
  updateUserSubscribe: (params: any) => {
    return axios.put('/api/users/subscribe', params)
  },
  sendValidationCode: (username: any) => {
    return axios.get('/api/users/code', {
      params: {
        username: username
      }
    })
  },
  bindingEmail: (params: any) => {
    return axios.put('/api/users/email', params)
  },
  register: (params: any) => {
    return axios.post('/api/users/register', params)
  },
  searchArticles: (params: any) => {
    return axios.get('/api/articles/search', {
      params: params
    })
  },
  getAlbums: () => {
    return axios.get('/api/photos/albums')
  },
  getPhotosBuAlbumId: (albumId: any, params: any) => {
    return axios.get('/api/albums/' + albumId + '/photos', {
      params: params
    })
  },
  getWebsiteConfig: () => {
    return axios.get('/api')
  },
  qqLogin: (params: any) => {
    return axios.post('/api/users/oauth/qq', params)
  },
  report: () => {
    axios.post('/api/report')
  },
  getTalks: (params: any) => {
    return axios.get('/api/talks', {
      params: params
    })
  },
  getTalkById: (id: any) => {
    return axios.get('/api/talks/' + id)
  },
  logout: () => {
    return axios.post('/api/logout')
  },
  getRepliesByCommentId: (commentId: any) => {
    return axios.get(`/api/comments/${commentId}/replies`)
  },
  updatePassword: (params: any) => {
    return axios.put('/api/users/password', params)
  },
  accessArticle: (params: any) => {
    return axios.post('/api/articles/access', params)
  }
}
