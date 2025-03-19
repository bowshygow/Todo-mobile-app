export const handleError = (error: Error, context: string) => {
  console.error(`Error in ${context}:`, error);
  // Here you could add error reporting logic
  // like sending to a service like Sentry
};

export const handleAsyncError = async <T>(
  promise: Promise<T>,
  context: string
): Promise<T> => {
  try {
    return await promise;
  } catch (error) {
    handleError(error as Error, context);
    throw error;
  }
}; 