export const bps = {
  sm: 768,
  md: 992,
  lg: 1200
};

const breakpointList = Object.values(bps).map(b => `${b}px`);

export const maxMedias = Object.keys(bps).map(
  p => `@media (max-width: ${bps[p] - 1}px)`
);

export default breakpointList;
