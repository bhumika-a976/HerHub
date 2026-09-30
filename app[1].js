/**
 * HerHub - Core Application Logic
 * State management, intelligent matching engine, gap analysis, and interactive checklist tracker
 */

// Application State
const state = {
  profile: null,
  opportunities: [...OPPORTUNITIES_DATA],
  filteredOpportunities: [...OPPORTUNITIES_DATA],
  activeCategory: 'All',
  searchQuery: '',
  isAgentSearching: false,
  agentStepIndex: 0,
  activeOpportunity: null,
  trackedOpportunities: {}, // { [oppId]: { stage: 'Saved'|'Preparing'|'Applied'|'Completed', checklist: { [docName]: boolean }, dateAdded: string } }
  activeTab: 'home', // 'home' | 'profile' | 'dashboard' | 'tracker'
  filterEligibility: 'All' // 'All' | 'Eligible' | 'Potentially' | 'NotEligible'
};

// Storage Keys
const STORAGE_KEYS = {
  PROFILE: 'herhub_user_profile',
  TRACKER: 'herhub_tracked_opportunities'
};

// Initialize Application
function initApp() {
  loadStoredData();
  applyFiltersAndSearch('');
  renderApp();
  setupEventListeners();
}

// Load Stored Data or default to Demo Profile
function loadStoredData() {
  const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (savedProfile) {
    try {
      state.profile = JSON.parse(savedProfile);
    } catch (e) {
      state.profile = { ...DEFAULT_DEMO_PROFILE };
    }
  } else {
    // Default to demo profile for immediate hackathon demonstration
    state.profile = { ...DEFAULT_DEMO_PROFILE };
    saveProfileToStorage();
  }

  const savedTracker = localStorage.getItem(STORAGE_KEYS.TRACKER);
  if (savedTracker) {
    try {
      state.trackedOpportunities = JSON.parse(savedTracker);
    } catch (e) {
      state.trackedOpportunities = {};
    }
  } else {
    // Seed initial demo tracked items for Bhumika so tracker displays realistic state
    state.trackedOpportunities = {
      'amazon-wow-2026': {
        stage: 'Saved',
        checklist: {
          'Latest Resume / CV with technical projects': true,
          'College Identity Card': true,
          'Semester Grade Transcripts / Marksheets (Sem 1 to latest)': false,
          'Valid Government Photo ID': false
        },
        dateAdded: '2026-09-28'
      },
      'microsoft-engage-2026': {
        stage: 'Preparing',
        checklist: {
          'Resume with GitHub / coding profile links': true,
          'College Student ID card': true,
          'Current Semester Marksheet / Proof of 2nd year enrollment': true
        },
        dateAdded: '2026-09-27'
      }
    };
    saveTrackerToStorage();
  }
}

function saveProfileToStorage() {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(state.profile));
}

function saveTrackerToStorage() {
  localStorage.setItem(STORAGE_KEYS.TRACKER, JSON.stringify(state.trackedOpportunities));
}

// ==========================================
// INTELLIGENT MATCHING & ELIGIBILITY ENGINE
// ==========================================

/**
 * Evaluates an opportunity against the user's profile
 * Returns: { status, statusClass, statusLabel, matchReasons, gapReasons, canApplyNow }
 */
function evaluateEligibility(opp, profile = state.profile) {
  if (!profile) {
    return {
      status: 'Check Requirements',
      statusClass: 'status-info',
      statusLabel: '🔵 Relevant — Check Requirements',
      matchReasons: ['Profile not configured yet'],
      gapReasons: [],
      canApplyNow: true
    };
  }

  const matchReasons = [];
  const gapReasons = [];
  let isYearEligible = false;
  let isCgpaEligible = false;
  let isDegreeEligible = false;
  let isSkillMatched = false;

  // 1. Year of study check
  const allowedYears = opp.eligibilityCriteria.allowedYears || [];
  if (allowedYears.includes(profile.year) || allowedYears.includes("Any") || allowedYears.includes("All Years")) {
    isYearEligible = true;
    matchReasons.push(`✓ ${profile.year} accepted`);
  } else {
    gapReasons.push({
      rule: `Requires ${allowedYears.join(' or ')}`,
      userState: `You are currently in ${profile.year}`,
      type: 'year'
    });
  }

  // 2. Degree / Branch check
  const allowedDegrees = opp.eligibilityCriteria.allowedDegrees || [];
  const degreeMatches = allowedDegrees.some(deg => 
    profile.education.toLowerCase().includes(deg.toLowerCase()) ||
    profile.branch.toLowerCase().includes(deg.toLowerCase()) ||
    deg.toLowerCase().includes('any')
  );
  if (degreeMatches) {
    isDegreeEligible = true;
    matchReasons.push(`✓ Engineering (${profile.branch}) student`);
  } else {
    gapReasons.push({
      rule: `Targeted to: ${allowedDegrees.join(', ')}`,
      userState: `Your branch is ${profile.branch}`,
      type: 'degree'
    });
  }

  // 3. CGPA cutoff check
  const minCgpa = opp.eligibilityCriteria.minCgpa || 0;
  if (profile.cgpa >= minCgpa) {
    isCgpaEligible = true;
    if (minCgpa > 0) {
      matchReasons.push(`✓ Meets CGPA requirement (${profile.cgpa} >= ${minCgpa})`);
    } else {
      matchReasons.push(`✓ No minimum CGPA cutoff required`);
    }
  } else {
    gapReasons.push({
      rule: `Requires minimum CGPA of ${minCgpa}`,
      userState: `Your current CGPA is ${profile.cgpa}`,
      type: 'cgpa'
    });
  }

  // 4. Gender / Diversity check
  if (opp.eligibilityCriteria.genderFocus) {
    matchReasons.push(`✓ Women applicants eligible (${opp.eligibilityCriteria.genderFocus})`);
  }

  // 5. Skills overlap check
  const oppSkills = opp.eligibilityCriteria.requiredSkills || [];
  const userSkills = profile.skills || [];
  const matchedSkills = userSkills.filter(s => 
    oppSkills.some(req => req.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(req.toLowerCase()))
  );
  if (matchedSkills.length > 0) {
    isSkillMatched = true;
    matchReasons.push(`✓ Skill match: ${matchedSkills.join(', ')}`);
  }

  // 6. Cost check
  if (opp.cost.toLowerCase().includes('free') || opp.cost.toLowerCase().includes('stipend')) {
    matchReasons.push(`✓ 100% Free / Stipend provided`);
  }

  // Determine overall status
  let status = '';
  let statusClass = '';
  let statusLabel = '';
  let canApplyNow = false;

  if (isYearEligible && isDegreeEligible && isCgpaEligible) {
    status = 'Eligible';
    statusClass = 'status-eligible';
    statusLabel = '🟢 Eligible';
    canApplyNow = true;
  } else if (!isYearEligible && isDegreeEligible && isCgpaEligible) {
    status = 'Not Eligible';
    statusClass = 'status-not-eligible';
    statusLabel = '🔴 Not Eligible (Year Gap)';
    canApplyNow = false;
  } else if (!isCgpaEligible) {
    status = 'Not Eligible';
    statusClass = 'status-not-eligible';
    statusLabel = '🔴 Not Eligible (CGPA Cutoff)';
    canApplyNow = false;
  } else if (isYearEligible && isCgpaEligible && !isDegreeEligible) {
    status = 'Potentially Eligible';
    statusClass = 'status-potential';
    statusLabel = '🟡 Potentially Eligible';
    canApplyNow = true;
  } else {
    status = 'Relevant';
    statusClass = 'status-info';
    statusLabel = '🔵 Relevant — Check Requirements';
    canApplyNow = true;
  }

  return {
    status,
    statusClass,
    statusLabel,
    matchReasons,
    gapReasons,
    canApplyNow,
    isYearGap: !isYearEligible,
    allowedYears
  };
}

// ==========================================
// CONVERSATIONAL SEARCH & AGENT REASONING
// ==========================================

/**
 * Handles conversational queries with agentic step simulation
 */
function performConversationalSearch(query) {
  state.searchQuery = query;
  state.isAgentSearching = true;
  state.agentStepIndex = 0;

  renderAgentReasoningView();

  const steps = [
    `Understanding profile for ${state.profile?.name || 'Applicant'} (${state.profile?.year}, ${state.profile?.branch}, CGPA ${state.profile?.cgpa})`,
    `Analyzing query intent: "${query}"`,
    `Evaluating criteria across 18 curated programs`,
    `Running gap analysis on prerequisite years & skills`,
    `Generating personalized matches and preparation plans`
  ];

  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    state.agentStepIndex = currentStep;
    updateAgentReasoningSteps(steps, currentStep);

    if (currentStep >= steps.length) {
      clearInterval(interval);
      setTimeout(() => {
        state.isAgentSearching = false;
        applyFiltersAndSearch(query);
        renderApp();
        // Smooth scroll to results
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    }
  }, 220);
}

/**
 * Weighted multi-factor search and relevance filter
 */
function applyFiltersAndSearch(query = state.searchQuery) {
  const cleanQuery = (query || '').toLowerCase().trim();
  
  if (!cleanQuery && state.activeCategory === 'All' && state.filterEligibility === 'All') {
    state.filteredOpportunities = [...state.opportunities].sort((a, b) => {
      const evalA = evaluateEligibility(a);
      const evalB = evaluateEligibility(b);
      if (evalA.status === 'Eligible' && evalB.status !== 'Eligible') return -1;
      if (evalA.status !== 'Eligible' && evalB.status === 'Eligible') return 1;
      return new Date(a.deadline) - new Date(b.deadline);
    });
    return;
  }

  // Detect specific query intents
  const wantsAi = cleanQuery.includes('ai') || cleanQuery.includes('machine learning') || cleanQuery.includes('ml');
  const wantsIntern = cleanQuery.includes('intern') || cleanQuery.includes('summer');
  const wantsScholarship = cleanQuery.includes('scholarship') || cleanQuery.includes('grant') || cleanQuery.includes('tuition');
  const wantsHackathon = cleanQuery.includes('hackathon') || cleanQuery.includes('challenge') || cleanQuery.includes('competition');
  const wantsMentorship = cleanQuery.includes('mentor') || cleanQuery.includes('mentorship');
  const wantsFellowship = cleanQuery.includes('fellowship') || cleanQuery.includes('fellow');
  const wantsLearning = cleanQuery.includes('learning') || cleanQuery.includes('bootcamp') || cleanQuery.includes('course');
  const wantsWomenInTech = cleanQuery.includes('women') || cleanQuery.includes('girls') || cleanQuery.includes('female');
  const wantsEngineering = cleanQuery.includes('engineer') || cleanQuery.includes('cs') || cleanQuery.includes('tech');
  const wantsFree = cleanQuery.includes('free') || cleanQuery.includes('stipend') || cleanQuery.includes('₹0');

  const scored = state.opportunities.map(opp => {
    let score = 0;
    const oppText = (opp.name + ' ' + opp.organization + ' ' + opp.category + ' ' + opp.description + ' ' + (opp.tags || []).join(' ')).toLowerCase();

    // 1. Category Filter check
    if (state.activeCategory !== 'All' && opp.category !== state.activeCategory) {
      return { opp, score: -1 };
    }

    // 2. Eligibility Filter check
    const evalResult = evaluateEligibility(opp);
    if (state.filterEligibility === 'Eligible' && evalResult.status !== 'Eligible') return { opp, score: -1 };
    if (state.filterEligibility === 'Potentially' && evalResult.status !== 'Potentially Eligible') return { opp, score: -1 };
    if (state.filterEligibility === 'NotEligible' && evalResult.status !== 'Not Eligible') return { opp, score: -1 };

    if (!cleanQuery) {
      score = 50;
      if (evalResult.status === 'Eligible') score += 50;
      return { opp, score };
    }

    // AI intent
    const isAiOpp = (opp.tags || []).includes('AI') || /\b(ai|artificial intelligence|machine learning|deep learning)\b/i.test(oppText);
    if (wantsAi) {
      if (isAiOpp) score += 55;
      else score -= 35; // strong penalty if query specifically asks for AI and opportunity is not AI
    }

    // Internship intent
    const isInternOpp = opp.category === 'Internships' || (opp.tags || []).includes('Internship') || opp.benefits.internshipOrJob;
    if (wantsIntern) {
      if (isInternOpp) {
        score += 50;
        if (opp.category === 'Internships') score += 25;
      } else {
        score -= 40; // penalize non-internships when user specifically asked for internships
      }
    }

    // Scholarship intent
    if (wantsScholarship) {
      if (opp.category === 'Scholarships' || opp.tags.includes('Scholarship')) score += 55;
      else score -= 30;
    }

    // Hackathon intent
    if (wantsHackathon) {
      if (opp.category === 'Hackathons' || opp.tags.includes('Hackathon')) score += 55;
      else score -= 30;
    }

    // Mentorship intent
    if (wantsMentorship) {
      if (opp.category === 'Mentorship' || opp.benefits.mentorship) score += 55;
      else score -= 25;
    }

    // Fellowship intent
    if (wantsFellowship) {
      if (opp.category === 'Fellowships' || opp.tags.includes('Fellowship')) score += 55;
      else score -= 25;
    }

    // Learning intent
    if (wantsLearning) {
      if (opp.category === 'Learning' || opp.tags.includes('Learning')) score += 55;
      else score -= 25;
    }

    // Women in Tech focus
    if (wantsWomenInTech) {
      if (opp.eligibilityCriteria.genderFocus.includes('Women') || opp.tags.includes('Women in Tech')) score += 30;
    }

    // Engineering focus
    if (wantsEngineering) {
      if (opp.eligibilityCriteria.allowedDegrees.some(d => d.includes('Engineering') || d.includes('Computer Science'))) score += 20;
    }

    // Free / Stipend focus
    if (wantsFree) {
      if (opp.cost.toLowerCase().includes('free') || opp.costType === 'Free') score += 25;
    }

    // Exact matches in name / organization
    if (opp.name.toLowerCase().includes(cleanQuery)) score += 60;
    if (opp.organization.toLowerCase().includes(cleanQuery)) score += 40;

    // Token overlap
    const tokens = cleanQuery.split(/\s+/).filter(t => t.length > 2 && !['find', 'me', 'for', 'this', 'show', 'want', 'the', 'and', 'with', 'from', 'can', 'are', 'you'].includes(t));
    tokens.forEach(t => {
      if (oppText.includes(t)) score += 12;
    });

    // Profile match bonus
    if (evalResult.status === 'Eligible') score += 30;
    else if (evalResult.status === 'Potentially Eligible') score += 15;

    return { opp, score };
  });

  state.filteredOpportunities = scored
    .filter(item => item.score > 25)
    .sort((a, b) => b.score - a.score || (new Date(a.opp.deadline) - new Date(b.opp.deadline)))
    .map(item => item.opp);

  // Fallback: if zero results, do a broad token search
  if (state.filteredOpportunities.length === 0 && cleanQuery) {
    state.filteredOpportunities = state.opportunities.filter(opp => {
      const oppText = (opp.name + ' ' + opp.organization + ' ' + opp.category + ' ' + opp.description).toLowerCase();
      const tokens = cleanQuery.split(/\s+/).filter(t => t.length > 2);
      return tokens.some(t => oppText.includes(t));
    });
  }
}

// ==========================================
// APPLICATION TRACKER & CHECKLIST ACTIONS
// ==========================================

function toggleTrackOpportunity(oppId, stage = 'Saved') {
  if (state.trackedOpportunities[oppId]) {
    delete state.trackedOpportunities[oppId];
  } else {
    const opp = state.opportunities.find(o => o.id === oppId);
    const initialChecklist = {};
    if (opp && opp.requiredDocuments) {
      opp.requiredDocuments.forEach(doc => {
        initialChecklist[doc] = false;
      });
    }
    state.trackedOpportunities[oppId] = {
      stage: stage,
      checklist: initialChecklist,
      dateAdded: new Date().toISOString().split('T')[0]
    };
  }
  saveTrackerToStorage();
  renderApp();
}

function updateTrackedStage(oppId, newStage) {
  if (state.trackedOpportunities[oppId]) {
    state.trackedOpportunities[oppId].stage = newStage;
    saveTrackerToStorage();
    renderApp();
  }
}

function toggleChecklistItem(oppId, docName) {
  if (!state.trackedOpportunities[oppId]) {
    startApplicationPreparation(oppId);
  }
  
  if (state.trackedOpportunities[oppId]) {
    const current = state.trackedOpportunities[oppId].checklist[docName] || false;
    state.trackedOpportunities[oppId].checklist[docName] = !current;
    
    // Auto-advance to 'Preparing' if items are being checked
    if (state.trackedOpportunities[oppId].stage === 'Saved') {
      state.trackedOpportunities[oppId].stage = 'Preparing';
    }
    saveTrackerToStorage();
    renderApp();
    
    // If modal is open, re-render modal content
    if (state.activeOpportunity && state.activeOpportunity.id === oppId) {
      renderOpportunityModalContent(state.activeOpportunity);
    }
  }
}

function startApplicationPreparation(oppId) {
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  if (!state.trackedOpportunities[oppId]) {
    const initialChecklist = {};
    (opp.requiredDocuments || []).forEach(doc => {
      initialChecklist[doc] = false;
    });
    state.trackedOpportunities[oppId] = {
      stage: 'Preparing',
      checklist: initialChecklist,
      dateAdded: new Date().toISOString().split('T')[0]
    };
  } else {
    state.trackedOpportunities[oppId].stage = 'Preparing';
  }
  saveTrackerToStorage();
  renderApp();
  
  // If modal is open, refresh and scroll to checklist
  if (state.activeOpportunity && state.activeOpportunity.id === oppId) {
    renderOpportunityModalContent(opp);
    setTimeout(() => {
      const checklistSection = document.getElementById('modal-checklist-section');
      if (checklistSection) {
        checklistSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}

// ==========================================
// UI RENDERING - CORE PAGES
// ==========================================

function renderApp() {
  const mainRoot = document.getElementById('app-root');
  if (!mainRoot) return;

  mainRoot.innerHTML = `
    ${renderNavbar()}
    ${
      state.activeTab === 'home' ? renderLandingPage() :
      state.activeTab === 'profile' ? renderProfilePage() :
      state.activeTab === 'tracker' ? renderTrackerPage() :
      renderDashboardPage()
    }
    ${renderOpportunityModal()}
    ${renderFooter()}
  `;

  attachDynamicBindings();
}

function renderNavbar() {
  const trackerCount = Object.keys(state.trackedOpportunities).length;

  return `
    <header class="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Logo -->
        <div class="flex items-center gap-3 cursor-pointer" onclick="navigateTab('home')">
          <div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/20">
            <div class="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <span class="text-xl font-black bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">H</span>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-bold tracking-tight text-white">HerHub</span>
              <span class="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full">AI Match</span>
            </div>
            <p class="text-[11px] text-slate-400 hidden sm:block">Intelligent Opportunity Discovery</p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="flex items-center gap-1 sm:gap-2">
          
          <button onclick="navigateTab('home')" class="px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${state.activeTab === 'home' ? 'text-white bg-slate-800/80 border border-purple-500/30 shadow-sm shadow-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-900'}">
            <span>Home</span>
          </button>

          <button onclick="navigateTab('dashboard')" class="px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${state.activeTab === 'dashboard' ? 'text-white bg-slate-800/80 border border-purple-500/30 shadow-sm shadow-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-900'}">
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              Discover
            </span>
          </button>
          
          <button onclick="navigateTab('tracker')" class="relative px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${state.activeTab === 'tracker' ? 'text-white bg-slate-800/80 border border-purple-500/30 shadow-sm shadow-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-900'}">
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              My Opportunities
              ${trackerCount > 0 ? `<span class="ml-1 px-1.5 py-0.2 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">${trackerCount}</span>` : ''}
            </span>
          </button>

          <button onclick="navigateTab('profile')" class="px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${state.activeTab === 'profile' ? 'text-white bg-slate-800/80 border border-purple-500/30 shadow-sm shadow-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-900'}">
            <span class="flex items-center gap-2">
              <div class="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                ${state.profile?.name ? state.profile.name[0].toUpperCase() : 'B'}
              </div>
              <span class="hidden md:inline">${state.profile?.name || 'Profile'}</span>
            </span>
          </button>

        </nav>
      </div>
    </header>
  `;
}

// ==========================================
// 1. LANDING PAGE VIEW
// ==========================================

function renderLandingPage() {
  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      
      <!-- Hero Section -->
      <section class="relative overflow-hidden pt-14 pb-20 lg:pt-20 lg:pb-24 border-b border-slate-800/60">
        <!-- Glow ambient background -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-purple-600/20 via-indigo-500/15 to-cyan-500/20 blur-3xl pointer-events-none rounded-full"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6 shadow-inner">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Empowering Young Women Across STEM & Technology
          </div>

          <!-- Hero Headline -->
          <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            HERHUB
          </h1>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-200 mt-4 max-w-3xl mx-auto">
            Find the opportunity. <br class="sm:hidden" />
            <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">Understand your fit.</span> Take the next step.
          </h2>

          <!-- Supporting text -->
          <p class="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            "Your personalized hub for scholarships, internships, mentorships, hackathons and career opportunities."
          </p>

          <!-- Action Buttons -->
          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            
            <button onclick="navigateTab('profile')" class="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 text-base">
              <span>Find My Opportunities</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
            
            <button onclick="navigateTab('dashboard')" class="px-8 py-4 rounded-xl font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all flex items-center gap-2.5 text-base">
              <span>Explore Opportunities</span>
              <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            <!-- 1-Click Live Demo Shortcut -->
            <button onclick="runCompleteDemoFlow()" class="px-6 py-4 rounded-xl font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 transition-all flex items-center gap-2 text-sm shadow-lg">
              <span>⚡ Run 3-Min Live Demo Flow</span>
            </button>

          </div>

          <!-- The Journey Flow: DISCOVER -> MATCH -> PREPARE -> APPLY -> TRACK -> GROW -->
          <div class="mt-16 pt-12 border-t border-slate-800/80 max-w-5xl mx-auto">
            <div class="flex items-center justify-center gap-2 mb-6">
              <span class="h-[1px] w-8 bg-purple-500/40"></span>
              <p class="text-xs uppercase font-extrabold tracking-widest text-purple-400">The HerHub 6-Stage Journey</p>
              <span class="h-[1px] w-8 bg-purple-500/40"></span>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              ${[
                { step: '01', title: 'DISCOVER', icon: '🔍', desc: 'Curated STEM openings' },
                { step: '02', title: 'MATCH', icon: '⚡', desc: 'AI profile eligibility' },
                { step: '03', title: 'PREPARE', icon: '📋', desc: 'Document checklist' },
                { step: '04', title: 'APPLY', icon: '🚀', desc: 'Official direct portals' },
                { step: '05', title: 'TRACK', icon: '📊', desc: 'Deadlines & Kanban' },
                { step: '06', title: 'GROW', icon: '🌱', desc: 'Mentorship & careers' }
              ].map((s, idx) => `
                <div class="relative group p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all text-left">
                  <div class="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span class="font-mono text-[10px] text-purple-400">${s.step}</span>
                    <span class="text-lg">${s.icon}</span>
                  </div>
                  <div class="font-black text-sm text-white group-hover:text-purple-300 transition-colors">${s.title}</div>
                  <p class="text-[11px] text-slate-400 mt-1 leading-snug">${s.desc}</p>
                  ${idx < 5 ? `<div class="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-purple-400/50 text-xs font-black z-20">→</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Flowing Opportunities Representation -->
          <div class="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 max-w-4xl mx-auto shadow-2xl relative">
            
            <div class="text-xs uppercase font-bold text-slate-400 mb-3 tracking-wider">
              Scattered across the internet → Flowing into your personalized hub
            </div>

            <div class="flex flex-wrap items-center justify-center gap-2.5 mb-4 text-xs font-semibold">
              <span class="px-3.5 py-1.5 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-700/40 animate-pulse">🎓 Generation Google Scholarship</span>
              <span class="px-3.5 py-1.5 rounded-lg bg-purple-950/80 text-purple-300 border border-purple-700/40">💻 Outreachy AI Internship</span>
              <span class="px-3.5 py-1.5 rounded-lg bg-pink-950/80 text-pink-300 border border-pink-700/40">🤝 Uber She++ Mentorship</span>
              <span class="px-3.5 py-1.5 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-700/40 animate-pulse">🏆 Smart India Hackathon</span>
              <span class="px-3.5 py-1.5 rounded-lg bg-blue-950/80 text-blue-300 border border-blue-700/40">💻 Amazon WoW India</span>
            </div>

            <div class="flex items-center justify-center gap-3 text-slate-400 text-xs my-3">
              <span class="w-16 h-[1px] bg-gradient-to-r from-transparent to-purple-500"></span>
              <span class="font-mono text-purple-300 font-bold">⚡ HerHub AI Match & Eligibility Core ⚡</span>
              <span class="w-16 h-[1px] bg-gradient-to-l from-transparent to-purple-500"></span>
            </div>

            <!-- Stats Ribbon -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
              <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div class="text-2xl font-black text-cyan-300">18+</div>
                <div class="text-[11px] text-slate-400 mt-0.5">Curated STEM Openings</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div class="text-2xl font-black text-purple-300">100% Free</div>
                <div class="text-[11px] text-slate-400 mt-0.5">Zero Application Fees</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div class="text-2xl font-black text-pink-300">Gap Analysis</div>
                <div class="text-[11px] text-slate-400 mt-0.5">Know Exactly What's Missing</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div class="text-2xl font-black text-emerald-300">Official Links</div>
                <div class="text-[11px] text-slate-400 mt-0.5">Verified Direct Portals</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- Three Pillars Section -->
      <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div class="text-3xl mb-3">🔍</div>
            <h3 class="text-base font-bold text-white">Understand Your Real Fit</h3>
            <p class="text-xs text-slate-400 mt-2 leading-relaxed">No arbitrary "92% match" scores. HerHub evaluates degree, year, CGPA, gender focus, and skills to provide transparent criteria validation.</p>
          </div>

          <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div class="text-3xl mb-3">⚠️</div>
            <h3 class="text-base font-bold text-white">Actionable Gap Analysis</h3>
            <p class="text-xs text-slate-400 mt-2 leading-relaxed">Not eligible for a 3rd-year program yet? HerHub explains what prerequisite is missing, sets reminders for future cohorts, and suggests immediate alternatives.</p>
          </div>

          <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div class="text-3xl mb-3">📋</div>
            <h3 class="text-base font-bold text-white">Application Readiness</h3>
            <p class="text-xs text-slate-400 mt-2 leading-relaxed">Generate targeted checklists for every opportunity (Resume, Transcripts, SOP, ID Proofs) and track your progress across Saved, Preparing, Applied, and Offered.</p>
          </div>
        </div>
      </section>

    </div>
  `;
}

// ==========================================
// 2. USER PROFILE ONBOARDING VIEW
// ==========================================

function renderProfilePage() {
  const p = state.profile || { ...DEFAULT_DEMO_PROFILE };

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-2">
              Step 1 of 2: Profile & Matching Preferences
            </div>
            <h1 class="text-3xl font-extrabold text-white">Tell HerHub About Yourself</h1>
            <p class="text-slate-400 text-sm mt-1">This information affects personalized recommendations, eligibility status, and gap analysis.</p>
          </div>
          
          <button type="button" onclick="loadDemoProfileAndSearch()" class="px-4 py-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-900/80 text-purple-200 border border-purple-500/40 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-md flex-shrink-0">
            <span>⚡ Load Demo Profile (Bhumika)</span>
          </button>
        </div>

        <!-- Privacy Shield Banner -->
        <div class="mb-8 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
          <span class="text-2xl">🛡️</span>
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300">Privacy & Security Guarantee</h4>
            <p class="text-xs text-slate-400 mt-0.5">HerHub will never ask for sensitive credentials such as Aadhaar, PAN, passwords, OTPs, or bank account numbers. Your data is stored locally in your browser.</p>
          </div>
        </div>

        <!-- Profile Form -->
        <form onsubmit="handleProfileSave(event)" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800">
            
            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
              <input type="text" id="prof-name" value="${p.name || ''}" required class="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Education Level</label>
              <select id="prof-education" class="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none">
                <option value="Engineering" ${p.education === 'Engineering' ? 'selected' : ''}>Engineering (B.Tech / B.E.)</option>
                <option value="Postgraduate" ${p.education === 'Postgraduate' ? 'selected' : ''}>Postgraduate (M.Tech / MS / MCA)</option>
                <option value="Science / BCA" ${p.education === 'Science / BCA' ? 'selected' : ''}>Science / BCA / B.Sc</option>
                <option value="Diploma" ${p.education === 'Diploma' ? 'selected' : ''}>Diploma / Polytechnic</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Course / Branch</label>
              <input type="text" id="prof-branch" value="${p.branch || ''}" required class="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Year of Study</label>
              <select id="prof-year" class="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none">
                <option value="1st Year" ${p.year === '1st Year' ? 'selected' : ''}>1st Year</option>
                <option value="2nd Year" ${p.year === '2nd Year' ? 'selected' : ''}>2nd Year</option>
                <option value="3rd Year" ${p.year === '3rd Year' ? 'selected' : ''}>3rd Year</option>
                <option value="4th Year" ${p.year === '4th Year' ? 'selected' : ''}>4th Year</option>
                <option value="Graduates" ${p.year === 'Graduates' ? 'selected' : ''}>Graduates</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">College / University</label>
              <input type="text" id="prof-college" value="${p.college || ''}" class="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Location</label>
              <input type="text" id="prof-location" value="${p.location || ''}" class="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">CGPA / Percentage (out of 10.0)</label>
              <input type="number" step="0.1" min="0" max="10" id="prof-cgpa" value="${p.cgpa || ''}" required class="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Budget Preference</label>
              <select id="prof-budget" class="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none">
                <option value="Free / ₹0" ${p.budgetPreference === 'Free / ₹0' ? 'selected' : ''}>Free / ₹0 (Fully funded & Stipends)</option>
                <option value="Low Cost" ${p.budgetPreference === 'Low Cost' ? 'selected' : ''}>Low Cost / Nominal</option>
                <option value="Any" ${p.budgetPreference === 'Any' ? 'selected' : ''}>Any Budget</option>
              </select>
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Skills (comma-separated)</label>
              <input type="text" id="prof-skills" value="${(p.skills || []).join(', ')}" placeholder="e.g. C, Python, JavaScript, Machine Learning" class="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" />
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Interests (comma-separated)</label>
              <input type="text" id="prof-interests" value="${(p.interests || []).join(', ')}" placeholder="e.g. AI, Technology, Open Source" class="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" />
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Career Goals (comma-separated)</label>
              <input type="text" id="prof-goals" value="${(p.goals || []).join(', ')}" placeholder="e.g. Internship, Hackathon, Learning" class="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" />
            </div>

          </div>

          <div class="flex items-center justify-end gap-3">
            <button type="button" onclick="navigateTab('dashboard')" class="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-all">
              Cancel
            </button>
            <button type="submit" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center gap-2">
              <span>Save Profile & Launch Dashboard</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
}

// ==========================================
// 3. DASHBOARD VIEW (DISCOVER & SEARCH)
// ==========================================

function renderDashboardPage() {
  const profileName = state.profile?.name || 'Bhumika';

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100">
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="search-section">
        
        <!-- User Greeting & Profile Snippet -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/30 border border-slate-800 shadow-xl">
          <div>
            <div class="flex items-center gap-3">
              <h2 class="text-2xl sm:text-4xl font-black text-white">Hi, ${profileName} 👋</h2>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Profile Active</span>
            </div>
            <p class="text-slate-300 text-base sm:text-lg mt-1 font-medium">Let's find opportunities made for you.</p>
            
            <div class="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-400">
              <span class="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium">🎓 ${state.profile?.branch || 'Computer Science'} (${state.profile?.year || '2nd Year'})</span>
              <span class="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium">📊 CGPA: ${state.profile?.cgpa || '8.1'}</span>
              <span class="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium">💻 Skills: ${(state.profile?.skills || ['C', 'Python']).join(', ')}</span>
              <span class="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium">🎯 Goals: ${(state.profile?.goals || ['Internship', 'Hackathon']).join(', ')}</span>
            </div>
          </div>

          <div class="flex items-center gap-2.5 self-start md:self-auto">
            <button onclick="navigateTab('profile')" class="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Edit Profile
            </button>
            <button onclick="loadDemoProfileAndSearch()" class="px-4 py-2 text-xs font-semibold rounded-lg bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 border border-purple-500/40 transition-all flex items-center gap-1.5">
              <span>⚡ Reset Demo</span>
            </button>
          </div>
        </div>

        <!-- Large Conversational Search Box -->
        <div class="mb-10">
          <div class="relative rounded-2xl bg-gradient-to-r from-purple-500/30 via-indigo-500/20 to-cyan-500/30 p-[2px] shadow-2xl">
            <div class="bg-slate-900 rounded-[14px] p-2 sm:p-3">
              <form id="search-form" onsubmit="handleSearchSubmit(event)" class="flex items-center gap-2">
                <div class="pl-3 text-purple-400">
                  <svg class="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <input 
                  type="text" 
                  id="search-input"
                  value="${state.searchQuery}"
                  placeholder="Tell me what you're looking for..." 
                  class="w-full bg-transparent text-white placeholder-slate-400 text-base sm:text-lg focus:outline-none px-2 py-2.5 font-medium"
                />
                <button 
                  type="submit" 
                  class="px-5 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2 flex-shrink-0"
                >
                  <span class="hidden sm:inline">Ask HerHub AI</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </form>
            </div>
          </div>

          <!-- Example Prompts (Clickable!) -->
          <div class="mt-4">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>Example Prompts:</span>
            </p>
            <div class="flex flex-wrap gap-2">
              ${[
                "Find me free AI internships for this summer.",
                "Show scholarships for engineering students.",
                "Find women-in-tech programs.",
                "I want a hackathon.",
                "Find mentorship opportunities.",
                "Show me opportunities I can apply for right now."
              ].map(prompt => `
                <button 
                  onclick="triggerPrompt('${prompt.replace(/'/g, "\\'")}')"
                  class="text-xs px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-purple-500/40 transition-all flex items-center gap-1.5"
                >
                  <span class="text-purple-400">✨</span>
                  "${prompt}"
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Category Cards -->
        <div class="mb-10">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Browse by Category</h3>
            <span class="text-xs text-slate-400">${state.opportunities.length} Curated Programs</span>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            ${[
              { id: 'All', name: 'All Categories', icon: '🌟', count: state.opportunities.length },
              { id: 'Scholarships', name: 'Scholarships', icon: '🎓', count: state.opportunities.filter(o => o.category === 'Scholarships').length },
              { id: 'Internships', name: 'Internships', icon: '💻', count: state.opportunities.filter(o => o.category === 'Internships').length },
              { id: 'Hackathons', name: 'Hackathons', icon: '🏆', count: state.opportunities.filter(o => o.category === 'Hackathons').length },
              { id: 'Mentorship', name: 'Mentorship', icon: '🤝', count: state.opportunities.filter(o => o.category === 'Mentorship').length },
              { id: 'Fellowships', name: 'Fellowships', icon: '🔬', count: state.opportunities.filter(o => o.category === 'Fellowships').length },
              { id: 'Learning', name: 'Learning', icon: '📚', count: state.opportunities.filter(o => o.category === 'Learning').length }
            ].map(cat => `
              <button 
                onclick="setCategoryFilter('${cat.id}')"
                class="p-3.5 rounded-xl text-left transition-all border ${state.activeCategory === cat.id ? 'bg-gradient-to-br from-purple-900/40 to-slate-900 border-purple-500/50 shadow-md shadow-purple-500/10' : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800'}"
              >
                <div class="text-2xl mb-1.5">${cat.icon}</div>
                <div class="text-xs font-bold text-white truncate">${cat.name}</div>
                <div class="text-[11px] text-slate-400 mt-0.5">${cat.count} openings</div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Agent Reasoning View Container (Shown dynamically during search) -->
        <div id="agent-reasoning-container"></div>

        <!-- Filter & Results Header -->
        <div id="results-section" class="pt-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 class="text-xl font-bold text-white flex items-center gap-2">
              <span>Personalized Opportunities</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                ${state.filteredOpportunities.length} matches
              </span>
            </h3>
            ${state.searchQuery ? `<p class="text-xs text-slate-400 mt-1">Showing matches for: <span class="text-purple-300 font-semibold">"${state.searchQuery}"</span></p>` : ''}
          </div>

          <!-- Eligibility Filter Chips -->
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-xs text-slate-400 mr-1 hidden sm:inline">Filter by Status:</span>
            ${[
              { id: 'All', label: 'All' },
              { id: 'Eligible', label: '🟢 Eligible' },
              { id: 'Potentially', label: '🟡 Potentially' },
              { id: 'NotEligible', label: '🔴 Gaps / Future' }
            ].map(f => `
              <button 
                onclick="setEligibilityFilter('${f.id}')"
                class="px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${state.filterEligibility === f.id ? 'bg-purple-600 text-white font-semibold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'}"
              >
                ${f.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Opportunity Cards Grid -->
        ${renderOpportunityCardsGrid()}
      </main>
    </div>
  `;
}

function renderOpportunityCardsGrid() {
  if (state.filteredOpportunities.length === 0) {
    return `
      <div class="text-center py-16 px-4 rounded-2xl bg-slate-900/60 border border-slate-800 my-8">
        <div class="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-3xl mx-auto mb-4">🔍</div>
        <h4 class="text-lg font-bold text-white">No opportunities matched your exact filter</h4>
        <p class="text-sm text-slate-400 max-w-md mx-auto mt-1 mb-6">Try broadening your search query or switching categories to explore more programs.</p>
        <button onclick="resetSearchFilters()" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all">
          Clear Filters & Show All
        </button>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${state.filteredOpportunities.map(opp => renderOpportunityCard(opp)).join('')}
    </div>
  `;
}

function renderOpportunityCard(opp) {
  const evalResult = evaluateEligibility(opp);
  const isTracked = !!state.trackedOpportunities[opp.id];
  const trackedStage = isTracked ? state.trackedOpportunities[opp.id].stage : null;

  return `
    <div class="group relative rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-purple-500/10">
      
      <!-- Top banner & Category -->
      <div class="p-5 pb-3">
        <div class="flex items-start justify-between gap-3 mb-2.5">
          <span class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-800/90 text-purple-300 border border-purple-500/20">
            ${opp.category}
          </span>
          
          <!-- Save / Track Button -->
          <button 
            onclick="toggleTrackOpportunity('${opp.id}')" 
            title="${isTracked ? 'Remove from My Opportunities' : 'Save to My Opportunities'}"
            class="p-2 rounded-lg transition-colors ${isTracked ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'}"
          >
            <svg class="w-4 h-4 ${isTracked ? 'fill-cyan-400 stroke-cyan-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
          </button>
        </div>

        <!-- Opportunity Name & Organization -->
        <h4 class="text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
          ${opp.name}
        </h4>
        <p class="text-xs font-semibold text-cyan-400 mt-1 flex items-center gap-1.5">
          <span>🏢 ${opp.organization}</span>
          <span class="text-slate-600">•</span>
          <span class="text-slate-400">📍 ${opp.mode}</span>
        </p>

        <!-- Eligibility Status Badge (No meaningless scores!) -->
        <div class="mt-3.5 flex items-center justify-between">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            evalResult.status === 'Eligible' 
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
              : (evalResult.status === 'Not Eligible' 
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' 
                : 'bg-amber-500/15 text-amber-300 border border-amber-500/30')
          }">
            <span>${evalResult.statusLabel}</span>
          </div>

          <span class="text-xs font-medium text-slate-400">
            ⏰ ${opp.deadlineFormatted}
          </span>
        </div>

        <!-- Main Benefit & Cost -->
        <div class="mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs">
          <div>
            <span class="text-[10px] text-slate-400 uppercase tracking-wider block">Main Benefit</span>
            <span class="font-bold text-slate-200">${opp.benefits.stipendOrAmount}</span>
          </div>
          <div class="text-right">
            <span class="text-[10px] text-slate-400 uppercase tracking-wider block">Cost</span>
            <span class="font-semibold text-emerald-400">${opp.cost}</span>
          </div>
        </div>

        <!-- Why You Match Section -->
        <div class="mt-4 pt-3 border-t border-slate-800/70">
          <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-2">
            <svg class="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Why you match
          </span>
          <div class="space-y-1">
            ${evalResult.matchReasons.slice(0, 3).map(reason => `
              <div class="text-xs text-slate-300 flex items-start gap-1.5 leading-snug">
                <span class="text-emerald-400 font-bold flex-shrink-0">✓</span>
                <span class="truncate">${reason.replace('✓ ', '')}</span>
              </div>
            `).join('')}
            
            ${evalResult.gapReasons.length > 0 ? `
              <div class="text-xs text-rose-300 flex items-start gap-1.5 leading-snug pt-0.5">
                <span class="text-rose-400 font-bold flex-shrink-0">❌</span>
                <span class="truncate">${evalResult.gapReasons[0].rule}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Card Action Footer -->
      <div class="p-5 pt-0 mt-3">
        <div class="flex items-center gap-2">
          <button 
            onclick="openOpportunityModal('${opp.id}')"
            class="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700/80 transition-all flex items-center justify-center gap-1.5 group-hover:border-purple-500/40"
          >
            <span>View Details</span>
            <svg class="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>

          ${isTracked ? `
            <div class="px-3 py-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold flex items-center justify-center whitespace-nowrap">
              ${trackedStage}
            </div>
          ` : `
            <button 
              onclick="startApplicationPreparation('${opp.id}')"
              title="Prepare Application Checklist"
              class="py-2.5 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold transition-all flex items-center gap-1"
            >
              <span>Prep</span>
            </button>
          `}
        </div>
      </div>

    </div>
  `;
}

// ==========================================
// AGENT REASONING STEP ANIMATION
// ==========================================

function renderAgentReasoningView() {
  const container = document.getElementById('agent-reasoning-container');
  if (!container) return;

  container.innerHTML = `
    <div class="my-6 p-6 rounded-2xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-indigo-950/50 border border-purple-500/40 shadow-2xl relative overflow-hidden animate-fadeIn">
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-purple-500/20">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 animate-spin">
            ⚙️
          </div>
          <div>
            <h4 class="text-sm font-bold text-white flex items-center gap-2">
              <span>HerHub AI Reasoning Agent</span>
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </h4>
            <p class="text-[11px] text-purple-300/80">Evaluating eligibility & curating action plans</p>
          </div>
        </div>
        <span class="text-xs font-mono text-cyan-300">Live Agent Pipeline</span>
      </div>

      <div class="space-y-2.5 font-mono text-xs" id="agent-steps-list">
        <div class="text-purple-300 flex items-center gap-2">
          <span class="animate-pulse">▶</span> Initializing profile matching engine...
        </div>
      </div>
    </div>
  `;
}

function updateAgentReasoningSteps(steps, currentIndex) {
  const listEl = document.getElementById('agent-steps-list');
  if (!listEl) return;

  listEl.innerHTML = steps.slice(0, currentIndex).map((s, idx) => `
    <div class="flex items-center gap-2 text-slate-200 animate-fadeIn">
      <span class="text-emerald-400 font-bold">✓</span>
      <span>${s}</span>
    </div>
  `).join('') + (currentIndex < steps.length ? `
    <div class="flex items-center gap-2 text-purple-300 animate-pulse">
      <span>▶</span>
      <span>${steps[currentIndex]}...</span>
    </div>
  ` : `
    <div class="flex items-center gap-2 text-cyan-300 font-semibold pt-1">
      <span>✨</span>
      <span>Personalized matching complete! Found ${state.filteredOpportunities.length} opportunities.</span>
    </div>
  `);
}

// ==========================================
// 4. OPPORTUNITY DETAILS & CHECKLIST MODAL
// ==========================================

function openOpportunityModal(oppId) {
  const opp = state.opportunities.find(o => o.id === oppId);
  if (!opp) return;

  state.activeOpportunity = opp;
  const modalEl = document.getElementById('opportunity-modal');
  if (modalEl) {
    renderOpportunityModalContent(opp);
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeOpportunityModal() {
  state.activeOpportunity = null;
  const modalEl = document.getElementById('opportunity-modal');
  if (modalEl) {
    modalEl.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

function renderOpportunityModal() {
  return `
    <div id="opportunity-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div class="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        <div id="modal-content" class="overflow-y-auto p-6 sm:p-8 space-y-6">
          <!-- Dynamic Content Rendered by renderOpportunityModalContent -->
        </div>
      </div>
    </div>
  `;
}

function renderOpportunityModalContent(opp) {
  const contentEl = document.getElementById('modal-content');
  if (!contentEl) return;

  const evalResult = evaluateEligibility(opp);
  const isTracked = !!state.trackedOpportunities[opp.id];
  const trackData = state.trackedOpportunities[opp.id];
  const checklist = trackData?.checklist || {};

  // Find similar eligible opportunities for gap analysis recommendation
  const similarEligible = state.opportunities.filter(o => 
    o.id !== opp.id && evaluateEligibility(o).status === 'Eligible'
  ).slice(0, 2);

  contentEl.innerHTML = `
    <!-- Top Action Bar -->
    <div class="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
      <div>
        <div class="flex items-center gap-2 mb-1.5 flex-wrap">
          <span class="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30">
            ${opp.category}
          </span>
          <span class="px-2.5 py-0.5 rounded text-xs font-semibold ${
            evalResult.status === 'Eligible' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
              : (evalResult.status === 'Not Eligible' 
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40')
          }">
            ${evalResult.statusLabel}
          </span>
          ${opp.badge ? `<span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hidden sm:inline">${opp.badge}</span>` : ''}
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white">${opp.name}</h2>
        <p class="text-sm font-semibold text-cyan-400 mt-1">Organized by ${opp.organization} • Mode: ${opp.mode} (${opp.location})</p>
      </div>

      <button onclick="closeOpportunityModal()" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>

    <!-- Prominent Deadline & Financial Overview Bar -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-950 to-cyan-950/40 border border-purple-500/30">
      <div>
        <span class="text-[11px] text-slate-400 uppercase tracking-wider block">Application Deadline</span>
        <div class="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
          <span>⏰ ${opp.deadlineFormatted}</span>
        </div>
        <span class="text-xs text-purple-300 font-semibold">${opp.deadlineUrgency || 'Active'}</span>
      </div>

      <div>
        <span class="text-[11px] text-slate-400 uppercase tracking-wider block">Main Benefit</span>
        <div class="text-base font-bold text-cyan-300 mt-0.5">${opp.benefits.stipendOrAmount}</div>
        <span class="text-xs text-slate-400">Direct disbursement</span>
      </div>

      <div>
        <span class="text-[11px] text-slate-400 uppercase tracking-wider block">Program Fee / Cost</span>
        <div class="text-base font-bold text-emerald-400 mt-0.5">${opp.cost}</div>
        <span class="text-xs text-slate-400">Zero application charges</span>
      </div>
    </div>

    <!-- 1. ABOUT -->
    <div>
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About This Opportunity</h3>
      <p class="text-sm text-slate-300 leading-relaxed">${opp.description}</p>
    </div>

    <!-- 2. WHY THIS MATCHES YOU -->
    <div class="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30">
      <h3 class="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5 mb-2.5">
        <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        Why this matches you (${state.profile?.name || 'Applicant'})
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        ${evalResult.matchReasons.map(r => `
          <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
            <span class="text-emerald-400 font-bold">✓</span>
            <span>${r.replace('✓ ', '')}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- GAP ANALYSIS (If Not Eligible or Potentially Eligible) -->
    ${evalResult.gapReasons.length > 0 ? `
      <div class="p-4 sm:p-5 rounded-xl bg-rose-950/30 border border-rose-500/40">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-rose-400 font-bold text-xl">⚠️</span>
          <h4 class="text-sm font-bold text-rose-200">Why you don't qualify yet (Gap Analysis)</h4>
        </div>

        <div class="space-y-2 mb-3">
          ${evalResult.gapReasons.map(gap => `
            <div class="p-2.5 rounded-lg bg-slate-900/90 border border-rose-500/20 text-xs">
              <div class="flex items-center gap-2 text-rose-300 font-semibold">
                <span>❌</span>
                <span>${gap.rule}</span>
              </div>
              <div class="flex items-center gap-2 text-slate-300 mt-1 pl-5">
                <span>✓</span>
                <span>${gap.userState}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- What you can do -->
        <div class="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span class="font-bold text-cyan-300 block mb-1">What you can do:</span>
          <p>Save this opportunity to your personal tracker to get notified as soon as you transition into your eligible academic year.</p>
          
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <button onclick="toggleTrackOpportunity('${opp.id}', 'Saved')" class="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5">
              <span>🔔 Save & Track for Future Eligibility</span>
            </button>
          </div>
        </div>

        <!-- Similar opportunities user can apply for now -->
        ${similarEligible.length > 0 ? `
          <div class="mt-4 pt-3 border-t border-rose-500/20">
            <span class="text-xs font-bold text-slate-300 block mb-2">Similar opportunities you can apply for right now:</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${similarEligible.map(sim => `
                <div onclick="openOpportunityModal('${sim.id}')" class="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all flex items-center justify-between">
                  <div>
                    <div class="text-xs font-bold text-white truncate">${sim.name}</div>
                    <div class="text-[11px] text-cyan-400 font-medium">${sim.organization}</div>
                  </div>
                  <span class="text-xs text-emerald-400 font-bold ml-2">🟢 Eligible</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    ` : ''}

    <!-- 3. DETAILED ELIGIBILITY REQUIREMENTS -->
    <div>
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Detailed Eligibility Criteria</h3>
      <ul class="space-y-2 text-xs text-slate-300">
        ${opp.eligibilityCriteria.requirementsList.map(req => `
          <li class="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <span class="text-purple-400 font-bold">•</span>
            <span>${req}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <!-- 4. BENEFITS & HIGHLIGHTS -->
    <div>
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Program Benefits & Perks</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        ${opp.benefits.highlights.map(h => `
          <div class="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-200 flex items-start gap-2">
            <span class="text-cyan-400 font-bold">★</span>
            <span>${h}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 5. APPLICATION STEPS -->
    <div>
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Application Process Steps</h3>
      <div class="space-y-2">
        ${opp.applicationSteps.map((step, idx) => `
          <div class="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-3 text-xs">
            <div class="w-6 h-6 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 font-bold flex items-center justify-center flex-shrink-0">
              ${idx + 1}
            </div>
            <span class="text-slate-200">${step}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 6. APPLICATION PREPARATION & CHECKLIST GENERATOR -->
    <div id="modal-checklist-section" class="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-950 border border-purple-500/30">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <h4 class="text-sm font-bold text-white flex items-center gap-2">
            <span>📋 Application Readiness Checklist</span>
            ${isTracked ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Stage: ${trackData?.stage}</span>` : ''}
          </h4>
          <p class="text-xs text-slate-400 mt-0.5">Prepare and tick off every document before submitting</p>
        </div>

        ${!isTracked ? `
          <button onclick="startApplicationPreparation('${opp.id}')" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto">
            <span>Prepare My Application</span>
          </button>
        ` : ''}
      </div>

      <!-- Checklist Items -->
      <div class="space-y-2 mt-3">
        ${opp.requiredDocuments.map(doc => {
          const isDone = isTracked && checklist[doc];
          return `
            <label class="flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${isDone ? 'bg-emerald-950/30 border border-emerald-500/30' : 'bg-slate-900/90 border border-slate-800 hover:border-slate-700'}">
              <div class="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  ${isDone ? 'checked' : ''}
                  onchange="toggleChecklistItem('${opp.id}', '${doc.replace(/'/g, "\\'")}')"
                  class="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-slate-950 border-slate-700 cursor-pointer"
                />
                <span class="text-xs font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-200'}">
                  ${doc}
                </span>
              </div>
              <span class="text-[11px] font-semibold ${isDone ? 'text-emerald-400' : 'text-slate-400'}">
                ${isDone ? 'Completed ✓' : 'Pending'}
              </span>
            </label>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Official Portal Notice -->
    <div class="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
      <span>Official Source: <strong class="text-slate-300">${opp.officialSource}</strong></span>
      <span>Verified: <strong class="text-cyan-400">${opp.verificationDate}</strong></span>
    </div>

    <!-- Bottom Actions: APPLY ON OFFICIAL WEBSITE & Track -->
    <div class="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
      <button 
        onclick="toggleTrackOpportunity('${opp.id}')"
        class="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4 ${isTracked ? 'text-cyan-400 fill-cyan-400' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
        <span>${isTracked ? 'Saved in My Opportunities' : 'Save Opportunity'}</span>
      </button>

      <a 
        href="${opp.officialUrl}" 
        target="_blank" 
        rel="noopener noreferrer"
        class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-sm font-bold shadow-lg shadow-purple-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-center"
      >
        <span>APPLY ON OFFICIAL WEBSITE</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
      </a>
    </div>
  `;
}

// ==========================================
// 5. MY OPPORTUNITIES (KANBAN TRACKER VIEW)
// ==========================================

function renderTrackerPage() {
  const stages = ['Saved', 'Preparing', 'Applied', 'Completed'];
  const trackedEntries = Object.entries(state.trackedOpportunities);

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-bold uppercase tracking-wider text-cyan-400">Personal Opportunity Hub</span>
            </div>
            <h1 class="text-3xl font-extrabold text-white">My Opportunities Tracker</h1>
            <p class="text-slate-400 text-sm mt-1">Track your progress from discovery through preparation to final application offer.</p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="navigateTab('dashboard')" class="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              <span>Discover More</span>
            </button>
          </div>
        </div>

        <!-- Stages Kanban Board -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${stages.map(stageName => {
            const items = trackedEntries
              .filter(([_, v]) => v.stage === stageName)
              .map(([id, val]) => ({
                id,
                ...val,
                opp: state.opportunities.find(o => o.id === id)
              }))
              .filter(item => item.opp);

            return `
              <div class="rounded-2xl bg-slate-900/70 border border-slate-800/90 p-4 flex flex-col min-h-[520px]">
                
                <!-- Stage Header -->
                <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full ${
                      stageName === 'Saved' ? 'bg-purple-400' : 
                      stageName === 'Preparing' ? 'bg-cyan-400' : 
                      stageName === 'Applied' ? 'bg-blue-400' : 'bg-emerald-400'
                    }"></span>
                    <h3 class="font-bold text-sm text-white">${stageName}</h3>
                  </div>
                  <span class="px-2 py-0.5 text-xs font-bold rounded-full bg-slate-800 text-slate-300">
                    ${items.length}
                  </span>
                </div>

                <!-- Cards in this Stage -->
                <div class="space-y-3 flex-1 overflow-y-auto">
                  ${items.length === 0 ? `
                    <div class="h-36 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-xs text-slate-500 text-center p-4">
                      No opportunities in ${stageName}
                    </div>
                  ` : items.map(item => {
                    const opp = item.opp;
                    const checklistTotal = Object.keys(item.checklist || {}).length;
                    const checklistDone = Object.values(item.checklist || {}).filter(Boolean).length;
                    const progressPercent = checklistTotal > 0 ? Math.round((checklistDone / checklistTotal) * 100) : 0;

                    return `
                      <div class="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-purple-500/40 transition-all shadow-md group">
                        
                        <div class="flex items-center justify-between gap-2 mb-2">
                          <span class="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded">
                            ${opp.category}
                          </span>
                          <span class="text-[10px] font-semibold text-rose-400">
                            ⏰ ${opp.deadlineFormatted}
                          </span>
                        </div>

                        <h4 onclick="openOpportunityModal('${opp.id}')" class="text-sm font-bold text-white hover:text-purple-300 cursor-pointer transition-colors leading-snug">
                          ${opp.name}
                        </h4>
                        <p class="text-xs text-slate-400 mt-0.5">${opp.organization}</p>

                        <!-- Checklist Progress -->
                        ${checklistTotal > 0 ? `
                          <div class="mt-3 pt-2.5 border-t border-slate-800/80">
                            <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                              <span>Checklist</span>
                              <span class="font-bold text-cyan-300">${checklistDone}/${checklistTotal} (${progressPercent}%)</span>
                            </div>
                            <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div class="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" style="width: ${progressPercent}%"></div>
                            </div>
                          </div>
                        ` : ''}

                        <!-- Stage Selector / Movement -->
                        <div class="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                          <label class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Stage:</label>
                          <select 
                            onchange="updateTrackedStage('${opp.id}', this.value)" 
                            class="bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded-lg px-2 py-1 focus:outline-none focus:border-purple-500 cursor-pointer"
                          >
                            ${stages.map(s => `
                              <option value="${s}" ${item.stage === s ? 'selected' : ''}>${s}</option>
                            `).join('')}
                          </select>
                        </div>

                        <!-- Card Action Links -->
                        <div class="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                          <button onclick="openOpportunityModal('${opp.id}')" class="text-[11px] font-semibold text-purple-400 hover:text-purple-300">
                            Checklist & Details →
                          </button>
                          
                          <a href="${opp.officialUrl}" target="_blank" rel="noopener noreferrer" class="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                            <span>Apply</span>
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                          </a>
                        </div>

                      </div>
                    `;
                  }).join('')}
                </div>

              </div>
            `;
          }).join('')}
        </div>

      </div>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="border-t border-slate-800/80 bg-slate-950 py-10 text-slate-400 text-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="font-bold text-white">HerHub</span>
          <span>— Intelligent Opportunity Platform for Young Women</span>
        </div>
        <div class="flex items-center gap-4 text-slate-500">
          <span>DISCOVER → MATCH → PREPARE → APPLY → TRACK → GROW</span>
        </div>
      </div>
    </footer>
  `;
}

// ==========================================
// CONTROLLER & DEMO FLOW HELPERS
// ==========================================

function navigateTab(tabName) {
  state.activeTab = tabName;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSearch() {
  const el = document.getElementById('search-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToResults() {
  const el = document.getElementById('results-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function handleSearchSubmit(event) {
  if (event) event.preventDefault();
  const inputEl = document.getElementById('search-input');
  const query = inputEl ? inputEl.value : state.searchQuery;
  performConversationalSearch(query);
}

function triggerPrompt(promptText) {
  const inputEl = document.getElementById('search-input');
  if (inputEl) inputEl.value = promptText;
  performConversationalSearch(promptText);
}

function setCategoryFilter(catId) {
  state.activeCategory = catId;
  applyFiltersAndSearch(state.searchQuery);
  renderApp();
  scrollToResults();
}

function setEligibilityFilter(filterId) {
  state.filterEligibility = filterId;
  applyFiltersAndSearch(state.searchQuery);
  renderApp();
}

function resetSearchFilters() {
  state.searchQuery = '';
  state.activeCategory = 'All';
  state.filterEligibility = 'All';
  applyFiltersAndSearch('');
  renderApp();
}

function loadDemoProfileAndSearch() {
  state.profile = { ...DEFAULT_DEMO_PROFILE };
  saveProfileToStorage();
  applyFiltersAndSearch(state.searchQuery);
  renderApp();
}

function handleProfileSave(event) {
  if (event) event.preventDefault();

  const name = document.getElementById('prof-name').value;
  const education = document.getElementById('prof-education').value;
  const branch = document.getElementById('prof-branch').value;
  const year = document.getElementById('prof-year').value;
  const college = document.getElementById('prof-college').value;
  const location = document.getElementById('prof-location').value;
  const cgpa = parseFloat(document.getElementById('prof-cgpa').value) || 8.0;
  const budget = document.getElementById('prof-budget').value;
  
  const skills = (document.getElementById('prof-skills').value || '').split(',').map(s => s.trim()).filter(Boolean);
  const interests = (document.getElementById('prof-interests').value || '').split(',').map(s => s.trim()).filter(Boolean);
  const goals = (document.getElementById('prof-goals').value || '').split(',').map(s => s.trim()).filter(Boolean);

  state.profile = {
    name,
    education,
    branch,
    year,
    college,
    location,
    cgpa,
    skills,
    interests,
    goals,
    budgetPreference: budget,
    opportunityTypes: state.profile?.opportunityTypes || DEFAULT_DEMO_PROFILE.opportunityTypes
  };

  saveProfileToStorage();
  applyFiltersAndSearch(state.searchQuery);
  state.activeTab = 'dashboard';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 1-Click Complete Live Demo Flow Automation
 * Takes user through: Profile -> Search AI Internships -> Results
 */
function runCompleteDemoFlow() {
  state.profile = { ...DEFAULT_DEMO_PROFILE };
  saveProfileToStorage();
  state.activeTab = 'dashboard';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  setTimeout(() => {
    triggerPrompt("Find me free AI internships for this summer.");
  }, 400);
}

function attachDynamicBindings() {
  window.onkeydown = function(e) {
    if (e.key === 'Escape' && state.activeOpportunity) {
      closeOpportunityModal();
    }
  };
}

function setupEventListeners() {
  // Initial setup completed
}

// Start application when DOM loads
document.addEventListener('DOMContentLoaded', initApp);
