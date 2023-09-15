import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
const Hero = () => {
    return (
        <div className='text-center max-w-screen-xl mx-auto'>
             <Carousel autoPlay="true" infiniteLoop  interval="1500">
                <div >
                    <img src="https://i.ibb.co/DkTbCzR/ewu.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co/zFxXmv4/ewu2.jpg" />
                    
                </div>
                <div>
                    <img src="https://i.ibb.co/JpF34ZG/ewu22.jpg" />
                </div>
            </Carousel>
        </div>
    );
};

export default Hero;