import React, { useEffect, useState } from 'react';

import './index.css';

import heartOff from '../../images/heart_off.png';
import heartOn from '../../images/heart_on.png';

type FavouriteProps = {
	active: boolean,
	onClick: (() => void) | undefined,
}

export default function Favourite({ active, onClick }: FavouriteProps): React.ReactElement {
	const [favouriteState, setFavouriteState] = useState(active ? heartOn : heartOff)

	useEffect(() => {
		setFavouriteState(active ? heartOn : heartOff);
	}, [active])

	return (
		<div className="favourite" style={{ background: `url(${favouriteState})` }} role="button" onClick={onClick}></div>
	);
}