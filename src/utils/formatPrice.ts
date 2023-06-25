function formatPrice(price: number): string {
  // Convert the price to a string, round it to 0 decimal places, and split it into an array of two parts (before and after the decimal point)
  const parts = price.toFixed(0).split(".");
  // Replace non-word boundaries with dots every three digits in the integer part of the price
  const formatted = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // If the price has a decimal part, append it with a dot to the formatted integer part; otherwise, return only the formatted integer part
  return formatted + (parts[1] ? `.${parts[1]}` : "");
}

export { formatPrice };
