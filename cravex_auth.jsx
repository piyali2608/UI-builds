import { useState } from "react";

const MOCK_USERS = {
  "demo@uni.edu": {
    password: "cravex123",
    name: "Jordan Lee",
    college: "Westfield University",
    year: "3rd Year · CS Major",
    joined: "Sep 2024",
    avatar: "JL",
    avatarColor: "#ff4d1c",
    bio: "Late night ramen runs and extra chilli on everything. Cravex saved my GPA.",
    orders: 38,
    saved: 5,
    points: 2140,
    fav: "🍜 Spicy Ramen Bowl",
    badge: "🔥 Firestarter",
    campus: "North Campus Hub",
  },
};

const AVATARS_COLORS = ["#ff4d1c", "#f59e0b", "#10b981", "#6366f1", "#ec4899"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .cx-root {
    min-height: 100vh;
    background: #0e0e0e;
    font-family: 'Barlow', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* Background */
  .cx-noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.5;
  }
  .cx-blob {
    position: fixed; pointer-events: none; border-radius: 50%;
    filter: blur(100px); opacity: 0.07;
  }
  .cx-blob-1 { width:500px;height:500px; background:#ff4d1c; top:-150px; right:-100px; }
  .cx-blob-2 { width:400px;height:400px; background:#ff8c00; bottom:-150px; left:-80px; }

  /* Card */
  .cx-card {
    position: relative; z-index: 1;
    width: 440px;
    background: #161616;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 20px;
    padding: 44px 40px 40px;
    animation: slideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,77,28,0.05);
  }
  @keyframes slideUp {
    from { opacity:0; transform: translateY(40px) scale(0.97); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }

  /* Logo */
  .cx-logo {
    display: flex; align-items: center; gap: 10px; margin-bottom: 32px;
  }
  .cx-logo-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #ff4d1c, #ff8c00);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(255,77,28,0.4);
    flex-shrink: 0;
  }
  .cx-logo-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 800;
    letter-spacing: 0.06em; color: #fff;
    text-transform: uppercase;
    display: flex; align-items: center; gap: 1px;
  }
  .cx-logo-text .ex { color: #ff4d1c; display: inline-flex; align-items: center; }

  /* Heading */
  .cx-heading {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 42px; font-weight: 800;
    line-height: 1; color: #fff;
    text-transform: uppercase; letter-spacing: 0.01em;
    margin-bottom: 6px;
  }
  .cx-heading .accent { color: #ff4d1c; }
  .cx-sub {
    font-size: 14px; font-weight: 300;
    color: rgba(255,255,255,0.35);
    margin-bottom: 32px; line-height: 1.5;
  }

  /* Fields */
  .cx-field { margin-bottom: 16px; }
  .cx-field label {
    display: block; font-size: 10px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(255,255,255,0.3); margin-bottom: 8px;
  }
  .cx-field input {
    width: 100%; padding: 13px 16px;
    background: #1e1e1e;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px; color: #fff;
    font-family: 'Barlow', sans-serif; font-size: 15px;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .cx-field input::placeholder { color: rgba(255,255,255,0.18); }
  .cx-field input:focus {
    border-color: rgba(255,77,28,0.5);
    box-shadow: 0 0 0 3px rgba(255,77,28,0.1);
    background: #1e1e1e;
  }

  /* Row */
  .cx-row { display: flex; gap: 12px; }
  .cx-row .cx-field { flex: 1; }

  /* Button */
  .cx-btn {
    width: 100%; padding: 14px;
    background: linear-gradient(135deg, #ff4d1c 0%, #ff8c00 100%);
    border: none; border-radius: 10px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 17px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff; cursor: pointer; margin-top: 8px;
    transition: all 0.2s;
    box-shadow: 0 4px 20px rgba(255,77,28,0.35);
  }
  .cx-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(255,77,28,0.5);
  }
  .cx-btn:active { transform: translateY(0); }

  /* Error */
  .cx-error {
    background: rgba(255,60,60,0.08);
    border: 1px solid rgba(255,60,60,0.2);
    border-radius: 8px; padding: 10px 14px;
    font-size: 13px; color: #ff7070;
    margin-bottom: 16px;
  }

  /* Divider */
  .cx-divider {
    display: flex; align-items: center; gap: 14px;
    margin: 24px 0; color: rgba(255,255,255,0.15);
    font-size: 11px; letter-spacing: 0.08em;
  }
  .cx-divider::before, .cx-divider::after {
    content: ''; flex: 1; height: 1px;
    background: rgba(255,255,255,0.07);
  }

  /* Switch */
  .cx-switch {
    text-align: center; font-size: 14px;
    color: rgba(255,255,255,0.3); margin-top: 20px;
  }
  .cx-link {
    color: #ff4d1c; background: none; border: none;
    font-family: 'Barlow', sans-serif; font-size: 14px;
    font-weight: 500; cursor: pointer;
    text-decoration: underline; text-underline-offset: 3px;
  }
  .cx-link:hover { color: #ff7a50; }

  .cx-hint {
    text-align: center; font-size: 11px;
    color: rgba(255,255,255,0.15); margin-top: 14px;
    letter-spacing: 0.04em;
  }

  /* ─── PROFILE ─── */
  .cx-profile {
    position: relative; z-index: 1;
    width: 480px;
    background: #161616;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 20px; overflow: hidden;
    animation: slideUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6);
  }

  .cx-profile-header {
    background: linear-gradient(160deg, #1f1208 0%, #1a0a00 60%, #0e0e0e 100%);
    padding: 32px 36px 28px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    position: relative; overflow: hidden;
  }
  .cx-profile-header::after {
    content: '';
    position: absolute; top: -40px; right: -40px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,77,28,0.15), transparent 70%);
  }

  .cx-profile-top {
    display: flex; align-items: flex-start;
    gap: 18px; position: relative; z-index: 1;
  }

  .cx-avatar {
    width: 72px; height: 72px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 26px; font-weight: 800; color: #fff;
    flex-shrink: 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    position: relative;
  }
  .cx-avatar-online {
    position: absolute; bottom: -3px; right: -3px;
    width: 14px; height: 14px; border-radius: 50%;
    background: #22c55e; border: 2px solid #161616;
  }

  .cx-profile-info { flex: 1; }
  .cx-profile-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px; font-weight: 800;
    text-transform: uppercase; color: #fff;
    letter-spacing: 0.03em; line-height: 1;
    margin-bottom: 4px;
  }
  .cx-profile-college {
    font-size: 13px; color: rgba(255,255,255,0.4);
    margin-bottom: 8px;
  }
  .cx-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px;
    background: rgba(255,77,28,0.12);
    border: 1px solid rgba(255,77,28,0.25);
    border-radius: 100px; font-size: 12px;
    color: #ff6b3d; font-weight: 500;
  }

  .cx-logo-sm {
    display: flex; align-items: center; gap: 7px;
    margin-bottom: 16px;
    position: relative; z-index: 1;
  }
  .cx-logo-sm-icon {
    width: 26px; height: 26px; border-radius: 7px;
    background: linear-gradient(135deg, #ff4d1c, #ff8c00);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
  }
  .cx-logo-sm-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 15px; font-weight: 800;
    letter-spacing: 0.08em; color: #fff; text-transform: uppercase;
    display: flex; align-items: center; gap: 1px;
  }
  .cx-logo-sm-text .ex { color: #ff4d1c; display: inline-flex; align-items: center; }

  .cx-profile-body { padding: 24px 36px 32px; }

  .cx-bio {
    font-size: 14px; line-height: 1.6;
    color: rgba(255,255,255,0.4);
    border-left: 2px solid #ff4d1c;
    padding-left: 14px; margin-bottom: 24px;
    font-style: italic;
  }

  .cx-stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px; border-radius: 12px; overflow: hidden;
    margin-bottom: 20px;
  }
  .cx-stat {
    background: #1e1e1e; padding: 16px 12px; text-align: center;
  }
  .cx-stat-val {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px; font-weight: 800; color: #fff;
    line-height: 1;
  }
  .cx-stat-val.fire { color: #ff4d1c; }
  .cx-stat-lbl {
    font-size: 10px; text-transform: uppercase;
    letter-spacing: 0.1em; color: rgba(255,255,255,0.28);
    margin-top: 4px;
  }

  .cx-info-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 10px; margin-bottom: 24px;
  }
  .cx-info-item {
    background: #1e1e1e; border-radius: 10px;
    padding: 12px 14px;
  }
  .cx-info-lbl {
    font-size: 10px; text-transform: uppercase;
    letter-spacing: 0.1em; color: rgba(255,255,255,0.25);
    margin-bottom: 4px;
  }
  .cx-info-val {
    font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.75);
  }

  .cx-footer {
    display: flex; align-items: center; justify-content: space-between;
  }
  .cx-joined {
    font-size: 12px; color: rgba(255,255,255,0.2);
    letter-spacing: 0.04em;
  }
  .cx-logout {
    padding: 9px 18px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px; color: rgba(255,255,255,0.3);
    font-family: 'Barlow', sans-serif; font-size: 13px;
    cursor: pointer; transition: all 0.2s;
  }
  .cx-logout:hover {
    border-color: rgba(255,60,60,0.3);
    color: #ff7070; background: rgba(255,60,60,0.05);
  }

  .new-pill {
    display: inline-block; margin-left: 8px;
    padding: 2px 8px;
    background: rgba(255,77,28,0.15);
    border: 1px solid rgba(255,77,28,0.3);
    border-radius: 100px; font-size: 10px;
    color: #ff6b3d; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    vertical-align: middle;
  }
`;

const DEMO = "demo@uni.edu";

// Fork+Spoon crossing SVG — used as the "X" in CravEX
// Spoon goes top-left → bottom-right (like \), fork goes top-right → bottom-left (like /)
const CrossedUtensils = ({ sz = 22, color = "#ff4d1c" }) => (
  <svg width={sz} height={sz} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
    {/* SPOON: top-left to bottom-right */}
    <g transform="rotate(45 14 14)">
      {/* spoon bowl at top */}
      <ellipse cx="14" cy="5.5" rx="3" ry="3.6" fill={color}/>
      {/* spoon handle */}
      <rect x="12.9" y="8.8" width="2.2" height="14" rx="1.1" fill={color}/>
    </g>
    {/* FORK: top-right to bottom-left */}
    <g transform="rotate(-45 14 14)">
      {/* fork tines at top */}
      <rect x="11.2" y="3.5" width="1.2" height="6.5" rx="0.6" fill={color}/>
      <rect x="13.4" y="3.5" width="1.2" height="6.5" rx="0.6" fill={color}/>
      <rect x="15.6" y="3.5" width="1.2" height="6.5" rx="0.6" fill={color}/>
      {/* tine connector curve */}
      <path d="M11.8 9.8 C11.8 12 16.2 12 16.2 9.8" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      {/* fork handle */}
      <rect x="12.9" y="11.5" width="2.2" height="13" rx="1.1" fill={color}/>
    </g>
  </svg>
);

// Same but white, for the icon tile
const CrossedUtensilsWhite = ({ sz = 22 }) => <CrossedUtensils sz={sz} color="#fff" />;

const LogoMark = ({ size = 36, textSize = 22, gap = 10 }) => (
  <div style={{ display: "flex", alignItems: "center", gap }}>
    {/* Icon tile with gradient bg */}
    <div className="cx-logo-icon" style={{ width: size, height: size }}>
      <CrossedUtensilsWhite sz={size * 0.72} />
    </div>
    {/* Wordmark: Crav E X */}
    <div style={{
      display: "flex", alignItems: "center",
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: textSize, fontWeight: 800,
      letterSpacing: "0.06em", textTransform: "uppercase",
      color: "#fff", gap: "1px", lineHeight: 1,
    }}>
      <span>Crav</span>
      <span style={{ color: "#ff4d1c" }}>E</span>
      <CrossedUtensils sz={textSize * 1.1} color="#ff4d1c" />
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState("login");
  const [users, setUsers] = useState(MOCK_USERS);
  const [user, setUser] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", college: "", password: "", confirm: "" });

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const login = () => {
    setError("");
    const u = users[form.email.trim().toLowerCase()];
    if (!u) return setError("No account found. Check your email.");
    if (u.password !== form.password) return setError("Wrong password. Try again.");
    setUser(u); setIsNew(false); setView("profile");
  };

  const signup = () => {
    setError("");
    if (!form.name || !form.email || !form.password) return setError("Fill in all required fields.");
    if (form.password !== form.confirm) return setError("Passwords don't match.");
    if (form.password.length < 6) return setError("Password must be 6+ characters.");
    const key = form.email.trim().toLowerCase();
    if (users[key]) return setError("Account already exists. Sign in instead.");
    const color = AVATARS_COLORS[Math.floor(Math.random() * AVATARS_COLORS.length)];
    const initials = form.name.trim().split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase();
    const nu = {
      password: form.password,
      name: form.name.trim(),
      college: form.college.trim() || "Your Campus",
      year: "New Student",
      joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      avatar: initials,
      avatarColor: color,
      bio: "Just joined Cravex. Time to explore what's cooking on campus! 🍔",
      orders: 0, saved: 0, points: 50,
      fav: "—",
      badge: "🆕 Newcomer",
      campus: "Campus TBD",
    };
    setUsers({ ...users, [key]: nu });
    setUser(nu); setIsNew(true); setView("profile");
  };

  const logout = () => {
    setUser(null); setIsNew(false);
    setForm({ name: "", email: "", college: "", password: "", confirm: "" });
    setView("login");
  };

  const go = (v) => { setError(""); setView(v); };

  return (
    <>
      <style>{css}</style>
      <div className="cx-root">
        <div className="cx-noise" />
        <div className="cx-blob cx-blob-1" />
        <div className="cx-blob cx-blob-2" />

        {view === "login" && (
          <div className="cx-card" key="login">
            <div className="cx-logo"><LogoMark size={36} textSize={22} gap={10} /></div>
            <h1 className="cx-heading">Good to<br /><span className="accent">see you.</span></h1>
            <p className="cx-sub">Sign in and get your next order rolling.</p>

            {error && <div className="cx-error">{error}</div>}

            <div className="cx-field">
              <label>Campus Email</label>
              <input type="email" placeholder="you@university.edu" value={form.email} onChange={f("email")}
                onKeyDown={e => e.key === "Enter" && login()} />
            </div>
            <div className="cx-field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={f("password")}
                onKeyDown={e => e.key === "Enter" && login()} />
            </div>

            <button className="cx-btn" onClick={login}>Sign In →</button>

            <div className="cx-divider">or</div>

            <p className="cx-switch">
              New to CravEX?{" "}
              <button className="cx-link" onClick={() => go("signup")}>Create account</button>
            </p>
            <p className="cx-hint">Demo: {DEMO} / cravex123</p>
          </div>
        )}

        {view === "signup" && (
          <div className="cx-card" key="signup">
            <div className="cx-logo"><LogoMark size={36} textSize={22} gap={10} /></div>
            <h1 className="cx-heading">Join the<br /><span className="accent">hunger.</span></h1>
            <p className="cx-sub">Create your account and start ordering in minutes.</p>

            {error && <div className="cx-error">{error}</div>}

            <div className="cx-row">
              <div className="cx-field">
                <label>Full Name</label>
                <input type="text" placeholder="Your name" value={form.name} onChange={f("name")} />
              </div>
              <div className="cx-field">
                <label>College / Campus</label>
                <input type="text" placeholder="e.g. MIT" value={form.college} onChange={f("college")} />
              </div>
            </div>
            <div className="cx-field">
              <label>Campus Email</label>
              <input type="email" placeholder="you@university.edu" value={form.email} onChange={f("email")} />
            </div>
            <div className="cx-row">
              <div className="cx-field">
                <label>Password</label>
                <input type="password" placeholder="6+ chars" value={form.password} onChange={f("password")} />
              </div>
              <div className="cx-field">
                <label>Confirm</label>
                <input type="password" placeholder="Repeat" value={form.confirm} onChange={f("confirm")}
                  onKeyDown={e => e.key === "Enter" && signup()} />
              </div>
            </div>

            <button className="cx-btn" onClick={signup}>Create Account →</button>

            <p className="cx-switch" style={{ marginTop: "20px" }}>
              Already a member?{" "}
              <button className="cx-link" onClick={() => go("login")}>Sign in</button>
            </p>
          </div>
        )}

        {view === "profile" && user && (
          <div className="cx-profile" key="profile">
            <div className="cx-profile-header">
              <div className="cx-logo-sm" style={{ marginBottom: 16 }}><LogoMark size={26} textSize={15} gap={8} /></div>
              <div className="cx-profile-top">
                <div className="cx-avatar" style={{ background: `linear-gradient(135deg, ${user.avatarColor}, ${user.avatarColor}99)` }}>
                  {user.avatar}
                  <div className="cx-avatar-online" />
                </div>
                <div className="cx-profile-info">
                  <div className="cx-profile-name">
                    {user.name}
                    {isNew && <span className="new-pill">New</span>}
                  </div>
                  <div className="cx-profile-college">{user.college} · {user.year}</div>
                  <div className="cx-badge">{user.badge}</div>
                </div>
              </div>
            </div>

            <div className="cx-profile-body">
              <p className="cx-bio">{user.bio}</p>

              <div className="cx-stats">
                <div className="cx-stat">
                  <div className="cx-stat-val fire">{user.orders}</div>
                  <div className="cx-stat-lbl">Orders</div>
                </div>
                <div className="cx-stat">
                  <div className="cx-stat-val">{user.saved}</div>
                  <div className="cx-stat-lbl">Saved</div>
                </div>
                <div className="cx-stat">
                  <div className="cx-stat-val fire">{user.points.toLocaleString()}</div>
                  <div className="cx-stat-lbl">Points</div>
                </div>
              </div>

              <div className="cx-info-grid">
                <div className="cx-info-item">
                  <div className="cx-info-lbl">Favourite Order</div>
                  <div className="cx-info-val">{user.fav}</div>
                </div>
                <div className="cx-info-item">
                  <div className="cx-info-lbl">Campus Pickup</div>
                  <div className="cx-info-val">{user.campus}</div>
                </div>
              </div>

              <div className="cx-footer">
                <div className="cx-joined">Member since {user.joined}</div>
                <button className="cx-logout" onClick={logout}>Sign out</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}