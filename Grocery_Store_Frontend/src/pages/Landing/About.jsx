import React from 'react';
import { Users, Award, Heart, MapPin, Target, Eye, Handshake } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: Users,
      number: '5000+',
      label: 'Happy Customers',
      color: 'text-green-600'
    },
    {
      icon: Award,
      number: '15+',
      label: 'Years Experience',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      number: '100%',
      label: 'Satisfaction Rate',
      color: 'text-red-600'
    },
    {
      icon: MapPin,
      number: '50+',
      label: 'Local Suppliers',
      color: 'text-purple-600'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide our community with access to fresh, healthy, and affordable groceries while supporting local farmers and creating a sustainable food system for future generations.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To become the most trusted and beloved grocery store in our community, known for exceptional quality, outstanding service, and unwavering commitment to sustainability.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Handshake,
      title: 'Our Values',
      description: 'Quality first, community support, environmental responsibility, fair pricing, and treating every customer like family. These principles guide everything we do.',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Store Manager',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'With 10 years in retail management, Sarah ensures our store runs smoothly and customers are always satisfied.'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Produce',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Mike works directly with local farmers to bring you the freshest fruits and vegetables every day.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Service Lead',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Emily leads our customer service team and ensures every shopping experience exceeds expectations.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">About FreshMart</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              For over 15 years, we've been more than just a grocery store. We're your neighbors, 
              committed to bringing fresh, quality food to our community while supporting local farmers 
              and sustainable practices.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                FreshMart began as a small family dream in 2009. Founded by the Martinez family, 
                we started with a simple belief: everyone deserves access to fresh, healthy food 
                at fair prices.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                What started as a small corner store has grown into a beloved community hub, 
                but we've never forgotten our roots. We still source from the same local farmers 
                who believed in us from day one, and we still treat every customer like family.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to serve over 5,000 families in our community, but our mission 
                remains the same: bringing you the freshest groceries with the warmest service.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our Store"
                className="rounded-2xl shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Drives Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our mission, vision, and values guide every decision we make
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${value.color} mb-6`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">By the Numbers</h2>
            <p className="text-xl text-gray-600">Our impact in the community</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The dedicated people who make FreshMart special
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-green-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;