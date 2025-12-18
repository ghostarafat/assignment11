import {
  FiUser,
  FiBook,
  FiStar,
  FiShield,
  FiClock,
  FiGlobe,
  FiArrowRight,
  FiCheck,
  FiZap,
  FiTrendingUp,
  FiAward,
  FiHeart,
} from "react-icons/fi";
import Container from "../Shared/Container";
import GradientHeading from "../Shared/GradientHeading";

const PlatformSections = () => {
  const steps = [
    {
      icon: <FiUser size={32} />,
      title: "Sign Up",
      desc: "Create your account quickly and easily with our streamlined registration process.",
      number: "01",
      color: "primary",
    },
    {
      icon: <FiBook size={32} />,
      title: "Choose a Tutor",
      desc: "Browse and select the best tutor for your subject from our verified professionals.",
      number: "02",
      color: "secondary",
    },
    {
      icon: <FiStar size={32} />,
      title: "Start Learning",
      desc: "Begin personalized lessons and track your progress with interactive tools.",
      number: "03",
      color: "success",
    },
  ];

  const features = [
    {
      icon: <FiShield size={28} />,
      title: "Trusted & Verified",
      desc: "All tutors undergo rigorous verification for quality, credentials, and reliability.",
      color: "primary",
      stats: "100% Verified",
    },
    {
      icon: <FiClock size={28} />,
      title: "Flexible Timing",
      desc: "Schedule classes at your convenience with 24/7 availability and easy rescheduling.",
      color: "warning",
      stats: "24/7 Available",
    },
    {
      icon: <FiGlobe size={28} />,
      title: "Global Access",
      desc: "Connect with expert tutors from around the world and learn from anywhere.",
      color: "success",
      stats: "50+ Countries",
    },
    {
      icon: <FiTrendingUp size={28} />,
      title: "Progress Tracking",
      desc: "Monitor your learning journey with detailed analytics and performance insights.",
      color: "info",
      stats: "Real-time Data",
    },
    {
      icon: <FiAward size={28} />,
      title: "Quality Assurance",
      desc: "Experience excellence with our quality-first approach and satisfaction guarantee.",
      color: "secondary",
      stats: "98% Satisfaction",
    },
    {
      icon: <FiHeart size={28} />,
      title: "Personalized Care",
      desc: "Receive individualized attention and customized learning plans for optimal results.",
      color: "error",
      stats: "1-on-1 Focus",
    },
  ];

  return (
    <div className="py-20" style={{ backgroundColor: "var(--color-bg-soft)" }}>
      <Container>
        {/* How the Platform Works */}
        <section className="mb-24">
          {/* Section Header */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 
                          px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs 
                          sm:text-sm font-medium self-start animate-pulse"
              style={{
                backgroundColor: "var(--color-primary-hover)",
                color: "var(--color-secondary)",
              }}
            >
              <FiZap className="text-sm sm:text-base" />
              <span className="hidden xs:inline">How It Works</span>
              <span className="xs:hidden"> How It Works</span>
            </div>

            <GradientHeading text={"Simple Steps to Success"}></GradientHeading>
            <p
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Get started with our platform in just three easy steps and unlock
              your learning potential
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 -translate-y-1/2 z-0">
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: "var(--color-border)" }}
              ></div>
            </div>

            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div
                  className="rounded-2xl p-8 text-center shadow-xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
                  style={{
                    backgroundColor: "var(--color-card-bg)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  {/* Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                      backgroundSize: "20px 20px",
                      color: `var(--color-${step.color})`,
                    }}
                  ></div>

                  {/* Step Number */}
                  <div
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    style={{ backgroundColor: `var(--color-${step.color})` }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: `var(--color-${step.color}-hover)`,
                      color: `var(--color-${step.color})`,
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {step.desc}
                  </p>

                  {/* Arrow for next step */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                        style={{
                          backgroundColor: "var(--color-card-bg)",
                          border: "2px solid var(--color-border)",
                        }}
                      >
                        <FiArrowRight
                          size={16}
                          style={{ color: "var(--color-primary)" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          {/* Section Header */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 
                          px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs 
                          sm:text-sm font-medium self-start animate-pulse"
              style={{
                backgroundColor: "var(--color-primary-hover)",
                color: "var(--color-secondary)",
              }}
            >
              <FiZap className="text-sm sm:text-base" />
              <span className="hidden xs:inline"> Why Choose Us</span>
              <span className="xs:hidden"> Why Choose Us</span>
            </div>

            <GradientHeading
              text={" Experience the  Difference"}
            ></GradientHeading>
            <p
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Discover what makes our platform the preferred choice for
              thousands of learners worldwide
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div
                  className="rounded-2xl p-8 shadow-xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden h-full"
                  style={{
                    backgroundColor: "var(--color-card-bg)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  {/* Background Gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, var(--color-${feature.color}), transparent)`,
                    }}
                  ></div>

                  {/* Stats Badge */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `var(--color-${feature.color}-hover)`,
                      color: `var(--color-${feature.color})`,
                    }}
                  >
                    {feature.stats}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: `var(--color-${feature.color}-hover)`,
                      color: `var(--color-${feature.color})`,
                    }}
                  >
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {feature.desc}
                  </p>

                  {/* Hover Effect Border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      border: `2px solid var(--color-${feature.color})`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default PlatformSections;
