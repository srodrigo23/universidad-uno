import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'motion/react';

const SHOW_THRESHOLD = 480;

interface Props {
  t: {
    label: string;
  };
}

export default function ScrollToTopButton({ t }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t.label}
          className="fixed bottom-6 left-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] z-50 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white shadow-lg transition-transform hover:scale-110 hover:bg-secondary-dark"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          <span className="animate-bounce-gentle">
            <FaArrowUp size={18} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
