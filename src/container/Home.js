import React, { Component } from 'react';
import Roxik from '../components/Roxik';
import './Home.scss';

const Home = () => (
  <div className='home'>
    <h1 className='site-title'>Three.js Roxik Sharikura demo</h1>
    <Roxik />
  </div>
);

export default Home;
