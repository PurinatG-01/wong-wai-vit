import '../styles/globals.css'
import { motion } from "framer-motion"


const motionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

function MyApp({ Component, pageProps }) {
  return (
    <motion.div initial="hidden"
      animate="visible"
      variants={motionVariants}>
      <Component {...pageProps} />
    </motion.div>
  )
}

export default MyApp
