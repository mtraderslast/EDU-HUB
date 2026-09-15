import Banner from '@/component/Banner'
import ContactSection from '@/component/ContactSection'
import CourseCategories from '@/component/CourseCategories'
import FeaturedCourses from '@/component/FeaturedCourses'
import HomeBlogsSection from '@/component/HomeBlogsSection'
import Reviews from '@/component/Reviews'
import TrendingCoursesBanner from '@/component/TrendingCoursesBanner'
import React from 'react'

function Home() {
    return (
        <div className='mt-20'>
            <Banner />
            <CourseCategories />
            <FeaturedCourses />
            <TrendingCoursesBanner />
            <HomeBlogsSection />
            <Reviews />
            <ContactSection />
        </div>
    )
}

export default Home