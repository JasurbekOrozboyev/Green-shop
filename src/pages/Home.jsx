import { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(nextSlide, 5000);
  }, [currentSlide]); 

  return (
    <Typography component="div"> 
      <div className='container max-w-[1216px] mx-auto overflow-hidden pt-2 px-4 md:px-0'>
        <ul
          className='flex transition-transform duration-700'
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <li className='w-full flex-shrink-0 flex flex-col md:flex-row justify-between items-center py-8'> 
            <div className='w-full md:w-[50%] text-center md:text-left order-2 md:order-1'>
              <p className='text-base md:text-lg'>{t('welcome')}</p> 
              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold leading-tight mt-2 max-w-full md:max-w-[571px] mx-auto md:mx-0'> 
                <Trans i18nKey="lets_make_a_better_planet">
                  LET'S MAKE A BETTER <span className='text-[#46A358]'>PLANET</span>
                </Trans>
              </h1>
              <p className='text-sm md:text-base text-[#727272] mt-2 mb-8 md:mb-[55px] max-w-full md:max-w-[557px] mx-auto md:mx-0'> 
                {t('plant_shop_description')}
              </p>
              <Button variant="contained" sx={{ backgroundColor: '#00C951', '&:hover': { backgroundColor: '#00B345' } }} className='mt-4 md:mt-[55px] px-6 py-3 text-base md:text-lg'> 
                {t('shop_now')}
              </Button>
            </div>
            <div className='w-full md:w-[50%] mt-8 md:mt-0 order-1 md:order-2'> 
              <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower1.png?alt=media&token=0b53d608-7264-4c54-b497-a9bf054fcd9d" alt="gul" className='w-full h-auto object-contain max-h-[400px] md:max-h-full' />
            </div>
          </li>

          <li className='w-full flex-shrink-0 flex flex-col md:flex-row justify-between items-center py-8'>
            <div className='w-full md:w-[50%] text-center md:text-left order-2 md:order-1'>
              <p className='text-base md:text-lg'>{t('welcome')}</p>
              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold leading-tight mt-2 max-w-full md:max-w-[571px] mx-auto md:mx-0'>
                <Trans i18nKey="lets_live_in_a_better_planet">
                  LET'S LIVE IN A BETTER <span className='text-[#46A358]'>PLANET</span>
                </Trans>
              </h1>
              <p className='text-sm md:text-base text-[#727272] mt-2 mb-8 md:mb-[55px] max-w-full md:max-w-[557px] mx-auto md:mx-0'>
                {t('plant_shop_description')}
              </p>
              <Button variant="contained" sx={{ backgroundColor: '#00C951', '&:hover': { backgroundColor: '#00B345' } }} className='mt-4 md:mt-[55px] px-6 py-3 text-base md:text-lg'>
                {t('shop_now')}
              </Button>
            </div>
            <div className='w-full md:w-[50%] mt-8 md:mt-0 order-1 md:order-2'>
              <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-1.png?alt=media&token=74ea8d3d-06b5-41e7-bb12-7caaf3035a6d" alt="gul" className='w-full h-auto object-contain max-h-[400px] md:max-h-full' />
            </div>
          </li>

          <li className='w-full flex-shrink-0 flex flex-col md:flex-row justify-between items-center py-8'>
            <div className='w-full md:w-[50%] text-center md:text-left order-2 md:order-1'>
              <p className='text-base md:text-lg'>{t('welcome')}</p>
              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold leading-tight mt-2 max-w-full md:max-w-[571px] mx-auto md:mx-0'>
                <Trans i18nKey="lets_observe_a_better_planet">
                  LET'S OBSERVE A BETTER <span className='text-[#46A358]'>PLANET</span>
                </Trans>
              </h1>
              <p className='text-sm md:text-base text-[#727272] mt-2 mb-8 md:mb-[55px] max-w-full md:max-w-[557px] mx-auto md:mx-0'>
                {t('plant_shop_description')}
              </p>
              <Button variant="contained" sx={{ backgroundColor: '#00C951', '&:hover': { backgroundColor: '#00B345' } }} className='mt-4 md:mt-[55px] px-6 py-3 text-base md:text-lg'>
                {t('shop_now')}
              </Button>
            </div>
            <div className='w-full md:w-[50%] mt-8 md:mt-0 order-1 md:order-2'>
              <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-2.png?alt=media&token=5b5addec-d344-4897-a983-95c9b10a1662" alt="gul" className='w-full h-auto object-contain max-h-[400px] md:max-h-full' />
            </div>
          </li>
        </ul>

        <div className='flex justify-center mt-4 space-x-2 pb-8 md:pb-0'> 
          {[...Array(slideCount)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSlide === index ? 'bg-[#46A358]' : 'bg-gray-300'}`}
            ></button>
          ))}
        </div>
      </div>

      <div className='container max-w-[1216px] mx-auto mt-10 px-4 md:px-0'>
        <Category />
      </div>


      <section className='container max-w-[1216px] mx-auto mt-10 px-4 md:px-0'>
        <div className='flex flex-col md:flex-row justify-between gap-6'> 
          <div className='w-full md:w-[586px] h-auto md:h-[250px] flex flex-col sm:flex-row justify-between items-center bg-[#FBFBFB] p-4 rounded-md shadow-sm'> 
            <div className='w-full sm:w-[50%] mb-4 sm:mb-0'>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower1.png?alt=media&token=0b53d608-7264-4c54-b497-a9bf054fcd9d"
                alt="gul"
                className='w-full h-auto object-contain max-h-[150px]'
              />
            </div>
            <div className='w-full sm:w-[50%] flex flex-col items-center sm:items-end gap-2 text-center sm:text-right'> 
              <h2 className='font-bold text-lg sm:text-xl'>{t('summer_cactus_succulents')}</h2>
              <p className='text-sm text-[#727272]'>{t('plant_shop_short_description')}</p>
              <Button variant="contained" sx={{ backgroundColor: '#00C951', '&:hover': { backgroundColor: '#00B345' } }} className='w-[160px] mt-2'>
                {t('find_more')} <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Button>
            </div>
          </div>

          
          <div className='w-full md:w-[586px] h-auto md:h-[250px] flex flex-col sm:flex-row justify-between items-center bg-[#FBFBFB] p-4 rounded-md shadow-sm'> 
            <div className='w-full sm:w-[50%] mb-4 sm:mb-0'>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-2.png?alt=media&token=5b5addec-d344-4897-a983-95c9b10a1662"
                alt="gul"
                className='w-full h-auto object-contain max-h-[150px]'
              />
            </div>
            <div className='w-full sm:w-[50%] flex flex-col items-center sm:items-end gap-2 text-center sm:text-right'> 
              <h2 className='font-bold text-lg sm:text-xl'>{t('summer_cactus_succulents')}</h2>
              <p className='text-sm text-[#727272]'>{t('plant_shop_short_description')}</p>
              <Button variant="contained" sx={{ backgroundColor: '#00C951', '&:hover': { backgroundColor: '#00B345' } }} className='w-[160px] mt-2'>
                {t('find_more')} <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className='container max-w-[1216px] mx-auto mt-12 px-4 md:px-0'>
        <div className='text-center'> 
          <h2 className='font-bold text-2xl md:text-[30px]'>{t('our_blog_posts')}</h2>
          <h5 className='font-bold text-sm md:text-[14px] text-[#727272] mt-4'>{t('blog_subtitle')}</h5>
        </div>

        <div className='mt-[35px]'>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center'>
            {[GulBir, GulIkki, GulUch, GulTort].map((img, index) => (
              <li key={index} className='w-full max-w-[268px] flex flex-col gap-2 p-3 border rounded-lg shadow-sm'> 
                <img src={img} alt="gul" className='w-full h-[167px] object-cover rounded-md' /> 
                <p className='text-xs text-[#46A358] font-medium mt-2'>{t('blog_post_date_read_time')}</p>
                <h2 className='font-semibold text-lg text-gray-800'>{t('cactus_succulent_care_tips')}</h2>
                <p className='text-sm text-[#727272] line-clamp-3'>{t('cactus_succulent_care_tips')}</p> 
                <a href="#" className='hover:text-[#46A358] text-sm font-medium mt-2'>{t('read_more')} <FontAwesomeIcon icon={faArrowRight} className="ml-1" /></a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer /> 
    </Typography>
  );
};

export default Home;