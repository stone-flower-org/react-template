import { Option, TreeOption } from './types';

export const deafultEmptyOption = {
  key: 'empty',
  label: '-',
  value: '',
} as const;

export const getValuesFromTreeOptions = <V = any>(options: TreeOption<V>[]): V[] => {
  const getValuesFromCheckboxTreeItem = (item: TreeOption<V>): V[] => {
    const values: V[] = [];
    if ('value' in item && item.value) values.push(item.value);
    if ('children' in item && item.children) values.push(...item.children.flatMap(getValuesFromCheckboxTreeItem));
    return values;
  };
  return options.flatMap(getValuesFromCheckboxTreeItem);
};

export const getValuesFromOptions = <V = any>(options: Option<V>[]): V[] => options.map(({ value }) => value);

export const forEachTreeOption = <O extends TreeOption>(options: O[], callback: (option: O) => void): void => {
  options.forEach((option) => {
    callback(option);
    if ('children' in option && option.children) forEachTreeOption(option.children as O[], callback);
  });
};

export const getTreeOptionsTillLevel = <O extends TreeOption>(
  options: O[],
  level: number,
  currentLevel = 0,
): TreeOption[] => {
  const getTreeOption = (option: O, level: number, currentLevel: number): TreeOption[] => {
    const options: TreeOption[] = [];
    if (level < currentLevel) return options;
    options.push(option);
    if (option.children)
      options.push(...(option.children as O[]).flatMap((option) => getTreeOption(option, level, currentLevel + 1)));
    return options;
  };
  return options.flatMap((option) => getTreeOption(option, level, currentLevel));
};

export const flatTreeOptions = <O extends TreeOption>(options: O[]): O[] =>
  options.flatMap((option) => {
    if (option.children) return [option, ...flatTreeOptions(option.children as O[])];
    return [option];
  });

export const createEmptyOption = <V = typeof deafultEmptyOption.value>(attrs: Partial<Option<V>> = {}) => ({
  ...deafultEmptyOption,
  ...attrs,
});
