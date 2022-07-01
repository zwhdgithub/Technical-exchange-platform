import request from '@/utils/request'
// import { getToken } from '@/utils/token'
// 接口方法, 只负责调用一个接口, 返回一个Promise对象
export const allChannelListAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
export const loginAPI = ({ mobile, code }) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
// 用户---刷新token
export const getNewTokenAPI = () => request({
  url: '/v1_0/authorizations',
  method: 'PUT',
  headers: {
    // 携带刷新token
    Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
  }

})
// 获取用户选择的频道
// 注意：用户没有登录，默认返回后台设置的默认频道列表
export const getUserChannelsAPI = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // }
  })
}
// 更新频道
export const updateChannelAPI = ({ channels }) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // },
    data: {
      channels
    }
  })
}
// 获取文章
export const articlesListAPI = ({ channelId, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // },
    // 这里的参数，axios会拼接在URL？后面（查询字符串）
    params: {
      channel_id: channelId,
      timestamp: timestamp || (new Date()).getTime()
    }
  })
}
// 对文章不感兴趣
export const articleDislikeAPI = ({ target }) => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: target
    }
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // }
  })
}
// 举报文章
export const articleReportsAPI = ({ target, type, remark }) => {
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // },
    data: {
      target,
      type,
      remark
    }
  })
}
// 获取-搜索联想
export const suggestListAPI = ({ q }) => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
// 获取搜索结果
export const searchResultListAPI = ({ page, perPage, q }) => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}
// 文章 - 详情
export const articleDetailAPI = ({ id }) => {
  return request({
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // },
    // :id是后台规定的参数名
    // 前端要在对应路径位置传值(不要写:)
    url: `/v1_0/articles/${id}`
  })
}
// 关注用户
export const followedUserAPI = ({ target }) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // },
    data: {
      target
    }
  })
}
// 文章 - 取消关注作者
export const unFollowedUserAPI = ({ uid }) => {
  return request({
    url: `/v1_0/user/followings/${uid}`,
    method: 'DELETE'
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // }
  })
}
// 文章 - 点赞
export const articleLikeAPI = ({ target }) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: target
    }
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // }
  })
}

// 文章 - 取消点赞
export const articleDisLikeAPI = ({ artId }) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // }
  })
}
// 评论 - 获取列表
// offset第一页时, 不用在params携带(axios发现值为null会自动忽略此参数)
export const commentListAPI = ({ artId, offset = null, limit = 10 }) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source: artId,
      offset,
      limit
    }
  })
}
// 评论 - 喜欢
export const commentLikingAPI = ({ comId }) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}
// 评论-取消喜欢
export const commentDisLikingAPI = ({ comId }) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}
// 评论 - 发布
export const sendCommentAPI = ({ artId, content }) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // },
    data: {
      target: artId,
      content: content
    }
  })
}
// 用户 - 基本资料
export const userInfoAPI = () => {
  return request({
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // },
    url: '/v1_0/user'
  })
}
// 用户- 个人资料(就为了获取生日)
export const userProfileAPI = () => {
  return request({
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // },
    url: '/v1_0/user/profile'
  })
}
// 用户- 更新头像
// 注意: formObj的值必须是一个表单对象
// '{"a": 10, "b": 20}' // 对象格式的JSON字符串
// new FormData() // 表单对象
export const updatePhotoAPI = ({ formObj }) => {
  return request({
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // },
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: {
      photo: formObj
    }
    // 如果你的请求体内容是表单对象, 浏览器会自动携带请求头Content-Type为multipart/form-data
  })
}
// 用户 - 更新资料
export const updateProfileAPI = ({ birthday, userName }) => {
  return request({
    // headers: {
    //   Authorization: `Bearer ${getToken()}`
    // },
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      birthday: birthday,
      name: userName
    }
  })
}
