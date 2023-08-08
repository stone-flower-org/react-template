export interface UseDelayedIntersectionParams<EP extends any[], LP extends any[]> {
  enterDelay?: number;
  initIntersected?: boolean;
  leaveDelay?: number;
  onEnter?: (...params: EP) => void;
  onLeave?: (...params: LP) => void;
}
