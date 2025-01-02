import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useIDb, MyReadingsValue } from 'hooks/useIDb';

const ReadingEditPage = () => {
  const params = useParams();
  const { db, isLoading, getMyReading } = useIDb();
  const [myReading, setMyReading] = useState<MyReadingsValue | null>(null);

  useEffect(() => {
    const { id } = params;
    if (!isLoading && db) {
      getMyReading(Number(id)).then((data) => {
        console.log(data);
        setMyReading(data);
      });
    }
    console.log(params);
  }, [params, db]);

  return (
    <>
      {myReading && (
        <section>
          <h3>책 제목: {myReading.bookInfo.title}</h3>
        </section>
      )}
    </>
  );
};

export default ReadingEditPage;
