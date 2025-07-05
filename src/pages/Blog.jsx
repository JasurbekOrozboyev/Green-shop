import { Typography } from '@mui/material';
import Footer from '../components/footer';
import BlogTitle from '../Home/Main/Categories/Category/discount';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { t } = useTranslation();

  return (
    <Typography component="div"> 
      <div className='container max-w-[1216px] mx-auto px-4 mt-5 md:px-0'> 
        <div className='w-full h-[300px] p-4 sm:p-6 md:p-8 lg:p-[50px] border border-gray-200 mt-3 flex justify-between items-end rounded
                    max-2xl:h-[200px] max-md:h-[150px] max-sm:h-[100px] max-sm:px-2'> 
          <img
            src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_1.png?alt=media&amp;token=8174091c-24b5-42a0-886d-845bd15cccb9"
            className="w-[18%] sm:w-[15%] h-full object-contain self-start max-sm:hidden" 
            alt="avatar"
          />
          <img
            className="w-[18%] sm:w-[15%] h-full object-contain self-start mt-[10px] sm:mt-[20px] max-sm:w-[22%] max-xs:w-[25%]" 
            src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_2.png?alt=media&amp;token=d2b8bf6f-7c67-4e93-b026-917f4291d9f6"
            alt="avatar"
          />
          <img
            className="w-[18%] sm:w-[15%] h-full object-contain self-start mt-[20px] sm:mt-[50px] max-sm:w-[22%] max-xs:w-[25%]" 
            src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_3.png?alt=media&amp;token=7abda4b5-0f9e-4fc1-8353-e32194b925c9"
            alt="avatar"
          />
          <img
            className="w-[18%] sm:w-[15%] h-full object-contain self-start mt-[10px] sm:mt-[20px] max-sm:w-[22%] max-xs:w-[25%]" 
            src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_4.png?alt=media&amp;token=2a9f4b03-30a0-4c89-b189-7c8835ab42e7"
            alt="avatar"
          />
          <img
            className="w-[18%] sm:w-[15%] h-full object-contain self-start max-sm:hidden"
            src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_5.png?alt=media&amp;token=f65d9df1-ea8b-4ebe-9d23-e3e768f0f701"
            alt="avatar"
          />
        </div>

        <div className="mt-8 px-4 text-center"> 
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold'> 
            {t('monetize_content', { platform: 'GreenShop' })}
          </h2>
          <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-3'> 
            {t('greenshop_description')}
          </h3>
        </div>

        <div className='mt-10 px-4'> 
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center'>{t('my_feed')}</h2> 
          <div className='flex justify-center'>
            <input
              className='w-full sm:w-[80%] md:w-[70%] lg:w-[60%] h-10 border rounded m-3 p-2 focus:outline-none focus:ring-2 focus:ring-green-500'
              type="search"
              placeholder={t('search_placeholder')}
            />
          </div>
        </div>
        <div className='mt-10'>
          <BlogTitle />
        </div>
      </div>

      <Footer />
    </Typography>
  );
};

export default Blog;