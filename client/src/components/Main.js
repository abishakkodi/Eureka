import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home//Home'
import Dashboard from './Dashboard/Dashboard'
import SubmitVideo from './SubmitVideo/SubmitVideo'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Account from './Account/Account'
import Admin from './Admin/Admin'
import Walkthrough from './Signup/Walkthrough'


const Main = () => (
  <main>

  </main>
);

export default Main;
    // <Switch>
    //   <Route path='/' exact component={Home}/>
    //   <Route path='/dashboard' component={Dashboard}/>
    //   <Route path='/submitvideo' component={SubmitVideo}/>
    //   <Route path='/login' component={Login}/>
    //   <Route path='/signup' component={Signup}/>
    //   <Route path='/account' component={Account}/>
    //   <Route path='/adminpanel' component={Admin}/>
    //   <Route path='/walkthrough' component={Walkthrough}/>
    // </Switch>