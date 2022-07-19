/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CounterPage from './components/counter';
import Layout from './components/layout';
import PostPage from './components/post';
import { unwrapResult } from '@reduxjs/toolkit';
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
        <Route path="/count" element={<CounterPage />} />
        <Route path="/" element={<PostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
