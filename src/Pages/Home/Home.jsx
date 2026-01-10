import React from 'react';
import Hero from './Hero';
import FAQ from './FAQ';
import Testimonials from './Testimonials';
import TopSixScholarships from './TopSixScholarships';
import CTA from '../CTA/CTA';
import HomeBlogs from '../HomeBlogs/HomeBlogs';

const Home = () => {
    return (
        <div>
            <Hero />
            <TopSixScholarships></TopSixScholarships>
            <Testimonials></Testimonials>
            <HomeBlogs></HomeBlogs>
            <FAQ></FAQ>
            <CTA></CTA>
        </div>
    );
};

export default Home;