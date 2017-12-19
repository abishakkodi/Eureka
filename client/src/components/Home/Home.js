import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/style.css';
import './home.css';
import NavHome from '../Nav/NavHome';
import Header from './Header';
import TopVideos from './TopVideos';
import HowItWorks from './HowItWorks';
import RecEngineInfo from './RecEngineInfo';
import FeaturedOne from './FeaturedOne';
import FeaturedTwo from './FeaturedTwo';


const Home = function(props) {
  return (
    <div>
      <Header handleClickCategory={props.handleClickCategory}/>
      <TopVideos />   
      <HowItWorks />
      <RecEngineInfo currentPage={props.currentPage} />
      <FeaturedOne />
      <FeaturedTwo />
    </div>
  )
};
 

export default Home;
