import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Paper, Button } from '@material-ui/core';
import BotCard from '../../components/TradingBot/BotCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MybotBoard.css';

const MyBotWrapper = styled.div`
  /* width: 100%; */
  height: 20rem;
  max-width: 100vw;
  width: 100%;
  overflow: hidden;
`;

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

export const MybotBoard = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       infinite: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  const items = [
    { name: '1', description: '1' },
    { name: '2', description: '2' },
    { name: '3', description: '3' },
    { name: '4', description: '4' },
    { name: '5', description: '5' },
  ];

  return (
    <MyBotWrapper>
      <Slider {...settings}>
        {/* {items.map((item) => (
          <Item
            key={item.name}
            name={item.name}
            description={item.description}
          />
        ))} */}
        <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
      </Slider>
    </MyBotWrapper>
  );
};
