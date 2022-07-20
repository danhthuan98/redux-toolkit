/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

/**
* @author
* @function PostPage
**/

const Post = ({ post }) => {

    const date = new Date(post?.createdAt);

    return (
        <article className="post">
            <Link to={`/post/${post._id}`}>
                <h2>{post.title}</h2>
            </Link>
            <p className="postDate">{`Created At: ${date.toString().substring(4, 15)} ${date.toLocaleTimeString()}`}</p>
            <div className='hover-actions-trigger' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="postBody">
                    {post.descrip}
                </p>
                <Popconfirm
                    title="Are you sure to delete this post?"
                    placement='topLeft'
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger style={{ height: '25%' }} className='hover-actions'>Delete</Button>
                </Popconfirm>
            </div>
        </article>
    )
}

export default Post;