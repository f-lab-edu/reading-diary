import commonIcon from 'assets/icons/common.svg';
import { CSSProperties, FC } from 'react';

type iconName = 'cancel' | 'search' | 'book' | 'add';

interface IconCommonProps {
  name: iconName;
  className?: string;
  style?: CSSProperties;
}

const IconCommon: FC<IconCommonProps> = ({ name, className, style }) => {
  return (
    <svg width="24" height="24" className={className} style={style}>
      <use href={`${commonIcon}#${name}`} />
    </svg>
  );
};

export default IconCommon;
