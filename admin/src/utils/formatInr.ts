const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatInr(value: number) {
  return inr.format(value);
}

/** Short axis label. Tooltips still use the full rupee amount. */
export function formatAxisRupee(value: number) {
  if (value >= 100000) {
    const lakhs = value / 100000;
    const label = Number.isInteger(lakhs) ? String(lakhs) : lakhs.toFixed(1);
    return `₹${label}L`;
  }
  if (value >= 1000) return `₹${Math.round(value / 1000)}k`;
  return `₹${value}`;
}
