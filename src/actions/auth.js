import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase.config';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPass = (email, password) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(login(123, 'Juandi'));
        }, 3500);
    };
};

export const starLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                console.log(user);
                dispatch(finishLoading());
                dispatch(login(user.uid, user.displayName));
            });
    };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                console.log(user);
                dispatch(login(user.uid, user.displayName));
            });
    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            });
    };
};

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    },
});
