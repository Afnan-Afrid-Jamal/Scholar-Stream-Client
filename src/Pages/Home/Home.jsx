import React from 'react';
import Hero from './Hero';
import FAQ from './FAQ';
import Testimonials from './Testimonials';
import TopSixScholarships from './TopSixScholarships';

const Home = () => {
    return (
        <div>
            <Hero />
            <TopSixScholarships></TopSixScholarships>
            <Testimonials></Testimonials>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;