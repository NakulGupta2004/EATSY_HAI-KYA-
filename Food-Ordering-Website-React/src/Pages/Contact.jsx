import React from 'react'
import BlogHeader from '../Components/BlogHeader'
import Footer from '../Components/Footer'
import ContactMain from '../Components/ContactMain'
import '../Static/contact.css'

function Contact() {
  return (
    <>
      <BlogHeader title="Contact Us" />
      <ContactMain />
      <Footer />
    </>
  )
}

export default Contact
