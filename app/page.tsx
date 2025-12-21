import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-zinc-100 text-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-200/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-slate-200/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-zinc-200/40 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/70 backdrop-blur-xl border-b border-gray-200/60 z-50 shadow-lg">
        <nav className="max-w-6xl mx-auto px-8 py-5 flex justify-between items-center relative">
          <div className="text-2xl font-serif italic bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent drop-shadow-sm">Akash Pandya</div>
          <div className="flex gap-8">
            <a href="#about" className="text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium relative group px-2 py-1">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a href="#experience" className="text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium relative group px-2 py-1">
              Experience
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a href="#projects" className="text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium relative group px-2 py-1">
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium relative group px-2 py-1">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero and About Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Hero */}
          <div className="text-center border-2 border-gray-300 bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500">
            <Image
              src="/profile_photo.jpeg"
              alt="Akash Pandya"
              width={150}
              height={150}
              className="rounded-full object-cover mx-auto mb-8 ring-4 ring-gray-200 shadow-lg"
            />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Akash Pandya</h1>
            <p className="text-lg text-gray-600 mb-2 font-medium">Computer Science Major | Economics Minor</p>
            <p className="text-base text-gray-500 mb-8">University of Maryland, College Park • Class of 2027</p>
            <div className="flex gap-3 justify-center">
              <a href="#contact" className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-5 py-2 rounded-full text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Get In Touch
              </a>
              <a href="#projects" className="border-2 border-gray-300 px-5 py-2 rounded-full text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                View Work
              </a>
            </div>
          </div>

          {/* About */}
          <div id="about" className="text-center border-2 border-gray-300 bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500">
            <h2 className="text-3xl font-bold font-serif italic mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent drop-shadow-sm">About Me</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              I'm a Computer Science student at the University of Maryland with a passion for financial technology and building innovative solutions.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Currently exploring blockchain, algorithmic trading, and fintech applications. 
              Experienced in various programming languages and frameworks including Python, Java, Angular, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-8 bg-gradient-to-br from-gray-50/50 to-gray-100/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold font-serif italic mb-12 text-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent drop-shadow-sm">Experience</h2>
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Information Technology Intern</h3>
              <p className="text-gray-600 mb-1 font-medium">Depository Trust and Clearing Corporation (DTCC)</p>
              <p className="text-sm text-gray-500 mb-4">Jersey City, New Jersey | June 2024 – August 2024, June 2025 – Present</p>
              
              <div className="mb-4">
                <p className="font-medium text-gray-700 mb-2">Summer 2025</p>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Migrated legacy Funds Only Settlement Web platforms into DTCC's modern Real-Time Trade Matching Web application, improving on functionality to aid in the net/settlement of over a trillion dollars of volume a day</li>
                  <li>• Developed and integrated 10+ UI components with Angular and backend services in Java, reducing QA bug reports by 15% and boosting automated test coverage up to 30% through Selenium</li>
                  <li>• Collaborated in Agile sprints via Jira, writing user stories, planning tasks, and accelerating deployment cycles by 20% through streamlined automation workflows</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-2">Summer 2024</p>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Automated aggregation of KPI metric test results using Splunk Programming Language (SPL) and Python, reducing manual reporting effort by 8+ hours per week, and enabling more frequent performance monitoring</li>
                  <li>• Streamlined Global Trade Repository alert analysis using SPL, improving reporting turnaround time by 30% and delivering automated daily reports for the Alerts Team</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Spring Research Intern</h3>
              <p className="text-gray-600 mb-1 font-medium">OpenData</p>
              <p className="text-sm text-gray-500 mb-4">Remote, New Jersey | February 2024 – June 2024</p>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Supported research for an AI-driven data marketplace platform by evaluating free and commercial data sources for potential integration into the product</li>
                <li>• Assisted in the initial exploration of machine learning techniques to automate data quality assessments, focusing on identifying key data characteristics such as metadata coverage, update frequency, and dataset uniqueness</li>
                <li>• Analyzed 10+ data marketplaces and providers, comparing pricing models, data offerings, and AI capabilities to inform the product roadmap and prioritize 3 features focused on automated data recommendations and user search tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold font-serif italic mb-12 text-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent drop-shadow-sm">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-gray-400 transition-all duration-500 bg-white/70 backdrop-blur-sm transform hover:-translate-y-2">
              <div className="h-32 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <Image
                  src="/lotc_image.png"
                  alt="Library of the Chathams"
                  width={200}
                  height={128}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Python Instruction Curriculum</h3>
              <p className="text-gray-600 mb-4 text-sm">Taught Python fundamentals to 50+ students over 6 sessions through Chatham Library Partnership, inspiring many to pursue advanced computer science courses.</p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-500">Feb 2022 - Jun 2023</span>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-gray-400 transition-all duration-500 bg-white/70 backdrop-blur-sm transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-32 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">R Studio | Shiny</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Forensic Tester Application</h3>
              <p className="text-gray-600 mb-4 text-sm">Led development of forensic analysis web application, later acquired by Data Unlimited International. Processed 100+ samples through internal database comparison.</p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-500">Jun 2021 - Aug 2021</span>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-gray-400 transition-all duration-500 bg-white/70 backdrop-blur-sm transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-32 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">Coming Soon</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Future Project</h3>
              <p className="text-gray-600 mb-4 text-sm">Currently working on new projects in fintech and blockchain technology. Stay tuned for updates!</p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-500">In Development</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-8 bg-gradient-to-br from-gray-50/50 to-gray-100/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">Get In Touch</h2>
          <p className="text-lg text-gray-600 mb-12">Interested in collaborating or have questions? Let's connect.</p>
          <div className="flex gap-6 justify-center flex-wrap">
            <a href="mailto:akashpandya1617@gmail.com" className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-8 py-3 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium">
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/akash-pandya-6b15152a6/" className="border-2 border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium">
              LinkedIn
            </a>
            <a href="https://github.com/apandya255" className="border-2 border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium">
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>© 2024 Akash Pandya. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}