import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNavbar from "./components/AppNavbar/AppNavbar";

function App() {
	return (
		<Router>
			<div className="App">
				<AppNavbar />
			</div>
		</Router>
	);
}

export default App;
