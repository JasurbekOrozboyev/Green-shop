import { Typography } from '@mui/material';
import Footer from '../components/footer';
import BlogTitle from '../Home/Main/Categories/Category/discount';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { t } = useTranslation();

  return (
    <Typography>
      <div className='container max-w-[1216px] m-auto mt-5'>
        <div className='w-full h-[300px] p-[50px] border border-gray-200 mt-3 flex max-2xl:h-[200px] max-md:h-[150px] justify-between rounded'>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_1.png?alt=media&amp;token=8174091c-24b5-42a0-886d-845bd15cccb9"
            className="w-[15%] h-full"
            alt="avatar"
          />
          <img
            className="w-[15%] h-full mt-[20px]"
            src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_2.png?alt=media&amp;token=d2b8bf6f-7c67-4e93-b026-917f4291d9f6"
            alt="avatar"
          />
          <img
            className="w-[15%] h-full mt-[50px]"
            src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_3.png?alt=media&amp;token=7abda4b5-0f9e-4fc1-8353-e32194b925c9"
            alt="avatar"
          />
          <img
            className="w-[15%] h-full mt-[20px]"
            src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_4.png?alt=media&amp;token=2a9f4b03-30a0-4c89-b189-7c8835ab42e7"
            alt="avatar"
          />
          <img
            className="w-[15%] h-full"
            src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_5.png?alt=media&amp;token=f65d9df1-ea8b-4ebe-9d23-e3e768f0f701"
            alt="avatar"
          />
        </div>

        <div>
          <h2 className='text-8xl text-center font-bold'>
            {t('monetize_content', { platform: 'GreenShop' })}
          </h2>
          <h3 className='text-4xl text-center mt-3'>
            {t('greenshop_description')}
          </h3>
        </div>

        <div className='mt-10'>
          <h2 className='text-5xl font-bold text-center'>{t('my_feed')}</h2>
          <center>
            <input
              className='w-[80%] h-10 border rounded m-3 p-2'
              type="search"
              placeholder={t('search_placeholder')}
            />
          </center>
        </div>

        <div>
          <BlogTitle />
        </div>
      </div>

      <Footer />
    </Typography>
  );
};

export default Blog;
