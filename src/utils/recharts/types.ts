import { CategoricalChartProps, CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { AxisDomain, BaseAxisProps } from 'recharts/types/util/types';

export interface AxisProps extends BaseAxisProps {
  originalDomain?: AxisDomain;
  ticks?: number[];
}

export interface CustomizedProps extends CategoricalChartState, CategoricalChartProps {
  xAxisMap?: {
    [k: string]: AxisProps;
  };
  yAxisMap?: {
    [k: string]: AxisProps;
  };
  zAxisMap?: {
    [k: string]: AxisProps;
  };
}

export interface TickProps {
  payload: {
    value?: string | number;
  };
  tickFormatter: (value: string | number) => string | number;
  width: number;
  x: number;
  y: number;
}

export interface ViewBox {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface CustomLabelProps {
  content: any;
  offset: number;
  viewBox: ViewBox;
}

export type Grid = GridCell[];

export interface GridCell {
  x: number;
  y: number;
  height: number;
  width: number;
  xTicks: [number | string, number | string];
  yTicks: [number | string, number | string];
}

export type AxisNumericDomain = [number, number];

export interface GridFromTicksParams {
  height: number;
  width: number;
  xDomain: AxisNumericDomain;
  xTicks: number[];
  yDomain: AxisNumericDomain;
  yTicks: number[];
}

export interface TransformToLocalParams {
  x: number;
  domain: AxisNumericDomain;
  axisSize: number;
}
