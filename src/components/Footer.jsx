import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <section className="w-full overflow-x-hidden flex flex-col items-center gap-4 justify-evenly text-white myNewfont bg-black py-8">
      <div className="text-2xl font-light tracking-wider uppercase text-center px-4" style={{ wordSpacing: '1rem', letterSpacing: '0.3em' }}>
        Hang onto your memories
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 text-center">

        {/* Social Media Links */}
        <div className="flex flex-row items-center gap-4 p-4 border-b-2 md:border-b-0 md:border-r-2">
          <Link to={'https://www.instagram.com/husain_not_hussain/'} target='_blank'>
            <FontAwesomeIcon icon={faInstagram} size="2x" className="text-white" />
          </Link>

          <Link to={'https://api.whatsapp.com/send/?phone=%2B919956309404&text&type=phone_number&app_absent=0'} target='_blank'>
            <FontAwesomeIcon icon={faWhatsapp} size="2x" className="text-white" />
          </Link>

          <Link to={'https://github.com/Shadab0072'} target='_blank'>
            <FontAwesomeIcon icon={faGithub} size="2x" className="text-white" />
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4">
          <button className="hover:bg-slate-300 hover:text-slate-800 border border-white py-2 px-8 text-sm font-light">
            Subscribe Now
          </button>
          <button className="hover:bg-slate-300 hover:text-slate-800 transition delay-100 border border-white py-2 px-8 text-sm font-light">
            Terms of Service
          </button>
        </div>

        {/* Copyright Information */}
        <div className="p-4 border-t-2 md:border-t-0 md:border-l-2 text-center">
          <p>© 2024 Blogify </p>
          <p> Powered by Shadab Husain</p>
        </div>
      </div>
    </section>
  )
}

export default Footer

