import styles from './Tag.module.scss';
import IconCommon from 'components/icons/IconCommon';
import { FC, MouseEvent } from 'react';

interface TagProps {
  tagItem: string;
  tagDeleteHandler(e: MouseEvent<HTMLButtonElement>): void;
}

const Tag: FC<TagProps> = ({ tagItem, tagDeleteHandler }) => {
  return (
    <div key={tagItem} className={styles['tag-item']}>
      {tagItem}
      <button
        type="button"
        className={styles['tag-item-btn-delete']}
        data-tag={tagItem}
        onClick={tagDeleteHandler}>
        <IconCommon name="cancel" className={styles['tag-item-icon-delete']} />
      </button>
    </div>
  );
};

export default Tag;
