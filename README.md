# HerHub — Intelligent Opportunity-Discovery Platform for Young Women

> **Find the opportunity. Understand your fit. Take the next step.**  
> *"Your personalized hub for scholarships, internships, mentorships, hackathons, and career opportunities."*

---

## 🌟 What is HerHub?

HerHub solves a major pain point for aspiring young women in STEM and technology: valuable opportunities (scholarships, internships, fellowships, mentorship programs, and hackathons) are scattered across fragmented websites, university notices, and social feeds. Students often miss out because they don't know what they qualify for, what prerequisites they lack, or how to prepare.

HerHub introduces a continuous, empowering 6-stage journey:

$$\text{DISCOVER} \longrightarrow \text{MATCH} \longrightarrow \text{PREPARE} \longrightarrow \text{APPLY} \longrightarrow \text{TRACK} \longrightarrow \text{GROW}$$

---

## 🚀 Live Demo Flow (3–5 Minute Hackathon Walkthrough)

1. **Open HerHub**: Visit `http://127.0.0.1:8080/` in your browser.
2. **Check/Edit Profile**: Pre-filled with demo user **Bhumika** (2nd Year B.Tech Computer Science, CGPA 8.1, Skills: Python, C, Interests: AI & Technology, Budget: Free / ₹0).
3. **Conversational Search**: Click or enter:
   > *"Find me free AI internships for this summer."*
4. **Agentic Reasoning Pipeline**: Watch the HerHub AI agent sequence through:
   - `✓ Understanding your profile`
   - `✓ Finding relevant opportunities`
   - `✓ Checking eligibility`
   - `✓ Identifying gaps`
   - `✓ Preparing your next steps`
5. **Personalized Results & Match Reasons**:
   - See clear eligibility labels: 🟢 **Eligible**, 🟡 **Potentially Eligible**, 🔵 **Relevant — Check Requirements**, 🔴 **Not Eligible**.
   - No arbitrary percentages! Instead, concrete reasons:
     - `✓ 2nd Year accepted`
     - `✓ Engineering (Computer Science) student`
     - `✓ Meets CGPA requirement (8.1 >= 6.5)`
     - `✓ Women applicants eligible`
     - `✓ Skill match: Python, C`
     - `✓ 100% Free / Stipend provided`
6. **Gap Analysis (Smart Guidance)**:
   - Open a 3rd-year exclusive program (e.g. *DESIS Ascend Educare*).
   - HerHub displays:
     - `❌ Requires 3rd-year students`
     - `✓ You are currently in 2nd year`
     - **What you can do:** One-click save to track for next year and recommendations of similar 2nd-year friendly internships (*Amazon WoW*, *Outreachy*, *TalentSprint WE*).
7. **Application Preparation Checklist**:
   - Click **"Prepare My Application"** on any opportunity.
   - Generates an interactive checklist of required documents (*Resume, College ID, Marksheets, Essays, GitHub links*).
   - Check off items as you complete them; HerHub tracks preparation progress.
8. **My Opportunities Kanban Tracker**:
   - Navigate to the **My Opportunities** tab.
   - Move programs across 4 stages: `Saved` → `Preparing` → `Applied` → `Completed`.
   - Visual countdown deadlines prevent missed application windows.
9. **Direct Official Apply**:
   - Click **"APPLY ON OFFICIAL WEBSITE"** to access the verified portal directly.

---

## 🎨 Design System

HerHub adopts a modern AI startup aesthetic:

- **Deep Navy**: `#0F172A`
- **Electric Purple**: `#8B5CF6`
- **Cyan Glow**: `#22D3EE`
- **Soft Pink**: `#F0ABFC`
- **White Contrast**: `#F8FAFC`
- **Slate Grey**: `#CBD5E1`
- **Typography**: *Plus Jakarta Sans* & *JetBrains Mono*
- **Theme**: AI + Career + Opportunity + Empowerment *(without falling into generic pink stereotypes)*

---

## 🛡️ Privacy Guarantee

HerHub is designed privacy-first:
- **No sensitive personal identification required**: Never asks for Aadhaar, PAN, passwords, OTPs, or financial/banking details.
- User data and tracker state persist locally in the user's browser `localStorage`.

---

## 🏃 How to Run Locally

### Option 1: Double-click Launcher (Windows)
Double-click `run.bat` in this folder. It opens `http://127.0.0.1:8080` in your default browser.

### Option 2: Command Line
```powershell
# Navigate to the herhub directory
cd C:\Users\rbhum\.gemini\antigravity\scratch\herhub

# Start the Python web server (zero external dependencies required)
python server.py 8080
```
Then navigate to: [http://127.0.0.1:8080](http://127.0.0.1:8080)

---

## 📂 Project Structure

```text
herhub/
├── index.html          # Single Page Application entry point
├── app.js              # Application state, AI matching engine, tracker & UI controller
├── data.js             # 18 Curated, verified STEM & tech opportunities
├── server.py           # Lightweight Python web server & REST endpoints
├── run.bat             # 1-click Windows launcher
├── test_flow.html      # Automated verification test suite
└── README.md           # Documentation & demo guide
```
