import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation, Trans } from 'react-i18next';

import GulBir from "../images/section2/01.svg";
import GulIkki from "../images/section2/02.svg";
import GulUch from "../images/section2/03.svg";
import GulTort from "../images/section2/04.svg";

import Category from '../Home/Main/Categories/Category';
import Footer from '../components/footer';

const Home = () => {
  const { t } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = 3;
  const slideInterval = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval.current);
  }, []);

  return (
    <Typography>
      <div className='container max-w-[1216px] m-auto overflow-hidden pt-2'>
        <ul className='flex transition-transform duration-700' style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <li className='w-full flex-shrink-0 flex justify-between items-center'>
            <div className='w-[50%]'>
              <p>{t('welcome')}</p>
              <h1 className='w-[571px] text-[80px] font-extrabold leading-tight mt-2'>
                <Trans i18nKey="lets_make_a_better_planet">
                  LET'S MAKE A BETTER <span className='text-[#46A358]'>PLANET</span>
                </Trans>
              </h1>
              <p className='w-[557px] h-[45px] text-[#727272] text-[14px] mt-2 mb-[55px]'>
                {t('plant_shop_description')}
              </p>
              <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className='mt-[55px]'>
                <p>{t('shop_now')}</p>
              </Button>
            </div>
            <div className='w-[50%]'>
              <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower1.png?alt=media&token=0b53d608-7264-4c54-b497-a9bf054fcd9d" alt="gul" className='w-full' />
            </div>
          </li>

          <li className='w-full flex-shrink-0 flex justify-between items-center'>
            <div className='w-[50%]'>
              <p>{t('welcome')}</p>
              <h1 className='w-[571px] text-[80px] font-extrabold leading-tight mt-2'>
                <Trans i18nKey="lets_live_in_a_better_planet">
                  LET'S LIVE IN A BETTER <span className='text-[#46A358]'>PLANET</span>
                </Trans>
              </h1>
              <p className='w-[557px] h-[45px] text-[#727272] text-[14px] mt-2 mb-[55px]'>
                {t('plant_shop_description')}
              </p>
              <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className='mt-[55px]'>
                <p>{t('shop_now')}</p>
              </Button>
            </div>
            <div className='w-[50%]'>
              <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-1.png?alt=media&token=74ea8d3d-06b5-41e7-bb12-7caaf3035a6d" alt="gul" className='w-full' />
            </div>
          </li>

          <li className='w-full flex-shrink-0 flex justify-between items-center'>
            <div className='w-[50%]'>
              <p>{t('welcome')}</p>
              <h1 className='w-[571px] text-[80px] font-extrabold leading-tight mt-2'>
                <Trans i18nKey="lets_observe_a_better_planet">
                  LET'S OBSERVE A BETTER <span className='text-[#46A358]'>PLANET</span>
                </Trans>
              </h1>
              <p className='w-[557px] h-[45px] text-[#727272] text-[14px] mt-2 mb-[55px]'>
                {t('plant_shop_description')}
              </p>
              <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className='mt-[55px]'>
                <p>{t('shop_now')}</p>
              </Button>
            </div>
            <div className='w-[50%]'>
              <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-2.png?alt=media&token=5b5addec-d344-4897-a983-95c9b10a1662" alt="gul" className='w-full' />
            </div>
          </li>
        </ul>

        <div className='flex justify-center mt-4 space-x-2'>
          {[...Array(slideCount)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-[100%] ${currentSlide === index ? 'bg-[#46A358]' : 'bg-gray-300'}`}
            ></button>
          ))}
        </div>
      </div>

      <div className='container max-w-[1216px] m-auto mt-10'>
        <Category />
      </div>

      <section className='container max-w-[1216px] m-auto mt-10'>
        <div className='flex justify-between'>
          <div className='w-[586px] h-[250px] flex justify-between items-center'>
            <div className='w-[50%]'>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower1.png?alt=media&token=0b53d608-7264-4c54-b497-a9bf054fcd9d"
                alt="gul"
                className='w-full'
              />
            </div>
            <div className='w-[50%] flex items-end flex-col gap-3'>
              <h2 className='font-bold text-end'>{t('summer_cactus_succulents')}</h2>
              <p>{t('plant_shop_short_description')}</p>
              <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className='w-[160px]'>
                <p>{t('find_more')} <FontAwesomeIcon icon={faArrowRight} /></p>
              </Button>
            </div>
          </div>

          <div className='w-[586px] h-[250px] flex justify-between items-center'>
            <div className='w-[50%]'>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-2.png?alt=media&token=5b5addec-d344-4897-a983-95c9b10a1662"
                alt="gul"
                className='w-full'
              />
            </div>
            <div className='w-[50%] flex items-end flex-col gap-3'>
              <h2 className='font-bold text-end'>{t('summer_cactus_succulents')}</h2>
              <p>{t('plant_shop_short_description')}</p>
              <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className='w-[160px]'>
                <p>{t('find_more')} <FontAwesomeIcon icon={faArrowRight} /></p>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className='container max-w-[1216px] m-auto mt-12'>
        <div>
          <div>
            <h2 className='text-center font-bold text-[30px]'>{t('our_blog_posts')}</h2>
            <h5 className='text-center font-bold text-[14px] text-[#727272] mt-4'>{t('blog_subtitle')}</h5>
          </div>

          <div className='mt-[35px]'>
            <ul className='flex justify-between items-center'>
              {[GulBir, GulIkki, GulUch, GulTort].map((img, index) => (
                <li key={index} className='w-[268px] h-[167px] flex flex-col gap-1'>
                  <img src={img} alt="gul" />
                  <p className='text-[14px] text-[#46A358]'>{t('blog_post_date_read_time')}</p>
                  <h2>{t('cactus_succulent_care_tips')}</h2>
                  <p className='text-14px text-[#727272]'>{t('cactus_succulent_care_tips')}</p>
                  <a href="#" className='hover:text-[#46A358]'>{t('read_more')} <FontAwesomeIcon icon={faArrowRight} /></a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </Typography>
  );
};

export default Home;
