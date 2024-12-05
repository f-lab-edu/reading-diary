import commonIcon from 'assets/icons/common.svg';
import { CSSProperties, FC } from 'react';

const iconCommon = {
  add: {
    width: 24,
    height: 24,
  },
} as const;

interface IconCommonProps {
  name: keyof typeof iconCommon;
  className?: string;
  style?: CSSProperties;
}

const IconCommon: FC<IconCommonProps> = ({ name, className, style }) => {
  return (
    <svg
      width={iconCommon[name].width}
      height={iconCommon[name].height}
      className={className}
      style={style}>
      <use href={`${commonIcon}#${name}`} />
    </svg>
  );
};

export default IconCommon;
