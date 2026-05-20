import React, { useState } from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import { translations } from '../../locales/locales';
import { 
  ChevronRight, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Trash2, 
  Image as ImageIcon,
  Check,
  ChevronLeft,
  Sparkles,
  Lock,
  Plus
} from 'lucide-react';


export const CustomerPortal: React.FC = () => {
  const { 
    language, 
    orders, 
    claims, 
    videos, 
    addClaim, 
    submitAppeal, 
    currentUser,
    appeals
  } = useGlobalState();
  const t = translations[language];

  // UI Flow States
  const [claimWizardOpen, setClaimWizardOpen] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  
  // Wizard Form States
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [description, setDescription] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [appealReason, setAppealReason] = useState('');
  const [appealSubmittedLocal, setAppealSubmittedLocal] = useState(false);

  // Evidence States (4 slots)
  const [evidenceFiles, setEvidenceFiles] = useState<Record<string, {
    fileUrl: string;
    isAiGenerated: boolean;
    aiScore: number;
    tamperingScore: number;
    angle: 'Overhead' | 'Left Side' | 'Right Side' | 'Close-Up';
    status: 'idle' | 'scanning' | 'success' | 'failed';
  }>>({
    'Overhead': { fileUrl: '', isAiGenerated: false, aiScore: 0, tamperingScore: 0, angle: 'Overhead', status: 'idle' },
    'Left Side': { fileUrl: '', isAiGenerated: false, aiScore: 0, tamperingScore: 0, angle: 'Left Side', status: 'idle' },
    'Right Side': { fileUrl: '', isAiGenerated: false, aiScore: 0, tamperingScore: 0, angle: 'Right Side', status: 'idle' },
    'Close-Up': { fileUrl: '', isAiGenerated: false, aiScore: 0, tamperingScore: 0, angle: 'Close-Up', status: 'idle' }
  });

  const activeOrder = orders.find(o => o.order_id === orderId);
  const activeLinkedVideo = videos.find(v => v.verification_code === verificationCode.trim());

  // Suggested keywords based on categories
  const getKeywordsForCategory = (cat: string) => {
    if (cat.includes('Particles')) return ['hair', 'strand', 'nail', 'insect', 'glass', 'unhygienic'];
    if (cat.includes('Undercooked') || cat.includes('Overcooked')) return ['raw', 'undercooked', 'burnt', 'overdone', 'dry', 'tough'];
    if (cat.includes('Packaging')) return ['spilled', 'leak', 'broken', 'torn', 'crushed', 'seal'];
    return ['cold', 'stale', 'wrong item', 'missing item'];
  };

  const handleKeywordClick = (word: string) => {
    setDescription(prev => {
      const space = prev ? ' ' : '';
      if (prev.toLowerCase().includes(word.toLowerCase())) return prev;
      return `${prev}${space}${word}`;
    });
  };

  // Sound cues helper
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

  // Mock upload action simulating AI Scanner (CLIP + XceptionNet)
  const triggerMockUpload = (angle: 'Overhead' | 'Left Side' | 'Right Side' | 'Close-Up', type: 'genuine' | 'ai_generated') => {
    setEvidenceFiles(prev => ({
      ...prev,
      [angle]: { ...prev[angle], status: 'scanning' }
    }));
    playBeep(650, 'sine', 0.1);

    setTimeout(() => {
      if (type === 'ai_generated') {
        playBeep(350, 'triangle', 0.4);
        setEvidenceFiles(prev => ({
          ...prev,
          [angle]: {
            fileUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400', // Weird looking AI burger
            isAiGenerated: true,
            aiScore: 92,
            tamperingScore: 84,
            angle,
            status: 'failed'
          }
        }));
      } else {
        playBeep(950, 'sine', 0.15);
        // Realistic food images depending on angle
        const urls = {
          'Overhead': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
          'Left Side': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400',
          'Right Side': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400',
          'Close-Up': 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=400'
        };

        setEvidenceFiles(prev => ({
          ...prev,
          [angle]: {
            fileUrl: urls[angle],
            isAiGenerated: false,
            aiScore: 3,
            tamperingScore: 1,
            angle,
            status: 'success'
          }
        }));
      }
    }, 1500);
  };

  // Helper to load 4 genuine photos at once for smooth demo
  const loadAllGenuineEvidence = () => {
    playBeep(880, 'sine', 0.1);
    Object.keys(evidenceFiles).forEach((angle) => {
      triggerMockUpload(angle as any, 'genuine');
    });
  };

  // Reset wizard
  const resetWizard = () => {
    setStep(1);
    setOrderId('');
    setIssueCategory('');
    setDescription('');
    setVerificationCode('');
    setEvidenceFiles({
      'Overhead': { fileUrl: '', isAiGenerated: false, aiScore: 0, tamperingScore: 0, angle: 'Overhead', status: 'idle' },
      'Left Side': { fileUrl: '', isAiGenerated: false, aiScore: 0, tamperingScore: 0, angle: 'Left Side', status: 'idle' },
      'Right Side': { fileUrl: '', isAiGenerated: false, aiScore: 0, tamperingScore: 0, angle: 'Right Side', status: 'idle' },
      'Close-Up': { fileUrl: '', isAiGenerated: false, aiScore: 0, tamperingScore: 0, angle: 'Close-Up', status: 'idle' }
    });
  };

  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any file was flagged as AI
    const evidenceList = Object.values(evidenceFiles);
    const hasAiFile = evidenceList.some(f => f.isAiGenerated);
    const hasEmptyFile = evidenceList.some(f => f.status !== 'success');

    if (hasEmptyFile) {
      alert("Please upload and scan all 4 mandatory photo angles successfully before submitting.");
      return;
    }

    const maxAiScore = Math.max(...evidenceList.map(e => e.aiScore));

    const claimData = {
      customer_id: currentUser.user_id,
      customer_name: currentUser.full_name,
      customer_phone: currentUser.phone,
      order_id: orderId,
      order_number: activeOrder?.order_number || 'BC-0000',
      restaurant_id: activeOrder?.restaurant_id || '',
      restaurant_name: activeOrder?.restaurant_name || '',
      issue_category: issueCategory,
      description,
      status: hasAiFile ? 'review' as const : 'analyzing' as const,
      submission_date: new Date().toISOString(),
      ai_fraud_score: hasAiFile ? maxAiScore : 12,
      ai_recommendation: hasAiFile ? 'REJECT' as const : 'APPROVE' as const,
      final_decision: null,
      admin_id: null,
      refund_amount: activeOrder?.amount || 0,
      reason_for_decision: '',
      linked_video_code: verificationCode.trim() || null,
      gps_location: '19.0760° N, 72.8777° E'
    };

    const evidencePayload = evidenceList.map(f => ({
      evidence_type: 'photo' as const,
      file_url: f.fileUrl,
      ai_generated_score: f.aiScore,
      tampering_score: f.tamperingScore,
      angle_label: f.angle,
      blur_score: 5,
      brightness_score: 70,
      uploaded_at: new Date().toISOString()
    }));

    const generatedClaim = addClaim(claimData, evidencePayload);
    playBeep(1100, 'sine', 0.3);

    // Close wizard and open tracking view
    setClaimWizardOpen(false);
    setSelectedClaimId(generatedClaim.claim_id);
    resetWizard();
  };

  const handleAppealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appealReason) return;
    submitAppeal(appealReason);
    setAppealSubmittedLocal(true);
    playBeep(980, 'sine', 0.25);
  };

  const activeClaimObj = claims.find(c => c.claim_id === selectedClaimId);

  // Categories definition
  const categories = [
    { id: 'Particles', title: 'Foreign Particles', icon: '🪰', desc: 'Insects, hair strands, nails, metal particles, dust/debris.' },
    { id: 'Undercooked', title: 'Undercooked/Raw', icon: '🥩', desc: 'Meat, egg yolk, raw bread or visual color inconsistencies.' },
    { id: 'Overcooked', title: 'Overcooked/Burnt', icon: '🔥', desc: 'Excessively brown or charred items.' },
    { id: 'Packaging', title: 'Damaged Packaging', icon: '📦', desc: 'Leaked containers, open lids, stacked squashing.' },
    { id: 'Wrong', title: 'Wrong Item Delivered', icon: '🍲', desc: 'Entirely different items received.' },
    { id: 'Missing', title: 'Missing Food Item', icon: '❔', desc: 'Ordered boxes not found in delivery package.' }
  ];

  return (
    <div className="space-y-8">
      {/* Ban screen block */}
      {currentUser.account_status === 'suspended' ? (
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          <div className="mx-auto h-16 w-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center animate-bounce">
            <Lock className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">{t.accountSuspended}</h2>
            <p className="text-sm text-slate-400">
              Your claim privileges have been locked. This occurs when our ensemble AI deep learning filters flag multiple synthetic or AI-generated image uploads.
            </p>
          </div>

          {appealSubmittedLocal || appeals.some(a => a.customer_id === currentUser.user_id && a.status === 'pending') ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl text-sm font-medium">
              ✅ Ban Appeal Submitted! Our support security leads are auditing your metadata logs. Estimated resolution: 24 Hours.
            </div>
          ) : (
            <form onSubmit={handleAppealSubmit} className="space-y-4 text-left border-t border-slate-850 pt-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                  {t.appealReason}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain why you believe the system scanner falsely triggered..."
                  value={appealReason}
                  onChange={(e) => setAppealReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:border-red-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl text-sm transition-all"
              >
                Send Appeal Review
              </button>
            </form>
          )}
        </div>
      ) : (
        <>
          {/* Main User dashboard controls */}
          {!claimWizardOpen && !selectedClaimId && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-left">
                  <h2 className="text-2xl font-bold tracking-tight text-white">{t.customerTitle}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{t.customerSubtitle}</p>
                </div>
                <button
                  onClick={() => {
                    setClaimWizardOpen(true);
                    setStep(1);
                  }}
                  className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1 shadow-md shadow-purple-500/10"
                >
                  <Plus className="h-4 w-4" />
                  <span>{t.newClaim}</span>
                </button>
              </div>

              {/* Claims List */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow">
                <div className="px-6 py-4 border-b border-slate-850">
                  <h3 className="text-sm font-bold text-white">{t.claimHistory}</h3>
                </div>

                <div className="divide-y divide-slate-850">
                  {claims.filter(c => c.customer_id === currentUser.user_id).map(c => (
                    <div
                      key={c.claim_id}
                      onClick={() => setSelectedClaimId(c.claim_id)}
                      className="px-6 py-4 hover:bg-slate-850/20 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                    >
                      <div className="flex items-start gap-4 text-left">
                        <div className="h-10 w-10 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">
                          CLA
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">Order {c.order_number}</h4>
                            <span className="text-[10px] text-slate-500 font-mono">#{c.claim_id}</span>
                          </div>
                          <p className="text-xs text-slate-400 font-medium">{c.restaurant_name} • {c.issue_category}</p>
                          <p className="text-[10px] text-slate-500">{new Date(c.submission_date).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${
                          c.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                          c.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                          c.status === 'analyzing' ? 'bg-blue-500/10 text-blue-400 animate-pulse' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {c.status}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                      </div>
                    </div>
                  ))}
                  {claims.length === 0 && (
                    <div className="text-center py-12 text-slate-500 text-sm">
                      You haven't filed any refund disputes in the last 30 days.
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* 2. Dispute Tracker status detail page */}
          {selectedClaimId && activeClaimObj && !claimWizardOpen && (
            <div className="space-y-6 max-w-4xl mx-auto text-left">
              <button
                onClick={() => setSelectedClaimId(null)}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Return to Claims Dashboard</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left Panel: timeline and decision */}
                <div className="md:col-span-7 space-y-6">
                  
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                    <div className="flex justify-between items-center border-b border-slate-850 pb-4">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Dispute Token</span>
                        <h3 className="text-lg font-bold text-white">#{activeClaimObj.claim_id}</h3>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        activeClaimObj.status === 'approved' ? 'bg-emerald-500/15 text-emerald-400' :
                        activeClaimObj.status === 'rejected' ? 'bg-red-500/15 text-red-400' :
                        'bg-blue-500/15 text-blue-400'
                      }`}>
                        {activeClaimObj.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Timeline Tracker */}
                    <div className="space-y-6 pl-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-850">
                      
                      {/* Step 1 */}
                      <div className="relative flex items-start gap-4">
                        <div className="absolute -left-7 h-6 w-6 rounded-full bg-emerald-500 border-4 border-slate-900 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-white">{t.claimSubmitted}</p>
                          <p className="text-[10px] text-slate-500">{new Date(activeClaimObj.created_at).toLocaleTimeString()}</p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="relative flex items-start gap-4">
                        <div className={`absolute -left-7 h-6 w-6 rounded-full border-4 border-slate-900 flex items-center justify-center ${
                          activeClaimObj.status !== 'submitted' ? 'bg-emerald-500' : 'bg-blue-500 animate-ping'
                        }`}>
                          {activeClaimObj.status !== 'submitted' ? <Check className="h-3 w-3 text-white" /> : null}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-white">{t.claimAnalyzing}</p>
                          <p className="text-[10px] text-slate-500">Image forensics (CLIP/EXIF) & video comparison logs check.</p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="relative flex items-start gap-4">
                        <div className={`absolute -left-7 h-6 w-6 rounded-full border-4 border-slate-900 flex items-center justify-center ${
                          ['approved', 'rejected'].includes(activeClaimObj.status) ? 'bg-emerald-500' :
                          activeClaimObj.status === 'review' ? 'bg-amber-500 animate-pulse' : 'bg-slate-800'
                        }`}>
                          {['approved', 'rejected'].includes(activeClaimObj.status) ? <Check className="h-3 w-3 text-white" /> : null}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-white">{t.claimReview}</p>
                          <p className="text-[10px] text-slate-500">Security Leads verify packaging discrepancies manually if inconclusive.</p>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div className="relative flex items-start gap-4">
                        <div className={`absolute -left-7 h-6 w-6 rounded-full border-4 border-slate-900 flex items-center justify-center ${
                          activeClaimObj.status === 'approved' ? 'bg-emerald-500' :
                          activeClaimObj.status === 'rejected' ? 'bg-red-500' : 'bg-slate-800'
                        }`}>
                          {activeClaimObj.status === 'approved' ? <Check className="h-3 w-3 text-white" /> :
                           activeClaimObj.status === 'rejected' ? <AlertCircle className="h-3 w-3 text-white" /> : null}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-white">Refund Decision</p>
                          <p className="text-[10px] text-slate-500">Final decision: Razorpay release or dispute decline.</p>
                        </div>
                      </div>

                    </div>

                    {/* Final Decision Detail */}
                    {activeClaimObj.final_decision && (
                      <div className={`p-4 rounded-2xl border ${
                        activeClaimObj.final_decision === 'approved' 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-slate-200'
                          : 'bg-red-500/10 border-red-500/20 text-slate-200'
                      }`}>
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-1">Decision Summary</h4>
                        <p className="text-xs font-medium text-slate-300">{activeClaimObj.reason_for_decision}</p>
                        {activeClaimObj.final_decision === 'approved' && (
                          <div className="mt-3 flex items-center justify-between text-[11px] bg-slate-950 p-2 rounded-lg border border-slate-850 font-mono">
                            <span className="text-emerald-400 font-bold">₹{activeClaimObj.refund_amount} REFUND DISBURSED</span>
                            <span className="text-slate-500">REF-RZP-93821-AB</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                </div>

                {/* Right Panel: forensic report transparency */}
                <div className="md:col-span-5 space-y-6">
                  
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <span>{t.viewReport}</span>
                    </h4>

                    <div className="space-y-3.5 text-xs">
                      
                      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                        <span className="text-slate-400">Authenticity Verification:</span>
                        <span className="font-bold text-emerald-400">✅ 97% Genuine Photo</span>
                      </div>

                      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                        <span className="text-slate-400">Tampering Detection:</span>
                        <span className="font-bold text-emerald-400">✅ No edits detected</span>
                      </div>

                      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                        <span className="text-slate-400">Restaurant Video Link:</span>
                        <span className={`font-bold ${activeClaimObj.linked_video_code ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {activeClaimObj.linked_video_code ? '✅ Link Verified' : '⚠️ No Code Entered'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                        <span className="text-slate-400">Visual Discrepancy Index:</span>
                        <span className="font-mono text-slate-300">
                          {activeClaimObj.linked_video_code ? '76% mismatch (Anomaly present)' : 'N/A'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-400 font-semibold">Overall Fraud Risk Score:</span>
                        <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                          activeClaimObj.ai_fraud_score > 60 ? 'bg-red-500/10 text-red-400' :
                          activeClaimObj.ai_fraud_score > 30 ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {activeClaimObj.ai_fraud_score}%
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Photo Evidence list */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Submitted Photos</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {activeClaimObj.evidence.map((ev, i) => (
                        <div key={i} className="aspect-square bg-slate-950 border border-slate-850 rounded-xl overflow-hidden relative group">
                          <img src={ev.file_url} alt="Evidence" className="h-full w-full object-cover" />
                          <span className="absolute bottom-1 left-1 bg-slate-900/80 px-2 py-0.5 rounded text-[8px] font-mono text-slate-400">
                            {ev.angle_label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                </div>

              </div>
            </div>
          )}

          {/* 3. Claim Creation Wizard Overlay/Page */}
          {claimWizardOpen && (
            <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 text-left">
              
              {/* Top info and stepper */}
              <div className="flex items-center justify-between border-b border-slate-850 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">{t.newClaim}</h3>
                  <p className="text-xs text-slate-400">Follow the steps to submit secure photographic evidence.</p>
                </div>
                <button onClick={() => { setClaimWizardOpen(false); resetWizard(); }} className="text-slate-400 hover:text-slate-200">
                  Cancel
                </button>
              </div>

              {/* Progress bar dots */}
              <div className="flex items-center justify-between px-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step >= num ? 'bg-purple-600 text-white' : 'bg-slate-950 border border-slate-850 text-slate-500'
                    }`}>
                      {num}
                    </div>
                    {num < 4 && (
                      <div className={`h-0.5 w-16 sm:w-24 transition-all ${
                        step > num ? 'bg-purple-600' : 'bg-slate-850'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleWizardSubmit} className="space-y-6 pt-4">
                
                {/* STEP 1: Select Order and Code */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-white">{t.selectOrder}</h4>
                    
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Select from your recent orders
                      </label>
                      <select
                        required
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs text-white focus:border-purple-500 outline-none"
                      >
                        <option value="">-- Choose Recent Delivery --</option>
                        {orders.map(o => (
                          <option key={o.order_id} value={o.order_id}>
                            {o.restaurant_name} - {o.order_number} (₹{o.amount})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex justify-between">
                        <span>{t.enterVerificationCodeHint}</span>
                        <span className="text-[9px] text-slate-500 font-mono normal-case">{t.optionalCode}</span>
                      </label>
                      <input
                        type="text"
                        placeholder="VER-REST-739-20260520-XXXX"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full h-11 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 text-xs font-mono text-white outline-none"
                      />
                    </div>

                    {/* Live Linked Video side-by-side indicator */}
                    {activeLinkedVideo ? (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center justify-between animate-fade-in text-xs">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-ping"></span>
                          <span className="text-emerald-400 font-bold">{t.previewMatch}</span>
                        </div>
                        <span className="text-slate-400 font-mono">Chef: {activeLinkedVideo.staff_name} ({activeLinkedVideo.duration}s clip)</span>
                      </div>
                    ) : verificationCode && (
                      <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-[10px] text-amber-500 font-medium">
                        ⚠️ No matching kitchen video record found for this token. Continuing will require standard manual review.
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 2: Issue Category and Details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-3">{t.selectCategory}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {categories.map((c) => (
                          <div
                            key={c.id}
                            onClick={() => {
                              setIssueCategory(c.title);
                              playBeep(700, 'sine', 0.1);
                            }}
                            className={`border rounded-2xl p-4 cursor-pointer text-left transition-all ${
                              issueCategory === c.title
                                ? 'bg-purple-600/10 border-purple-500 shadow-md'
                                : 'bg-slate-950 border-slate-850 hover:border-slate-800'
                            }`}
                          >
                            <span className="text-2xl">{c.icon}</span>
                            <h5 className="text-xs font-bold text-white mt-2">{c.title}</h5>
                            <p className="text-[10px] text-slate-500 mt-1 leading-snug">{c.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {issueCategory && (
                      <div className="space-y-3 animate-fade-in">
                        <h4 className="text-sm font-bold text-white">{t.describeIssue}</h4>
                        
                        {/* Keyword suggestions */}
                        <div className="flex flex-wrap gap-1.5">
                          {getKeywordsForCategory(issueCategory).map((kw, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleKeywordClick(kw)}
                              className="bg-slate-950 hover:bg-slate-850 border border-slate-850 px-2.5 py-1 rounded-lg text-[10px] text-purple-400 font-medium transition-colors"
                            >
                              + {kw}
                            </button>
                          ))}
                        </div>

                        <textarea
                          required
                          minLength={20}
                          maxLength={500}
                          rows={4}
                          placeholder="Describe the quality defect in detail..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:border-purple-500 outline-none resize-none"
                        />
                        <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                          <span>Must be at least 20 characters</span>
                          <span>{description.length}/500 chars</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: Upload Evidence */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-white">{t.uploadEvidence}</h4>
                      
                      {/* Batch helper button */}
                      <button
                        type="button"
                        onClick={loadAllGenuineEvidence}
                        className="bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-purple-500/20 flex items-center gap-1"
                      >
                        <Sparkles className="h-3 w-3" />
                        <span>Simulate Genuine Upload</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-400">
                      Our system enforces a multi-angle forensic verification. Select and scan each required slot.
                    </p>

                    {/* Slots grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(evidenceFiles).map(([angle, file]) => (
                        <div
                          key={angle}
                          className="bg-slate-950 border border-slate-850 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden"
                        >
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            {angle}
                          </span>

                          {file.status === 'idle' ? (
                            <div className="space-y-3 py-3">
                              <ImageIcon className="h-6 w-6 text-slate-600 mx-auto" />
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => triggerMockUpload(angle as any, 'genuine')}
                                  className="bg-slate-900 hover:bg-slate-850 text-[10px] font-semibold text-slate-300 px-2 py-1.5 rounded-lg border border-slate-800"
                                >
                                  Genuine
                                </button>
                                <button
                                  type="button"
                                  onClick={() => triggerMockUpload(angle as any, 'ai_generated')}
                                  className="bg-red-500/10 hover:bg-red-500/20 text-[10px] font-semibold text-red-400 px-2 py-1.5 rounded-lg border border-red-500/25"
                                >
                                  AI Image
                                </button>
                              </div>
                            </div>
                          ) : file.status === 'scanning' ? (
                            <div className="py-5 space-y-2 flex flex-col items-center justify-center">
                              <RefreshCw className="h-5 w-5 text-purple-500 animate-spin" />
                              <span className="text-[9px] text-slate-500 font-mono">Running Forensics...</span>
                            </div>
                          ) : file.status === 'failed' ? (
                            <div className="py-2 space-y-2 flex flex-col items-center justify-center w-full">
                              <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                              <span className="text-[8px] text-red-400 font-bold">AI Image Detected (92%)</span>
                              <p className="text-[7px] text-slate-500 max-w-full truncate leading-tight">Rejected. Upload authentic photo.</p>
                              <button
                                type="button"
                                onClick={() => setEvidenceFiles(prev => ({
                                  ...prev,
                                  [angle]: { ...prev[angle], status: 'idle', fileUrl: '' }
                                }))}
                                className="text-[9px] text-slate-400 underline hover:text-slate-200 mt-1"
                              >
                                Try Again
                              </button>
                            </div>
                          ) : (
                            <div className="w-full relative aspect-video rounded-lg overflow-hidden border border-slate-850 group">
                              <img src={file.fileUrl} alt="Preview" className="h-full w-full object-cover" />
                              <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                <button
                                  type="button"
                                  onClick={() => setEvidenceFiles(prev => ({
                                    ...prev,
                                    [angle]: { ...prev[angle], status: 'idle', fileUrl: '' }
                                  }))}
                                  className="bg-red-600 hover:bg-red-500 p-1.5 rounded-full text-white"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <span className="absolute top-1 right-1 bg-green-600 text-white rounded-full p-0.5">
                                <Check className="h-3 w-3" />
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: Review Summary and Submit */}
                {step === 4 && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-white border-b border-slate-850 pb-2">Review Dispute Summary</h4>
                    
                    <div className="space-y-3.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Restaurant:</span>
                        <span className="font-bold text-white">{activeOrder?.restaurant_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Order Number:</span>
                        <span className="font-mono text-white">{activeOrder?.order_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Issue Category:</span>
                        <span className="font-bold text-purple-400">{issueCategory}</span>
                      </div>
                      <div className="flex flex-col text-left space-y-1">
                        <span className="text-slate-500">Description:</span>
                        <span className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-850 italic">
                          "{description}"
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Watermark GPS & Time:</span>
                        <span className="font-mono text-slate-400 flex items-center gap-0.5">
                          <MapPin className="h-3.5 w-3.5" /> 19.0760° N, 72.8777° E
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Refund Amount:</span>
                        <span className="font-bold text-white">₹{activeOrder?.amount}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-1 shadow-lg shadow-purple-600/15"
                    >
                      <CheckCircle2 className="h-4.5 w-4.5" />
                      <span>{t.submitClaim}</span>
                    </button>
                  </div>
                )}

                {/* Footer Controls stepper buttons */}
                <div className="flex justify-between border-t border-slate-850 pt-4 mt-6">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(prev => prev - 1)}
                      className="bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>{t.back}</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < 4 && (
                    <button
                      type="button"
                      disabled={
                        (step === 1 && !orderId) ||
                        (step === 2 && (!issueCategory || description.length < 20)) ||
                        (step === 3 && Object.values(evidenceFiles).some(f => f.status !== 'success'))
                      }
                      onClick={() => {
                        setStep(prev => prev + 1);
                        playBeep(880, 'sine', 0.1);
                      }}
                      className="bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1 shadow-md shadow-purple-600/10 ml-auto"
                    >
                      <span>{t.next}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>

              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};
