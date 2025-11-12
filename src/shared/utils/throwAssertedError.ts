/**
 * Преобразует неизвестный тип ошибки в Error и выбрасывает её с кастомным сообщением.
 * Если ошибка уже является экземпляром Error, добавляет к сообщению предоставленный текст.
 * Если ошибка имеет другой тип, сериализует её через JSON и добавляет к сообщению.
 */
export const throwAssertedError = (err: unknown, message: string): never => {
  if (err instanceof Error) {
    throw new Error(`${message}: ${err.message}`);
  } else {
    throw new Error(`${message}. Обнаружена непредвиденная ошибка. Данные (error): ${JSON.stringify(err)}`);
  }
};
