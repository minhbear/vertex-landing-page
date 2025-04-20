import { AppConstant } from '@/const';

export const formatNumber = (
  numberValue?: number,
  maximumFractionDigits = 3,
  fallbackLabel = AppConstant.NOT_HAVE_VALUE_LABEL,
  localeOption = {},
  minimumFractionDigits = 0,
) => {
  try {
    if (!numberValue && numberValue !== 0) return fallbackLabel;
    const num = Number(numberValue);
    return num.toLocaleString('en-US', {
      maximumFractionDigits,
      minimumFractionDigits,
      ...localeOption,
    });
  } catch (error) {
    return String(numberValue);
  }
};
