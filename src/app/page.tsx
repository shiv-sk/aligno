"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { GrLinkedin } from "react-icons/gr";
import { FaReddit } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter';

export default function Home(){
  const techStack = [
    { name: "Next.js", color: "bg-black text-white" },
    { name: "MongoDB", color: "bg-green-600 text-white" },
    { name: "Tailwind CSS", color: "bg-sky-400 text-white" },
    { name: "DaisyUI", color: "bg-purple-400 text-white" },
    { name: "TypeScript", color: "bg-blue-600 text-white" },
    
  ]

  const previewSection = [
    { 
      number: 1, src:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" , title: "Role-based Dashboard" ,
      text:"Admins, Managers, Team Leads, and Employees each see only what they need. Simplified navigation, role-specific actions, and clutter-free dashboards help teams stay focused and productive." 
    },
    { 
      number: 2, src:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" , title: "Gantt Chart" ,
      text:"See all tasks, deadlines, in one clean timeline. Instantly spot delays, overlaps, or idle time with an intuitive Gantt chart — perfect for weekly planning and progress monitoring." 
    },
    { 
      number: 3, src:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" , title: "Insights & Weekly Reports" ,
      text:"Stay informed with automatic insights: task completion rates, activity trends, overdue stats, and team performance — all delivered in weekly summaries that suggest where to improve." 
    },
    
  ]

  const alignoInAction = [
    { 
      number: 1, src:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" , alt:"item1" 
    },
    { 
      number: 2, src:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" , alt:"item2" 
    },
    { 
      number: 3, src:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" , alt:"item3" 
    },
    { 
      number: 4, src:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" , alt:"item4" 
    },
    { 
      number: 5, src:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" , alt:"item5" 
    },
    { 
      number: 6, src:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" , alt:"item6" 
    },
    
  ]

  return(
    <div className="min-h-screen">
      {/* hero section */}
      <div 
      className="bg-base-300 shadow-xl rounded-x py-6 px-3 flex justify-center item-center bg-gradient-to-t from-zinc-50 to-gray-300">
        <div className="hero py-8 mt-10">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-semibold text-center text-slate-600">
                <Typewriter 
                words={["Aligno"]}
                loop={false}
                cursor
                cursorStyle='|'
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}/>
              </h1>
              <p className="py-6">
                A modern solution to manage projects, assign tasks, and track team progress — built with role-based workflows, 
                smart insights, and auto-generated reports.
              </p>
              <button className="btn btn-primary">Watch Demo</button>
            </div>
          </div>
        </div>
      </div>
      {/* features section */}
      
      <div className="flex justify-center flex-col item-center gap-2.5 py-6 px-2 bg-base-300 shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-slate-600 mb-6">Key Capabilities</h1>
        <div className="flex justify-center item-center flex-wrap gap-4.5 px-2 bg-base-100 shadow-lg rounded-lg py-6">
          {
            previewSection.map(({number , src , title , text})=>(
              <div className="card bg-base-100 w-96 shadow-xl hover:scale-105 transition-transform duration-300 border-t-2 border-t-gray-600" key={number}>
                <figure>
                  <Image
                    src={src}
                    alt="Shoes"
                    width="500"
                    height="500" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{title}</h2>
                  <p>{text}</p>
                </div>
              </div>
            ))
          }
          
        </div>
      </div>
      {/* Preview Section */}
      <div className="bg-base-300 flex flex-col py-6 px-2">
        <h1 className="text-3xl font-semibold text-center text-slate-600 mb-6">Live Product Preview</h1>
        <div className="flex justify-center items-center gap-3.5 flex-wrap py-6 px-3 rounded-lg">
          {
            alignoInAction.map(({number , src , alt})=>(
              <div className="bg-base-100 w-96 shadow-xl hover:scale-90 transition-transform duration-300 hover:rounded-lg" key={number}>
                <figure>
                  <Image
                    src={src}
                    alt={alt}
                    width="500"
                    height="500" />
                </figure>
              </div>
            ))
          }
          
        </div>
      </div>
      {/* How It Works */}
      <div className="bg-base-300 py-12 px-4">
        <h1 className="text-3xl font-semibold text-center text-slate-600 mb-6">How It Works</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {
            [
              { step: "1", title: "Create Project", desc: "Start by creating a new project for your team." },
              { step: "2", title: "Add Members", desc: "Invite your team members and assign roles." },
              { step: "3", title: "Assign Tasks", desc: "Break down work into tasks and assign them." },
              { step: "4", title: "Track & Report", desc: "Track progress with insights and generate reports." },
            ].map(({ step, title, desc })=>(
              <div key={step} className="shadow-xl py-6 px-3 rounded-lg bg-base-100 text-center">
                <div className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full text-xl font-bold mb-4 mx-auto">
                  {step}
                </div>
                <h2 className="text-xl font-semibold mb-1">{title}</h2>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))
          }
        </div>
      </div>
      {/* TechStack */}
      <div className="bg-base-200 py-12 px-4">
        <h1 className="text-3xl font-semibold text-center text-slate-600 mb-6">Built With</h1>
        <div className="flex justify-center flex-wrap gap-6 max-w-4xl mx-auto">
          {
            techStack.map(({ name, color }, index)=>(
              <motion.div 
              key={name} 
              className={`px-5 py-3 rounded-full shadow-md font-medium ${color}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.4, type: 'tween' , ease: ["easeIn", "easeOut"]}}
              viewport={{ once: true }}>
                {name}
              </motion.div>
            ))
          }
        </div>
      </div>
      {/* Get In Touch */}
      <div className="bg-base-300 py-16 px-4 relative">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 relative z-10">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Get in Touch</h2>
          <hr className="border-t-2 border-black w-24 my-4" />
          <div className="flex gap-4 mt-3 text-2xl text-gray-600">
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <SiGithub className="hover:text-black transition duration-200"/>
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <GrLinkedin className="hover:text-blue-500 transition duration-200"/>
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <FaReddit className="hover:text-red-500 transition duration-200"/>
            </a>
          </div>
          <div>
            <p className="mt-4 text-sm text-gray-500">Made by Shivanand Y.K</p>
          </div>
        </div>
        <div className="absolute inset-0 left-[350px] bg-gray-700 z-0 w-1/4 mt-6 mb-6"></div>
      </div>
    </div>
  )
}