const BASE_URL = `${process.env.API_URL}:${process.env.PORT}/`;
const urls = {
    API_URL: `${process.env.API_URL}:${process.env.PORT}/`,
    GET_IMAGE: `${BASE_URL}image/{key}`,
    UPLOAD_IMAGE: `${BASE_URL}image`,
    CREATE_BLOG: `${BASE_URL}createBlog`,
    GET_ALL_BLOGS: `${BASE_URL}getAllBlogs`,
    LOGIN: `${BASE_URL}login`,
    REGISTER: `${BASE_URL}register`,
    GET_BLOG: `${BASE_URL}getBlog/{blogId}`,
    GET_BLOG_BY_USER: `${BASE_URL}getRecentBlogs/{username}`,
    TOGGLE_BOOKMARK: `${BASE_URL}toggleBookmark/{blogId}`,
    GET_BOOKMARKED_BLOGS: `${BASE_URL}getBookmarkedBlogs/{username}`,
    GET_COMMENTS: `${BASE_URL}comments/{blogId}`,
    POST_COMMENTS: `${BASE_URL}comments/{blogId}`,
    GET_USER: `${BASE_URL}user/{username}`,
    UPDATE_PROFILE: `${BASE_URL}updateprofile/{userId}`,
    FOLLOW_USER: `${BASE_URL}follow/{userId}/{authorId}`,
}

export default urls;