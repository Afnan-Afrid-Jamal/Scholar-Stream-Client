import React from 'react';
import Hero from './Hero';
import FAQ from './FAQ';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Hero />
            <Testimonials></Testimonials>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;