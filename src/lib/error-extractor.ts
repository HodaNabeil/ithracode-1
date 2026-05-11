import { AxiosError } from 'axios';

/**
 * Extract error message from Axios errors and other error types
 */
export function extractErrorMessage(
  error: unknown,
  defaultMessage: string = 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
): string {
  // Handle AxiosError specifically
  if (error instanceof AxiosError) {
    // Try to extract message from response data
    const responseData = error.response?.data;

    if (responseData?.message) {
      return responseData.message;
    }

    if (responseData?.error) {
      return responseData.error;
    }

    // Fall back to axios error message
    if (error.message) {
      return error.message;
    }
  }

  // Handle regular Error objects
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Return default message for any other error type
  return defaultMessage;
}
