
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">RICTMS-SyNAPSE</h1>
          <div className="space-x-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">About</Button>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center space-y-6">
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
        <section className="py-20">
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