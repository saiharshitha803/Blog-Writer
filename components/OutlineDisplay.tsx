
import React from 'react';
import { ArticleOutline } from '../types';

interface OutlineDisplayProps {
  outline: ArticleOutline;
}

const OutlineDisplay: React.FC<OutlineDisplayProps> = ({ outline }) => {
  return (
    <div className="animate-fade-in space-y-6 text-left w-full">
      <div className="prose prose-sm md:prose-base max-w-none prose-headings:text-primary prose-p:text-secondary-foreground prose-li:text-secondary-foreground prose-strong:text-primary">
        <h2 className="text-3xl font-extrabold text-primary !mb-2">
          {outline.article_title}
        </h2>
        <p className="text-sm uppercase font-semibold tracking-wider text-accent !mt-0">
          Tone: {outline.article_tone}
        </p>

        <div className="bg-secondary/70 p-4 rounded-md mt-4">
          <h3 className="text-lg font-semibold !mt-0 !mb-1 text-primary">SEO Summary</h3>
          <p className="!mt-0 text-secondary-foreground">{outline.seo_summary}</p>
        </div>

        <hr className="my-6" />

        {outline.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-2xl font-bold !mb-2 text-primary">{index + 1}. {section.heading}</h3>
            <p className="!mt-0 italic text-secondary-foreground">{section.introduction}</p>
            <ul className="!mt-4 !mb-0 space-y-2 list-none !pl-0">
              {section.sub_points.map((point, pointIndex) => (
                <li key={pointIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <hr className="my-6" />
        
        <div className="bg-secondary/70 p-4 rounded-md">
            <h3 className="text-lg font-semibold !mt-0 !mb-1 text-primary">Conclusion</h3>
            <p className="!mt-0 text-secondary-foreground">{outline.conclusion_summary}</p>
        </div>
      </div>
    </div>
  );
};

export default OutlineDisplay;
