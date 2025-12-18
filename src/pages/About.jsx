import {
  FaGraduationCap,
  FaUsers,
  FaChalkboardTeacher,
  FaAward,
  FaHeart,
  FaLightbulb,
  FaHandshake,
  FaRocket,
} from "react-icons/fa";
import Container from "../components/Shared/Container";
import GradientHeading from "../components/Shared/GradientHeading";
import { Link } from "react-router";

const About = () => {
  const stats = [
    { icon: FaUsers, number: "10,000+", label: "Active Students" },
    { icon: FaChalkboardTeacher, number: "2,500+", label: "Expert Tutors" },
    { icon: FaGraduationCap, number: "50,000+", label: "Successful Sessions" },
    { icon: FaAward, number: "98%", label: "Success Rate" },
  ];

  const values = [
    {
      icon: FaLightbulb,
      title: "Innovation",
      description:
        "We continuously innovate to provide the best learning experience through cutting-edge technology and modern teaching methods.",
    },
    {
      icon: FaHeart,
      title: "Passion",
      description:
        "Our passion for education drives us to create meaningful connections between students and tutors for transformative learning.",
    },
    {
      icon: FaHandshake,
      title: "Trust",
      description:
        "We build trust through transparency, reliability, and commitment to delivering quality educational services to our community.",
    },
    {
      icon: FaRocket,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, ensuring the highest standards in education and student success.",
    },
  ];

  const team = [
    {
      name: "Juyria Binte Kunjo",
      role: "Founder & CEO",
      image:
        "data:image/jpeg;base64,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",
      description: "Former educator with 15+ years in educational technology",
    },
    {
      name: "Arafat Hossain",
      role: "Head of Technology",
      image:
        "data:image/jpeg;base64,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",
      description: "Tech innovator passionate about educational solutions",
    },
    {
      name: "Hasanuzzaman Hasan",
      role: "Head of Education",
      image:
        "data:image/jpeg;base64,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",
      description:
        "Curriculum specialist with expertise in personalized learning",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      {/* Hero Section */}
      <section>
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto px-4">
            <GradientHeading text={"About eTution Bd"} />
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-2">
              Connecting passionate learners with expert tutors to unlock
              unlimited potential
            </p>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center px-4">
            <div className="order-2 lg:order-1">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
                style={{ color: "var(--color-text-dark)" }}
              >
                Our Mission
              </h2>
              <p
                className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                At eTution Bd, we believe that quality education should be
                accessible to everyone. Our mission is to bridge the gap between
                students seeking knowledge and experienced tutors ready to share
                their expertise.
              </p>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                We're committed to creating a platform where learning is
                personalized, engaging, and effective. Through our innovative
                approach, we empower students to achieve their academic goals
                while providing tutors with meaningful opportunities to make a
                difference.
              </p>
            </div>
            <div className="relative order-1 lg:order-2">
              <img
                src="https://img.clipart-library.com/24/6d2ea1d3-ccfb-4a2e-ad90-6e92acd0f2f9.png"
                alt="Students learning together"
                className="rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-full h-64 sm:h-80 md:h-96 object-cover"
              />
              <div
                className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 w-20 h-20 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <FaLightbulb className="text-2xl sm:text-4xl text-white" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section
        className="py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: "var(--color-card-bg)" }}
      >
        <Container>
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
              style={{ color: "var(--color-text-dark)" }}
            >
              Our Impact
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto px-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              Numbers that reflect our commitment to educational excellence
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-3 sm:p-4">
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <stat.icon className="text-lg sm:text-2xl text-white" />
                </div>
                <div
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-xs sm:text-sm md:text-base font-medium px-1"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
              style={{ color: "var(--color-text-dark)" }}
            >
              Our Values
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto px-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--color-card-bg)" }}
              >
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <value.icon className="text-lg sm:text-2xl text-white" />
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold mb-2 sm:mb-3"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section
        className="py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: "var(--color-card-bg)" }}
      >
        <Container>
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
              style={{ color: "var(--color-text-dark)" }}
            >
              Meet Our Team
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto px-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              The passionate individuals behind Edu Plus
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--color-bg-soft)" }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full object-cover border-3 sm:border-4 border-white shadow-lg"
                />
                <h3
                  className="text-lg sm:text-xl font-bold mb-1"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-sm sm:text-base font-medium mb-2 sm:mb-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  {member.role}
                </p>
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section
        className="py-12 sm:py-16 md:py-20 lg:py-24 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-2">
              Join thousands of students and tutors who are already part of our
              community
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <Link
                to={"/tutor"}
                className=" btn bg-orange-500 border-0 btn-lg gap-2 hover:bg-white text-primary hover:scale-105 transition-transform border-none"
              >
                Find a Tutor
              </Link>
              <Link
                to={"/register"}
                className=" btn bg-orange-500 border-0 btn-lg gap-2 hover:bg-white text-primary hover:scale-105 transition-transform border-none"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
