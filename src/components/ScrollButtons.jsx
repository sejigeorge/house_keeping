import React, { useEffect, useState } from 'react';

const buttonStyle = {
  position: 'fixed',
  right: '32px',
  zIndex: 1000,
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: '#eaf8fd',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.2s',
  fontSize: '28px',
  color: '#38a1db',
};

const ScrollButtons = () => {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setShowUp(scrollY > 100);
      setShowDown(scrollY + windowHeight < docHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      {showUp && (
        <button
          style={{ ...buttonStyle, bottom: showDown ? 96 : 32 }}
          aria-label="Scroll to top"
          onClick={scrollToTop}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38a1db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 15 12 9 18 15"/></svg>
        </button>
      )}
      {showDown && (
        <button
          style={{ ...buttonStyle, bottom: 32 }}
          aria-label="Scroll to bottom"
          onClick={scrollToBottom}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38a1db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      )}
    </>
  );
};

export default ScrollButtons; 