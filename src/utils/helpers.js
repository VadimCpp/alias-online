const isUserActive = (lastActiveAt) => {
  const today = +(new Date());
  return (today - lastActiveAt) / 1000 / 60 / 60 < 1;
};

export {
  isUserActive
};
