import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from "../../actions/accountActions";
import { logout as logoutService } from "../../services/authServices";
import { getProjects } from "../../services/projectService";
import { setProjects } from "../../actions/projectActions";
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
import { NavLink, withRouter } from "react-router-dom";
import "./AppNavbar.css"
import { grey } from "@material-ui/core/colors";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from "@material-ui/core/Avatar";

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
	a: {
		textDecoration: "none"
	}
}));

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

//Main Navbar function
const AppNavbar = (props) => {
	const classes = useStyles();

	const [queryState, setQueryState] = useState('popular');

	useEffect(() => {
		let mounted = true;
		if(mounted) {
			document.getElementById(queryState).style.borderBottom = '1px solid #262626';
			document.getElementById(queryState).style.fontWeight = '500';
		}
		return () => {
			mounted = false;
		}
	}, [])

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const handleMenuItemClick = (item) => {
		if(item === 'Creators') {
			document.getElementById('top-creators-list').style.display = 'block';
			document.getElementById('display-projects').style.display = 'none';
		}
		else if(item === 'New' || item === 'Trending' || item === 'Popular') {
			document.getElementById('top-creators-list').style.display = 'none';
			document.getElementById('display-projects').style.display = 'block';
		}
	}

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
				<ListItem button onClick={() => handleMenuItemClick('New')}>
					<ListItemLink href="/new">
						<ListItemText primary="New" />
					</ListItemLink>
					<Divider />
				</ListItem>
				<ListItem button onClick={() => handleMenuItemClick('Trending')}>
					<ListItemLink href="/trending">
						<ListItemText primary="Trending" />
					</ListItemLink>
					<Divider />
				</ListItem>
				<ListItem button onClick={() => handleMenuItemClick('Popular')}>
					<ListItemLink href="/popular">
						<ListItemText primary="Popular" />
					</ListItemLink>
					<Divider />
				</ListItem>
				<ListItem button role="presentation" onClick={() => handleMenuItemClick('Creators')}>
					<ListItemLink>
						<ListItemText primary="Creators" />
					</ListItemLink>
					<Divider />
				</ListItem>
				{
					!localStorage.getItem('User') ? 
					<ListItem button role="presentation" onClick={() => handleMenuItemClick('Login')}>
						<ListItemLink href={`${url}/auth/google`}>
							<ListItemText primary="Login" />
						</ListItemLink>
						<Divider />
					</ListItem>
						:
					<ListItem button role="presentation" onClick={() => handleMenuItemClick('Post Project')}>
						<ListItemLink href={'/project/post-project'}>
							<ListItemText primary="Post Project" />
						</ListItemLink>
						<Divider />
					</ListItem>
				}
			</List>
		</div>
	);

	const ColorButton = withStyles((theme) => ({
		root: {
		  color: "#434E5C",
		  backgroundColor: grey[200],
		},
	}))(Button);

	const dispatch = useDispatch();

	const Logout = () => {
		logoutService()
			.then((data) => {
				// @TODO Error handling using data.success
				dispatch(logoutAction());
				handleClose();
			})
	}

	const handleProjectQuery = (query) => {
		setQueryState(query);
		//	@TODO  Try to find a better way to do this:-
		document.getElementById(query).style.borderBottom = '1px solid #262626';
		document.getElementById(query).style.fontWeight = '500';
		if(query === 'popular') {
			document.getElementById('new').style.borderBottom = 'none';
			document.getElementById('new').style.fontWeight = '400';
			document.getElementById('trending').style.borderBottom = 'none';
			document.getElementById('trending').style.fontWeight = '400';
		}
		else if(query === 'trending') {
			document.getElementById('new').style.borderBottom = 'none';
			document.getElementById('new').style.fontWeight = '400';
			document.getElementById('popular').style.borderBottom = 'none';
			document.getElementById('popular').style.fontWeight = '400';
		}
		else {
			document.getElementById('trending').style.borderBottom = 'none';
			document.getElementById('trending').style.fontWeight = '400';
			document.getElementById('popular').style.borderBottom = 'none';
			document.getElementById('popular').style.fontWeight = '400';
		}
		getProjects(query)
			.then((data) => {
				dispatch(setProjects(data, query));
			})
	}

	const handleMenu = (event) => {
	setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
	setAnchorEl(null);
	};

	const handleProfileClick = () => {
		props.history.push(`/user/${JSON.parse(localStorage.getItem('User')).id}`);
		handleClose();
	}

	const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://projstemp.herokuapp.com';

	return (
		<nav>
			<NavLink id="logo" to="/" className="Link">
				<h2>PS</h2>
			</NavLink>
			<ul>
				<li id='new'>
					<NavLink onClick={() => handleProjectQuery('new')} activeClassName="active" className="Link" to="/">
						New 
					</NavLink>
				</li>
				<li id='trending'>
					<NavLink onClick={() => handleProjectQuery('trending')} activeClassName="active" className="Link" to="/">
						Trending
					</NavLink>
				</li>
				<li id='popular'>
					<NavLink onClick={() => handleProjectQuery('popular')} activeClassName="active" className="Link" to="/">
						Popular
					</NavLink>
				</li>
			</ul>
			<div id="nav-buttons">
				{
					!localStorage.getItem('User') ? 
					<React.Fragment>
						<ColorButton className={classes.margin, classes.a}>
							<a style={{textDecoration: "none", color: "black"}} href={`${url}/auth/google`}>Login</a>
						</ColorButton>
					</React.Fragment>
						:
					<React.Fragment>
						<NavLink activeClassName="active" className="Link" to="/project/post-project">
							<ColorButton className={classes.margin, classes.a}>
								<span style={{textDecoration: "none", color: "black"}}>Post Project</span>
							</ColorButton>
						</NavLink>
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
							onClick={toggleDrawer(anchor, false)}
						>
							{list(anchor)}
						</Drawer>
					</React.Fragment>
				))}
			</div>
			{localStorage.getItem('User') ? 
				<Toolbar>
					<div>
						{JSON.parse(localStorage.getItem('User')).profilePic ? 
							<React.Fragment>
								<IconButton
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true" 
									onClick={handleMenu}
								>
									<Avatar src={JSON.parse(localStorage.getItem('User')).profilePic.url} />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
									}}
									open={open}
									onClose={handleClose}
								>
									<MenuItem onClick={() => handleProfileClick()}>Profile</MenuItem>
									<MenuItem onClick={() => Logout()}>Logout</MenuItem>
								</Menu>
							</React.Fragment>
							:
							<React.Fragment>
								<IconButton
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
									}}
									open={open}
									onClose={handleClose}
								>
									<MenuItem onClick={() => handleProfileClick()}>Profile</MenuItem>
									<MenuItem onClick={() => Logout()}>Logout</MenuItem>
								</Menu>
							</React.Fragment>
						}
					</div>
				</Toolbar>
				:
				<React.Fragment></React.Fragment>
			}
		</nav>
	);
}

export default withRouter(AppNavbar);