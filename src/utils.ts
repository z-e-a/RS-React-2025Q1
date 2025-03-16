import { ValidationError } from 'yup';

export function trowCustomValidationError(field: string, message: string) {
  const newError = new ValidationError('file size must be less than 100kb');
  const newInnerError = new ValidationError(
    'file size must be less than 100kb'
  );
  newInnerError.path = field;
  newInnerError.message = message;

  newError.inner.push(newInnerError);
  throw newError;
}

export function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
