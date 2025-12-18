import { FaStar, FaCheckCircle } from "react-icons/fa";
import Container from "../Shared/Container";
import BannerRight from "./BannerRight";
import GradientButton from "../Shared/GradientButton";

const Banner = () => {
  return (
    <Container
      className="font-display overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-soft)",
        color: "var(--color-text-dark)",
      }}
    >
      <div>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 order-1">
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
              <FaStar className="text-sm sm:text-base" />
              <span className="hidden xs:inline">
                #1 Platform in Bangladesh
              </span>
              <span className="xs:hidden">#1 Platform in Bangladesh</span>
            </div>

            {/* Heading */}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight">
              Learn Better with the
              <span className="relative inline-block mt-1 sm:mt-0">
                <span
                  className="text-transparent ml-2  bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                  }}
                >
                  Ideal
                </span>
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 rounded"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                    transform: "translateY(0.25rem) sm:translateY(0.5rem)",
                  }}
                />
              </span>{" "}
              Tutor Today
            </h1>
            {/* Description */}
            <p
              className="text-sm sm:text-base lg:text-lg max-w-full lg:max-w-lg leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Unlock your full potential with expert tutors and customized
              private lessons made just for you .
              <span
                style={{ color: "var(--color-primary)", fontWeight: "600" }}
              >
                Achieve your goals faster
              </span>{" "}
              with expert guidance.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <GradientButton to={"/register"}>Become a tutor? </GradientButton>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 pt-4 sm:pt-6">
              {[
                "Verified & experienced tutors",
                "Flexible scheduling options",
                "Affordable pricing plans",
                "Progress tracking tools",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  <FaCheckCircle
                    className="text-green-500 bg-green-100 dark:bg-green-900 p-1 rounded-full flex-shrink-0"
                    size={18}
                  />
                  <span
                    className="text-xs sm:text-sm lg:text-base"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Images */}
          <BannerRight></BannerRight>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
