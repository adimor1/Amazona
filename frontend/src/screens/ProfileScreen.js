import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;

    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET}); 
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);
    const sumbitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and Confirm password are not match');
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    }
    return (
        <div>
            <form className="form" onSubmit={sumbitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant="danager">{error}</MessageBox>
                            :
                            <>
                                {loadingUpdate && <LoadingBox></LoadingBox>}
                                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                                {successUpdate && <MessageBox variant="success">Profile Update Success</MessageBox>}
                                <div>
                                    <lable htmlFor="name">Name</lable>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <lable htmlFor="email">Email</lable>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <lable htmlFor="password">Password</lable>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <lable htmlFor="confirmPassword">Confirm Password</lable>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Enter confirm password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <lable />
                                    <button className="primary" type="sumbit">
                                        Update
                                    </button>
                                </div>
                            </>
                }
            </form>
        </div>
    )
}