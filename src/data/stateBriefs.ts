import { sourcesById, type PrimarySourceId } from "./sources";

/** Figures read 2026-11-07 from the primary sources linked on each brief. */
export const STATE_BRIEF_UPDATED = "2026-11-07";
export const STATE_BRIEF_UPDATED_LABEL = "November 7, 2026";

export interface StateBondRow {
  license: string;
  volume: string;
  amount: string;
}

export interface StateBriefSection {
  heading: string;
  paragraphs: string[];
}

export interface StateBriefLink {
  href: string;
  label: string;
}

export interface StateBriefFaq {
  q: string;
  a: string;
}

export interface StateBrief {
  slug: string;
  title: string;
  description: string;
  h1: string;
  answer: string;
  sections: StateBriefSection[];
  table?: {
    caption: string;
    note: string;
    rows: StateBondRow[];
  };
  sourceIds: PrimarySourceId[];
  faqs: StateBriefFaq[];
  related: StateBriefLink[];
}

const arizonaRows: StateBondRow[] = [
  { license: "Residential General Contractors", volume: "Less than $750,000", amount: "$9,000" },
  { license: "Residential General Contractors", volume: "$750,000 or more", amount: "$15,000" },
  { license: "Residential Specialty Contractors", volume: "Less than $375,000", amount: "$4,250" },
  { license: "Residential Specialty Contractors", volume: "$375,000 or more", amount: "$7,500" },
  {
    license: "Commercial General Contractors (includes general engineering contractors)",
    volume: "$150,000 or less",
    amount: "$5,000",
  },
  {
    license: "Commercial General Contractors (includes general engineering contractors)",
    volume: "In excess of $150,000 but not more than $500,000",
    amount: "$15,000",
  },
  {
    license: "Commercial General Contractors (includes general engineering contractors)",
    volume: "In excess of $500,000 but not more than one million",
    amount: "$25,000",
  },
  {
    license: "Commercial General Contractors (includes general engineering contractors)",
    volume: "In excess of one million but not more than five million",
    amount: "$50,000",
  },
  {
    license: "Commercial General Contractors (includes general engineering contractors)",
    volume: "In excess of five million but not more than ten million",
    amount: "$75,000",
  },
  {
    license: "Commercial General Contractors (includes general engineering contractors)",
    volume: "Over ten million",
    amount: "$100,000",
  },
  { license: "Commercial Specialty Contractors", volume: "$150,000 or less", amount: "$2,500" },
  {
    license: "Commercial Specialty Contractors",
    volume: "In excess of $150,000 but not more than $500,000",
    amount: "$7,000",
  },
  {
    license: "Commercial Specialty Contractors",
    volume: "In excess of $500,000 but not more than one million",
    amount: "$17,500",
  },
  {
    license: "Commercial Specialty Contractors",
    volume: "In excess of one million but not more than five million",
    amount: "$25,000",
  },
  {
    license: "Commercial Specialty Contractors",
    volume: "In excess of five million but not more than ten million",
    amount: "$37,500",
  },
  { license: "Commercial Specialty Contractors", volume: "Over ten million", amount: "$50,000" },
];

const STATE_BRIEFS: StateBrief[] = [
  {
    slug: "arizona",
    title: "Arizona contractor license bond | SuretyResearch",
    description:
      "Arizona contractor license bond amounts from the Registrar of Contractors, by license class and contemplated gross volume.",
    h1: "Arizona contractor license bonds",
    answer:
      "Before the Arizona Registrar of Contractors grants or renews a contractor's license, A.R.S. § 32-1152 requires a surety bond or a cash deposit. The Registrar's bond table sets that license bond by class and contemplated gross volume in Arizona. A commercial specialty contractor at $150,000 or less files a $2,500 bond. A commercial general contractor, including general engineering, over ten million files a $100,000 bond. A residential contractor also pays the Residential Recovery Fund assessment or files a separate $200,000 bond.",
    sections: [
      {
        heading: "License bond amounts",
        paragraphs: [
          "A.R.S. § 32-1152 requires the surety bond, in a form the Registrar accepts, or a cash deposit before an original contractor's license is granted. No contractor's license is renewed unless that bond or deposit is in full force and effect. The statute sets the ranges. The Registrar fixes the amount inside those ranges after considering the volume of work and the classification.",
          "A residential contractor, including a dual licensee, either pays the Residential Recovery Fund assessment or files an additional surety or cash bond of $200,000. The license bond is continuous. The surety gives the contractor and the Registrar written notice at least 30 days before a cancellation takes effect. The surety has to be a corporation authorized to transact surety business in Arizona.",
          "The table is the bond table the Arizona Registrar of Contractors publishes. Volume is contemplated gross volume per license in Arizona. A dual license bond is the residential amount and the commercial amount added together, and the classification on the bond has to match the license. The amounts are the penal sum of the license bond. A licensed desk sets the premium.",
        ],
      },
      {
        heading: "Public building performance and payment bonds",
        paragraphs: [
          "For construction, alteration, or repair of a public building, public work, or improvement of a county, city, or town, or of an officer, board, or commission of one of those, and of the districts named in the statute, A.R.S. § 34-222 requires a performance bond and a payment bond before the contract is executed, except where another statute exempts the work. Each bond equals the full contract amount and becomes binding when the contract is awarded. The performance bond protects the public body. The payment bond protects claimants who supply labor or materials.",
          "Each bond is executed by a surety company holding a certificate of authority to transact surety business in Arizona. The contracting body cannot require the bonds from a particular surety company or through a particular agent or broker.",
        ],
      },
    ],
    table: {
      caption:
        "Arizona Registrar of Contractors license bond amounts by license class and contemplated gross volume.",
      note: "Read from the Registrar's bond table on November 7, 2026. A dual license adds the residential amount and the commercial amount.",
      rows: arizonaRows,
    },
    sourceIds: ["az-roc-bond", "az-32-1152", "az-34-222"],
    faqs: [
      {
        q: "How much is an Arizona contractor license bond?",
        a: "The Arizona Registrar of Contractors publishes the amount by license class and contemplated gross volume. A commercial specialty contractor at $150,000 or less posts $2,500. A residential general contractor under $750,000 posts $9,000, and one at $750,000 or more posts $15,000. A commercial general contractor, including general engineering, posts $5,000 at $150,000 or less and $100,000 over ten million. A dual license adds the residential and commercial amounts. The full table is on this page.",
      },
      {
        q: "Does an Arizona residential contractor need a second bond?",
        a: "A residential contractor, including a dual licensee, pays the Residential Recovery Fund assessment or posts an additional surety or cash bond of $200,000. A.R.S. § 32-1152(C) and the Registrar's bond page both state that choice.",
      },
      {
        q: "Does Arizona public construction require a performance bond and a payment bond?",
        a: "A.R.S. § 34-222 requires both, each equal to the full contract amount, before the contract is executed for the public bodies the statute names, except where another statute exempts the work. The performance bond protects the public body. The payment bond protects claimants who supply labor or materials.",
      },
    ],
    related: [
      { href: "/bonds/contractor/", label: "Contractor license bond" },
      { href: "/bonds/license-permit/", label: "License and permit bonds" },
      { href: "/bonds/contract/", label: "Contract surety bonds" },
      { href: "/bonds/performance/", label: "Performance bond on a federal public work" },
      { href: "/guides/how-surety-bonds-work/", label: "How a surety bond works" },
    ],
  },
  {
    slug: "nebraska",
    title: "Nebraska public construction bonds | SuretyResearch",
    description:
      "Nebraska public construction requires a payment bond of at least the contract price, with a $15,000 state and $10,000 local exception.",
    h1: "Nebraska public construction bonds",
    answer:
      "Before a Nebraska public body signs a contract to erect, furnish, or repair a public building, bridge, highway, or other public structure, Neb. Rev. Stat. § 52-118 requires a labor and material payment bond of at least the contract price with a corporate surety. A state project of $15,000 or less, and a county, city, village, school district, or other local project of $10,000 or less, does not need that bond unless the specifications require one.",
    sections: [
      {
        heading: "Payment bond on public construction",
        paragraphs: [
          "The duty runs to the State of Nebraska and any department or agency of the state, county boards, the contracting board of a city, village, or school district, and any other public board empowered to make the contract. The bond covers laborers and mechanics for labor that is performed, and material and equipment rental actually used or rented in the work. The contractor selects the corporate surety company and agent. The contract is not signed until the bond is filed and approved.",
          "The payment bond is not required for a project of the state or a state department or agency with a total cost of $15,000 or less. It is not required for a county, city, village, school district, or other local project with a total cost of $10,000 or less. Either body can still require the bond in the specifications.",
        ],
      },
      {
        heading: "State building performance bond",
        paragraphs: [
          "On state building work, Neb. Rev. Stat. § 72-803 requires the successful bidder to furnish a bond for the faithful performance of the contract. A performance bond is not required for a project with a total cost of $100,000 or less unless the department or agency includes a bond requirement in the specifications. Where that statute requires the state to let the building contract, the bid includes a certified check or a bid bond in a sum the department or agency fixes.",
          "Subsection (2) of § 72-803 tells the Department of Administrative Services to adjust the bidding dollar amount in that subsection every four years beginning January 1, 2026. The $100,000 figure above is the performance-bond exception printed in subsection (3).",
        ],
      },
    ],
    sourceIds: ["ne-52-118", "ne-72-803"],
    faqs: [
      {
        q: "What payment bond does Nebraska require on a public building?",
        a: "Neb. Rev. Stat. § 52-118 requires a labor and material payment bond of at least the contract price, with a corporate surety, before the state, a county, a city, a village, a school district, or another public board signs a contract to erect, furnish, or repair a public building, bridge, highway, or other public structure. The contract is not signed until the bond is filed and approved.",
      },
      {
        q: "Which Nebraska public projects can skip the payment bond?",
        a: "A state project with a total cost of $15,000 or less, and a county, city, village, school district, or other local project with a total cost of $10,000 or less, does not need the § 52-118 payment bond unless the specifications require one.",
      },
      {
        q: "Does Nebraska state building work require a performance bond?",
        a: "Neb. Rev. Stat. § 72-803 requires the successful bidder on state building work to furnish a bond for faithful performance of the contract. A performance bond is not required for a project of $100,000 or less unless the specifications require one. Where that statute requires the state to let the building contract, the bid includes a certified check or a bid bond in a sum the department or agency fixes.",
      },
    ],
    related: [
      { href: "/bonds/contract/", label: "Contract surety bonds" },
      { href: "/bonds/performance/", label: "Performance bond on a federal public work" },
      { href: "/guides/how-surety-bonds-work/", label: "How a surety bond works" },
      { href: "/guides/how-to-find-a-surety-bond-agency/", label: "How to find a surety bond agency" },
    ],
  },
];

export function stateBriefFor(slug: string) {
  return STATE_BRIEFS.find((brief) => brief.slug === slug);
}

export function stateBriefSources(brief: StateBrief) {
  return sourcesById(brief.sourceIds);
}
