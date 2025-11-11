
import React from 'react';
import { FormData, ArticleTone } from '../types';

interface OutlineFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const OutlineForm: React.FC<OutlineFormProps> = ({ formData, setFormData, handleSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const wordCount = formData.topicTitle.trim().split(/\s+/).filter(Boolean).length;
  const isTitleTooLong = wordCount > 10;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="topicTitle" className="block text-base font-semibold text-secondary-foreground mb-1">
          Topic Title
        </label>
        <input
          type="text"
          id="topicTitle"
          name="topicTitle"
          value={formData.topicTitle}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-white border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/80 focus:border-accent transition-all duration-200 ease-in-out"
          placeholder="e.g., The Future of Web Development"
        />
        <p className={`text-xs mt-1 ${isTitleTooLong ? 'text-red-500' : 'text-gray-500'}`}>
          {wordCount}/10 words
        </p>
      </div>

      <div>
        <label htmlFor="detailedTopic" className="block text-base font-semibold text-secondary-foreground mb-1">
          Detailed Topic
        </label>
        <textarea
          id="detailedTopic"
          name="detailedTopic"
          value={formData.detailedTopic}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 bg-white border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/80 focus:border-accent transition-all duration-200 ease-in-out"
          placeholder="Describe the article's focus, e.g., 'The benefits of using React Server Components...'"
        />
      </div>

      <div>
        <label htmlFor="targetAudience" className="block text-base font-semibold text-secondary-foreground mb-1">
          Target Audience
        </label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-white border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/80 focus:border-accent transition-all duration-200 ease-in-out"
          placeholder="e.g., Mid-level JavaScript developers"
        />
      </div>

      <div>
        <label htmlFor="seoKeywords" className="block text-base font-semibold text-secondary-foreground mb-1">
          Key SEO Keywords (comma-separated)
        </label>
        <input
          type="text"
          id="seoKeywords"
          name="seoKeywords"
          value={formData.seoKeywords}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-white border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/80 focus:border-accent transition-all duration-200 ease-in-out"
          placeholder="e.g., React, Server Components, Next.js"
        />
      </div>

      <div>
        <label htmlFor="articleTone" className="block text-base font-semibold text-secondary-foreground mb-1">
          Article Tone
        </label>
        <select
          id="articleTone"
          name="articleTone"
          value={formData.articleTone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-white border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/80 focus:border-accent transition-all duration-200 ease-in-out"
        >
          {Object.values(ArticleTone).map(tone => (
            <option key={tone} value={tone}>{tone}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        // Fix: Corrected typo from isYouAreTooLong to isTitleTooLong
        disabled={isLoading || isTitleTooLong}
        className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-accent text-accent-foreground font-semibold rounded-md shadow-md hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-accent/60 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Outline'
        )}
      </button>
    </form>
  );
};

export default OutlineForm;
