import axios from 'axios';
import URLS from './urls'

export const getBlog = (blogId) => axios.get(URLS.GET_BLOG.replace('{blogId}', blogId));

export const getBlogsByUser = (username) => axios.get(URLS.GET_BLOG_BY_USER.replace('{username}', username))

export const toggleBookmark = (blogId) => axios.get(URLS.TOGGLE_BOOKMARK.replace('{blogId}', blogId))

export const getBookmarkedBlogs = (username) => axios.get(URLS.GET_BOOKMARKED_BLOGS.replace('{username}', username))