export const getGreeting = () => {
  let welcome = "";
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();

  if (minute < 10) {
    minute = 0 + minute;
  }
  if (seconds < 10) {
    seconds = 0 + seconds;
  }
  if (hour < 12) {
    welcome = "Good morning";
  } else if (hour < 17) {
    welcome = "Goof afternoon";
  } else {
    welcome = "Good evening";
  }
  return welcome;
};
