import { Typography } from '@mui/material';
import Footer from '../components/footer';
const Blog = () => {
  
  return <Typography >
  <div className='container max-w-[1216px] m-auto mt-5'>
    {/* Saytni o'zidan oldim imglarni */}
      <div className='w-full h-[300px] p-[50px] border border-gray-200 mt-3 flex max-2xl:h-[200px] max-md:h-[150px] justify-between rounded'>
      <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_1.png?alt=media&amp;token=8174091c-24b5-42a0-886d-845bd15cccb9" class="w-[15%] h-full" alt="blog_avatar_1"/>
      <img class="w-[15%] h-full mt-[20px]" src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_2.png?alt=media&amp;token=d2b8bf6f-7c67-4e93-b026-917f4291d9f6" alt="blog_avatar_2"/>
      <img class="w-[15%] h-full mt-[50px]" src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_3.png?alt=media&amp;token=7abda4b5-0f9e-4fc1-8353-e32194b925c9" alt="blog_avatar_3"/>
      <img class="w-[15%] h-full mt-[20px]" src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_4.png?alt=media&amp;token=2a9f4b03-30a0-4c89-b189-7c8835ab42e7" alt="blog_avatar_4"/>
      <img class="w-[15%] h-full" src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_5.png?alt=media&amp;token=f65d9df1-ea8b-4ebe-9d23-e3e768f0f701" alt="blog_avatar_5"></img>
      </div>
      <div>
        <h2 className='text-8xl text-center font-bold'>Monetize your content with <span className='text-green-500'>GreenShop</span></h2>
        <h3 className='text-4xl text-center mt-3'>Greenshop - a platform for buying and selling, publishing and monetizing all types of flowers: articles, notes, video, photos, podcasts or songs.</h3>
      </div>
      <div className='mt-10'>
        <h2 className='text-5xl font-bold text-center'>My Feed</h2>
        <center>
        <input className='w-[80%] h-10 border rounded m-3 p-2' type="search" placeholder='Search...'/>
        </center>
      </div>
      <div className='w-full grid grid-cols-3 gap-5 mt-10'>
        <div className='border rounded p-2'>
          <h2 className='font-bold mb-1 text-2xl'>How To Choose Wedding Flowers</h2>
          <p>Flowers are an essential element or accessory for every wedding. These are needed for the bridal bouquet, table flowers, entrances, interior décor, and bridesmaids' posies. However, picking ideal flowers for a wedding is an extremely confusing task for most brides and grooms. In fact, it is natural for them to argue over such subjects too.</p>
        </div>
        <div className='border rounded p-2'>
          <h2 className='font-bold mb-1 text-2xl'>FLOWER SUBSCRIPTIONS: A NEW WAY TO GIFT THIS HOLIDAY!</h2>
          <p>“You take away all the other luxuries in life, and if you can make someone smile and laugh, you have given the most special gift: happiness.” Brad Garrett</p>
        </div>
        <div className='border rounded p-2'>
          <h2 className='font-bold mb-1 text-2xl'>The History of the Teddy Bear for Collectors</h2>
          <p>For many people, memories of childhood include a teddy bear or two (or more). Over the years, the stuffed toy has served as a beloved source of comfort and is often a first friend. In adulthood, people continue to cherish these cuddly bears and even</p>
        </div>
        <div className='border rounded p-2'>
          <h2 className='font-bold mb-1 text-2xl'>The Resilience of Teddy Bears Through World Wars</h2>
          <p>The teddy bear, a symbol of comfort and companionship, proved its resilience during some of the most challenging periods of the 20th century, particularly World War I and World War II. Despite the turmoil and hardship brought about by these global co</p>
        </div>
        <div className='border rounded p-2'>
          <h2 className='font-bold mb-1 text-2xl'>A Symbol of Compassion</h2>
          <p>The teddy bear, an enduring symbol of childhood and comfort, has a surprisingly poignant origin story that dates back to 1902. It all began with a hunting trip in the dense woods of Mississippi, where President Theodore Roosevelt found himself in the</p>
        </div>
        <div className='border rounded p-2'>
          <h2 className='font-bold mb-1 text-2xl'>Express Your Emotions Through Flowers: The Meaning Behind Every Bloom</h2>
          <p>Flowers are more than just beauty — they are powerful messengers of emotion. Every bloom carries a special meaning, helping you express love, gratitude, and care without words. Discover how to choose</p>
        </div>
      </div>
  </div>

    <Footer/>
  
  </Typography>;
};

export default Blog;
