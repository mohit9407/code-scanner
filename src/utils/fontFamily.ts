// import { fontFamilies } from '../constants/ui/fonts';

import { fontFamilies } from '../constants/fonts';

export const getFontFamily = (
  isLTR: boolean,
  weight: 'normal' | 'medium' | 'bold',
) => {
  const selectedFontFamily = fontFamilies.HUNINN;
  return selectedFontFamily[weight];
};
