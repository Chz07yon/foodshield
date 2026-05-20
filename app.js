/* ==========================================================================
   FoodShield - Application Engine (Vanilla JS)
   ========================================================================== */

// 1. Translations Dictionary (6 Languages)
const translations = {
  en: {
    restaurantPortal: "Restaurant Portal",
    customerPortal: "Customer Portal",
    adminPortal: "Security Admin Portal",
    restaurantTitle: "Kitchen Packaging Surveillance",
    restaurantSubtitle: "AI-Powered Visual Freshness & Tape Integrity Verification",
    customerTitle: "Customer Refund Disputes",
    customerSubtitle: "Audit logs & photo forensics for quality refund claims",
    adminTitle: "MFA Security Operations Center",
    adminSubtitle: "Split-screen video forensics, CLIP inspections & refund dispatch",
    newClaim: "File Quality Dispute",
    recentVideos: "Recent Kitchen Records",
    totalPacked: "Surveillance Logs",
    issuesFlagged: "AI Flags Intercepted",
    averageQuality: "Average Freshness Score",
    confirmSeal: "Verify & Seal Package",
    phoneLogin: "Registered Mobile Number",
    enterOtp: "Verification OTP Code",
    disputesQueue: "Disputes Auditing Queue",
    analyticsOverview: "Metrics & Logs",
    systemSettings: "System Configurations",
    pendingDisputes: "Awaiting Review",
    approvedRefunds: "Total Disbursed",
    rejectedClaims: "Declined Frauds",
    forensicReport: "Forensic Report Analysis",
    restaurantPackingVideo: "Kitchen Sealing Feed",
    customerEvidencePhotos: "Customer Evidence Photo",
    viewReport: "Forensics Audit Report",
    accountSuspended: "Claim Privileges Locked",
    appealReason: "Dispute Deactivation Appeal",
    claimHistory: "Your Active Claims",
    claimSubmitted: "Dispute Logged",
    claimAnalyzing: "Forensics Running",
    claimReview: "Lead Security Review",
    selectOrder: "Identify Order",
    selectCategory: "Select Defect Area",
    describeIssue: "Quality Defect Narrative",
    uploadEvidence: "Provide Image Evidence",
    enterVerificationCodeHint: "Verification Code from Package",
    optionalCode: "Optional",
    previewMatch: "Kitchen surveillance matched successfully",
    scanSuccessful: "Authenticity Verified",
    scanFailed: "Image Alteration / AI Detected",
    disputeTimeline: "Dispute Lifecycle Tracker",
    autoApprovalThreshold: "Auto-Approve Threshold (Fraud %)",
    autoRejectionThreshold: "Auto-Reject Threshold (Fraud %)",
    videoRequired: "Require Packaging Video",
    blockchainEnabled: "Log Hashes to Blockchain Ledger",
    minPhotoResolution: "Minimum Photo Resolution",
    submitSettings: "Commit Configurations",
    resetDatabase: "Reset Database State"
  },
  hi: {
    restaurantPortal: "रेस्टोरेंट पोर्टल",
    customerPortal: "ग्राहक पोर्टल",
    adminPortal: "सुरक्षा व्यवस्थापक पोर्टल",
    restaurantTitle: "रसोई पैकेजिंग निगरानी",
    restaurantSubtitle: "एआई-संचालित दृश्य ताजगी और टेप अखंडता सत्यापन",
    customerTitle: "ग्राहक धनवापसी विवाद",
    customerSubtitle: "गुणवत्ता वापसी दावों के लिए ऑडिट लॉग और फोटो फोरेंसिक",
    adminTitle: "एमएफए सुरक्षा संचालन केंद्र",
    adminSubtitle: "स्प्लिट-स्क्रीन वीडियो फोरेंसिक, क्लिप निरीक्षण और रिफंड प्रेषण",
    newClaim: "नया गुणवत्ता दावा",
    recentVideos: "हाल ही के रसोई रिकॉर्ड",
    totalPacked: "निगरानी लॉग",
    issuesFlagged: "एआई झंडे रोके गए",
    averageQuality: "औसत ताजगी स्कोर",
    confirmSeal: "पैकेज सत्यापित और सील करें",
    phoneLogin: "पंजीकृत मोबाइल नंबर",
    enterOtp: "सत्यापन ओटीपी कोड",
    disputesQueue: "विवाद ऑडिटिंग कतार",
    analyticsOverview: "मेट्रिक्स और लॉग",
    systemSettings: "सिस्टम कॉन्फ़िगरेशन",
    pendingDisputes: "समीक्षा की प्रतीक्षा",
    approvedRefunds: "कुल संवितरण",
    rejectedClaims: "अस्वीकृत धोखाधड़ी",
    forensicReport: "फोरेंसिक रिपोर्ट विश्लेषण",
    restaurantPackingVideo: "रसोई सीलिंग फीड",
    customerEvidencePhotos: "ग्राहक साक्ष्य फोटो",
    viewReport: "फोरेंसिक ऑडिट रिपोर्ट",
    accountSuspended: "दावा विशेषाधिकार लॉक",
    appealReason: "विवाद निष्क्रियकरण अपील",
    claimHistory: "आपके सक्रिय दावे",
    claimSubmitted: "विवाद दर्ज किया गया",
    claimAnalyzing: "फोरेंसिक चल रहा है",
    claimReview: "मुख्य सुरक्षा समीक्षा",
    selectOrder: "ऑर्डर पहचानें",
    selectCategory: "दोष क्षेत्र चुनें",
    describeIssue: "गुणवत्ता दोष विवरण",
    uploadEvidence: "छवि साक्ष्य प्रदान करें",
    enterVerificationCodeHint: "पैकेज से सत्यापन कोड",
    optionalCode: "वैकल्पिक",
    previewMatch: "रसोई की निगरानी सफलतापूर्वक मेल खा गई",
    scanSuccessful: "प्रामाणिकता सत्यापित",
    scanFailed: "छवि परिवर्तन / एआई का पता चला",
    disputeTimeline: "विवाद जीवनचक्र ट्रैकर",
    autoApprovalThreshold: "ऑटो-स्वीकृति सीमा (धोखाधड़ी %)",
    autoRejectionThreshold: "ऑटो-अस्वीकृति सीमा (धोखाधड़ी %)",
    videoRequired: "पैकेजिंग वीडियो आवश्यक है",
    blockchainEnabled: "ब्लॉकचेन लेज़र में हैश लॉग करें",
    minPhotoResolution: "न्यूनतम फोटो रिज़ॉल्यूशन",
    submitSettings: "कॉन्फ़िगरेशन सहेजें",
    resetDatabase: "डेटाबेस रीसेट करें"
  },
  es: {
    restaurantPortal: "Restaurante",
    customerPortal: "Portal de Cliente",
    adminPortal: "Administrador de Seguridad",
    restaurantTitle: "Vigilancia de Empaque de Cocina",
    restaurantSubtitle: "Verificación Visual de Frescura e Integridad del Sellado por IA",
    customerTitle: "Disputas de Reembolso de Clientes",
    customerSubtitle: "Registros de auditoría y análisis forense de fotografías para reclamos",
    adminTitle: "Centro de Operaciones de Seguridad MFA",
    adminSubtitle: "Análisis forense de vídeo en pantalla dividida, inspecciones CLIP y reembolso",
    newClaim: "Presentar Disputa de Calidad",
    recentVideos: "Registros de Cocina Recientes",
    totalPacked: "Registros de Vigilancia",
    issuesFlagged: "Alertas de IA Interceptadas",
    averageQuality: "Puntuación Media de Frescura",
    confirmSeal: "Verificar y Sellar Paquete",
    phoneLogin: "Número Móvil Registrado",
    enterOtp: "Código de Verificación OTP",
    disputesQueue: "Cola de Auditoría de Disputas",
    analyticsOverview: "Métricas y Registros",
    systemSettings: "Configuraciones del Sistema",
    pendingDisputes: "Esperando Revisión",
    approvedRefunds: "Total Reembolsado",
    rejectedClaims: "Fraudes Rechazados",
    forensicReport: "Análisis del Informe Forense",
    restaurantPackingVideo: "Video de Empaque de Cocina",
    customerEvidencePhotos: "Foto de Evidencia del Cliente",
    viewReport: "Informe de Auditoría Forense",
    accountSuspended: "Privilegios de Reclamación Bloqueados",
    appealReason: "Apelación de Desactivación de Disputas",
    claimHistory: "Sus Reclamaciones Activas",
    claimSubmitted: "Disputa Registrada",
    claimAnalyzing: "Forense en Ejecución",
    claimReview: "Revisión del Líder de Seguridad",
    selectOrder: "Identificar Pedido",
    selectCategory: "Seleccionar Área de Defecto",
    describeIssue: "Narrativa del Defecto de Calidad",
    uploadEvidence: "Proporcionar Evidencia de Imagen",
    enterVerificationCodeHint: "Código de Verificación del Paquete",
    optionalCode: "Opcional",
    previewMatch: "Vigilancia de cocina emparejada correctamente",
    scanSuccessful: "Autenticidad Verificada",
    scanFailed: "Alteración de Imagen / IA Detectada",
    disputeTimeline: "Rastreador del Ciclo de Vida de la Disputa",
    autoApprovalThreshold: "Umbral de Auto-Aprobación (Fraude %)",
    autoRejectionThreshold: "Umbral de Auto-Rechazo (Fraude %)",
    videoRequired: "Requerir Video de Empaque",
    blockchainEnabled: "Registrar Hashes en el Libro Mayor Blockchain",
    minPhotoResolution: "Resolución Mínima de Foto",
    submitSettings: "Guardar Configuraciones",
    resetDatabase: "Reiniciar Base de Datos"
  },
  ar: {
    restaurantPortal: "بوابة المطعم",
    customerPortal: "بوابة العميل",
    adminPortal: "بوابة مسؤول الأمن",
    restaurantTitle: "مراقبة التعبئة والتغليف في المطبخ",
    restaurantSubtitle: "التحقق البصري من الطازجة وسلامة الشريط المدعوم بالذكاء الاصطناعي",
    customerTitle: "نزاعات استرداد الأموال للعملاء",
    customerSubtitle: "سجلات التدقيق وفحص الصور فورنسا للأغذية لاسترداد الأموال",
    adminTitle: "مركز العمليات الأمنية MFA",
    adminSubtitle: "فحص الفيديو بالتقسيم الشاشي، وتحليل CLIP وإرسال المبالغ المستردة",
    newClaim: "تقديم نزاع الجودة",
    recentVideos: "سجلات المطبخ الأخيرة",
    totalPacked: "سجلات المراقبة",
    issuesFlagged: "تنبيهات الذكاء الاصطناعي",
    averageQuality: "متوسط تقييم النضارة",
    confirmSeal: "التحقق وختم العبوة",
    phoneLogin: "رقم الهاتف المحمول المسجل",
    enterOtp: "رمز التحقق الرمز القصير",
    disputesQueue: "طابور مراجعة النزاعات",
    analyticsOverview: "المقاييس والسجلات",
    systemSettings: "إعدادات النظام",
    pendingDisputes: "في انتظار المراجعة",
    approvedRefunds: "إجمالي المبالغ المستردة",
    rejectedClaims: "الاحتيال المرفوض",
    forensicReport: "تقرير تحليل الطب الشرعي",
    restaurantPackingVideo: "مقطع تعبئة المطبخ",
    customerEvidencePhotos: "صورة دليل العميل",
    viewReport: "تقرير تدقيق الطب الشرعي",
    accountSuspended: "تم قفل امتيازات تقديم النزاعات",
    appealReason: "استئناف إلغاء قفل تقديم النزاعات",
    claimHistory: "النزاعات النشطة الخاصة بك",
    claimSubmitted: "تم تسجيل النزاع",
    claimAnalyzing: "تحليل الطب الشرعي قيد التشغيل",
    claimReview: "مراجعة مشرف الأمن",
    selectOrder: "تحديد الطلب",
    selectCategory: "اختر نوع المشكلة",
    describeIssue: "وصف مشكلة الجودة",
    uploadEvidence: "تقديم دليل الصور",
    enterVerificationCodeHint: "رمز التحقق من العبوة",
    optionalCode: "اختياري",
    previewMatch: "تم مطابقة مراقبة المطبخ بنجاح",
    scanSuccessful: "تم التحقق من الأصالة",
    scanFailed: "تم كشف تعديل بالصورة / ذكاء اصطناعي",
    disputeTimeline: "متتبع دورة حياة النزاع",
    autoApprovalThreshold: "حد الموافقة التلقائية (احتيال %)",
    autoRejectionThreshold: "حد الرفض التلقائي (احتيال %)",
    videoRequired: "طلب فيديو التعبئة والتغليف",
    blockchainEnabled: "تسجيل الهاش في دفتر البلوكشين",
    minPhotoResolution: "أقل دقة للصور المسموح بها",
    submitSettings: "حفظ الإعدادات",
    resetDatabase: "إعادة ضبط قاعدة البيانات"
  },
  ja: {
    restaurantPortal: "店舗ポータル",
    customerPortal: "顧客ポータル",
    adminPortal: "セキュリティ管理ポータル",
    restaurantTitle: "厨房梱包映像監視システム",
    restaurantSubtitle: "AIによる鮮度確認および梱包テープ完全性認証",
    customerTitle: "返金紛争申請",
    customerSubtitle: "品質不良に対する監査ログと画像フォレンジック監査",
    adminTitle: "MFAセキュリティ運用センター",
    adminSubtitle: "2画面映像検証、CLIPモデル分析、および返金自動処理",
    newClaim: "品質紛争を申請",
    recentVideos: "最近の梱包記録",
    totalPacked: "監視記録数",
    issuesFlagged: "検知されたAI警告",
    averageQuality: "平均鮮度スコア",
    confirmSeal: "確認してパッケージを密閉",
    phoneLogin: "登録済み携帯番号",
    enterOtp: "認証ワンタイムコード",
    disputesQueue: "紛争監査キュー",
    analyticsOverview: "メトリクスとログ",
    systemSettings: "システム構成設定",
    pendingDisputes: "審査待ち",
    approvedRefunds: "総返金実行額",
    rejectedClaims: "却下された不正申請",
    forensicReport: "画像鑑定レポート分析",
    restaurantPackingVideo: "厨房梱包動画ログ",
    customerEvidencePhotos: "顧客提出証拠写真",
    viewReport: "鑑定監査レポート",
    accountSuspended: "申請権限ロック中",
    appealReason: "制限解除の不服申し立て理由",
    claimHistory: "アクティブな申請履歴",
    claimSubmitted: "紛争ログ登録済み",
    claimAnalyzing: "フォレンジック解析実行中",
    claimReview: "主任審査員レビュー中",
    selectOrder: "注文を選択",
    selectCategory: "欠陥カテゴリーを選択",
    describeIssue: "詳細な欠陥状況の記述",
    uploadEvidence: "証拠画像を提出",
    enterVerificationCodeHint: "梱包に貼られた検証コード",
    optionalCode: "任意",
    previewMatch: "厨房梱包ビデオの適合を確認しました",
    scanSuccessful: "真正性を確認（スキャン成功）",
    scanFailed: "加工画像またはAI生成画像を検出",
    disputeTimeline: "紛争ライフサイクル追跡",
    autoApprovalThreshold: "自動承認しきい値（不正確率 %）",
    autoRejectionThreshold: "自動却下しきい値（不正確率 %）",
    videoRequired: "梱包動画記録を必須化",
    blockchainEnabled: "ハッシュ値をブロックチェーンへ記録",
    minPhotoResolution: "最低写真解像度",
    submitSettings: "構成を保存する",
    resetDatabase: "データベースをリセットする"
  },
  fr: {
    restaurantPortal: "Portail Restaurant",
    customerPortal: "Portail Client",
    adminPortal: "Portail Administrateur",
    restaurantTitle: "Surveillance du Conditionnement",
    restaurantSubtitle: "Vérification IA de la Fraîcheur Visuelle et de l'Intégrité de l'Emballage",
    customerTitle: "Litiges et Remboursements Clients",
    customerSubtitle: "Journaux d'audit et analyse légale des photos pour réclamations",
    adminTitle: "Centre d'Opérations de Sécurité MFA",
    adminSubtitle: "Analyse vidéo double écran, vérification CLIP et émission des remboursements",
    newClaim: "Déclarer un Litige Qualité",
    recentVideos: "Enregistrements Cuisine Récents",
    totalPacked: "Journaux de Surveillance",
    issuesFlagged: "Alertes IA Interceptées",
    averageQuality: "Score de Fraîcheur Moyen",
    confirmSeal: "Vérifier et Sceller le Colis",
    phoneLogin: "Numéro de Mobile Enregistré",
    enterOtp: "Code d'Authentification OTP",
    disputesQueue: "File d'Audit des Litiges",
    analyticsOverview: "Statistiques et Rapports",
    systemSettings: "Configurations du Système",
    pendingDisputes: "En attente de revue",
    approvedRefunds: "Total Remboursé",
    rejectedClaims: "Fraudes Rejetées",
    forensicReport: "Rapport d'Analyse Légale",
    restaurantPackingVideo: "Vidéo d'Emballage Cuisine",
    customerEvidencePhotos: "Photo de Preuve Client",
    viewReport: "Rapport d'Audit Forensique",
    accountSuspended: "Privilèges de Réclamation Bloqués",
    appealReason: "Appel pour Déblocage du Compte",
    claimHistory: "Vos Litiges Actifs",
    claimSubmitted: "Litige Enregistré",
    claimAnalyzing: "Analyse Légale en Cours",
    claimReview: "Revue par le Responsable Sécurité",
    selectOrder: "Identifier la Commande",
    selectCategory: "Sélectionner le Type de Défaut",
    describeIssue: "Description du Problème Qualité",
    uploadEvidence: "Fournir les Photos de Preuve",
    enterVerificationCodeHint: "Code de Validation sur l'Emballage",
    optionalCode: "Optionnel",
    previewMatch: "Vidéo de surveillance cuisine validée avec succès",
    scanSuccessful: "Authenticité Validée",
    scanFailed: "Modification d'image ou IA Détectée",
    disputeTimeline: "Suivi du Cycle de Vie du Litige",
    autoApprovalThreshold: "Seuil d'Approbation Auto (% Fraude)",
    autoRejectionThreshold: "Seuil de Rejet Auto (% Fraude)",
    videoRequired: "Exiger Vidéo d'Emballage",
    blockchainEnabled: "Enregistrer les Hashes sur Registre Blockchain",
    minPhotoResolution: "Résolution Photo Minimale",
    submitSettings: "Sauvegarder les Configurations",
    resetDatabase: "Réinitialiser la Base de Datos"
  }
};

// 2. Initial Seed Database Models
const initialUser = {
  user_id: "CUST-501",
  phone: "+91 99009 90099",
  email: "rahul.verma@gmail.com",
  full_name: "Rahul Verma",
  account_status: "warning", 
  fraud_flag_count: 1,
  banned_until: null,
  profile_image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
};

const initialRestaurants = [
  {
    restaurant_id: "REST-739",
    name: "Burger & Co.",
    owner_email: "manager@burgerco.com",
    phone: "+91 98765 43210",
    address: "12/A, Park Street, Sector 5",
    city: "Mumbai",
    pincode: "400001",
    cuisine_type: "Fast Food",
    logo_url: "🍔",
    banner_gradient: "linear-gradient(135deg, #f97316, #d97706)",
    is_verified: true,
    quality_score: 94,
    video_compliance_rate: 98
  },
  {
    restaurant_id: "REST-402",
    name: "Sushi Zen",
    owner_email: "orders@sushizen.com",
    phone: "+91 87654 32109",
    address: "G-4, Galleria Mall, Hiranandani",
    city: "Mumbai",
    pincode: "400076",
    cuisine_type: "Japanese",
    logo_url: "🍣",
    banner_gradient: "linear-gradient(135deg, #ef4444, #be123c)",
    is_verified: true,
    quality_score: 87,
    video_compliance_rate: 92
  },
  {
    restaurant_id: "REST-118",
    name: "Tandoori Flames",
    owner_email: "support@tandooriflames.in",
    phone: "+91 76543 21098",
    address: "Block B, Connaught Place",
    city: "New Delhi",
    pincode: "110001",
    cuisine_type: "North Indian",
    logo_url: "🍗",
    banner_gradient: "linear-gradient(135deg, #ca8a04, #b91c1c)",
    is_verified: false,
    quality_score: 79,
    video_compliance_rate: 65
  }
];

const initialOrders = [
  {
    order_id: "ORD-9921",
    customer_id: "CUST-501",
    restaurant_id: "REST-739",
    restaurant_name: "Burger & Co.",
    order_number: "BC-9921",
    amount: 520,
    items_json: [
      { name: "Double Cheese Whopper", quantity: 1, price: 280 },
      { name: "Large Salted Fries", quantity: 1, price: 140 },
      { name: "Chocolate Milkshake", quantity: 1, price: 100 }
    ],
    delivery_address: "Flat 402, Sunset Heights, Bandra West, Mumbai",
    delivered_at: "2026-05-20T19:30:00Z",
    created_at: "2026-05-20T18:45:00Z"
  },
  {
    order_id: "ORD-9922",
    customer_id: "CUST-501",
    restaurant_id: "REST-402",
    restaurant_name: "Sushi Zen",
    order_number: "SZ-9922",
    amount: 1450,
    items_json: [
      { name: "Salmon Deluxe Platter (12pcs)", quantity: 1, price: 1200 },
      { name: "Spicy Tuna Temaki", quantity: 1, price: 250 }
    ],
    delivery_address: "Flat 402, Sunset Heights, Bandra West, Mumbai",
    delivered_at: "2026-05-20T14:15:00Z",
    created_at: "2026-05-20T13:20:00Z"
  },
  {
    order_id: "ORD-9923",
    customer_id: "CUST-501",
    restaurant_id: "REST-118",
    restaurant_name: "Tandoori Flames",
    order_number: "TF-9923",
    amount: 780,
    items_json: [
      { name: "Paneer Butter Masala", quantity: 1, price: 340 },
      { name: "Butter Naan", quantity: 3, price: 180 },
      { name: "Chicken Biryani", quantity: 1, price: 260 }
    ],
    delivery_address: "Flat 402, Sunset Heights, Bandra West, Mumbai",
    delivered_at: "2026-05-18T21:00:00Z",
    created_at: "2026-05-18T20:15:00Z"
  }
];

const initialVideos = [
  {
    video_id: "VID-8810",
    restaurant_id: "REST-739",
    order_id: "ORD-9921",
    order_number: "BC-9921",
    verification_code: "VER-REST-739-20260520-F7A2",
    video_url: "recorded_video_1.mp4",
    thumbnail_url: "🍔",
    staff_id: "STF-02",
    staff_name: "Ramesh Kumar",
    duration: 35,
    recording_timestamp: "2026-05-20T19:00:00Z",
    ai_analysis: {
      food_quality_score: 95,
      color_rating: "Golden Brown",
      foreign_particles_detected: [],
      packaging_integrity: "Perfectly Sealed (Double Tape)",
      recommendations: ["Ensure thermal bag is pre-heated"]
    },
    quality_score: 96,
    gps_location: "19.0760° N, 72.8777° E"
  },
  {
    video_id: "VID-8811",
    restaurant_id: "REST-402",
    order_id: "ORD-9922",
    order_number: "SZ-9922",
    verification_code: "VER-REST-402-20260520-X89B",
    video_url: "recorded_video_2.mp4",
    thumbnail_url: "🍣",
    staff_id: "STF-18",
    staff_name: "Mei Ling",
    duration: 48,
    recording_timestamp: "2026-05-20T13:40:00Z",
    ai_analysis: {
      food_quality_score: 89,
      color_rating: "Fresh Pink/Red",
      foreign_particles_detected: [],
      packaging_integrity: "Sealed with QR Code sticker",
      recommendations: ["Add extra ice pack for sashimi preservation"]
    },
    quality_score: 90,
    gps_location: "19.1176° N, 72.9060° E"
  }
];

const initialClaims = [
  {
    claim_id: "CLA-2281",
    customer_id: "CUST-501",
    customer_name: "Rahul Verma",
    customer_phone: "+91 99009 90099",
    order_id: "ORD-9923",
    order_number: "TF-9923",
    restaurant_id: "REST-118",
    restaurant_name: "Tandoori Flames",
    issue_category: "Foreign Particles (hair, insects, nails)",
    description: "I found a long black strand of hair in my Paneer Butter Masala. This is absolutely unacceptable and unhygienic!",
    status: "review",
    submission_date: "2026-05-19T09:45:00Z",
    ai_fraud_score: 78,
    ai_recommendation: "REJECT",
    final_decision: null,
    admin_id: null,
    refund_amount: 780,
    reason_for_decision: "",
    evidence: [
      {
        evidence_id: "EV-1",
        claim_id: "CLA-2281",
        evidence_type: "photo",
        file_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
        ai_generated_score: 84,
        tampering_score: 62,
        angle_label: "Overhead",
        blur_score: 10,
        brightness_score: 55,
        uploaded_at: "2026-05-19T09:40:00Z"
      },
      {
        evidence_id: "EV-2",
        claim_id: "CLA-2281",
        evidence_type: "photo",
        file_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
        ai_generated_score: 75,
        tampering_score: 48,
        angle_label: "Close-Up",
        blur_score: 15,
        brightness_score: 60,
        uploaded_at: "2026-05-19T09:41:00Z"
      }
    ],
    linked_video_code: null,
    gps_location: "19.0760° N, 72.8777° E",
    created_at: "2026-05-19T09:45:00Z"
  },
  {
    claim_id: "CLA-2282",
    customer_id: "CUST-501",
    customer_name: "Rahul Verma",
    customer_phone: "+91 99009 90099",
    order_id: "ORD-9921",
    order_number: "BC-9921",
    restaurant_id: "REST-739",
    restaurant_name: "Burger & Co.",
    issue_category: "Poor Packaging (damaged, leaked)",
    description: "The milkshake lid was completely loose and spilled all over the burger and fries. The bag was soaked when delivered.",
    status: "approved",
    submission_date: "2026-05-20T20:10:00Z",
    ai_fraud_score: 8,
    ai_recommendation: "APPROVE",
    final_decision: "approved",
    admin_id: "ADM-001",
    refund_amount: 520,
    reason_for_decision: "Verified from restaurant video that the lid was not taped down properly. Photos clearly demonstrate structural spilling.",
    evidence: [
      {
        evidence_id: "EV-5",
        claim_id: "CLA-2282",
        evidence_type: "photo",
        file_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        ai_generated_score: 4,
        tampering_score: 3,
        angle_label: "Overhead",
        blur_score: 5,
        brightness_score: 72,
        uploaded_at: "2026-05-20T20:05:00Z"
      }
    ],
    linked_video_code: "VER-REST-739-20260520-F7A2",
    gps_location: "19.0760° N, 72.8777° E",
    created_at: "2026-05-20T20:10:00Z"
  }
];

const initialAuditLogs = [
  {
    log_id: "LOG-01",
    admin_name: "Officer Vikram",
    action: "Dispute Resolved",
    details: "Approved dispute #CLA-2282 for ₹520. Autopaid via Razorpay.",
    timestamp: "2026-05-20T20:25:00Z"
  },
  {
    log_id: "LOG-02",
    admin_name: "System Guard",
    action: "Fraud Warning Triggered",
    details: "Flagged user Rahul Verma for suspicious claims on Order #TF-9923 (AI model: 78% fraud risk).",
    timestamp: "2026-05-19T09:50:00Z"
  }
];

const defaultSettings = {
  autoApprovalThreshold: 15,
  autoRejectionThreshold: 75,
  videoRequired: true,
  verificationCodeRequired: false,
  blockchainEnabled: true,
  minPhotoResolution: "1280x720"
};

// 3. Database State Wrapper
const db = {
  get: (key, fallback) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  },
  set: (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
  },
  state: {
    activeRole: 'restaurant',
    language: 'en',
    theme: 'dark',
    user: null,
    restaurants: [],
    orders: [],
    videos: [],
    claims: [],
    appeals: [],
    auditLogs: [],
    settings: {}
  },
  init() {
    this.state.activeRole = localStorage.getItem('fs_role') || 'restaurant';
    this.state.language = localStorage.getItem('fs_lang') || 'en';
    this.state.theme = localStorage.getItem('fs_theme') || 'dark';

    this.state.user = this.get('fs_user', initialUser);
    this.state.restaurants = this.get('fs_restaurants', initialRestaurants);
    this.state.orders = this.get('fs_orders', initialOrders);
    this.state.videos = this.get('fs_videos', initialVideos);
    this.state.claims = this.get('fs_claims', initialClaims);
    this.state.appeals = this.get('fs_appeals', []);
    this.state.auditLogs = this.get('fs_audit_logs', initialAuditLogs);
    this.state.settings = this.get('fs_settings', defaultSettings);
  },
  save() {
    this.set('fs_user', this.state.user);
    this.set('fs_restaurants', this.state.restaurants);
    this.set('fs_orders', this.state.orders);
    this.set('fs_videos', this.state.videos);
    this.set('fs_claims', this.state.claims);
    this.set('fs_appeals', this.state.appeals);
    this.set('fs_audit_logs', this.state.auditLogs);
    this.set('fs_settings', this.state.settings);
  },
  reset() {
    localStorage.clear();
    location.reload();
  }
};

// 4. Sound Synthesis Engine (Web Audio API)
function playBeep(freq = 880, type = 'sine', duration = 0.2) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// 5. Global View Coordinator
function updateLanguage() {
  const currentLang = db.state.language;
  const dict = translations[currentLang] || translations.en;
  
  // Set elements that have data-translate
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (dict[key]) el.innerText = dict[key];
  });
  
  // Update role tab labels
  document.querySelector('.role-tab[data-role="restaurant"] span').innerText = dict.restaurantPortal;
  document.querySelector('.role-tab[data-role="customer"] span').innerText = dict.customerPortal;
  document.querySelector('.role-tab[data-role="admin"] span').innerText = dict.adminPortal;
}

function updateTheme() {
  const theme = db.state.theme;
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  
  if (theme === 'light') {
    body.classList.add('light-theme');
    if (themeToggle) themeToggle.innerHTML = `<i data-lucide="sun" style="width:1rem;height:1rem;"></i>`;
  } else {
    body.classList.remove('light-theme');
    if (themeToggle) themeToggle.innerHTML = `<i data-lucide="moon" style="width:1rem;height:1rem;"></i>`;
  }
  initIcons();
}

function switchRole(role) {
  db.state.activeRole = role;
  localStorage.setItem('fs_role', role);
  playBeep(700, 'sine', 0.1);

  // Active role class
  document.querySelectorAll('.role-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-role') === role);
  });

  // Active portal views
  document.querySelectorAll('.portal-view').forEach(view => {
    view.classList.toggle('active', view.id === `${role}-portal`);
  });

  // Load state and dynamic lists
  if (role === 'restaurant') {
    renderRestaurantDashboard();
    renderRestaurantOrdersSelect();
  } else if (role === 'customer') {
    renderCustomerDashboard();
    renderCustomerOrderOptions();
  } else if (role === 'admin') {
    renderAdminDashboard();
  }
  updateWarningBanners();
  initIcons();
}

function updateWarningBanners() {
  const banner = document.getElementById('account-warning-banner');
  const user = db.state.user;
  banner.className = "warning-banner";
  
  if (user.account_status === 'warning') {
    banner.classList.add('warning');
    banner.querySelector('.banner-msg').innerHTML = `⚠️ <strong>Warning Flag:</strong> Suspected AI generation. Uploading synthetic photographs will lock claiming permissions (Flags: ${user.fraud_flag_count}/2).`;
  } else if (user.account_status === 'suspended') {
    banner.classList.add('suspended');
    banner.querySelector('.banner-msg').innerHTML = `⛔ <strong>Claim Privileges Suspended:</strong> Ensemble models detected multiple synthetic edits. File a log appeal below.`;
  }
}

// 6. RESTAURANT PORTAL ENGINE
let webcamStream = null;
let recordingTimer = null;
let isRecording = false;
let recordSeconds = 0;
let aiFlags = [];
let recordLogs = [];
let drawingLoop = null;

function renderRestaurantDashboard() {
  const vids = db.state.videos.filter(v => v.restaurant_id === db.state.restaurants[0].restaurant_id);
  const total = vids.length;
  const issues = vids.filter(v => v.quality_score < 85).length;
  const avgQ = total ? Math.round(vids.reduce((acc, v) => acc + v.quality_score, 0) / total) : 94;

  document.getElementById('rest-kpi-total').innerText = total;
  document.getElementById('rest-kpi-issues').innerText = issues;
  document.getElementById('rest-kpi-quality').innerText = `${avgQ}%`;

  // Render logs table
  const tbody = document.getElementById('rest-logs-tbody');
  tbody.innerHTML = '';
  vids.forEach(v => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="font-bold" style="color:hsl(var(--text-main))">🟢 ${v.order_number}</td>
      <td style="font-family:var(--font-mono)">${v.verification_code}</td>
      <td>
        <span class="badge ${v.quality_score >= 90 ? 'badge-approved' : 'badge-review'}">
          ${v.quality_score}% Quality
        </span>
      </td>
      <td>${new Date(v.recording_timestamp).toLocaleTimeString()}</td>
      <td style="font-family:var(--font-mono)">${v.duration}s</td>
      <td style="text-align:right">
        <button class="btn-mini btn-secondary" onclick="showVideoModal('${v.video_id}')">Review Playback</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  if (vids.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:hsl(var(--text-dim));padding:2rem;">No packaging logs filed.</td></tr>`;
  }
  initIcons();
}

function renderRestaurantOrdersSelect() {
  const select = document.getElementById('rest-order-select');
  select.innerHTML = `<option value="">-- Choose Order ID --</option>`;
  db.state.orders.forEach(o => {
    select.innerHTML += `<option value="${o.order_id}">${o.restaurant_name} - ${o.order_number} (₹${o.amount})</option>`;
  });
}

function updateRestOrderDisplay() {
  const orderId = document.getElementById('rest-order-select').value;
  const box = document.getElementById('rest-order-items-box');
  if (!orderId) {
    box.style.display = 'none';
    return;
  }
  const order = db.state.orders.find(o => o.order_id === orderId);
  box.style.display = 'block';
  let html = `<div style="font-size:0.7rem;font-weight:700;color:hsl(var(--text-dim));text-transform:uppercase;margin-bottom:0.25rem;">Items to Pack</div>`;
  order.items_json.forEach(item => {
    html += `<div style="display:flex;justify-content:between;font-size:0.8rem;margin-bottom:0.15rem;">
      <span style="flex:1;">${item.quantity}x ${item.name}</span>
      <span style="font-family:var(--font-mono);color:hsl(var(--text-muted));">₹${item.price}</span>
    </div>`;
  });
  box.innerHTML = html;
  discardRecording();
}

async function startRestaurantRecording() {
  const orderId = document.getElementById('rest-order-select').value;
  if (!orderId) {
    alert("Please select an Order to pack first.");
    return;
  }
  
  isRecording = true;
  recordSeconds = 0;
  aiFlags = [];
  recordLogs = [`[System] Recording initialized for Order #${db.state.orders.find(o => o.order_id === orderId).order_number}`];
  
  document.getElementById('rest-recording-btn').style.display = 'none';
  document.getElementById('rest-stop-btn').style.display = 'inline-flex';
  document.getElementById('rest-discard-btn').style.display = 'inline-flex';
  document.getElementById('rest-seal-btn').style.display = 'none';
  document.getElementById('rest-seal-success-block').style.display = 'none';
  document.getElementById('rest-rec-overlay').style.display = 'flex';
  
  // Try accessing media stream
  try {
    webcamStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
  } catch (err) {
    webcamStream = null;
    recordLogs.push(`[System] Camera hardware blocked. Initializing simulation engine...`);
  }

  // Draw loop
  startCanvasLoop();
  playBeep(1200, 'sine', 0.15);

  recordingTimer = setInterval(() => {
    recordSeconds++;
    document.getElementById('rest-timer-sec').innerText = `${recordSeconds}s`;
    
    if (recordSeconds === 5) {
      triggerAiAlert('seal');
    } else if (recordSeconds === 12) {
      triggerAiAlert('hair');
    }
    
    if (recordSeconds >= 60) {
      stopRestaurantRecording();
    }
  }, 1000);
}

function triggerAiAlert(type) {
  playBeep(440, 'triangle', 0.4);
  const alertBox = document.getElementById('rest-ai-alert');
  alertBox.style.display = 'block';
  
  if (type === 'seal') {
    aiFlags.push({ type: 'seal', confidence: 99, detail: '⚠️ Sealing Defect: Container seal compromised.' });
    alertBox.innerHTML = `<strong>AI Warning:</strong> Sealing lid integrity anomaly flagged (99% confidence).`;
    recordLogs.push(`[AI Alert] 05s: Packaging seal issue flagged (99% confidence).`);
  } else {
    aiFlags.push({ type: 'hair', confidence: 98, detail: '⚠️ Contamination Flag: Black hair particle in Area D3.' });
    alertBox.innerHTML = `<strong>Contamination Alert:</strong> Foreign particle detected (98% confidence).`;
    recordLogs.push(`[AI Alert] 12s: Particle scan warning (98% confidence).`);
  }
  
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 4000);
}

function startCanvasLoop() {
  const canvas = document.getElementById('rest-canvas');
  const ctx = canvas.getContext('2d');
  const video = document.createElement('video');
  
  if (webcamStream) {
    video.srcObject = webcamStream;
    video.play();
  }
  
  let angle = 0;
  
  function draw() {
    if (!isRecording) return;
    const w = canvas.width;
    const height = canvas.height;
    
    if (webcamStream) {
      ctx.drawImage(video, 0, 0, w, height);
    } else {
      // Animated Box Conveyor Simulation
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, height);
      
      // Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      }
      for (let j = 0; j < height; j += 30) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
      }

      // Box
      ctx.fillStyle = '#b45309';
      const boxSize = 130;
      const boxX = (w - boxSize) / 2;
      const boxY = (height - boxSize) / 2 + Math.sin(angle) * 8;
      ctx.fillRect(boxX, boxY, boxSize, boxSize);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.strokeRect(boxX, boxY, boxSize, boxSize);

      // Food item
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(w / 2, boxY + boxSize / 2, 30, 0, Math.PI * 2);
      ctx.fill();

      // Tape
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(boxX + 15, boxY + boxSize / 2 - 8, boxSize - 30, 16);

      // Scanning Red Laser
      const laserY = (height / 2) + Math.sin(angle * 2) * (height / 2.5);
      ctx.strokeStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(10, laserY); ctx.lineTo(w - 10, laserY); ctx.stroke();
      ctx.shadowBlur = 0; // reset
      
      angle += 0.04;
    }
    
    // Draw Overlay metadata
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, w, 35);
    ctx.fillRect(0, height - 45, w, 45);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    
    const orderSelect = document.getElementById('rest-order-select');
    const orderNo = orderSelect.options[orderSelect.selectedIndex]?.text.split(' - ')[1]?.split(' ')[0] || 'BC-9921';
    const staffSelect = document.getElementById('rest-staff-select');
    const staffVal = staffSelect.value;
    const staffName = staffSelect.options[staffSelect.selectedIndex]?.text.split(' - ')[1] || 'Ramesh Kumar';

    ctx.fillText(`ORDER: ${orderNo}`, 12, 22);
    ctx.fillText(`STAFF: ${staffVal} - ${staffName}`, 12, height - 26);
    ctx.fillText(`LOC: 19.0760 N, 72.8777 E`, 12, height - 12);
    
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    ctx.fillText(dateStr, w - 170, 22);

    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(w - 100, height - 20, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f1f5f9';
    ctx.fillText("REC LIVE", w - 85, height - 16);

    // Logs list
    const logBox = document.getElementById('rest-logs-box');
    logBox.innerHTML = '';
    recordLogs.forEach(lg => {
      const isAlert = lg.includes('[AI Alert]');
      const entry = `<div class="log-entry ${isAlert ? 'log-alert' : 'log-system'}">${lg}</div>`;
      logBox.innerHTML += entry;
    });
    logBox.scrollTop = logBox.scrollHeight;

    drawingLoop = requestAnimationFrame(draw);
  }
  
  drawingLoop = requestAnimationFrame(draw);
}

function stopRestaurantRecording() {
  isRecording = false;
  if (recordingTimer) clearInterval(recordingTimer);
  if (drawingLoop) cancelAnimationFrame(drawingLoop);
  if (webcamStream) {
    webcamStream.getTracks().forEach(t => t.stop());
    webcamStream = null;
  }
  
  document.getElementById('rest-stop-btn').style.display = 'none';
  document.getElementById('rest-seal-btn').style.display = 'inline-flex';
  document.getElementById('rest-rec-overlay').style.display = 'none';
  
  recordLogs.push(`[System] Recording completed. Length: ${recordSeconds} seconds.`);
  playBeep(800, 'sine', 0.2);
}

function discardRecording() {
  isRecording = false;
  if (recordingTimer) clearInterval(recordingTimer);
  if (drawingLoop) cancelAnimationFrame(drawingLoop);
  if (webcamStream) {
    webcamStream.getTracks().forEach(t => t.stop());
    webcamStream = null;
  }
  
  recordSeconds = 0;
  aiFlags = [];
  recordLogs = [];
  
  document.getElementById('rest-recording-btn').style.display = 'inline-flex';
  document.getElementById('rest-stop-btn').style.display = 'none';
  document.getElementById('rest-discard-btn').style.display = 'none';
  document.getElementById('rest-seal-btn').style.display = 'none';
  document.getElementById('rest-seal-success-block').style.display = 'none';
  document.getElementById('rest-rec-overlay').style.display = 'none';
  
  // Clear canvas
  const canvas = document.getElementById('rest-canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw helper text
  ctx.fillStyle = '#64748b';
  ctx.font = "13px var(--font-sans)";
  ctx.textAlign = 'center';
  ctx.fillText("Camera Interface Idle. Select Order & Click Start Capture.", canvas.width / 2, canvas.height / 2);
  ctx.textAlign = 'left'; // reset
  
  document.getElementById('rest-logs-box').innerHTML = `<div class="log-entry">[System] Camera feed offline.</div>`;
}

function approvePackagingAndSeal() {
  const orderId = document.getElementById('rest-order-select').value;
  const orderObj = db.state.orders.find(o => o.order_id === orderId);
  const staffSelect = document.getElementById('rest-staff-select');
  const staffVal = staffSelect.value;
  const staffName = staffSelect.options[staffSelect.selectedIndex].text.split(' - ')[1];

  const timeStr = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
  const randomHash = Math.random().toString(36).substring(2, 6).toUpperCase();
  const code = `VER-${db.state.restaurants[0].restaurant_id}-${timeStr}-${randomHash}`;

  const hasHair = aiFlags.some(f => f.type === 'hair');
  const hasSeal = aiFlags.some(f => f.type === 'seal');

  const newVideo = {
    video_id: `VID-${Math.floor(1000 + Math.random() * 9000)}`,
    restaurant_id: db.state.restaurants[0].restaurant_id,
    order_id: orderId,
    order_number: orderObj.order_number,
    verification_code: code,
    video_url: 'simulated_clip.mp4',
    thumbnail_url: orderObj.items_json[0].name.includes('Burger') ? '🍔' : '🍣',
    staff_id: staffVal,
    staff_name: staffName,
    duration: recordSeconds || 24,
    recording_timestamp: new Date().toISOString(),
    ai_analysis: {
      food_quality_score: hasHair ? 68 : hasSeal ? 82 : 96,
      color_rating: 'Golden Brown',
      foreign_particles_detected: hasHair ? [{ type: 'Hair', confidence: 98, location: 'Area D3' }] : [],
      packaging_integrity: hasSeal ? 'Damaged Corner Seal' : 'Secure Double Tape Seal',
      recommendations: hasHair ? ['Re-prepare item immediately', 'Sanitize packing area'] : []
    },
    quality_score: hasHair ? 68 : hasSeal ? 82 : 96,
    gps_location: '19.0760° N, 72.8777° E'
  };

  db.state.videos.unshift(newVideo);
  
  // Add Audit log
  db.state.auditLogs.unshift({
    log_id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    admin_name: "Kitchen Guard AI",
    action: "Video Verified & Hash Written",
    details: `Order #${newVideo.order_number} verified. Blockchain SHA-256 written: ${randomHash}`,
    timestamp: new Date().toISOString()
  });

  db.save();
  playBeep(1000, 'sine', 0.3);

  // Success block
  document.getElementById('rest-seal-btn').style.display = 'none';
  const successBlock = document.getElementById('rest-seal-success-block');
  successBlock.style.display = 'block';
  document.getElementById('rest-seal-code').innerText = code;
  
  // Update dashboard stats
  renderRestaurantDashboard();
}

function copyRestSealCode() {
  const code = document.getElementById('rest-seal-code').innerText;
  navigator.clipboard.writeText(code);
  playBeep(900, 'sine', 0.08);
  alert("Verification Seal Code copied to clipboard!");
}


// 7. CUSTOMER PORTAL ENGINE
let activeStep = 1;
let selectedClaimId = null;
let claimEvidenceFiles = {
  'Overhead': { fileUrl: '', isAi: false, aiScore: 0, tamperingScore: 0, status: 'idle' },
  'Left Side': { fileUrl: '', isAi: false, aiScore: 0, tamperingScore: 0, status: 'idle' },
  'Right Side': { fileUrl: '', isAi: false, aiScore: 0, tamperingScore: 0, status: 'idle' },
  'Close-Up': { fileUrl: '', isAi: false, aiScore: 0, tamperingScore: 0, status: 'idle' }
};

function renderCustomerDashboard() {
  const user = db.state.user;
  const portalContent = document.getElementById('customer-dashboard-section');
  const suspendContent = document.getElementById('customer-suspended-section');
  
  if (user.account_status === 'suspended') {
    portalContent.style.display = 'none';
    suspendContent.style.display = 'block';
    
    // Check if appeal already filed
    const hasAppeal = db.state.appeals.some(a => a.customer_id === user.user_id && a.status === 'pending');
    document.getElementById('cust-appeal-form').style.display = hasAppeal ? 'none' : 'block';
    document.getElementById('cust-appeal-success').style.display = hasAppeal ? 'block' : 'none';
  } else {
    portalContent.style.display = 'block';
    suspendContent.style.display = 'none';

    // Populate Claim list
    const list = document.getElementById('customer-claims-list');
    list.innerHTML = '';
    const myClaims = db.state.claims.filter(c => c.customer_id === user.user_id);
    
    myClaims.forEach(c => {
      const card = document.createElement('div');
      card.className = 'glass-card hover-lift';
      card.style.padding = '1.25rem 1.5rem';
      card.style.marginBottom = '1rem';
      card.style.cursor = 'pointer';
      card.style.display = 'flex';
      card.style.justifyContent = 'space-between';
      card.style.alignItems = 'center';
      card.onclick = () => showClaimDetailTracker(c.claim_id);
      
      card.innerHTML = `
        <div style="text-align:left;">
          <div style="font-weight:700;font-size:0.9rem;display:flex;align-items:center;gap:0.5rem;">
            Order ${c.order_number} 
            <span style="font-family:var(--font-mono);font-size:0.7rem;color:hsl(var(--text-dim))">#${c.claim_id}</span>
          </div>
          <div style="font-size:0.75rem;color:hsl(var(--text-muted));margin-top:0.15rem;">${c.restaurant_name} • ${c.issue_category}</div>
          <div style="font-size:0.65rem;color:hsl(var(--text-dim));margin-top:0.25rem;">${new Date(c.submission_date).toLocaleDateString()}</div>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <span class="badge ${
            c.status === 'approved' ? 'badge-approved' :
            c.status === 'rejected' ? 'badge-rejected' :
            c.status === 'analyzing' ? 'badge-analyzing' :
            'badge-review'
          }">${c.status}</span>
          <span style="color:hsl(var(--text-dim))">➔</span>
        </div>
      `;
      list.appendChild(card);
    });

    if (myClaims.length === 0) {
      list.innerHTML = `<div style="text-align:center;padding:3rem;color:hsl(var(--text-dim));font-size:0.85rem;">You have no active or completed claims.</div>`;
    }
  }
  initIcons();
}

function renderCustomerOrderOptions() {
  const select = document.getElementById('cust-order-select');
  select.innerHTML = `<option value="">-- Choose Order --</option>`;
  db.state.orders.forEach(o => {
    select.innerHTML += `<option value="${o.order_id}">${o.restaurant_name} - ${o.order_number} (₹${o.amount})</option>`;
  });
}

function openClaimWizard() {
  activeStep = 1;
  resetWizardState();
  document.getElementById('customer-dashboard-section').style.display = 'none';
  document.getElementById('customer-wizard-section').style.display = 'block';
  updateWizardStepper();
}

function closeClaimWizard() {
  document.getElementById('customer-dashboard-section').style.display = 'block';
  document.getElementById('customer-wizard-section').style.display = 'none';
  renderCustomerDashboard();
}

function resetWizardState() {
  document.getElementById('cust-order-select').value = '';
  document.getElementById('cust-vercode-input').value = '';
  document.getElementById('cust-desc-input').value = '';
  document.getElementById('cust-video-matched-alert').style.display = 'none';
  
  // Reset categories
  document.querySelectorAll('.category-option').forEach(opt => opt.classList.remove('selected'));
  
  // Reset photo slots
  claimEvidenceFiles = {
    'Overhead': { fileUrl: '', isAi: false, aiScore: 0, tamperingScore: 0, status: 'idle' },
    'Left Side': { fileUrl: '', isAi: false, aiScore: 0, tamperingScore: 0, status: 'idle' },
    'Right Side': { fileUrl: '', isAi: false, aiScore: 0, tamperingScore: 0, status: 'idle' },
    'Close-Up': { fileUrl: '', isAi: false, aiScore: 0, tamperingScore: 0, status: 'idle' }
  };
  
  updatePhotoSlotsDisplay();
}

function updateWizardStepper() {
  // Update Dots
  document.querySelectorAll('.stepper-dot').forEach(dot => {
    const num = parseInt(dot.getAttribute('data-step'));
    dot.className = 'stepper-dot';
    if (num === activeStep) dot.classList.add('active');
    else if (num < activeStep) dot.classList.add('completed');
  });

  // Toggle View panels
  document.querySelectorAll('.wizard-step-view').forEach(panel => {
    const num = parseInt(panel.getAttribute('data-step'));
    panel.classList.toggle('active', num === activeStep);
  });
  
  // Button controls
  document.getElementById('cust-wizard-prev').style.display = activeStep === 1 ? 'none' : 'inline-flex';
  document.getElementById('cust-wizard-next').style.display = activeStep === 3 ? 'none' : 'inline-flex';
  document.getElementById('cust-wizard-submit').style.display = activeStep === 3 ? 'inline-flex' : 'none';
  initIcons();
}

function wizardGoNext() {
  if (activeStep === 1) {
    const orderId = document.getElementById('cust-order-select').value;
    if (!orderId) { alert("Please select an order."); return; }
  } else if (activeStep === 2) {
    const selectedCat = document.querySelector('.category-option.selected');
    if (!selectedCat) { alert("Please select a defect category."); return; }
    const desc = document.getElementById('cust-desc-input').value.trim();
    if (desc.length < 15) { alert("Please enter at least 15 characters describing the quality defect."); return; }
  }
  
  activeStep++;
  playBeep(900, 'sine', 0.08);
  updateWizardStepper();
}

function wizardGoPrev() {
  activeStep--;
  playBeep(700, 'sine', 0.08);
  updateWizardStepper();
}

function checkCustomerVerificationCode() {
  const code = document.getElementById('cust-vercode-input').value.trim();
  const alertDiv = document.getElementById('cust-video-matched-alert');
  const matchedVideo = db.state.videos.find(v => v.verification_code === code);
  
  if (code && matchedVideo) {
    alertDiv.className = "warning-banner warning";
    alertDiv.style.backgroundColor = 'hsla(142 70% 45% / 0.1)';
    alertDiv.style.borderColor = 'hsla(142 70% 45% / 0.2)';
    alertDiv.style.color = 'hsl(var(--success-green))';
    alertDiv.style.display = 'flex';
    alertDiv.querySelector('.banner-msg').innerHTML = `✅ <strong>Surveillance Match:</strong> Package packing recording found (${matchedVideo.duration}s logs verified).`;
    playBeep(950, 'sine', 0.15);
  } else if (code) {
    alertDiv.className = "warning-banner warning";
    alertDiv.style.backgroundColor = 'hsla(346 87% 50% / 0.1)';
    alertDiv.style.borderColor = 'hsla(346 87% 50% / 0.2)';
    alertDiv.style.color = 'hsl(var(--alert-red))';
    alertDiv.style.display = 'flex';
    alertDiv.querySelector('.banner-msg').innerHTML = `⚠️ <strong>Code Mismatch:</strong> No packaging clip matching this hash found on system ledger.`;
  } else {
    alertDiv.style.display = 'none';
  }
}

function selectCategoryOption(el, catTitle) {
  document.querySelectorAll('.category-option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');
  playBeep(750, 'sine', 0.05);

  // Load keywords based on category
  const keywordBox = document.getElementById('cust-keyword-suggestions');
  keywordBox.innerHTML = '';
  
  let keywords = ['cold', 'stale', 'spilled', 'seal'];
  if (catTitle.includes('Particles')) keywords = ['hair', 'strand', 'nail', 'bug', 'insect', 'unhygienic'];
  else if (catTitle.includes('Under')) keywords = ['raw', 'undercooked', 'blood', 'pink', 'tough'];
  else if (catTitle.includes('Over')) keywords = ['burnt', 'overcooked', 'dry', 'black', 'charred'];
  else if (catTitle.includes('Packaging')) keywords = ['leaked', 'loose lid', 'crushed', 'torn', 'soaked'];

  keywords.forEach(kw => {
    const badge = document.createElement('span');
    badge.className = 'keyword-badge';
    badge.innerText = `+ ${kw}`;
    badge.onclick = () => appendKeyword(kw);
    keywordBox.appendChild(badge);
  });
}

function appendKeyword(kw) {
  const descInput = document.getElementById('cust-desc-input');
  const space = descInput.value.trim() ? ' ' : '';
  if (!descInput.value.toLowerCase().includes(kw.toLowerCase())) {
    descInput.value = `${descInput.value.trim()}${space}${kw}`;
  }
}

function updatePhotoSlotsDisplay() {
  const grid = document.getElementById('photo-slots-element');
  grid.innerHTML = '';
  
  Object.entries(claimEvidenceFiles).forEach(([angle, file]) => {
    const card = document.createElement('div');
    card.className = 'photo-slot';
    
    if (file.status === 'idle') {
      card.innerHTML = `
        <div style="font-weight:700;font-size:0.7rem;color:hsl(var(--text-dim));margin-bottom:0.5rem;">${angle}</div>
        <div class="slot-actions">
          <button class="btn-mini btn-primary" onclick="simulateEvidenceScan('${angle}', 'genuine')">Genuine</button>
          <button class="btn-mini btn-red" onclick="simulateEvidenceScan('${angle}', 'ai')">AI Image</button>
        </div>
      `;
    } else if (file.status === 'scanning') {
      card.innerHTML = `
        <div style="font-weight:700;font-size:0.7rem;color:hsl(var(--text-dim));">${angle}</div>
        <div style="margin-top:0.5rem;font-size:0.65rem;color:hsl(var(--accent-purple));animation:pulse 0.8s infinite alternate;">Forensics Running...</div>
      `;
    } else if (file.status === 'failed') {
      card.innerHTML = `
        <div style="font-weight:700;font-size:0.7rem;color:hsl(var(--alert-red));">${angle}</div>
        <div style="font-size:0.6rem;color:hsl(var(--alert-red));margin-top:0.25rem;">AI Generated (92%)</div>
        <button class="btn-mini btn-secondary" style="margin-top:0.5rem;" onclick="resetEvidenceSlot('${angle}')">Retry</button>
      `;
    } else if (file.status === 'success') {
      card.innerHTML = `
        <img src="${file.fileUrl}" />
        <div style="position:absolute;bottom:0.25rem;left:0.25rem;background:rgba(0,0,0,0.7);padding:0.15rem 0.35rem;border-radius:0.25rem;font-size:0.6rem;color:hsl(var(--success-green));font-weight:700;z-index:5;">
          ${angle} Verified
        </div>
        <button class="btn-mini btn-red" style="position:absolute;top:0.25rem;right:0.25rem;z-index:5;padding:0.2rem;" onclick="resetEvidenceSlot('${angle}')">✕</button>
      `;
    }
    grid.appendChild(card);
  });
  initIcons();
}

function simulateEvidenceScan(angle, type) {
  claimEvidenceFiles[angle].status = 'scanning';
  updatePhotoSlotsDisplay();
  playBeep(600, 'sine', 0.1);

  setTimeout(() => {
    if (type === 'ai') {
      playBeep(350, 'triangle', 0.4);
      claimEvidenceFiles[angle] = {
        fileUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400',
        isAi: true,
        aiScore: 92,
        tamperingScore: 84,
        status: 'failed'
      };
    } else {
      playBeep(950, 'sine', 0.12);
      const urls = {
        'Overhead': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        'Left Side': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400',
        'Right Side': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400',
        'Close-Up': 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=400'
      };
      claimEvidenceFiles[angle] = {
        fileUrl: urls[angle],
        isAi: false,
        aiScore: 3,
        tamperingScore: 1,
        status: 'success'
      };
    }
    updatePhotoSlotsDisplay();
  }, 1200);
}

function simulateGenuineAllEvidence() {
  playBeep(800, 'sine', 0.08);
  Object.keys(claimEvidenceFiles).forEach(angle => {
    simulateEvidenceScan(angle, 'genuine');
  });
}

function resetEvidenceSlot(angle) {
  claimEvidenceFiles[angle] = { fileUrl: '', isAi: false, aiScore: 0, tamperingScore: 0, status: 'idle' };
  updatePhotoSlotsDisplay();
  playBeep(400, 'sine', 0.1);
}

function submitCustomerClaim(e) {
  if (e) e.preventDefault();
  
  const files = Object.values(claimEvidenceFiles);
  const incomplete = files.some(f => f.status !== 'success');
  
  if (incomplete) {
    alert("Please upload and scan all 4 mandatory photo angles successfully before submitting.");
    return;
  }

  const orderId = document.getElementById('cust-order-select').value;
  const orderObj = db.state.orders.find(o => o.order_id === orderId);
  const category = document.querySelector('.category-option.selected').querySelector('h5').innerText;
  const desc = document.getElementById('cust-desc-input').value;
  const code = document.getElementById('cust-vercode-input').value.trim();

  // If synthetic images uploaded (mocked)
  const isAiGen = files.some(f => f.isAi);
  const maxAiScore = Math.max(...files.map(f => f.aiScore));
  
  const claimData = {
    customer_id: db.state.user.user_id,
    customer_name: db.state.user.full_name,
    customer_phone: db.state.user.phone,
    order_id: orderId,
    order_number: orderObj.order_number,
    restaurant_id: orderObj.restaurant_id,
    restaurant_name: orderObj.restaurant_name,
    issue_category: category,
    description: desc,
    status: isAiGen ? 'review' : 'analyzing',
    submission_date: new Date().toISOString(),
    ai_fraud_score: isAiGen ? maxAiScore : 12,
    ai_recommendation: isAiGen ? 'REJECT' : 'APPROVE',
    final_decision: null,
    admin_id: null,
    refund_amount: orderObj.amount,
    reason_for_decision: '',
    linked_video_code: code || null,
    gps_location: '19.0760° N, 72.8777° E'
  };

  const evidencePayload = Object.entries(claimEvidenceFiles).map(([angle, file]) => ({
    evidence_type: 'photo',
    file_url: file.fileUrl,
    ai_generated_score: file.aiScore,
    tampering_score: file.tamperingScore,
    angle_label: angle,
    blur_score: 5,
    brightness_score: 70,
    uploaded_at: new Date().toISOString()
  }));

  const claim_id = `CLA-${Math.floor(1000 + Math.random() * 9000)}`;
  const formattedEvidence = evidencePayload.map((ev, idx) => ({
    ...ev,
    evidence_id: `EV-${claim_id}-${idx}`,
    claim_id: claim_id
  }));

  const newClaim = {
    ...claimData,
    claim_id,
    created_at: new Date().toISOString(),
    evidence: formattedEvidence
  };

  db.state.claims.unshift(newClaim);
  
  // Auto warnings checks
  if (isAiGen) {
    const nextFlags = db.state.user.fraud_flag_count + 1;
    let status = 'warning';
    let banned = null;
    if (nextFlags >= 2) {
      status = 'suspended';
      const date = new Date();
      date.setDate(date.getDate() + 30);
      banned = date.toISOString();
    }
    db.state.user.fraud_flag_count = nextFlags;
    db.state.user.account_status = status;
    db.state.user.banned_until = banned;

    db.state.auditLogs.unshift({
      log_id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      admin_name: "Forensics Guard",
      action: status === 'suspended' ? "Account Suspended" : "Fraud Warning Triggered",
      details: `${db.state.user.full_name} uploaded synthetic photo evidence (AI flag: ${maxAiScore}%).`,
      timestamp: new Date().toISOString()
    });
  }

  db.save();
  playBeep(1100, 'sine', 0.35);

  // Close wizard and view tracker
  document.getElementById('customer-wizard-section').style.display = 'none';
  showClaimDetailTracker(claim_id);
}

function showClaimDetailTracker(claimId) {
  selectedClaimId = claimId;
  const claim = db.state.claims.find(c => c.claim_id === claimId);
  document.getElementById('customer-dashboard-section').style.display = 'none';
  document.getElementById('customer-tracker-section').style.display = 'block';

  // Details
  document.getElementById('cust-tracker-id').innerText = `#${claim.claim_id}`;
  const statusBadge = document.getElementById('cust-tracker-status');
  statusBadge.innerText = claim.status.toUpperCase();
  statusBadge.className = `badge ${
    claim.status === 'approved' ? 'badge-approved' :
    claim.status === 'rejected' ? 'badge-rejected' :
    claim.status === 'analyzing' ? 'badge-analyzing' :
    'badge-review'
  }`;

  // Build Timeline nodes
  const nodesBox = document.getElementById('cust-tracker-timeline');
  nodesBox.innerHTML = `
    <div class="timeline-node completed">
      <div style="font-weight:700;font-size:0.8rem;color:hsl(var(--text-main))">Dispute Logged</div>
      <div style="font-size:0.7rem;color:hsl(var(--text-muted))">${new Date(claim.created_at).toLocaleTimeString()}</div>
    </div>
    <div class="timeline-node ${claim.status !== 'submitted' ? 'completed' : 'active'}">
      <div style="font-weight:700;font-size:0.8rem;color:hsl(var(--text-main))">Image Forensics Scan</div>
      <div style="font-size:0.7rem;color:hsl(var(--text-muted))">Checking EXIF tags & deep learning generation layers.</div>
    </div>
    <div class="timeline-node ${['approved', 'rejected'].includes(claim.status) ? 'completed' : claim.status === 'review' ? 'active' : ''}">
      <div style="font-weight:700;font-size:0.8rem;color:hsl(var(--text-main))">Dispute Audit Decision</div>
      <div style="font-size:0.7rem;color:hsl(var(--text-muted))">Manual video comparison ledger verification.</div>
    </div>
  `;

  // Decision details block
  const decisionBlock = document.getElementById('cust-tracker-decision');
  if (claim.final_decision) {
    decisionBlock.style.display = 'block';
    decisionBlock.className = claim.final_decision === 'approved' ? 'glass-card' : 'glass-card';
    decisionBlock.style.borderColor = claim.final_decision === 'approved' ? 'hsla(142 70% 45% / 0.3)' : 'hsla(346 87% 50% / 0.3)';
    
    decisionBlock.innerHTML = `
      <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;color:hsl(var(--text-dim));margin-bottom:0.25rem;">Final Security Decision</div>
      <div style="font-size:0.8rem;font-weight:500;">${claim.reason_for_decision}</div>
      ${claim.final_decision === 'approved' ? `
        <div style="margin-top:0.75rem;padding:0.5rem;background:hsl(var(--bg-input));border:1px solid hsl(var(--border-color));border-radius:0.5rem;font-family:var(--font-mono);font-size:0.7rem;display:flex;justify-content:between;">
          <span style="color:hsl(var(--success-green));font-weight:700;">₹${claim.refund_amount} REFUND DISBURSED</span>
          <span style="color:hsl(var(--text-dim));">TXN-RZP-84920</span>
        </div>
      ` : ''}
    `;
  } else {
    decisionBlock.style.display = 'none';
  }

  // Report panel
  document.getElementById('cust-report-auth').innerText = claim.ai_fraud_score > 60 ? '❌ Generated (CLIP Flagged)' : '✅ 97% Genuine';
  document.getElementById('cust-report-tamper').innerText = claim.ai_fraud_score > 60 ? '⚠️ High Manipulation (Photoshop/AI)' : '✅ Untampered';
  document.getElementById('cust-report-code').innerText = claim.linked_video_code ? '✅ Code Match' : '⚠️ No Code Entered';
  
  const scoreSpan = document.getElementById('cust-report-score');
  scoreSpan.innerText = `${claim.ai_fraud_score}%`;
  scoreSpan.className = `badge ${claim.ai_fraud_score > 60 ? 'badge-rejected' : claim.ai_fraud_score > 30 ? 'badge-review' : 'badge-approved'}`;

  // Evidence Photos grid
  const photosDiv = document.getElementById('cust-tracker-evidence-grid');
  photosDiv.innerHTML = '';
  claim.evidence.forEach(ev => {
    photosDiv.innerHTML += `
      <div style="aspect-ratio:1.3;border-radius:0.75rem;overflow:hidden;border:1px solid hsl(var(--border-color));position:relative;">
        <img src="${ev.file_url}" style="width:100%;height:100%;object-fit:cover;" />
        <span style="position:absolute;bottom:0.25rem;left:0.25rem;background:rgba(0,0,0,0.6);padding:0.1rem 0.25rem;border-radius:0.25rem;font-size:0.6rem;color:white;">${ev.angle_label}</span>
      </div>
    `;
  });
  initIcons();
}

function returnToCustomerClaims() {
  document.getElementById('customer-tracker-section').style.display = 'none';
  document.getElementById('customer-dashboard-section').style.display = 'block';
  renderCustomerDashboard();
}

function submitCustomerBanAppeal(e) {
  e.preventDefault();
  const val = document.getElementById('cust-appeal-text').value.trim();
  if (!val) return;

  const user = db.state.user;
  db.state.appeals.push({
    appeal_id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
    customer_id: user.user_id,
    claim_id: null,
    reason: val,
    status: 'pending',
    created_at: new Date().toISOString()
  });

  db.state.auditLogs.unshift({
    log_id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    admin_name: "System Security",
    action: "Appeal Logged",
    details: `${user.full_name} submitted appeal: "${val.substring(0, 35)}..."`,
    timestamp: new Date().toISOString()
  });

  db.save();
  playBeep(980, 'sine', 0.2);
  
  document.getElementById('cust-appeal-form').style.display = 'none';
  document.getElementById('cust-appeal-success').style.display = 'block';
}


// 8. SECURITY ADMIN PORTAL ENGINE
let selectedDisputeId = null;
let activeAdminPhotoIdx = 0;
let adminZoom = 1;
let adminBrightness = 100;
let adminContrast = 100;

function handleAdminLogin(e) {
  e.preventDefault();
  const pass = document.getElementById('admin-pass-input').value;
  if (pass === 'admin123') {
    document.getElementById('admin-auth-pwd').style.display = 'none';
    document.getElementById('admin-auth-mfa').style.display = 'block';
    playBeep(900, 'sine', 0.1);
  } else {
    alert("Invalid credentials! (Hint: use admin123)");
    playBeep(250, 'triangle', 0.35);
  }
}

function handleAdminMfa(e) {
  e.preventDefault();
  const code = document.getElementById('admin-mfa-input').value;
  if (code === '654321') {
    document.getElementById('admin-login-wrapper').style.display = 'none';
    document.getElementById('admin-dashboard-section').style.display = 'block';
    switchAdminTab('disputes');
    playBeep(1100, 'sine', 0.2);
  } else {
    alert("Invalid 2FA! (Hint: use 654321)");
    playBeep(250, 'triangle', 0.35);
  }
}

function switchAdminTab(tab) {
  document.querySelectorAll('.portal-nav-btn.red-accent').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
  });
  
  document.querySelectorAll('.admin-tab-view').forEach(view => {
    view.style.display = view.id === `admin-${tab}-view` ? 'block' : 'none';
  });

  if (tab === 'disputes') {
    renderAdminClaimsTable();
  } else if (tab === 'analytics') {
    renderAdminAnalytics();
  } else if (tab === 'users') {
    renderAdminUsersRegistry();
  } else if (tab === 'settings') {
    renderAdminSettingsForm();
  }
}

function renderAdminClaimsTable() {
  const claimsListDiv = document.getElementById('admin-claims-list-panel');
  const detailsDiv = document.getElementById('admin-claim-details-panel');
  
  claimsListDiv.style.display = 'block';
  detailsDiv.style.display = 'none';

  // Stats
  const pending = db.state.claims.filter(c => ['submitted', 'analyzing', 'review'].includes(c.status)).length;
  const approvedSum = db.state.claims.filter(c => c.status === 'approved').reduce((acc, c) => acc + c.refund_amount, 0);
  const rejected = db.state.claims.filter(c => c.status === 'rejected').length;
  const highRisks = db.state.claims.filter(c => c.ai_fraud_score > 60).length;

  document.getElementById('admin-stat-pending').innerText = pending;
  document.getElementById('admin-stat-disbursed').innerText = `₹${approvedSum}`;
  document.getElementById('admin-stat-rejected').innerText = rejected;
  document.getElementById('admin-stat-flags').innerText = highRisks;

  // Search filter
  const searchVal = document.getElementById('admin-claims-search').value.toLowerCase();
  const statusFilter = document.getElementById('admin-claims-status-filter').value;
  const riskFilter = document.getElementById('admin-claims-risk-filter').value;

  const tbody = document.getElementById('admin-claims-tbody');
  tbody.innerHTML = '';

  const filtered = db.state.claims.filter(c => {
    const matchesSearch = c.customer_name.toLowerCase().includes(searchVal) || c.claim_id.toLowerCase().includes(searchVal) || c.order_number.toLowerCase().includes(searchVal);
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    
    let matchesRisk = true;
    if (riskFilter === 'high') matchesRisk = c.ai_fraud_score > 60;
    else if (riskFilter === 'medium') matchesRisk = c.ai_fraud_score >= 30 && c.ai_fraud_score <= 60;
    else if (riskFilter === 'low') matchesRisk = c.ai_fraud_score < 30;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  filtered.forEach(c => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.onclick = () => selectAdminDispute(c.claim_id);
    tr.innerHTML = `
      <td class="font-bold" style="color:hsl(var(--text-main))">#${c.claim_id}</td>
      <td>
        <div style="font-weight:600;color:hsl(var(--text-main))">${c.customer_name}</div>
        <div style="font-size:0.65rem;color:hsl(var(--text-dim))">${c.customer_phone}</div>
      </td>
      <td>
        <div style="font-family:var(--font-mono)">${c.order_number}</div>
        <div style="font-size:0.65rem;color:hsl(var(--text-dim))">₹${c.refund_amount}</div>
      </td>
      <td>${c.issue_category}</td>
      <td>
        <span class="badge ${c.ai_fraud_score > 60 ? 'badge-rejected' : c.ai_fraud_score > 30 ? 'badge-review' : 'badge-approved'}">
          ${c.ai_fraud_score}% Risk
        </span>
      </td>
      <td>
        <span class="badge ${
          c.status === 'approved' ? 'badge-approved' :
          c.status === 'rejected' ? 'badge-rejected' :
          c.status === 'analyzing' ? 'badge-analyzing' :
          'badge-review'
        }">${c.status}</span>
      </td>
      <td style="text-align:right">
        <button class="btn-mini btn-primary">Audit</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:3rem;color:hsl(var(--text-dim));">No claims match active filters.</td></tr>`;
  }
  initIcons();
}

function selectAdminDispute(claimId) {
  selectedDisputeId = claimId;
  activeAdminPhotoIdx = 0;
  adminZoom = 1;
  adminBrightness = 100;
  adminContrast = 100;
  
  document.getElementById('admin-claims-list-panel').style.display = 'none';
  const panel = document.getElementById('admin-claim-details-panel');
  panel.style.display = 'block';

  const claim = db.state.claims.find(c => c.claim_id === claimId);
  const matchedVideo = claim.linked_video_code ? db.state.videos.find(v => v.verification_code === claim.linked_video_code) : null;

  document.getElementById('admin-detail-title').innerText = `Auditing Case #${claim.claim_id}`;
  document.getElementById('admin-detail-fraud-score').innerText = `AI Fraud Risk: ${claim.ai_fraud_score}%`;
  
  const fsBadge = document.getElementById('admin-detail-fraud-score');
  fsBadge.className = `badge ${claim.ai_fraud_score > 60 ? 'badge-rejected' : claim.ai_fraud_score > 30 ? 'badge-review' : 'badge-approved'}`;

  // 1. Left Feed: Packaging Video Log
  const leftVideoCol = document.getElementById('admin-col-video');
  if (matchedVideo) {
    leftVideoCol.innerHTML = `
      <div style="font-size:0.75rem;font-weight:700;color:hsl(var(--text-muted));text-transform:uppercase;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.35rem;">
        🎥 Kitchen Packaging Ledger Verified
      </div>
      <div class="evidence-carousel-wrapper" style="display:flex;align-items:center;justify-content:center;font-size:3rem;color:white;position:relative;">
        ${matchedVideo.thumbnail_url}
        <div style="position:absolute;top:0.5rem;right:0.5rem;background:rgba(0,0,0,0.7);padding:0.15rem 0.35rem;border-radius:0.25rem;font-size:0.6rem;font-family:var(--font-mono);color:hsl(var(--text-dim));">
          ${matchedVideo.duration}s logs
        </div>
      </div>
      <div class="logs-list" style="height:auto;margin-top:0.75rem;font-size:0.65rem;">
        <div style="font-weight:700;color:hsl(var(--text-main));margin-bottom:0.25rem;">Video metadata analysis</div>
        <div>Lid packing tape: <strong>${matchedVideo.ai_analysis.packaging_integrity}</strong></div>
        <div>Visual freshness rating: <strong>${matchedVideo.quality_score}% score</strong></div>
        <div>Contaminant warnings: <strong>${matchedVideo.ai_analysis.foreign_particles_detected.length ? '1 Flagged' : '0 Flags'}</strong></div>
        <div style="margin-top:0.25rem;color:hsl(var(--text-dim));font-size:0.6rem;">GPS Verification: ${matchedVideo.gps_location}</div>
        <div style="color:hsl(var(--text-dim));font-size:0.6rem;">Chef: ${matchedVideo.staff_id} - ${matchedVideo.staff_name}</div>
      </div>
    `;
  } else {
    leftVideoCol.innerHTML = `
      <div style="font-size:0.75rem;font-weight:700;color:hsl(var(--text-muted));text-transform:uppercase;margin-bottom:0.5rem;">
        ⚠️ Video Surveillance Offline
      </div>
      <div class="evidence-carousel-wrapper" style="display:flex;flex-direction:column;align-items:center;justify-content:center;color:hsl(var(--text-dim));text-align:center;padding:1.5rem;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">⛔</div>
        <div style="font-size:0.75rem;font-weight:700;color:hsl(var(--text-muted))">No Verification Token Entered</div>
        <div style="font-size:0.65rem;max-width:180px;margin-top:0.25rem;">Side-by-side ledger audits are unavailable for untokenized dispute uploads.</div>
      </div>
    `;
  }

  // 2. Right Feed: Customer evidence photo carousel
  updateAdminEvidenceCarousel();

  // 3. AI report summary columns
  document.getElementById('admin-report-ai-score').innerText = `${claim.evidence[activeAdminPhotoIdx]?.ai_generated_score || 0}%`;
  document.getElementById('admin-report-metadata').innerText = `✅ EXIF Tags Consistent`;
  document.getElementById('admin-report-visual').innerText = matchedVideo ? `⚠️ Discrepancy present (Hair found in photo not in packaging)` : 'Inconclusive (No video)';

  // 4. Load quick response templates
  document.getElementById('admin-notes-input').value = '';
  loadAdminTemplate('approve_particle');
  
  playBeep(800, 'sine', 0.1);
  initIcons();
}

function updateAdminEvidenceCarousel() {
  const claim = db.state.claims.find(c => c.claim_id === selectedDisputeId);
  const carouselBox = document.getElementById('admin-col-evidence');
  
  carouselBox.innerHTML = `
    <div style="font-size:0.75rem;font-weight:700;color:hsl(var(--text-muted));text-transform:uppercase;margin-bottom:0.5rem;display:flex;justify-content:between;">
      <span>📷 Customer Photo Uploads</span>
      <span style="font-family:var(--font-mono);font-size:0.65rem;">${activeAdminPhotoIdx + 1} / ${claim.evidence.length}</span>
    </div>
    
    <div class="evidence-carousel-wrapper">
      <img id="admin-carousel-img" src="${claim.evidence[activeAdminPhotoIdx].file_url}" class="evidence-image-carousel" style="transform:scale(${adminZoom});filter:brightness(${adminBrightness}%) contrast(${adminContrast}%);" />
      
      <!-- Zoom Slider -->
      <div style="position:absolute;bottom:0.5rem;right:0.5rem;background:rgba(0,0,0,0.7);padding:0.25rem 0.5rem;border-radius:0.5rem;display:flex;align-items:center;gap:0.35rem;z-index:10;">
        <span style="font-size:0.65rem;color:white;font-weight:700;">Zoom</span>
        <input type="range" min="1" max="3" step="0.1" value="${adminZoom}" oninput="adjustAdminZoom(this.value)" style="width:60px;" />
      </div>
    </div>

    <!-- Thumbnails navigation -->
    <div style="display:flex;gap:0.35rem;justify-content:center;margin-top:0.75rem;">
      ${claim.evidence.map((ev, idx) => `
        <div onclick="selectAdminCarouselIdx(${idx})" style="width:40px;height:40px;border-radius:0.5rem;overflow:hidden;cursor:pointer;border:2px solid ${idx === activeAdminPhotoIdx ? 'hsl(var(--accent-purple))' : 'hsl(var(--border-color))'};opacity:${idx === activeAdminPhotoIdx ? '1' : '0.6'};">
          <img src="${ev.file_url}" style="width:100%;height:100%;object-fit:cover;" />
        </div>
      `).join('')}
    </div>

    <!-- Controls sliders brightness & contrast -->
    <div class="logs-list" style="height:auto;margin-top:0.75rem;padding:0.75rem 1rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
      <div class="form-group" style="margin-bottom:0;">
        <label class="form-label">Brightness (${adminBrightness}%)</label>
        <input type="range" min="50" max="150" value="${adminBrightness}" oninput="adjustAdminFilters('brightness', this.value)" />
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label class="form-label">Contrast (${adminContrast}%)</label>
        <input type="range" min="50" max="150" value="${adminContrast}" oninput="adjustAdminFilters('contrast', this.value)" />
      </div>
    </div>
  `;
}

function selectAdminCarouselIdx(idx) {
  activeAdminPhotoIdx = idx;
  adminZoom = 1;
  updateAdminEvidenceCarousel();
  
  // Re-read AI forensic scores
  const claim = db.state.claims.find(c => c.claim_id === selectedDisputeId);
  document.getElementById('admin-report-ai-score').innerText = `${claim.evidence[idx]?.ai_generated_score || 0}%`;
}

function adjustAdminZoom(val) {
  adminZoom = parseFloat(val);
  const img = document.getElementById('admin-carousel-img');
  if (img) img.style.transform = `scale(${adminZoom})`;
}

function adjustAdminFilters(filter, val) {
  if (filter === 'brightness') adminBrightness = parseInt(val);
  else if (filter === 'contrast') adminContrast = parseInt(val);
  
  const img = document.getElementById('admin-carousel-img');
  if (img) img.style.filter = `brightness(${adminBrightness}%) contrast(${adminContrast}%)`;
  
  // Quick re-update labels
  updateAdminEvidenceCarousel();
}

function loadAdminTemplate(tplName) {
  const claim = db.state.claims.find(c => c.claim_id === selectedDisputeId);
  const tpls = {
    approve_particle: {
      subject: "FoodShield Refund Approved - Food Contamination Detected",
      body: `Hello ${claim.customer_name},\n\nWe have reviewed claim #${claim.claim_id} for your order from ${claim.restaurant_name}. Our forensic image analysis has verified the presence of a foreign particle (Hair/Insect) with high confidence. A refund of ₹${claim.refund_amount} has been authorized and dispatched to your original payment method.\n\nBest regards,\nFoodShield Security`
    },
    approve_leak: {
      subject: "FoodShield Refund Approved - Damaged Packaging Leakage",
      body: `Hello ${claim.customer_name},\n\nWe have reviewed claim #${claim.claim_id} for your order from ${claim.restaurant_name}. The split-screen verification audit indicates box-sealing errors. A refund of ₹${claim.refund_amount} has been approved and Razorpay processing initiated.\n\nBest regards,\nFoodShield Security`
    },
    reject_ai: {
      subject: "FoodShield Claim Declined - Synthetic Evidence Warning",
      body: `Hello ${claim.customer_name},\n\nWe regret to inform you that claim #${claim.claim_id} has been rejected. Our CLIP & Deep Learning image models flagged the submitted evidence photos as highly likely to be AI-generated (92% likelihood). Please note that submitting synthetic images violates our platform terms of service and has resulted in a fraud flag on your account.\n\nBest regards,\nFoodShield Security Office`
    },
    reject_mismatch: {
      subject: "FoodShield Claim Declined - Video Match Discrepancy",
      body: `Hello ${claim.customer_name},\n\nWe have audited claim #${claim.claim_id} alongside the restaurant's packing records. The kitchen's H.265 video log shows the food was perfectly packed without contaminants immediately before seal, and the customer photos contain structural alterations. The dispute has been declined.\n\nBest regards,\nFoodShield Security`
    }
  };

  const selected = tpls[tplName] || tpls.approve_particle;
  document.getElementById('admin-email-text').value = `${selected.subject}\n\n${selected.body}`;
}

function adminResolveClaim(decision) {
  const claim = db.state.claims.find(c => c.claim_id === selectedDisputeId);
  const notes = document.getElementById('admin-notes-input').value.trim() || 'Resolved via Security Operations panel.';

  claim.status = decision === 'approved' ? 'approved' : 'rejected';
  claim.final_decision = decision;
  claim.reason_for_decision = notes;
  claim.admin_id = 'ADM-101';

  // Add system audit log
  db.state.auditLogs.unshift({
    log_id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    admin_name: "Security Admin (You)",
    action: decision === 'approved' ? "Claim Approved" : "Claim Rejected",
    details: `${decision === 'approved' ? 'Approved refund of ₹' + claim.refund_amount : 'Rejected dispute'} for Claim #${claim.claim_id} (${claim.customer_name}). Notes: ${notes}`,
    timestamp: new Date().toISOString()
  });

  db.save();
  playBeep(decision === 'approved' ? 1200 : 300, 'sine', 0.3);

  // Return to list
  selectedDisputeId = null;
  renderAdminClaimsTable();
}

// 9. ADMIN METRICS & SECURITY AUDITS
function renderAdminAnalytics() {
  const auditDiv = document.getElementById('admin-audit-logs');
  auditDiv.innerHTML = '';
  
  db.state.auditLogs.forEach(log => {
    const isWarn = log.action.includes('Warning') || log.action.includes('Suspended');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.style.borderLeft = `2px solid ${isWarn ? 'hsl(var(--alert-red))' : 'hsl(var(--accent-blue))'}`;
    entry.style.paddingLeft = '0.75rem';
    entry.style.marginBottom = '0.75rem';
    
    entry.innerHTML = `
      <div style="font-weight:700;color:white;display:flex;align-items:center;gap:0.35rem;">
        ${log.action}
        <span style="font-family:var(--font-mono);font-size:0.65rem;color:hsl(var(--text-dim))">#${log.log_id}</span>
      </div>
      <div style="color:hsl(var(--text-muted));margin-top:0.15rem;line-height:1.4;">${log.details}</div>
      <div style="font-size:0.65rem;color:hsl(var(--text-dim));margin-top:0.25rem;font-family:var(--font-mono);">
        ${new Date(log.timestamp).toLocaleTimeString()} • Operator: ${log.admin_name}
      </div>
    `;
    auditDiv.appendChild(entry);
  });

  // Dynamic SVG Chart rendering for disputes volumes
  const highRisks = db.state.claims.filter(c => c.ai_fraud_score > 60).length;
  const total = db.state.claims.length;
  
  // Custom simple responsive bar height calculation
  document.getElementById('svg-claim-bar-5').setAttribute('height', (8 * 3).toString());
  document.getElementById('svg-claim-bar-6').setAttribute('height', (total * 8).toString());
  document.getElementById('svg-claim-bar-6').setAttribute('y', (180 - (total * 8)).toString());

  document.getElementById('svg-fraud-bar-5').setAttribute('height', (4 * 3).toString());
  document.getElementById('svg-fraud-bar-6').setAttribute('height', (highRisks * 8).toString());
  document.getElementById('svg-fraud-bar-6').setAttribute('y', (180 - (highRisks * 8)).toString());
  initIcons();
}

// 10. ADMIN REGISTRY
function renderAdminUsersRegistry() {
  const container = document.getElementById('admin-users-box');
  const user = db.state.user;
  
  container.innerHTML = `
    <div class="glass-card" style="display:flex;justify-content:between;align-items:center;gap:1.5rem;flex-wrap:wrap;">
      <div style="display:flex;align-items:center;gap:1rem;">
        <img src="${user.profile_image}" style="width:3.5rem;height:3.5rem;border-radius:50%;border:2px solid hsl(var(--border-color))" />
        <div style="text-align:left;">
          <h4 style="font-size:1rem;color:white;">${user.full_name}</h4>
          <p style="font-size:0.75rem;color:hsl(var(--text-muted))">${user.phone} • ${user.email}</p>
          <div style="font-size:0.7rem;font-weight:700;margin-top:0.35rem;font-family:var(--font-mono)">
            Status: <span style="color:${user.account_status === 'suspended' ? 'hsl(var(--alert-red))' : user.account_status === 'warning' ? 'hsl(var(--warning-yellow))' : 'hsl(var(--success-green))'}">
              ${user.account_status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      
      <div style="text-align:right;font-size:0.75rem;">
        <span style="color:hsl(var(--text-dim));display:block;">Ensemble fraud flags count</span>
        <span style="font-size:1.5rem;font-weight:800;color:white;font-family:var(--font-mono);">${user.fraud_flag_count} / 2</span>
      </div>

      <div style="display:flex;gap:0.5rem;width:100%;justify-content:end;margin-top:0.5rem;">
        <button class="btn btn-secondary" style="width:auto;height:2.25rem;font-size:0.75rem;" onclick="adminUpdateUserWarning(1)">Set 1 Warning Flag</button>
        <button class="btn btn-red" style="width:auto;height:2.25rem;font-size:0.75rem;" onclick="adminUpdateUserWarning(2)">Trigger Suspended Account</button>
        <button class="btn btn-green" style="width:auto;height:2.25rem;font-size:0.75rem;" onclick="adminUpdateUserWarning(0)">Clear Warning State</button>
      </div>
    </div>
  `;
  initIcons();
}

function adminUpdateUserWarning(count) {
  let status = 'active';
  let banned = null;
  
  if (count === 1) status = 'warning';
  else if (count >= 2) {
    status = 'suspended';
    const date = new Date();
    date.setDate(date.getDate() + 30);
    banned = date.toISOString();
  }

  db.state.user.fraud_flag_count = count;
  db.state.user.account_status = status;
  db.state.user.banned_until = banned;
  db.save();
  playBeep(980, 'sine', 0.25);
  
  renderAdminUsersRegistry();
  updateWarningBanners();
}

// 11. ADMIN CONFIG SETTINGS
function renderAdminSettingsForm() {
  const settings = db.state.settings;
  document.getElementById('admin-set-approval').value = settings.autoApprovalThreshold;
  document.getElementById('admin-set-rejection').value = settings.autoRejectionThreshold;
  document.getElementById('admin-set-vidrequired').checked = settings.videoRequired;
  document.getElementById('admin-set-blockchain').checked = settings.blockchainEnabled;
}

function adminSaveSettings(e) {
  e.preventDefault();
  db.state.settings.autoApprovalThreshold = parseInt(document.getElementById('admin-set-approval').value);
  db.state.settings.autoRejectionThreshold = parseInt(document.getElementById('admin-set-rejection').value);
  db.state.settings.videoRequired = document.getElementById('admin-set-vidrequired').checked;
  db.state.settings.blockchainEnabled = document.getElementById('admin-set-blockchain').checked;
  
  db.save();
  playBeep(1000, 'sine', 0.15);
  alert("System settings committed to blockchain ledger.");
}


// 12. INITIALIZATION ROUTER EVENT BINDINGS
window.addEventListener('DOMContentLoaded', () => {
  db.init();

  // Set initial layouts toggles
  updateTheme();
  switchRole(db.state.activeRole);
  
  // Set language dropdown sync
  const langSelect = document.getElementById('lang-select');
  langSelect.value = db.state.language;
  updateLanguage();

  // 1. Language Dropdown Change Event
  langSelect.addEventListener('change', (e) => {
    db.state.language = e.target.value;
    localStorage.setItem('fs_lang', e.target.value);
    playBeep(900, 'sine', 0.08);
    updateLanguage();
  });

  // 2. Theme Toggle Event
  document.getElementById('theme-toggle').addEventListener('click', () => {
    db.state.theme = db.state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('fs_theme', db.state.theme);
    playBeep(850, 'sine', 0.08);
    updateTheme();
  });

  // 3. Warning Close Banner Click Event
  document.getElementById('close-warning-btn').addEventListener('click', () => {
    document.getElementById('account-warning-banner').style.display = 'none';
  });

  // Init Idle conveyer canvas states
  discardRecording();
  initIcons();
});

// Modal playback controls
function showVideoModal(videoId) {
  const v = db.state.videos.find(item => item.video_id === videoId);
  if (!v) return;

  const overlay = document.getElementById('video-playback-modal');
  overlay.style.display = 'flex';
  playBeep(800, 'sine', 0.12);

  document.getElementById('modal-title-header').innerText = `Logs for Video Verification Code: ${v.verification_code}`;
  document.getElementById('modal-duration').innerText = `Length: ${v.duration} seconds`;
  document.getElementById('modal-operator').innerText = `Chef: ${v.staff_name}`;
  document.getElementById('modal-freshness').innerText = `${v.ai_analysis.food_quality_score}%`;
  document.getElementById('modal-seal-integrity').innerText = v.ai_analysis.packaging_integrity;
  document.getElementById('modal-particles').innerText = v.ai_analysis.foreign_particles_detected.length ? 'Hair Strand Flagged' : 'None Detected';
}

function closeVideoModal() {
  document.getElementById('video-playback-modal').style.display = 'none';
}
