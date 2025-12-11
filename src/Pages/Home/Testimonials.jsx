import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../../Component/Shared/SectionHeading";

const Testimonials = () => {
    return (
        <section className="bg-base-200 py-16 md:py-20">
            <div className="max-w-11/12 mx-auto text-center">

                {/* Heading */}
                <SectionHeading title="Success Stories" />

                {/* 3 testimonials */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* CARD 1 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-base-100 p-6 rounded-xl shadow-lg"
                    >
                        <p className="text-neutral/70">
                            “ScholarStream helped me find the perfect full-funded scholarship in Germany.
                            The process became so easy!”
                        </p>
                        <h4 className="mt-4 font-bold text-secondary">— Ayesha Rahman</h4>
                    </motion.div>

                    {/* CARD 2 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-base-100 p-6 rounded-xl shadow-lg"
                    >
                        <p className="text-neutral/70">
                            “I applied to 3 scholarships through this platform and got accepted to one.
                            Highly recommended!”
                        </p>
                        <h4 className="mt-4 font-bold text-secondary">— Mehedi Hasan</h4>
                    </motion.div>

                    {/* CARD 3 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-base-100 p-6 rounded-xl shadow-lg"
                    >
                        <p className="text-neutral/70">
                            “This website gives every detail clearly, and I was able to prepare all documents
                            properly before applying.”
                        </p>
                        <h4 className="mt-4 font-bold text-secondary">— Nusrat Jahan</h4>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
