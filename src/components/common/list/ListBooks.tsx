import styles from './ListBooks.module.scss';
import IconCommon from 'components/icons/IconCommon';

type BookListTypes = {
  isbn: string;
  authors: string[];
  publisher: string;
  thumbnail: string;
  title: string;
};

interface ListBooksProps {
  bookList: BookListTypes[];
}

const ListBooks = ({ bookList }: ListBooksProps) => {
  return (
    <ul className={styles['book-list']}>
      {bookList.map((book: any) => {
        const { isbn, authors, publisher, thumbnail, title } = book;
        return (
          <li key={isbn}>
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
              <div className={styles['book-list-dimmed']}>
                <button type="button" className={styles['book-list-btn']}>
                  <IconCommon
                    name="book"
                    className={styles['book-list-btn-icon']}
                  />
                  선택하기
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListBooks;
