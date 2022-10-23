import React from "react";
import { motion } from "framer-motion";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const LoadingScreen: React.FC = () => {
  return (
    <div
      data-testid="loadingScreen"
      className="relative flex items-center justify-center py-8 text-center"
    >
      <motion.div
        variants={animation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 z-50"></div>
        <i className="text-6xl bx bx-loader-alt bx-spin "></i>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
