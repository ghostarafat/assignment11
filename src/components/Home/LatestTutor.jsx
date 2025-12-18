import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import TuitionCard from "../TuitionCard";
import { FiArrowRight, FiZap } from "react-icons/fi";
import Container from "../Shared/Container";
import Spinner from "../Shared/Spinner";
import LatestTutorCard from "../LatestTutorCard";
import GradientHeading from "../Shared/GradientHeading";
import TCard from "../TCard";
import TutorCard from "../TutorCard";

const LatestTutor = () => {
  const axiosSecure = useAxiosSecure();

  const { data: latestTutorData, isLoading } = useQuery({
    queryKey: ["allLatestTutor"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/latest-tutors`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <section className="py-16">
      <Container className={"px-5"}>
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
          <span className="xs:hidden">Meet the Team Passionate People</span>
        </div>
        {/* Tuitions Carousel */}

        {latestTutorData && (
          <div className="relative">
            {/* Custom Navigation Buttons */}
            <div className="flex justify-between items-center mb-6">
              {/* Heading */}
              <GradientHeading text={"  Latest Tutor"}></GradientHeading>

              <Link to="/tutor" className=" gap-2 ">
                <p className="flex  text-orange-500 font-bold items-center justify-center">
                  more
                  <FiArrowRight size={16} />
                </p>
              </Link>
            </div>

            <Swiper
              loop={latestTutorData.length > 3}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              modules={[Pagination, Autoplay, Navigation]}
              className="latest-tuitions-swiper pb-12"
            >
              {latestTutorData.map((tutor) => (
                <SwiperSlide key={tutor._id}>
                  <TutorCard tutor={tutor} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </Container>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .latest-tuitions-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .latest-tuitions-swiper .swiper-pagination-bullet {
          background: var(--color-primary);
          opacity: 0.3;
        }

        .latest-tuitions-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }

        .latest-tuitions-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
};

export default LatestTutor;
