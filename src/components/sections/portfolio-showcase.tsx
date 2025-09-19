"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Satellite, Building, Wheat, Trees, Waves, CloudRain } from "lucide-react";

interface ProjectCard {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  imageUrl: string;
  link?: string;
}

const projects: ProjectCard[] = [
  {
    id: "satellite-imagery",
    title: "Satellite Imagery Analysis",
    description: "Environmental monitoring and change detection using satellite data to track global environmental changes and patterns.",
    category: "Remote Sensing",
    icon: <Satellite className="w-6 h-6" />,
    imageUrl: "/workfull images for web/G 11,1.png",
    link: "/solutions/satellite-analysis"
  },
  {
    id: "urban-planning",
    title: "Urban Planning Solutions",
    description: "Smart city mapping and infrastructure development planning to optimize urban growth and sustainability.",
    category: "Urban Development",
    icon: <Building className="w-6 h-6" />,
    imageUrl: "/workfull images for web/Mapping Brand Distribution and Population Density.jpg",
    link: "/solutions/geospatial-mapping"
  },
  {
    id: "agricultural-monitoring",
    title: "Agricultural Monitoring",
    description: "Crop health analysis and precision farming solutions to maximize agricultural productivity and efficiency.",
    category: "Agriculture",
    icon: <Wheat className="w-6 h-6" />,
    imageUrl: "/workfull images for web/portfolio-1.jpg",
  link: "/solutions/satellite-analysis"
  },
  {
    id: "web-gis",
    title: "Web GIS",
    description: "Interactive web mapping and spatial data visualization for modern GIS applications.",
    category: "GIS Development",
    icon: <Satellite className="w-6 h-6" />,
    imageUrl: "/workfull images for web/Capture.JPG",
    link: "/services/custom-development"
  },
  {
    id: "satellite-imagery-2",
    title: "Satellite Imagery",
    description: "High-resolution satellite imagery for advanced geospatial analysis and mapping.",
    category: "Remote Sensing",
    icon: <Satellite className="w-6 h-6" />,
    imageUrl: "/workfull images for web/Untitled.png",
    link: "/solutions/satellite-imagery"
  },
  {
    id: "digitizing",
    title: "Digitizing",
    description: "Digital conversion of maps and spatial features for efficient geodata management.",
    category: "GIS Digitizing",
    icon: <Building className="w-6 h-6" />,
    imageUrl: "/workfull images for web/G 11,1.PNG",
    link: "/solutions/geospatial-mapping"
  }
];

export const PortfolioShowcase = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(new Array(projects.length).fill(true));
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const cardStyles = {
    transform: 'translateY(20px)',
    opacity: 0,
    animation: 'fadeInUp 0.6s ease-out forwards'
  };

  const visibleCardStyles = {
    transform: 'translateY(0)',
    opacity: 1,
    animation: 'none'
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .card-hover {
          transition: all 0.3s ease-in-out;
        }
        
        .card-hover:hover {
          transform: scale(1.02);
          box-shadow: 0 0 30px rgba(0, 212, 170, 0.2);
          border-color: #00D4AA;
        }
        
        .glow-effect {
          position: relative;
          overflow: hidden;
        }
        
        .glow-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 212, 170, 0.1),
            transparent
          );
          transition: left 0.5s;
        }
        
        .glow-effect:hover::before {
          left: 100%;
        }
      `}</style>
      
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          {/* Section Header */}
         <div className="text-center mb-16 relative z-20">
  <div className="inline-flex items-center px-4 py-2 rounded-full bg-surface-dark border border-border mb-6">
    <span className="text-sm text-primary font-medium">Portfolio Showcase</span>
  </div>

  <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
    Our Latest <span className="text-primary">Projects</span>
  </h2>

  <p className="text-lg text-text-secondary max-w-2xl mx-auto">
    Explore our cutting-edge solutions spanning environmental monitoring, 
    urban planning, and climate analysis powered by advanced AI technology.
  </p>
</div>


          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="card-hover glow-effect bg-surface-dark border border-border rounded-xl p-6 backdrop-blur-sm"
                style={{
                  ...(visibleCards[index] ? visibleCardStyles : cardStyles),
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Project Image */}
                <div className="aspect-video rounded-lg mb-6 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface-medium border border-border mb-4">
                  <span className="text-xs text-primary font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-medium text-white mb-3">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-text-secondary text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Project Icon */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center text-primary">
                    {project.icon}
                    <span className="ml-2 text-sm font-medium">Explore Project</span>
                  </div>
                  <Link href={project.link || "#"} passHref legacyBehavior>
                    <a className="w-8 h-8 rounded-full bg-surface-medium flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-primary/20 group">
                      <svg 
                        className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
