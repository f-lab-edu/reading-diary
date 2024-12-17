// import styles from '../../../pages/new/NewPage.module.scss';

import styles from './WriteReading.module.scss';

import ToastEditor from 'components/common/ToastEditor';
import TfComm from 'components/common/textField/TfComm';
import BtnCommon from 'components/common/Buttons/BtnCommon';
import IconCommon from 'components/icons/IconCommon';

import { BookListTypes } from 'components/common/list/ListBooks';
import {
  ChangeEvent,
  MouseEvent,
  FC,
  KeyboardEvent,
  Ref,
  useState,
} from 'react';
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
  const [tags, setTag] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const tagList = tags;

    switch (key) {
      case ',':
      case ' ':
        setValue('');
        break;

      case 'Enter':
        if (tagList.includes(`#${value}`)) {
          setValue('');

          return;
        }

        tagList.push(`#${value}`);
        setTag(tagList);
        setValue('');
        break;
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const deleteTag = (e: MouseEvent<HTMLButtonElement>) => {
    const deleteTag = e.currentTarget.dataset.tag;

    setTag(tags.filter((item) => deleteTag !== item));
  };

  const onReset = () => {
    setValue('');
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
        <TfComm
          placeholder="enter입력해서 tag를 입력해 주세요."
          keyword={value}
          keywordHandler={onChange}
          resetHandler={onReset}
          keyUpHandler={onKeyDown}
          className={styles['tag-tf']}
        />
        {!!tags.length && (
          <div className={styles['tag']}>
            {tags.map((item) => {
              return (
                <div key={item} className={styles['tag-item']}>
                  {item}
                  <button
                    type="button"
                    className={styles['tag-btn-delete']}
                    data-tag={item}
                    onClick={deleteTag}>
                    <IconCommon
                      name="cancel"
                      className={styles['tag-icon-delete']}
                    />
                  </button>
                </div>
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
