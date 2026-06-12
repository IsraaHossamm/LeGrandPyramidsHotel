export interface EmailResponse {
  success?: boolean; // Optional because 500 error doesn't include it
  statusCode?: number; // Only present in 500 error
  error?: string; // Only present in 500 error
  message?: string; // Present at root level in 429 error

  // Present in 200 and 400 responses
  body?: {
    message: string;
    data: Record<string, any>; // Dynamic dictionary of your form fields
  };
}
