import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

export const iconsArray = [
    {
        id: 'facebook_id',
        baseUrl: 'https://www.facebook.com/',
        icon: <FacebookIcon />
    },
    {
        id: 'instagram_id',
        baseUrl: 'https://www.instagram.com/',
        icon: <InstagramIcon />
    },
    {
        id: 'twitter_id',
        baseUrl: 'https://x.com/',
        icon: <XIcon />
    },
    {
        id: 'youtube_id',
        baseUrl: 'https://www.youtube.com/',
        icon: <YouTubeIcon />
    },
    {
        id: 'tiktok_id',
        baseUrl: 'https://tiktok.com/',
        icon: (
            <FontAwesomeIcon
                style={{ width: '24px', height: '20px' }}
                icon={faTiktok}
            />
        ),
    },
];