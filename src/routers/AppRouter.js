import React, { useEffect } from 'react';
import { firebase } from '../firebase/firebase.config';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { useState } from 'react';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setChecking(false);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return <h1>Please Wait</h1>;
    }
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/auth" component={AuthRouter} />

                    <Route exact path="/" component={JournalScreen} />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    );
};
