export const datasetName = "customer_transactions_2024.csv";

export const overview = {
  rows: 12483,
  columns: 18,
  missing: 342,
  duplicates: 27,
  qualityScore: 92,
  fileSize: "3.4 MB",
};

export type ProfileRow = {
  name: string;
  type: "numeric" | "categorical" | "datetime" | "text";
  missingPct: number;
  unique: number;
  mean?: number;
  median?: number;
  min?: number;
  max?: number;
  std?: number;
};

export const profileRows: ProfileRow[] = [
  { name: "transaction_id", type: "text", missingPct: 0, unique: 12483 },
  { name: "customer_id", type: "text", missingPct: 0, unique: 3214 },
  { name: "amount", type: "numeric", missingPct: 0.4, unique: 8821, mean: 124.32, median: 89.5, min: 0.99, max: 4820, std: 142.1 },
  { name: "currency", type: "categorical", missingPct: 0, unique: 6 },
  { name: "country", type: "categorical", missingPct: 1.2, unique: 47 },
  { name: "category", type: "categorical", missingPct: 0, unique: 12 },
  { name: "created_at", type: "datetime", missingPct: 0, unique: 12480 },
  { name: "age", type: "numeric", missingPct: 4.8, unique: 73, mean: 38.4, median: 36, min: 18, max: 92, std: 14.2 },
  { name: "discount_pct", type: "numeric", missingPct: 22.1, unique: 18, mean: 8.7, median: 5, min: 0, max: 75, std: 11.3 },
  { name: "channel", type: "categorical", missingPct: 0, unique: 4 },
  { name: "is_returning", type: "categorical", missingPct: 0, unique: 2 },
  { name: "rating", type: "numeric", missingPct: 11.3, unique: 5, mean: 4.2, median: 4, min: 1, max: 5, std: 0.9 },
];

export const recommendations = [
  {
    id: 1,
    title: "Remove 27 duplicate rows",
    reason: "Identical (transaction_id, customer_id, created_at) combinations detected.",
    confidence: 99,
    impact: "Low",
    category: "Duplicates",
  },
  {
    id: 2,
    title: "Impute missing `discount_pct` with 0",
    reason: "Missing values strongly correlate with non-promotional channels.",
    confidence: 92,
    impact: "Medium",
    category: "Missing Values",
  },
  {
    id: 3,
    title: "Standardize `country` casing",
    reason: "Found 'USA', 'usa', and 'Usa' as distinct categories.",
    confidence: 97,
    impact: "Medium",
    category: "Normalization",
  },
  {
    id: 4,
    title: "Cap `amount` outliers above $2,400",
    reason: "12 values exceed 3σ — likely B2B transactions skewing distribution.",
    confidence: 84,
    impact: "High",
    category: "Outliers",
  },
  {
    id: 5,
    title: "Convert `created_at` to ISO 8601",
    reason: "Mixed formats detected: MM/DD/YYYY and YYYY-MM-DD.",
    confidence: 100,
    impact: "Low",
    category: "Dates",
  },
];

export const insights = [
  {
    id: 1,
    icon: "trending",
    title: "Strong correlation: discount → repeat purchase",
    detail: "Customers receiving discounts ≥10% are 2.3× more likely to return within 30 days (r=0.71).",
    confidence: 94,
    priority: "High",
    category: "Correlation",
  },
  {
    id: 2,
    icon: "alert",
    title: "Anomaly cluster in EU transactions",
    detail: "47 transactions on Mar 14 from Germany exceed typical amount by 8×. Possible data entry error or fraud signal.",
    confidence: 89,
    priority: "High",
    category: "Anomaly",
  },
  {
    id: 3,
    icon: "lightbulb",
    title: "Mobile channel drives premium segments",
    detail: "Mobile users spend 34% more on average than web, concentrated in the 25–34 age band.",
    confidence: 91,
    priority: "Medium",
    category: "Business",
  },
  {
    id: 4,
    icon: "target",
    title: "Top feature: `channel` predicts retention",
    detail: "Channel contributes 38% to a returning-customer model — by far the strongest single signal.",
    confidence: 87,
    priority: "Medium",
    category: "Feature Importance",
  },
  {
    id: 5,
    icon: "sparkles",
    title: "Hidden seasonality in weekday signups",
    detail: "Tuesday and Wednesday show 22% higher conversion. Consider rebalancing ad spend.",
    confidence: 82,
    priority: "Medium",
    category: "Trend",
  },
  {
    id: 6,
    icon: "shield",
    title: "Potential leakage: `discount_pct` ↔ `is_returning`",
    detail: "`discount_pct` is only populated for promotional cohorts — exclude from retention models.",
    confidence: 96,
    priority: "High",
    category: "Data Leakage",
  },
];

export const amountHistogram = [
  { bin: "0–50", count: 4120 },
  { bin: "50–100", count: 3580 },
  { bin: "100–200", count: 2840 },
  { bin: "200–400", count: 1320 },
  { bin: "400–800", count: 480 },
  { bin: "800+", count: 143 },
];

export const categoryShare = [
  { name: "Electronics", value: 28 },
  { name: "Apparel", value: 22 },
  { name: "Home", value: 18 },
  { name: "Beauty", value: 14 },
  { name: "Sports", value: 10 },
  { name: "Other", value: 8 },
];

export const monthlyTrend = [
  { m: "Jan", revenue: 142, orders: 980 },
  { m: "Feb", revenue: 138, orders: 940 },
  { m: "Mar", revenue: 168, orders: 1120 },
  { m: "Apr", revenue: 192, orders: 1280 },
  { m: "May", revenue: 178, orders: 1190 },
  { m: "Jun", revenue: 215, orders: 1420 },
  { m: "Jul", revenue: 248, orders: 1610 },
  { m: "Aug", revenue: 232, orders: 1540 },
  { m: "Sep", revenue: 264, orders: 1720 },
  { m: "Oct", revenue: 289, orders: 1880 },
  { m: "Nov", revenue: 312, orders: 2010 },
  { m: "Dec", revenue: 358, orders: 2240 },
];

export const scatterData = Array.from({ length: 80 }, (_, i) => ({
  x: Math.round(20 + Math.random() * 60),
  y: Math.round(20 + Math.random() * 400 + i * 1.4),
}));

export const correlations = [
  ["amount", "discount", "age", "rating", "returning"],
  // value matrix
  [1.0, 0.71, -0.12, 0.34, 0.62],
  [0.71, 1.0, -0.08, 0.21, 0.58],
  [-0.12, -0.08, 1.0, 0.04, -0.03],
  [0.34, 0.21, 0.04, 1.0, 0.41],
  [0.62, 0.58, -0.03, 0.41, 1.0],
];

export const agents = [
  { name: "Profile Agent", desc: "Schema, types, distributions", status: "done", time: "1.2s", conf: 99 },
  { name: "Cleaning Agent", desc: "Duplicates, nulls, normalization", status: "done", time: "2.4s", conf: 94 },
  { name: "Visualization Agent", desc: "Auto-charts & encodings", status: "running", time: "—", conf: 0 },
  { name: "Insight Agent", desc: "Patterns, anomalies, drivers", status: "queued", time: "—", conf: 0 },
  { name: "Report Agent", desc: "Executive summary & export", status: "queued", time: "—", conf: 0 },
] as const;
