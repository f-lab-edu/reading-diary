import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROOT } from 'routes/route';

import { MyReadingsValue } from 'hooks/useIDb';
import { BookListTypes } from 'components/common/list/ListBooks';

import ListBooks from 'components/common/list/ListBooks';

const ReadingList = ({ data }: { data: MyReadingsValue[] }) => {
  const [bookListData, setBookListData] = useState<BookListTypes[]>([]);
  const navigate = useNavigate();

  const handler = (e: MouseEvent<HTMLElement>) => {
    const { currentTarget } = e;

    if (!currentTarget?.dataset?.id) return;

    navigate(`${ROOT.READING}/${currentTarget.dataset.id}`);
  };

  useEffect(() => {
    const listData = data.map((item) => {
      const { id, bookInfo } = item;

      return { id: id.toString(), ...bookInfo };
    });

    setBookListData(listData);
  }, [data]);

  return (
    <ListBooks bookList={bookListData} bookDetailHandler={(e) => handler(e)} />
  );
};

export default ReadingList;
