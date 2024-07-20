import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Input } from '../ui';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthService from '../service/auth';
import { getAuth } from 'firebase/auth';

const EditProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = AuthService.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setName(user.displayName || '');
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (user) {
                await AuthService.reauthenticate(user, currentPassword);
                const message = await AuthService.updateProfileDetails(user, name, password);
                alert(message);
                navigate('/profile');
            }
        } catch (error) {
            alert('Error updating profile: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack display={'flex'} alignItems={'center'}>
                <Box className='max-w-[20rem] w-full mt-[4.901rem] text-white'>
                    <Typography className='text-3xl mb-8 text-center'>Profile</Typography>
                    <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} gap={'1rem'}>
                        <Avatar
                            alt={name}
                            src={user ? user.photoURL : ''}
                            sx={{ width: 100, height: 100 }}
                        />
                        <Button variant='contained' className='w-max h-max bg-red hover:bg-white hover:text-dark-blue'>Upload</Button>
                    </Stack>
                    <Stack display={'flex'} flexDirection={'column'} justifyContent={'space-between'} mt={'1rem'}>
                        <Typography className='text-xl'>
                            Name:
                        </Typography>
                        <Input className={'form-input border border-greyish-blue py-2'} type={'text'} state={name} setState={setName} />
                    </Stack>
                    <Stack display={'flex'} flexDirection={'column'} justifyContent={'space-between'} mt={'.5rem'}>
                        <Typography className='text-xl'>
                            Current Password:
                        </Typography>
                        <Box className='border border-greyish-blue' display={'flex'} pr={'1rem'}>
                            <Input className={'form-input border border-none py-2'} placeholder={'Current password'} type={showPassword ? 'text' : 'password'} state={currentPassword} setState={setCurrentPassword} />
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff className='text-white' /> : <Visibility className='text-white' />}
                            </IconButton>
                        </Box>
                    </Stack>
                    <Stack display={'flex'} flexDirection={'column'} justifyContent={'space-between'} mt={'.5rem'}>
                        <Typography className='text-xl'>
                            New Password:
                        </Typography>
                        <Box className='border border-greyish-blue' display={'flex'} pr={'1rem'}>
                            <Input className={'form-input border border-none py-2'} placeholder={'New password'} type={showPassword ? 'text' : 'password'} state={password} setState={setPassword} />
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
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
                </Box>
            </Stack>
        </form>
    );
};

export default EditProfile;
