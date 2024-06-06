import { useState, useEffect } from "react";
import { PageLoader } from "../components/elements/spinners";
import { Link } from "react-router-dom";
export const Terms = ()=> {
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
                  <h2 className="mb-10">Privacy Policy</h2>
                  
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box mt-50">
          <div className="post-loop-grid">
            <div className="container">
              <div className>
                <b className="font-lg mt-20">
                Privacy Policy for Early Warning and Early Response System
                </b>
                <p className="font-md color-text-paragraph mt-20">
                  The PARTNER- EWERs system is committed to protecting the privacy and security of your
                  personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard
                  your information when you use our Early Warning and Early Response System (EWERS). By
                  accessing or using EWERS, you agree to this Privacy Policy. Please read it carefully to
                  understand our practices regarding your personal information.
                </p>
              </div>
            



              <div className="row mt-30">
                <div className="col-lg-12 col-md-12 col-sm-12">
                
                  <h5 className="mt-15">1. Information We Collect</h5>
                  <p> We collect various types of information when you use EWERS, including: </p>
                  <div className="mt-5">
                      <h6 className="ml-20">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          Personal Information: This may include your name, contact information, demographic
                          information, and any other information you provide to us voluntarily.
                        </span>
                      </h6> 

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                        Location Information: We may collect your device&#39;s GPS location or other similar information to
                        provide location-based services.
                        </span>
                      </h6>

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          Usage Information: We gather information about how you interact with EWERS, such as the
                          features you use, the pages you visit, and the actions you take.
                        </span>
                      </h6>

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          Device Information: We collect information about the device you use to access EWERS,
                          including its unique device identifier, IP address, operating system, and browser type.
                        </span>
                      </h6>

                  </div>

                  <h5 className="mt-15">2. How We Use Your Information</h5>
                  <p>We may use the information we collect for various purposes, including: </p>
                  <div className="mt-5">
                      <h6 className="ml-20">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          Providing and maintaining EWERS.
                        </span>
                      </h6> 

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          Improving and customizing EWERS based on user preferences.
                        </span>
                      </h6>

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          Communicating with you regarding updates, changes, or other administrative information.
                        </span>
                      </h6>

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          Analyzing usage trends and patterns to enhance our services.
                        </span>
                      </h6>

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          Detecting and preventing fraud, security breaches, or other potentially illegal activities.
                        </span>
                      </h6>

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          Complying with legal obligations or responding to lawful requests from authorities.
                        </span>
                      </h6>

                  </div>

                  <h5 className="mt-15">3. Disclosure of Your Information </h5>
                  <p>We may disclose your information in the following circumstances: </p>
                  <div className="mt-5">
                      <h6 className="ml-20">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          With your consent or at your direction.
                        </span>
                      </h6> 

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          To comply with applicable laws, regulations, or legal processes.
                        </span>
                      </h6>

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                          To protect the rights, property, or safety of our users, or others.
                        </span>
                      </h6>
                  </div>


                  <h5 className="mt-15">4. Data Security </h5>
                  <p>
                    We employ reasonable security measures to safeguard your personal information against
                    unauthorized access, disclosure, alteration, or destruction. However, no method of transmission
                    over the internet or electronic storage is entirely secure, and we cannot guarantee absolute
                    security. 
                  </p>

                  <h5 className="mt-15">5. Your Choices </h5>
                  <p>You have certain choices regarding the collection, use, and sharing of your information: </p>
                  <div className="mt-5">
                      <h6 className="ml-20">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                        You can opt-out of certain data collection features, such as location tracking, by adjusting your device settings.
                        </span>
                      </h6> 

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                        You may choose not to provide certain information, but this may limit your ability to access certain features of EWERS.
                        </span>
                      </h6>

                      <h6 className="ml-20 mt-1">. 
                        <span className="ml-10" style={{fontSize: '15px', fontWeight: 'lighter'}}> 
                        You can review and update your personal information by contacting us using the information provided below.
                        </span>
                      </h6>
                  </div>

                  <h5 className="mt-15">6. Children&#39;s Privacy </h5>
                  <p>EWERS is not intended for children under the age of 13. We do not knowingly collect personal
                      information from children under 13. If you believe that a child under 13 has provided us with
                      personal information, please contact us, and we will take steps to delete such information. 
                  </p>

                  <h5 className="mt-15">7. Changes to This Privacy Policy </h5>
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                    requirements. We will notify you of any material changes by posting the new Privacy Policy on
                    this page.personal information, please contact us, and we will take steps to delete such information. 
                  </p>

                  <h5 className="mt-15">8. Contact Us </h5>
                  <p>
                    If you have any questions, concerns, or complaints about this Privacy Policy or our handling of
                    your information, please contact us at info@partner-ewers.org.
                    <br/>
                    By using EWERS, you consent to the collection, use, and disclosure of your information as
                    described in this Privacy Policy.
                  </p>

                  <h5 className="mt-15">9. Third-Party Links and Services </h5>
                  <p>
                    EWERS does not contain links to third-party websites, services, or applications that are not
                    operated or controlled by us. This Privacy Policy does not apply to third-party services, and we
                    are not responsible for their content, privacy practices, or security measures. We encourage you
                    to review the privacy policies of any third-party services you interact with.
                  </p>

                  <h5 className="mt-15">10. Data Retention </h5>
                  <p>
                    We will retain your personal information for as long as necessary to fulfill the purposes outlined
                    in this Privacy Policy, unless a longer retention period is required or permitted by law. We will
                    also retain and use your information to comply with our legal obligations, resolve disputes, and
                    enforce our agreements.
                  </p>

                  <h5 className="mt-15">11. GDPR Compliance (European Economic Area Residents) </h5>
                  <p>
                      If you are a resident of the European Economic Area (EEA), you may have certain rights
                      regarding the processing of your personal data under the General Data Protection Regulation
                      (GDPR). For more information about your rights and how to exercise them, please see our
                      [GDPR Compliance Notice] or contact us using the information provided in Section 8.
                  </p>

                  <h5 className="mt-15">12. Acceptance of Terms </h5>
                  <p>
                      By using EWERS, you acknowledge that you have read this Privacy Policy and agree to its terms
                      and conditions. If you do not agree with this Privacy Policy, please do not use EWERS.
                  </p>
                  

                  <h5 className="mt-15">13. Interpretation  </h5>
                  <p>
                    Any capitalized terms not defined in this Privacy Policy have the meanings given to them in our
                    Terms of Service. In the event of any conflict between this Privacy Policy and our Terms of
                    Service, the Terms of Service shall prevail.
                    <br/>
                    This Privacy Policy was last updated on 01/03/2024. We reserve the right to update or change
                    this Privacy Policy at any time, so please review it periodically. Your continued use of EWERS
                    after we post any modifications to this Privacy Policy will constitute your acknowledgment of
                    the modifications and your consent to abide and be bound by the modified Privacy Policy.
                    <br/>
                    If you have any questions about this Privacy Policy, please contact us at 
                    <Link style={{color: 'red'}} to="/contact" >
                      &nbsp; @ here
                    </Link> 
                    <br/>
                    Thank you for trusting us with your information. We are committed to protecting your privacy
                    and providing you with a secure and reliable experience when using EWERS.
                  </p>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </main>
    }
      
    </>
  )
}