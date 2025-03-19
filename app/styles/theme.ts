export const theme = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    text: '#000000',
    textSecondary: '#666666',
    error: '#FF3B30',
    success: '#34C759',
    border: '#E5E5EA',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    small: 8,
    medium: 16,
    large: 24,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    small: 4,
    medium: 8,
    large: 12,
  },
  typography: {
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal',
    },
  },
} as const; 