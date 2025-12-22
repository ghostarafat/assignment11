import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiBook,
  FiUsers,
  FiHelpCircle,
  FiShield,
  FiArrowUp,
  FiHeart,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
  FaGraduationCap,
} from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Container from "../Shared/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "All Tutions", path: "/all-tutions" },
    { name: "Find Tutors", path: "/tutor" },

    { name: "About", path: "/about" },
  ];

  const supportLinks = [
    { name: "Help Center" },
    { name: "Contact Support" },
    { name: "FAQ" },
    { name: "Terms of Service" },
    { name: "Privacy Policy" },
    { name: "Cookie Policy" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5" />,
      url: "https://www.linkedin.com/in/arafatazan/",
      color: "#0A66C2",
    },
    {
      name: "GitHub",
      icon: <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />,
      url: "https://github.com/ghostarafat",
      color: "#333333",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />,
      url: "/",
      color: "#1877F2",
    },
    {
      name: "X (Twitter)",
      icon: <RiTwitterXLine className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#000000",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "#E4405F",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <Container>
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 lg:py-16 ">
          <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
              {/* About Platform Section */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <div
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <FaGraduationCap className="text-white " />
                    </div>
                    eTution Bd
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                    Connecting passionate learners with expert tutors worldwide.
                    Our platform makes quality education accessible, flexible,
                    and personalized for everyone's unique learning journey.
                  </p>
                </div>

                {/* Platform Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                  <div
                    className="p-3 sm:p-4 rounded-lg border"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FiUsers
                        size={14}
                        className="sm:w-4 sm:h-4"
                        style={{ color: "var(--color-primary)" }}
                      />
                      <span className="text-white font-semibold text-sm sm:text-base">
                        10K+
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Active Students
                    </p>
                  </div>
                  <div
                    className="p-3 sm:p-4 rounded-lg border"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FiBook
                        size={14}
                        className="sm:w-4 sm:h-4"
                        style={{ color: "var(--color-success)" }}
                      />
                      <span className="text-white font-semibold text-sm sm:text-base">
                        500+
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Expert Tutors
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="mt-8 sm:mt-0">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <FiBook
                      size={12}
                      className="text-white sm:w-[14px] sm:h-[14px]"
                    />
                  </div>
                  Quick Links
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base"
                      >
                        <div
                          className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        ></div>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support & Legal Section */}
              <div className="mt-8 sm:mt-0">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-warning)" }}
                  >
                    <FiHelpCircle
                      size={12}
                      className="text-white sm:w-[14px] sm:h-[14px]"
                    />
                  </div>
                  Support & Legal
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {supportLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base"
                      >
                        <div
                          className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-2"
                          style={{ backgroundColor: "var(--color-warning)" }}
                        ></div>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information Section */}
              <div className="mt-8 sm:mt-0 sm:col-span-2 lg:col-span-1">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-success)" }}
                  >
                    <FiMail
                      size={12}
                      className="text-white sm:w-[14px] sm:h-[14px]"
                    />
                  </div>
                  Contact Us
                </h4>

                <div className="space-y-3 sm:space-y-4 mb-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    >
                      <FiMail
                        size={14}
                        className="sm:w-4 sm:h-4"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium text-sm sm:text-base">
                        Email
                      </p>
                      <a
                        href="mailto:support@etutionbd.com"
                        className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base break-all"
                      >
                        support@etutionbd.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 sm:gap-3">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    >
                      <FiPhone
                        size={14}
                        className="sm:w-4 sm:h-4"
                        style={{ color: "var(--color-success)" }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium text-sm sm:text-base">
                        Phone
                      </p>
                      <a className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                        16969
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 sm:gap-3">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    >
                      <FiMapPin
                        size={14}
                        className="sm:w-4 sm:h-4"
                        style={{ color: "var(--color-warning)" }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium text-sm sm:text-base">
                        Address
                      </p>
                      <p className="text-gray-300 text-sm sm:text-base">
                        Niketon, Gulshan
                        <br />
                        Block-A, Road-1
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div>
                  <h5 className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                    Follow Us
                  </h5>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                        title={social.name}
                      >
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = social.color;
                            e.target.style.borderColor = social.color;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor =
                              "rgba(255, 255, 255, 0.1)";
                            e.target.style.borderColor =
                              "rgba(255, 255, 255, 0.2)";
                          }}
                        >
                          <span className="text-white transition-colors duration-300">
                            {social.icon}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div
          className="border-t py-4 sm:py-6 px-4 sm:px-6 lg:px-8"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              {/* Copyright */}
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-gray-300 text-center sm:text-left">
                <span className="text-sm sm:text-base">
                  © {currentYear} eTution Bd. All rights reserved.
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1 text-sm sm:text-base">
                  Made with{" "}
                  <FiHeart
                    size={12}
                    className="sm:w-[14px] sm:h-[14px]"
                    style={{ color: "var(--color-error)" }}
                  />{" "}
                  for education
                </span>
              </div>

              {/* Security & Trust Badges */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <FiShield
                    size={14}
                    className="sm:w-4 sm:h-4"
                    style={{ color: "var(--color-success)" }}
                  />
                  <span className="text-xs sm:text-sm">Secure Platform</span>
                </div>

                {/* Back to Top Button */}
                <button
                  onClick={scrollToTop}
                  className="group flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                  }}
                >
                  <FiArrowUp
                    size={14}
                    className="sm:w-4 sm:h-4 group-hover:-translate-y-1 transition-transform"
                  />
                  <span className="text-xs sm:text-sm font-medium">Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </Container>
    </footer>
  );
};

export default Footer;
