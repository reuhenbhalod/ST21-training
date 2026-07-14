import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import {
  Lock, LogOut, BookOpen, ClipboardCheck,
  CheckCircle2, XCircle, ArrowRight, ArrowLeft,
  TrendingUp, Shield, Trophy, Lightbulb,
  AlertCircle, ChevronRight, Circle, PlayCircle, RefreshCw
} from "lucide-react";
import { COURSE } from "./courseData.jsx";
import ChatPanel from "./ChatPanel.jsx";

// ---------------------------------------------------------------------------
// SMARTEK21 BRAND PALETTE
// Primary orange sampled directly from the SmarTek21 logo.
// ---------------------------------------------------------------------------

const BRAND = {
  orange: "#E66433",
  orangeDeep: "#C94F22",
  orangeSoft: "#FDF1EC",
  orangeTint: "#FBE4D8",
  ink: "#1A1A1A",
  charcoal: "#2A2A2A",
  graphite: "#4A4A4A",
  stone: "#767676",
  line: "#E5E5E5",
  paper: "#FAFAFA",
  white: "#FFFFFF"
};

// ---------------------------------------------------------------------------
// LOGO. Sampled from brand asset, embedded as base64 for portability
// ---------------------------------------------------------------------------

const LOGO_SRC = "data:image/jpeg;base64,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";

// ---------------------------------------------------------------------------
// MICROSOFT ENTRA ID (AZURE) SSO CONFIGURATION
// ---------------------------------------------------------------------------
// Fill these in after creating the App Registration in the Azure Portal.
// See SETUP_GUIDE.md for step-by-step instructions.
//
// In this artifact (running in a sandboxed iframe), the "Sign in with Microsoft"
// button triggers a simulated dialog because the sandbox origin is not a
// registered redirect URI in Azure. When you deploy to your real domain
// (e.g., academy.smartek21.com), follow the guide to swap the simulated
// sign-in for real MSAL redirect flow.
// ---------------------------------------------------------------------------
const MSAL_CONFIG = {
  clientId: "9c7894fe-fab8-40ac-a866-81d06f14f68c",
  tenantId: "4738192e-2424-46c8-a19c-bc2c86665215",
  domain: "smartek21.com"
};

// Scopes we ask Microsoft for. User.Read is the basic profile permission.
// We use the resulting access token to call our own API endpoints.
const MSAL_SCOPES = ["api://9c7894fe-fab8-40ac-a866-81d06f14f68c/access_as_user"];

// Base URL for API calls. Empty string means "same origin" — works in
// Azure Static Web Apps where the API lives at /api on the same domain.
const API_BASE = "";

// Create the MSAL instance once at module load time, AFTER MSAL_CONFIG is defined.
// This is what actually talks to Microsoft's login servers.
const msalInstance = new PublicClientApplication({
  auth: {
    clientId: MSAL_CONFIG.clientId,
    authority: `https://login.microsoftonline.com/${MSAL_CONFIG.tenantId}`,
    redirectUri: window.location.origin
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
});

// MSAL v3+ requires explicit initialization before any auth method is called.
// We kick it off here; it resolves quickly and all later calls await this.
const msalReady = msalInstance.initialize();

// Given an email like "reuhenb@smartek21.com", return:
//   { firstName: "Reuhen", lastInitial: "B", displayName: "Reuhen B.", initials: "RB" }
function parseEmail(email) {
  const prefix = (email || "").split("@")[0] || "";
  const lastInitial = prefix.slice(-1).toUpperCase();
  const firstRaw = prefix.slice(0, -1);
  const firstName = firstRaw ? firstRaw.charAt(0).toUpperCase() + firstRaw.slice(1) : "";
  return {
    firstName,
    lastInitial,
    displayName: firstName && lastInitial ? `${firstName} ${lastInitial}.` : (firstName || email),
    initials: ((firstName.charAt(0) || "") + lastInitial).toUpperCase()
  };
}

const PASS_THRESHOLD = 1.0;  // 100% required to pass
const QUESTIONS_PER_ATTEMPT = 5;  // serve 5 of the ~10 in each module's pool

// Fisher-Yates shuffle. Returns a new array, does not mutate input.
function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick QUESTIONS_PER_ATTEMPT random questions from the pool and shuffle the
// answer options inside each one so the correct answer's position also changes
// between attempts.
function generateQuizAttempt(pool) {
  const picked = shuffle(pool).slice(0, QUESTIONS_PER_ATTEMPT);
  return picked.map(q => {
    const indexed = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }));
    const shuffled = shuffle(indexed);
    return {
      q: q.q,
      options: shuffled.map(x => x.opt),
      correct: shuffled.findIndex(x => x.isCorrect),
      why: q.why
    };
  });
}




// ===========================================================================
// ROOT COMPONENT
// ===========================================================================

export default function SmarTek21Academy() {
  const [authState, setAuthState] = useState("restoring"); // restoring | login | authed
  // Surfaced on the login screen when a redirect returns a non-company account.
  const [loginError, setLoginError] = useState("");
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null); // Microsoft token for API calls
  // Mirror of accessToken so getFreshToken can read the cached token without
  // taking it as a dependency (keeps getFreshToken/apiCall referentially stable).
  const accessTokenRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [view, setView] = useState("dashboard"); // dashboard | reading | quiz | admin
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [progress, setProgress] = useState({});
  // Mirror of progress so saveProgress can read the latest committed value
  // without the setState-as-reader hack (which can double-fire the network call).
  const progressRef = useRef({});
  const [quizState, setQuizState] = useState({ questions: [], answers: {}, submitted: false });

  // API state
  const [progressLoading, setProgressLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  // True when the most recent save did not reach the server, so the UI can warn
  // the user instead of silently dropping their progress.
  const [saveError, setSaveError] = useState(false);
  const activeSection = useMemo(
    () => COURSE.find(s => s.id === activeSectionId),
    [activeSectionId]
  );

  // ----------------------------------------------------------------------
  // API HELPER
  // Calls our backend /api/* endpoints. Adds the Authorization header.
  // Re-acquires the token silently if the cached one expired.
  // ----------------------------------------------------------------------

  // Keep accessTokenRef in sync with state (login, logout, refresh).
  useEffect(() => { accessTokenRef.current = accessToken; }, [accessToken]);

  // Keep progressRef in sync so saveProgress can merge against the latest value.
  useEffect(() => { progressRef.current = progress; }, [progress]);

  const getFreshToken = useCallback(async ({ forceRefresh = false } = {}) => {
    // Always go through MSAL. acquireTokenSilent returns the cached token while
    // it is still valid and transparently uses the refresh token to mint a new
    // one once it has expired (or when forceRefresh is set). This is the fix
    // for silently-failing saves: we never hand out a stale in-memory token.
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      // No MSAL session (e.g. a manually-supplied token in dev); use the cache.
      return accessTokenRef.current;
    }
    try {
      const result = await msalInstance.acquireTokenSilent({
        scopes: MSAL_SCOPES,
        account: accounts[0],
        forceRefresh
      });
      accessTokenRef.current = result.accessToken;
      // Bail out of a re-render when the token is unchanged (the common case),
      // so this doesn't churn effects that depend on accessToken/apiCall.
      setAccessToken(prev => (prev === result.accessToken ? prev : result.accessToken));
      return result.accessToken;
    } catch (err) {
      console.warn("acquireTokenSilent failed:", err);
      // Fall back to whatever is cached; may be expired, but better than nothing.
      return accessTokenRef.current;
    }
  }, []);

  const apiCall = useCallback(async (path, options = {}, _retried = false) => {
    const token = await getFreshToken({ forceRefresh: _retried });
    if (!token) throw new Error("No access token available");
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    });
    // The server rejected the token (most likely expired). Force a refresh and
    // retry exactly once before giving up.
    if (res.status === 401 && !_retried) {
      return apiCall(path, options, true);
    }
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new Error(`API ${res.status}: ${text || res.statusText}`);
      // Attach the status and parsed body so callers can branch on specific
      // failures (ChatPanel turns a 429 into a cooldown instead of a generic
      // error). The body may not be JSON — keep null in that case.
      err.status = res.status;
      try {
        err.body = JSON.parse(text);
      } catch {
        err.body = null;
      }
      throw err;
    }
    return res.json();
  }, [getFreshToken]);

  // ----------------------------------------------------------------------
  // EFFECTS: load progress on login, fire heartbeat once on login
  // ----------------------------------------------------------------------

  // Restore an existing session on page load (this is what survives a refresh).
  // React state is wiped on every load, but MSAL still has the account cached in
  // sessionStorage, so we rehydrate from it instead of dropping the user back on
  // the login screen. Two paths: (A) we just came back from a login redirect, or
  // (B) a prior session is still cached and we can silently re-acquire a token.
  useEffect(() => {
    (async () => {
      try {
        await msalReady;
        // (A) Returning from a Microsoft login redirect.
        const redirect = await msalInstance.handleRedirectPromise();
        if (redirect?.account) {
          finishLogin(redirect.account.username, redirect.accessToken);
          return;
        }
        // (B) No redirect in flight — restore a cached session if one exists.
        // acquireTokenSilent returns the cached token or transparently mints a
        // fresh one via the refresh token; no popup or redirect is shown.
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          const result = await msalInstance.acquireTokenSilent({
            scopes: MSAL_SCOPES,
            account: accounts[0]
          });
          finishLogin(accounts[0].username, result.accessToken);
          return;
        }
        // Nobody is signed in.
        setAuthState("login");
      } catch (err) {
        // A failed silent restore just means the user signs in again.
        console.warn("Session restore failed:", err);
        setAuthState("login");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Heartbeat once on login: marks user as seen, gets isAdmin flag
  useEffect(() => {
    if (!user?.email || !accessToken) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await apiCall("/api/heartbeat", {
          method: "POST",
          body: JSON.stringify({ isNewSession: true })
        });
        if (!cancelled) {
          setIsAdmin(!!data.isAdmin);
        }
      } catch (err) {
        console.warn("Heartbeat failed:", err);
      }
    })();
    return () => { cancelled = true; };
  }, [user?.email, accessToken, apiCall]);

  // Load progress from the database on login
  useEffect(() => {
    if (!user?.email || !accessToken) return;
    let cancelled = false;
    (async () => {
      setProgressLoading(true);
      setApiError(null);
      try {
        const data = await apiCall("/api/progress");
        if (!cancelled) {
          setProgress(data.progress || {});
        }
      } catch (err) {
        console.error("Failed to load progress:", err);
        if (!cancelled) {
          setApiError("Could not load your progress. Please refresh.");
        }
      } finally {
        if (!cancelled) setProgressLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user?.email, accessToken, apiCall]);

  // ----------------------------------------------------------------------
  // SAVE HELPERS — called from quiz submit and reading-marked
  // ----------------------------------------------------------------------

  const saveProgress = useCallback(async (sectionId, patch) => {
    // Compute the merged value from the latest committed progress (via the ref).
    const cur = progressRef.current[sectionId] || { read: false, best: 0, passed: false, attemptsCount: 0 };
    const merged = { ...cur, ...patch };
    // Best score should never go down; passed is sticky once earned.
    if (typeof patch.best === "number") merged.best = Math.max(cur.best || 0, patch.best);
    merged.passed = cur.passed || !!patch.passed;

    // Optimistic local update first so the UI feels instant.
    progressRef.current = { ...progressRef.current, [sectionId]: merged };
    setProgress(prev => ({ ...prev, [sectionId]: merged }));

    // Persist to the server. apiCall already refreshes the token and retries once
    // on a 401, so a failure here is a real one — surface it instead of swallowing.
    try {
      await apiCall("/api/progress", {
        method: "POST",
        body: JSON.stringify({
          sectionId,
          read: !!merged.read,
          bestScore: merged.best || 0,
          passed: !!merged.passed,
          attemptsCount: merged.attemptsCount || 0
        })
      });
      setSaveError(false);
    } catch (err) {
      console.warn("saveProgress failed:", err);
      setSaveError(true);
    }
  }, [apiCall]);

  const logQuizAttempt = useCallback(async (sectionId, score, passed, questions, answers) => {
    try {
      await apiCall("/api/quiz-attempt", {
        method: "POST",
        body: JSON.stringify({ sectionId, score, passed, questions, answers })
      });
    } catch (err) {
      console.warn("logQuizAttempt failed:", err);
    }
  }, [apiCall]);

  const completedCount = Object.values(progress).filter(p => p.passed).length;
  const totalCount = COURSE.length;
  const overallPercent = Math.round((completedCount / totalCount) * 100);

  // --- AUTH HANDLERS ----------------------------------------------------

  // Commit a verified Microsoft identity into React state. Shared by the two
  // ways a session comes to life: returning from a login redirect, and silently
  // restoring an existing MSAL session on page load (e.g. after a refresh).
  // Sends the user back to the login screen (with an error) for a non-company
  // account rather than authing them.
  function finishLogin(rawEmail, token) {
    const email = (rawEmail || "").trim().toLowerCase();
    if (!email.endsWith(`@${MSAL_CONFIG.domain}`)) {
      setLoginError(`Use your @${MSAL_CONFIG.domain} Microsoft work account to sign in.`);
      setAuthState("login");
      return false;
    }
    setLoginError("");
    setUser({ email, ...parseEmail(email) });
    setAccessToken(token || null);
    setAuthState("authed");
    return true;
  }

  function handleLogout() {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin
      }).catch(err => console.warn("MSAL logout error:", err));
    }
    // Clear user FIRST so any save effect skips writing on logout
    setUser(null);
    setAccessToken(null);
    setIsAdmin(false);
    setAuthState("login");
    setView("dashboard");
    setActiveSectionId(null);
    setProgress({});
    progressRef.current = {};
    setSaveError(false);
    setApiError(null);
    setQuizState({ questions: [], answers: {}, submitted: false });
  }

  // --- NAVIGATION HANDLERS ---------------------------------------------

  // Reset scroll position when entering a new view so users always land at the top.
  function scrollToTop() {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  }

  function openReading(sectionId) {
    // Safety: prevent opening a locked section even if triggered programmatically.
    const idx = COURSE.findIndex(s => s.id === sectionId);
    if (idx > 0 && !progress[COURSE[idx - 1].id]?.passed) return;
    setActiveSectionId(sectionId);
    setView("reading");
    scrollToTop();
  }
  function openQuiz(sectionId) {
    const section = COURSE.find(s => s.id === sectionId);
    setActiveSectionId(sectionId);
    // Generate a fresh attempt: pick 5 random questions from the pool, shuffle options.
    // This runs every time the user enters the quiz (start or retake), so questions
    // change between attempts.
    setQuizState({
      questions: generateQuizAttempt(section.quiz),
      answers: {},
      submitted: false
    });
    setView("quiz");
    scrollToTop();
  }
  function markRead(sectionId) {
    saveProgress(sectionId, { read: true });
  }
  function submitQuiz() {
    const questions = quizState.questions;
    const total = questions.length;
    const correct = questions.reduce((acc, q, i) => acc + (quizState.answers[i] === q.correct ? 1 : 0), 0);
    const score = correct / total;
    const passed = score >= PASS_THRESHOLD;

    const currentAttempts = (progress[activeSectionId]?.attemptsCount || 0) + 1;

    // Optimistic local update + persist to server
    saveProgress(activeSectionId, {
      read: true,
      best: score,
      passed,
      attemptsCount: currentAttempts
    });

    // Log the attempt to history (fire and forget)
    logQuizAttempt(activeSectionId, score, passed, questions, quizState.answers);

    setQuizState(q => ({ ...q, submitted: true }));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- ROUTING ---------------------------------------------------------

  if (authState === "restoring") return <RestoringScreen />;
  if (authState === "login") return <Login initialError={loginError} />;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]" style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      <TopNav
        user={user}
        onLogout={handleLogout}
        onHome={() => { setView("dashboard"); setActiveSectionId(null); scrollToTop(); }}
        overallPercent={overallPercent}
        isAdmin={isAdmin}
        isAdminView={view === "admin"}
        onToggleAdmin={() => {
          if (view === "admin") {
            setView("dashboard");
          } else {
            setView("admin");
          }
          scrollToTop();
        }}
      />

      {(saveError || apiError) && (
        <div className="sticky top-0 z-40 bg-[#FBE9E4] border-b border-[#E66433]/40">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3 text-sm text-[#8A2C12]">
            <AlertCircle size={18} className="shrink-0" />
            <span className="font-medium">
              {saveError
                ? "We couldn't save your latest progress. Check your connection — it will be retried the next time you pass a quiz or open a module. Avoid signing out until this clears."
                : apiError}
            </span>
          </div>
        </div>
      )}

      {view === "dashboard" && progressLoading && (
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <div className="text-sm uppercase tracking-[0.2em] text-[#E66433] font-bold mb-2">Loading</div>
          <div className="text-lg text-[#4A4A4A]">Pulling your progress from the server...</div>
        </div>
      )}

      {view === "dashboard" && !progressLoading && (
        <Dashboard
          progress={progress}
          overallPercent={overallPercent}
          completedCount={completedCount}
          totalCount={totalCount}
          onOpen={openReading}
          user={user}
          isAdmin={isAdmin}
          onOpenAdmin={() => setView("admin")}
        />
      )}

      {view === "reading" && activeSection && (
        <Reading
          section={activeSection}
          progress={progress[activeSectionId]}
          onBack={() => { setView("dashboard"); scrollToTop(); }}
          onStartQuiz={() => { markRead(activeSectionId); openQuiz(activeSectionId); }}
        />
      )}

      {view === "quiz" && activeSection && (
        <Quiz
          section={activeSection}
          quizState={quizState}
          onAnswer={(qi, ai) => setQuizState(s => ({ ...s, answers: { ...s.answers, [qi]: ai } }))}
          onSubmit={submitQuiz}
          onBack={() => { setView("dashboard"); setActiveSectionId(null); scrollToTop(); }}
          onRetry={() => openQuiz(activeSectionId)}
          onNext={() => {
            const idx = COURSE.findIndex(s => s.id === activeSectionId);
            const next = COURSE[idx + 1];
            if (next) openReading(next.id);
            else { setView("dashboard"); setActiveSectionId(null); scrollToTop(); }
          }}
        />
      )}

      {view === "admin" && isAdmin && (
        <AdminView
          apiCall={apiCall}
          onBack={() => { setView("dashboard"); scrollToTop(); }}
        />
      )}

      {view === "admin" && !isAdmin && (
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <div className="text-sm uppercase tracking-[0.2em] text-red-700 font-bold mb-2">Forbidden</div>
          <div className="text-lg text-[#4A4A4A]">You do not have admin access.</div>
        </div>
      )}

      <Footer />

      <ChatPanel apiCall={apiCall} activeSectionId={activeSectionId} />
    </div>
  );
}

// ===========================================================================
// RESTORING  — shown briefly on load while we rehydrate a cached session,
// so a returning user never flashes the login screen on refresh.
// ===========================================================================

function RestoringScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <img src={LOGO_SRC} alt="SmarTek21" className="h-10 w-auto" />
      <div className="flex items-center gap-2 text-sm text-[#767676]">
        <RefreshCw className="w-4 h-4 animate-spin text-[#E66433]" />
        Restoring your session...
      </div>
    </div>
  );
}

// ===========================================================================
// LOGIN  (Microsoft Entra ID)
// ===========================================================================

function Login({ initialError = "" }) {
  // Seed from initialError so a rejected redirect (e.g. wrong domain) that the
  // root component detected is shown here on the login screen.
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);

  // Trigger the real Microsoft sign-in popup.
  // If MSAL is still initializing or network fails, we show an error.
    async function openDialog() {
  setError("");
  setLoading(true);
  try {
    await msalReady;
    // Redirect the whole page to Microsoft. This function never resolves on
    // success because the page navigates away. On return, handleRedirectPromise
    // (in the useEffect below) picks up the result.
    await msalInstance.loginRedirect({
      scopes: MSAL_SCOPES,
      prompt: "consent"
    });
  } catch (err) {
    setLoading(false);
    console.error("MSAL error:", err);
    setError("Sign-in failed. Please try again.");
  }
}

// Returning from a Microsoft redirect is now handled once at the root component
// (see the session-restore effect), which also covers plain refreshes. Login is
// purely the sign-in screen.

  return (
    <div className="min-h-screen flex bg-white" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      {/* LEFT: Brand panel */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#E66433]">
        {/* Decorative geometric pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-black/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-16 w-full text-white">
          <div>
            <img src={LOGO_SRC} alt="SmarTek21" className="h-12 w-auto drop-shadow-sm" />
            <div className="mt-3 text-xs uppercase tracking-[0.3em] text-white/80 font-medium">Training Hub</div>
          </div>

          <div>
            <h1 className="text-5xl xl:text-6xl font-bold leading-[1.05] mb-6 tracking-tight">
              Learn. Practice.<br />
              <span className="italic font-light">Grow with SmarTek21.</span>
            </h1>
          </div>

          <div className="text-xs text-white/70 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" /> Internal training. For authorized SmarTek21 employees only.
          </div>
        </div>
      </div>

      {/* RIGHT: Sign-in panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10">
            <img src={LOGO_SRC} alt="SmarTek21" className="h-10 w-auto" />
            <div className="mt-3 text-xs uppercase tracking-[0.3em] text-[#E66433] font-medium">Training Hub</div>
          </div>

          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-3 tracking-tight">Sign in</h2>
          <p className="text-[#4A4A4A] mb-10 leading-relaxed">
            Sign in with your SmarTek21 Microsoft work account to access your training.
          </p>

          {/* Microsoft SSO button */}
          <button
            onClick={openDialog}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-md bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-semibold flex items-center justify-center gap-3 hover:bg-[#1A1A1A] hover:text-white transition group disabled:opacity-60 disabled:cursor-wait"
            style={{ fontFamily: "'Segoe UI', ui-sans-serif, system-ui, sans-serif" }}
          >
            <MicrosoftLogo />
            {loading ? "Opening Microsoft sign-in..." : "Sign in with Microsoft"}
          </button>

          {error && (
            <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-6 p-4 rounded-md bg-[#FDF1EC] border border-[#FBE4D8]">
            <div className="flex gap-3">
              <Shield className="w-4 h-4 text-[#E66433] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#4A4A4A] leading-relaxed">
                Access is restricted to SmarTek21 employees. Sign in with your Microsoft work account to begin.
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

function MicrosoftLogo({ large = false }) {
  const size = large ? 32 : 20;
  return (
    <svg width={size} height={size} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <rect x="1"  y="1"  width="10" height="10" fill="#F25022" />
      <rect x="12" y="1"  width="10" height="10" fill="#7FBA00" />
      <rect x="1"  y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

// ===========================================================================
// TOP NAV
// ===========================================================================

function TopNav({ user, onLogout, onHome, overallPercent, isAdmin, isAdminView, onToggleAdmin }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-4 group">
          <img src={LOGO_SRC} alt="SmarTek21" className="h-9 w-auto" />
          <div className="hidden sm:block h-8 w-px bg-[#E5E5E5]" />
          <div className="hidden sm:block text-left">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#E66433] font-semibold">Training Hub</div>
            <div className="text-xs text-[#767676]">Internal training</div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-3">
          <div className="text-xs text-[#767676]">Progress</div>
          <div className="w-32 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
            <div className="h-full bg-[#E66433] transition-all" style={{ width: `${overallPercent}%` }} />
          </div>
          <div className="text-xs font-semibold text-[#1A1A1A] tabular-nums w-10 text-right">{overallPercent}%</div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <button
              onClick={onToggleAdmin}
              style={{
                padding: "0.5rem 0.875rem",
                borderRadius: "0.375rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                border: `1px solid ${isAdminView ? "#E66433" : "#E5E5E5"}`,
                backgroundColor: isAdminView ? "#FDF1EC" : "#FFFFFF",
                color: isAdminView ? "#E66433" : "#4A4A4A",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease"
              }}
              onMouseEnter={e => {
                if (isAdminView) return;
                e.currentTarget.style.borderColor = "#E66433";
                e.currentTarget.style.color = "#E66433";
              }}
              onMouseLeave={e => {
                if (isAdminView) return;
                e.currentTarget.style.borderColor = "#E5E5E5";
                e.currentTarget.style.color = "#4A4A4A";
              }}
            >
              {isAdminView ? "← Back to learner view" : "Switch to admin view"}
            </button>
          )}
          <div className="hidden sm:block text-right">
            <div className="text-sm font-semibold text-[#1A1A1A] leading-tight">{user.displayName}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#E66433] flex items-center justify-center text-white text-sm font-bold">
            {user.initials}
          </div>
          <button onClick={onLogout} className="w-9 h-9 rounded-md hover:bg-[#FDF1EC] flex items-center justify-center" title="Sign out">
            <LogOut className="w-4 h-4 text-[#4A4A4A]" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ===========================================================================
// DASHBOARD
// ===========================================================================

function Dashboard({ progress, overallPercent, completedCount, totalCount, onOpen, user }) {
  const firstName = user.firstName;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-[#E66433]" />
          <div className="text-xs uppercase tracking-[0.25em] text-[#E66433] font-semibold">My Training</div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4 tracking-tight">
          Welcome back, {firstName}.
        </h1>
        <p className="text-lg text-[#4A4A4A] max-w-2xl leading-relaxed">
          Work through each module at your own pace. Read the material, pass the quiz, then move to the next. Score 100% on every quiz to earn your completion badge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
        <StatCard label="Modules completed" value={`${completedCount} / ${totalCount}`} icon={BookOpen} />
        <StatCard label="Overall progress" value={`${overallPercent}%`} icon={TrendingUp} />
        <StatCard
          label="Status"
          value={overallPercent === 100 ? "Certified" : "In progress"}
          icon={overallPercent === 100 ? Trophy : PlayCircle}
          highlight={overallPercent === 100}
        />
      </div>

      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Curriculum</h2>
        <div className="text-sm text-[#767676]">{COURSE.length} modules</div>
      </div>

      <div className="space-y-3">
        {COURSE.map((section, idx) => {
          const p = progress[section.id] || {};
          const isCompleted = p.passed;
          const isStarted = p.read || p.best != null;
          const prevPassed = idx === 0 || progress[COURSE[idx - 1].id]?.passed;
          const isLocked = !prevPassed;

          return (
            <SectionCard
              key={section.id}
              section={section}
              isCompleted={isCompleted}
              isStarted={isStarted}
              isLocked={isLocked}
              recommendedNext={!isCompleted && prevPassed && idx > 0 && !isStarted}
              best={p.best}
              onClick={() => { if (!isLocked) onOpen(section.id); }}
            />
          );
        })}
      </div>

      {overallPercent === 100 && (
        <div className="mt-12 p-8 rounded-lg bg-[#E66433] text-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="relative flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <Trophy className="w-7 h-7 text-[#E66433]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1 tracking-tight">Course complete.</h3>
              <p className="text-white/90 leading-relaxed">You have passed every module. Share this achievement with your manager and put what you learned to use.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, highlight }) {
  return (
    <div className={`p-5 rounded-lg border ${highlight ? "bg-[#FDF1EC] border-[#FBE4D8]" : "bg-white border-[#E5E5E5]"}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] font-semibold">{label}</div>
        <Icon className={`w-4 h-4 ${highlight ? "text-[#E66433]" : "text-[#767676]"}`} />
      </div>
      <div className={`text-2xl font-bold ${highlight ? "text-[#E66433]" : "text-[#1A1A1A]"}`}>{value}</div>
    </div>
  );
}

function SectionCard({ section, isCompleted, isStarted, isLocked, recommendedNext, best, onClick }) {
  const Icon = isLocked ? Lock : section.icon;
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      aria-disabled={isLocked}
      className={`w-full text-left group bg-white border rounded-lg p-5 transition flex items-center gap-5 ${
        isLocked
          ? "border-[#E5E5E5] opacity-60 cursor-not-allowed"
          : "border-[#E5E5E5] hover:border-[#E66433]"
      }`}
    >
      <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 transition ${
        isLocked
          ? "bg-[#F3F3F3] text-[#767676]"
          : isCompleted
            ? "bg-[#E66433] text-white"
            : "bg-[#FDF1EC] text-[#E66433] group-hover:bg-[#FBE4D8]"
      }`}>
        <Icon className="w-6 h-6" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <div className="text-[10px] font-bold text-[#767676] tabular-nums tracking-wider">{section.number}</div>
          {isCompleted && (
            <div className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-green-50 text-green-800 flex items-center gap-1 border border-green-100">
              <CheckCircle2 className="w-3 h-3" /> Passed {Math.round((best || 0) * 100)}%
            </div>
          )}
          {!isCompleted && !isLocked && isStarted && (
            <div className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#FAFAFA] text-[#4A4A4A] border border-[#E5E5E5]">In progress</div>
          )}
          {!isLocked && recommendedNext && !isCompleted && !isStarted && (
            <div className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#FDF1EC] text-[#E66433] border border-[#FBE4D8]">Recommended next</div>
          )}
          {isLocked && (
            <div className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#F3F3F3] text-[#767676] border border-[#E5E5E5] flex items-center gap-1">
              <Lock className="w-3 h-3" /> Locked
            </div>
          )}
        </div>
        <div className={`text-lg font-bold tracking-tight ${isLocked ? "text-[#767676]" : "text-[#1A1A1A]"}`}>{section.title}</div>
        <div className={`text-sm ${isLocked ? "text-[#767676]" : "text-[#4A4A4A]"}`}>
          {isLocked ? "Pass the previous module quiz to unlock" : section.subtitle}
        </div>
      </div>

      <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
        <div className="text-xs text-[#767676]">{section.duration}</div>
        {!isLocked && (
          <div className="text-sm font-semibold text-[#E66433] flex items-center gap-1 group-hover:gap-2 transition-all">
            {isCompleted ? "Review" : isStarted ? "Continue" : "Start"}
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </button>
  );
}

// ===========================================================================
// READING VIEW
// ===========================================================================

function Reading({ section, progress, onBack, onStartQuiz }) {
  const Icon = section.icon;
  const passed = progress?.passed;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <button onClick={onBack} className="text-sm text-[#4A4A4A] hover:text-[#E66433] flex items-center gap-1.5 mb-8 transition">
        <ArrowLeft className="w-4 h-4" /> Back to curriculum
      </button>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-md bg-[#FDF1EC] flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#E66433]" />
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#767676] font-semibold">
            Module {section.number} · {section.duration}
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-[1.1] mb-4 tracking-tight">
          {section.title}
        </h1>
        <p className="text-xl text-[#4A4A4A] leading-relaxed">{section.subtitle}</p>
      </div>

      <div className="h-1 w-16 bg-[#E66433] rounded-full mb-10" />

      <p className="text-lg text-[#1A1A1A] leading-relaxed mb-8 first-letter:text-6xl first-letter:font-bold first-letter:text-[#E66433] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.9]">
        {section.reading.lead}
      </p>

      <div className="space-y-8">
        {section.reading.blocks.map((block, i) => <ContentBlock key={i} block={block} />)}
      </div>

      {section.dictionary && section.dictionary.length > 0 && (
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid #E5E5E5"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "0.75rem" }}>
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
                backgroundColor: "#FDF1EC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <BookOpen style={{ width: "1.25rem", height: "1.25rem", color: "#E66433" }} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "#E66433",
                  fontWeight: 700
                }}
              >
                Glossary
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em" }}>
                Key terms
              </div>
            </div>
          </div>
          <p style={{ color: "#4A4A4A", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            Technical terms that appear in this module, plain-English definitions. Helpful if you encounter them in a customer conversation and want a quick reference.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "0.75rem"
            }}
          >
            {section.dictionary.map((entry, i) => (
              <div
                key={i}
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #E5E5E5",
                  backgroundColor: "#FFFFFF"
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: "#E66433",
                    marginBottom: "0.375rem",
                    fontSize: "0.95rem"
                  }}
                >
                  {entry.term}
                </div>
                <div style={{ color: "#2A2A2A", lineHeight: 1.6, fontSize: "0.9rem" }}>
                  {entry.def}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 pt-10 border-t border-[#E5E5E5] text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-[#E66433] font-bold mb-2">Ready to test yourself?</div>
        <div className="text-lg font-bold text-[#1A1A1A] mb-2">Module {section.number} Quiz</div>
        <div className="text-sm text-[#4A4A4A] mb-8">5 randomized questions · pass at 100% to unlock the next module</div>
        <button
          onClick={onStartQuiz}
          style={{
            backgroundColor: "#E66433",
            color: "#FFFFFF",
            padding: "1.25rem 3rem",
            borderRadius: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: "700",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(230, 100, 51, 0.35)",
            transition: "all 0.15s ease"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#C94F22";
            e.currentTarget.style.boxShadow = "0 10px 28px rgba(230, 100, 51, 0.45)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "#E66433";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(230, 100, 51, 0.35)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {passed ? "Retake Quiz" : "Take Quiz"} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function ContentBlock({ block }) {
  if (block.type === "h2") {
    return <h2 className="text-2xl font-bold text-[#1A1A1A] mt-4 tracking-tight">{block.text}</h2>;
  }
  if (block.type === "p") {
    return <p className="text-base md:text-lg text-[#2A2A2A] leading-relaxed">{block.text}</p>;
  }
  if (block.type === "list") {
    return (
      <ul className="space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E66433] mt-2.5 flex-shrink-0" />
            <span className="text-[#2A2A2A] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {block.cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="p-5 rounded-lg border border-[#E5E5E5] bg-white hover:border-[#E66433] transition">
              <div className="w-9 h-9 rounded-md bg-[#FDF1EC] flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-[#E66433]" />
              </div>
              <div className="font-bold text-[#1A1A1A] mb-1.5">{card.title}</div>
              <div className="text-sm text-[#4A4A4A] leading-relaxed">{card.text}</div>
            </div>
          );
        })}
      </div>
    );
  }
  if (block.type === "callouts") {
    return (
      <div className="space-y-3">
        {block.items.map((item, i) => (
          <div key={i} className="p-4 rounded-md bg-[#FDF1EC] border-l-4 border-[#E66433]">
            <div className="font-bold text-[#1A1A1A] text-sm mb-1">{item.title}</div>
            <div className="text-sm text-[#2A2A2A] leading-relaxed">{item.text}</div>
          </div>
        ))}
      </div>
    );
  }
  if (block.type === "phases") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {block.items.map((item, i) => (
          <div key={i} className="p-4 rounded-lg border border-[#E5E5E5] bg-white">
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-bold text-[#1A1A1A]">{item.phase}</div>
              <div className="text-xs text-[#E66433] font-semibold">{item.weeks}</div>
            </div>
            <ul className="space-y-1">
              {item.bullets.map((b, j) => (
                <li key={j} className="text-sm text-[#4A4A4A] flex gap-2">
                  <Circle className="w-1.5 h-1.5 mt-2 flex-shrink-0 text-[#E66433]" fill="currentColor" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  if (block.type === "objections") {
    return (
      <div className="space-y-3">
        {block.items.map((item, i) => (
          <div key={i} className="rounded-lg border border-[#E5E5E5] overflow-hidden bg-white">
            <div className="px-4 py-3 bg-[#FAFAFA] border-b border-[#E5E5E5]">
              <div className="text-[10px] uppercase tracking-wider text-[#767676] font-bold mb-0.5">Objection</div>
              <div className="font-medium text-[#1A1A1A] italic">"{item.obj}"</div>
            </div>
            <div className="px-4 py-3 border-l-4 border-[#E66433]">
              <div className="text-[10px] uppercase tracking-wider text-[#E66433] font-bold mb-0.5">Response</div>
              <div className="text-[#2A2A2A] leading-relaxed">{item.resp}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (block.type === "key") {
    return (
      <div
        className="mt-6 rounded-lg relative overflow-hidden"
        style={{
          backgroundColor: "#1A1A1A",
          color: "#FFFFFF",
          padding: "1.5rem"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: "100%",
            backgroundColor: "#E66433"
          }}
        />
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", position: "relative" }}>
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.375rem",
              backgroundColor: "#E66433",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <Lightbulb className="w-5 h-5" style={{ color: "#FFFFFF" }} />
          </div>
          <div>
            <div
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "#E66433",
                fontWeight: 600,
                marginBottom: "0.375rem"
              }}
            >
              {block.title}
            </div>
            <div style={{ fontSize: "1.125rem", lineHeight: 1.6, color: "#FFFFFF" }}>
              {block.text}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

// ===========================================================================
// QUIZ
// ===========================================================================

function Quiz({ section, quizState, onAnswer, onSubmit, onBack, onRetry, onNext }) {
  const questions = quizState.questions;
  const answeredCount = Object.keys(quizState.answers).length;
  const totalCount = questions.length;
  const canSubmit = answeredCount === totalCount && totalCount > 0;
  const submitted = quizState.submitted;

  // Scoring (only meaningful after submission)
  const correct = questions.reduce((acc, q, i) => acc + (quizState.answers[i] === q.correct ? 1 : 0), 0);
  const pct = totalCount ? Math.round((correct / totalCount) * 100) : 0;
  const passed = pct >= Math.round(PASS_THRESHOLD * 100);

  const idx = COURSE.findIndex(s => s.id === section.id);
  const nextSection = COURSE[idx + 1];
  const isLast = idx === COURSE.length - 1;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <button onClick={onBack} className="text-sm text-[#4A4A4A] hover:text-[#E66433] flex items-center gap-1.5 mb-8 transition">
        <ArrowLeft className="w-4 h-4" /> Back to curriculum
      </button>

      {/* Header: intro before submit, percentage banner after submit */}
      {!submitted ? (
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-[#E66433] font-semibold mb-2">Module {section.number} Quiz</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
            {section.title}
          </h1>
          <p className="text-[#4A4A4A]">Answer all {totalCount} questions. You need 100% to pass. Questions are randomized each attempt.</p>
        </div>
      ) : (
        <div
          style={{
            marginBottom: "2.5rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid #E5E5E5",
            textAlign: "center"
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#767676",
              fontWeight: 600,
              marginBottom: "0.75rem"
            }}
          >
            Module {section.number} Results
          </div>
          <div
            style={{
              fontSize: "5rem",
              fontWeight: 800,
              color: "#1A1A1A",
              lineHeight: 1,
              marginBottom: "0.5rem",
              fontVariantNumeric: "tabular-nums"
            }}
          >
            {pct}%
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: 900,
              color: passed ? "#16A34A" : "#DC2626",
              letterSpacing: "0.15em",
              marginBottom: "0.75rem"
            }}
          >
            {passed ? "PASS" : "FAIL"}
          </div>
          <div style={{ fontSize: "0.95rem", color: "#4A4A4A" }}>
            {correct} of {totalCount} correct
            {passed
              ? " · next module unlocked"
              : " · 100% required, new questions on retry"}
          </div>
        </div>
      )}

      {/* Answered progress bar (only before submit) */}
      {!submitted && (
        <div className="bg-white py-3 mb-6 rounded-lg border border-[#E5E5E5] px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-[#4A4A4A] tabular-nums">{answeredCount} / {totalCount} answered</div>
            <div className="flex-1 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden max-w-xs">
              <div className="h-full bg-[#E66433] transition-all" style={{ width: `${totalCount ? (answeredCount / totalCount) * 100 : 0}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qi) => {
          const userAns = quizState.answers[qi];
          const isQuestionCorrect = submitted && userAns === q.correct;
          return (
            <div
              key={qi}
              className={`bg-white border rounded-lg p-6 transition ${
                !submitted
                  ? "border-[#E5E5E5]"
                  : isQuestionCorrect
                    ? "border-green-400"
                    : "border-red-400"
              }`}
            >
              <div className="flex items-baseline gap-3 mb-5">
                <div className={`text-sm font-bold tabular-nums ${
                  !submitted ? "text-[#E66433]" : isQuestionCorrect ? "text-green-600" : "text-red-600"
                }`}>Q{qi + 1}</div>
                <div className="text-lg font-semibold text-[#1A1A1A] leading-snug flex-1">{q.q}</div>
                {submitted && (
                  isQuestionCorrect
                    ? <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    : <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                )}
              </div>

              <div className="space-y-2">
                {q.options.map((opt, ai) => {
                  const selected = userAns === ai;
                  const isCorrectOption = ai === q.correct;

                  // Styling varies by state
                  let buttonClass, indicatorClass, indicatorContent, textClass;

                  if (submitted) {
                    if (isCorrectOption) {
                      // Always highlight the correct option green when submitted
                      buttonClass = "bg-green-50 border-green-500";
                      indicatorClass = "bg-green-500 border-green-500";
                      indicatorContent = <CheckCircle2 className="w-3 h-3 text-white" />;
                      textClass = "text-green-900 font-semibold";
                    } else if (selected) {
                      // User picked this but it is wrong
                      buttonClass = "bg-red-50 border-red-500";
                      indicatorClass = "bg-red-500 border-red-500";
                      indicatorContent = <XCircle className="w-3 h-3 text-white" />;
                      textClass = "text-red-900 font-semibold";
                    } else {
                      buttonClass = "bg-white border-[#E5E5E5] opacity-60";
                      indicatorClass = "border-[#767676]";
                      indicatorContent = null;
                      textClass = "text-[#4A4A4A]";
                    }
                  } else {
                    // Pre-submit
                    if (selected) {
                      buttonClass = "bg-[#FDF1EC] border-[#E66433] ring-2 ring-[#E66433]/30";
                      indicatorClass = "bg-[#E66433] border-[#E66433]";
                      indicatorContent = <div className="w-2 h-2 rounded-full bg-white" />;
                      textClass = "text-[#1A1A1A] font-semibold";
                    } else {
                      buttonClass = "bg-white border-[#E5E5E5] hover:border-[#FBE4D8] hover:bg-[#FDF1EC]/40";
                      indicatorClass = "border-[#767676]";
                      indicatorContent = null;
                      textClass = "text-[#2A2A2A]";
                    }
                  }

                  return (
                    <button
                      key={ai}
                      onClick={() => !submitted && onAnswer(qi, ai)}
                      disabled={submitted}
                      className={`w-full text-left px-4 py-3 rounded-md border transition flex items-start gap-3 ${buttonClass} ${submitted ? "cursor-default" : ""}`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${indicatorClass}`}>
                        {indicatorContent}
                      </div>
                      <span className={textClass}>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {submitted && (
                <div className="mt-4 p-3 rounded-md bg-[#FAFAFA] border-l-4 border-[#E66433] text-sm text-[#4A4A4A]">
                  <span className="font-semibold text-[#1A1A1A]">Why: </span>{q.why}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom actions: submit before, retake/next after */}
      {!submitted ? (
        <div className="mt-10 flex justify-end">
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            style={{
              backgroundColor: canSubmit ? "#E66433" : "#E66433",
              color: "#FFFFFF",
              padding: "1rem 2rem",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              border: "none",
              cursor: canSubmit ? "pointer" : "not-allowed",
              opacity: canSubmit ? 1 : 0.4,
              boxShadow: "0 4px 12px rgba(230, 100, 51, 0.25)",
              transition: "all 0.15s ease"
            }}
            onMouseEnter={e => {
              if (!canSubmit) return;
              e.currentTarget.style.backgroundColor = "#C94F22";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(230, 100, 51, 0.35)";
            }}
            onMouseLeave={e => {
              if (!canSubmit) return;
              e.currentTarget.style.backgroundColor = "#E66433";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(230, 100, 51, 0.25)";
            }}
          >
            Submit Quiz <ClipboardCheck className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onRetry}
            className="px-5 py-3 rounded-md border border-[#E5E5E5] text-[#4A4A4A] font-semibold hover:bg-[#FAFAFA] hover:border-[#E66433] hover:text-[#E66433] transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Retake Quiz
          </button>
          <button
            onClick={onBack}
            className="px-5 py-3 rounded-md border border-[#E5E5E5] text-[#4A4A4A] font-semibold hover:bg-[#FAFAFA] transition"
          >
            Back to curriculum
          </button>
          {passed && !isLast && (
            <button
              onClick={onNext}
              style={{
                backgroundColor: "#E66433",
                color: "#FFFFFF",
                padding: "0.75rem 1.25rem",
                borderRadius: "0.375rem",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.15s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#C94F22"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#E66433"; }}
            >
              Next: {nextSection.title} <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {passed && isLast && (
            <button
              onClick={onBack}
              style={{
                backgroundColor: "#E66433",
                color: "#FFFFFF",
                padding: "0.75rem 1.25rem",
                borderRadius: "0.375rem",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.15s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#C94F22"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#E66433"; }}
            >
              <Trophy className="w-4 h-4" /> Complete course
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// FOOTER
// ===========================================================================

function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] mt-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src={LOGO_SRC} alt="SmarTek21" className="h-6 w-auto opacity-80" />
          <div className="text-xs text-[#767676]">Training Hub · Internal training material</div>
        </div>
        <div className="text-xs text-[#767676]">For questions, contact the training team.</div>
      </div>
    </footer>
  );
}

// ===========================================================================
// ADMIN VIEW
// Two states: list of all users, or detail view for one user.
// ===========================================================================

function AdminView({ apiCall, onBack }) {
  const [tab, setTab] = useState("users"); // users | costs
  const [view, setView] = useState("list"); // list | detail (within the Users tab)
  const [selectedEmail, setSelectedEmail] = useState(null);

  // A user's detail page is a full-screen drill-down within the Users tab (it
  // has its own "back" to the list), so the sub-tabs are hidden there.
  if (tab === "users" && view === "detail" && selectedEmail) {
    return (
      <AdminUserDetail
        email={selectedEmail}
        apiCall={apiCall}
        onBack={() => { setView("list"); setSelectedEmail(null); }}
      />
    );
  }

  return (
    <div>
      <AdminTabs tab={tab} onTab={setTab} />
      {tab === "users" ? (
        <AdminUserList
          apiCall={apiCall}
          onBack={onBack}
          onSelectUser={(email) => { setSelectedEmail(email); setView("detail"); }}
        />
      ) : (
        <AdminCosts apiCall={apiCall} />
      )}
    </div>
  );
}

// Segmented "Users | Costs" control at the top of the admin area, styled with
// the admin accent tokens (#E66433 / #FDF1EC).
function AdminTabs({ tab, onTab }) {
  const tabs = [
    { id: "users", label: "Users" },
    { id: "costs", label: "Costs" },
  ];
  return (
    <div className="max-w-6xl mx-auto px-6 pt-10">
      <div className="inline-flex rounded-lg border border-[#E5E5E5] overflow-hidden">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onTab(t.id)}
              style={{
                padding: "0.5rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                backgroundColor: active ? "#FDF1EC" : "#FFFFFF",
                color: active ? "#E66433" : "#4A4A4A",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Admin cost dashboard — total + per-service breakdown + daily trend for the
// ST21 project, from /api/admin-costs (AWS Cost Explorer, tag-filtered). A 503
// (cost_data_unavailable) degrades to a clear message rather than a raw error;
// an all-$0 result is a valid state (tags apply going forward, ~24h lag).
function AdminCosts({ apiCall }) {
  const [range, setRange] = useState("mtd"); // mtd | last30d
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null); // { unavailable, message } | null
  // Ignore responses from superseded loads (fast range toggles / refreshes) so a
  // slow earlier fetch can't overwrite a newer one.
  const reqId = useRef(0);

  // Shared loader. force=true appends ?refresh=1 so the API skips its cache and
  // pulls current numbers straight from Cost Explorer.
  const loadCosts = useCallback(async ({ force = false } = {}) => {
    const myId = ++reqId.current;
    if (force) setRefreshing(true); else setLoading(true);
    setError(null);
    try {
      const result = await apiCall(`/api/admin-costs?range=${range}${force ? "&refresh=1" : ""}`);
      if (myId === reqId.current) setData(result);
    } catch (err) {
      console.error("admin-costs fetch failed:", err);
      if (myId === reqId.current) {
        const unavailable = err.status === 503 || err.body?.error === "cost_data_unavailable";
        setError(unavailable
          ? { unavailable: true, message: "Cost data is temporarily unavailable. Please try again shortly." }
          : { unavailable: false, message: err.message || "Failed to load costs" });
        setData(null);
      }
    } finally {
      if (myId === reqId.current) { setLoading(false); setRefreshing(false); }
    }
  }, [apiCall, range]);

  useEffect(() => { loadCosts(); }, [loadCosts]);

  // Show up to 6 decimal places so every service — down to fractions of a cent
  // (e.g. CloudFront at $0.000004) — renders a real figure instead of $0.00.
  // Larger figures still render normally (2 dp).
  const fmt = (n) => `$${(n ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
  const rangeLabel = range === "mtd" ? "month to date" : "last 30 days";
  const isEmpty = data && data.total === 0 && (data.byService?.length || 0) === 0;
  const trendMax = data?.trend?.length ? Math.max(...data.trend.map((t) => t.amount), 0) : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-[#E66433]" />
          <div className="text-xs uppercase tracking-[0.25em] text-[#E66433] font-semibold">Admin</div>
        </div>
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-2 tracking-tight">Hosting costs</h1>
        <p className="text-[#4A4A4A]">
          Figures come from AWS Cost Explorer and refresh a few times a day.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
        <div className="inline-flex rounded-lg border border-[#E5E5E5] overflow-hidden">
          {[{ id: "mtd", label: "Month to date" }, { id: "last30d", label: "Last 30 days" }].map((r) => {
            const active = range === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRange(r.id)}
                style={{ padding: "0.4rem 1rem", fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: "pointer", backgroundColor: active ? "#FDF1EC" : "#FFFFFF", color: active ? "#E66433" : "#4A4A4A" }}
              >
                {r.label}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => loadCosts({ force: true })}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2 text-xs font-semibold text-[#4A4A4A] hover:bg-[#FAFAFA] disabled:opacity-50 disabled:cursor-not-allowed"
          title="Fetch the latest numbers from AWS Cost Explorer now, bypassing the cache"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {loading && <div className="text-center py-16 text-[#4A4A4A]">Loading costs…</div>}

      {error && (
        <div className="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-900">
          <strong>{error.unavailable ? "Temporarily unavailable:" : "Error:"}</strong> {error.message}
        </div>
      )}

      {!loading && !error && data && (
        <>
          <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 mb-8 flex items-baseline justify-between">
            <div>
              <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#767676", fontWeight: 600, marginBottom: "0.25rem" }}>Total ({rangeLabel})</div>
              <div className="text-4xl font-bold text-[#1A1A1A] tabular-nums">{fmt(data.total)}</div>
            </div>
            <div className="text-xs text-[#767676] text-right">
              {data.cached ? "cached" : "live"} · as of {formatRelativeDate(data.asOf)}
            </div>
          </div>

          {isEmpty && (
            <div className="p-4 mb-8 rounded-md bg-[#FDF1EC] border border-[#F3D9CC] text-sm text-[#8A4B2E]">
              No tagged costs recorded for this period yet. Cost-allocation tags apply going forward and can take up to ~24h to appear, so this may read $0.00 until spend accrues.
            </div>
          )}

          {data.byService?.length > 0 && (
            <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden mb-8">
              <table className="w-full">
                <thead style={{ backgroundColor: "#FAFAFA", borderBottom: "1px solid #E5E5E5" }}>
                  <tr><Th>Service</Th><Th>Cost</Th><Th>Share</Th></tr>
                </thead>
                <tbody>
                  {data.byService.map((s) => (
                    <tr key={s.service} style={{ borderBottom: "1px solid #F3F3F3" }}>
                      <Td><span className="font-semibold text-[#1A1A1A]">{s.service}</span></Td>
                      <Td><span className="tabular-nums text-[#1A1A1A]">{fmt(s.amount)}</span></Td>
                      <Td><span className="tabular-nums text-[#767676]">{data.total > 0 ? Math.round((s.amount / data.total) * 100) : 0}%</span></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data.trend?.length > 0 && (
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-6">
              <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#767676", fontWeight: 600, marginBottom: "1rem" }}>Daily trend</div>
              <div className="flex items-end gap-1" style={{ height: "120px" }}>
                {data.trend.map((t) => {
                  const h = trendMax > 0 ? Math.max(2, (t.amount / trendMax) * 100) : 2;
                  return (
                    <div key={t.date} title={`${t.date}: ${fmt(t.amount)}`} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                      <div style={{ height: `${h}%`, backgroundColor: "#E66433", borderRadius: "2px 2px 0 0", minHeight: "2px" }} />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2" style={{ fontSize: "0.65rem", color: "#767676" }}>
                <span>{data.trend[0]?.date}</span>
                <span>{data.trend[data.trend.length - 1]?.date}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AdminUserList({ apiCall, onBack, onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiCall("/api/admin-users");
        if (!cancelled) setUsers(data.users || []);
      } catch (err) {
        console.error("admin-users fetch failed:", err);
        if (!cancelled) setError(err.message || "Failed to load users");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [apiCall]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-[#E66433]" />
          <div className="text-xs uppercase tracking-[0.25em] text-[#E66433] font-semibold">Admin</div>
        </div>
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-2 tracking-tight">User progress</h1>
        <p className="text-[#4A4A4A]">All users who have signed in to the Training Hub. Click a row to see their full progress and quiz history.</p>
      </div>

      {loading && (
        <div className="text-center py-16 text-[#4A4A4A]">Loading users…</div>
      )}

      {error && (
        <div className="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-900">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="text-center py-16 text-[#767676]">No users yet. Once people sign in, they will appear here.</div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead style={{ backgroundColor: "#FAFAFA", borderBottom: "1px solid #E5E5E5" }}>
              <tr>
                <Th>User</Th>
                <Th>Modules passed</Th>
                <Th>Avg score</Th>
                <Th>Logins</Th>
                <Th>Last seen</Th>
                <Th>{""}</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.email}
                  onClick={() => onSelectUser(u.email)}
                  style={{ borderBottom: "1px solid #F3F3F3", cursor: "pointer", transition: "background-color 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FDF1EC"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <Td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E66433] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {((u.firstName?.charAt(0) || "") + (u.lastInitial || "")).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A1A1A]">
                          {u.firstName ? `${u.firstName} ${u.lastInitial || ""}.` : u.email}
                          {u.isAdmin && <span style={{ marginLeft: "0.5rem", fontSize: "0.65rem", padding: "0.125rem 0.375rem", borderRadius: "0.25rem", backgroundColor: "#FDF1EC", color: "#E66433", fontWeight: 700, letterSpacing: "0.05em" }}>ADMIN</span>}
                        </div>
                        <div className="text-xs text-[#767676]">{u.email}</div>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span className="font-semibold text-[#1A1A1A]">{u.modulesPassed}</span>
                    <span className="text-[#767676]"> / {COURSE.length}</span>
                  </Td>
                  <Td>
                    {u.modulesStarted > 0
                      ? <span className="tabular-nums">{Math.round(u.avgBestScore * 100)}%</span>
                      : <span className="text-[#767676]">—</span>}
                  </Td>
                  <Td>
                    <span className="tabular-nums text-[#1A1A1A]">{u.totalLogins}</span>
                  </Td>
                  <Td>
                    <span className="text-sm text-[#4A4A4A]">{formatRelativeDate(u.lastSeen)}</span>
                  </Td>
                  <Td>
                    <ChevronRight className="w-4 h-4 text-[#767676]" />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-xs text-[#767676]">
        Showing {users.length} {users.length === 1 ? "user" : "users"} · refresh the page to update
      </div>
    </div>
  );
}

function AdminUserDetail({ email, apiCall, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiCall(`/api/admin-user-detail?email=${encodeURIComponent(email)}`);
        if (!cancelled) setData(result);
      } catch (err) {
        console.error("admin-user-detail fetch failed:", err);
        if (!cancelled) setError(err.message || "Failed to load user");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [email, apiCall]);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-6 py-24 text-center text-[#4A4A4A]">Loading…</div>;
  }
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button onClick={onBack} className="text-sm text-[#4A4A4A] hover:text-[#E66433] flex items-center gap-1.5 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to user list
        </button>
        <div className="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-900">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }
  if (!data) return null;

  const { user: u, progress, attempts } = data;
  const passedCount = progress.filter(p => p.passed).length;
  const startedCount = progress.length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button onClick={onBack} className="text-sm text-[#4A4A4A] hover:text-[#E66433] flex items-center gap-1.5 mb-6 transition">
        <ArrowLeft className="w-4 h-4" /> Back to user list
      </button>

      <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-[#E66433] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            {((u.firstName?.charAt(0) || "") + (u.lastInitial || "")).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1A1A1A]">
                {u.firstName ? `${u.firstName} ${u.lastInitial || ""}.` : u.email}
              </h1>
              {u.isAdmin && (
                <span style={{ fontSize: "0.7rem", padding: "0.125rem 0.5rem", borderRadius: "0.25rem", backgroundColor: "#FDF1EC", color: "#E66433", fontWeight: 700, letterSpacing: "0.05em" }}>ADMIN</span>
              )}
            </div>
            <div className="text-sm text-[#767676]">{u.email}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#F3F3F3]">
          <Stat label="Modules passed" value={`${passedCount} / ${COURSE.length}`} />
          <Stat label="Modules started" value={startedCount} />
          <Stat label="Total logins" value={u.totalLogins} />
          <Stat label="Last seen" value={formatRelativeDate(u.lastSeen)} />
        </div>
      </div>

      {/* Progress per section */}
      <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 mt-8">Module progress</h2>
      <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden mb-8">
        {COURSE.map((section, idx) => {
          const p = progress.find(x => x.sectionId === section.id);
          const last = idx === COURSE.length - 1;
          return (
            <div
              key={section.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.875rem 1.25rem",
                borderBottom: last ? "none" : "1px solid #F3F3F3"
              }}
            >
              <div className="text-xs font-bold tabular-nums text-[#767676] w-6">{section.number}</div>
              <div className="flex-1 text-sm font-medium text-[#1A1A1A]">{section.title}</div>
              {!p && <span className="text-xs text-[#767676]">Not started</span>}
              {p && p.passed && (
                <span style={{ fontSize: "0.75rem", padding: "0.125rem 0.5rem", borderRadius: "0.25rem", backgroundColor: "#DCFCE7", color: "#166534", fontWeight: 600 }}>
                  Passed · {Math.round(p.bestScore * 100)}%
                </span>
              )}
              {p && !p.passed && p.attemptsCount > 0 && (
                <span style={{ fontSize: "0.75rem", padding: "0.125rem 0.5rem", borderRadius: "0.25rem", backgroundColor: "#FEE2E2", color: "#991B1B", fontWeight: 600 }}>
                  Failed · best {Math.round(p.bestScore * 100)}% · {p.attemptsCount} attempts
                </span>
              )}
              {p && !p.passed && p.attemptsCount === 0 && p.read && (
                <span className="text-xs text-[#767676]">Read, not yet quizzed</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz attempt history */}
      <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">Quiz attempts (last 50)</h2>
      {attempts.length === 0 && (
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 text-center text-sm text-[#767676]">
          No quiz attempts yet.
        </div>
      )}
      {attempts.length > 0 && (
        <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead style={{ backgroundColor: "#FAFAFA", borderBottom: "1px solid #E5E5E5" }}>
              <tr>
                <Th>Module</Th>
                <Th>Score</Th>
                <Th>Result</Th>
                <Th>When</Th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a) => {
                const section = COURSE.find(s => s.id === a.sectionId);
                return (
                  <tr key={a.id} style={{ borderBottom: "1px solid #F3F3F3" }}>
                    <Td>
                      <div className="text-xs text-[#767676]">{section?.number || "?"}</div>
                      <div className="text-sm font-medium text-[#1A1A1A]">{section?.title || a.sectionId}</div>
                    </Td>
                    <Td>
                      <span className="tabular-nums font-semibold">{Math.round(a.score * 100)}%</span>
                    </Td>
                    <Td>
                      {a.passed
                        ? <span style={{ fontSize: "0.75rem", padding: "0.125rem 0.5rem", borderRadius: "0.25rem", backgroundColor: "#DCFCE7", color: "#166534", fontWeight: 600 }}>PASS</span>
                        : <span style={{ fontSize: "0.75rem", padding: "0.125rem 0.5rem", borderRadius: "0.25rem", backgroundColor: "#FEE2E2", color: "#991B1B", fontWeight: 600 }}>FAIL</span>}
                    </Td>
                    <Td>
                      <span className="text-sm text-[#4A4A4A]">{formatRelativeDate(a.submittedAt)}</span>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Tiny helper components used in the admin tables
function Th({ children }) {
  return (
    <th style={{ textAlign: "left", padding: "0.75rem 1.25rem", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#767676", fontWeight: 700 }}>
      {children}
    </th>
  );
}

function Td({ children }) {
  return (
    <td style={{ padding: "0.875rem 1.25rem", verticalAlign: "middle" }}>
      {children}
    </td>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#767676", fontWeight: 600, marginBottom: "0.25rem" }}>{label}</div>
      <div className="text-lg font-bold text-[#1A1A1A]">{value}</div>
    </div>
  );
}

// Format an ISO date string like "5 minutes ago" or "Apr 24"
function formatRelativeDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  const now = new Date();
  const diffMs = now - d;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: d.getFullYear() === now.getFullYear() ? undefined : "numeric" });
}