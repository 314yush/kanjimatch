import React from 'react';

// Reusable Icon component for clarity
const Icon = ({ path, className = "w-6 h-6" }: { path: string, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const DesignSystemShowcase = () => {
  return (
    <div className="space-y-8 animate-pop-in">
      
      {/* Profile Header */}
      <header className="flex items-center gap-4">
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Sunglasses.png" alt="User Avatar" className="w-16 h-16 rounded-full border-4 border-white shadow-strong" />
        <div>
          <h1>Wawan Gunawan</h1>
          <div className="inline-flex items-center gap-1 bg-brand-primary/20 text-brand-text-primary px-2 py-1 rounded-md text-sm font-semibold">
            <Icon path="m21 8.25c0 1.3-1.05 2.36-2.35 2.36S16.3 9.55 16.3 8.25s1.05-2.36 2.35-2.36c1.3 0 2.35 1.06 2.35 2.36zM13.23 15.34c0 .8-.64 1.44-1.43 1.44s-1.43-.64-1.43-1.44c0-.8.64-1.44 1.43-1.44.79 0 1.43.64 1.43 1.44zM4.19 12c0 .72-.58 1.3-1.3 1.3s-1.3-.58-1.3-1.3.58-1.3 1.3-1.3c.72 0 1.3.58 1.3 1.3z" className="w-4 h-4" />
            12,563 pt
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-2 gap-4">
        <div className="ui-card text-center">
          <h3 className="text-brand-text-secondary font-semibold mb-1">Highest Level</h3>
          <p className="text-4xl font-extrabold">10</p>
        </div>
        <div className="ui-card text-center">
          <h3 className="text-brand-text-secondary font-semibold mb-1">Fastest Time</h3>
          <p className="text-4xl font-extrabold">2m 34s</p>
        </div>
      </section>

      {/* Daily Streak */}
      <section className="ui-card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Daily Streak</h3>
          <div className="flex items-center gap-1 text-brand-primary font-bold">
            <Icon path="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.336.986l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.336-.986l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            5 Days
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th'].map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <p className="font-semibold text-brand-text-secondary">{day}</p>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i < 5 ? 'bg-brand-primary' : 'bg-brand-surface-darker'}`}>
                {i < 5 && <Icon path="M4.5 12.75l6 6 9-13.5" className="w-5 h-5 text-white" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Settings List */}
      <section className="ui-card">
        <div className="settings-list">
          <div className="settings-list-item">
            <div className="settings-list-item-icon">
              <Icon path="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M3.75 18H7.5" />
            </div>
            <span>Profile Settings</span>
          </div>
          <div className="settings-list-item">
            <div className="settings-list-item-icon">
              <Icon path="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </div>
            <span>Change Password</span>
          </div>
          <div className="settings-list-item">
            <div className="settings-list-item-icon">
              <Icon path="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </div>
            <span>Help</span>
          </div>
        </div>
      </section>
      
      {/* Icon Buttons Showcase */}
      <section>
        <h3 className="text-center font-bold mb-4">Icon Buttons</h3>
        <div className="flex justify-center gap-4">
          <button className="btn-icon">
            <Icon path="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </button>
          <button className="btn-icon">
            <Icon path="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </button>
          <button className="btn-icon">
            <Icon path="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default DesignSystemShowcase; 