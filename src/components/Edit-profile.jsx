import React, { useState, useEffect } from 'react';
import { Alert, Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Input } from '../ui';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthService from '../service/auth';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileFailure, updateProfilestart, updateProfileSuccess } from '../slice/auth';

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { errors } = useSelector(state => state.auth)
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = AuthService.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setName(user.displayName || '');
                setPreview(user.photoURL || '');
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (name === '' || currentPassword === '') {
            setError("Can't be empty");
            return;
        }
        dispatch(updateProfilestart())
        try {
            if (user) {
                await AuthService.reauthenticate(user, currentPassword);
                const message = await AuthService.updateProfileDetails(user, name, password);

                if (file) {
                    const photoURL = await AuthService.uploadProfilePicture(user, file);
                    setPreview(photoURL);
                }
                dispatch(updateProfileSuccess(message))
                navigate('/profile');
            }
        } catch (error) {
            dispatch(updateProfileFailure(error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack display={'flex'} alignItems={'center'} mx={'1rem'}>
                <Box className='max-w-[20rem] w-full mt-[4.901rem] text-white'>
                    <Typography className='text-3xl mb-8 text-center'>Edit profile</Typography>
                    <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} gap={'1rem'}>
                        <Avatar
                            alt={name}
                            src={preview}
                            sx={{ width: 150, height: 150 }}
                        />
                        <Button variant='contained' component="label" className='w-max h-max bg-red hover:bg-white hover:text-dark-blue'>
                            Upload
                            <input placeholder="Choose image"
                                accept="image/png,image/jpeg"
                                type="file" hidden onChange={handleFileChange}
                            />
                        </Button>
                    </Stack>
                    <Stack className='mt-8'>
                        {errors !== null ? <Alert severity="error">{errors}</Alert> : ''}
                        <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} className='input-box focus-within:border-b-white'>
                            <Input className={'form-input py-2'} type={'text'} state={name} setState={setName} placeholder={'Name'} />
                            {error && name === '' && <Typography variant='subtitle2' className='text-red'>{error}</Typography>}
                        </Stack>
                        <Stack display={'flex'} flexDirection={'column'} justifyContent={'space-between'} mt={'.5rem'} className=''>
                            <Box className='input-box focus-within:border-b-white' display={'flex'} pr={'1rem'}>
                                <Input className={'form-input py-2'} placeholder={'Current password'} type={showCurrentPassword ? 'text' : 'password'} state={currentPassword} setState={setCurrentPassword} />
                                {error && currentPassword === '' && <Typography variant='subtitle2' className='text-red'>{error}</Typography>}
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowCurrentPassword((show) => !show)}
                                    edge="end"
                                >
                                    {showCurrentPassword ? <VisibilityOff className='text-white' /> : <Visibility className='text-white' />}
                                </IconButton>
                            </Box>
                        </Stack>
                        <Stack display={'flex'} flexDirection={'column'} justifyContent={'space-between'} mt={'.5rem'} className=''>
                            <Box className='input-box focus-within:border-b-white' display={'flex'} pr={'1rem'}>
                                <Input className={'form-input py-2'} placeholder={'New password'} type={showPassword ? 'text' : 'password'} state={password} setState={setPassword} />
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword((show) => !show)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff className='text-white' /> : <Visibility className='text-white' />}
                                </IconButton>
                            </Box>
                        </Stack>
                        <Stack display={'flex'} flexDirection={'row'} gap={'1rem'} mt={'3rem'}>
                            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} type='button' variant='contained' className='w-full bg-greyish-blue hover:bg-white hover:text-dark-blue normal-case rounded-md'>
                                Cancel
                            </Button>
                            <Button type='submit' variant='contained' className='w-full text-dark-blue bg-white hover:bg-greyish-blue hover:text-white normal-case rounded-md'>
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </form>
    );
};

export default EditProfile;
