import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNavbar from "./components/AppNavbar/AppNavbar";
import MainPage from "./components/MainPage/MainPage";

function App() {
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
