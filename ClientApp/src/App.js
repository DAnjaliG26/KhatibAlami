import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ModuleB } from './components/ModuleB';
import { ModuleA } from './components/ModuleA';
import authservice from './Service'
import './custom.css'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            Admin: false,

        };
    }

    async componentWillMount() {
        debugger;
        //currently passing hardcoded id's to the app as no login page is there,
        //for ID=1, user can see only module1 as the user is having public access
        //for ID =2 , role is admin, id admin logged in he can see both the modules fetched from json web token, stored in local storage
        //If you want to check for public role,pass the id as 1
        //if you pass id other than 1,2 , it will show unauthorized error
        authservice.logout();
        await authservice.userAuthenticate(2);
        const user = authservice.getCurrentUser();
        this.setState({ user: user });
        this.setState({
            Admin: user.roles == "Admin"
        })
    }



    render() {
        const { user } = this.state;
        return (
            <>
                {
                    user ?
                        (
                            <Layout Admin={this.state.Admin}>
                                <Route exact path='/' component={Home} />
                                < Route path='/moduleA' component={ModuleA} />
                                {this.state.Admin && <Route path='/moduleB' component={ModuleB} />}
                            </Layout>) :
                        <>
                            <h3>UnAuthorized</h3>
                            <p>You do not have access to the system.</p></>
                }
            </>
        );
    }
}
