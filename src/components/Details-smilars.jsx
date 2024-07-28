import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swipers } from '../ui';

const DetailsSmilars = ({ similars }) => {
    return (
        <>
            {similars?.results && similars?.results.length > 0 && (
               <Swipers items={similars?.results} title={'Similar'} />
            )}
        </>
    )
}

export default DetailsSmilars