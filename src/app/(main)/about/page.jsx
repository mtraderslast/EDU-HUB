import React from 'react'
import AboutHero from './AboutHero'
import AboutUs from './AboutUs'
import OurStory from './OurStory'
import RefundPolicyAlert from './RefundPolicyAlert'
import FAQSection from './FAQSection'

function About() {
    return (
        <section className='mt-20'>
            <AboutHero />
            <OurStory />
            <AboutUs />
            <FAQSection />
            <RefundPolicyAlert />
        </section>
    )
}

export default About