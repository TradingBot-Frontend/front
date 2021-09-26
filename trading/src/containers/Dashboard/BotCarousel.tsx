import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import BotCard from '@components/TradingBot/BotCard';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

interface ItemProps {
  name: string;
  description: string;
}

function Item({ name, description }: ItemProps) {
  return (
    <Paper>
      <h2>{name}</h2>
      <p>{description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

const items = [
  { name: '1', description: '1' },
  { name: '2', description: '2' },
  { name: '3', description: '3' },
  { name: '4', description: '4' },
  { name: '5', description: '5' },
];

export default function BotCarousel() {
  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 2,
  //   initialSlide: 0,
  // };
  // return (
  //   <Box
  //     component="div"
  //     sx={{ maxWidth: '100vw', width: '100%', overflow: 'hidden' }}
  //   >
  //     <Slider >
  //       {items.map((item) => (
  //         <Item
  //           key={item.name}
  //           name={item.name}
  //           description={item.description}
  //         />
  //       ))}
  //     </Slider>
  //   </Box>
  // );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      // slidesPerGroup={3}
      loop
      loopFillGroupWithBlank
      pagination={{
        clickable: true,
      }}
      navigation
      className="mySwiper"
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
    </Swiper>
  );
}
