import styles from './WriteReading.module.scss';

import {
  ChangeEvent,
  MouseEvent,
  FC,
  KeyboardEvent,
  Ref,
  useState,
} from 'react';

import { Editor } from '@toast-ui/react-editor';
import ToastEditor from 'components/common/ToastEditor';
import InputTypeCommon from 'components/common/textField/InputTypeCommon';
import BtnCommon from 'components/common/Buttons/BtnCommon';
import Tag from './Tag';

import { BookListTypes } from 'components/common/list/ListBooks';

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
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagText, setTagText] = useState<string>('');

  const onTagInsert = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const tagData = tagList;

    switch (key) {
      case ',':
      case ' ':
        setTagText('');
        break;

      case 'Enter':
        if (tagList.includes(`#${tagText}`)) {
          setTagText('');

          return;
        }

        console.log('work');

        tagData.push(`#${tagText}`);
        setTagList(tagData);
        setTagText('');
        break;
    }
  };

  const onTagDelete = (e: MouseEvent<HTMLButtonElement>) => {
    const deleteTag = e.currentTarget.dataset.tag;

    setTagList(tagList.filter((item) => deleteTag !== item));
  };

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
          keyUpHandler={onTagInsert}
          className={styles['tag-tf']}
        />
        {!!tagList.length && (
          <div className={styles['tag-area']}>
            {tagList.map((item) => {
              return (
                <Tag key={item} tagItem={item} tagDeleteHandler={onTagDelete} />
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
