import { useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [articleStyleState, setArticleStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyleState.fontFamilyOption.value,
					'--font-size': articleStyleState.fontSizeOption.value,
					'--font-color': articleStyleState.fontColor.value,
					'--container-width': articleStyleState.contentWidth.value,
					'--bg-color': articleStyleState.backgroundColor.value,
				} as React.CSSProperties
			}>
			<ArticleParamsForm setArticleStyleState={setArticleStyleState} />
			<Article />
		</main>
	);
};
