import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Icon, message } from 'antd';
import '../css/style.css';
import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Dashboard from './Dashboard/Dashboard';
import Account from './Account/Account';
import SubmitVideo from './SubmitVideo/SubmitVideo';
import Footer from './Footer';
import Nav from './Nav/NavHome';
import NavWhite from './Nav/NavWhite';
import Main from './Main';
import Admin from './Admin/Admin';
import Walkthrough from './Signup/Walkthrough';
import { withRouter } from 'react-router-dom';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'home',
      loggedIn: false,
      currentUser: 'guest',
      topVideos: [],
      playlist: [],
      counter: 0,
      currentVideo: null,
      recentVideos: [],
      bookmarkedVideos: []
    };

  this.goToHome = this.goToHome.bind(this);
  this.goToLogin = this.goToLogin.bind(this);
  this.goToSignup = this.goToSignup.bind(this);
  this.goToDashboard = this.goToDashboard.bind(this);
  this.goToAccount = this.goToAccount.bind(this);
  this.goToSubmitVideo = this.goToSubmitVideo.bind(this);
  this.goToAdminPanel = this.goToAdminPanel.bind(this);
  this.goToWalkthrough = this.goToWalkthrough.bind(this);
  this.logout = this.logout.bind(this);
  this.signup = this.signup.bind(this);
  this.login = this.login.bind(this);
  this.getPlaylistByCategory = this.getPlaylistByCategory.bind(this);
  this.handleClickCategory = this.handleClickCategory.bind(this);
  this.playClickedVideo = this.playClickedVideo.bind(this);
  // this.submitVideo = this.submitVideo.bind(this);
  this.setCurrentVideo = this.setCurrentVideo.bind(this);
  this.addLastVideoInRecentVideos = this.addLastVideoInRecentVideos.bind(this);
  this.handleClickHeart = this.handleClickHeart.bind(this);
  this.handleClickAddVideo = this.handleClickAddVideo.bind(this);
  this.setMindfeedPlaylist = this.setMindfeedPlaylist.bind(this);
  };


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  The following functions change the view on the app
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  goToHome() {
    this.setState({currentPage: 'home'});
  }

  goToLogin() {
    this.setState({currentPage: 'login'});
  }

  goToSignup() {
    this.setState({currentPage: 'signup'});
  }

  goToDashboard() {
    this.setState({currentPage: 'dashboard'});
  }

  goToAccount() {
    this.setState({currentPage: 'account'});
  }

  goToSubmitVideo() {
    this.setState({currentPage: 'submitVideo'});
  }

  goToAdminPanel() {
    this.setState({currentPage: 'admin'});
  }

  goToWalkthrough() {
    this.setState({currentPage: 'walkthrough'})
  }



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  MVP FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * */
// load initial seed data

  componentDidMount() {
    axios.get('api/saveInitialData')
    .then((response) => {
      console.log('Initial data saved successfully', response);
    })
    .catch((error) => {
      console.log(error);
    })
  }



// post - send authentication info
  signup(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    axios.post('/api/signup', {
      params: {
        email: email,
        password: password
      }
    })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        console.log("successfully signed in");
        this.goToLogin();
      } else {
        console.log("Unable to signup");
      }
    })
  }

  login(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    axios.post('/api/signin', {
      params: {
        email: email,
        password: password
      }
    })
    .then((response) => {
      console.log("Response Status: ", response.status);
      if (response.status === 200) {
        this.setState({currentUser: email,
                          loggedIn: true});
        this.goToHome();
      } else if(response.status === 201) {
        this.setState({currentUser: email, loggedIn: true});
        this.goToWalkthrough();
      } else {
        console.log("Log In Fail. Try Again.");
        this.goToLogin();
      }
    })
  }

  getPlaylistByCategory(category) {
    axios.get('/api/getPlaylistByCategory', {
      params: category
    })
    .then((response) => {
      var videos = response.data;
      console.log('Videos retrieved:', videos);
      this.setState({playlist: videos},
        () => {
          this.setCurrentVideo();
          this.goToDashboard();
        }
      );
    })
    .catch((error) => {
      console.log(error);
    })
  }

  //user sends video that gets added to admin queue
  submitVideoToAdminQueue(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = this.state.currentUser;
    const comment = data.get('comment');
    const url = data.get('url');
    const success = function() {
      message.success('Successfully submitted! Thank you so much for contributing!', 10);
    }
    const error = function() {
      message.error('Submission failed. Video length must be less than 5 minutes and from valid provider.', 10);
    }
    axios.post('/api/addVideoToQueue', {
      params: {
        email: email,
        url: url,
        comment: cumment,
        date: new Date().toJSON().slice(0,10)
      }
    })
    .then((response) => {
      if (response.data === "Valid video and saved") {
        {success()};
        this.clearForm('submitVideo');
        this.goToSubmitVideo();
      } else if (response.data === "Duration too long" || response.data === "Link not from valid provider") {
        {error()};
        this.clearForm('submitVideo');
        console.log("Video Submission Fail. Video Too long. Try Again.");
      }
    })
  }

//MOVED TO Admin/Admin.js
  // submitVideo(event) {
  //   event.preventDefault();
  //   //get data from user submitted queue table
  //   const data = new FormData(event.target);
  //   const email = this.state.currentUser;
  //   const category = data.get('category');
  //   const subcategory = null;
  //   const url = data.get('url');
  //   const success = function() {
  //     message.success('Video successfully added to database!', 10);
  //   }
  //   const error = function() {
  //     message.error('Submission failed.', 10);
  //   }

  //   axios.post('/api/addVideo', {
  //     params: {
  //       //get ALL data from when user submitted except for the category and subcategory
  //       email: email,
  //       url: url,
  //       category: category,
  //       subcategory: subcategory,
  //       dateAdded: null
  //     }
  //   })
  //   .then((response) => {
  //     if (response.data === "Valid video and saved") {
  //       {success()};
  //       this.clearForm('submitVideo');
  //       this.goToSubmitVideo();
  //     } else if (response.data === "Duration too long" || response.data === "Link not from valid provider") {
  //       {error()};
  //       this.clearForm('submitVideo');
  //       console.log("Video Submission Fail. Video Too long. Try Again.");
  //     }
  //   })

  // }



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  POST MVP FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * */



//getPlaylist()
//postUserCategories()
//postVote()
//postUserBookmark()
//getUserBookmarks()
//getVideoInfoByID()

  playClickedVideo(clickedVideo) {
    console.log("Clicked Video:", clickedVideo);
    this.setState({currentVideo: clickedVideo}, () => {
      this.checkIfBookmarked(clickedVideo.videoId);
    });
  }

  setMindfeedPlaylist(playlist) {
      console.log("Videos set in App Global state:", playlist);
      this.setState({playlist: playlist},
          () => {
              this.setCurrentVideo();
              this.goToDashboard();
          })
  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  ADDITIONAL FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  logout() {
    this.setState({loggedIn: false});
    this.setState({currentUser: 'guest'});
    this.goToHome();
  }

  //handle click of category buttons
  handleClickCategory(event) {
    this.setState({counter: 0});
    this.getPlaylistByCategory(event.target.name);
    this.setState({currentCategory: event.target.name});

  }

  setCurrentVideo() {
    const setError = function() {
      message.error('Out of Videos... Developers need to write a prefetch!', 10);
    }
    if (this.state.counter === 0) { //check needed for preloader
      this.setState({
        currentVideo: this.state.playlist[0],
        counter: this.state.counter + 1
      }, () => {
        this.checkIfBookmarked(this.state.currentVideo.videoId);
      });
    } else if (this.state.counter !== 0 && this.state.playlist.length !== this.state.counter){

      this.addLastVideoInRecentVideos();
      this.setState({
        currentVideo: this.state.playlist[this.state.counter],
        counter: this.state.counter + 1
      }, () => {
        this.checkIfBookmarked(this.state.currentVideo.videoId);
      });
      //write preloader function
    } else {
      {setError()}
    }
  }

  addLastVideoInRecentVideos() {
    let recentVideosList = this.state.recentVideos;
    let lastVideo = this.state.currentVideo;
    let contains = recentVideosList.filter(video => (video.videoId === lastVideo.videoId));

    if (contains.length >= 1) {
      function videoInList(video) {
        return video.videoId === lastVideo.videoId;
      }
      let indexOfVideo = recentVideosList.findIndex(videoInList);
      recentVideosList.splice(indexOfVideo, 1);
    }
    recentVideosList.unshift(lastVideo);
    recentVideosList = recentVideosList.slice(0, 5);
    this.setState({recentVideos: recentVideosList});
}

  clearForm(formId) {
    let form = document.getElementById(formId);
    form.reset();
  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  BOOKMARKING
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  handleClickHeart() {
    console.log('heart Clicked');
    let currentBookmarks = this.state.bookmarkedVideos;
    let currentVideo = this.state.currentVideo;
    if (currentBookmarks.includes(currentVideo.videoId)) {
      this.deleteFromBookmarks();
    } else if (!currentBookmarks.includes(currentVideo.videoId)) {
      this.addToBookmarks();
    } else {
      console.log("Bookmarking error");
    }
  }

  addToBookmarks() {
    //make heart Red
    document.getElementById('heart').setAttribute("class", 'heartIconSelected');
    //add to bookmarks in state
    let toBeBookmarked = this.state.currentVideo.videoId;
    let currentBookmarks = this.state.bookmarkedVideos;
    currentBookmarks.push(toBeBookmarked);
    this.setState({bookmarkedVideos: currentBookmarks});
    console.log("Bookmarks In State", this.state.bookmarkedVideos);
    //MAKE POST REQUEST WITH VIDEO ID AND USERNAME TO ADD BOOKMARK
  }

  deleteFromBookmarks() {
    //make heart Black
    document.getElementById('heart').setAttribute("class", 'heartIcon');
    //remove from bookmarks in state
    let toBeDeleted = this.state.currentVideo.videoId;
    let currentBookmarks = this.state.bookmarkedVideos;
    let keyToDelete = currentBookmarks.indexOf(toBeDeleted);
    currentBookmarks.splice(keyToDelete, 1);
    this.setState({ bookmarkedVideos: currentBookmarks });
    console.log("Bookmarks In State", this.state.bookmarkedVideos);
    //MAKE POST REQUEST WITH VIDEO ID AND USERNAME TO DELETE BOOKMARK
  }

  checkIfBookmarked(currentvideoId) {
    let theseBookmarks = this.state.bookmarkedVideos;
    if (theseBookmarks.includes(currentvideoId)) {
      document.getElementById('heart').setAttribute("class", 'heartIconSelected');
    } else {
      document.getElementById('heart').setAttribute("class", 'heartIcon');
    }
  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  ADMIN PANEL
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  handleClickAddVideo(text, category, subcategory) {
    console.log("text", text);
    console.log("category", category);
    console.log("subcategory", subcategory);
  }


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Renders the components based ot the current state
* * * * * * * * * * * * * * * * * * * * * * * * * * */


  render() {
    var componentToBeRendered = () => {
      if (this.state.currentPage === 'home') {
        return (<Home handleClickCategory={this.handleClickCategory}
                      currentPage={this.state.currentPage}
                      loggedIn={this.state.loggedIn}
                      goToLogin={this.goToLogin}
                      goToSignup={this.goToSignup}
                      goToSubmitVideo={this.goToSubmitVideo}
                      goToAccount={this.goToAccount}
                      handleClickCategory={this.handleClickCategory}
                      logout={this.logout}/>)
      }
      if (this.state.currentPage ==='login') {
        return (<Login  login={this.login}
                        currentPage={this.state.currentPage}
                        loggedIn={this.state.loggedIn}
                        goToLogin={this.goToLogin}
                        goToSignup={this.goToSignup}
                        goToSubmitVideo={this.goToSubmitVideo}
                        goToAccount={this.goToAccount}
                        handleClickCategory={this.handleClickCategory}
                        logout={this.logout} />)
      }
      if (this.state.currentPage ==='signup') {
        return (<Signup signup={this.signup}
                        currentPage={this.state.currentPage}
                        loggedIn={this.state.loggedIn}
                        goToLogin={this.goToLogin}
                        goToSignup={this.goToSignup}
                        goToSubmitVideo={this.goToSubmitVideo}
                        goToAccount={this.goToAccount}
                        handleClickCategory={this.handleClickCategory}
                        logout={this.logout} />) }

      if(this.state.currentPage ==='dashboard') {
    return (<Dashboard  loggedIn={this.state.loggedIn}
                        currentCategory={this.state.currentCategory}
                        playlist={this.state.playlist}
                        currentVideo={this.state.currentVideo}
                        recentVideos={this.state.recentVideos}
                        setCurrentVideo={this.setCurrentVideo}
                        parseUrlIntoEmbed={this.parseUrlIntoEmbed}
                        handleClickHeart={this.handleClickHeart}
                        playClickedVideo={this.playClickedVideo}
                        currentPage={this.state.currentPage}
                        loggedIn={this.state.loggedIn}
                        goToLogin={this.goToLogin}
                        goToSignup={this.goToSignup}
                        goToSubmitVideo={this.goToSubmitVideo}
                        goToAccount={this.goToAccount}
                        handleClickCategory={this.handleClickCategory}
                        logout={this.logout} />)
      }
      if(this.state.currentPage ==='account') {
        return (<Account />)
      }
      if(this.state.currentPage ==='submitVideo') {
        return (<SubmitVideo submitVideo={this.submitVideoToAdminQueue} loggedIn={this.state.loggedIn} handleClickCategory={this.handleClickCategory} logout={this.logout} goToAccount={this.goToAccount} />)
      }
      if(this.state.currentPage ==='admin') {
        return (<Admin handleClickAddVideo={this.handleClickAddVideo} />)
      }
      if(this.state.currentPage ==='walkthrough') {
        return (<Walkthrough currentUser={this.state.currentUser} setMindfeedPlaylist={this.setMindfeedPlaylist}/>)
      }
   	}


    var navToBeRendered = () => {
      if (this.state.currentPage === 'home') {
        return (<Nav currentPage={this.state.currentPage} loggedIn={this.state.loggedIn} goToLogin={this.goToLogin} goToSignup={this.goToSignup} goToSubmitVideo={this.goToSubmitVideo} goToAccount={this.goToAccount} handleClickCategory={this.handleClickCategory} logout={this.logout} goToAdminPanel={this.goToAdminPanel} goToWalkthrough={this.goToWalkthrough} handleClickAddVideo={this.handleClickAddVideo}/>)
      } else {
        return (<NavWhite currentPage={this.state.currentPage} loggedIn={this.state.loggedIn} goToLogin={this.goToLogin} goToSignup={this.goToSignup} goToSubmitVideo={this.goToSubmitVideo} goToAccount={this.goToAccount} handleClickCategory={this.handleClickCategory} logout={this.logout} goToAdminPanel={this.goToAdminPanel} goToWalkthrough={this.goToWalkthrough} handleClickAddVideo={this.handleClickAddVideo} />)
      }
    }


    return (
      <div className='App'>
        <div className='navbg'>
          {navToBeRendered()}
        </div>
          {componentToBeRendered()}
        <Footer />
      </div>
    )

  }
}

export default App;

