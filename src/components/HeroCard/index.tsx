import React from 'react';
import cx from 'classnames';

import './index.css';

import Favourite from '../Favourite/index';

type HeroCardProps = {
    active?: boolean,
	title: string,
	backgroundPath: string,
	onClick?: () => void,
}

export default function HeroCard({ active, title, backgroundPath, onClick }: HeroCardProps): React.ReactElement {
	return (
		<div className={cx("hero-card", {
			'hero-card--active': active
		})}>
			<img alt={title} src={backgroundPath}/>
			<div className="hero-card__label">
				{title}
			</div>
			<div className="hero-card__favourite-container">
				<Favourite active={active || false} onClick={onClick}/>
			</div>
		</div>
	);
}