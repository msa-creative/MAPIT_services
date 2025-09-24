"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Layers, Zap, Shield, Target, Satellite, Navigation2, Database, Map, Compass, BarChart3 } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function GeospatialMappingPage() {
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);
  const servicesRef = useRef([]);
  const titleRef = useRef(null);
  const mapVisualizationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { 
          opacity: 0, 
          y: 50,
          rotationX: -15
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out"
        }
      );
    }

    // Map visualization animation
    if (mapVisualizationRef.current) {
      const mapElements = mapVisualizationRef.current.querySelectorAll('.map-element');
      gsap.fromTo(
        mapElements,
        { 
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.5,
          ease: "back.out(1.7)"
        }
      );
    }

    // Sections fade-in animation
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Services cards staggered animation
    gsap.fromTo(
      servicesRef.current,
      { 
        opacity: 0,
        y: 40,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (
    el: HTMLElement | null,
    refsArray: React.RefObject<HTMLElement[]>
  ) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };

  const mappingServices = [
    {
      icon: <Map className="w-8 h-8 text-primary" />,
      title: "Topographic Mapping",
      description: "High-precision elevation and terrain mapping using advanced surveying techniques and LiDAR technology."
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Cadastral Mapping",
      description: "Property boundary surveys and legal mapping for land ownership and development projects."
    },
    {
      icon: <Layers className="w-8 h-8 text-primary" />,
      title: "Infrastructure Mapping", 
      description: "Comprehensive utility and infrastructure asset mapping for utilities and municipal planning."
    },
    {
      icon: <Satellite className="w-8 h-8 text-primary" />,
      title: "3D Mapping",
      description: "Three-dimensional spatial mapping and modeling using photogrammetry and laser scanning."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Web Mapping",
      description: "Interactive online mapping solutions and geospatial web applications for data visualization."
    },
    {
      icon: <Navigation2 className="w-8 h-8 text-primary" />,
      title: "Mobile GIS",
      description: "Field data collection and mobile mapping solutions for real-time geospatial data capture."
    }
  ];

  const technologies = [
      {
        category: "GIS Software",
        items: ["ArcGIS Pro", "QGIS", "Global Mapper", "FME"]
      },
      {
        category: "Survey Equipment",
        items: ["Total Stations", "GNSS/GPS" ,"Clinometers" ,"Theodolites"]
      },
      {
        category: "Data Sources",
        items: ["Satellite Imagery", "Aerial Photography", "Field Surveys", "Open Data"]
      },
      {
        category: "Standards",
        items: ["ISO 19115", "OGC Standards", "ASPRS Guidelines", "Survey Grade Accuracy"]
      }
    ];

  const applications = [
    {
      icon: <Target className="w-6 h-6 text-accent" />,
      title: "Urban Planning",
      description: "Support master planning, zoning, and development projects with accurate spatial data."
    },
    {
      icon: <Zap className="w-6 h-6 text-accent" />,
      title: "Utilities Management",
      description: "Asset mapping and infrastructure management for water, gas, electric, and telecom utilities."
    },
    {
      icon: <Database className="w-6 h-6 text-accent" />,
      title: "Natural Resources",
      description: "Environmental monitoring, forestry management, and conservation planning applications."
    },
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "Emergency Response",
      description: "Disaster preparedness, emergency routing, and crisis management mapping solutions."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Data Collection",
      description: "Field surveys, remote sensing, and existing data compilation using state-of-the-art equipment."
    },
    {
      step: "02", 
      title: "Processing & Analysis",
      description: "Advanced GIS analysis, coordinate transformation, and spatial data modeling workflows."
    },
    {
      step: "03",
      title: "Quality Checking",
      description: "Rigorous accuracy checking, validation procedures, and compliance with industry standards."
    },
    {
      step: "04",
      title: "Delivery & Support",
      description: "Final deliverables, training, and ongoing technical support for your mapping solutions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/bg-2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"></div>
        
          {/* Interactive Map Background */}
        <div 
          ref={mapVisualizationRef}
          className="absolute inset-0 opacity-20"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="map-element absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <div className="map-element absolute top-1/3 right-1/3 w-2 h-2 bg-accent rounded-full animate-pulse delay-300"></div>
            <div className="map-element absolute bottom-1/3 left-1/3 w-4 h-4 bg-success-green rounded-full animate-pulse delay-500"></div>
            <div className="map-element absolute bottom-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse delay-700"></div>
            <div className="map-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Compass className="w-16 h-16 text-primary animate-spin-slow" />
            </div>
          </div>
        </div>

        <div className="container relative z-10 text-center">
          <div ref={titleRef}>
            <h1 className="mb-6">
                <span className="font-extrabold text-5xl md:text-7xl text-text-primary">
                  Professional
                </span>{" "}
                <span className="font-extrabold text-5xl md:text-7xl text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                  Geospatial Mapping
                </span>
              </h1>
              <p className="text-xl text-primary/1000 max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
                Creating accurate digital maps and comprehensive spatial databases with cutting-edge surveying technology and advanced GIS solutions for your critical infrastructure and development projects.
              </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-black font-medium px-8 py-4 rounded-lg transform transition-transform duration-300 hover:scale-105"
                >
                  Start Your Project
                </Button>
              </Link>
              <Link href="/solutions/general-mapping">
                <Button 
                  size="lg" 
                  className="bg-transparent border-2 border-accent text-accent font-medium px-8 py-4 rounded-lg transform transition-all duration-300 
                  hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r from-accent/20 via-accent/10 to-transparent 
                  relative overflow-hidden group"
                >
                  <span className="relative z-10">View Mapping Projects</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 
                  bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Technologies & Tools Section */}
      <section 
        ref={(el) => addToRefs(el, sectionsRef)}
        className="py-24"
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">Advanced Technologies & Tools</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              We leverage industry-leading software and state-of-the-art equipment to ensure the highest accuracy and efficiency in our mapping projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="p-6 bg-surface-medium/20 backdrop-blur-sm border border-border rounded-xl hover:border-accent/30 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-4 text-accent">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-text-secondary text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Mapping Process Section */}
      <section 
        ref={(el) => addToRefs(el, sectionsRef)}
        className="py-24"
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">Our Mapping Process</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              A systematic approach ensures accuracy, efficiency, and quality in every mapping project from initial data collection to final delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="text-center relative"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-black">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-accent transform -translate-y-1/2 -translate-x-1/2"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-text-primary">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section 
        ref={(el) => addToRefs(el, sectionsRef)}
        className="py-24 bg-surface-dark/50"
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-primary mr-3" />
                <span className="text-3xl font-bold text-primary">99.9%</span>
              </div>
              <p className="text-text-secondary">Accuracy Rate</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-accent mr-3" />
                <span className="text-3xl font-bold text-accent">50+</span>
              </div>
              <p className="text-text-secondary">Projects Completed</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-success-green mr-3" />
                <span className="text-3xl font-bold text-success-green">50K+</span>
              </div>
              <p className="text-text-secondary">Sq. Miles Mapped</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-primary mr-3" />
                <span className="text-3xl font-bold text-primary">24/7</span>
              </div>
              <p className="text-text-secondary">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        ref={(el) => addToRefs(el, sectionsRef)}
        className="py-24 bg-gradient-to-br from-surface-dark via-background to-surface-medium relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
        <div className="container relative z-10 text-center">
          <h2 className="mb-6">
            Start your{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
              mapping project
            </span>{" "}
            today
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Ready to transform your spatial data requirements into actionable intelligence? Let's discuss your geospatial mapping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-medium px-8 py-4 rounded-lg">
                Get Started Today
              </Button>
            </Link>
        
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
