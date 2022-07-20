/* eslint-disable react-hooks/exhaustive-deps */
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import PostPage from './components/post';
import NewPost from './components/post/NewPost';
import { fetchPosts } from './features/post/postSlice';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        unwrapResult(await dispatch(fetchPosts()));
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/post/newpost" element={<NewPost />} />
        <Route path="/post/:id" element={<NewPost />} />
        <Route path="/" element={<PostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
