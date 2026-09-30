/**
 * HerHub - Curated Opportunity Database
 * 18 Realistic & Verified Opportunities for Young Women in STEM & Tech
 */

const OPPORTUNITIES_DATA = [
  {
    id: "outreachy-ai-2026",
    name: "Outreachy AI & Open Source Internship",
    organization: "Outreachy",
    category: "Internships",
    type: "Internship",
    badge: "Featured Opportunity",
    shortDescription: "Paid remote internship working on open-source AI and software projects with dedicated 1-on-1 industry mentorship.",
    description: "Outreachy provides 3-month paid internships for people subject to systemic bias and underrepresented in tech. Interns work remotely with mentors on open-source machine learning, developer tools, and web infrastructure. Applications are open globally to women and non-binary individuals.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "Any Science / Tech"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduates"],
      minCgpa: 0.0,
      genderFocus: "Women & Underrepresented Groups in Tech",
      requiredSkills: ["Python", "Git", "Basic Programming"],
      locations: ["Remote", "India", "Global"],
      requirementsList: [
        "Identifies as a woman or underrepresented group in tech",
        "Available for 30–40 hours/week during the 3-month internship period",
        "Basic proficiency in Python or similar programming languages",
        "Must participate in the open-source contribution phase",
        "No minimum CGPA cutoff required"
      ]
    },
    benefits: {
      stipendOrAmount: "$7,000 USD (~₹5,80,000)",
      mentorship: "1-on-1 Dedicated Industry Mentors",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "$7,000 USD total stipend paid in milestones",
        "$500 USD travel/conference stipend",
        "100% Remote with flexible asynchronous working hours",
        "Pairing with experienced open-source maintainers",
        "Permanent membership in the global Outreachy alumni network"
      ]
    },
    cost: "100% Free / ₹0 (Stipend Provided)",
    costType: "Free",
    deadline: "2026-10-25",
    deadlineFormatted: "October 25, 2026",
    deadlineUrgency: "Closing in 26 days",
    mode: "Remote",
    location: "Global / India Remote",
    requiredDocuments: [
      "Resume / CV highlighting Python or programming projects",
      "College ID Card or Enrollment Proof",
      "Initial Application Essay (Experience & Motivation)",
      "Open Source Contribution Record on GitHub"
    ],
    applicationSteps: [
      "Complete initial eligibility verification form",
      "Submit four short essay answers describing background and systemic barriers",
      "Select open-source AI/software project during contribution period",
      "Submit at least one accepted pull request or contribution",
      "Submit final project timeline and application proposal"
    ],
    officialSource: "Outreachy Official Program",
    officialUrl: "https://www.outreachy.org",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["AI", "Python", "Internship", "Remote", "Open Source", "Women in Tech", "Stipend", "Summer"]
  },
  {
    id: "amazon-wow-2026",
    name: "Amazon WoW (Women Out World) Internship & Mentorship",
    organization: "Amazon India",
    category: "Internships",
    type: "Internship & Mentorship",
    badge: "High Impact",
    shortDescription: "Amazon's premier campus program for women engineering students offering skill development, mentorship, and direct SDE internship interviews.",
    description: "Amazon WoW is a dedicated initiative for women students enrolled in engineering and technology disciplines across India. It offers structured tech webinars, coding sessions, mentorship from Amazon engineers, and fast-track interviews for 2-month summer and 6-month software development internships.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "ECE", "B.Tech", "B.E."],
      allowedYears: ["2nd Year", "3rd Year", "4th Year"],
      minCgpa: 6.5,
      genderFocus: "Women Only",
      requiredSkills: ["Python", "C", "Data Structures", "Problem Solving"],
      locations: ["India (Bengaluru, Hyderabad, Chennai, Delhi NCR) or Hybrid"],
      requirementsList: [
        "Female students pursuing B.Tech / B.E. / M.Tech in CS, IT, ECE or related engineering streams",
        "Currently in 2nd or 3rd year of undergraduate studies",
        "Minimum CGPA of 6.5 / 65% with no active backlogs",
        "Knowledge of C, C++, Java, or Python and fundamental algorithms"
      ]
    },
    benefits: {
      stipendOrAmount: "₹80,000 / month Stipend",
      mentorship: "Amazon Senior Software Engineers Mentorship",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "₹80,000/month stipend during Summer Internship",
        "Direct Pre-Placement Interview (PPI) opportunity for full-time SDE roles",
        "Free masterclasses on System Design, Data Structures & Cloud Computing",
        "Dedicated Amazon buddy for interview preparation",
        "Amazon swag kit & developer certifications"
      ]
    },
    cost: "100% Free / ₹0 (Stipend Provided)",
    costType: "Free",
    deadline: "2026-11-15",
    deadlineFormatted: "November 15, 2026",
    deadlineUrgency: "Applications Open",
    mode: "Hybrid / In-Person",
    location: "India (Multiple Tech Hubs)",
    requiredDocuments: [
      "Latest Resume / CV with technical projects",
      "College Identity Card",
      "Semester Grade Transcripts / Marksheets (Sem 1 to latest)",
      "Valid Government Photo ID"
    ],
    applicationSteps: [
      "Register on Amazon WoW official career portal",
      "Attend foundational technical webinars and coding assessments",
      "Clear online coding assessment (DSA & Problem Solving)",
      "Technical interview rounds with Amazon engineering teams",
      "Receive Summer Internship offer letter"
    ],
    officialSource: "Amazon Jobs Official Portal",
    officialUrl: "https://amazonwowindia.splashthat.com/",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Internship", "Women in Tech", "Engineering", "Python", "C", "Stipend", "Summer", "Cloud"]
  },
  {
    id: "talentsprint-we-2026",
    name: "TalentSprint WE (Women Engineers) Program supported by Google",
    organization: "TalentSprint & Google",
    category: "Learning",
    type: "Scholarship & Training",
    badge: "100% Scholarship",
    shortDescription: "Intensive 2-year experiential learning program for 1st & 2nd year women engineering students with 100% scholarship, ₹1,00,000 stipend, and Google mentorship.",
    description: "Supported by Google, the WE program identifies, selects, and grooms high-potential female engineering students from across India into top-tier tech professionals. Participants receive world-class training in AI, data structures, and hands-on software development, alongside executive mentorship from Google software engineers.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "ECE", "B.Tech", "B.E."],
      allowedYears: ["1st Year", "2nd Year"],
      minCgpa: 7.0,
      genderFocus: "Women Only",
      requiredSkills: ["Basic Programming (Python or C)", "Logical Reasoning"],
      locations: ["Hybrid / Virtual with Hyderabad Bootcamps"],
      requirementsList: [
        "Women students currently enrolled in 1st or 2nd year of B.Tech / B.E.",
        "Specialization in Computer Science, IT, ECE, or related engineering branch",
        "Minimum 70% in 10th & 12th standards, and CGPA >= 7.0 in college",
        "Strong passion for technology, coding, and problem-solving"
      ]
    },
    benefits: {
      stipendOrAmount: "₹1,00,000 Cash Stipend + 100% Tuition Waiver",
      mentorship: "Google Engineers Mentorship",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "100% Program Fee Scholarship (Valued at ₹3,00,000)",
        "₹1,00,000 cash stipend for tech equipment and learning resources",
        "Direct mentorship from senior Google engineers",
        "Immersive training in AI, Full Stack & Software Architecture",
        "Internship and placement access with Tier-1 tech firms"
      ]
    },
    cost: "100% Free / ₹0 (Fully Sponsored by Google)",
    costType: "Free",
    deadline: "2026-10-20",
    deadlineFormatted: "October 20, 2026",
    deadlineUrgency: "Closing in 21 days",
    mode: "Hybrid",
    location: "India (Virtual + In-Person Bootcamps)",
    requiredDocuments: [
      "College Student ID card",
      "Class 10th and 12th Marksheets",
      "Current College Semester Grade Sheets",
      "Statement of Motivation / Video Introduction"
    ],
    applicationSteps: [
      "Submit online registration form",
      "Take online Aptitude and Logical Reasoning assessment",
      "Complete Basic Coding Evaluation (C or Python)",
      "Group Interview / Personal Interview with faculty and Google mentors",
      "Admission offer and scholarship grant"
    ],
    officialSource: "TalentSprint WE Official Site",
    officialUrl: "https://we.talentsprint.com",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Learning", "Scholarship", "Google", "Women in Tech", "AI", "Python", "Engineering", "Mentorship"]
  },
  {
    id: "generation-google-scholarship-2026",
    name: "Generation Google Scholarship (APAC - Women in Tech)",
    organization: "Google",
    category: "Scholarships",
    type: "Scholarship",
    badge: "Prestigious Grant",
    shortDescription: "Google's global scholarship awarding $2,500 USD to female computer science students demonstrating leadership and academic excellence.",
    description: "The Generation Google Scholarship for women in computer science is awarded based on academic performance, leadership, and demonstrated impact on diversity. Selected scholars receive a direct financial grant and an invitation to Google's virtual Scholars' Retreat with Google engineers and leaders.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "Computer Engineering"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year"],
      minCgpa: 7.5,
      genderFocus: "Women Only",
      requiredSkills: ["Academic Record", "Leadership", "Community Engagement"],
      locations: ["India & APAC Region"],
      requirementsList: [
        "Identify as female studying computer science, computer engineering, or closely related technical field",
        "Enrolled as a full-time undergraduate student in an accredited university in APAC",
        "Strong academic record (recommended CGPA >= 7.5)",
        "Demonstrate passion for computer science and fostering underrepresented groups"
      ]
    },
    benefits: {
      stipendOrAmount: "$2,500 USD (~₹2,10,000)",
      mentorship: "Google Leadership Community & Retreat",
      certificate: true,
      internshipOrJob: false,
      highlights: [
        "$2,500 USD educational grant disbursed directly for tuition/books",
        "Exclusive invitation to the Google APAC Scholars' Summit",
        "Networking with Google leaders, recruiters, and fellow scholars",
        "Priority access to Google tech talks and learning labs"
      ]
    },
    cost: "100% Free to Apply / ₹0",
    costType: "Free",
    deadline: "2026-11-05",
    deadlineFormatted: "November 5, 2026",
    deadlineUrgency: "Applications Open",
    mode: "Virtual Grant",
    location: "India / APAC",
    requiredDocuments: [
      "Updated Resume highlighting leadership and technical projects",
      "Current official / unofficial academic transcripts",
      "One Letter of Recommendation from a college professor",
      "Two short essay responses (Passion for CS & Diversity Impact)"
    ],
    applicationSteps: [
      "Submit general background information and academic history",
      "Upload resume, transcripts, and letter of recommendation",
      "Write and submit two 400-word essays on diversity and technical ambition",
      "Shortlisted candidates undergo a 15-minute Google culture & leadership chat",
      "Final announcement of selected scholars"
    ],
    officialSource: "Google Build Your Future Careers",
    officialUrl: "https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-apac",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Scholarship", "Google", "Women in Tech", "Engineering", "Leadership", "Computer Science"]
  },
  {
    id: "microsoft-engage-2026",
    name: "Microsoft Engage Mentorship & Summer Internship",
    organization: "Microsoft India",
    category: "Mentorship",
    type: "Mentorship & Internship",
    badge: "Fast Track",
    shortDescription: "Direct mentorship program by Microsoft engineers providing real-world project challenges and fast-tracked summer internship hiring.",
    description: "Microsoft Engage is a flagship student mentorship initiative for second-year engineering students across India. Students work on cutting-edge problem statements in Artificial Intelligence, Cloud, and Data Algorithms under the guidance of senior Microsoft mentors, with top performers receiving direct summer internship offers.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "ECE", "B.Tech", "B.E."],
      allowedYears: ["2nd Year"],
      minCgpa: 7.0,
      genderFocus: "Women & Diversity Encouraged",
      requiredSkills: ["Python", "C", "Data Structures", "Web / AI Basics"],
      locations: ["India Remote + Hyderabad / Bengaluru Offsite"],
      requirementsList: [
        "Currently enrolled in 2nd year of B.Tech / B.E. / Dual Degree",
        "Graduating class of 2027/2028 in STEM fields",
        "Minimum CGPA of 7.0 or equivalent percentage",
        "Must be available for the 4-week intensive project mentorship"
      ]
    },
    benefits: {
      stipendOrAmount: "₹1,25,000 / month (Summer Internship)",
      mentorship: "Weekly 1-on-1 Mentorship from Microsoft SDEs",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "Fast-track interview route for Microsoft Summer SDE Internship",
        "₹1,25,000/month internship stipend if selected",
        "Hands-on building with Azure AI, OpenAI models, and modern tech stack",
        "Official Microsoft Mentee Credential badge for LinkedIn",
        "Direct AMA sessions with Microsoft India Leadership"
      ]
    },
    cost: "100% Free / ₹0",
    costType: "Free",
    deadline: "2026-10-18",
    deadlineFormatted: "October 18, 2026",
    deadlineUrgency: "Closing in 19 days",
    mode: "Remote Mentorship",
    location: "India Remote",
    requiredDocuments: [
      "Resume with GitHub / coding profile links",
      "College Student ID card",
      "Current Semester Marksheet / Proof of 2nd year enrollment"
    ],
    applicationSteps: [
      "Register on Microsoft University portal",
      "Online MCQs & Coding Assessment (DSA, Logic, Code Debugging)",
      "4-week project development under designated Microsoft mentor",
      "Final project code submission, video demo, and code review",
      "Direct technical interviews for Summer Internship"
    ],
    officialSource: "Microsoft Student Careers India",
    officialUrl: "https://careers.microsoft.com/students",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Mentorship", "Internship", "Microsoft", "AI", "Python", "Engineering", "Summer", "2nd Year"]
  },
  {
    id: "adobe-wit-scholarship-2026",
    name: "Adobe India Women-in-Technology Scholarship",
    organization: "Adobe India",
    category: "Scholarships",
    type: "Scholarship & Internship",
    badge: "Prestigious Grant",
    shortDescription: "Annual scholarship providing ₹1,00,000, funded tuition, Adobe internship opportunity, and Grace Hopper Conference pass.",
    description: "Adobe created the Women-in-Technology Scholarship to recognize outstanding female undergraduate and masters students studying computer science. The scholarship supports education, provides an internship opportunity at Adobe India, and awards a sponsored pass to the annual Grace Hopper Celebration.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "B.Tech", "B.E."],
      allowedYears: ["2nd Year", "3rd Year"],
      minCgpa: 8.0,
      genderFocus: "Women Only",
      requiredSkills: ["Strong Academic Standing", "Algorithms", "Python / C++"],
      locations: ["India (Noida / Bengaluru)"],
      requirementsList: [
        "Identify as female studying B.Tech / B.E. / M.Tech in CS/IT",
        "Currently in 2nd or 3rd year of undergraduate studies",
        "Excellent academic record with CGPA >= 8.0",
        "Passion for innovation in creative tech, AI, or digital media"
      ]
    },
    benefits: {
      stipendOrAmount: "₹1,00,000 Cash Grant + Internship",
      mentorship: "Adobe Senior Tech Leaders Mentorship",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "₹1,00,000 one-time financial grant for tuition and books",
        "Guaranteed interview for Adobe India Summer Internship",
        "Fully sponsored registration and travel to Grace Hopper Conference India (GHCI)",
        "Assigned an Adobe Senior Engineering leader as mentor for 1 full year",
        "Access to Adobe Creative Cloud & AI Developer tools"
      ]
    },
    cost: "100% Free / ₹0",
    costType: "Free",
    deadline: "2026-11-20",
    deadlineFormatted: "November 20, 2026",
    deadlineUrgency: "Applications Open",
    mode: "Hybrid / In-Person",
    location: "India (Noida / Bengaluru)",
    requiredDocuments: [
      "Curriculum Vitae / Resume",
      "All semester official transcripts (CGPA 8.0+)",
      "Three short essays on technical passion, community leadership, and vision",
      "One Letter of Recommendation from an academic supervisor"
    ],
    applicationSteps: [
      "Submit online application form with transcripts",
      "Submit 3 essays and 60-second video elevator pitch",
      "Technical review of academic performance and projects",
      "Panel interview with Adobe India research and engineering leaders",
      "Scholarship announcement and onboarding"
    ],
    officialSource: "Adobe Careers Research",
    officialUrl: "https://www.adobe.com/careers/university/women-in-technology.html",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Scholarship", "Adobe", "Women in Tech", "Engineering", "Internship", "AI", "Research"]
  },
  {
    id: "mlh-fellowship-ai-2026",
    name: "MLH Fellowship (Open Source & AI Track)",
    organization: "Major League Hacking & GitHub",
    category: "Fellowships",
    type: "Fellowship",
    badge: "Global Remote",
    shortDescription: "12-week remote fellowship contributing to real-world AI and open-source software with a $5,000 educational stipend.",
    description: "The MLH Fellowship is an alternative to traditional internships where fellows collaborate on production open-source code used by millions. Fellows are placed in small pods with an expert mentor, attend masterclasses, and gain real-world collaborative Git/software engineering experience.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Any Tech Major"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduates"],
      minCgpa: 0.0,
      genderFocus: "All Students (Diversity Encouraged)",
      requiredSkills: ["Python", "Git", "Object Oriented Programming"],
      locations: ["Remote (India / Global)"],
      requirementsList: [
        "Comfortable coding in Python, JavaScript, or C",
        "Working knowledge of Git version control",
        "Available for 30 hours per week during the 12-week fellowship batch",
        "Fluency in English (written and verbal collaboration)",
        "No GPA minimum required"
      ]
    },
    benefits: {
      stipendOrAmount: "$5,000 USD (~₹4,15,000) Educational Stipend",
      mentorship: "Full-Time Staff Software Engineer Pod Mentor",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "$5,000 USD need-based educational grant / stipend",
        "Contribute directly to major AI libraries, PyTorch, LangChain, or Kubernetes",
        "Weekly technical workshops and mock technical interviews",
        "Graduation certificate and credential recognized by top tech employers",
        "100% remote with international developer peer group"
      ]
    },
    cost: "100% Free / ₹0 (Need-based Stipend Provided)",
    costType: "Free",
    deadline: "2026-10-30",
    deadlineFormatted: "October 30, 2026",
    deadlineUrgency: "Batch Starting Soon",
    mode: "Remote",
    location: "Global Remote",
    requiredDocuments: [
      "Resume highlighting personal coding projects",
      "A code sample (GitHub repository or script written in Python/C)",
      "Brief essay explaining what you learned building your code sample"
    ],
    applicationSteps: [
      "Submit initial application and code sample link",
      "15-minute video interview discussing your background and motivation",
      "30-minute technical code review deep-dive into your code sample",
      "Pod matching and stipend verification",
      "Fellowship onboarding and project assignment"
    ],
    officialSource: "Major League Hacking Official",
    officialUrl: "https://fellowship.mlh.io",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Fellowship", "AI", "Python", "Open Source", "Remote", "Internship", "Summer"]
  },
  {
    id: "smart-india-hackathon-2026",
    name: "Smart India Hackathon (SIH 2026) - Software & AI Edition",
    organization: "Ministry of Education & AICTE",
    category: "Hackathons",
    type: "National Hackathon",
    badge: "Govt of India",
    shortDescription: "The world's largest open innovation model where student teams solve real challenges posed by ministries and top tech companies.",
    description: "Smart India Hackathon is a nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives. Mandating gender diversity, every team must have at least one female team member. Top winners receive cash awards and direct corporate sponsorship.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "Any College Degree"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      minCgpa: 0.0,
      genderFocus: "Mandatory Female Team Member (Diversity Requirement)",
      requiredSkills: ["Python", "C", "Web Development", "AI / ML"],
      locations: ["India (Nodal Centers across 20+ States)"],
      requirementsList: [
        "Regular college student enrolled in undergraduate or postgraduate program",
        "Team of 6 members with MANDATORY at least one female student",
        "Endorsement letter from college Principal / Dean",
        "Working software prototype demonstrating AI, IoT, or web innovation"
      ]
    },
    benefits: {
      stipendOrAmount: "₹1,00,000 Cash Prize per Problem Statement",
      mentorship: "Ministry Technical Officers & Tech Industry Mentors",
      certificate: true,
      internshipOrJob: false,
      highlights: [
        "₹1,00,000 cash prize for 1st place in each problem statement",
        "National-level recognition and certificate issued by Ministry of Education",
        "Direct incubation funding and patent filing support",
        "Networking with senior government bureaucrats and technology CTOs",
        "Free travel and lodging provided at grand finale nodal centers"
      ]
    },
    cost: "100% Free / ₹0",
    costType: "Free",
    deadline: "2026-10-15",
    deadlineFormatted: "October 15, 2026",
    deadlineUrgency: "Closing in 16 days",
    mode: "In-Person Finale / Online Idea Submission",
    location: "Across India",
    requiredDocuments: [
      "College Student ID Cards for all 6 members",
      "Institutional Consent / Authorization Letter from Principal",
      "Detailed PPT Presentation of Proposed Solution Architecture"
    ],
    applicationSteps: [
      "Form a team of 6 members including at least one woman student",
      "Select problem statement from SIH portal (e.g. Smart Automation, AI Healthcare)",
      "Submit idea proposal and architecture through college SPOC",
      "Clear internal college screening and national evaluation",
      "Compete in 36-hour non-stop grand finale hackathon"
    ],
    officialSource: "AICTE SIH Portal",
    officialUrl: "https://www.sih.gov.in",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Hackathon", "AI", "Engineering", "Python", "Cash Prize", "Govt of India", "Team"]
  },
  {
    id: "desis-ascend-educare-2026",
    name: "DESIS Ascend Educare Program (D. E. Shaw India)",
    organization: "D. E. Shaw India",
    category: "Mentorship",
    type: "Mentorship & Grant",
    badge: "Pre-Final Year Only",
    shortDescription: "Exclusive 6-month mentorship and ₹50,000 educational grant program by D. E. Shaw for 3rd-year women in engineering.",
    description: "DESIS Ascend Educare is designed to help talented women in tech accelerate their career paths. Selected 3rd-year students receive comprehensive technical coaching in Data Structures, FinTech systems, and quantitative problem solving, along with a direct cash grant and PPI opportunities.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "ECE"],
      allowedYears: ["3rd Year"],
      minCgpa: 7.5,
      genderFocus: "Women Only",
      requiredSkills: ["Data Structures", "Algorithms", "C++ or Java or Python"],
      locations: ["India (Hyderabad / Bengaluru)"],
      requirementsList: [
        "Women students currently enrolled strictly in 3rd Year (5th/6th Semester) of B.Tech/B.E.",
        "Major in CS, IT, Software Engineering or related branches",
        "Minimum CGPA of 7.5 throughout college",
        "Must be graduating in 2027 (Pre-final year)"
      ]
    },
    benefits: {
      stipendOrAmount: "₹50,000 Educational Grant + PPI",
      mentorship: "D. E. Shaw Software Architects Mentorship",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "₹50,000 cash grant to fund books, computing gear, and tuition",
        "Direct interview opportunity for 2027 D. E. Shaw Summer Internship",
        "Mock interviews and algorithmic problem-solving bootcamps",
        "Networking lunches with senior women leaders in Quantitative Finance",
        "Exclusive invitation to D. E. Shaw Hyderabad tech symposium"
      ]
    },
    cost: "100% Free / ₹0",
    costType: "Free",
    deadline: "2026-11-10",
    deadlineFormatted: "November 10, 2026",
    deadlineUrgency: "Applications Open",
    mode: "Hybrid",
    location: "India (Hyderabad / Bengaluru)",
    requiredDocuments: [
      "Latest Resume with competitive coding profiles (LeetCode/Codeforces)",
      "Semester 1 to Semester 4 Marksheets demonstrating CGPA >= 7.5",
      "College ID card verifying 3rd-year enrollment status"
    ],
    applicationSteps: [
      "Register on D. E. Shaw India Ascend portal",
      "Online Aptitude and Coding Challenge (Advanced DSA)",
      "Technical video interview with senior engineers",
      "Cohort selection and ₹50,000 grant disbursement",
      "Bi-weekly technical mentorship sessions"
    ],
    officialSource: "D. E. Shaw Careers India",
    officialUrl: "https://www.deshawindia.com/careers",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Mentorship", "Scholarship", "FinTech", "Women in Tech", "3rd Year", "Algorithms", "Stipend"]
  },
  {
    id: "uber-she-plus-plus-2026",
    name: "Uber She++ Mentorship Program for 2nd Year Women",
    organization: "Uber India",
    category: "Mentorship",
    type: "Mentorship & Internship",
    badge: "2nd Year Friendly",
    shortDescription: "Dedicated 6-week mentorship pairing 2nd-year women engineers with Uber mentors for algorithm mastery and direct summer internship hiring.",
    description: "Uber She++ is specifically designed for 2nd-year female engineering students across India. The initiative demystifies large-scale distributed systems, provides algorithmic coaching, and gives students direct access to Uber engineering culture, culminating in fast-tracked summer internship offers.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "ECE"],
      allowedYears: ["2nd Year"],
      minCgpa: 7.0,
      genderFocus: "Women Only",
      requiredSkills: ["Python", "C", "Algorithms", "Problem Solving"],
      locations: ["India (Bengaluru / Hyderabad) Remote"],
      requirementsList: [
        "Identify as female enrolled in 2nd year of B.Tech / B.E. / Dual Degree",
        "Graduating year 2028",
        "Proficiency in at least one language: Python, C, C++, or Java",
        "Minimum CGPA of 7.0 or equivalent"
      ]
    },
    benefits: {
      stipendOrAmount: "₹1,10,000 / month (Summer Internship)",
      mentorship: "Uber Senior Staff Engineers Mentorship",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "Direct pre-placement interview (PPI) for Uber Summer Internship (₹1.1L/mo)",
        "Weekly 1-on-1 coding mentorship with Uber engineers",
        "Hands-on architectural case studies on Uber's real-time matching system",
        "Uber She++ alumni network and community meetups",
        "Uber tech swag package"
      ]
    },
    cost: "100% Free / ₹0",
    costType: "Free",
    deadline: "2026-10-28",
    deadlineFormatted: "October 28, 2026",
    deadlineUrgency: "Closing in 29 days",
    mode: "Remote Mentorship",
    location: "India Remote",
    requiredDocuments: [
      "Updated Resume",
      "College ID card verifying 2nd year status",
      "Semester 1 & 2 Marksheets"
    ],
    applicationSteps: [
      "Fill online registration form and upload resume",
      "Complete online coding evaluation on HackerRank",
      "6-week interactive mentorship sessions",
      "Final project presentation and assessment",
      "Summer Internship offer extension"
    ],
    officialSource: "Uber Careers Tech Blog",
    officialUrl: "https://www.uber.com/in/en/careers",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Mentorship", "Internship", "Uber", "Women in Tech", "2nd Year", "Python", "C", "Algorithms"]
  },
  {
    id: "ghci-student-scholarship-2026",
    name: "Grace Hopper Celebration India (GHCI) Student Scholarship",
    organization: "AnitaB.org India",
    category: "Scholarships",
    type: "Conference & Career Fair Grant",
    badge: "Career Catalyst",
    shortDescription: "Full sponsorship to attend Asia's largest gathering of women technologists, featuring exclusive hiring halls with 100+ top tech employers.",
    description: "The GHCI Student Scholarship awards full conference registration, travel, and accommodation to undergraduate and graduate female STEM students. Scholars gain direct access to the GHCI Student Career Fair where companies like Google, Microsoft, Amazon, and Adobe conduct on-spot interviews for internships.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "Any STEM Degree"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      minCgpa: 6.5,
      genderFocus: "Women Only",
      requiredSkills: ["Passion for Technology", "Academic Commitment"],
      locations: ["Bengaluru, India"],
      requirementsList: [
        "Enrolled as a full-time female student in an Indian college or university",
        "Studying Computer Science, Information Technology, or allied STEM stream",
        "Minimum CGPA of 6.5 or 65% aggregate",
        "Must not have received a GHCI scholarship in previous years"
      ]
    },
    benefits: {
      stipendOrAmount: "Full Conference Pass + Travel & Stay (~₹35,000 value)",
      mentorship: "Exclusive Mentorship Circles at GHCI",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "100% sponsored 3-day GHCI pass including tech keynotes and workshops",
        "Direct access to Student Career Fair with 120+ hiring tech companies",
        "High placement and internship conversion rate for scholar attendees",
        "Travel reimbursement and hotel accommodation in Bengaluru",
        "1-on-1 resume reviews and speed mentoring with executive women leaders"
      ]
    },
    cost: "100% Free / ₹0 (Fully Sponsored)",
    costType: "Free",
    deadline: "2026-11-01",
    deadlineFormatted: "November 1, 2026",
    deadlineUrgency: "Applications Open",
    mode: "In-Person (Bengaluru)",
    location: "Bengaluru, India",
    requiredDocuments: [
      "Student Resume formatted for tech hiring",
      "College ID Card & Bona Fide Certificate",
      "Most recent college marksheet / transcript",
      "Short essay on 'How attending GHCI will shape my career journey'"
    ],
    applicationSteps: [
      "Submit scholarship application on AnitaB.org portal",
      "Upload recommendation letter and academic transcripts",
      "Review by scholarship evaluation committee",
      "Award notification and travel booking assistance",
      "Attend conference, career fair, and interviews in Bengaluru"
    ],
    officialSource: "AnitaB.org India GHCI Portal",
    officialUrl: "https://ghc.anitab.org",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Scholarship", "Women in Tech", "Career Fair", "Internship", "Engineering", "Networking"]
  },
  {
    id: "flipkart-grid-2026",
    name: "Flipkart GRiD 6.0 Robotics & AI Challenge",
    organization: "Flipkart",
    category: "Hackathons",
    type: "National Tech Challenge",
    badge: "Big Tech Challenge",
    shortDescription: "Prestigious engineering competition solving next-gen e-commerce problems with ₹1,50,000 cash rewards and direct SDE internship interviews.",
    description: "Flipkart GRiD is Flipkart’s flagship campus challenge designed to test your technical skills, problem-solving, and innovative thinking. Tracks include Artificial Intelligence, Computer Vision, Robotics, and Information Security, offering winners cash prizes and Pre-Placement Interviews (PPI).",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "B.Tech", "B.E."],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      minCgpa: 6.0,
      genderFocus: "All Students (Diversity Encouraged)",
      requiredSkills: ["Python", "C", "Machine Learning / Algorithms"],
      locations: ["India (Virtual + Bengaluru Finale)"],
      requirementsList: [
        "Undergraduate engineering students across all years",
        "Teams of 2 to 3 members from the same or cross-engineering colleges",
        "Strong foundation in coding and algorithmic thinking",
        "No backlog restrictions"
      ]
    },
    benefits: {
      stipendOrAmount: "₹1,50,000 Top Prize + SDE Internship PPIs",
      mentorship: "Flipkart Principal Engineers Mentorship",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "₹1,50,000 cash prize for winning team + ₹1,00,000 for runners up",
        "Direct Pre-Placement Interviews for Flipkart Summer SDE Internships (₹1,00,000/mo)",
        "Mentorship from Flipkart AI and supply chain data scientists",
        "National leaderboard visibility and verified certificates",
        "All finalist teams receive tech gadgets and Flipkart vouchers"
      ]
    },
    cost: "100% Free / ₹0",
    costType: "Free",
    deadline: "2026-10-22",
    deadlineFormatted: "October 22, 2026",
    deadlineUrgency: "Closing in 23 days",
    mode: "Virtual Rounds + Onsite Finale",
    location: "India Remote / Bengaluru",
    requiredDocuments: [
      "College Student ID card for each team member",
      "Team registration details on Unstop platform",
      "GitHub link for code submission in Level 3"
    ],
    applicationSteps: [
      "Register team on Unstop / Flipkart GRiD portal",
      "Level 1: E-Commerce & Tech Aptitude Quiz",
      "Level 2: Problem Statement submission & Proof of Concept",
      "Level 3: Working prototype demonstration to Flipkart jury",
      "Grand Finale live presentation and interview offers"
    ],
    officialSource: "Unstop Flipkart GRiD Portal",
    officialUrl: "https://unstop.com/competitions/flipkart-grid",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Hackathon", "AI", "Internship", "Engineering", "Python", "Algorithms", "Cash Prize"]
  },
  {
    id: "western-digital-stem-scholarship-2026",
    name: "Western Digital STEM Scholarship for Women",
    organization: "Western Digital Foundation",
    category: "Scholarships",
    type: "Scholarship",
    badge: "STEM Grant",
    shortDescription: "Annual scholarship awarding $1,500 USD to women pursuing computer engineering and data science degrees in India.",
    description: "The Western Digital STEM Scholarship program aims to increase the representation of women in engineering and memory technology. Scholars receive a direct financial scholarship, access to Western Digital female engineer networks, and priority for campus internship roles.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "ECE", "Data Science"],
      allowedYears: ["2nd Year", "3rd Year", "4th Year"],
      minCgpa: 7.5,
      genderFocus: "Women Only",
      requiredSkills: ["Academic Record", "STEM Passion"],
      locations: ["India (Bengaluru / Pan-India Universities)"],
      requirementsList: [
        "Female students pursuing full-time B.Tech / B.E. in STEM streams",
        "Currently enrolled in 2nd, 3rd, or 4th year",
        "Cumulative GPA of 7.5 or 75% equivalent",
        "Demonstrated financial need or strong academic commitment"
      ]
    },
    benefits: {
      stipendOrAmount: "$1,500 USD (~₹1,25,000)",
      mentorship: "Western Digital Senior Women in Tech Network",
      certificate: true,
      internshipOrJob: false,
      highlights: [
        "$1,500 direct grant for educational and computing expenses",
        "Quarterly mentorship calls with Western Digital engineering directors",
        "Resume drop and priority referral for Western Digital internships",
        "Certificate of Academic Excellence by Western Digital Foundation"
      ]
    },
    cost: "100% Free / ₹0",
    costType: "Free",
    deadline: "2026-11-25",
    deadlineFormatted: "November 25, 2026",
    deadlineUrgency: "Applications Open",
    mode: "Virtual Grant",
    location: "India Pan-India",
    requiredDocuments: [
      "Latest official college transcript / marksheets",
      "College ID card",
      "Two personal essays (Career aspirations & Impact of scholarship)",
      "Income certificate or recommendation letter"
    ],
    applicationSteps: [
      "Complete online scholarship questionnaire",
      "Upload transcripts and verification documents",
      "Review by Western Digital STEM selection committee",
      "Direct disbursement of scholarship funds to student"
    ],
    officialSource: "Western Digital Foundation STEM",
    officialUrl: "https://www.westerndigital.com/company/corporate-responsibility/community/scholarships",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Scholarship", "Women in Tech", "Engineering", "STEM", "Computer Science", "2nd Year"]
  },
  {
    id: "gsoc-ai-projects-2026",
    name: "Google Summer of Code (GSoC) - Open Source & AI",
    organization: "Google Open Source",
    category: "Internships",
    type: "Open Source Internship",
    badge: "Prestigious Global",
    shortDescription: "Global online program bringing new contributors into open source AI and software organizations with a paid stipend ($1,500–$3,300).",
    description: "Google Summer of Code is a global, online program focused on bringing new contributors into open source software development. GSoC contributors work with an open source organization (such as TensorFlow, OpenCV, or Apache) on a 12+ week programming project under the guidance of mentors.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Any Degree"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduates"],
      minCgpa: 0.0,
      genderFocus: "All Students & Beginners (Diversity Encouraged)",
      requiredSkills: ["Python", "C", "Git", "Software Development"],
      locations: ["Global Remote / India"],
      requirementsList: [
        "At least 18 years of age at the time of registration",
        "Enrolled in higher education or a beginner to open source",
        "Demonstrated familiarity with Git and repository collaboration",
        "Must submit a comprehensive project proposal to chosen open-source organization"
      ]
    },
    benefits: {
      stipendOrAmount: "$1,500 – $3,300 USD (~₹1,25,000 – ₹2,75,000)",
      mentorship: "Senior Open Source Organization Mentors",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "Tiered stipend based on country of residence ($1,500 to $3,300 USD in India)",
        "Global recognition from Google Open Source Programs Office",
        "Direct code contributions merged into world-class software used globally",
        "Alumni status highly regarded by top tech recruiters",
        "100% remote and asynchronous schedule"
      ]
    },
    cost: "100% Free / ₹0 (Stipend Provided)",
    costType: "Free",
    deadline: "2026-11-12",
    deadlineFormatted: "November 12, 2026",
    deadlineUrgency: "Proposals Opening",
    mode: "Remote",
    location: "Global Remote",
    requiredDocuments: [
      "Proof of Student Enrollment or government ID",
      "Detailed Project Proposal with week-by-week implementation milestones",
      "GitHub link with prior pull requests or code samples"
    ],
    applicationSteps: [
      "Review list of accepted open-source AI and software organizations",
      "Join organization Slack/Discord and interact with mentors",
      "Submit initial pull request to demonstrate coding ability",
      "Submit formal project proposal via GSoC portal",
      "Selected contributors work on 12-week or 22-week projects"
    ],
    officialSource: "Google Summer of Code Official",
    officialUrl: "https://summerofcode.withgoogle.com",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Internship", "AI", "Open Source", "Google", "Python", "C", "Remote", "Summer"]
  },
  {
    id: "shecodes-ai-bootcamp-2026",
    name: "SheCodes Foundation AI & Web Development Scholarship",
    organization: "SheCodes Foundation",
    category: "Learning",
    type: "Coding Certificate Program",
    badge: "100% Free",
    shortDescription: "Fully funded online technical workshops covering Python, AI APIs, and responsive web development for women in tech.",
    description: "SheCodes Foundation provides free coding education to women in developing countries and underrepresented backgrounds. Participants learn modern web technologies, Python scripting, and AI integration through hands-on project-based weekly challenges and receive verified graduation credentials.",
    eligibilityCriteria: {
      allowedDegrees: ["Any College Student", "Engineering", "Arts", "Science"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduates"],
      minCgpa: 0.0,
      genderFocus: "Women Only",
      requiredSkills: ["Curiosity to Code", "Basic English"],
      locations: ["Online / India"],
      requirementsList: [
        "Identify as a woman",
        "Reside in India or eligible developing country",
        "Commit 5–10 hours per week for project assignments",
        "Access to a computer and internet connection"
      ]
    },
    benefits: {
      stipendOrAmount: "100% Free Tuition ($1,990 USD value)",
      mentorship: "SheCodes Technical Teaching Assistants",
      certificate: true,
      internshipOrJob: false,
      highlights: [
        "100% free access to SheCodes Pro & AI Engineering workshops",
        "Build 4 portfolio projects including an AI-powered assistant app",
        "Verified digital certificates shareable on LinkedIn and resumes",
        "Active Slack community of 100,000+ women developers worldwide",
        "Self-paced with weekly milestones"
      ]
    },
    cost: "100% Free / ₹0 (Fully Sponsored)",
    costType: "Free",
    deadline: "2026-10-31",
    deadlineFormatted: "October 31, 2026",
    deadlineUrgency: "Weekly Cohorts",
    mode: "Online / Self-Paced",
    location: "Global Online",
    requiredDocuments: [
      "Online application form",
      "Short paragraph explaining motivation to learn AI & coding"
    ],
    applicationSteps: [
      "Submit brief application on SheCodes Foundation portal",
      "Receive acceptance email within 72 hours",
      "Access interactive workshop platform and Slack community",
      "Submit weekly coding projects for code review",
      "Receive graduation certificate"
    ],
    officialSource: "SheCodes Foundation Portal",
    officialUrl: "https://www.shecodesfoundation.org",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Learning", "Women in Tech", "AI", "Python", "Free Certificate", "Beginner Friendly"]
  },
  {
    id: "goldman-sachs-campus-2026",
    name: "Goldman Sachs Engineering Campus Hiring Program",
    organization: "Goldman Sachs India",
    category: "Internships",
    type: "Internship & Pre-Placement",
    badge: "Investment Banking Tech",
    shortDescription: "Competitive engineering hiring program for pre-final and final-year students offering high-impact summer software internships.",
    description: "Goldman Sachs Engineering builds solutions for complex financial and technological problems. The campus program evaluates candidates on analytical problem solving, data structures, and computer science fundamentals for 8-week summer internships in Bengaluru and Hyderabad.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "ECE"],
      allowedYears: ["3rd Year", "4th Year"],
      minCgpa: 7.0,
      genderFocus: "All Students (Women in Tech Diversity Track)",
      requiredSkills: ["Data Structures", "Algorithms", "C++ or Java or Python"],
      locations: ["Bengaluru / Hyderabad"],
      requirementsList: [
        "Pursuing B.Tech / B.E. graduating in 2026 or 2027 (Pre-final & Final year)",
        "Minimum CGPA of 7.0 or equivalent",
        "Strong understanding of algorithms, time complexity, and data structures",
        "Must be eligible to work in India"
      ]
    },
    benefits: {
      stipendOrAmount: "₹1,00,000 / month Stipend",
      mentorship: "Senior Financial Tech Engineers Mentorship",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "₹1,00,000/month stipend plus relocation assistance",
        "Direct conversion opportunities for Full-Time Analyst positions",
        "Experience building high-frequency algorithmic systems",
        "Executive networking and women in leadership panels"
      ]
    },
    cost: "100% Free / ₹0",
    costType: "Free",
    deadline: "2026-11-08",
    deadlineFormatted: "November 8, 2026",
    deadlineUrgency: "Applications Open",
    mode: "In-Person",
    location: "Bengaluru / Hyderabad, India",
    requiredDocuments: [
      "Latest Resume",
      "Official academic transcripts",
      "Valid Government ID"
    ],
    applicationSteps: [
      "Register on Goldman Sachs Careers portal",
      "Aptitude Test (Numerical, Logical, & Reasoning)",
      "Technical Coding Assessment (2 algorithmic problems)",
      "Virtual Technical Interviews (Algorithms & System Architecture)",
      "Offer extension"
    ],
    officialSource: "Goldman Sachs Careers",
    officialUrl: "https://www.goldmansachs.com/careers/students/programs",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Internship", "Engineering", "Algorithms", "FinTech", "3rd Year", "Stipend"]
  },
  {
    id: "ibm-stem-girls-fellowship-2026",
    name: "IBM STEM for Girls AI Research Fellowship",
    organization: "IBM India & Research",
    category: "Fellowships",
    type: "Research Fellowship",
    badge: "AI Research",
    shortDescription: "6-month research fellowship for female engineering students working alongside IBM scientists on generative AI and quantum tools.",
    description: "The IBM STEM for Girls Fellowship is designed to cultivate future women researchers in Artificial Intelligence and emerging technologies. Fellows receive guidance from IBM Research scientists, access to IBM Cloud AI clusters, and monthly research stipends.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "Information Technology", "AI & Data Science"],
      allowedYears: ["2nd Year", "3rd Year", "4th Year"],
      minCgpa: 7.5,
      genderFocus: "Women Only",
      requiredSkills: ["Python", "Foundations of AI / ML", "Linear Algebra"],
      locations: ["Virtual / Bengaluru Research Lab"],
      requirementsList: [
        "Enrolled as a female student in 2nd, 3rd, or 4th year of engineering",
        "Good academic standing with CGPA >= 7.5",
        "Basic experience in Python and machine learning concepts",
        "Eagerness to publish or contribute to applied research"
      ]
    },
    benefits: {
      stipendOrAmount: "₹35,000 / month Research Stipend",
      mentorship: "IBM Research Staff Scientists Mentorship",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "₹35,000/month research stipend for 6 months",
        "Free cloud compute credits on IBM Cloud and Watsonx AI",
        "Co-author research papers and open-source models",
        "Fast-track interview for IBM Systems & Cloud full-time roles",
        "IBM Certified Specialist - AI Foundations digital credential"
      ]
    },
    cost: "100% Free / ₹0 (Stipend Provided)",
    costType: "Free",
    deadline: "2026-11-18",
    deadlineFormatted: "November 18, 2026",
    deadlineUrgency: "Applications Open",
    mode: "Hybrid",
    location: "Bengaluru / India Remote",
    requiredDocuments: [
      "Academic CV with list of ML / AI projects",
      "College ID card and bonafide letter",
      "All semester marksheets (Sem 1 to latest)",
      "One page research interest statement"
    ],
    applicationSteps: [
      "Submit application and research interest statement",
      "Short online AI/Python assessment",
      "Technical discussion with IBM Research mentor",
      "Fellowship onboarding and project kickoff"
    ],
    officialSource: "IBM Research India",
    officialUrl: "https://www.ibm.com/in-en/employment",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Fellowship", "AI", "Python", "Research", "Women in Tech", "2nd Year", "Stipend"]
  },
  {
    id: "cisco-women-rock-it-2026",
    name: "Cisco Women Rock-IT & Global Innovation Challenge",
    organization: "Cisco Systems",
    category: "Hackathons",
    type: "Innovation Challenge & Learning",
    badge: "Global Tech Hub",
    shortDescription: "Global program inspiring young women to innovate with IoT, AI, and cybersecurity with direct interviews for Cisco engineering internships.",
    description: "Cisco Women Rock-IT connects young women to inspiring tech role models and challenges them to solve sustainability and connectivity challenges using AI and network technologies. Winners receive tech equipment, Cisco certifications, and direct entry into Cisco internship evaluations.",
    eligibilityCriteria: {
      allowedDegrees: ["Engineering", "Computer Science", "ECE", "Information Technology", "Any STEM"],
      allowedYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      minCgpa: 6.0,
      genderFocus: "Women & Diversity Encouraged",
      requiredSkills: ["Networking Basics", "Python", "Problem Solving"],
      locations: ["Global Online / India"],
      requirementsList: [
        "Open to all women students enrolled in STEM disciplines",
        "No prior advanced coding experience required for entry-level tracks",
        "Willingness to learn network fundamentals and Python automation",
        "Individual or 2-person team submissions"
      ]
    },
    benefits: {
      stipendOrAmount: "₹75,000 Tech Grant + Cisco Certifications ($600 value)",
      mentorship: "Cisco Technical Leaders Mentorship",
      certificate: true,
      internshipOrJob: true,
      highlights: [
        "Free vouchers for Cisco CCNA and Python automation certifications",
        "Direct interview referral for Cisco India Summer Internships",
        "Global broadcast showcase of winning student projects",
        "Access to Cisco Networking Academy learning materials for life",
        "Cisco branded hardware starter kits for IoT / AI"
      ]
    },
    cost: "100% Free / ₹0",
    costType: "Free",
    deadline: "2026-11-30",
    deadlineFormatted: "November 30, 2026",
    deadlineUrgency: "Applications Open",
    mode: "Online Challenge",
    location: "India Remote / Global",
    requiredDocuments: [
      "Student ID Card",
      "Resume",
      "Short project brief on tech for sustainability"
    ],
    applicationSteps: [
      "Sign up on Cisco Women Rock-IT portal",
      "Watch technical masterclasses and complete short quizzes",
      "Submit innovative AI/IoT solution concept",
      "Top 20 teams present to Cisco engineering panel",
      "Awards ceremony and career referral pass"
    ],
    officialSource: "Cisco Networking Academy",
    officialUrl: "https://www.netacad.com/women-rock-it",
    verificationDate: "September 2026 Verified",
    isDemo: false,
    tags: ["Hackathon", "Learning", "Women in Tech", "Cisco", "Python", "Internship", "Free Certificate"]
  }
];

// Helper to get demo profile
const DEFAULT_DEMO_PROFILE = {
  name: "Bhumika",
  education: "Engineering",
  branch: "Computer Science",
  year: "2nd Year",
  college: "National Institute of Technology",
  location: "India",
  cgpa: 8.1,
  skills: ["C", "Python"],
  interests: ["AI", "Technology"],
  goals: ["Internship", "Hackathon", "Learning"],
  opportunityTypes: ["Scholarships", "Internships", "Hackathons", "Mentorship", "Fellowships", "Learning"],
  budgetPreference: "Free / ₹0"
};
