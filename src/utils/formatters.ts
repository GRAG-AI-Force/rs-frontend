export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  } catch (e) {
    return dateString;
  }
};

export const getAqiStatusLabel = (aqi: number): { label: string; colorKey: string } => {
  if (aqi <= 50) return { label: 'Good', colorKey: 'aqiGood' };
  if (aqi <= 100) return { label: 'Moderate', colorKey: 'aqiModerate' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive', colorKey: 'aqiModerate' };
  if (aqi <= 200) return { label: 'Unhealthy', colorKey: 'aqiUnhealthy' };
  return { label: 'Hazardous', colorKey: 'error' };
};
