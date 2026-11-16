import React from 'react';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__word" aria-hidden="true">
          WEBRIVO
        </div>

        <div className="footer__inner">
          <div className="footer__col">
            <a href="#top" className="brand" aria-label="Webrivo — back to top">
              <span className="brand__mark" aria-hidden="true">
                <span>W</span>
              </span>
              Webrivo
            </a>
            <p className="footer__lede">Websites for local businesses.</p>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Websites</a></li>
              <li><a href="#services">Local SEO</a></li>
              <li><a href="#services">Brand</a></li>
              <li><a href="#services">Support</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Studio</h4>
            <ul>
              <li><a href="#work">Work</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#calculator">Estimator</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:webrivo.official@gmail.com">webrivo.official@gmail.com</a></li>
              <li><a href="tel:+918050130969">+91 80501 30969</a></li>
              <li><a href="tel:+919113253754">+91 91132 53754</a></li>
              <li><a href="tel:+916366610809">+91 63666 10809</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Webrivo. All rights reserved.</span>

          <div className="footer__socials">
            <a href="https://www.instagram.com/webrivo" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/company/webrivo" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin aria-hidden="true" />
            </a>
            <a href="https://wa.me/918050130969" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle aria-hidden="true" />
            </a>
          </div>

          <div className="footer__legal">
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
