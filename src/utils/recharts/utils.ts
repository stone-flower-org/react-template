import { AxisDomain } from 'recharts/types/util/types';

import { AxisNumericDomain, Grid, GridFromTicksParams, TransformToLocalParams } from './types';

export const getDomainSize = (domain: AxisNumericDomain) => domain[1] - domain[0];

export const normilizeByDomain = (x: number, domain: AxisNumericDomain) => x - domain[0];

export const transformToLocal = ({ x, domain, axisSize }: TransformToLocalParams): number => {
  const domainSize = getDomainSize(domain);
  if (!domainSize) return 0;
  return (axisSize * normilizeByDomain(x, domain)) / domainSize;
};

export const getNumericDomainFromAxisDomain = (domain: AxisDomain): AxisNumericDomain => {
  if (!Array.isArray(domain)) return [0, 0];
  return [+(domain[0] ?? 0), +(domain[1] ?? 0)];
};

export const createGridFromTicks = ({ height, width, xDomain, xTicks, yDomain, yTicks }: GridFromTicksParams): Grid => {
  const grid: Grid = [];

  const maxXTicks = getDomainSize(xDomain);
  const maxYTicks = getDomainSize(yDomain);
  if (!maxXTicks || !maxYTicks) return grid;

  let prevYTick = yTicks[0];
  for (let yTickI = 0; yTickI < yTicks.length; yTickI++) {
    const yTick = yTicks[yTickI];
    const yDist = yTick - prevYTick;

    let prevXTick = xTicks[0];
    for (let xTickI = 1; xTickI < xTicks.length; xTickI++) {
      const xTick = xTicks[xTickI];
      const xDist = xTick - prevXTick;

      grid.push({
        height: (height * yDist) / maxYTicks,
        width: (width * xDist) / maxXTicks,
        x: transformToLocal({ x: prevXTick, axisSize: width, domain: xDomain }),
        xTicks: [prevXTick, xTick],
        y: height - transformToLocal({ x: yTick, axisSize: height, domain: yDomain }),
        yTicks: [prevYTick, yTick],
      });

      prevXTick = xTick;
    }

    prevYTick = yTick;
  }

  return grid;
};
