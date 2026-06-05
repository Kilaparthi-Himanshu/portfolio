'use client';

import { useState } from 'react';
import Loader from './Loader'; // adjust path to wherever you put Loader.tsx

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Block scroll until loader is done */}
      {!loaded && (
        <style>{`html, body { overflow: hidden !important; }`}</style>
      )}

      {/* Loader sits on top; removes itself from DOM when done */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Page content — always mounted so images start loading immediately */}
      {children}
    </>
  );
}