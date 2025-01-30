import { useState } from 'react';
import { Button } from "@/Components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";

export default function LandingPage({apps}:any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smooth Scroll Function
  const handleScroll = (event:any, targetId:any) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };


  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


  const deploymentRequirements = [
    'Installation Manual',
    'Concept Paper',
    'Test Report',
    'BPRA',
    'Data Elements',
    'ERD',
    'Use Case',
    'User Manual',
    'Wireframe'
  ];

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">RICTMS-SyNAPSE</h1>
          <div className="hidden md:flex space-x-4">
            <a href="#features" onClick={(e) => handleScroll(e, 'features')}>
              <Button variant="ghost">Features</Button>
            </a>
            <a href="#deployed-apps" onClick={(e) => handleScroll(e, 'deployed-apps')}>
              <Button variant="ghost">Apps</Button>
            </a>
            <a href="#requirements" onClick={(e) => handleScroll(e, 'requirements')}>
              <Button variant="ghost">Requirements</Button>
            </a>
            <a href="#about" onClick={(e) => handleScroll(e, 'about')}>
              <Button variant="ghost">About</Button>
            </a>
           
            <a href="/login">
              <Button>Sign In</Button>
            </a>
          </div>
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col items-center py-4">
              <a href="#features" onClick={(e) => handleScroll(e, 'features')}>
                <Button variant="ghost">Features</Button>
              </a>
              <a href="#pricing" onClick={(e) => handleScroll(e, 'requirements')}>
                <Button variant="ghost">Requirements</Button>
              </a>
              <a href="#about" onClick={(e) => handleScroll(e, 'about')}>
                <Button variant="ghost">About</Button>
              </a>
              <a href="#deployed-apps" onClick={(e) => handleScroll(e, 'deployed-apps')}>
                <Button variant="ghost">Deployed Apps</Button>
              </a>
              <a href="/login">
                <Button>Sign In</Button>
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center items-center text-center space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-800 md:text-6xl">
            Systems Nexus Architecture and Platform System Exchange
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Effortlessly craft modern interfaces with a beautiful, accessible, and responsive design system. Perfect for startups, SaaS, and personal projects.
          </p>
          <div className="flex flex-wrap justify-center space-x-4">
            <Button size="lg" className="flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <h3 className="text-center text-3xl font-bold mb-10 text-gray-800">Features You'll Love</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-lg"
              >
                <feature.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

       {/* Deployed Apps Section */}
        <section id="deployed-apps" className="py-20 bg-gray-100">
          <h3 className="text-center text-3xl font-bold mb-10 text-gray-800">Our Deployed Applications</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
            {apps.map((app: any, index: any) => (
              <div
                key={index}
                className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-lg"
              >
                {/* Avatar Section */}
                <div className="flex justify-center mb-4">
                  <div
                    className="w-16 h-16 flex items-center justify-center text-white text-xl font-semibold rounded-full"
                    style={{ backgroundColor: generateRandomColor() }} // Avatar also has random background
                  >
                    {/* Display first 2 letters of the app's name */}
                    {app.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                <h4 className="text-xl font-semibold text-gray-800 mb-4">{app.name}</h4>
                <p className="text-gray-600 mb-6">{app.description}</p>
                <a href={app.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">Visit App</Button>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements Section */}
        <section id="requirements" className="py-16 px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Deployment Requirements</h2>
        <p className="text-lg text-gray-600 mb-12">
          Ensure all prerequisites are met for a smooth deployment experience.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {deploymentRequirements.map((item, index) => (
          <div 
            key={index} 
            className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 flex items-center space-x-5 transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center rounded-full text-xl font-bold shadow-md">
              {index + 1}
            </div>
            <span className="text-lg font-semibold text-gray-900">{item}</span>
          </div>
        ))}
      </div>
    </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <h3 className="text-center text-3xl font-bold mb-10 text-gray-800">About Us</h3>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto">
            We provide the best platform for building modern, scalable, and secure applications with a focus on user experience.
          </p>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to get started?</h3>
          <p className="text-lg mb-8">
            Join thousands of developers using ShadCN UI to build their next project.
          </p>
          <Button size="lg" className="px-8">
            Get Started for Free
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center">
        <p className="text-gray-600">&copy; 2025 YourBrand. All rights reserved.</p>
      </footer>
    </div>
  );
}



const features = [
  {
    title: "Beautiful Components",
    description: "Prebuilt components designed to be accessible and stylish.",
    icon: ArrowRight,
  },
  {
    title: "Customizable",
    description: "Easily adapt to your brand's unique style.",
    icon: ArrowRight,
  },
  {
    title: "Responsive Design",
    description: "Works seamlessly across devices and screen sizes.",
    icon: ArrowRight,
  },
];
