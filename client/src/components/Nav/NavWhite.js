import React, { Component } from 'react';
import { Dropdown, Icon } from 'antd';
import './nav.css';
import bluebulb from '../../images/bluebulb.png';
const menuTopics = function(props) {
    return (
        <div>
            <ul>
                <li className='menuSubtopicWhite'><a href='#' name='Technology' onClick={props.handleClickCategory}> Technology </a></li>
                <li className='menuSubtopicWhite'><a href='#' name='Hobbies' onClick={props.handleClickCategory}> Hobbies </a></li>
                <li className='menuSubtopicWhite'><a href='#' name='Sports' onClick={props.handleClickCategory}> Sports </a></li>
                <li className='menuSubtopicWhite'><a href='#' name='Fashion' onClick={props.handleClickCategory}> Fashion </a></li>
                <li className='menuSubtopicWhite'><a href='#' name='Life Hacks' onClick={props.handleClickCategory}> Life Hacks </a></li>
                <li className='menuSubtopicWhite'><a href='#' name='Get Started...' onClick={props.handleClickCategory}> "Get Started..." </a></li>
            </ul>
        </div>
    )
};
const menuAccount = function(props) {

    return (
        <div>
            <ul>
                <li className='menuSubtopicWhite'><a href='#'>My MindFeed</a></li>
                <li className='menuSubtopic'><a href='#' onClick={props.goToAccount}>My Bookmarks</a></li>
                <li className='menuSubtopic'><a href='#' onClick={props.goToAccount}>Settings</a></li>
                <li className='menuSubtopic'><a href='#' onClick={props.logout}>Log Out</a></li>
            </ul>
        </div>
    )
};
const Nav = function(props) {

    return (
        <div id="whiteMenu" className="navWhite">
            <ul>
                <li>
                    <Dropdown overlay={menuTopics(props)}>
                        <a className="ant-dropdown-link navWhite" href="#"> Topics <Icon type="down" /> </a>
                    </Dropdown>
                </li>
                {props.currentPage === 'home' && (
                    <div className='navLeft'>
                        <li><a href='#howitworks'>How It Works</a></li>
                        <li><a href='#personalize'>Personalize Feed</a></li>
                    </div>
                )}
                <div className='navRight'>
                    {!props.loggedIn && (
                        <li><div>
                            <a href='#' onClick={props.goToLogin}>Log In</a> <span>or</span> <a href="#" onClick={props.goToSignup}>Sign Up</a>
                        </div></li>
                    )}
                    {props.loggedIn && (<div>
                            <li><Dropdown overlay={menuAccount(props)}>
                                <a id="whiteMenuAccount" className="ant-dropdown-link navWhite" href="#">
                                    My Account <Icon type="down" />
                                </a>
                            </Dropdown></li>
                            <li><button className="submitVideoButton" onClick={props.goToSubmitVideo}>Submit Video</button></li>
                            <li><button className="formButton" onClick={props.goToAdminPanel}>Admin Panel</button></li>
                            <li><button className="formButton" onClick={props.goToWalkthrough}>New User Walkthrough</button></li>
                        </div>
                    )}
                </div>
            </ul>

        </div>
    )
}
export default Nav;