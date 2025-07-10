export const generateRandomUsername = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let name = '';
  for (let i = 0; i < 3; i++) {
    name += letters[Math.floor(Math.random() * letters.length)];
  }
  name += Math.floor(1000 + Math.random() * 9000);
  return name;
};