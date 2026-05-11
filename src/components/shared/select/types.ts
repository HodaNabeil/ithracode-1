export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  contentClassName?: string;
  width?: string;
  dir?: 'rtl' | 'ltr';
  disabled?: boolean;
  resetKey?: number;
}
