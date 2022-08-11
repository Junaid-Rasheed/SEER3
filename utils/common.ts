export const waitFor = (seconds: number) =>
  new Promise((rs) => setTimeout(rs, seconds));
