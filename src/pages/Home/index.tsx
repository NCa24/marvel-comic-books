import React, { useCallback, useEffect, useState } from 'react';

import './index.css';

import HeroCard from '../../components/HeroCard';

import MarvelService from '../../services/marvel/index';
import { ComicBook } from '../../services/marvel/model';
import SearchHero from '../../components/SearchHero';
import { getFromLocalStorage, setInLocalStorage } from '../../utils/localStorageHelpers';

const LOCAL_STORAGE_SELECTED_KEY = "selectedComicBooks";

const Home = (): React.ReactElement => {
  const [comicBooks, setComicBooks] = useState([] as ComicBook[]);
  const [filteredComicBooks, setFilteredComicBooks] = useState([] as ComicBook[]);
  const [selectedComicBooks, setSelectedComicBooks] = useState([] as string[]);
  const [valueToFilter, setValueToFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const saveNewComicBook = useCallback((title: string) => {
    let updatedSelectedComicBooks;
    if (selectedComicBooks.includes(title)) {
      updatedSelectedComicBooks = selectedComicBooks.filter(item => item !== title)
    } else {
      updatedSelectedComicBooks = [...selectedComicBooks, title]
    }
    setInLocalStorage(LOCAL_STORAGE_SELECTED_KEY, updatedSelectedComicBooks)
    setSelectedComicBooks(updatedSelectedComicBooks);
  }, [selectedComicBooks])

  const onSearchChange = useCallback((newValue: string) => {
    setValueToFilter(newValue);
  }, [])

  useEffect(() => {
    if (!valueToFilter) {
      setFilteredComicBooks(comicBooks);
      return;
    }
    const filteredComicBooks = comicBooks.filter(comicBook => {
      const comicBookCharacters = comicBook.characters.items.map(item => item.name.toLowerCase())
      return !!comicBookCharacters.filter(char => char.includes(valueToFilter.toLowerCase())).length;
    });
    setFilteredComicBooks(filteredComicBooks);
  }, [valueToFilter, comicBooks])

  const fetchComicBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await MarvelService.getComics(comicBooks.length);
      setComicBooks([...comicBooks, ...res.results])
      setLoading(false);
    }
    catch (err) {
      setLoading(false);
      return comicBooks;
    }
  }, [comicBooks]);


  useEffect(() => {
    fetchComicBooks();
    setSelectedComicBooks(getFromLocalStorage(LOCAL_STORAGE_SELECTED_KEY) || [] as ComicBook[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <section className="home__search-area">
        <SearchHero onChange={onSearchChange} />
      </section>
      <section className="home__display-area">
        <div className="hero-cards-container">
          {filteredComicBooks.map((item, index) => (
            <div key={`${item.title} ${index}`} className="hero-card-container">
              <HeroCard title={item.title} backgroundPath={`${item.images[0]?.path}.${item.images?.[0]?.extension}`} active={selectedComicBooks.includes(item.title + item.id)} onClick={() => saveNewComicBook(item.title + item.id)} />
            </div>
          ))}
        </div>
        <div className="home__pagination">
          <button className="home__pagination__button">Previous Page</button>
          <button className="home__pagination__button">Next Page</button>
        </div>
        {loading ? <div className="home-loading">loading more content</div> : null}
      </section>
    </div>
  );
};

export default Home;
