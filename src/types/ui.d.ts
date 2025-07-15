export interface SelectContext {
  value: any;
  open: boolean;
  triggerRef: HTMLElement | null;
  toggle: () => void;
  close: () => void;
  select: (value: any) => void;
}

export interface TabsContext {
  value: any;
}
