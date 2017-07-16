const PadLeft = (s, l, p) => {
  const ps = p.toString();
  let li = parseInt(l, 10) - s.toString().length;
  li = li < 0 ? 0 : li;
  return ps.repeat(li) + s;
};

export { PadLeft };
