import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppNavbar from "./components/AppNavbar/AppNavbar";
import MainPage from "./components/MainPage/MainPage";
import { checkLogin } from "./services/authServices";
import { login } from "./actions/accountActions";

function App() {
	const accountState = useSelector(state => state.account);
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
				</Switch>
			</div>
		</Router>
	);
}

export default App;
