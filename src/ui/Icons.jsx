import { IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getItem, setItem } from '../helpers/persistance-storage';

const Icons = () => {
    const [activeButton, setActiveButton] = useState(() => {
        const savedState = getItem('activeButton');
        return savedState !== null ? JSON.parse(savedState) : 0;
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setItem('activeButton', JSON.stringify(activeButton));
    }, [activeButton]);

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setActiveButton(0);
                break;
            case '/movie':
                setActiveButton(1);
                break;
            case '/tv':
                setActiveButton(2);
                break;
            case '/genre/:type' || '/genre/:type/:id':
                setActiveButton(3);
                break;
            case '/bookmark':
                setActiveButton(4);
                break;
            default: 
        }
    }, [location.pathname]);

    const activeHandler = (index) => {
        setActiveButton(index);
        switch (index) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/movie');
                break;
            case 2:
                navigate('/tv');
                break;
            case 3:
                navigate('/genre/:type');
                break;
            case 4:
                navigate('/bookmark');
                break;
            default:
                navigate(-1);
        }
    };

    const buttons = [
        { svg: <path fillRule="evenodd" clipRule="evenodd" d="M1 0H8C8.6 0 9 0.4 9 1V8C9 8.6 8.6 9 8 9H1C0.4 9 0 8.6 0 8V1C0 0.4 0.4 0 1 0ZM1 11H8C8.6 11 9 11.4 9 12V19C9 19.6 8.6 20 8 20H1C0.4 20 0 19.6 0 19V12C0 11.4 0.4 11 1 11ZM19 0H12C11.4 0 11 0.4 11 1V8C11 8.6 11.4 9 12 9H19C19.6 9 20 8.6 20 8V1C20 0.4 19.6 0 19 0ZM12 11H19C19.6 11 20 11.4 20 12V19C20 19.6 19.6 20 19 20H12C11.4 20 11 19.6 11 19V12C11 11.4 11.4 11 12 11Z" fill="#fff" />, viewBox: "0 0 20 20" },
        { svg: <path fillRule="evenodd" clipRule="evenodd" d="M16.9556 0H3.04444C1.36304 0 0 1.36304 0 3.04444V16.9556C0 18.637 1.36304 20 3.04444 20H16.9556C17.763 20 18.5374 19.6792 19.1083 19.1083C19.6792 18.5374 20 17.763 20 16.9556V3.04444C20 2.23701 19.6792 1.46264 19.1083 0.891697C18.5374 0.320753 17.763 0 16.9556 0ZM4 9H2V7H4V9ZM4 11H2V13H4V11ZM18 9H16V7H18V9ZM18 11H16V13H18V11ZM18 2.74V4H16V2H17.26C17.4563 2 17.6445 2.07796 17.7833 2.21674C17.922 2.35552 18 2.54374 18 2.74ZM4 2H2.74C2.54374 2 2.35552 2.07796 2.21674 2.21674C2.07796 2.35552 2 2.54374 2 2.74V4H4V2ZM2 17.26V16H4V18H2.74C2.54374 18 2.35552 17.922 2.21674 17.7833C2.07796 17.6445 2 17.4563 2 17.26ZM17.26 18C17.6687 18 18 17.6687 18 17.26V16H16V18H17.26Z" fill="#5A698F" />, viewBox: "0 0 20 20" },
        { svg: <path fillRule="evenodd" clipRule="evenodd" d="M9.08 4.48109H20V20H0V4.48109H4.92L2.22 1.20272L3.78 0.029098L7 3.90883L10.22 0L11.78 1.20272L9.08 4.48109ZM2 6.42095V18.0601H12V6.42095H2ZM17 14.1804H15V12.2405H17V14.1804ZM15 10.3007H17V8.36082H15V10.3007Z" fill="#5A698F" />, viewBox: "0 0 20 20" },
        { svg: <path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2l0 82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9l0-107.2c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" fill="#5A698F" />, viewBox: "0 0 512 512" },
        { svg: <path d="M15.3866 0C15.5893 0 15.7832 0.0396563 15.9683 0.118969C16.2591 0.233532 16.4904 0.414188 16.6623 0.660939C16.8341 0.907689 16.92 1.18088 16.92 1.4805V18.5195C16.92 18.8191 16.8341 19.0923 16.6623 19.3391C16.4904 19.5858 16.2591 19.7665 15.9683 19.881C15.8008 19.9515 15.607 19.9868 15.3866 19.9868C14.9636 19.9868 14.5979 19.8458 14.2895 19.5638L8.46001 13.959L2.63054 19.5638C2.31328 19.8546 1.94757 20 1.53338 20C1.33069 20 1.13681 19.9603 0.951751 19.881C0.660939 19.7665 0.42961 19.5858 0.257766 19.3391C0.085922 19.0923 0 18.8191 0 18.5195V1.4805C0 1.18088 0.085922 0.907689 0.257766 0.660939C0.42961 0.414188 0.660939 0.233532 0.951751 0.118969C1.13681 0.0396563 1.33069 0 1.53338 0H15.3866Z" fill="#5A698F" />, viewBox: "0 0 20 20" },
    ];

    return (
        <>
            {buttons.map((button, index) => (
                <IconButton
                    key={index}
                    className='p-0'
                    onClick={() => activeHandler(index)}
                >
                    <svg width="20" height="20" viewBox={button.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className='max-phone:w-4 max-phone:h-4'>
                        {React.cloneElement(button.svg, {
                            className: `hover:fill-red transition duration-150 ease-in-out ${activeButton === index ? 'fill-white' : 'fill-greyish-blue'}`
                        })}
                    </svg>
                </IconButton>
            ))}
        </>
    );
}

export default Icons;
