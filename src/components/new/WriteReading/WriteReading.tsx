import styles from './WriteReading.module.scss';

import { ChangeEvent, MouseEvent, FC, KeyboardEvent, Ref } from 'react';

import { Editor } from '@toast-ui/react-editor';
import ToastEditor from 'components/common/ToastEditor';
import InputTypeCommon from 'components/common/textField/InputTypeCommon';
import BtnCommon from 'components/common/Buttons/BtnCommon';
import Tag from './Tag';

import { BookListTypes } from 'components/common/list/ListBooks';

interface WriteReadingProps {
  bookItem: BookListTypes;
  editorRef: Ref<Editor>;
  tagData: string[];
  tagText: string;
  tagTextResetHandler(): void;
  tagTextChangeHandler(e: ChangeEvent<HTMLInputElement>): void;
  tagInsert(e: KeyboardEvent<HTMLInputElement>): void;
  tagDeleteHandler(e: MouseEvent<HTMLButtonElement>): void;
  sendHandler(): void;
}

const WriteReading: FC<WriteReadingProps> = ({
  bookItem,
  editorRef,
  tagData,
  tagText,
  tagTextResetHandler,
  tagTextChangeHandler,
  tagInsert,
  tagDeleteHandler,
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
        <InputTypeCommon
          placeholder="enter입력해서 tag를 입력해 주세요."
          keyword={tagText}
          keywordHandler={tagTextChangeHandler}
          resetHandler={tagTextResetHandler}
          keyUpHandler={tagInsert}
          className={styles['tag-tf']}
        />
        {!!tagData.length && (
          <div className={styles['tag-area']}>
            {tagData.map((item) => {
              return (
                <Tag
                  key={item}
                  tagItem={item}
                  tagDeleteHandler={tagDeleteHandler}
                />
              );
            })}
          </div>
        )}
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
