import styles from '../../../pages/new/NewPage.module.scss';
import ToastEditor from '../../common/ToastEditor';
import BtnCommon from '../../common/Buttons/BtnCommon';

import { BookListTypes } from 'components/common/list/ListBooks';
import { FC, Ref } from 'react';
import { Editor } from '@toast-ui/react-editor';

interface WriteReadingProps {
  bookItem: BookListTypes;
  editorRef: Ref<Editor>;
  sendHandler(): void;
}

const WriteReading: FC<WriteReadingProps> = ({
  bookItem,
  editorRef,
  sendHandler,
}) => {
  return (
    <>
      <section className={styles['section-book']}>
        <div className={styles['section-book-inner']}>
          <div className={styles['box-thumbnail']}>
            <img src={bookItem.thumbnail} alt={`${bookItem.title} 책 표지`} />
          </div>

          <dl className={styles['book-info']}>
            <div className={styles['book-info-item']}>
              <dt>작가:</dt>
              <dd>{bookItem.authors.join(', ')}</dd>
            </div>
            <div className={styles['book-info-item']}>
              <dt>제목:</dt>
              <dd>{bookItem.title}</dd>
            </div>
            <div className={styles['book-info-item']}>
              <dt>출판사:</dt>
              <dd>{bookItem.publisher}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className={styles['section-edit']}>
        <h3>Tags</h3>
        <div className={styles['tag-box']}>
          <input
            type="text"
            placeholder="',' 또는 enter입력해서 tag를 입력해 주세요."
            className={styles['tf-tags']}
          />
        </div>

        <div></div>
      </section>
      <section className={styles['section-edit']}>
        <h3>기록 남기기</h3>
        <div className={styles['edit-box']}>
          <ToastEditor
            editorRef={editorRef}
            initValue="### 읽고 기억하고 싶은걸 써보자!"
          />
        </div>
        <div className={styles['edit-group-btn']}>
          <BtnCommon
            type="button"
            clickHandler={sendHandler}
            bgType="primary"
            size="medium">
            저장하기
          </BtnCommon>
        </div>
      </section>
    </>
  );
};

export default WriteReading;
