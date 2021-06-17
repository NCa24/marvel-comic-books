import React from 'react';
import cx from 'classnames';

import './index.css';

type HeroCardProps = {
    active?: boolean,
	title: string,
	backgroundPath: string,
}

export default function HeroCard({ active, title, backgroundPath }: HeroCardProps): React.ReactElement {
	return (
		<div className={cx("hero-card", {
			'hero-card--active': active
		})}>
			<img alt={title} src={backgroundPath}/>
			<div className="hero-card__label">
				{title}
			</div>
		</div>
	);
}