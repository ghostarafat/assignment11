import { FaUsers } from "react-icons/fa";

const BannerRight = () => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 order-1 lg:order-2 relative pb-8 sm:pb-10 lg:pb-0">
      {/* First Large Image */}
      <div className="relative">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/teacher-and-student-in-class-illustration-download-svg-png-gif-file-formats--teaching-students-classroom-learning-study-education-pack-school-illustrations-10001586.png"
          alt="Online learning illustration"
          className="rounded-xl sm:rounded-2xl w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      {/* Two Smaller Images Side by Side */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {/* Second Image */}
        <div className="relative">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.hyctaz3KDWLYeL1dcVDsZwHaG-?cb=ucfimg2&pid=ImgDet&ucfimg=1&w=474&h=446&rs=1&o=7&rm=3"
            alt="Tutoring session"
            className="rounded-xl sm:rounded-2xl w-full h-32 xs:h-40 sm:h-48 md:h-56 lg:h-64 object-cover shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            loading="lazy"
          />
        </div>

        {/* Third Image with Stats Card */}
        <div className="relative">
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/791/256/original/happy-little-girl-student-with-backpack-holding-book-and-pen-feeling-excited-to-be-back-to-school-vector.jpg"
            alt="happy student"
            className="rounded-xl sm:rounded-2xl w-full h-32 xs:h-40 sm:h-48 md:h-56 lg:h-64 object-cover shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            loading="lazy"
          />

          {/* Floating Stats Card */}
          <div
            className="absolute -bottom-4 sm:-bottom-6 left-1/2
             -translate-x-1/2 w-36 xs:w-40 sm:w-48 bg-white  rounded-lg sm:rounded-xl shadow-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 border-2 z-10"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div
              className="p-1.5 sm:p-2 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: "var(--color-primary-hover)",
                color: "var(--color-text-light)",
              }}
            >
              <FaUsers className="text-sm sm:text-base" />
            </div>
            <div>
              <p
                className="text-sm sm:text-base font-bold"
                style={{
                  color: "var(--color-text-dark)",
                }}
              >
                2K+
              </p>
              <p
                className="text-[0.65rem] sm:text-xs"
                style={{
                  color: "var(--color-text-muted)",
                }}
              >
                Happy Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerRight;
