import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

// implement a transition when the div is visible

const Reveal = (props) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const mainControlls = useAnimation();
  const slideControlls = useAnimation();

  useEffect(() => {
    if (inView){
        mainControlls.start("visible")
        slideControlls.start("visible")
    }
    console.log(inView)
  }, [inView])
  

  return (
    <div
      style={{
        position: "relative",
        width:props.width || "fit-content",
        overflow: "hidden",
      }}
      ref={ref}
    >
      
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate = {mainControlls}
        transition={{ duration: 0.5 , delay:0.5}}
      >
        <div>{props.children}</div>
      </motion.div>
      {/* <motion.div
      variants={{
        hidden:{left:0},
        visible:{left:"100%"}
      }}
      initial="hidden"
      animate={slideControlls}
      transition={{duration:0.5 , easy:"easeIn"}}
      style={{
        position:"absolute",
        top:4,
        bottom:4,
        left:0,
        right:0,
        background:"blue",
        zIndex:20,
      }}
      /> */}
    </div>
  );
};

export default Reveal;
