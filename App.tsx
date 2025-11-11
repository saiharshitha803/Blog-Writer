import React, { useState } from 'react';
import { ArticleOutline, ArticleTone, FormData } from './types';
import { generateOutline } from './services/geminiService';
import OutlineForm from './components/OutlineForm';
import OutlineDisplay from './components/OutlineDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import LandingPage from './components/LandingPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'main'>('landing');
  const [isExitingLanding, setIsExitingLanding] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    topicTitle: '',
    detailedTopic: '',
    targetAudience: '',
    seoKeywords: '',
    articleTone: ArticleTone.INFORMATIVE,
  });
  const [outline, setOutline] = useState<ArticleOutline | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setIsExitingLanding(true);
    setTimeout(() => {
      setCurrentPage('main');
    }, 500); // This duration should match the exit animation duration
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOutline(null);

    try {
      const generatedOutline = await generateOutline(formData);
      setOutline(generatedOutline);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-primary font-sans overflow-hidden">
      {currentPage === 'landing' && <LandingPage onStart={handleStart} isExiting={isExitingLanding} />}
      
      {currentPage === 'main' && (
        <main className="container mx-auto px-4 py-8 md:py-12">
          <header className="text-center mb-8 md:mb-12 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
              Blog Post Outline Generator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-secondary-foreground max-w-3xl mx-auto">
              Craft the perfect structure for your next article. Fill in the details below and let our AI content strategist do the heavy lifting.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div 
              className="bg-card text-card-foreground p-6 md:p-8 rounded-lg shadow-lg border border-gray-200/50 opacity-0 animate-slide-in-from-left"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              <h2 className="text-3xl font-bold mb-6 text-primary">Article Details</h2>
              <OutlineForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isLoading={loading}
              />
            </div>

            <div 
              className="lg:sticky lg:top-8 opacity-0 animate-slide-in-from-right"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              <div className="bg-card text-card-foreground p-6 md:p-8 rounded-lg shadow-lg border border-gray-200/50 min-h-[400px] flex flex-col justify-center items-center">
                {loading && <LoadingSpinner />}
                {error && (
                  <div className="text-center text-red-500 animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">Generation Failed</h3>
                    <p>{error}</p>
                  </div>
                )}
                {outline && !loading && !error && <OutlineDisplay outline={outline} />}
                {!loading && !error && !outline && (
                  <div className="text-center text-secondary-foreground animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">Your Outline Awaits</h3>
                    <p>The generated blog post outline will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
           <footer 
              className="text-center mt-12 text-secondary-foreground/80 text-sm opacity-0 animate-fade-in"
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
            <p>"The secret of getting ahead is getting started." - Mark Twain</p>
          </footer>
        </main>
      )}
    </div>
  );
}

export default App;