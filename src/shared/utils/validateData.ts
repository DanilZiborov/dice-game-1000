import { safeParse, type AnySchema } from 'valibot';

type ValidateResult = {
  isValid: boolean;
};

export const validateData = (schema: AnySchema, data: unknown): ValidateResult => {
  const result = safeParse(schema, data);

  if (!result.success) {
    // eslint-disable-next-line no-console
    console.error('Ошибка валидации данных:', result.issues);

    return { isValid: false };
  }

  return { isValid: true };
};
