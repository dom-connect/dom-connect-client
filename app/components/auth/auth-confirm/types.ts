export interface IEmits {
  (e: "onBack" | "onResend"): void;
}

export interface IProps {
  errorMessage: string;
}
