const isUserActive = (lastActiveAt) => {
  const today = Date.now();
  return (today - lastActiveAt) / 1000 / 60 / 60 < 1;
};

export {
  isUserActive
};
