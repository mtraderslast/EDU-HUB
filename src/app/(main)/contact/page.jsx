import ContactSection from '@/component/ContactSection'
import React from 'react'
import ContactTrustBadges from './ContactTrustBadges'
import ContactFAQ from './ContactFAQ'
import LegalDirectory from './LegalDirectory'

function Contact() {
    return (
        <section className='mt-22'>
            <ContactTrustBadges />
            <ContactSection />
            <ContactFAQ />
            <LegalDirectory />
        </section>
    )
}

export default Contact