/**
 * Fictional sample data for the Event App concept demo.
 * Generic names only: no real clubs, students or venues. Dates are offsets from today.
 */

export const domains = [
  "AI/ML",
  "Web",
  "Competitive Programming",
  "Hardware",
  "Robotics",
  "Research",
] as const;
export type Domain = (typeof domains)[number];

export const stages = [
  "Proposed",
  "Submitted for approval",
  "Approved",
  "Scheduled",
  "Live",
  "Report and feedback filed",
  "Archived",
] as const;
export type Stage = (typeof stages)[number];

/** Stages at which an event is visible to students */
export const publicStages: Stage[] = ["Approved", "Scheduled", "Live", "Report and feedback filed"];

export type Reimbursement = "Not started" | "Pending" | "Settled" | "Awaiting approval";

export interface DemoTask {
  label: string;
  done: boolean;
  overdue?: boolean;
}

export interface DemoEvent {
  id: string;
  name: string;
  organizer: string;
  domains: Domain[];
  stage: Stage;
  /** Days from today. Negative means the event has already happened. */
  dayOffset: number;
  /** Registration deadline, in days from today. null when registration does not apply. */
  deadlineOffset: number | null;
  venue: string;
  eligibility: string;
  summary: string;
  tasks: DemoTask[];
  budget: {
    allocated: number | null;
    spent: number;
    prize: number;
    reimbursement: Reimbursement;
  };
  audit: { text: string; when: string }[];
}

export const demoEvents: DemoEvent[] = [
  {
    id: "git-workshop",
    name: "Intro to Git and GitHub Workshop",
    organizer: "Coding club",
    domains: ["Web"],
    stage: "Scheduled",
    dayOffset: 4,
    deadlineOffset: 2,
    venue: "Sample venue",
    eligibility: "Open to all years. Bring a laptop.",
    summary: "A hands-on session on commits, branches and pull requests.",
    tasks: [
      { label: "Book venue", done: true },
      { label: "Confirm speaker", done: true },
      { label: "Open registrations", done: true },
      { label: "Share setup guide with participants", done: false, overdue: true },
      { label: "Prepare feedback form", done: false },
    ],
    budget: { allocated: 3000, spent: 1200, prize: 0, reimbursement: "Pending" },
    audit: [
      { text: "Registrations opened by Organizer A", when: "1 day ago" },
      { text: "Budget updated by Organizer A", when: "2 days ago" },
      { text: "Event approved by Approver B", when: "5 days ago" },
      { text: "Proposal submitted by Organizer A", when: "8 days ago" },
    ],
  },
  {
    id: "codeathon",
    name: "Weekend Codeathon",
    organizer: "Coding club",
    domains: ["Competitive Programming"],
    stage: "Scheduled",
    dayOffset: 10,
    deadlineOffset: 7,
    venue: "Sample venue",
    eligibility: "Teams of 2 to 3. All years.",
    summary: "A two-day team contest, with problem editorials shared afterwards.",
    tasks: [
      { label: "Book venue", done: true },
      { label: "Set and test problems", done: true },
      { label: "Test judge setup", done: false },
      { label: "Arrange refreshments", done: false },
      { label: "Finalize prizes", done: false },
    ],
    budget: { allocated: 12000, spent: 2500, prize: 6000, reimbursement: "Not started" },
    audit: [
      { text: "Problem set marked ready by Organizer A", when: "1 day ago" },
      { text: "Prize money recorded by Organizer A", when: "3 days ago" },
      { text: "Budget allocated by Approver B", when: "6 days ago" },
    ],
  },
  {
    id: "arduino-lab",
    name: "Arduino Basics Lab",
    organizer: "Robotics club",
    domains: ["Hardware", "Robotics"],
    stage: "Approved",
    dayOffset: 16,
    deadlineOffset: 12,
    venue: "Sample venue",
    eligibility: "First and second years. 30 seats.",
    summary: "Build simple circuits and program a microcontroller from scratch.",
    tasks: [
      { label: "Assign event owner", done: true },
      { label: "Check component kits", done: true },
      { label: "Confirm lab slot", done: false },
      { label: "Open registrations", done: false },
    ],
    budget: { allocated: 8000, spent: 0, prize: 0, reimbursement: "Not started" },
    audit: [
      { text: "Owner assigned: Organizer C", when: "1 day ago" },
      { text: "Budget allocated by Approver B", when: "1 day ago" },
      { text: "Proposal submitted by Organizer C", when: "6 days ago" },
    ],
  },
  {
    id: "ml-circle",
    name: "ML Paper Reading Circle",
    organizer: "AI/ML club",
    domains: ["AI/ML", "Research"],
    stage: "Report and feedback filed",
    dayOffset: -5,
    deadlineOffset: null,
    venue: "Sample venue",
    eligibility: "Open to all years.",
    summary: "Read and discuss one recent machine learning paper together.",
    tasks: [
      { label: "Share the paper in advance", done: true },
      { label: "Book room", done: true },
      { label: "Record attendance", done: true },
      { label: "File post-event report", done: true },
    ],
    budget: { allocated: 1500, spent: 1350, prize: 0, reimbursement: "Settled" },
    audit: [
      { text: "Post-event report filed by Organizer D", when: "2 days ago" },
      { text: "Reimbursement settled by Approver B", when: "3 days ago" },
      { text: "Attendance recorded by Organizer D", when: "5 days ago" },
    ],
  },
  {
    id: "web-build-night",
    name: "Web Dev Build Night",
    organizer: "Web dev club",
    domains: ["Web"],
    stage: "Submitted for approval",
    dayOffset: 21,
    deadlineOffset: 18,
    venue: "Sample venue",
    eligibility: "Open to all years.",
    summary: "Build and ship a small web project in one evening.",
    tasks: [
      { label: "Draft proposal", done: true },
      { label: "Estimate budget", done: true },
      { label: "Wait for approval", done: false },
    ],
    budget: { allocated: null, spent: 0, prize: 0, reimbursement: "Awaiting approval" },
    audit: [
      { text: "Submitted for approval by Organizer E", when: "1 day ago" },
      { text: "Proposal drafted by Organizer E", when: "3 days ago" },
    ],
  },
];
