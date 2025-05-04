import React from 'react';

const navLinkClass =
  "font-bold text-[16px] leading-5 text-black no-underline hover:text-black focus:text-black transition-colors";

const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#F4E3BF', margin: 0, padding: 0 }}>
      {/* Navbar */}
      <nav
        className="w-full flex flex-row items-center px-8 py-3 relative"
        style={{ fontFamily: 'Montserrat, sans-serif', height: 58 }}
      >
        {/* Left links - fixed width, horizontal row */}
        <div className="flex flex-row items-center gap-8 min-w-[400px] justify-start">
          <a href="#" className={navLinkClass}>Home</a>
          <a href="#" className={navLinkClass}>Shop</a>
          <a href="#" className={navLinkClass}>About</a>
          <a href="#" className={navLinkClass}>Contact us</a>
        </div>
        {/* Center logo - absolutely centered, not affected by left/right */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <img src="/logo-placeholder.png" alt="Logo" className="h-10 object-contain" style={{ maxWidth: 120 }} />
        </div>
        {/* Right icons and buttons - fixed width, right-aligned */}
        <div className="flex flex-row items-center gap-4 min-w-[400px] justify-end">
          {/* Search icon SVG */}
          <button className="p-0 bg-transparent border-none"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>
          {/* Cart icon SVG */}
          <button className="p-0 bg-transparent border-none"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2l1.5 2h9L18 2"/><path d="M3 6h18v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></button>
          {/* Get Thanda button */}
          <button className="bg-[#6B1A1A] text-white px-5 py-1.5 rounded-full font-bold text-[16px]" style={{ fontFamily: 'inherit' }}>Get Thanda</button>
          {/* Signup/Login */}
          <a href="#" className={navLinkClass}>Signup/Login</a>
        </div>
      </nav>
      {/* Page Content Placeholder */}
      <div className="p-4 mt-8">
        <h1 className="text-2xl font-bold text-black">Cart Page</h1>
        <p className="text-black">This is the cart page content</p>
      </div>
    </div>
  );
};

export default CartPage; 