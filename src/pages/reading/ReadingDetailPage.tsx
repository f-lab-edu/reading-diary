import styles from './ReadingDetailPage.module.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ROOT } from 'routes/route';

import { Viewer } from '@toast-ui/react-editor';

import { useIDb, MyReadingsValue } from 'hooks/useIDb';

const ReadingDetailPage = () => {
  const params = useParams();
  const { db, isLoading, getMyReading } = useIDb();
  const [myReading, setMyReading] = useState<MyReadingsValue | null>(null);

  useEffect(() => {
    const { id } = params;

    if (!isLoading && db) {
      getMyReading(Number(id)).then((data) => {
        setMyReading(data);
      });
    }
  }, [db]);

  return (
    <>
      {myReading && (
        <section className={styles['reading']}>
          <h3>책 제목: {myReading.bookInfo.title}</h3>
          {!!myReading.tags.length && (
            <section className={styles['reading-content']}>
              <h4>Tags</h4>

              <ul className={styles['reading-tags']}>
                {myReading.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </section>
          )}
          <section className={styles['reading-content']}>
            <h4>소감</h4>
            <Viewer initialValue={myReading.myReviews} />
          </section>
          <div className={styles['reading-modify']}>
            <NavLink
              to={`${ROOT.READING}/${params.id}/edit`}
              className={styles['reading-modify-link']}>
              수정하러 가기
            </NavLink>
          </div>
        </section>
      )}
    </>
  );
};

export default ReadingDetailPage;
