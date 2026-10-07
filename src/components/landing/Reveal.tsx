import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Light, one-time entrance for below-the-fold cards. */
export function Reveal({ children, delay = 0, className = '' }: {children: ReactNode;delay?: number;className?: string;}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay }}>
      
      {children}
    </motion.div>);

}