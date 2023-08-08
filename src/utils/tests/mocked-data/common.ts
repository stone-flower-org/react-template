export const makeOptionsFromList = (list: string[]) =>
  list.map((item) => ({
    key: item,
    label: item,
    value: item,
  }));

export const makeOption = (attrs: any = {}) => ({
  key: 'key',
  label: 'label',
  value: 'value',
  ...attrs,
});

export const setTreeOptionsAttrs = (options: any[], attrs: any): any[] =>
  options.map((option: any) => ({
    ...option,
    ...attrs,
    children: option.children ? setTreeOptionsAttrs(option.children, attrs) : undefined,
  }));
