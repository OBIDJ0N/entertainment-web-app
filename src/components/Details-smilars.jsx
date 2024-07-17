import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules'
import { Typography } from '@mui/material';
import SmallCards from './Small-cards';

const DetailsSmilars = ({ similars }) => {
    return (
        <>
            {similars?.results && similars?.results.length > 0 && (
                <>
                    <Typography className='text-2xl mt-4'>Similar</Typography>
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={20}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper mt-4 custom-swiper similar-swiper"
                        grabCursor={true}
                    >
                        {similars?.results.map(item => (
                            <SwiperSlide key={item.id} className='w-40'>
                                <SmallCards item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </>
    )
}

export default DetailsSmilars