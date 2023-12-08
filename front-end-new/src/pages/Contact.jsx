import { useState, useEffect } from "react";
import { PageLoader } from "../components/elements/spinners";

export const Contact = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  })

  return (
    <>
    {
      loading ? <PageLoader /> :
      <main className="main">
        <section className="section-box">
          <div className="breacrumb-cover bg-img-about">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="mb-10">About Us</h2>
                  <p className="font-lg color-text-paragraph-2">Get the latest news, updates and tips</p>
                </div>
                <div className="col-lg-6 text-lg-end">
                  <ul className="breadcrumbs mt-40">
                    <li><a className="home-icon" href="#">Home</a></li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
       
        <section className="section-box mt-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mb-40">
                <h4 className="mt-5 mb-10">How to Reach Us</h4>
                <p className="font-md color-text-paragraph-2">
                    Do you want to reach out to us? We’re here to assist you in every way we can. Whether you have
                    questions, need support, or want to join our community of volunteers, we value your inquiry and look
                    forward to hearing from you.
                </p>
                <p className="font-md color-text-paragraph-2">
                  For general questions, information, or anything else you&#39;d like to discuss, please feel free to email us at
                  <span className="font-md color-brand-2 mt-20 d-inline-block"> info@ewersystems.org. </span> We have a 24/7 team dedicated to responding promptly to your queries..
                </p>

                <br/>

                
                <h4 className="mt-5 mb-10">User Support</h4>
                <p className="font-md color-text-paragraph-2">
                  If you&#39;re an existing user and require assistance with using the EWER system, our dedicated support
                  team is ready to help. Reach out to us at <span className="font-md color-brand-2 mt-20 d-inline-block">support@ewerssytems.org &nbsp;</span>, 
                  and we&#39;ll provide the support you
                  need.
                </p>
                <br/>

                <h4 className="mt-5 mb-10">Collaboration Opportunities</h4>
                <p className="font-md color-text-paragraph-2">
                  We welcome partnerships, collaborations, and opportunities to work together. If you have a proposal,
                  idea, or information on how we can improve the Ewers system, please send us a message at 
                  <span className="font-md color-brand-2 mt-20 d-inline-block"> &nbsp;  engage@Ewersystem.org </span>, and we&#39;ll get back to you to explore how we can create value together.
                </p>
                <br/>

                <h4 className="mt-5 mb-10">Visit Us</h4>
                <p className="font-md color-text-paragraph-2">
                  If you&#39;d like to meet us in person or have a discussion at our offices, here&#39;s our physical address: Suit24,
                  Central Business District, Abuja. Please schedule an appointment in advance to ensure someone is
                  available to assist you.
                </p>
                <br/>

                <h4 className="mt-5 mb-10">Connect on Social Media</h4>
                <p className="font-md color-text-paragraph-2">
                  Stay updated with the latest news, innovations, and insights by following us on our social media
                  channels. You can find us on [Facebook], [Twitter], [LinkedIn], and [Instagram]. Join the conversation
                  and be part of our community.
                </p>
                <br/>

                <h4 className="mt-5 mb-10">Privacy Assurance</h4>
                <p className="font-md color-text-paragraph-2">
                  Rest assured that your privacy is important to us. We will use the information you provide exclusively for
                  the purpose of assisting you. For more details on our privacy policy, please refer to our [Privacy Policy]
                  page.
                </p>
                <br/>
                
              </div>
              <div className="col-lg-4 text-center d-none d-lg-block">
              <img src="/images/contact-us.png" alt="joxBox" />
                </div>
            </div>
          </div>
        </section>
      </main>
    }
      
    </>
  )
}