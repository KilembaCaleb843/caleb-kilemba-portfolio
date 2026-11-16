/**
 * Articles published on the previous version of the site. They are linked
 * at their existing URLs. If the old deployment is replaced, migrate the
 * posts and update `articlesBaseUrl` (see README).
 */
export const articlesBaseUrl = "https://caleb-kilemba-portfolio.vercel.app/blog";

export type Article = {
  slug: string;
  title: string;
  summary: string;
  published: string; // ISO date
  readMinutes: number;
};

export const articles: Article[] = [
  {
    slug: "deciding-who-to-trust-with-credit",
    title: "Deciding who to trust with credit",
    summary: "Using a business's own repayment records to judge borrowers instead of relying on relationships alone.",
    published: "2026-09-11",
    readMinutes: 6,
  },
  {
    slug: "is-that-delivery-order-making-you-money",
    title: "Is that delivery order even making you money?",
    summary: "What a delivery-app order is really worth after commissions, packaging, refunds and other costs.",
    published: "2026-09-11",
    readMinutes: 6,
  },
  {
    slug: "mpesa-till-data-customer-insight",
    title: "Your M-Pesa till is a goldmine you're ignoring",
    summary: "How till statements can guide staffing, stocking and spotting unprofitable trading hours.",
    published: "2026-09-11",
    readMinutes: 6,
  },
  {
    slug: "pos-voids-discounts-margin-leakage",
    title: "The money leaking from your counter",
    summary: "Finding patterns in voids, manual discounts and no-sale drawer opens that erode margin.",
    published: "2026-09-11",
    readMinutes: 6,
  },
  {
    slug: "repricing-when-the-shilling-slides",
    title: "Repricing for a shilling that keeps sliding",
    summary: "Setting prices from replacement cost instead of past purchase cost, without losing customers.",
    published: "2026-09-11",
    readMinutes: 5,
  },
  {
    slug: "stocking-for-the-kenyan-calendar",
    title: "Stocking for the Kenyan calendar",
    summary: "Buying inventory around predictable seasonal spending: school fees, the festive season and January.",
    published: "2026-09-11",
    readMinutes: 5,
  },
  {
    slug: "when-excel-starts-costing-you-money",
    title: "When Excel starts costing you money",
    summary: "Signs a spreadsheet-run business has outgrown its tools, and what to do before the file corrupts.",
    published: "2026-09-11",
    readMinutes: 6,
  },
  {
    slug: "where-should-you-open-next",
    title: "Where should you open next?",
    summary: "Using delivery addresses and sales patterns to find demand for a new branch without cannibalising another.",
    published: "2026-09-11",
    readMinutes: 5,
  },
  {
    slug: "which-branch-is-actually-making-money",
    title: "Which of your branches is actually making money?",
    summary: "Comparing branches after rent, staff and shrinkage to decide which to back, fix or close.",
    published: "2026-09-11",
    readMinutes: 6,
  },
  {
    slug: "who-actually-comes-back",
    title: "Who actually comes back?",
    summary: "Measuring repeat customers from payment records to choose between retention and acquisition spend.",
    published: "2026-09-11",
    readMinutes: 6,
  },
];
