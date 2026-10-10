export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "What is a surety bond?",
    a: "A three-party guarantee: you (the principal), the obligee (usually a regulator, owner, or court), and the surety. If you fail the obligation, the surety pays, then seeks reimbursement from you.",
  },
  {
    q: "How is SuretyResearch related to Integrity First Insurance?",
    a: "SuretyResearch is affiliated with Cornerstone Licensing and Integrity First. The Alpharetta file is Integrity First Insurance. Andrea runs the agency day to day. Jody produces.",
  },
  {
    q: "How are the files listed?",
    a: "A to Z by name. Each file shows the signal, the date, and the link: BBB letter grade, AM Best when a source was opened, years since founding, geographic coverage, and bond series.",
  },
  {
    q: "How much does a bond cost?",
    a: "An annual premium, often 1–15% of the face amount, set by credit, form, and underwriting. The <a href='/#calculator'>premium sketch</a> is an industry-average band. A licensed desk confirms the figure.",
  },
  {
    q: "Is a bond the same as insurance?",
    a: "Insurance pays you. A bond pays someone else if you fail the obligation, and you indemnify the surety. The <a href='/guides/bond-vs-insurance/'>comparison</a> walks through both.",
  },
  {
    q: "Does applying affect my credit?",
    a: "Most license-bond applications use a soft pull. Contract surety is a different underwriting file. See the <a href='/guides/credit-score-impact/'>credit guide</a>.",
  },
  {
    q: "Can a weaker credit file still be bonded?",
    a: "Often yes, at a higher rate, and sometimes with collateral. Start with the credit guide, then talk to the desk with the actual form in hand.",
  },
  {
    q: "How long does issuance take?",
    a: "Many license and permit bonds: one to three business days. Heavy contract or money-transmitter files: weeks. The series pages say which pattern you are in.",
  },
  {
    q: "Who issues the paper?",
    a: "An admitted surety, through a licensed agent or a direct-writing carrier. This site is the register. Integrity First Insurance and the Cornerstone surety line place bonds from it.",
  },
];

export const HOME_FAQS = FAQS.slice(0, 6);
