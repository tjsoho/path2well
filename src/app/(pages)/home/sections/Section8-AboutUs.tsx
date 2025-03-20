"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface AboutMeProps {
  content?: Record<string, string>;
}

export function AboutMe({ content }: AboutMeProps) {
  return (
    <section className="relative bg-brand-cream py-20 md:py-0 md:h-screen">
      <div className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative md:absolute md:left-0 md:h-full md:w-1/2"
          >
            <div className="relative h-[500px] md:h-full w-full">
              <Image
                src="/images/profile.jpeg"
                alt="Financial Advisor"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="md:col-start-2 flex items-center px-4 lg:pl-16">
            <div className="max-w-xl py-12 md:py-0">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="text-xl text-brand-brown-dark mb-4"
              >
                ABOUT US
              </motion.h3>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="text-3xl md:text-4xl lg:text-5xl font-kiona text-brand-brown-dark mb-6"
              >
                At Walker Lane, we&apos;re passionate about empowering
                Australians to thrive financially.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="text-lg text-brand-brown-dark mb-8"
              >
                Our dedicated team embodies expertise and a down-to-earth
                approach—pairing in-depth knowledge with a genuine desire to
                understand your unique circumstances.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <Link
                  href="/about"
                  className="inline-block bg-brand-brown-dark text-brand-cream px-8 py-4 rounded-md text-lg font-kiona font-boldtransition-colors hover:bg-brand-brown-dark/80"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
