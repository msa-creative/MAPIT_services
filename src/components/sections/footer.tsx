"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeartIcon, ArrowUpIcon, Mail, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GeoAnalyticsLogo = () => (
  <div className="relative">
    <h1 className="text-8xl font-bold text-white animate-seagreen-glow">
      <img src="/mapit.webp" alt="MAPIT Logo" className="h-25 w-auto" />
    </h1>
  </div>
);


export default function Footer() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer content animation
      gsap.fromTo(contentRef.current, 
        { 
          opacity: 0, 
          y: 30 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div ref={contentRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Logo and description */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" aria-label="GeoAnalytics Home">
                <GeoAnalyticsLogo />
              </Link>
              
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Empowering the GIS field with advanced cadastral mapping, digitizing, and Web GIS solutions. We specialize in spatial data management, geospatial analysis, and custom GIS application development for modern mapping needs.
              </p>
              
              <div className="space-y-2">
                <p className="text-white font-medium text-sm">Contact Us</p>
                <div className="text-gray-400 text-sm">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=mapitt.services@gmail.com&su=Inquiry about GIS Services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors duration-200 flex items-center gap-2"
                  >
                    <Mail size={16} className="inline-block" />
                    mapitt.services@gmail.com
                  </a>
                  <a
                    href="tel:+923160575593"
                    className="mt-1 hover:text-primary transition-colors duration-200 flex items-center gap-2"
                    title="Call us"
                  >
                    <Phone size={16} className="inline-block" />
                    +923160575593
                  </a>
                </div>
              </div>
            </div>

            {/* GIS Services */}
            <div className="flex flex-col items-center pt-8">
              <h3 className="text-white font-medium text-base mb-4">GIS Services</h3>
              <nav className="flex flex-col items-center gap-2">
                <Link href="/services/gis-consulting" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  GIS Consulting
                </Link>
                <Link href="/services/data-processing" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Data Processing
                </Link>
                <Link href="/services/custom-development" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Web GIS Development
                </Link>
                <Link href="/portfolio/mapping-solutions" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Cadastral Mapping
                </Link>
                <Link href="/portfolio/satellite-projects" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Digitizing & Satellite Projects
                </Link>
                <Link href="/solutions/geospatial-mapping" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Web GIS Solutions
                </Link>
                 <Link href="/portfolio/all-projects" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  All Projects
                </Link>
              </nav>
            </div>

            {/* GIS Solutions */}
            <div className="flex flex-col items-center pt-8">
              <h3 className="text-white font-medium text-base mb-4">GIS Solutions</h3>
              <nav className="flex flex-col items-center gap-2">
                <Link href="/solutions/data-visualization" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Data Visualization
                </Link>
                <Link href="/solutions/environmental-monitoring" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Environmental Monitoring
                </Link>
              </nav>
            </div>

            {/* About */}
            <div className="flex flex-col items-center pt-8">
              <h3 className="text-white font-medium text-base mb-4">About</h3>
              <nav className="flex flex-col items-center gap-2">
                <Link href="/faqs" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  FAQs
                </Link>
                <Link href="/contact" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-white/10 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6 text-gray-400 text-sm">
                <p className="text-center md:text-left font-semibold tracking-wide text-white/80 flex items-center gap-2 select-none">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-accent text-white mr-1">
                   <text className="text-2xl">©</text>
                  </span>
                  <span className="hover:text-primary transition-colors duration-200 cursor-pointer" title="Visit MAPIT Home" onClick={() => window.location.href = '/'}>
                    MAPIT <span className="font-bold">2025</span>. All rights reserved.
                  </span>
                </p>
                <div className="flex items-center gap-6">
                 
                  <span className="flex items-center gap-1">
                    Made with
                    <a
                      href="https://portfolio-msaapperals-projects.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-teal-400 transition-colors"
                      aria-label="MSA-CREATIVE Portfolio"
                    >
                      <HeartIcon size={16} className="text-red-500" />
                      <span className="ml-1"> by MSA-CREATIVES</span>
                    </a>
                  </span>
                </div>
              </div>
              
              {/* Return to top button */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors text-sm group"
              >
                Return to top
                <ArrowUpIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
