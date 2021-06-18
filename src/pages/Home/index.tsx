/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import './index.css';

import HeroCard from '../../components/HeroCard';

import MarvelService from '../../services/marvel/index';
import { ComicBook } from '../../services/marvel/model';
import SearchHero from '../../components/SearchHero';
import { getFromLocalStorage, setInLocalStorage } from '../../utils/localStorageHelpers';

const LOCAL_STORAGE_SELECTED_KEY = "selectedComicBooks";

const Home = (): React.ReactElement => {
  const [page, setPage] = useState(0);
  const [comicBooks, setComicBooks] = useState([] as ComicBook[]);
  const [filteredComicBooks, setFilteredComicBooks] = useState([] as ComicBook[]);
  const [selectedComicBooks, setSelectedComicBooks] = useState([] as string[]);
  const [valueToFilter, setValueToFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const res = await MarvelService.getComics(page * 20);
      setComicBooks([...comicBooks, ...res.results])
      setIsLoading(false);
    }
    catch (err) {
      setIsLoading(false);
      return comicBooks;
    }
  }, [comicBooks, page]);

  useEffect(() => {
    if ((page + 1) * 20 <= comicBooks.length || page === 0) {
      return;
    }
    fetchComicBooks();
  }, [page])

  useEffect(() => {
    fetchComicBooks();
    setSelectedComicBooks(getFromLocalStorage(LOCAL_STORAGE_SELECTED_KEY) || [] as ComicBook[])
  }, []);

  const isSearching = !!valueToFilter;
  const sliceFrom = isSearching ? 0 : page * 20;
  const sliceEnd = isSearching ? filteredComicBooks.length : (page + 1) * 20;

  return (
    <div>
      <section className="home__search-area">
        <SearchHero onChange={onSearchChange} />
      </section>
      <section className="home__display-area">
        {isLoading ?
          (<div className="hero-cards-container">
            {new Array(20).fill(0).map((item, index) => (
              <div key={`${item} ${index}`} className="hero-card-container">
                <HeroCard title={""} backgroundPath={""} active={false} />
              </div>
            ))}
          </div>) :
          (<div className="hero-cards-container">
            {filteredComicBooks.slice(sliceFrom, sliceEnd).map((item, index) => (
              <div key={`${item.title} ${index}`} className="hero-card-container">
                <HeroCard title={item.title} backgroundPath={`${item.images[0]?.path}.${item.images?.[0]?.extension}`} active={selectedComicBooks.includes(item.title + item.id)} onClick={() => saveNewComicBook(item.title + item.id)} />
              </div>
            ))}
          </div>)}
        {!isSearching ?
          (<div className="home__pagination">
            <button disabled={isLoading} className={cx("home__pagination__button", { 'home__pagination__button--disabled': page === 0 || isLoading })} onClick={() => setPage(page > 0 ? page - 1 : 0)}>Previous Page</button>
            <button disabled={isLoading} className={cx("home__pagination__button", { 'home__pagination__button--disabled': isLoading })} onClick={() => setPage(page + 1)}>Next Page</button>
          </div>) : null
        }
      </section>
    </div>
  );
};

export default Home;
