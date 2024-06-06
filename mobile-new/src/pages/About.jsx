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
                
                
                <p className="font-md color-text-paragraph mt-20">
                  The EWER system is dedicated to safeguarding lives and livelihoods through cutting-edge Early Warning
                  and Early Response solutions. Our mission is to create a safer and more resilient world by providing
                  timely, accurate, and actionable information when it matters most.
                </p>
              </div>
              <div className="row mt-70">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  

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

                  <h3 className="mt-15">Our Mission</h3>
                  <div className="mt-20">
                    <p className="font-md color-text-paragraph mt-20">
                    Our mission is to provide timely and accurate reports and notifications to safeguard lives, 
                    protect assets, and mitigate risks in the face of conflicts, emergencies, and potential threats. 
                    We are committed to leveraging advanced technology, data analysis, and collaboration with stakeholders to empower responders with actionable information, enhance preparedness, and enable effective response efforts
                    </p>
                  </div>

                            
                </div>
              </div>




              <div className="row mt-70">
                
                
                <div className="col-lg-12 col-md-12 col-sm-12">
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
            </div>
          </div>
        </section>
        
       
       
        
      </main>
    }
      
    </>
  )
}