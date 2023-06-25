function isPositiveNumber(number: string): boolean {
  const numericValue = +number;

  if (numericValue > 0) {
    return true;
  } else if (numericValue < 0) {
    return false;
  } else {
    return true;
  }
}

export { isPositiveNumber };
