import Header from "../../components/header"
import Footer from "../../components/footer"
import { Users, Award, Heart, Target, CheckCircle, Star } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Rajesh Dharia",
      role: "Founder & CEO",
      image: "/placeholder.svg?key=team1",
      description:
        "With over 8 years of experience in event management, Rajesh founded Dharia Events with a vision to create unforgettable celebrations.",
    },
    {
      name: "Priya Sharma",
      role: "Creative Director",
      image: "/placeholder.svg?key=team2",
      description:
        "Priya brings artistic vision to every event with her expertise in decoration and styling, ensuring each celebration is unique.",
    },
    {
      name: "Amit Kumar",
      role: "Operations Manager",
      image: "/placeholder.svg?key=team3",
      description: "Amit ensures smooth execution of all events with his meticulous planning and coordination skills.",
    },
    {
      name: "Sunita Devi",
      role: "Client Relations",
      image: "/placeholder.svg?key=team4",
      description:
        "Sunita manages client relationships and ensures every client's vision is understood and executed perfectly.",
    },
  ]

  const achievements = [
    { icon: Users, number: "500+", label: "Happy Clients" },
    { icon: Award, number: "1000+", label: "Events Organized" },
    { icon: Star, number: "4.9/5", label: "Average Rating" },
    { icon: Heart, number: "5+", label: "Years Experience" },
  ]

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for perfection in every detail of your event, ensuring exceptional quality and service.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our passion for creating beautiful moments drives us to go above and beyond for every client.",
    },
    {
      icon: CheckCircle,
      title: "Reliability",
      description: "You can count on us to deliver on our promises and execute your event flawlessly.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work closely with our clients to understand their vision and bring it to life.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">About Dharia Events</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-pretty">
              Creating magical moments and unforgettable experiences for over 5 years in Jharkhand
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Founded in 2019 by Rajesh Dharia, Dharia Events began with a simple mission: to create extraordinary
                  celebrations that bring people together and create lasting memories. What started as a small venture
                  in Hazaribagh has grown into one of Jharkhand's most trusted event management companies.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our journey has been marked by countless beautiful weddings, joyful birthday celebrations, successful
                  corporate events, and memorable engagements. Each event has taught us something new and helped us
                  refine our craft.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, we're proud to have a team of dedicated professionals who share our passion for excellence and
                  our commitment to making every celebration special.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?key=about1"
                  alt="Dharia Events Team"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Achievements</h2>
              <p className="text-xl opacity-90">Numbers that reflect our commitment to excellence</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <achievement.icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{achievement.number}</div>
                  <div className="text-xl font-semibold">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The principles that guide us in creating exceptional experiences for our clients
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The passionate professionals behind every successful event
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-card rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-4">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create something beautiful together. Contact us to discuss your upcoming event.
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Get In Touch
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
