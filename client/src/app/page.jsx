'use client'
import React from 'react'
import Navbar from './(main)/navbar'
import Link from 'next/link'
import Footer from './(main)/footer'
import { FaFacebookF } from 'react-icons/fa6'
import Fade from 'react-reveal/Fade'
import Typical from 'react-typical'

const Home = () => {
  return (
    <>
      <Navbar />
      <>
        {/* Section 1 */}
        <div className="bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20230718/pngtree-illustration-of-the-intersection-between-online-testing-technology-and-academia-a-image_3911806.jpg')] bg-cover bg-center">
          <div className="bg-[#284b63] bg-opacity-80">
            <div className="container mx-auto flex flex-col items-center py-16 sm:py-24">
              <Fade bottom>
                <div className="w-11/12 sm:w-2/3 mt-16 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                  {/* <h1 className="text-2xl sm:text-3xl mt-3 md:text-4xl lg:text-5xl xl:text-6xl text-center text-[#d9d9d9] leading-7 md:leading-10">
                    The Freedom to Create
                    <span className="text-orange-300"> Forms </span>
                    You Want
                  </h1> */}
                  <p className="mt-5 text-2xl sm:text-3xl lg:text-5xl text-center text-[#d9d9d9] leading-7 md:leading-10">
                    <span>One Platform for </span>
                    <Typical
                      steps={[
                        'Creating Forms',
                        3000,
                        'Giving Tests',
                        3000,
                      ]}
                      loop={Infinity}
                      wrapper="span"
                      className="text-orange-300"
                    />
                  </p>
                  <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-300 font-normal text-center text-sm sm:text-lg">   Empower your educational journey with our intuitive form-building website, designed to simplify the way teachers create, share, and analyze forms, ensuring a seamless and efficient experience for both educators and students.{" "}</p>


                </div>
              </Fade>
            </div>
          </div>
        </div>
      </>

      <>
        {/* Section 2 */}
        <header className="min-h-screen bg-white pt-8">
          <div className="md:flex space-x-16 mt-20 md:mr-0 mr-10">
            <Fade left>
              <div className="md:flex items-center pl-16">
                <div className="">
                  <h2 className="lg:text-5xl text-[#284b63] font-bold leading-tight text-3xl">
                    Seamless Test Taking Experience
                    <p className="mt-4 text-lg font-normal mt-12">
                      Take your tests with ease using our user-friendly platform. Simply access your test through a unique link, complete the form, and submit your responses effortlessly. <br />
                      <br /> Our system ensures a smooth process so you can focus on showcasing your knowledge.
                    </p>
                  </h2>
                </div>
              </div>
            </Fade>
            <Fade right>
              <div className="max-w-lg pr-24 md:flex justify-center items-center hidden">
                <img className="rounded-lg" src="/student.jpg" alt="" />
              </div>
            </Fade>
          </div>
        </header>
      </>
      <>
        {/* Section 3 */}
        <div className=" bg-cover bg-center bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20230718/pngtree-illustration-of-technology-s-online-testing-with-a-laptop-books-and-image_3911808.jpg')]">
          <div className=" bg-[#284b63] bg-opacity-80">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12 p-24">
              {/* <Fade left>
                <div className="md:5/12 lg:w-5/12">
                  <img src="/teacher.jpg" alt="image" loading="lazy" width="" height="" />
                </div>
              </Fade> */}
              <Fade right>
                <div className="md:7/12 lg:w-9/12">
                  <h2 className="text-2xl text-[#ffff] font-bold md:text-4xl">
                    Streamlined Form Creation and Test Management
                  </h2>
                  <p className="mt-6 text-[#d9d9d9]">
                    Empower your teaching experience with our intuitive form creation and test management system. Teachers can effortlessly design and distribute customized forms and tests to students, ensuring a seamless and efficient evaluation process. With our platform, you can create detailed assessments, share unique form IDs with your students, and collect their responses in real-time.
                  </p>
                  <p className="mt-4 text-[#d9d9d9] mb-8">
                    Simplify your administrative tasks and focus more on teaching, while our system handles the logistics. Experience the convenience of managing tests and forms all in one place.
                  </p>
                  <Link href="/Teacher-login" className="border-2 border-[#ffff] text-[#ffff] hover:bg-[#d9d9d9] hover:text-[#284b63] rounded py-2 text-xl px-3">Login to create Forms</Link>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </>
      <>
        {/* Section 4 */}
        <div className="py-8 px-8 bg-gray-50 py-24 m-12">
          <div className="container m-auto px-6 space-y-8 text-gray-500 md:px-12">
            <div>
              <span className="text-gray-600 text-lg font-semibold">Key Features of Our Platform</span>
              <h2 className="mt-4 text-2xl text-gray-900 font-bold md:text-4xl">
                A Technology-Driven Solution for Streamlined Testing
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Fade bottom cascade>
                <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
                  <div className="relative p-8 space-y-8 border-dashed rounded-lg transition duration-300 group-hover:bg-white group-hover:border group-hover:scale-90">
                    <img src="https://cdn-icons-png.flaticon.com/512/1484/1484799.png" className="w-10" width={512} height={512} alt="Easy Form Creation" />
                    <div className="space-y-2">
                      <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">Easy Form Creation</h5>
                      <p className="text-sm text-gray-600">Teachers can quickly design and customize forms for various assessments.</p>
                    </div>
                  </div>
                </div>
                <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
                  <div className="relative p-8 space-y-8 border-dashed rounded-lg transition duration-300 group-hover:bg-white group-hover:border group-hover:scale-90">
                    <img src="https://cdn-icons-png.flaticon.com/512/7471/7471685.png" className="w-10" width={512} height={512} alt="Unique Form Links" />
                    <div className="space-y-2">
                      <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">Unique Form Links</h5>
                      <p className="text-sm text-gray-600">Each form is assigned a unique link for easy distribution and access.</p>
                    </div>
                  </div>
                </div>
                <div className="relative group bg-gray-100 transition hover:z-[1] hover:shadow-2xl lg:hidden xl:block">
                  <div className="relative p-8 space-y-8 border-dashed rounded-lg transition duration-300 group-hover:bg-white group-hover:border group-hover:scale-90">
                    <img src="https://cdn-icons-png.flaticon.com/512/10550/10550962.png" className="w-10" width={512} height={512} alt="Efficient Test Management" />
                    <div className="space-y-2">
                      <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">Efficient Test Management</h5>
                      <p className="text-sm text-gray-600">Teachers can manage and review multiple tests and forms from a centralized dashboard.</p>
                    </div>
                  </div>
                </div>
                <div className="relative group bg-gray-100 transition hover:z-[1] hover:shadow-2xl lg:hidden xl:block">
                  <div className="relative p-8 space-y-8 border-dashed rounded-lg transition duration-300 group-hover:bg-white group-hover:border group-hover:scale-90">
                    <img src="https://eichingerequipment.co.uk/wp-content/uploads/2019/06/Inspection.png" className="w-10" width={512} height={512} alt="Retest Option" />
                    <div className="space-y-2">
                      <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">Retest Option</h5>
                      <p className="text-sm text-gray-600">If allowed by the teacher, students can retake tests for better scores.</p>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </>
      <>
        {/* Section 5 */}
        <div className="bg-cover bg-center bg-[url('https://wpassets.porttechnology.org/wp-content/uploads/2022/05/05102425/iStock-1317027317.jpg')]">
          <div className=" bg-[#284b63] text-[#d9d9d9] bg-opacity-80">
            <div className="container mx-auto px-6 md:px-12  xl:px-6">
              <div className="md:flex md:space-x-6  grid grid-cols-2 p-16  lg:space-x-12">
                {/* <Fade left>
                <div className="md:w-4/12 mt-8 md:mt-0">
                  <img src="https://i.pinimg.com/564x/b2/77/fa/b277fa8f500bfe950fee247defe77f13.jpg" alt="Data Security" className="rounded-lg shadow-lg" />
                </div>
              </Fade> */}
                <Fade right>
                  <div className="md:w-7/12 p-2">
                    <h2 className="text-2xl md:text-4xl font-bold">Enhanced Data Security</h2>
                    <p className="mt-4 text-gray-300">
                      Our platform prioritizes the security and privacy of your data. All forms and responses are stored securely, ensuring that sensitive information is protected. Teachers and students can rely on our robust security measures for peace of mind.
                      <br /><br />
                      We utilize advanced encryption techniques to safeguard your data both in transit and at rest. Our servers are housed in secure facilities with stringent access controls and regular security audits. Additionally, we offer role-based access controls to ensure that only authorized personnel can access or modify data.
                    </p>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </>
      <>
        {/* Section 6 */}
        <div className="py-12 bg-white p-8">
          <div className="container mx-auto px-6 md:px-12 xl:px-6">
            <div className="md:flex md:space-x-6 lg:space-x-12">
              <Fade left>
                <div className="md:w-7/12 p-12">
                  <h2 className="text-2xl md:text-4xl font-bold text-[#284b63]">Comprehensive Support</h2>
                  <p className="mt-4 text-gray-600">
                    Our dedicated support team is here to assist with any questions or issues you may have. Whether it's about form creation, managing responses, or using advanced features, we're committed to ensuring you get the most out of our platform.
                    <br /><br />
                    We're ready to provide guidance, troubleshoot problems, and offer tips to enhance your experience. Your satisfaction is our priority, so reach out anytime for the support you need.
                  </p>
                  <Link href="/Support" className="mt-4 inline-block border-2 border-[#284b63] text-[#284b63] hover:bg-[#284b63] hover:text-[#d9d9d9] rounded py-2 px-3">Contact Support</Link>
                </div>
              </Fade>
              <Fade right>
                <div className="md:w-5/12 mt-8 md:mt-0">
                  <img src="https://i.pinimg.com/564x/0e/f8/b0/0ef8b08b7c3214a8d8df6212ede2a87d.jpg" alt="Support" className="rounded-lg shadow-lg" />
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </>
      <footer className="relative bg-[#284b63] text-[#d9d9d9] pt-4 pb-6">
        <div className="container mx-auto px-4">
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2024</span>
                <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank"> Form-Builder </a>
                <a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800"> Hafsah Naseer </a>.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
