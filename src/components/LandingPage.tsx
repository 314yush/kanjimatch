import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface LandingPageProps {
  onStart: () => void;
}

const features: Feature[] = [
  {
    title: 'Learn with Real-Life Phrases',
    description: "Master Japanese as it's actually spoken, not just isolated words.",
    icon: '🗣️',
  },
  {
    title: 'Interactive Challenges & Stories',
    description: 'Practice with games, stories, and real conversations.',
    icon: '🎮',
  },
  {
    title: 'Track Your Progress',
    description: 'Stay motivated with daily goals and achievements.',
    icon: '📈',
  },
];

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center px-2 py-6 bg-[#F7E9D0] font-sans">
      <section className="w-full max-w-md flex flex-col items-center text-center mt-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight brand-heading" style={{ fontFamily: 'Nunito, Quicksand, Poppins, sans-serif', color: '#3B2F1E' }}>
          Go Beyond Words—Unlock Real Japanese with Everyday Phrases and Context
        </h1>
        <p className="mb-5 text-base md:text-lg" style={{ color: '#A78B6C', fontFamily: 'Inter, Open Sans, system-ui, sans-serif' }}>
          Learn Japanese the way it's actually used in daily life. Practice with real phrases, stories, and interactive challenges.
        </p>
        <button
          className="btn btn-primary text-lg font-bold rounded-full px-8 py-3 shadow-md mb-2 transition"
          style={{ background: '#F59E42', color: 'white', fontFamily: 'Inter, Open Sans, system-ui, sans-serif' }}
          aria-label="Start Learning Free"
          onClick={onStart}
        >
          Start Learning Free
        </button>
      </section>

      <section className="w-full max-w-md mb-8">
        <ul className="grid grid-cols-1 gap-5">
          {features.map((feature) => (
            <li key={feature.title} className="flex items-center ui-card" style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 4px 24px 0 #F59E4220', border: '1px solid #F7E9D0' }}>
              <span className="text-3xl mr-4" aria-hidden="true" style={{ color: '#6C4F2B' }}>{feature.icon}</span>
              <div className="text-left">
                <h2 className="font-bold text-lg mb-1 brand-heading" style={{ fontFamily: 'Nunito, Quicksand, Poppins, sans-serif', color: '#3B2F1E' }}>{feature.title}</h2>
                <p className="text-sm" style={{ color: '#A78B6C', fontFamily: 'Inter, Open Sans, system-ui, sans-serif' }}>{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full max-w-md flex flex-col items-center mb-8">
        <div className="w-64 h-40 rounded-2xl overflow-hidden shadow-inner mb-2 border-2 border-[#F59E42] bg-white flex items-center justify-center">
          <img
            src="/landing-demo.png"
            alt="App UI demo"
            className="object-cover w-full h-full"
            style={{ borderRadius: '1rem' }}
          />
        </div>
        <div className="text-xs" style={{ color: '#A78B6C' }}>See how you'll learn with interactive challenges</div>
      </section>

      <section className="w-full max-w-md flex flex-col items-center mt-auto">
        <button
          className="btn btn-primary text-lg font-bold rounded-full px-8 py-3 shadow-md mb-2 transition"
          style={{ background: '#F59E42', color: 'white', fontFamily: 'Inter, Open Sans, system-ui, sans-serif' }}
          aria-label="Start Learning Free"
          onClick={onStart}
        >
          Start Learning Free
        </button>
        <div className="text-xs" style={{ color: '#A78B6C' }}>No credit card required</div>
      </section>
    </main>
  );
};

export default LandingPage;