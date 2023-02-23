import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../utility/api"
import authHeader from "../utility/AuthHeader";
import AuthHeader from "../utility/AuthHeader";

const initialState = {
    categories: [],
    posts: [],
    postDetail: {},
    message: null
}

export const getCategories = createAsyncThunk('getCategories', async () => {
    try {
        const response = await api().get('/categories');
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
})

export const getPostByCategoryId = createAsyncThunk('getPostByCategoryId', async (categoryId) => {

    try {
        const response = await api().get(`/categories/${categoryId}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const getPosts = createAsyncThunk('getPosts', async () => {
    try {
        const response = await api().get('/posts');
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const getPostById = createAsyncThunk('getPostById', async (postId) => {
    try {
        const response = await api().get(`/post/${postId}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const getPostByUserId = createAsyncThunk('getPostByUserId', async (userId) => {
    try {
        const response = await api().get(`/post/user/${userId}`, { headers: AuthHeader() });
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const addPost = createAsyncThunk('addPost', async (post) => {
    try {
        const response = await api().post('/post', post, { headers: AuthHeader() });
        return response.data;
    } catch (err) {
        console.log(err);
    }
})

export const editPost = createAsyncThunk('editPost', async (post) => {
    try {
        const response = await api().put('/post', post, { headers: AuthHeader() });
        return response.data;
    } catch (err) {
        console.log(err);
    }
})
export const deletePost = createAsyncThunk('deletePost', async (postId) => {
    try {
        const response = await api().delete(`/post/${postId}`, { headers: AuthHeader() });
        return postId;
    } catch (err) {
        console.log(err);
    }
})
export const addComment = createAsyncThunk('addComment', async (data) => {
    try {
        const response = await api().post('/comment', data, { headers: authHeader() });
        return data;
    } catch (err) {
        console.log(err);
    }
})
const post = createSlice({
    name: 'post',
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload.categories;
            state.message = action.payload.message;
        })
        builder.addCase(getPostByCategoryId.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.message = action.payload.message;
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.message = action.payload.message;
        })
        builder.addCase(getPostById.fulfilled, (state, action) => {
            state.postDetail = action.payload.post;
            state.message = action.payload.message;
        })
        builder.addCase(getPostByUserId.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.message = action.payload.message;
        })
        builder.addCase(editPost.fulfilled, (state, action) => {
            state.postDetail = action.payload.post;
            state.message = action.payload.message;
        })
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.postDetail.comments.push(action.payload);
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter(p => p._id != action.payload);
            state.message = action.payload.message;
        })
    }
})

export default post.reducer;