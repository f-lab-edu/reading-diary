import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useIDb, MyReadingsValue } from 'hooks/useIDb';
import InputTypeCommon from 'components/common/textField/InputTypeCommon';
import styles from 'components/new/WriteReading/WriteReading.module.scss';
import Tag from 'components/new/WriteReading/Tag';
import useInputTypeCommon from 'hooks/useInputTypeCommon';
import ToastEditor from 'components/common/ToastEditor';
import BtnCommon from 'components/common/Buttons/BtnCommon';
import { Editor } from '@toast-ui/react-editor';
import { ROOT } from 'routes/route';

const ReadingEditPage = () => {
  const params = useParams();
  const editRef = useRef<Editor>(null);
  const { db, isLoading, getMyReading, putMyReadings } = useIDb();
  const [myReading, setMyReading] = useState<MyReadingsValue | null>(null);
  const { value, onChange, onReset } = useInputTypeCommon('');
  const [tagList, setTagList] = useState<string[]>([]);
  const navigate = useNavigate();

  const onTagInsert = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    switch (key) {
      case ',':
      case ' ':
        break;

      case 'Enter':
        if (tagList.includes(`#${value}`)) {
          onReset();
          return;
        }

        setTagList([`#${value}`, ...tagList]);
        onReset();
        break;
    }
  };

  const onTagDelete = (e: MouseEvent<HTMLButtonElement>) => {
    const deleteTag = e.currentTarget.dataset.tag;
    const deletedTagList = tagList.filter((tagItem) => tagItem !== deleteTag);

    if (!deleteTag) return;

    setTagList(deletedTagList);
  };

  const edit = () => {
    if (!myReading || !editRef?.current) return;

    const { id } = params;
    const { bookInfo } = myReading;
    const myRecord = editRef.current.getInstance().getMarkdown();

    putMyReadings({
      id: Number(id),
      bookInfo,
      tags: tagList,
      myReviews: myRecord,
    }).then(() => {
      navigate(ROOT.MAIN);
    });
  };

  useEffect(() => {
    const { id } = params;

    if (!isLoading && db) {
      getMyReading(Number(id)).then((data) => {
        setMyReading(data);
        setTagList(data.tags);
      });
    }
  }, [params, db]);

  return (
    <>
      {myReading && (
        <section>
          <h3>책 제목: {myReading.bookInfo.title}</h3>

          <section>
            <h4>Tags</h4>
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
                    <Tag
                      key={item}
                      tagItem={item}
                      tagDeleteHandler={onTagDelete}
                    />
                  );
                })}
              </div>
            )}
          </section>
          <section className={styles['section-edit']}>
            <h4>기록 남기기</h4>
            <div className={styles['edit-box']}>
              <ToastEditor
                editorRef={editRef}
                initValue={myReading.myReviews}
              />
            </div>
            <div className={styles['edit-group-btn']}>
              <BtnCommon
                type="button"
                clickHandler={edit}
                bgType="primary"
                size="medium">
                변경 저장하기
              </BtnCommon>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ReadingEditPage;
