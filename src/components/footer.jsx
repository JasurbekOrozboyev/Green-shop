import React from 'react';
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
    <footer className='container max-w-[1216px] m-auto mt-50'>
      <div className='flex justify-between items-start'>
        {[...Array(3)].map((_, i) => (
          <div className='w-[204px] h-[201px]' key={i}>
            <img src={IconGul} alt="gul" />
            <h2 className='text-4 font-bold'>{t('footer.gardenCareTitle')}</h2>
            <p className='text-[14px] text-[#727272]'>{t('footer.gardenCareText')}</p>
          </div>
        ))}
        <div className='w-[400px] h-[201px]'>
          <h2 className='text-[18px] font-bold'>{t('footer.newsletterTitle')}</h2>
          <div className='w-[354px] h-10 flex'>
            <input
              type="email"
              placeholder={t('footer.emailPlaceholder')}
              className='w-[265px] h-10 border rounded-bl rounded-tl px-3 py-1'
            />
            <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className='w-[85px] h-10'>
              {t('footer.join')}
            </Button>
          </div>
          <p className='text-[13px] text-[#727272]'>{t('footer.newsletterText')}</p>
        </div>
      </div>

      <div className='h-[88px] bg-[#EDF6EF]'>
        <ul className='flex justify-around items-center pt-[28px]'>
          <li className='flex items-center'>
            <img src={Icon} alt="Icon" className='w-[35px] h-[35px]' />
            <p className='text-2xl font-bold text-[#46A358]'>GREENSHOP</p>
          </li>
          <li className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faLocationDot} className='text-[#46A358] text-5' />
            <p className='w-[185px] h-11 text-[14px] text-[#3D3D3D]'>{t('footer.contact.address')}</p>
          </li>
          <li className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faEnvelope} className='text-[#46A358]' />
            <p className='text-[14px] text-[#3D3D3D]'>{t('footer.contact.email')}</p>
          </li>
          <li className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faPhone} className='text-[#46A358]' />
            <p className='text-[14px] text-[#3D3D3D]'>{t('footer.contact.phone')}</p>
          </li>
        </ul>
      </div>

      <div className='flex justify-between mt-5'>
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
            <h2 className='text-[18px] font-bold mb-5'>{t('footer.social')}</h2>
            <ul className='flex gap-4'>
              {[faFacebookF, faInstagram, faTwitter, faLinkedin, faYoutube].map((icon, idx) => (
                <li key={idx} className='border px-3 py-2 rounded border-[#46A358]'>
                  <FontAwesomeIcon icon={icon} className='text-[#46A35899]' />
                </li>
              ))}
            </ul>
            <h2 className='mt-[33px] mb-3 font-bold text-[18px]'>{t('footer.weAccept')}</h2>
            <ul className='flex items-center gap-10'>
              <li><FontAwesomeIcon icon={faCcPaypal} className='text-[20px]' /></li>
              <li><FontAwesomeIcon icon={faCcMastercard} className='text-[20px]' /></li>
              <li><FontAwesomeIcon icon={faCcVisa} className='text-[20px]' /></li>
              <li><p className='text-[6px] font-bold'>AMERICAN <br /> EXPRESS</p></li>
            </ul>
          </li>
        </ul>
      </div>

      <hr className='mt-5 text-green-500' />
      <h2 className='text-center text-[14px] text-[#3D3D3D]'>{t('footer.copyright')}</h2>
    </footer>
  );
};

export default Footer;
