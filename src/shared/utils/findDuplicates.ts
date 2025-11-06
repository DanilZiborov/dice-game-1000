// находит дубли в массиве строк и возвращает строку с дублями через запятую
export const findDuplicates = (items: string[]): string => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }

  return [...duplicates].join(', ');
};
