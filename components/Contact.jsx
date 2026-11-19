import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { ArrowRight, Check } from 'lucide-react';

export default function Contact() {
  const [state, handleSubmit] = useForm('xlgrlddg');

  return (
    <section id="contact" className="section section--line">
      <div className="container">
        <div className="contact">
          <div className="contact__aside reveal">
            <div>
              <span className="eyebrow">Contact</span>
              <h2 className="contact__big">
                Let&rsquo;s build
                <br />
                something
                <br />
                <span className="accent">local.</span>
              </h2>
            </div>

            <div className="contact__rows">
              <div className="contact__row">
                <span>Email</span>
                <a href="mailto:support@webrivo.in">support@webrivo.in</a>
              </div>
              <div className="contact__row">
                <span>Call</span>
                <a href="tel:+918050130969">+91 80501 30969</a>
              </div>
              <div className="contact__row">
                <span>More</span>
                <strong>+91 91132 53754 · +91 63666 10809</strong>
              </div>
              <div className="contact__row">
                <span>Studio</span>
                <strong>India · Working worldwide</strong>
              </div>
            </div>
          </div>

          <div className="contact__card reveal reveal--right" data-delay="1">
            {state.succeeded ? (
              <div className="modal__success">
                <span className="modal__success-icon" aria-hidden="true">
                  <Check />
                </span>
                <h3>Message sent</h3>
                <p className="modal__lead">We will get back to you within one working day.</p>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="firstName">First name</label>
                    <input id="firstName" name="firstName" type="text" placeholder="John" required />
                  </div>
                  <div className="field">
                    <label htmlFor="lastName">Last name</label>
                    <input id="lastName" name="lastName" type="text" placeholder="Doe" required />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="john@example.com" required />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="form__status form__status--error" />
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>

                <div className="field">
                  <label htmlFor="message">What are you building?</label>
                  <textarea id="message" name="message" rows="4" placeholder="A hotel, a clinic, a shop…" required />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="form__status form__status--error" />
                </div>

                <button
                  type="submit"
                  className="btn btn--primary btn--lg btn--wide"
                  disabled={state.submitting}
                >
                  {state.submitting ? 'Sending…' : 'Send message'}
                  {!state.submitting && <ArrowRight className="arrow" aria-hidden="true" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
