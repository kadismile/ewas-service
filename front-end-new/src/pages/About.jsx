import { useState, useEffect } from "react";
import { PageLoader } from "../components/elements/spinners";
export const About = ()=> {
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
                  
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box mt-50">
          <div className="post-loop-grid">
            <div className="container">
              <div className="text-center">
                
                <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">About Us</h2>
                <p className="font-md color-text-paragraph mt-20">
                  The EWER system is dedicated to safeguarding lives and livelihoods through cutting-edge Early Warning
                  and Early Response solutions. Our mission is to create a safer and more resilient world by providing
                  timely, accurate, and actionable information when it matters most.
                </p>
              </div>
              <div className="row mt-70">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <img src="/images/about-us-body.webp" alt="joxBox" />

                  <h3 className="mt-15">Our Approach</h3>
                  <div className="mt-20">
                    <p className="font-md color-text-paragraph mt-20">
                    <b style={{fontWeight: 'bolder'}}> Cutting-Edge Technology: </b>We harness the latest technological advancements, such as AI, machine
                    learning, and IoT, to deliver accurate and timely information.
                    </p>
                  </div>

                
                  <div className="mt-20">
                    <p className="font-md color-text-paragraph mt-20">
                    <b style={{fontWeight: 'bolder'}}> Data-Driven Insights: </b>Our systems collect, process, and analyze vast amounts of data to provide
                      actionable insights for decision-makers.
                    </p>
                  </div>

                  <div className="mt-20">
                    <p className="font-md color-text-paragraph mt-20">
                    <b style={{fontWeight: 'bolder'}}> Community-Centric Solutions: </b>We work closely with communities and local stakeholders to ensure our
                      responses are tailored to their unique needs and challenges.
                    </p>
                  </div>

                  <div className="mt-20">
                    <p className="font-md color-text-paragraph mt-20">
                    <b style={{fontWeight: 'bolder'}}> Continuous Innovation: </b>We are committed to staying at the forefront of disaster management,
                        continuously improving our systems to better protect lives and property.
                    </p>
                  </div>
                </div>
                
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <h3 className="mt-15">Our Vision</h3>
                  <div className="mt-20">
                    <p className="font-md color-text-paragraph mt-20">
                      We envision a world where communities, Citizens, and governments are empowered with the tools and
                      knowledge to mitigate the impact of Crisis, emergencies, and conflicts. We believe in a future where
                      lives are saved, resources are conserved, and chaos is replaced with informed, coordinated, and
                      effective responses.
                    </p>
                  </div>

                  <h3 className="mt-15">Who We Are</h3>
                  <div className="mt-20">
                    <p className="font-md color-text-paragraph mt-20">
                      We are a USAID-sponsored Activity that brings together Mercy Corps Nigeria (MCN), the West
                      African Network for Peace-building (WANEP), the Institute for Peace and Conflict Resolution
                      (IPCR), the Plateau Peace-building Agency (PPBA), and the Kaduna State Peace Commission
                      (KSPC) in a consortium to enhance the effectiveness of Early Warning and Early Response
                      (EWER) system in troubled regions across Nigeria.
                    </p>

                    <p className="font-md color-text-paragraph mt-20">
                      This PARTNER project seeks to &quot;strategically reimagine the entire EWER process whereby early
                      warning information is monitored, collated, analyzed, formatted, and disseminated to
                      stakeholders in the system that are positioned to receive and act upon that information.&quot; This
                      will promote quick response, improve social cohesion, and enhance peace-building efforts
                      among Nigerian communities at the state and federal levels.
                    </p>

                    <p className="font-md color-text-paragraph mt-20">
                      The goal of the EWER system is to enable citizens and organizations to meaningfully engage in
                      effective early warning signaling and early and timely responses from authorities.
                    </p>
                  </div>           
                </div>
              </div>




              <div className="row mt-70">
                
                
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <h3 className="mt-15">Key Features and Benefits of the EWERS System</h3>
                  <div className="mt-20">
                    <p className="font-md color-text-paragraph mt-20">
                      <b style={{fontWeight: 'bolder'}}> Real-Time Data Integration: </b>Our system seamlessly integrates real-time data from a wide range of
                      sources, including real time reporting, satellite imagery, and more. This enables us to provide up-to-the-
                      minute information about potential threats.
                    </p>
                    
                    <p className="font-md color-text-paragraph mt-20">
                      <b style={{fontWeight: 'bolder'}}> Advanced Predictive Analytics: </b>Using state-of-the-art predictive analytics and machine learning
                        algorithms, our system can forecast potential conflicy with a high degree of accuracy. This means you
                        can stay ahead of disasters and take proactive measures..
                    </p>

                    <p className="font-md color-text-paragraph mt-20">
                      <b style={{fontWeight: 'bolder'}}> Customizable Alerts: </b>We understand that different communities and organizations have unique needs.
                        Our system allows for the customization of alert thresholds and delivery methods, ensuring that you
                        receive the information you need in the way you want it.
                    </p>

                    <p className="font-md color-text-paragraph mt-20">
                      <b style={{fontWeight: 'bolder'}}> Geospatial Mapping: </b>Our interactive geospatial mapping interface provides a clear visual representation
                        of the evolving situation. Users can easily identify at-risk areas, evacuation routes all from the comfort
                        of a mobile device.
                    </p>

                    <p className="font-md color-text-paragraph mt-20">
                      <b style={{fontWeight: 'bolder'}}> Community Engagement: </b>We believe in the power of community involvement. Our system includes
                        features that facilitate community engagement and communication, ensuring that everyone is informed
                        and prepared.
                    </p>

                    <p className="font-md color-text-paragraph mt-20">
                      <b style={{fontWeight: 'bolder'}}> Response Coordination: </b>In addition to early warning, our system supports emergency response
                        coordination. It connects response teams, allows for resource allocation, and provides real-time
                        communication during crises.
                    </p>

                    <p className="font-md color-text-paragraph mt-20">
                      <b style={{fontWeight: 'bolder'}}> User-Centric Design: </b>We have prioritized user experience in the development of our system, making it
                        user-friendly and intuitive for a wide range of users.
                    </p>

                    <p className="font-md color-text-paragraph mt-20">
                      <b style={{fontWeight: 'bolder'}}>Reliability: </b>We take data security and system reliability seriously. Our robust infrastructure ensures that
                        the system remains operational even in challenging conditions.
                    </p>

                    <p className="font-md color-text-paragraph mt-20">
                      <b style={{fontWeight: 'bolder'}}>Continuous Improvement: </b>
                      We are committed to staying at the forefront of technology and disaster
                      management. Our system is designed for continuous improvement and updates to adapt to emerging
                      challenges.
                    </p>
                    <p className="font-md color-text-paragraph mt-20"> 
                      Join us today and become a part of a community of volunteers committed to saving lives across
                      Nigeria…
                    </p>
                  </div>           
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