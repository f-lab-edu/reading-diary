import styles from './ListBooks.module.scss';
import { MouseEvent, useState } from 'react';

import DimmedButton from './DimmedButton';

export type BookListTypes = {
  isbn: string;
  id?: string;
  authors: string[];
  publisher: string;
  thumbnail: string;
  title: string;
};

interface ListBooksProps {
  bookList: BookListTypes[];
  bookDetailHandler(e: MouseEvent<HTMLButtonElement>): void;
}

const ListBooks = ({ bookList, bookDetailHandler }: ListBooksProps) => {
  const [currentId, setCurrentId] = useState<string>('');

  const mouseEnter = (e: MouseEvent<HTMLElement>) => {
    const { currentTarget } = e;

    if (!currentTarget?.dataset?.id) return;

    setCurrentId(currentTarget.dataset.id);
  };

  const mouseLeave = () => {
    setCurrentId('');
  };

  return (
    <ul className={styles['book-list']}>
      {bookList.map((book: BookListTypes) => {
        const { isbn, id, authors, publisher, thumbnail, title } = book;
        const idOrIsbn = id ? id : isbn;

        return (
          <li
            key={idOrIsbn}
            data-id={idOrIsbn}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}>
            <div className={styles['book-list-inner']}>
              <img
                src={thumbnail}
                alt={title}
                className={styles['book-list-thumbnail']}
              />
              <dl className={styles['book-list-item']}>
                <div className={styles['book-list-item-box']}>
                  <dt>책제목</dt>
                  <dd>{title}</dd>
                </div>
                <div className={styles['book-list-item-box']}>
                  <dt>저자</dt>
                  <dd>{authors.join(', ')}</dd>
                </div>
                <div className={styles['book-list-item-box']}>
                  <dt>출판사</dt>
                  <dd>{publisher}</dd>
                </div>
              </dl>
              {currentId === idOrIsbn && (
                <DimmedButton buttonHandler={bookDetailHandler} id={idOrIsbn} />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListBooks;
