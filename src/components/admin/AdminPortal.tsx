import React, { useState } from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import { translations } from '../../locales/locales';
import { 
  ShieldAlert, 
  Search, 
  FileText, 
  Video, 
  ZoomIn, 
  Activity, 
  Check, 
  X, 
  Mail, 
  Lock,
  Sliders
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const AdminPortal: React.FC = () => {
  const { 
    language, 
    claims, 
    videos, 
    currentUser,
    auditLogs, 
    settings, 
    resolveDispute, 
    updateSettings,
    triggerSystemWarning
  } = useGlobalState();
  const t = translations[language];

  // Auth States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [authStep, setAuthStep] = useState<'password' | 'mfa'>('password');

  // Navigation States
  const [adminTab, setAdminTab] = useState<'disputes' | 'analytics' | 'users' | 'settings'>('disputes');

  // Dispute Details States
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [brightnessLevel, setBrightnessLevel] = useState(100);
  const [contrastLevel, setContrastLevel] = useState(100);

  // Decision & Template States
  const [notes, setNotes] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('approve_particle');
  const [customMsg, setCustomMsg] = useState('');

  // Search/Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const activeClaim = claims.find(c => c.claim_id === selectedDisputeId);
  
  // Find linked video
  const linkedVideo = activeClaim ? videos.find(v => v.verification_code === activeClaim.linked_video_code) : null;

  // Sound helper
  const playBeep = (freq = 880, type = 'sine', duration = 0.2) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type as OscillatorType;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setAuthStep('mfa');
      playBeep(900, 'sine', 0.1);
    } else {
      alert("Invalid password! (Hint: use admin123)");
      playBeep(250, 'triangle', 0.4);
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode === '654321') {
      setIsAdminLoggedIn(true);
      playBeep(1100, 'sine', 0.2);
    } else {
      alert("Invalid MFA code! (Hint: use 654321)");
      playBeep(250, 'triangle', 0.4);
    }
  };

  // Templates
  const templates: Record<string, { subject: string; body: string }> = {
    approve_particle: {
      subject: "FoodShield Refund Approved - Food Contamination Detected",
      body: "Hello [CustomerName],\n\nWe have reviewed claim #[ClaimID] for your order from [RestaurantName]. Our forensic image analysis has verified the presence of a foreign particle (Hair/Insect) with high confidence. A refund of [Amount] has been authorized and dispatched to your original payment method.\n\nBest regards,\nFoodShield Security"
    },
    approve_leak: {
      subject: "FoodShield Refund Approved - Damaged Packaging Leakage",
      body: "Hello [CustomerName],\n\nWe have reviewed claim #[ClaimID] for your order from [RestaurantName]. The split-screen verification audit indicates box-sealing errors. A refund of [Amount] has been approved and Razorpay processing initiated.\n\nBest regards,\nFoodShield Security"
    },
    reject_ai: {
      subject: "FoodShield Claim Declined - Synthetic Evidence Warning",
      body: "Hello [CustomerName],\n\nWe regret to inform you that claim #[ClaimID] has been rejected. Our CLIP & Deep Learning image models flagged the submitted evidence photos as highly likely to be AI-generated (92% likelihood). Please note that submitting synthetic images violates our platform terms of service and has resulted in a fraud flag on your account.\n\nBest regards,\nFoodShield Security Office"
    },
    reject_mismatch: {
      subject: "FoodShield Claim Declined - Video Match Discrepancy",
      body: "Hello [CustomerName],\n\nWe have audited claim #[ClaimID] alongside the restaurant's packing records. The kitchen's H.265 video log shows the food was perfectly packed without contaminants immediately before seal, and the customer photos contain structural alterations. The dispute has been declined.\n\nBest regards,\nFoodShield Security"
    }
  };

  const handleTemplateChange = (val: string) => {
    setSelectedTemplate(val);
    if (!activeClaim) return;
    let template = templates[val];
    let processedBody = template.body
      .replace('[CustomerName]', activeClaim.customer_name)
      .replace('[ClaimID]', activeClaim.claim_id)
      .replace('[RestaurantName]', activeClaim.restaurant_name)
      .replace('[Amount]', `₹${activeClaim.refund_amount}`);
    setCustomMsg(processedBody);
  };

  // Initialize templates on dispute selection
  const selectDispute = (id: string) => {
    setSelectedDisputeId(id);
    setActivePhotoIdx(0);
    setNotes('');
    playBeep(800, 'sine', 0.1);
    
    // Autofill initial template
    const target = claims.find(c => c.claim_id === id);
    if (target) {
      const initialType = target.ai_fraud_score > 60 ? 'reject_ai' : 'approve_particle';
      setSelectedTemplate(initialType);
      let template = templates[initialType];
      let processedBody = template.body
        .replace('[CustomerName]', target.customer_name)
        .replace('[ClaimID]', target.claim_id)
        .replace('[RestaurantName]', target.restaurant_name)
        .replace('[Amount]', `₹${target.refund_amount}`);
      setCustomMsg(processedBody);
    }
  };

  // Resolve claim action
  const handleResolve = (decision: 'approved' | 'rejected') => {
    if (!selectedDisputeId || !activeClaim) return;
    resolveDispute(selectedDisputeId, decision, activeClaim.refund_amount, notes || 'Resolved via Admin Security panel.');
    playBeep(decision === 'approved' ? 1200 : 300, 'sine', 0.3);
    setSelectedDisputeId(null);
  };

  // KPI calculations
  const pendingCount = claims.filter(c => c.status === 'submitted' || c.status === 'analyzing' || c.status === 'review').length;
  const approvedSum = claims.filter(c => c.status === 'approved').reduce((acc, c) => acc + c.refund_amount, 0);
  const rejectedCount = claims.filter(c => c.status === 'rejected').length;
  const fraudFlaggedUsersCount = claims.filter(c => c.ai_fraud_score > 60).length;

  // Filter Claims
  const filteredClaims = claims.filter(c => {
    const matchesSearch = c.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.claim_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.order_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;

    let matchesRisk = true;
    if (riskFilter === 'high') matchesRisk = c.ai_fraud_score >= 60;
    else if (riskFilter === 'medium') matchesRisk = c.ai_fraud_score >= 30 && c.ai_fraud_score < 60;
    else if (riskFilter === 'low') matchesRisk = c.ai_fraud_score < 30;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  // Recharts Admin Data
  const dailyDisputesVolume = [
    { name: '05/15', Volume: 14, Fraud: 2 },
    { name: '05/16', Volume: 18, Fraud: 1 },
    { name: '05/17', Volume: 22, Fraud: 4 },
    { name: '05/18', Volume: 12, Fraud: 0 },
    { name: '05/19', Volume: 28, Fraud: 8 },
    { name: '05/20', Volume: claims.length, Fraud: fraudFlaggedUsersCount }
  ];

  if (!isAdminLoggedIn) {
    return (
      <div className="flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-red-500/10 rounded-full blur-3xl"></div>
          
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-700 text-white flex items-center justify-center mb-3">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">{t.adminTitle}</h2>
            <p className="text-xs text-slate-400 mt-1">{t.adminSubtitle}</p>
          </div>

          {authStep === 'password' ? (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Enter Security Key
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500"><Lock className="h-4 w-4" /></span>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full h-11 bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl pl-10 pr-4 text-sm text-white outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">Demo Password: admin123</p>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium rounded-xl text-sm transition-all"
              >
                Authenticate Password
              </button>
            </form>
          ) : (
            <form onSubmit={handleMfaSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  2FA Authenticator Code
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500"><Activity className="h-4 w-4" /></span>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="654321"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full h-11 bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl pl-10 pr-4 text-sm font-mono text-center tracking-widest text-white outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">Demo 2FA Code: 654321</p>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium rounded-xl text-sm transition-all"
              >
                Verify 2FA Token
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      
      {/* Tab Nav Controls */}
      <div className="flex flex-wrap gap-2 border-b border-slate-900 pb-3">
        <button
          onClick={() => { setAdminTab('disputes'); setSelectedDisputeId(null); }}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all ${
            adminTab === 'disputes' ? 'bg-red-600/10 text-red-400 border border-red-500/20' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.disputesQueue} ({pendingCount})
        </button>
        <button
          onClick={() => setAdminTab('analytics')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all ${
            adminTab === 'analytics' ? 'bg-red-600/10 text-red-400 border border-red-500/20' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.analyticsOverview}
        </button>
        <button
          onClick={() => setAdminTab('users')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all ${
            adminTab === 'users' ? 'bg-red-600/10 text-red-400 border border-red-500/20' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          User Registry
        </button>
        <button
          onClick={() => setAdminTab('settings')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all ${
            adminTab === 'settings' ? 'bg-red-600/10 text-red-400 border border-red-500/20' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.systemSettings}
        </button>
      </div>

      {/* 1. Disputes Tab */}
      {adminTab === 'disputes' && !selectedDisputeId && (
        <div className="space-y-6">
          {/* Top KPI row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{t.pendingDisputes}</span>
              <h3 className="text-3xl font-extrabold text-white mt-1">{pendingCount}</h3>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{t.approvedRefunds}</span>
              <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">₹{approvedSum}</h3>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{t.rejectedClaims}</span>
              <h3 className="text-3xl font-extrabold text-slate-400 mt-1">{rejectedCount}</h3>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">AI Fraud Flag Blocks</span>
              <h3 className="text-3xl font-extrabold text-red-400 mt-1">{fraudFlaggedUsersCount}</h3>
            </div>
          </div>

          {/* Filters Deck */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="relative w-full md:w-80">
              <span className="absolute left-3 top-3 text-slate-500"><Search className="h-4 w-4" /></span>
              <input
                type="text"
                placeholder="Search ID, customer, order number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 bg-slate-950 border border-slate-850 focus:border-red-500 rounded-xl pl-10 pr-4 text-xs text-white outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-850 h-10 px-3 text-xs text-slate-300 rounded-xl outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="analyzing">Analyzing</option>
                <option value="review">Review Needed</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="bg-slate-950 border border-slate-850 h-10 px-3 text-xs text-slate-300 rounded-xl outline-none"
              >
                <option value="all">All AI Risks</option>
                <option value="high">High Risk (&gt;60%)</option>
                <option value="medium">Medium Risk (30-60%)</option>
                <option value="low">Low Risk (&lt;30%)</option>
              </select>
            </div>

          </div>

          {/* Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 uppercase tracking-wider text-[10px] text-slate-500 border-b border-slate-850">
                  <tr>
                    <th className="px-6 py-3">Dispute ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Order info</th>
                    <th className="px-6 py-3">Issue Category</th>
                    <th className="px-6 py-3">AI Risk Score</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredClaims.map((c) => (
                    <tr key={c.claim_id} className="hover:bg-slate-850/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-white">#{c.claim_id}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-white">{c.customer_name}</span>
                          <span className="text-[10px] text-slate-500">{c.customer_phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col font-mono text-[11px]">
                          <span>{c.order_number}</span>
                          <span className="text-slate-400">₹{c.refund_amount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300 font-medium">{c.issue_category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          c.ai_fraud_score > 60 ? 'bg-red-500/10 text-red-400' :
                          c.ai_fraud_score > 30 ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {c.ai_fraud_score}% Risk
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${
                          c.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                          c.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                          c.status === 'analyzing' ? 'bg-blue-500/10 text-blue-400 animate-pulse' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => selectDispute(c.claim_id)}
                          className="bg-slate-800 hover:bg-slate-750 text-white px-3 py-1.5 rounded-xl font-medium"
                        >
                          Review Case
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredClaims.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-slate-500">No disputes match your filtering criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Dispute Detail Split-Screen review */}
      {selectedDisputeId && activeClaim && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-900 border border-slate-800 px-6 py-4 rounded-3xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedDisputeId(null)}
                className="text-xs text-slate-400 hover:text-slate-200 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-850"
              >
                ✕ Exit Case
              </button>
              <h3 className="text-sm font-bold text-white">Reviewing Dispute #{activeClaim.claim_id}</h3>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              activeClaim.ai_fraud_score > 60 ? 'bg-red-500/15 text-red-400 border border-red-500/20' :
              activeClaim.ai_fraud_score > 30 ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20' :
              'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
            }`}>
              AI Fraud Score: {activeClaim.ai_fraud_score}%
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Split Screen evidence comparator */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left panel: packing video */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Video className="h-4 w-4 text-blue-400" />
                    <span>{t.restaurantPackingVideo}</span>
                  </h4>

                  {linkedVideo ? (
                    <div className="aspect-video w-full rounded-2xl bg-slate-950 border border-slate-850 flex flex-col justify-between p-4 relative overflow-hidden">
                      <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-0.5 rounded text-[8px] font-mono text-slate-400">
                        {linkedVideo.duration}s clip
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center text-4xl select-none">
                        🍔
                      </div>

                      <div className="space-y-1 z-10">
                        <span className="text-[10px] text-slate-500 block">Surveillance Location GPS</span>
                        <span className="font-mono text-xs font-bold text-slate-300 block">{linkedVideo.gps_location}</span>
                        <span className="text-[9px] text-slate-500 font-mono block">STAFF ID: {linkedVideo.staff_id}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video w-full rounded-2xl bg-slate-950 border border-slate-850 flex flex-col justify-center items-center text-center p-6 text-slate-500">
                      <ShieldAlert className="h-8 w-8 text-amber-500/60 mb-2" />
                      <p className="text-xs font-bold text-slate-400">Verification Code Not Linked</p>
                      <p className="text-[10px] text-slate-500 mt-1 max-w-[200px]">The customer did not input the restaurant code, making side-by-side surveillance analysis unavailable.</p>
                    </div>
                  )}

                  {linkedVideo && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs text-left space-y-1.5">
                      <span className="text-[9px] font-bold text-slate-500 uppercase">Video metadata logs</span>
                      <div className="text-[10px] space-y-1 font-mono text-slate-400">
                        <div>Tape seal: <span className="text-emerald-400 font-bold">{linkedVideo.ai_analysis.packaging_integrity}</span></div>
                        <div>Visual Quality Score: <span className="text-emerald-400 font-bold">{linkedVideo.quality_score}%</span></div>
                        <div>Identified particles: <span className="text-slate-300">{linkedVideo.ai_analysis.foreign_particles_detected.length || 'None detected'}</span></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right panel: customer evidence photos */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-purple-400" />
                    <span>{t.customerEvidencePhotos}</span>
                  </h4>

                  {/* Carousel image canvas */}
                  <div className="aspect-video w-full rounded-2xl bg-slate-950 border border-slate-850 overflow-hidden relative">
                    <img
                      src={activeClaim.evidence[activePhotoIdx]?.file_url}
                      alt="Customer evidence"
                      style={{
                        transform: `scale(${zoomLevel})`,
                        filter: `brightness(${brightnessLevel}%) contrast(${contrastLevel}%)`
                      }}
                      className="h-full w-full object-contain transition-all"
                    />

                    {/* Forensic zoom controller */}
                    <div className="absolute bottom-2 right-2 bg-slate-900/80 px-2 py-1 rounded-lg flex items-center gap-2">
                      <ZoomIn className="h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={zoomLevel}
                        onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                        className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Thumbnail selection list */}
                  <div className="flex gap-2 justify-center">
                    {activeClaim.evidence.map((ev, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setActivePhotoIdx(idx); setZoomLevel(1); }}
                        className={`h-11 w-11 rounded-lg overflow-hidden border transition-all ${
                          activePhotoIdx === idx ? 'border-purple-500 scale-105 shadow' : 'border-slate-800 opacity-60'
                        }`}
                      >
                        <img src={ev.file_url} alt="thumb" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Image Forensic filter sliders */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2.5 text-xs text-left">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Evidence Forensic Filters</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Brightness:</span>
                          <span className="font-mono">{brightnessLevel}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={brightnessLevel}
                          onChange={(e) => setBrightnessLevel(parseInt(e.target.value))}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Contrast:</span>
                          <span className="font-mono">{contrastLevel}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={contrastLevel}
                          onChange={(e) => setContrastLevel(parseInt(e.target.value))}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* AI forensic analysis details logs */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.forensicReport}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1">
                    <span className="text-slate-500 block uppercase tracking-wider text-[9px]">AI Image Forensic Scanner</span>
                    <p className={`font-bold ${activeClaim.evidence[activePhotoIdx]?.ai_generated_score > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {activeClaim.evidence[activePhotoIdx]?.ai_generated_score > 50 
                        ? `⚠️ AI-Generated (CLIP Score: ${activeClaim.evidence[activePhotoIdx]?.ai_generated_score}%)`
                        : `✅ Authentic (AI score: ${activeClaim.evidence[activePhotoIdx]?.ai_generated_score}%)`
                      }
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1">
                    <span className="text-slate-500 block uppercase tracking-wider text-[9px]">EXIF & Metadata integrity</span>
                    <p className="font-bold text-emerald-400">
                      ✅ Timestamp consistency verified (EXIF Match)
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1">
                    <span className="text-slate-500 block uppercase tracking-wider text-[9px]">Visual Comparison Logic</span>
                    <p className="font-bold text-slate-300">
                      {linkedVideo ? '⚠️ Discrepancy present (Hair found in photo not present in video)' : 'Inconclusive (No video link)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decision and communication templates right panel */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span>Decision & Communication Editor</span>
                </h4>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Quick-response template</label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                    className="w-full h-10 bg-slate-950 border border-slate-850 rounded-xl px-3 text-xs text-white outline-none"
                  >
                    <option value="approve_particle">Approve: Foreign Contamination</option>
                    <option value="approve_leak">Approve: Leakage/Spilling</option>
                    <option value="reject_ai">Reject: AI Image Detected</option>
                    <option value="reject_mismatch">Reject: Discrepancy Mismatch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Email Body Notice (Customizable)</label>
                  <textarea
                    rows={6}
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-300 font-medium outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Internal Reviewer Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Enter confidential notes regarding this decision..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-300 font-medium outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => handleResolve('approved')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-10 text-xs rounded-xl flex items-center justify-center gap-1 shadow-md shadow-emerald-500/10"
                  >
                    <Check className="h-4 w-4" />
                    <span>Approve Refund</span>
                  </button>

                  <button
                    onClick={() => handleResolve('rejected')}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold h-10 text-xs rounded-xl flex items-center justify-center gap-1 shadow-md shadow-red-500/10"
                  >
                    <X className="h-4 w-4" />
                    <span>Reject Dispute</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 3. Analytics Tab */}
      {adminTab === 'analytics' && (
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t.analyticsOverview}</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Daily Disputes line chart */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Daily Disputes Volume & Fraud Flags</h4>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyDisputesVolume} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                    <Legend />
                    <Line type="monotone" dataKey="Volume" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Total Claims filed" />
                    <Line type="monotone" dataKey="Fraud" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} name="AI-Flagged Frauds" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Audit log trail */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Real-Time Platform Security Audits</h4>
                
                <div className="space-y-3.5 max-h-60 overflow-y-auto">
                  {auditLogs.map((log) => (
                    <div key={log.log_id} className="flex gap-3 text-xs text-left border-l border-slate-800 pl-3 py-1">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white">{log.action}</span>
                          <span className="text-[10px] text-slate-500 font-mono">#{log.log_id}</span>
                        </div>
                        <p className="text-slate-400 leading-snug">{log.details}</p>
                        <span className="text-[10px] text-slate-500 block font-mono">{new Date(log.timestamp).toLocaleTimeString()} • Operator: {log.admin_name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. Users Tab */}
      {adminTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Demo Customer Accounts Registry</h3>
            
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={currentUser.profile_image} className="h-12 w-12 rounded-full border border-slate-700 bg-slate-900" alt="Rahul" />
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white">{currentUser.full_name}</h4>
                  <p className="text-xs text-slate-400">{currentUser.phone} • {currentUser.email}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">
                    STATUS: <span className={`font-bold ${currentUser.account_status === 'suspended' ? 'text-red-400' : 'text-yellow-400'}`}>{currentUser.account_status.toUpperCase()}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs mr-3">
                  <span className="text-slate-500 block">Fraud flags count</span>
                  <span className="font-bold font-mono text-white text-lg">{currentUser.fraud_flag_count} / 2 Flags</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => triggerSystemWarning(1)}
                    className="bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-yellow-400 border border-slate-800 px-3.5 py-2 rounded-xl"
                  >
                    Set 1 Warning
                  </button>

                  <button
                    onClick={() => triggerSystemWarning(2)}
                    className="bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-400 border border-red-500/20 px-3.5 py-2 rounded-xl"
                  >
                    Lock & Suspend
                  </button>

                  <button
                    onClick={() => triggerSystemWarning(0)}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-semibold text-emerald-400 border border-emerald-500/20 px-3.5 py-2 rounded-xl"
                  >
                    Reset Active
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Settings Tab */}
      {adminTab === 'settings' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="h-5 w-5 text-red-500" />
            <span>AI Forensic Verification Thresholds</span>
          </h3>

          <div className="space-y-4">
            
            <div className="space-y-2 border-b border-slate-850 pb-4 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-white">AI-Generated Auto-Rejection Threshold</span>
                <span className="font-mono text-red-400">{settings.autoRejectionThreshold}% Likelihood</span>
              </div>
              <p className="text-[10px] text-slate-500">Refund disputes are instantly declined if any evidence photo exceeds this CLIP generative likelihood.</p>
              <input
                type="range"
                min="50"
                max="90"
                value={settings.autoRejectionThreshold}
                onChange={(e) => updateSettings({ autoRejectionThreshold: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between border-b border-slate-850 pb-4 text-xs">
              <div>
                <p className="font-bold text-white">Immutable Ledger Log (SHA-256 Hashing)</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Encrypts package entries onto simulated serverless blockchain.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.blockchainEnabled}
                onChange={(e) => updateSettings({ blockchainEnabled: e.target.checked })}
                className="h-5 w-5 rounded text-red-600 focus:ring-red-500 bg-slate-950 border-slate-800"
              />
            </div>

            <div className="flex items-center justify-between border-b border-slate-850 pb-4 text-xs">
              <div>
                <p className="font-bold text-white">Strict Verification Code Enforcement</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Rejects claims if the customer does not provide a valid code.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.verificationCodeRequired}
                onChange={(e) => updateSettings({ verificationCodeRequired: e.target.checked })}
                className="h-5 w-5 rounded text-red-600 focus:ring-red-500 bg-slate-950 border-slate-800"
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
