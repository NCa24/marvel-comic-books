import React, { useCallback, useEffect, useState } from 'react';

import './index.css';

import HeroCard from '../../components/HeroCard';

import MarvelService from '../../services/marvel/index';
import { ComicBook } from '../../services/marvel/model';

const Home = (): React.ReactElement => {
  const [comicBooks, setComicBooks] = useState([] as ComicBook[]);
  const [loading, setLoading] = useState(false);

  const fetchComicBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await MarvelService.getComics(comicBooks.length);
      setComicBooks([...comicBooks, ...res.results])
      setLoading(false);
    }
    catch(err) {
      setLoading(false);
      return comicBooks;
    }
  }, [comicBooks]);
  

  useEffect(() => {
    fetchComicBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="hero-cards-container">
        {comicBooks.map((item, index) => (
          <div key={`${item.title} ${index}`} className="hero-card-container">
            <HeroCard title={item.title} backgroundPath={`${item.images[0].path}.${item.images[0].extension}`} />
          </div>
        ))}
        <button onClick={fetchComicBooks}>fetch more</button>
      </div>
      {loading ? <div className="home-loading">loading more content</div> : null}
    </div>
  );
};

export default Home;
