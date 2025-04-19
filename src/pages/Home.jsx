import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faLinkedin, faYoutube, faCcPaypal, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import GulBir from "../images/section2/01.svg";
import GulIkki from "../images/section2/02.svg";
import GulUch from "../images/section2/03.svg";
import GulTort from "../images/section2/04.svg";
import Icon from '../images/icon/Vector.svg'
import IconGul from "../images/section3/gulIcon.svg";
import Category from '../Home/Main/Categories/Category';




const Home = () => {
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
    <Typography >
      <div className='container max-w-[1216px] m-auto overflow-hidden pt-2'>
        <ul className='flex transition-transform duration-700' style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <li className='w-full flex-shrink-0 flex justify-between items-center'>
          <div className='w-[50%]'>
              <p >Welcome to GreenShop</p>
              <h1 className='w-[571px] text-[80px] font-extrabold leading-tight mt-2'>
              LET'S MAKE A BETTER <span className='text-[#46A358]'>PLANET</span>
              </h1>
              <p className='w-[557px] h-[45px] text-[#727272] text-[14px] mt-2 mb-[55px]'>
                We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!
              </p>
              <Button variant="contained" sx={{backgroundColor: '#00C951',}} className='mt-[55px]'>
                <p>SHOP NOW</p>
              </Button>
            </div>
            <div className='w-[50%]'>
              <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower1.png?alt=media&token=0b53d608-7264-4c54-b497-a9bf054fcd9d" alt="gul" className='w-full'
              />
            </div>
          </li>
          <li className='w-full flex-shrink-0 flex justify-between items-center'>
          <div className='w-[50%]'>
              <p >Welcome to GreenShop</p>
              <h1 className='w-[571px] text-[80px] font-extrabold leading-tight mt-2'>
              LET'S LIVE IN A BETTER <span className='text-[#46A358]'>PLANET</span>
              </h1>
              <p className='w-[557px] h-[45px] text-[#727272] text-[14px] mt-2 mb-[55px]'>
                We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!
              </p>
              <Button variant="contained" sx={{backgroundColor: '#00C951',}} className='mt-[55px]'>
                <p>SHOP NOW</p>
              </Button>
            </div>
            <div className='w-[50%]'>
              <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-1.png?alt=media&token=74ea8d3d-06b5-41e7-bb12-7caaf3035a6d" alt="gul" className='w-full'
              />
            </div>
          </li>
          <li className='w-full flex-shrink-0 flex justify-between items-center'>
            <div className='w-[50%]'>
              <p >Welcome to GreenShop</p>
              <h1 className='w-[571px] text-[80px] font-extrabold leading-tight mt-2'>
              LET'S OBSERVE A BETTER <span className='text-[#46A358]'>PLANET</span>
              </h1>
              <p className='w-[557px] h-[45px] text-[#727272] text-[14px] mt-2 mb-[55px]'>
                We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!
              </p>
              <Button variant="contained" sx={{backgroundColor: '#00C951',}} className='mt-[55px]'>
                <p>SHOP NOW</p>
              </Button>
            </div>
            <div className='w-[50%]'>
              <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-2.png?alt=media&token=5b5addec-d344-4897-a983-95c9b10a1662" alt="gul" className='w-full'
              />
            </div>
          </li>
        </ul>
        <div className='flex justify-center mt-4 space-x-2'>
          {[...Array(slideCount)].map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-[100%]  ${currentSlide === index ? 'bg-[#46A358]' : 'bg-gray-300'}`}></button>
          ))}
        </div>
      </div>
          <div className='container max-w-[1216px] m-auto mt-10'>
            <div>
              <Category />
            </div>
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
                <h2 className='font-bold text-end'>SUMMER CACTUS <br /> & SUCCULENTS</h2>
                <p className=''>We are an online plant shop offering a wide range of cheap and trendy plants</p>
                <Button variant="contained" sx={{backgroundColor: '#00C951',}} className='w-[160px]'>
                <p>Find more <FontAwesomeIcon icon={faArrowRight} /></p>
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
                <h2 className='font-bold text-end'>SUMMER CACTUS <br /> & SUCCULENTS</h2>
                <p className=''>We are an online plant shop offering a wide range of cheap and trendy plants</p>
                <Button variant="contained" sx={{backgroundColor: '#00C951',}} className='w-[160px]'>
                <p>Find more <FontAwesomeIcon icon={faArrowRight} /></p>
              </Button>
              </div>
            </div>
          </div>
      </section>

      <section className='container max-w-[1216px] m-auto mt-12'>
          <div>
              <div>
                <h2 className='text-center font-bold text-[30px]'>Our Blog Posts</h2>
                <h5 className='text-center font-bold text-[14px] text-[#727272] mt-4'>We are an online plant shop offering a wide range of cheap and trendy plants. </h5>
              </div>
              <div className='mt-[35px]'>
                <ul className='flex justify-between items-center'>
                  <li className='w-[268px] h-[167px] flex flex-col gap-1'>
                    <img src={GulBir} alt="gul" />
                    <p className='text-[14px] text-[#46A358]'>September 12  I Read in 6 minutes</p>
                    <h2>Cactus & Succulent 
                    Care Tips</h2>
                    <p className='text-14px text-[#727272]'>Cacti are succulents are easy care plants for any home or patio. </p>
                    <a href="#" className=' hover:text-[#46A358]'>Read More <FontAwesomeIcon icon={faArrowRight} /></a>
                  </li>
                  <li className='w-[268px] h-[167px] flex flex-col gap-1'>
                    <img src={GulIkki} alt="gul" />
                    <p className='text-[14px] text-[#46A358]'>September 12  I Read in 6 minutes</p>
                    <h2>Cactus & Succulent 
                    Care Tips</h2>
                    <p className='text-14px text-[#727272]'>Cacti are succulents are easy care plants for any home or patio. </p>
                    <a href="#" className=' hover:text-[#46A358]'>Read More <FontAwesomeIcon icon={faArrowRight} /></a>
                  </li>
                  <li className='w-[268px] h-[167px] flex flex-col gap-1'>
                    <img src={GulUch} alt="gul" />
                    <p className='text-[14px] text-[#46A358]'>September 12  I Read in 6 minutes</p>
                    <h2>Cactus & Succulent 
                    Care Tips</h2>
                    <p className='text-14px text-[#727272]'>Cacti are succulents are easy care plants for any home or patio. </p>
                    <a href="#" className=' hover:text-[#46A358]'>Read More <FontAwesomeIcon icon={faArrowRight} /></a>
                  </li>
                  <li className='w-[268px] h-[167px] flex flex-col gap-1'>
                    <img src={GulTort} alt="gul" />
                    <p className='text-[14px] text-[#46A358]'>September 12  I Read in 6 minutes</p>
                    <h2>Cactus & Succulent 
                    Care Tips</h2>
                    <p className='text-14px text-[#727272]'>Cacti are succulents are easy care plants for any home or patio. </p>
                    <a href="#" className=' hover:text-[#46A358]'>Read More <FontAwesomeIcon icon={faArrowRight} /></a>
                  </li>
                </ul>
              </div>
          </div>
      </section>

      <footer className='container max-w-[1216px] m-auto mt-60'>
        <div className='flex justify-between items-start'>
          <div className='w-[204px] h-[201px]'>
            <img src={IconGul} alt="gul" />
            <h2 className='text-4 font-bold'>Garden Care</h2>
            <p className='text-[14px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
          <div className='w-[204px] h-[201px]'>
            <img src={IconGul} alt="gul" />
            <h2 className='text-4 font-bold'>Garden Care</h2>
            <p className='text-[14px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
          <div className='w-[204px] h-[201px]'>
            <img src={IconGul} alt="gul" />
            <h2 className='text-4 font-bold'>Garden Care</h2>
            <p className='text-[14px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
          <div className='w-[400px] h-[201px]'>
            <h2 className='text-[18px] font-bold'>Would you like to join newsletters?</h2>
            <div className='w-[354px] h-10'>
              <input type="email" placeholder='enter your email address...' className='w-[265px] h-10 border rounded-bl rounded-tl px-3 py-1'/>
              <Button variant="contained" sx={{backgroundColor: '#00C951',}} className='mt-[55px] w-[85px] h-10'>
                <p>Join</p>
              </Button>
            </div>
            <p className='w text-[13px] text-[#727272]'>We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours! </p>
          </div>
        </div>
        <div className='h-[88px] bg-[#EDF6EF]'>
          <ul className='flex justify-around items-center pt-[28px]'>
            <li className='flex items-center'>
                <img src={Icon} alt="Icon" className='w-[35px] h-[35px]'/>
                <p className='text-2xl font-bold text-[#46A358]'>GREENSHOP</p>
            </li>
            <li className='flex items-center gap-2'>
              <div>
              <FontAwesomeIcon icon={faLocationDot}  className='text-[#46A358] text-5'/>
              </div>
              <div>
                <p className='w-[185px] h-11 text-[14px] text-[#3D3D3D]'>70 West Buckingham Ave.
                Farmingdale, NY 11735</p>
              </div>
            </li>
            <li className='flex items-center gap-2'>
              <div>
              <FontAwesomeIcon icon={faEnvelope} className='text-[#46A358]'/>
              </div>
              <div>
                <p className='text-[14px] text-[#3D3D3D]'>contact@greenshop.com</p>
              </div>
            </li>
            <li className='flex items-center gap-2'>
              <div>
              <FontAwesomeIcon icon={faPhone} className='text-[#46A358]'/>
              </div>
              <div>
                <p className='text-[14px] text-[#3D3D3D]'>
                +88 01911 717 490
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className='flex justify-between mt-5'>
          <ul className='flex flex-col gap-2'>
            <li>
              <p className='font-bold'>My Account</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>My Account</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Address</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>
              Wishlist
              </p>
            </li>
          </ul>
          <ul className='flex flex-col gap-2'>
            <li>
              <p className='font-bold'>Categories</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>House Plants</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Potter Plants</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Seeds</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Small Plants</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Accessories</p>
            </li>
          </ul>
          <ul>
            <li>
              <h2 className='text-[18px] font-bold mb-5'>Social Media</h2>
              <div>
                <ul className='flex justify-between items-center gap-4'>
                  <li className='border px-3 py-2 rounded border-[#46A358]'>
                  <FontAwesomeIcon icon={faFacebookF} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A358]'>
                  <FontAwesomeIcon icon={faInstagram} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A35899]'>
                  <FontAwesomeIcon icon={faTwitter} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A35899]'>
                  <FontAwesomeIcon icon={faLinkedin} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A35899]'>
                  <FontAwesomeIcon icon={faYoutube} className='text-[#46A35899]'/>
                  </li>
                </ul>
                <h2 className='mt-[33px] mb-3 font-bold text-[18px]'>We accept</h2>
                <ul className='flex items-center gap-10'>
                  <li>
                  <FontAwesomeIcon icon={faCcPaypal}  className='text-[20px]'/>
                  </li>
                  <li>
                  <FontAwesomeIcon icon={faCcMastercard}  className='text-[20px]'/>
                  </li>
                  <li>
                  <FontAwesomeIcon icon={faCcVisa} className='text-[20px]' />
                  </li>
                  <li>
                      <p className='text-[6px] font-bold'>AMERICAN <br /> EXPRESS</p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <hr  className='mt-5 text-green-500'/>
        <h2 className='text-center text-[14px] text-[#3D3D3D]'>© 2021 GreenShop. All Rights Reserved.</h2>
      </footer>
    </Typography>
  );
};

export default Home;
