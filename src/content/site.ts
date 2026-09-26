/**
 * All copy, facts and links for the site live here.
 *
 * Rules:
 * - An empty string ("") or null is never rendered. Leave a field empty rather than guessing.
 * - Facts must match the experience sheet exactly. Proposals must stay labelled as proposals.
 * - Images are filled in by `npm run images` (see README), through assets.generated.json.
 */
import generated from "./assets.generated.json";

export type LinkKey =
  | "email"
  | "github"
  | "linkedin"
  | "codeforces"
  | "codechef"
  | "leetcode"
  | "instagram";

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
}

export interface SectionCopy {
  index: string;
  title: string;
  intro: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  /** Time or scope marker shown as a tag. Only markers that exist in the facts. */
  marker: string;
  logo: ImageAsset | null;
  logoAlt: string;
  points: string[];
  /** Compact sub-items, used for the "Other responsibilities" row. */
  items: { title: string; detail: string }[];
}

export interface Achievement {
  figure: string;
  label: string;
  /** Which links in `links` verify this claim. A link only shows if that URL is set. */
  profiles: LinkKey[];
}

export interface InlineLink {
  href: string;
  label: string;
}

export interface PillarPoint {
  /** Bold lead-in, optional */
  lead: string;
  text: string;
}

export interface Pillar {
  id: string;
  number: string;
  title: string;
  intent: string;
  /** The one firm personal commitment. Only the Structure pillar has it. */
  commitment: { lead: string; text: string; caveat: string; link: InlineLink } | null;
  points: PillarPoint[];
  related: InlineLink[];
}

export interface Phase {
  number: string;
  title: string;
  points: string[];
}

const photo: ImageAsset | null = generated.photo.src ? generated.photo : null;
const bitsquadLogo: ImageAsset | null = generated.bitsquadLogo.src ? generated.bitsquadLogo : null;

export const site = {
  meta: {
    title: "Aniket Patil for Technical Secretary · IIITDM Kurnool 2026–27",
  },

  /** e.g. "14 October 2026". Leave empty to hide the line. */
  voteDate: "",

  /** Public path of the downloadable poster, e.g. "/poster.jpg". Empty hides the link. */
  posterUrl: generated.poster,

  links: {
    email: "",
    github: "",
    linkedin: "",
    codeforces: "",
    codechef: "",
    leetcode: "",
    instagram: "",
    /** Source code of this site. Empty hides the footer link. */
    repo: "",
  },

  sheetTotal: "10",

  hero: {
    metaLine: "IIITDM Kurnool · Students' Union Elections 2026–27",
    firstName: "Aniket",
    lastName: "Patil",
    subtitle: "Candidate for Technical Secretary",
    tagline: ["Build", "Create", "Compete", "Together"],
    statement:
      "My goal is to build a more organized, accountable, and inclusive technical ecosystem where every student can learn, contribute, and find opportunities to grow.",
    photo,
    photoAlt: "Portrait of Aniket Patil",
    photoCaption: "Aniket Patil · B.Tech CSE, 3rd year",
    marginNote: "A stronger tech ecosystem for everyone",
    posterLinkLabel: "Download the manifesto poster",
  },

  about: {
    section: {
      index: "01",
      title: "About Me",
      intro: "Who I am, and where my experience with technical events comes from.",
    } satisfies SectionCopy,
    body: "I'm Aniket Patil, a third-year B.Tech Computer Science and Engineering student at IIITDM Kurnool. Since my second year, I've helped run the BitSquad coding club, organized inter-institute hackathons, competed in programming contests, and worked on computer vision research as an intern at NIT Surat. Most of what I know about technical events comes from the practical side: contest planning, participant coordination, technical arrangements and execution. That is the experience I want to bring to the role of Technical Secretary.",
    facts: [
      { label: "Programme", value: "B.Tech, Computer Science and Engineering" },
      { label: "Year", value: "Third year" },
      { label: "Institute", value: "IIITDM Kurnool" },
      { label: "Contesting", value: "Technical Secretary, Students' Union 2026–27" },
      {
        label: "Areas",
        value:
          "Coding community, technical events, hackathons, competitive programming, computer vision research",
      },
    ],
  },

  experience: {
    section: {
      index: "02",
      title: "Experience and Achievements",
      intro: "Roles I have held, and selected results from contests and hackathons.",
    } satisfies SectionCopy,
    entries: [
      {
        id: "bitsquad",
        role: "Coordinator",
        org: "BitSquad (Coding Club), IIITDM Kurnool",
        marker: "Sub-Coordinator (2nd year) → Coordinator (3rd year)",
        logo: bitsquadLogo,
        logoAlt: "BitSquad logo",
        points: [
          "Organized and coordinated 10+ coding contests and events, with 80+ students participating in each.",
          "Handled contest planning, participant coordination, technical arrangements and event execution.",
          "Part of the organizing team for the BitSquad Hackathon at Solasta, which brought together students from different institutes.",
        ],
        items: [],
      },
      {
        id: "neitrik",
        role: "Organizer",
        org: "Neitrik 24-Hour Hackathon",
        marker: "Inter-institute",
        logo: null,
        logoAlt: "",
        points: ["Coordinated and managed 50+ participating students from different institutes."],
        items: [],
      },
      {
        id: "gdg",
        role: "Sub-Coordinator",
        org: "Google Developer Group, IIITDM Kurnool",
        marker: "2nd year",
        logo: null,
        logoAlt: "",
        points: [
          "Helped organize technical workshops and speaker sessions.",
          "Part of the organizing team for the GDG Hackathon, an inter-institute technical event.",
        ],
        items: [],
      },
      {
        id: "nit-surat",
        role: "Research Intern",
        org: "NIT Surat",
        marker: "",
        logo: null,
        logoAlt: "",
        points: [
          "Worked on anomaly detection using computer vision and deep learning.",
          "Submitted a research paper based on this work to CVIP 2026.",
        ],
        items: [],
      },
      {
        id: "other",
        role: "Other responsibilities",
        org: "",
        marker: "",
        logo: null,
        logoAlt: "",
        points: [],
        items: [
          {
            title: "Lead Organizer, Shivaji Maharaj Jayanti",
            detail: "Coordinated multiple cultural activities across teams.",
          },
          {
            title: "Placement Coordinator, 3rd-year CSE",
            detail: "Coordination and communication for placement activities.",
          },
        ],
      },
    ] satisfies ExperienceEntry[],
    achievementsTitle: "Selected achievements",
    achievements: [
      {
        figure: "20th / 8,000+",
        label: "Shell.ai Hackathon 2025, ranked 20th among 8,000+ participants",
        profiles: [],
      },
      {
        figure: "3rd Prize",
        label: "Datathon 2.0 at Solasta, organized by DataWorks",
        profiles: [],
      },
      {
        figure: "Pupil · 3★",
        label: "Pupil on Codeforces, 3-star on CodeChef",
        profiles: ["codeforces", "codechef"],
      },
      { figure: "440+", label: "LeetCode problems solved", profiles: ["leetcode"] },
    ] satisfies Achievement[],
  },

  vision: {
    section: {
      index: "03",
      title: "A More Organized and Accountable Technical Ecosystem",
      intro: "The larger goal behind every proposal on this site.",
    } satisfies SectionCopy,
    body: "Students have ideas, clubs organize activities, and opportunities exist, but information, planning, and coordination can often be scattered. I want to help create a clear structure where responsibilities are defined, progress can be tracked, and students know where to find support and opportunities.",
    todayCaption: "Information is often scattered.",
    proposedCaption: "One structure everyone can see.",
    principles: [
      { number: "01", title: "Structure", line: "Clear planning, responsibilities and processes." },
      { number: "02", title: "Accountability", line: "Transparent progress, budgets and feedback." },
      { number: "03", title: "Inclusion", line: "Equal access to learning, events and opportunities." },
    ],
  },

  manifesto: {
    section: {
      index: "04",
      title: "Manifesto",
      intro: "Seven pillars for a thriving tech community.",
    } satisfies SectionCopy,
    pillars: [
      {
        id: "pillar-structure",
        number: "01",
        title: "Structure",
        intent:
          "Give technical activity a clear plan, clear owners, and a clear way in for new ideas.",
        commitment: {
          lead: "Build an event-tracking app",
          text: " that gives every technical event a clear structure: proposal, approval, schedule, owner, budget and post-event report.",
          caveat:
            "Building it is my commitment. Using it officially across clubs needs consultation and institute approval.",
          link: { href: "#event-app", label: "See the event app plan" },
        },
        points: [
          { lead: "", text: "Publish a semester-wise technical events calendar." },
          { lead: "", text: "Hold regular Technical Council meetings." },
          { lead: "", text: "Plan an annual pipeline of technical events." },
          { lead: "", text: "Give students a clear way to submit new ideas and initiatives." },
        ],
        related: [],
      },
      {
        id: "pillar-accountability",
        number: "02",
        title: "Accountability",
        intent: "Make event status, budgets, prize money and feedback visible and trackable.",
        commitment: null,
        points: [
          {
            lead: "",
            text: "Track each event's status, budget and participation in one place, through the event tracker.",
          },
          { lead: "", text: "Make prize money and reimbursements transparent and trackable." },
          { lead: "", text: "Standardize event documentation." },
          { lead: "", text: "Collect post-event feedback and track what changes because of it." },
        ],
        related: [{ href: "#event-app", label: "See how the event tracker would work" }],
      },
      {
        id: "pillar-quality",
        number: "03",
        title: "Quality",
        intent: "Run fewer, better-planned events with clear goals and a standard checklist.",
        commitment: null,
        points: [
          { lead: "", text: "Define clear objectives and evaluation criteria for events." },
          { lead: "", text: "Plan refreshments, prizes, logistics and resources earlier and better." },
          { lead: "", text: "Introduce a standard event checklist." },
          { lead: "", text: "Focus on fewer, well-organized, high-quality events over rushed ones." },
        ],
        related: [],
      },
      {
        id: "pillar-opportunities",
        number: "04",
        title: "Opportunities",
        intent:
          "Help students find and take part in more competitions, hackathons and external programs.",
        commitment: null,
        points: [
          { lead: "", text: "Encourage more hackathons and coding competitions." },
          {
            lead: "",
            text: "Create a central board for internships, research programs, competitions and other external opportunities.",
          },
          { lead: "", text: "Help students take part in national and international technical events." },
        ],
        related: [],
      },
      {
        id: "pillar-coding-culture",
        number: "05",
        title: "Coding Culture",
        intent: "Make regular practice and fair competition part of campus life, at every level.",
        commitment: null,
        points: [
          { lead: "", text: "Introduce a recurring IIITDMK Coding League." },
          { lead: "", text: "Run regular coding contests and practice sessions." },
          { lead: "", text: "Create beginner-friendly learning paths." },
          { lead: "", text: "Encourage peer learning, mentoring and collaborative problem-solving." },
        ],
        related: [
          { href: "#coding-league", label: "See the Coding League proposal" },
          { href: "#new-coders", label: "See the path for new coders" },
          { href: "#mentorship", label: "See the mentorship proposal" },
        ],
      },
      {
        id: "pillar-visibility",
        number: "06",
        title: "Visibility",
        intent: "Communicate clearly about technical activity, and show the work students do.",
        commitment: null,
        points: [
          {
            lead: "",
            text: "Improve social media presence and communication across technical clubs.",
          },
          { lead: "", text: "Cover events before, during and after they happen." },
          { lead: "", text: "Showcase student projects, research and achievements." },
          { lead: "", text: "Create a central record of technical activity across IIITDMK." },
        ],
        related: [],
      },
      {
        id: "pillar-inclusive",
        number: "07",
        title: "Inclusive Tech Ecosystem",
        intent:
          "Support every domain and every student, including those who are not in a technical club yet.",
        commitment: null,
        points: [
          { lead: "", text: "Support technical clubs across all domains fairly." },
          {
            lead: "",
            text: "Encourage events across AI/ML, web development, core CS, hardware, robotics and research.",
          },
          { lead: "", text: "Build collaboration with faculty, alumni and industry." },
          {
            lead: "",
            text: "Simplify event approvals and give access to past materials, resources and guides.",
          },
          { lead: "", text: "Bring in students who are not yet members of any technical club." },
        ],
        related: [],
      },
    ] satisfies Pillar[],
  },

  eventApp: {
    section: {
      index: "05",
      title: "One Platform for Technical Events",
      intro: "The one part of this manifesto I am committing to build myself.",
    } satisfies SectionCopy,
    tags: ["My build commitment", "Adoption subject to approval"],
    body: "I will build an event-tracking app that brings structure to how technical events are planned, approved, run and reviewed. Building it is something I can commit to as a CSE student. Using it officially across clubs, and handling student data through it, needs consultation with the clubs and approval from the institute. I will seek both before any rollout.",
    lifecycleTitle: "Event lifecycle",
    lifecycle: [
      "Proposed",
      "Submitted for approval",
      "Approved",
      "Scheduled",
      "Live",
      "Report and feedback filed",
      "Archived",
    ],
    featuresTitle: "What it would do",
    features: [
      {
        title: "For students",
        points: [
          "Browse upcoming events across clubs.",
          "See dates, venues, eligibility, deadlines and details.",
          "Register and track registration status.",
          "Get reminders and announcements.",
          "Access resources, results and participation records.",
          "Discover competitions, internships and research opportunities.",
        ],
      },
      {
        title: "For organizers",
        points: [
          "Create events and submit them for approval.",
          "Track approval status and pending tasks.",
          "Manage registrations, attendance and participant lists.",
          "Maintain budgets, prize distribution and reimbursement status.",
          "Assign tasks to the organizing team.",
          "Publish results and post-event reports.",
          "Collect feedback and generate participation reports.",
        ],
      },
      {
        title: "For accountability",
        points: [
          "Role-based access for students, organizers and authorized administrators.",
          "One central calendar of approved events.",
          "An audit trail for important changes and financial records.",
          "Clear approval workflows and status tracking.",
          "Privacy-conscious handling of student data, collecting only the minimum needed.",
        ],
      },
    ],
    demoTitle: "event-tracker · concept",
    demoBanner: "Concept demo · sample data · nothing is saved or sent",
  },

  league: {
    section: {
      index: "06",
      title: "IIITDMK Coding League",
      intro:
        "The proposed Coding League would give students a consistent, structured competitive programming environment, with a fair place to compete at every skill level.",
    } satisfies SectionCopy,
    formatTitle: "Proposed format",
    format: [
      "Weekly or biweekly contests.",
      "Separate Beginner, Intermediate and Advanced divisions.",
      "A rating system that places students in the right level of competition.",
      "Periodic rating updates based on contest performance.",
      "Contest leaderboards and individual progress tracking.",
      "Practice resources and editorials after each contest.",
    ],
    recognitionTitle: "Recognition beyond the top three",
    recognition: [
      { title: "Overall Champion", line: "The strongest performance across the season." },
      {
        title: "Best Beginner / Best Newcomer",
        line: "The strongest performance by someone new to competitive programming.",
      },
      { title: "Most Improved Coder", line: "The largest rating gain over the season." },
      { title: "Most Consistent Participant", line: "Steady participation across the season's contests." },
      { title: "Best Team Performance", line: "For team rounds, where the season includes them." },
    ],
    fairPlayTitle: "Fair play rules",
    fairPlay:
      "Division placement and award eligibility will follow rules published before each season: rating thresholds for each division, promotion between divisions, tie-breakers and award criteria. Experienced participants cannot enter the Beginner division just to claim beginner prizes.",
    demoTitle: "league · leaderboard",
    demoBanner: "Illustrative sample. The league is not running yet. All names and numbers are made up.",
  },

  newCoders: {
    section: {
      index: "07",
      title: "From First Line of Code to Competitive Programmer",
      intro: "A suggested path for students who are just starting to code.",
    } satisfies SectionCopy,
    stages: [
      {
        number: "Stage 1",
        title: "Start Here",
        points: [
          "Learn basic programming in C++ or Python.",
          "Understand input/output, conditions, loops, functions and arrays.",
          "Attend beginner-friendly club sessions.",
        ],
      },
      {
        number: "Stage 2",
        title: "Build Foundations",
        points: [
          "Learn basic data structures, sorting, searching and time complexity.",
          "Solve introductory problems consistently.",
          "Take part in beginner contests without pressure.",
        ],
      },
      {
        number: "Stage 3",
        title: "Practice and Compete",
        points: [
          "Learn binary search, recursion, greedy algorithms, trees, graphs and dynamic programming.",
          "Take part in regular Coding League contests.",
          "Review editorials and learn from mistakes.",
        ],
      },
      {
        number: "Stage 4",
        title: "Advance and Contribute",
        points: [
          "Prepare for advanced contests and ICPC-style team competitions.",
          "Join peer-learning groups and mock contests.",
          "Help organize contests or mentor newer students when ready.",
        ],
      },
    ],
    note: "This is a flexible path, not a timetable. Move at your own pace.",
  },

  mentorship: {
    section: {
      index: "08",
      title: "Learn Together. Grow Together.",
      intro:
        "I will propose a peer-mentorship program that connects interested juniors with second- and third-year students who volunteer as mentors.",
    } satisfies SectionCopy,
    stepsTitle: "How it would work",
    steps: [
      "Sign up.",
      "Get matched by interests, skill level and availability.",
      "Join a small mentor group with clearly defined responsibilities.",
      "Take part in regular doubt-solving and guided practice.",
      "Check progress together at regular check-ins.",
      "Change mentors if the pairing isn't working.",
    ],
    helpTitle: "What mentors can help with",
    help: [
      "DSA",
      "Competitive programming",
      "Projects",
      "Hackathons",
      "Research opportunities",
      "Shared learning resources",
    ],
    safety: {
      title: "A Safe and Respectful Learning Environment",
      reportTitle: "What mentees can report",
      report: [
        "Rude or disrespectful behaviour.",
        "Mocking or discouraging beginners.",
        "Repeatedly neglecting agreed mentoring responsibilities.",
        "Misuse of the mentor role.",
      ],
      flowTitle: "How reports would be handled",
      flow: [
        "Report submitted through a confidential form",
        "Goes to a designated review team, never to the person reported",
        "Any reviewer with a conflict of interest steps aside",
        "Fair review",
        "Follow-up with the reporter, if they chose to be contactable",
      ],
      qa: [
        {
          q: "What is collected",
          a: "The concern, its category, and contact details only if the reporter chooses to give them.",
        },
        { q: "Who can see it", a: "Only the designated review team." },
        {
          q: "How it's handled",
          a: "A published review process, protection against retaliation, and restricted access to all reports.",
        },
      ],
      honesty:
        "Reports will be confidential, with access limited to the review team. I won't describe the system as anonymous unless it is built and independently checked to be anonymous.",
    },
  },

  plan: {
    section: {
      index: "09",
      title: "How I'd Take This Forward",
      intro: "A proposed plan, not a guarantee. Timing depends on consultation and approvals.",
    } satisfies SectionCopy,
    phases: [
      {
        number: "01",
        title: "Understand and Organize",
        points: [
          "Consult technical clubs and students.",
          "Identify current coordination problems.",
          "Gather existing event schedules, workflows and resource needs.",
          "Collect requirements for the event tracker.",
        ],
      },
      {
        number: "02",
        title: "Establish Common Processes",
        points: [
          "Propose a shared events calendar and standard documentation.",
          "Introduce event tracking and post-event feedback.",
          "Define responsibilities and reporting.",
          "Build a first version of the event tracker (calendar, event status, budget) and seek approval to trial it.",
        ],
      },
      {
        number: "03",
        title: "Pilot",
        points: [
          "Pilot the Coding League and the mentorship program.",
          "Trial the event tracker with clubs that opt in.",
          "Collect feedback and evaluate participation, fairness and usefulness.",
        ],
      },
      {
        number: "04",
        title: "Evaluate and Expand",
        points: [
          "Extend the tracker (registrations, reports, feedback) based on the pilot and approvals.",
          "Publish progress updates.",
          "Improve every initiative based on feedback.",
        ],
      },
    ] satisfies Phase[],
  },

  contact: {
    section: {
      index: "10",
      title: "Have an Idea? Let's Hear It.",
      intro: "Send me a suggestion about events, coding, mentorship or the event app.",
    } satisfies SectionCopy,
    categories: ["Events", "Coding", "Mentorship", "Resources", "Event app", "Other"],
    /** e.g. "Formspree", "Web3Forms" or "Google Forms". Empty hides that sentence. */
    formServiceName: "",
    privacyTitle: "Privacy",
    privacy:
      "Name and email are optional. Only I read suggestions. I'll use them to improve my plans, and I won't publish anything you send unless you tick the quote box on the form, and even then without your name.",
    linksTitle: "Find me elsewhere",
  },

  footer: {
    line: [
      "Aniket Patil",
      "Candidate for Technical Secretary",
      "Students' Union Elections 2026–27",
      "IIITDM Kurnool",
    ],
    smallPrint: "Initiatives on this site are proposals, subject to consultation and institute approval.",
  },
};

export const linkLabels: Record<LinkKey, string> = {
  email: "Email",
  github: "GitHub",
  linkedin: "LinkedIn",
  codeforces: "Codeforces",
  codechef: "CodeChef",
  leetcode: "LeetCode",
  instagram: "Instagram",
};

/** Links for the contact section, in display order, with empty ones removed. */
export function activeLinks(): { key: LinkKey; label: string; href: string; display: string }[] {
  const order: LinkKey[] = ["email", "github", "linkedin", "codeforces", "codechef", "leetcode", "instagram"];
  return order
    .filter((key) => site.links[key].trim() !== "")
    .map((key) => {
      const value = site.links[key].trim();
      const href = key === "email" ? `mailto:${value}` : value;
      const display = key === "email" ? value : value.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
      return { key, label: linkLabels[key], href, display };
    });
}
