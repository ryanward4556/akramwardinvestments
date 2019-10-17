import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import LoginForm from "../LoginForm";
import Signup from "../../pages/Signup";
import Header from '../../pages/Header';
import NavBar from '../NavBar';
import Footer from '../Footer';


const DisplayLinks = props => {
    if (props.loggedIn) {
        return (
            <nav className="navbar">
                <ul className="nav">
                    <li>
                        <Link to="#" className="nav-link" onClick={props._logout}>
                            Logout
						</Link>
                    </li>
                </ul>
            </nav>
        )
    } 
    else {
        return (
            <div></div>
        )
    }
    //     return (
    //         <nav className="navbar">
    //             <ul className="nav">
    //                 <li className="nav-item">
    //                     <Link to="/login" className="nav-link">
    //                         login
	// 					</Link>
    //                 </li>
    //                 <li className="nav-item">
    //                     <Link to="/signup" className="nav-link">
    //                         sign up
	// 					</Link>
    //                 </li>
    //             </ul>
    //         </nav>
    //     )
    // }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            user: null
        }
        this._logout = this._logout.bind(this)
        this._login = this._login.bind(this)
    }
    componentDidMount() {
        axios.get('/auth/user').then(response => {
            console.log(response.data)
            if (!!response.data.user) {
                console.log('THERE IS A USER')
                this.setState({
                    loggedIn: true,
                    user: response.data.user
                })
            } else {
                this.setState({
                    loggedIn: false,
                    user: null
                })
            }
        })
    }
    _logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/auth/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.setState({
                    loggedIn: false,
                    user: null
                })
            }
        })
    }
    _login(username, password) {
        axios
            .post('/auth/login', {
                username,
                password
            })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    // update the state
                    this.setState({
                        loggedIn: true,
                        user: response.data.user
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="row">
                    <div className="col-4 offset-4">
                        <div className="App">
                            <Header user={this.state.user} />
                            <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
                            <Route
                                exact
                                path="/login"
                                render={() =>
                                    <LoginForm
                                        _login={this._login}
                                    />}
                            />
                            <Route exact path="/signup" component={Signup} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        )
    }
}

export default App;