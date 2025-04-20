"use client";

import React, { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { motion, useAnimation, useInView } from "framer-motion";
import HeroSection from "@/components/sn-home/hero-section";
import FeaturesSection from "@/components/sn-home/features-section";
import HowItWorksSection from "@/components/sn-home/how-it-works-section";
import UseCasesSection from "@/components/sn-home/use-cases-section";
import PricingSection from "@/components/sn-home/pricing-section";
import EarlyAccessSection from "@/components/sn-home/early-access-section";

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  // Add Inter font to document
  useEffect(() => {
    // Load Inter font
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    // Clean up
    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  // Create refs and animation controls for each section
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const featuresControls = useAnimation();

  const howItWorksRef = useRef(null);
  const howItWorksInView = useInView(howItWorksRef, {
    once: true,
    amount: 0.2,
  });
  const howItWorksControls = useAnimation();

  const useCasesRef = useRef(null);
  const useCasesInView = useInView(useCasesRef, { once: true, amount: 0.2 });
  const useCasesControls = useAnimation();

  const pricingRef = useRef(null);
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.2 });
  const pricingControls = useAnimation();

  const earlyAccessRef = useRef(null);
  const earlyAccessInView = useInView(earlyAccessRef, {
    once: true,
    amount: 0.2,
  });
  const earlyAccessControls = useAnimation();

  // Start animations when sections come into view
  useEffect(() => {
    if (featuresInView) featuresControls.start("visible");
    if (howItWorksInView) howItWorksControls.start("visible");
    if (useCasesInView) useCasesControls.start("visible");
    if (pricingInView) pricingControls.start("visible");
    if (earlyAccessInView) earlyAccessControls.start("visible");
  }, [
    featuresInView,
    featuresControls,
    howItWorksInView,
    howItWorksControls,
    useCasesInView,
    useCasesControls,
    pricingInView,
    pricingControls,
    earlyAccessInView,
    earlyAccessControls,
  ]);

  return (
    <div id="home">
      <div className="min-h-screen">
        <main>
          <HeroSection />

          <motion.div
            ref={featuresRef}
            initial="hidden"
            animate={featuresControls}
            variants={fadeInUpVariant}
          >
            <FeaturesSection />
          </motion.div>

          <motion.div
            ref={howItWorksRef}
            initial="hidden"
            animate={howItWorksControls}
            variants={fadeInUpVariant}
          >
            <HowItWorksSection />
          </motion.div>

          <motion.div
            ref={useCasesRef}
            initial="hidden"
            animate={useCasesControls}
            variants={fadeInUpVariant}
          >
            <UseCasesSection />
          </motion.div>

          <motion.div
            ref={pricingRef}
            initial="hidden"
            animate={pricingControls}
            variants={fadeInUpVariant}
          >
            <PricingSection />
          </motion.div>

          <motion.div
            ref={earlyAccessRef}
            initial="hidden"
            animate={earlyAccessControls}
            variants={fadeInUpVariant}
          >
            <EarlyAccessSection />
          </motion.div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
