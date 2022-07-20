import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { createPost, updatePost } from '../../features/post/postSlice';
import ErrorPage from './ErrorPage';

/**
* @author
* @function NewPost
**/

const NewPost = () => {

    const [postTitle, setPostTitle] = useState('');
    const [postDescrip, setPostDescrip] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { title: postTitle, descrip: postDescrip };
        try {
            unwrapResult(await dispatch(createPost(newPost)));
            navigate('/');
        } catch (err) {
            setError(err);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedPost = { _id: id, title: postTitle, descrip: postDescrip };
        try {
            unwrapResult(await dispatch(updatePost(updatedPost)))
            navigate('/');

        } catch (err) {
            setError(err);
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            const getDetailPost = async (param) => {
                try {
                    const res = await axios.get(`/getPost/${param}`);
                    setPostTitle(res.data?.post?.title);
                    setPostDescrip(res.data?.post?.descrip);
                } catch (err) {
                    if (err.response.status === 400) {
                        setFetchError(err.response.data.message);
                    }
                }
            }
            getDetailPost(id);
        }
    }, [id]);

    useEffect(() => {
        setError(null)
    }, [postTitle, postDescrip])

    return (
        <div className="NewPost">
            {
                !fetchError ?
                    <>
                        <h2>{id === undefined ? 'New Post' : 'Edit Post'}</h2>
                        <form className="newPostForm" onSubmit={id === undefined ? handleSubmit : handleUpdate}>
                            <label htmlFor="postTitle">Title:<span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span></label>
                            <input
                                id="postTitle"
                                type="text"
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                                className={error ? 'text-validate' : null}
                            />
                            <label htmlFor="postDescrip">Post:</label>
                            <textarea
                                id="postDescrip"
                                required
                                value={postDescrip}
                                onChange={(e) => setPostDescrip(e.target.value)}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => navigate(-1)}>Back</button>
                            </div>
                        </form>
                    </> : <ErrorPage fetchError={fetchError} />
            }
        </div>
    )

}

export default NewPost;

