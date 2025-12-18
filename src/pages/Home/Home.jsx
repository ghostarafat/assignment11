// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Banner from "../../components/Home/Banner";
import Call from "../../components/Home/Call";
import LatestTuition from "../../components/Home/LatestTuition";
import LatestTutor from "../../components/Home/LatestTutor";
import PlatformSections from "../../components/Home/PlatformSections";

function Home() {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for each section
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Floating animation for banner
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden"
    >
      {/* Banner with floating animation */}
      <motion.div
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={floatingVariants} animate="animate">
          <Banner />
        </motion.div>
      </motion.div>

      {/* Latest Tuition with slide-in animation */}
      <motion.div
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
      >
        <LatestTuition />
      </motion.div>

      {/* Latest Tutor with rotation effect */}
      <motion.div
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{
          rotateY: 2,
          scale: 1.01,
          transition: { duration: 0.4 },
        }}
      >
        <LatestTutor />
      </motion.div>

      {/* Call section with pulse animation */}
      <motion.div
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          transition: { duration: 0.3 },
        }}
      >
        <Call />
      </motion.div>

      <motion.div>
        <PlatformSections />
      </motion.div>
    </motion.div>
  );
}

export default Home;
