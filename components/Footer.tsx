
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white mt-8 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-slate-300">
          حقوق النشر محفوظة لدى المهندسة سميرة ظافر الشعوبي &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
