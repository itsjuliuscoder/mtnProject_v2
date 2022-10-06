  
 
  const motionVariant = { 
      hidden: { opacity: 0, x: -200, y: 0 },
      enter: { opacity: 1, x: 0, y: 0, transition: {
        ease: "easeInOut",
        duration: .8,
      } 
    },
    exit: { opacity: 0, x: 0, y: -100 },
  }
  
  const transition = { duration: 0.5, ease: "easeInOut" };
  const motionFadeInVariant = { 
    initial: { y: 100, opacity: 0 },
    enter: { y: 0, opacity: 1, transition },
    exit: { y: -100, opacity: 0, transition }
  }
  
  const delaytransition = { duration: 0.9, ease: "easeInOut" };
  const delayMotionFadeInVariant = { 
    initial: { y: 100, opacity: 0 },
    enter: { y: 0, opacity: 1, transition: delaytransition },
    exit: { y: -100, opacity: 0, transaction: delaytransition }
  }
  
  export default {
    motionVariant,
    motionFadeInVariant,
    delayMotionFadeInVariant
  }
  