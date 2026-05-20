import React, { useState, useRef, useEffect } from 'react';
import { useGlobalState, type VideoRecord } from '../../context/GlobalStateContext';
import { translations } from '../../locales/locales';
import { 
  Key, 
  Smartphone, 
  Video, 
  AlertTriangle, 
  CheckCircle, 
  Camera, 
  Copy, 
  Check, 
  Trash, 
  FileText, 
  ShieldCheck, 
  Settings, 
  Play, 
  Pause,
  Award,
  Store
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export const RestaurantPortal: React.FC = () => {
  const { 
    language, 
    restaurants, 
    orders, 
    videos, 
    addVideo 
  } = useGlobalState();
  const t = translations[language];

  // Auth States
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [authStep, setAuthStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [, setUseBiometrics] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({ id: 'STF-02', name: 'Ramesh Kumar' });

  // Navigation States
  const [activeTab, setActiveTab] = useState<'dashboard' | 'record' | 'videos' | 'analytics' | 'settings'>('dashboard');

  // Recording Flow States
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingLogs, setRecordingLogs] = useState<string[]>([]);
  const [aiFlags, setAiFlags] = useState<{ type: string; confidence: number; detail: string }[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Video Playback Modal
  const [activeVideoModal, setActiveVideoModal] = useState<VideoRecord | null>(null);

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  const activeOrderObj = orders.find(o => o.order_id === selectedOrder);

  // Audio synthesis helper
  const playBeep = (freq = 880, type = 'sine', duration = 0.2) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type as OscillatorType;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio blocked', e);
    }
  };

  // Mock OTP Generation
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setAuthStep('otp');
    playBeep(600, 'sine', 0.1);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setAuthStep('success');
    playBeep(980, 'sine', 0.2);
  };

  const handleBiometricLogin = () => {
    setUseBiometrics(true);
    setAuthStep('success');
    playBeep(980, 'sine', 0.2);
  };

  // Camera permissions and recording setup
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn('Webcam not allowed or unavailable. Enabling simulated camera fallback.');
      setStream(null);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Recording Timer and AI simulation loop
  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds(prev => {
          const next = prev + 1;
          // Trigger mock warnings at specific intervals
          if (next === 6) {
            triggerAiWarning('seal');
          } else if (next === 15) {
            triggerAiWarning('hair');
          }
          return next;
        });
      }, 1000);

      // Start custom canvas visual loop
      let angle = 0;
      const drawFrame = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const w = canvas.width;
            const h = canvas.height;

            if (videoRef.current && stream) {
              // Draw webcam
              ctx.drawImage(videoRef.current, 0, 0, w, h);
            } else {
              // Fallback: draw animated conveyor packing box simulation
              ctx.fillStyle = '#0f172a';
              ctx.fillRect(0, 0, w, h);

              // Grid Background
              ctx.strokeStyle = '#1e293b';
              ctx.lineWidth = 1;
              for (let i = 0; i < w; i += 30) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
              }
              for (let j = 0; j < h; j += 30) {
                ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
              }

              // Packing Box
              ctx.fillStyle = '#b45309';
              const boxSize = 140;
              const boxX = (w - boxSize) / 2;
              const boxY = (h - boxSize) / 2 + Math.sin(angle) * 10;
              ctx.fillRect(boxX, boxY, boxSize, boxSize);
              ctx.strokeStyle = '#f59e0b';
              ctx.lineWidth = 3;
              ctx.strokeRect(boxX, boxY, boxSize, boxSize);

              // Food inside
              ctx.fillStyle = '#10b981';
              ctx.beginPath();
              ctx.arc(w / 2, boxY + boxSize / 2, 35, 0, Math.PI * 2);
              ctx.fill();

              // Packing tape
              ctx.fillStyle = '#3b82f6';
              ctx.fillRect(boxX + 20, boxY + boxSize / 2 - 10, boxSize - 40, 20);

              // Scanning laser line
              const laserY = (h / 2) + Math.sin(angle * 2) * (h / 2.5);
              ctx.strokeStyle = '#ef4444';
              ctx.shadowColor = '#ef4444';
              ctx.shadowBlur = 10;
              ctx.lineWidth = 4;
              ctx.beginPath();
              ctx.moveTo(10, laserY);
              ctx.lineTo(w - 10, laserY);
              ctx.stroke();
              ctx.shadowBlur = 0; // Reset

              angle += 0.03;
            }

            // Draw overlay watermarks
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0, 0, w, 40);
            ctx.fillRect(0, h - 50, w, 50);

            // Watermark text
            ctx.fillStyle = '#f1f5f9';
            ctx.font = "bold 13px 'JetBrains Mono', monospace";
            ctx.fillText(`ORDER: ${activeOrderObj?.order_number || 'BC-9921'}`, 15, 25);
            ctx.fillText(`STAFF: ${selectedStaff.id} - ${selectedStaff.name}`, 15, h - 30);
            ctx.fillText(`LOC: 19.0760 N, 72.8777 E`, 15, h - 15);

            // Live Time
            const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
            ctx.fillText(dateStr, w - 180, 25);

            // Rec status indicator
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(w - 120, h - 25, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#f1f5f9';
            ctx.fillText("REC LIVE", w - 100, h - 21);
          }
        }
        animationRef.current = requestAnimationFrame(drawFrame);
      };
      drawFrame();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRecording, selectedOrder, selectedStaff, stream]);

  const triggerAiWarning = (type: 'seal' | 'hair') => {
    playBeep(440, 'triangle', 0.5);
    setTimeout(() => playBeep(440, 'triangle', 0.5), 150);

    if (type === 'seal') {
      setAiFlags(prev => [...prev, {
        type: 'seal',
        confidence: 99,
        detail: '⚠️ Warning: Container seal integrity compromised. Lid unsealed.'
      }]);
      setRecordingLogs(prev => [...prev, '[AI Alert] 06s: Lid seal warning flagged. Confidence: 99%.']);
    } else {
      setAiFlags(prev => [...prev, {
        type: 'hair',
        confidence: 98,
        detail: '⚠️ Foreign Particle Alert: Black hair strand detected in area D3.'
      }]);
      setRecordingLogs(prev => [...prev, '[AI Alert] 15s: Hair particle detected. Confidence: 98%.']);
    }
  };

  const handleStartRecording = () => {
    if (!selectedOrder) {
      alert("Please select an Order to pack first.");
      return;
    }
    setAiFlags([]);
    setRecordingSeconds(0);
    setRecordedVideoUrl(null);
    setGeneratedCode(null);
    setIsRecording(true);
    setRecordingLogs([`[System] Recording initialized for Order #${activeOrderObj?.order_number}`]);
    startCamera();
    playBeep(1200, 'sine', 0.15);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopCamera();
    setRecordedVideoUrl('simulated_video.mp4');
    setRecordingLogs(prev => [...prev, `[System] Recording finalized. Length: ${recordingSeconds} seconds.`]);
    playBeep(800, 'sine', 0.2);
  };

  const handleDiscard = () => {
    setAiFlags([]);
    setRecordingSeconds(0);
    setRecordedVideoUrl(null);
    setGeneratedCode(null);
    playBeep(300, 'sine', 0.3);
  };

  const handleApproveSeal = () => {
    const timestampStr = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
    const randomHash = Math.random().toString(36).substring(2, 6).toUpperCase();
    const restaurantId = restaurants[0]?.restaurant_id || 'REST-739';
    const newCode = `VER-${restaurantId}-${timestampStr}-${randomHash}`;

    setGeneratedCode(newCode);
    playBeep(1000, 'sine', 0.35);

    // Save to global context
    const hasHair = aiFlags.some(f => f.type === 'hair');
    const hasSeal = aiFlags.some(f => f.type === 'seal');

    const newVideo: VideoRecord = {
      video_id: `VID-${Math.floor(1000 + Math.random() * 9000)}`,
      restaurant_id: restaurantId,
      order_id: selectedOrder,
      order_number: activeOrderObj?.order_number || 'BC-0000',
      verification_code: newCode,
      video_url: 'simulated_packaging_clip.mp4',
      thumbnail_url: activeOrderObj?.items_json[0]?.name.includes('Burger') ? '🍔' : '🍣',
      staff_id: selectedStaff.id,
      staff_name: selectedStaff.name,
      duration: recordingSeconds || 24,
      recording_timestamp: new Date().toISOString(),
      ai_analysis: {
        food_quality_score: hasHair ? 68 : hasSeal ? 82 : 96,
        color_rating: 'Golden Brown & Crispy',
        foreign_particles_detected: hasHair ? [{ type: 'Hair', confidence: 98, location: 'Bottom right side' }] : [],
        packaging_integrity: hasSeal ? 'Damaged Corner Seal' : 'Secure Double Tape Seal',
        recommendations: hasHair ? ['Re-prepare item immediately', 'Sanitize packing area'] : ['Ensure heat pack storage']
      },
      quality_score: hasHair ? 68 : hasSeal ? 82 : 96,
      gps_location: '19.0760° N, 72.8777° E'
    };

    addVideo(newVideo);
  };

  const copyToClipboard = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopySuccess(true);
    playBeep(900, 'sine', 0.08);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Mock analytics aggregates
  const recentVideoRecords = videos.filter(v => v.restaurant_id === restaurants[0]?.restaurant_id);
  const totalPacks = recentVideoRecords.length;
  const issuesCount = recentVideoRecords.filter(v => v.quality_score < 85).length;
  const avgQualityScore = Math.round(recentVideoRecords.reduce((acc, v) => acc + v.quality_score, 0) / (totalPacks || 1));

  // Analytics Chart Data
  const qualityTrendData = [
    { day: 'Mon', score: 92 },
    { day: 'Tue', score: 94 },
    { day: 'Wed', score: 89 },
    { day: 'Thu', score: 95 },
    { day: 'Fri', score: 91 },
    { day: 'Sat', score: 96 },
    { day: 'Sun', score: avgQualityScore || 94 }
  ];

  const contaminationData = [
    { name: 'Hair Particle', value: 35, color: '#f59e0b' },
    { name: 'Unsealed Lid', value: 45, color: '#3b82f6' },
    { name: 'Visual Freshness', value: 15, color: '#10b981' },
    { name: 'Foreign Box Particle', value: 5, color: '#ef4444' }
  ];

  const staffPerformance = [
    { name: 'Ramesh K.', packed: 14, warnings: 1 },
    { name: 'Mei Ling', packed: 18, warnings: 0 },
    { name: 'Amit Shah', packed: 9, warnings: 3 }
  ];

  // Auth Screen Render
  if (authStep !== 'success') {
    return (
      <div className="flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-3">
              <Store className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">{t.restaurantTitle}</h2>
            <p className="text-xs text-slate-400 mt-1">{t.restaurantSubtitle}</p>
          </div>

          {authStep === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  {t.phoneLogin}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500 text-sm font-mono">+91</span>
                  <input
                    type="tel"
                    required
                    placeholder="99999 99999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                    className="w-full h-11 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-12 pr-4 text-sm font-mono text-white outline-none"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={phone.length < 10}
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-medium rounded-xl text-sm transition-all"
              >
                Send Verification Code
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-850"></div>
                <span className="flex-shrink mx-4 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Or Authenticate Via</span>
                <div className="flex-grow border-t border-slate-850"></div>
              </div>

              <button
                type="button"
                onClick={handleBiometricLogin}
                className="w-full h-11 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-300 font-medium rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <Smartphone className="h-4 w-4 text-indigo-400" />
                <span>Quick Biometric Access</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  {t.enterOtp}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500"><Key className="h-4 w-4" /></span>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full h-11 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-4 text-sm font-mono text-center tracking-widest text-white outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">Demo OTP: Enter any 6 digits</p>
              </div>

              <button
                type="submit"
                disabled={otp.length < 6}
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-medium rounded-xl text-sm transition-all"
              >
                Confirm and Login
              </button>

              <button
                type="button"
                onClick={() => setAuthStep('phone')}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-200 mt-2 underline"
              >
                Change Phone Number
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Dashboard / Operations Screen Render
  return (
    <div className="space-y-8">
      {/* Upper Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-900 pb-3">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all ${
            activeTab === 'dashboard' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview Dashboard
        </button>
        <button
          onClick={() => {
            setActiveTab('record');
            startCamera();
          }}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl flex items-center gap-1.5 transition-all ${
            activeTab === 'record' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Video className="h-4 w-4" />
          <span>New Packing Record</span>
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all ${
            activeTab === 'videos' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Packing Logs ({totalPacks})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all ${
            activeTab === 'analytics' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Quality Metrics
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all ${
            activeTab === 'settings' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Settings
        </button>
      </div>

      {/* 1. Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* KPI Dashboard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-blue-500/5 rounded-full blur-2xl"></div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t.totalPacked}</p>
              <h3 className="text-4xl font-extrabold text-white mt-2">{totalPacks}</h3>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-400" />
                <span>100% of order catalog verified</span>
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-amber-500/5 rounded-full blur-2xl"></div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t.issuesFlagged}</p>
              <h3 className="text-4xl font-extrabold text-amber-500 mt-2">{issuesCount}</h3>
              <p className="text-xs text-slate-500 mt-2">Kitchen staff corrected all items before sealing</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-green-500/5 rounded-full blur-2xl"></div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t.averageQuality}</p>
              <h3 className="text-4xl font-extrabold text-emerald-400 mt-2">{avgQualityScore}%</h3>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-yellow-400" />
                <span>Tier-1 rating (Excellent Freshness)</span>
              </p>
            </div>
            
          </div>

          {/* Quick Setup Warning */}
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Need to record a package?</h4>
              <p className="text-xs text-slate-400">Select order and film the food box sealing procedure to write verification hash.</p>
            </div>
            <button
              onClick={() => {
                setActiveTab('record');
                startCamera();
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1 shadow-md shadow-blue-500/20"
            >
              <Video className="h-3.5 w-3.5" />
              <span>Record New Box</span>
            </button>
          </div>

          {/* Recent Videos table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-850 flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{t.recentVideos}</h4>
              <span className="text-[10px] bg-slate-850 px-2 py-0.5 rounded text-slate-400 font-mono">STAFF ASSIGNED: {selectedStaff.name}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 uppercase tracking-wider text-[10px] text-slate-500 border-b border-slate-850">
                  <tr>
                    <th className="px-6 py-3">Order Number</th>
                    <th className="px-6 py-3">Verification Code</th>
                    <th className="px-6 py-3">Quality Score</th>
                    <th className="px-6 py-3">Recording Time</th>
                    <th className="px-6 py-3">Duration</th>
                    <th className="px-6 py-3 text-right">View Pack</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {recentVideoRecords.map((v) => (
                    <tr key={v.video_id} className="hover:bg-slate-850/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-white flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>{v.order_number}</span>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-400">{v.verification_code}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.quality_score >= 90 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {v.quality_score}% Quality
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{new Date(v.recording_timestamp).toLocaleTimeString()}</td>
                      <td className="px-6 py-4 font-mono">{v.duration}s</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setActiveVideoModal(v)}
                          className="bg-slate-800 hover:bg-slate-750 text-white px-2.5 py-1 rounded text-[10px] font-medium"
                        >
                          Review Playback
                        </button>
                      </td>
                    </tr>
                  ))}
                  {recentVideoRecords.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500">No packaging records generated yet today.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Recording Screen Tab */}
      {activeTab === 'record' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls and Selections left panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-blue-500" />
                <span>1. Select Order & Staff</span>
              </h3>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Select Order to Pack</label>
                <select
                  value={selectedOrder}
                  onChange={(e) => {
                    setSelectedOrder(e.target.value);
                    handleDiscard();
                  }}
                  className="w-full h-10 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs text-white focus:border-blue-500 outline-none"
                >
                  <option value="">-- Choose Order ID --</option>
                  {orders.map(o => (
                    <option key={o.order_id} value={o.order_id}>
                      {o.restaurant_name} - {o.order_number} (₹{o.amount})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Kitchen Staff Member</label>
                <select
                  value={selectedStaff.id}
                  onChange={(e) => {
                    const id = e.target.value;
                    const name = id === 'STF-02' ? 'Ramesh Kumar' : id === 'STF-18' ? 'Mei Ling' : 'Amit Shah';
                    setSelectedStaff({ id, name });
                  }}
                  className="w-full h-10 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs text-white focus:border-blue-500 outline-none"
                >
                  <option value="STF-02">STF-02 - Ramesh Kumar (Chef)</option>
                  <option value="STF-18">STF-18 - Mei Ling (Sous Chef)</option>
                  <option value="STF-09">STF-09 - Amit Shah (Line Cook)</option>
                </select>
              </div>

              {activeOrderObj && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Order Contents</span>
                  <div className="space-y-1">
                    {activeOrderObj.items_json.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-slate-300">{item.quantity}x {item.name}</span>
                        <span className="font-mono text-slate-400">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Instruction Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Recording Guidelines</span>
              </h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
                <li>Film the container from all sides (top, side, sealing tape).</li>
                <li>Hold packing items close to camera for visual freshness verification.</li>
                <li>Wait for the AI green checkmark before finalizing the tape seal.</li>
                <li>Avoid obstruction of watermarks or staff name.</li>
              </ul>
            </div>
            
          </div>

          {/* Recording Canvas central right panel */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Camera className="h-4 w-4 text-blue-500" />
              <span>2. Camera Interface & AI Scanner Overlay</span>
            </h3>

            {/* Hidden video element for webcam streaming */}
            <video ref={videoRef} autoPlay playsInline muted className="hidden" />

            {/* Interactive Canvas Rendering stream/fallback */}
            <div className="relative aspect-video w-full rounded-2xl border border-slate-850 overflow-hidden bg-slate-950">
              <canvas ref={canvasRef} width={640} height={360} className="w-full h-full object-cover" />
              
              {/* Scan overlays & UI warnings */}
              {!isRecording && !recordedVideoUrl && (
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-slate-950/80 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center animate-bounce">
                    <Video className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Camera Interface Idle</p>
                    <p className="text-xs text-slate-400 max-w-sm">Select an order on the left, then click Start Recording to begin packing surveillance.</p>
                  </div>
                  <button
                    onClick={handleStartRecording}
                    className="bg-blue-600 hover:bg-blue-500 text-xs font-bold px-4 py-2 rounded-xl text-white shadow-lg shadow-blue-600/15"
                  >
                    Start Capture
                  </button>
                </div>
              )}

              {/* Live Timer Counter */}
              {isRecording && (
                <div className="absolute top-4 left-4 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-xl text-xs font-mono font-bold text-red-500 animate-pulse flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  <span>{recordingSeconds}s / 120s</span>
                </div>
              )}

              {/* Dynamic Alerts during recording */}
              {isRecording && aiFlags.length > 0 && (
                <div className="absolute bottom-16 left-4 right-4 bg-red-950/90 border border-red-500 rounded-xl p-3 flex items-start gap-2.5 animate-pulse">
                  <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-red-300">AI Warning Flagged</p>
                    <p className="text-red-400 font-medium mt-0.5">{aiFlags[aiFlags.length - 1].detail}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">Confidence Level: {aiFlags[aiFlags.length - 1].confidence}%</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Panel controls and outputs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-850 pt-4">
              
              <div className="flex items-center gap-3">
                {isRecording ? (
                  <button
                    onClick={handleStopRecording}
                    className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/10"
                  >
                    <Pause className="h-4 w-4" />
                    <span>Stop Recording</span>
                  </button>
                ) : (
                  recordedVideoUrl && !generatedCode && (
                    <button
                      onClick={handleApproveSeal}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-500/10"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>{t.confirmSeal}</span>
                    </button>
                  )
                )}

                {recordedVideoUrl && (
                  <button
                    onClick={handleDiscard}
                    className="bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5"
                  >
                    <Trash className="h-4 w-4 text-slate-400" />
                    <span>{t.reRecord}</span>
                  </button>
                )}
              </div>

              {/* Show Code and QR Output after approving */}
              {generatedCode && (
                <div className="w-full bg-slate-950 border border-slate-850 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
                  <div className="flex items-center gap-3">
                    {/* SVG generated QR Code representing verification token */}
                    <div className="bg-white p-1 rounded-lg">
                      <svg width="48" height="48" viewBox="0 0 29 29" className="text-slate-900">
                        {/* Mock QR SVG layout */}
                        <path d="M0 0h9v9H0zm1 1v7h7V1zm19 0h9v9h-9zm1 1v7h7V1zM0 20h9v9H0zm1 1v7h7v-7zm19 0h9v9h-9zm1 1v7h7v-7zm-7-9h6v3h-3v3h-3zm-3 3h3v3h-3zm6 3h3v3h-3zm-6-9h3v3h-3z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="text-left space-y-1">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{t.verificationCode}</p>
                      <p className="font-mono text-xs font-bold text-blue-400 select-all">{generatedCode}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={copyToClipboard}
                    className="bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 p-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                  >
                    {copySuccess ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    <span>{copySuccess ? t.copied : t.copy}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Diagnostic system logs on recording */}
            {isRecording && (
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1 font-mono text-[10px] text-slate-400 select-none">
                <span className="font-bold text-slate-500 uppercase">Surveillance Audit Logs</span>
                <div className="max-h-24 overflow-y-auto space-y-0.5">
                  {recordingLogs.map((log, index) => (
                    <div key={index} className={log.includes('Alert') ? 'text-red-400 font-semibold' : 'text-slate-500'}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Videos List Tab */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t.recentVideos}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVideoRecords.map(v => (
              <div key={v.video_id} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col hover-lift">
                
                {/* Thumb aspect ratio */}
                <div className="aspect-video w-full bg-slate-950 flex items-center justify-center text-4xl border-b border-slate-850 relative">
                  <span>{v.thumbnail_url}</span>
                  <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-0.5 rounded text-[9px] font-mono text-slate-400">
                    {v.duration}s
                  </div>
                  <div className="absolute bottom-2 left-2 bg-slate-900/85 px-2 py-0.5 rounded text-[9px] font-mono text-slate-300">
                    Score: {v.quality_score}%
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-white">Order {v.order_number}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{new Date(v.recording_timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono select-all">Code: {v.verification_code}</p>
                    <p className="text-xs text-slate-500">Packed by: Chef {v.staff_name}</p>
                  </div>

                  <button
                    onClick={() => setActiveVideoModal(v)}
                    className="w-full h-9 bg-slate-950 hover:bg-slate-850 text-xs font-semibold text-slate-200 border border-slate-800 rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Play className="h-3.5 w-3.5 text-slate-400" />
                    <span>Watch Recording</span>
                  </button>
                </div>
              </div>
            ))}
            {recentVideoRecords.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-500">
                No video packages saved. Go to "New Packing Record" to generate one.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t.metricsTitle}</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Daily Quality Score trend line chart */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Daily Quality Score Trend</h4>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={qualityTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                    <YAxis domain={[70, 100]} stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} labelStyle={{ color: '#fff' }} />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Contamination Pie Chart */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Common Contaminants Distribution</h4>
              <div className="h-72 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="h-full w-full sm:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={contaminationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {contaminationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 space-y-3">
                  {contaminationData.map((c, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color }}></span>
                        <span className="text-slate-300 font-medium">{c.name}</span>
                      </div>
                      <span className="font-mono text-slate-400">{c.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Staff Performance Bar Chart */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Kitchen Staff Box Sealing Performance</h4>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={staffPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                    <Bar dataKey="packed" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Orders Packed" />
                    <Bar dataKey="warnings" fill="#ef4444" radius={[4, 4, 0, 0]} name="Quality Alerts" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* 5. Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Settings className="h-5 w-5 text-blue-500" />
            <span>Kitchen Portal Settings & Adjustments</span>
          </h3>

          <div className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <div>
                <p className="text-sm font-bold text-white">AI Detection Sensitivity</p>
                <p className="text-xs text-slate-400 mt-0.5">Define warning trigger threshold for foreign particles.</p>
              </div>
              <select className="bg-slate-950 border border-slate-800 rounded-xl h-10 px-3 text-xs text-white focus:border-blue-500 outline-none">
                <option value="90">High (90% trigger confidence)</option>
                <option value="80">Balanced (80% trigger confidence)</option>
                <option value="50">Strict (50% trigger confidence - verbose)</option>
              </select>
            </div>

            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <div>
                <p className="text-sm font-bold text-white">Video Resolution</p>
                <p className="text-xs text-slate-400 mt-0.5">Default video quality stream capture.</p>
              </div>
              <span className="font-mono text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                1080p (Full HD - 1920x1080)
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <div>
                <p className="text-sm font-bold text-white">Auto-Upload to Cloud Archive</p>
                <p className="text-xs text-slate-400 mt-0.5">Encrypts with AES-256 and pushes to secure bucket instantly.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 bg-slate-950 border-slate-800" />
            </div>

          </div>
        </div>
      )}

      {/* Video Modal Playback Detail */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-6 shadow-2xl relative space-y-4">
            
            <div className="flex justify-between items-center border-b border-slate-850 pb-2">
              <h4 className="text-sm font-bold text-white">Surveillance Playback: #{activeVideoModal.order_number}</h4>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl bg-slate-950 border border-slate-850 flex items-center justify-center text-5xl relative overflow-hidden">
              <span className="animate-pulse">{activeVideoModal.thumbnail_url}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent flex flex-col justify-end p-4 text-left">
                <span className="text-xs font-bold text-white">Video Code Token</span>
                <span className="text-[10px] font-mono text-blue-400 mt-0.5">{activeVideoModal.verification_code}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-left space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Inspection Audit Data</span>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Food Quality Index:</span>
                  <span className="font-bold text-slate-300">{activeVideoModal.ai_analysis.food_quality_score}% fresh</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Packaging Integrity:</span>
                  <span className="font-bold text-slate-300">{activeVideoModal.ai_analysis.packaging_integrity}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Identified Impurities:</span>
                  <span className="font-bold text-red-400">
                    {activeVideoModal.ai_analysis.foreign_particles_detected.length > 0 
                      ? activeVideoModal.ai_analysis.foreign_particles_detected.map(p => `${p.type} (${p.confidence}% confidence)`).join(', ')
                      : 'None detected'
                    }
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Surveillance Location:</span>
                  <span className="font-mono text-slate-400">{activeVideoModal.gps_location}</span>
                </div>
              </div>

              {activeVideoModal.ai_analysis.recommendations.length > 0 && (
                <div className="border-t border-slate-850 pt-2 text-[10px]">
                  <span className="text-slate-500 block">Security Directives:</span>
                  <span className="text-yellow-500 italic">{activeVideoModal.ai_analysis.recommendations.join(', ')}</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
