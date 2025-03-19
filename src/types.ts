export type ButtonProps = {
  className: string;
  children: any;
  value: string;
  props: any;
};

export type InputProps = {
  className: string;
  children: any;
  placeholder: string;
  value: string;
  props: any;
};

export type SelectProps = {
  className: string;
  children: any;
  placeholder: string;
  value: string;
  props: any;
};

export type Rule = {
  value_type: string;
  id: string;
  name: string;
  type: string;
  operators: Array<string>;
  value: [] | string | { min: number; max: number };
  operator: string;
  priority: number;
  multi_select_options?: Array<string>;
};

export type Group = {
  id: number;
  rule: Rule;
  priority: number;
};
