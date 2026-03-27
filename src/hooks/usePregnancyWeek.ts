import { useUser } from '../context/UserContext';

export const usePregnancyWeek = () => {
  const { user } = useUser();

  if (!user) return 0;

  const regDate = new Date(user.registrationDate);
  const now = new Date();
  
  // Calculate difference in weeks
  const diffInMs = now.getTime() - regDate.getTime();
  const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
  
  return user.initialWeek + diffInWeeks;
};
