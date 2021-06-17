import React, { useCallback, useMemo } from 'react';
import './index.css';
import marvelLogo from '../../images/marvel_logo.png';
import { debounce } from 'lodash';

type SearchHeroProps = {
	onChange?: (newValue: string) => void;
}

export default function SearchHero( { onChange }: SearchHeroProps ): React.ReactElement {
	const onChangeHandler = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(ev.target.value);
	}, [onChange]);

	const debouncedChangeHandler = useMemo(
		() => debounce(onChangeHandler, 500)
	  , [onChangeHandler]);

	return (
		<div className="search-hero-container">
			<div>
				<img alt="marvel_logo" src={marvelLogo}/>
			</div>
			<input aria-label="search-hero-input" className="search-hero__input" placeholder="deadpool" onChange={debouncedChangeHandler}/>
		</div>
	);
}