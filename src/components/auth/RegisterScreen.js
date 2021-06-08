import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
    const dispatch = useDispatch();

    const { msgError } = useSelector((state) => state.ui);

    const [registerValues, handleInputChange] = useForm({
        email: 'juanjo@gmail.com',
        name: 'juan jose',
        password: '123456',
        password2: '123456',
    });

    const { email, name, password, password2 } = registerValues;

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(email, name, password, password2);
        isFormValid() &&
            dispatch(startRegisterWithEmailPassword(email, password, name));
    };

    const dispatchMsg = (msg) => {
        dispatch(setError(msg));
    };

    const isFormValid = () => {
        console.log('email', !validator.isEmail(email));
        if (name.trim().length === 0) {
            dispatchMsg('Name is required');
            return false;
        } else if (!validator.isEmail(email)) {
            dispatchMsg('Email is required');
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatchMsg(
                'password is required or password must be at least 6 characters'
            );
            return false;
        }
        dispatch(removeError());
        return true;
    };

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>
                {msgError.length > 0 && (
                    <div className="auth__alert-error">{msgError}</div>
                )}

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link to="/auth/login" className="link">
                    Already registered?
                </Link>
            </form>
        </>
    );
};
