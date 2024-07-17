import { Box, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import Home from './Home';

const Main = ({ loadingBarRef }) => {
    useEffect(() => {
        if (loadingBarRef.current) {
            loadingBarRef.current.complete();
        }
    }, [loadingBarRef]);

    return (
        <>
            <Stack ml={'2rem'} className='mt-2 max-tablet:mx-6 max-tablet:mb-0 max-phone:mx-4 max-phone:m-2'>
                <Box ml={'6rem'} className='max-tablet:ml-0'>
                    <Home />
                </Box>
            </Stack>
        </>
    );
};

export default Main;
