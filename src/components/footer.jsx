import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF, faInstagram, faTwitter, faLinkedin,
  faYoutube, faCcPaypal, faCcMastercard, faCcVisa
} from '@fortawesome/free-brands-svg-icons';
import Icon from '../images/icon/Vector.svg';
import IconGul from "../images/section3/gulIcon.svg";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className='container max-w-[1216px] mx-auto px-4 py-10'>
      <div className='flex flex-col lg:flex-row justify-between gap-8'>
        {[...Array(3)].map((_, i) => (
          <div className='w-full lg:w-[204px]' key={i}>
            <img src={IconGul} alt="gul" />
            <h2 className='text-lg font-bold mt-2'>{t('footer.gardenCareTitle')}</h2>
            <p className='text-sm text-[#727272]'>{t('footer.gardenCareText')}</p>
          </div>
        ))}
        <div className='w-full lg:w-[400px]'>
          <h2 className='text-lg font-bold mb-2'>{t('footer.newsletterTitle')}</h2>
          <div className='flex flex-col sm:flex-row gap-2'>
            <input
              type="email"
              placeholder={t('footer.emailPlaceholder')}
              className='flex-1 h-10 border rounded px-3 py-1 text-sm'
            />
            <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className='h-10 min-w-[85px]'>
              {t('footer.join')}
            </Button>
          </div>
          <p className='text-sm text-[#727272] mt-2'>{t('footer.newsletterText')}</p>
        </div>
      </div>

      <div className='mt-10 bg-[#EDF6EF] py-6 px-4'>
        <ul className='flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left'>
          <li className='flex items-center gap-2'>
            <img src={Icon} alt="Icon" className='w-[35px] h-[35px]' />
            <p className='text-2xl font-bold text-[#46A358]'>GREENSHOP</p>
          </li>
          <li className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faLocationDot} className='text-[#46A358]' />
            <p className='text-sm text-[#3D3D3D]'>{t('footer.contact.address')}</p>
          </li>
          <li className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faEnvelope} className='text-[#46A358]' />
            <p className='text-sm text-[#3D3D3D]'>{t('footer.contact.email')}</p>
          </li>
          <li className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faPhone} className='text-[#46A358]' />
            <p className='text-sm text-[#3D3D3D]'>{t('footer.contact.phone')}</p>
          </li>
        </ul>
      </div>

      <div className='flex flex-col md:flex-row justify-between gap-8 mt-10'>
        <ul className='flex flex-col gap-2'>
          <li><p className='font-bold'>{t('footer.account.title')}</p></li>
          <li><p className='text-[#3D3D3D]'>{t('footer.account.account')}</p></li>
          <li><p className='text-[#3D3D3D]'>{t('footer.account.address')}</p></li>
          <li><p className='text-[#3D3D3D]'>{t('footer.account.wishlist')}</p></li>
        </ul>

        <ul className='flex flex-col gap-2'>
          <li><p className='font-bold'>{t('footer.categories.title')}</p></li>
          <li><p className='text-[#3D3D3D]'>{t('footer.categories.house')}</p></li>
          <li><p className='text-[#3D3D3D]'>{t('footer.categories.potter')}</p></li>
          <li><p className='text-[#3D3D3D]'>{t('footer.categories.seeds')}</p></li>
          <li><p className='text-[#3D3D3D]'>{t('footer.categories.small')}</p></li>
          <li><p className='text-[#3D3D3D]'>{t('footer.categories.accessories')}</p></li>
        </ul>

        <ul>
          <li>
            <h2 className='text-[18px] font-bold mb-4'>{t('footer.social')}</h2>
            <ul className='flex flex-wrap gap-4'>
              {[faFacebookF, faInstagram, faTwitter, faLinkedin, faYoutube].map((icon, idx) => (
                <li key={idx} className='border px-3 py-2 rounded border-[#46A358]'>
                  <FontAwesomeIcon icon={icon} className='text-[#46A35899]' />
                </li>
              ))}
            </ul>
            <h2 className='mt-6 mb-3 font-bold text-[18px]'>{t('footer.weAccept')}</h2>
            <ul className='flex items-center gap-6 flex-wrap'>
              <li><FontAwesomeIcon icon={faCcPaypal} className='text-[20px]' /></li>
              <li><FontAwesomeIcon icon={faCcMastercard} className='text-[20px]' /></li>
              <li><FontAwesomeIcon icon={faCcVisa} className='text-[20px]' /></li>
              <li><p className='text-[10px] font-bold leading-3'>AMERICAN <br /> EXPRESS</p></li>
            </ul>
          </li>
        </ul>
      </div>

      <hr className='mt-6 border-t border-green-500' />
      <h2 className='text-center text-sm text-[#3D3D3D] mt-4'>{t('footer.copyright')}</h2>
    </footer>
  );
};

export default Footer;
