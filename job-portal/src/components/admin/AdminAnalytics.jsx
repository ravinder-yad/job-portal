import React, { useState, useEffect } from 'react';
import { 
  FiUsers, 
  FiBriefcase, 
  FiActivity, 
  FiTrendingUp, 
  FiArrowUpRight, 
  FiArrowDownRight, 
  FiCalendar, 
  FiDownload, 
  FiRefreshCw, 
  FiZap,
  FiStar,
  FiGrid,
  FiMapPin,
  FiExternalLink,
  FiInfo
} from 'react-icons/fi';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { adminService } from '../../services/adminService';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

const AnalyticsCard = ({ title, value, subValue, icon: Icon, color, trend, trendValue }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/30 transition-all relative overflow-hidden h-full group"
  >
    <div className="flex justify-between items-start relative z-10">
      <div className={`p-4 rounded-2xl bg-${color}-50 text-${color}-600 text-2xl group-hover:scale-110 transition-transform`}>
        <Icon />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-black ${trend === 'up' ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'} px-3 py-1.5 rounded-full`}>
          {trend === 'up' ? <FiArrowUpRight /> : <FiArrowDownRight />}
          {trendValue}%
        </div>
      )}
    </div>
    <div className="mt-8 relative z-10">
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{title}</p>
      <h3 className="text-4xl font-black text-slate-900 tracking-tight">{value}</h3>
      <p className="text-xs font-bold text-slate-400 mt-2">{subValue}</p>
    </div>
    {/* Decorative background shape */}
    <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-5 pointer-events-none transition-transform group-hover:scale-150 duration-700" style={{ backgroundColor: color === 'indigo' ? '#6366f1' : color === 'emerald' ? '#10b981' : color === 'amber' ? '#f59e0b' : '#ec4899' }} />
  </motion.div>
);

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeRange, setActiveRange] = useState('7d');

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await adminService.getDetailedAnalytics();
      setData(res);
    } catch (error) {
      console.error("Fetch analytics error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading && !data) {
    return (
      <div className="p-12 space-y-12 animate-in fade-in duration-500">
        <div className="h-20 w-1/3 bg-slate-100 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => <div key={i} className="h-48 bg-slate-100 rounded-[40px] animate-pulse" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 bg-slate-100 rounded-[40px] animate-pulse" />
          <div className="h-96 bg-slate-100 rounded-[40px] animate-pulse" />
        </div>
      </div>
    );
  }

  // Pre-process chart data for Recharts
  const growthData = data?.charts?.userGrowth?.map(item => ({ name: item._id, users: item.count })) || [];
  const trendsData = data?.charts?.jobTrends?.map(item => ({ name: item._id, jobs: item.count })) || [];
  const pieData = data?.charts?.applicationStats?.map((item, idx) => ({ name: item._id, value: item.count, color: COLORS[idx % COLORS.length] })) || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-12 space-y-12 bg-[#f8fafc] min-h-screen text-slate-900"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-10 bg-indigo-600 rounded-full"></span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-950 italic">Analytics Dashboard 📊</h1>
           </div>
           <p className="text-slate-500 font-bold ml-5">Cross-platform performance intelligence & growth metrics.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
           <div className="bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-1">
              {['Today', '7d', '30d'].map(range => (
                <button 
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeRange === range ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
                >
                  {range}
                </button>
              ))}
           </div>
           <button onClick={fetchAnalytics} className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
           </button>
           <button className="flex items-center gap-2 px-8 py-3 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
              <FiDownload className="text-sm" /> Generate Report
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         <AnalyticsCard 
            title="Total Talent Pool" 
            value={data?.stats?.totalUsers || 0} 
            subValue="+12.5% vs last month" 
            icon={FiUsers} 
            color="indigo" 
            trend="up" 
            trendValue="24"
         />
         <AnalyticsCard 
            title="Active Job Postings" 
            value={data?.stats?.totalJobs || 0} 
            subValue="Market utilization: 84%" 
            icon={FiBriefcase} 
            color="emerald" 
            trend="up" 
            trendValue="12"
         />
         <AnalyticsCard 
            title="Partner Companies" 
            value={data?.stats?.totalCompanies || 0} 
            subValue="Elite branding level 4" 
            icon={FiStar} 
            color="amber" 
            trend="down" 
            trendValue="2"
         />
         <AnalyticsCard 
            title="Total Interactions" 
            value={data?.stats?.totalApplications || 0} 
            subValue="Application success rate: 18%" 
            icon={FiZap} 
            color="pink" 
            trend="up" 
            trendValue="42"
         />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* User Growth Chart */}
         <div className="lg:col-span-8 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-10">
            <div className="flex items-center justify-between">
               <div>
                  <h3 className="text-2xl font-black text-slate-950">Talent Acquisition Growth</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Signups per day Over the last 7 days</p>
               </div>
               <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-xl">
                  <FiTrendingUp /> Real-time Indexing
               </div>
            </div>
            
            <div className="h-[400px] w-full pt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                       dy={10}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
                       dx={-10}
                    />
                    <Tooltip 
                       contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px -20px rgba(0,0,0,0.1)', padding: '16px' }}
                       labelStyle={{ fontWeight: 'black', marginBottom: '8px' }}
                    />
                    <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" dot={{ r: 6, fill: '#6366f1', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Application Breakdown */}
         <div className="lg:col-span-4 bg-slate-950 p-10 rounded-[48px] shadow-3xl text-white flex flex-col justify-between">
            <div className="space-y-2">
               <h3 className="text-xl font-black tracking-tight">Hiring Lifecycle</h3>
               <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-relaxed">Status distribution of all candidates</p>
            </div>

            <div className="h-[300px] w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData.length > 0 ? pieData : [{ name: 'No Data', value: 1, color: '#1e293b' }]}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff' }}
                       itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
               </ResponsiveContainer>
               {/* Center Label */}
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-black leading-none">{data?.stats?.totalApplications || 0}</span>
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mt-1">Grand Total</span>
               </div>
            </div>

            <div className="space-y-4 pt-10 border-t border-white/5">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs font-bold text-white/80">{item.name}</span>
                     </div>
                     <span className="text-sm font-black">{item.value}</span>
                  </div>
                ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Activities Column */}
         <div className="lg:col-span-12 bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div>
                  <h3 className="text-2xl font-black text-slate-950 tracking-tight">System Global Activity</h3>
                  <p className="text-xs font-bold text-slate-400 mt-1">Monitor recent registrations and job deployments.</p>
               </div>
               <div className="flex bg-slate-50 p-1 rounded-xl">
                  {['Users', 'Jobs', 'Companies'].map(tab => (
                    <button key={tab} className={`px-6 py-2 rounded-lg text-xs font-black uppercase transition-all hover:text-indigo-600`}>
                      {tab}
                    </button>
                  ))}
               </div>
            </div>
            
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead className="bg-slate-50/50">
                     <tr>
                        <th className="px-10 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Identity</th>
                        <th className="px-10 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Context</th>
                        <th className="px-10 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Timestamp</th>
                        <th className="px-10 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Control</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {data?.recent?.recentUsers?.map((user, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                           <td className="px-10 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-sm border border-indigo-100/50 group-hover:scale-110 transition-transform">
                                    {user.name.charAt(0)}
                                 </div>
                                 <div>
                                    <p className="font-black text-slate-900 leading-tight">{user.name}</p>
                                    <p className="text-xs font-bold text-slate-400 mt-0.5">{user.email}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-6">
                              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100/50">
                                 Candidate Registration
                              </span>
                           </td>
                           <td className="px-10 py-6">
                              <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                                 <FiCalendar /> {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                           </td>
                           <td className="px-10 py-6 text-right">
                              <button className="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all ml-auto">
                                 <FiExternalLink />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            
            <div className="p-8 bg-slate-50/50 border-t border-slate-50 text-center">
               <button className="text-sm font-black text-indigo-600 hover:underline uppercase tracking-widest underline-offset-8">
                  View Comprehensive Site Logs
               </button>
            </div>
         </div>
      </div>

    </motion.div>
  );
};

export default AdminAnalytics;
