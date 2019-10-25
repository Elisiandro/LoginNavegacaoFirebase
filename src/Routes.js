import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from '../App';

import Home from './pages/Home';
import Description from './pages/Descripton';

export default class Routes extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}/>
			      <Scene key="signup" component={Signup} title="Register"/>
				  <Scene key="main" component={Main} title="Main"/>

				  <Scene key="home" component={Home} title="Home"/>
				  <Scene key="description" component={Description} title="Descripion"/>



			    </Stack>
			 </Router>
			)
	}
}