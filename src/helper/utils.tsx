const enToBnDigits: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

/**
 * Converts an English number or digit string to Bangla digits.
 * @param value - The number or string to convert
 * @returns The converted Bangla string
 */
export const numEnToBn = (value: string | number): string => {
  return value.toString().replace(/\d/g, (digit) => enToBnDigits[digit]);
};



export const convertDateEnToBn = (dateStr: string): string => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return '';

  const [year, month, day] = dateStr.split('-');
  return numEnToBn(`${day}/${month}/${year}`);
};

export const genderEnToBn = (gender: string): string => {
  const normalized = gender.trim().toLowerCase();

  switch (normalized) {
    case 'male':
      return 'পুরুষ';
    case 'female':
      return 'নারী';
    case 'other':
      return 'অন্যান্য';
    default:
      return gender;
  }
};

