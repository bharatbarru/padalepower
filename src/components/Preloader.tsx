"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onLoad = () => {
      // small delay to allow content to settle
      setTimeout(() => setVisible(false), 400);
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        onLoad();
      } else {
        window.addEventListener('load', onLoad);
      }
    }

    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-28 h-28">
          <Image src="/images/logo.png" alt="Logo" fill sizes="112px" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
