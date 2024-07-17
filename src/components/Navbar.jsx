import { Avatar, Box, Button, Input, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../slice/auth';
import { logo, search } from '../constants';
import { Icons } from '../ui';
import { Link, useNavigate } from 'react-router-dom';
import { removeItem } from '../helpers/persistance-storage';
import AuthService from '../service/auth';
import _ from 'lodash';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const clickHandler = () => {
        AuthService.userLogout();
        dispatch(logOutUser());
    };
    const onChangeHandler = useCallback(
        _.debounce((newValue) => {
            if (newValue.trim()) {
                navigate(`/search/${newValue}`);
            } else {
                navigate(-1)
                setValue('')
            }
        }, 300),
        []
    );
    const changeHandler = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChangeHandler(newValue);
    };

    return (
        <>
        {/* <Button onClick={() => clickHandler()}>Log out</Button> */}
            <Stack mt={'2rem'} ml={'2rem'} className='max-tablet:mx-6 max-tablet:mb-0 max-phone:mx-4'>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} position={'fixed'} mb={'2rem'} className='bg-semi-dark-blue px-7 py-8 rounded-[1.25rem] w-max desktop:h-4/5 main max-tablet:flex-row max-tablet:justify-between max-tablet:h-auto max-tablet:mx-6 max-tablet:left-0 max-tablet:right-0 max-tablet:z-50 max-tablet:py-5 max-tablet:pl-6 max-tablet:px-4 max-tablet:w-auto max-phone:top-0 max-phone:mx-0 max-phone:rounded-none max-phone:px-4'>
                    <Link to={'/'} onClick={() => removeItem('activeButton')}>
                        <Box component={'img'} src={logo} width={'2rem'} className='max-phone:w-6' />
                    </Link>
                    <Stack alignItems={'flex-start'} mt={'4.75rem'} gap={'2.5rem'} className='max-tablet:flex-row max-tablet:mt-0'>
                        <Icons />
                    </Stack>
                    <Link to={'/'} className='mt-auto' onClick={() => removeItem('activeButton')}>
                        <Avatar className='max-phone:w-6 max-phone:h-6' />
                    </Link>
                </Box>
                <Box ml={'6rem'} className='max-tablet:ml-0'>
                    <Stack className='mx-9 max-tablet:mt-[6.25rem] max-tablet:mx-0 max-tablet:mb-0 max-phone:mt-12'>
                        <Box display={'flex'} alignItems={'center'} mr={''}>
                            <img src={search} alt="search" className='max-phone:w-6' />
                            <Input value={value} onChange={changeHandler} placeholder='Search for movies or TV series' className='form-input ml-1 placeholder:opacity-50 text-white text-2xl-light before:border-b-0 after:border-b-greyish-blue after:border-b-[1px] max-phone:text-[18px]' />
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </>
    );
};

export default Navbar;
