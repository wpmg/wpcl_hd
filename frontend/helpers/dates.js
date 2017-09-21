import { PadLeft } from './strings';

const DiskTimeFormat = (ms) => {
  const t = new Date(ms);
  const ts = t.getFullYear().toString().slice(2)
    + PadLeft(t.getMonth() + 1, 2, '0')
    + PadLeft(t.getDate(), 2, '0')
    + '@'
    + PadLeft(t.getHours(), 2, '0')
    + PadLeft(t.getMinutes(), 2, '0')
    + PadLeft(t.getSeconds(), 2, '0');

  return ts;
};

export { DiskTimeFormat };
