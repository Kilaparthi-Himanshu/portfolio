import React from 'react'

export default function Navbar() {
  return (
    <nav className='navbar w-max flex gap-2 text-stone-400 font-semibold fixed right-6 top-6 z-99999 max-sm:left-0 max-sm:right-0 max-sm:hidden'>
      <button className='min-w-[90px] max-sm:min-w-max text-center hover:scale-90 transition-all' data-cursor-hover>About</button>

      <div className='h-[25px] border-r border-stone-400' />

      <button className='min-w-[90px] text-center hover:scale-90 transition-all' data-cursor-hover>Skills</button>

      <div className='h-[25px] border-r border-stone-400' />

      <button className='min-w-[90px] text-center hover:scale-90 transition-all' data-cursor-hover>Work</button>

      <div className='h-[25px] border-r border-stone-400' />

      <button className='min-w-[90px] text-center hover:scale-90 transition-all' data-cursor-hover>Projects</button>

      <div className='h-[25px] border-r border-stone-400' />

      <button className='min-w-[90px] text-center hover:scale-90 transition-all' data-cursor-hover>Contact</button>
    </nav>
  );
}
