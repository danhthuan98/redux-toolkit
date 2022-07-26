import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit'
import axios from '../../api/axios';


const initialState = {
    posts: [],
    isLoading: false,
    fetchError: null,
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('getPost')
            // The value we return becomes the `fulfilled` action payload
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (post, { rejectWithValue }) => {
        try {
            const response = await axios.post('postMessage', post)
            // The value we return becomes the `fulfilled` action payload
            return response.data;
        } catch (err) {
            if (err.code === 'ERR_NETWORK') {
                return rejectWithValue(err.message)
            }
            return rejectWithValue(err.response.data.error)
        }
    }
);

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (post, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`updatepost/${post._id}`, post)
            // The value we return becomes the `fulfilled` action payload
            return response.data;
        } catch (err) {
            if (err.code === 'ERR_NETWORK') {
                return rejectWithValue(err.message)
            }
            console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
);

export const postSlice = createSlice({
    name: 'post',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload.posts;
                state.fetchError = null;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.fetchError = action.payload;
            })
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                // state.isLoading = false;
                // state.posts.push(action.payload.post);
                return { ...state, isLoading: false, posts: [action.payload.post, ...state.posts] }
            })
            .addCase(updatePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const updatePosts = state.posts.map((post) => (
                    post._id === action.payload.updatePost._id ? action.payload.updatePost : post
                ))
                state = { ...state, isLoading: false, posts: updatePosts }
                return state;
            })
            .addCase(updatePost.rejected, (state, action) => {
                if (action.payload === 'Post has been no exists') {
                    const updatedPosts = state.posts.filter((post) => post._id !== action.meta.arg._id)
                    return { ...state, isLoading: false, posts: updatedPosts }
                } else {
                    const currentPosts = state.posts;
                    return { ...state, isLoading: false, posts: currentPosts }
                }
            })
    }
});

export default postSlice.reducer;