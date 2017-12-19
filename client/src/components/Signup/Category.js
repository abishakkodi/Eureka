import React, { Component } from 'react';



const Category = function(props) {
  return (
    <div>
      <div onClick={() => props.handleClickCategory(props.categoryName)}>
		  <span>{props.categoryName}</span> 
      </div>

    </div>
  )
}

export default Category;

// <div className='recentVideo' onClick={() => props.playClickedVideo(props.video)}>
