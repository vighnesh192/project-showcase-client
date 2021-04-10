import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from "../../actions/accountActions";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import "./AppNavbar.css"
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		color: "#e2f1f8",
	},
	title: {
		flexGrow: 1,
	},
	drawerList: {
		color: "#3F3D56",
	},
}));

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

//Main Navbar function
export default function AppNavbar() {
	const classes = useStyles();

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, classes.drawerList, {
				[classes.fullList]: anchor === "top" || anchor === "bottom",
			})}
			role="presentation"
			onClick={() => toggleDrawer(anchor, false)}
			onKeyDown={() => toggleDrawer(anchor, false)}
		>
			<List>
				<ListItem button>
					<ListItemLink href="/">
						<ListItemText primary="New" />
					</ListItemLink>
					<Divider />
				</ListItem>
				<ListItem button>
					<ListItemLink href="/">
						<ListItemText primary="Trending" />
					</ListItemLink>
					<Divider />
				</ListItem>
				<ListItem button>
					<ListItemLink href="/">
						<ListItemText primary="Popular" />
					</ListItemLink>
					<Divider />
				</ListItem>
			</List>
		</div>
	);

	const ColorButton = withStyles((theme) => ({
		root: {
		  color: "#434E5C",
		  backgroundColor: grey[200],
		},
	}))(Button);

	const accountState = useSelector(state => state.account);
	const dispatch = useDispatch();

	const Login = () => {
		dispatch(login());
	}

	const Logout = () => {
		dispatch(logout());
	}

	return (
		<nav>
			<NavLink id="logo" to="/" className="Link">
				<h2>PS</h2>
			</NavLink>
			<ul>
				<li>
					<NavLink activeClassName="active" className="Link" to="/">
						New 
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName="active" className="Link" to="/">
						Trending
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName="active" className="Link" to="/">
						Popular
					</NavLink>
				</li>
			</ul>
			<div id="nav-buttons">
				{
					accountState.loggedIn ? 
					<ColorButton size="small" className={classes.margin} onClick={() => Logout()}>
						Logout
					</ColorButton>
						:
					<React.Fragment>
						<ColorButton size="small" id="sign-up" className={classes.margin}>
							Sign Up
						</ColorButton>
						<ColorButton size="small" className={classes.margin} onClick={() => Login()}>
							Login
						</ColorButton>
					</React.Fragment>
				}
			</div>
			<div id="menu">
				{["right"].map((anchor) => (
					<React.Fragment key={anchor}>
						<Button onClick={toggleDrawer(anchor, true)}>
							<IconButton
								className={classes.menuButton}
								color="#434E5C"
								aria-label="menu"
							>
								<MenuIcon style={{color: grey[800]}}/>
							</IconButton>
						</Button>
						<Drawer
							anchor={anchor}
							open={state[anchor]}
							onClose={toggleDrawer(anchor, false)}
						>
							{list(anchor)}
						</Drawer>
					</React.Fragment>
				))}
			</div>
		</nav>
	);
}
