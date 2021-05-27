import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppNavbar from "./components/AppNavbar/AppNavbar";
import MainPage from "./components/MainPage/MainPage";
import { checkLogin } from "./services/authServices";
import { login } from "./actions/accountActions";
import PostProject from "./components/Project/PostProject/PostProject";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		let mounted = true;
		if(mounted) {
		  checkLogin()
			.then(data => {
				if(data.id) {
					dispatch(login(data));
				}
			});
		}
		return () => {
		  mounted = false;
		}
	}, [])

	return (
		<Router>
			<div className="App">
				<AppNavbar />
				<Switch>
					<Route exact path="/" component={MainPage} />
					<Route exact path="/post-project" component={PostProject} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
