import React from "react";
import { motion } from "framer-motion";

const FAQ = () => {
    return (
        <section className="bg-base-100 py-16 md:py-20">
            <div className="max-w-11/12 mx-auto">

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-secondary text-center mb-10"
                >
                    Frequently Asked Questions
                </motion.h2>

                {/* Accordion */}
                <div className="space-y-4">

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="collapse collapse-plus bg-base-200 rounded-xl"
                    >
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-semibold">
                            How do I apply for a scholarship?
                        </div>
                        <div className="collapse-content">
                            <p className="text-neutral/70">
                                Simply visit the details page of any scholarship and click "Apply".
                                You will be redirected to the official website.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="collapse collapse-plus bg-base-200 rounded-xl"
                    >
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-semibold">
                            Do you charge any fee?
                        </div>
                        <div className="collapse-content">
                            <p className="text-neutral/70">
                                No. ScholarStream does not charge any fee.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="collapse collapse-plus bg-base-200 rounded-xl"
                    >
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-semibold">
                            Are the scholarships verified?
                        </div>
                        <div className="collapse-content">
                            <p className="text-neutral/70">
                                Yes. Every scholarship posted here is manually checked and verified.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default FAQ;
