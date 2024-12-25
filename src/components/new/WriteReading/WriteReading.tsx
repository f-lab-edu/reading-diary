import styles from './WriteReading.module.scss';

import {
  MouseEvent,
  KeyboardEvent,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Editor } from '@toast-ui/react-editor';
import ToastEditor from 'components/common/ToastEditor';
import InputTypeCommon from 'components/common/textField/InputTypeCommon';
import BtnCommon from 'components/common/Buttons/BtnCommon';
import Tag from './Tag';

import useBookInfoStore from 'store/useBookInfo';
import useBookTagStore from 'store/useBookTag';
import useInputTypeCommon from 'hooks/useInputTypeCommon';
import { useIndexedDB } from 'hooks/useIDBMyReadings';

import { ROOT } from 'routes/route';

const WriteReading = () => {
  const editRef = useRef<Editor>(null);
  const [dbCount, setDbCount] = useState<number>(0);

  const navigate = useNavigate();

  const bookInfo = useBookInfoStore((state) => state.bookInfo);
  const tagList = useBookTagStore((state) => state.tagList);
  const updateTag = useBookTagStore((state) => state.updateBookTag);
  const removeTag = useBookTagStore((state) => state.removeBookTag);
  const resetBookTag = useBookTagStore((state) => state.resetBookTag);

  const { value, onChange, onReset } = useInputTypeCommon('');
  const { putMyReadings, isLoading, getCount, db } = useIndexedDB();

  const onTagInsert = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    switch (key) {
      case ',':
      case ' ':
        break;

      case 'Enter':
        const tempTagList = useBookTagStore.getState();

        if (tempTagList.tagList.includes(`#${value}`)) {
          onReset();
          return;
        }

        updateTag(`#${value}`);
        onReset();
        break;
    }
  };

  const onTagDelete = (e: MouseEvent<HTMLButtonElement>) => {
    const deleteTag = e.currentTarget.dataset.tag;

    if (!deleteTag) return;

    removeTag(deleteTag);
  };

  const sendReading = useCallback(async () => {
    if (!editRef?.current) return;

    const myRecord = editRef.current.getInstance().getMarkdown();

    putMyReadings({
      id: dbCount + 1,
      bookInfo,
      tags: tagList,
      myReviews: myRecord,
    }).then(() => {
      resetBookTag();
      navigate(ROOT.MAIN);
    });
  }, [dbCount, bookInfo, putMyReadings, resetBookTag, tagList, navigate]);

  useEffect(() => {
    if (!isLoading && db) {
      (async () => {
        const dbCount = await getCount();
        setDbCount(dbCount);
      })();
    }
  }, [isLoading, getCount, db]);

  return (
    <>
      <section className={styles['section-book']}>
        <div className={styles['section-book-inner']}>
          <div className={styles['box-thumbnail']}>
            <img src={bookInfo.thumbnail} alt={`${bookInfo.title} 책 표지`} />
          </div>

          <dl className={styles['book-info']}>
            <div className={styles['book-info-item']}>
              <dt>작가:</dt>
              <dd>{bookInfo.authors.join(', ')}</dd>
            </div>
            <div className={styles['book-info-item']}>
              <dt>제목:</dt>
              <dd>{bookInfo.title}</dd>
            </div>
            <div className={styles['book-info-item']}>
              <dt>출판사:</dt>
              <dd>{bookInfo.publisher}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className={styles['section-edit']}>
        <h3>Tags</h3>
        <InputTypeCommon
          placeholder="enter를 눌러 tag를 입력해 주세요."
          value={value}
          changeHandler={onChange}
          resetHandler={onReset}
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
            editorRef={editRef}
            initValue="### 읽고 기억하고 싶은걸 써보자!"
          />
        </div>
        <div className={styles['edit-group-btn']}>
          <BtnCommon
            type="button"
            clickHandler={sendReading}
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
