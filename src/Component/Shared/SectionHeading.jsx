import React from "react";
import { motion } from "framer-motion";

const SectionHeading = ({ title }) => {
    return (
        <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl text-center font-bold text-secondary mb-10"
        >
            {title}
        </motion.h2>
    );
};

export default SectionHeading;
