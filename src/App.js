import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppNavbar from "./components/AppNavbar/AppNavbar";
import MainPage from "./components/MainPage/MainPage";
import { checkLogin } from "./services/authServices";
import { login } from "./actions/accountActions";
import PostProject from "./components/Project/PostProject/PostProject";
import ProjectDetails from "./components/Project/ProjectDetails/ProjectDetails";
import Profile from "./components/User/Profile/Profile";
import Home from "./components/Home/Home";
import useGaTracker from './useGaTracker'

function App() {
	console.log('WINDOW:---' ,window)
	useGaTracker();

	const dispatch = useDispatch();

	const [loggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		let mounted = true;
		if(mounted) {
		  checkLogin()
			.then(data => {
				if(data.id) {
					dispatch(login(data));
					setLoggedIn(true);
				}
			});
		}
		return () => {
		  mounted = false;
		}
	}, [loggedIn])

	return (
		<div className="App">
			<AppNavbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/:sortBy" component={MainPage} />
				<Route exact path="/project/post-project" component={PostProject} />
				<Route exact path="/project/:projectId" component={ProjectDetails} />
				<Route exact path="/user/:userId" component={Profile} />
			</Switch>
		</div>
	);
}

export default App;
