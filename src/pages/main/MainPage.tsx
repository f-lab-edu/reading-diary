import { useEffect, useState } from 'react';
import { useIndexedDB } from 'hooks/useIDBMyReadings';
import { MyReadingsValue } from 'hooks/useIDBMyReadings';
import Empty from 'components/main/Empty';
import ReadingList from 'components/main/ReadingList';

const MainPage = () => {
  const { getMyReadingList, db, isLoading } = useIndexedDB();
  const [readingList, setReadingList] = useState<MyReadingsValue[]>([]);

  useEffect(() => {
    if (!isLoading && db) {
      (async () => {
        const dbList = await getMyReadingList();

        setReadingList(dbList);
      })();
    }
  }, [db, isLoading, getMyReadingList]);

  return (
    <section style={{ height: '100%' }}>
      <h2>My Reading List</h2>
      {readingList.length > 0 ? <ReadingList data={readingList} /> : <Empty />}
    </section>
  );
};

export default MainPage;
