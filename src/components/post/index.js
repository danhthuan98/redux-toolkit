/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post';

/**
* @author
* @function PostPage
**/

const PostPage = () => {

    const data = useSelector(state => state.post);

    return (
        <div className="Home">
            {data?.isLoading && <p className="statusMsg">Loading posts...</p>}
            {!data?.isLoading && data?.fetchError && <p className="statusMsg" style={{ color: "red" }}>{data?.fetchError}</p>}
            {!data?.isLoading && !data?.fetchError && (
                data?.posts?.length > 0 ?
                    data?.posts?.map((post) => (
                        <Post key={post._id} post={post} />
                    )) : <p className="statusMsg">No posts to display.</p>)
            }
        </div>
    )
}

export default PostPage;