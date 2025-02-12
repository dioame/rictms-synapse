import { motion } from "framer-motion";

const OverlayLoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="relative w-48 h-48 flex justify-center items-center border-4 border-gray-700 rounded-full overflow-hidden">
        <span className="absolute text-white text-lg font-semibold">Scanning</span>
        
        {/* Radar Sweep Animation */}
        <motion.div
          className="absolute w-full h-full bg-gradient-to-t from-blue-500 to-transparent rounded-full"
          style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />

        {/* Pulsing Effect */}
        <motion.div
          className="absolute w-3/4 h-3/4 border-2 border-blue-500 rounded-full"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default OverlayLoadingScreen;
