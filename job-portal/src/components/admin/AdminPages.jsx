import React from 'react';
import AdminAnalytics from './AdminAnalytics';

const AdminPlaceholder = ({ title, description }) => (
  <div className="p-8">
    <div className="bg-white rounded-3xl border border-slate-100 p-20 text-center shadow-sm">
      <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-200 mx-auto mb-6">
        <span className="text-4xl font-black">?</span>
      </div>
      <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tight">{title}</h2>
      <p className="mt-4 text-slate-500 font-medium max-w-sm mx-auto">{description}</p>
      <div className="mt-10 flex justify-center gap-4">
        <div className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce"></div>
        <div className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce delay-100"></div>
        <div className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce delay-200"></div>
      </div>
    </div>
  </div>
);

import AdminMessages from './AdminMessages';
import AdminNotifications from './AdminNotifications';
import AdminSettings from './AdminSettings';

export { AdminAnalytics, AdminMessages, AdminNotifications, AdminSettings };
