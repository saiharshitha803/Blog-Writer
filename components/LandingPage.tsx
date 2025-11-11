import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface LandingPageProps {
  onStart: () => void;
  isExiting: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, isExiting }) => {
  const containerClasses = `
    min-h-screen bg-secondary flex flex-col justify-center items-center p-4 
    ${isExiting ? 'animate-zoom-out-fade' : 'animate-fade-in'}
  `;

  return (
    <div className={containerClasses}>
      <div
        onClick={onStart}
        className="w-full max-w-2xl bg-primary text-primary-foreground p-8 md:p-12 rounded-xl shadow-2xl text-center cursor-pointer transition-all duration-300 ease-in-out border-4 border-accent/20 hover:border-accent/50 hover:shadow-[0_0_30px_theme(colors.accent.DEFAULT)]"
      >
        <div className="flex justify-center items-center mb-6">
           <SparklesIcon className="w-12 h-12 text-accent" />
        </div>
        <h1 className="font-title text-5xl md:text-6xl font-extrabold text-primary-foreground mb-2 tracking-tight">
          Blueprint AI
        </h1>
        <p className="text-xl font-medium text-secondary-foreground mb-6">Outline Architect</p>
        <p className="text-lg text-secondary-foreground mb-8 max-w-xl mx-auto">
          Effortlessly craft structured, SEO-friendly outlines for your articles. Turn your ideas into polished content plans in seconds.
        </p>
        <div className="inline-block px-8 py-4 bg-accent text-accent-foreground font-bold rounded-lg shadow-lg text-lg animate-pulse-slow">
          Start Architecting
        </div>
      </div>
      <blockquote className="text-center mt-12 text-secondary-foreground/80 text-sm italic">
        <p>"The secret of getting ahead is getting started."</p>
        <cite className="font-semibold not-italic">- Mark Twain</cite>
      </blockquote>
    </div>
  );
};

export default LandingPage;