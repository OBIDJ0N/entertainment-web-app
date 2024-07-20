import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlert } from '../slice/alert';
import { Link } from 'react-router-dom';

const Alerts = ({ loggedIn }) => {
    const { isShown, showAlert } = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearAlert());
    };

    return (
        loggedIn ? (
            <Snackbar
                open={isShown}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%', ml: '.5rem' }}
                    className='bg-greyish-blue'
                >
                    Bookmarked successfully!
                </Alert>
            </Snackbar>
        ) : (
            <Snackbar
                open={showAlert}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="warning"
                    variant="filled"
                    sx={{ width: '100%', ml: '.5rem' }}
                >
                    You must be signed in to add a bookmark! <Link to={'/login'} className='underline'>Sign in</Link>
                </Alert>
            </Snackbar>
        )
    );
};

export default Alerts;
