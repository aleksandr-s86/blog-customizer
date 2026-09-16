import { useState, useRef, useEffect } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { clsx } from 'clsx';

import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';

interface ArticleParamsFormProps {
	setArticleStyleState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	setArticleStyleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [inputArticleStyleState, setInputArticleStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isMenuOpen]);

	const submitForm = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleStyleState(inputArticleStyleState);
		setIsMenuOpen(false);
	};

	const resetForm = () => {
		setInputArticleStyleState(defaultArticleState);
		setArticleStyleState(defaultArticleState);
		setIsMenuOpen(false);
	};

	const setOption =
		(optionName: keyof ArticleStateType) =>
		(selected: OptionType): void => {
			setInputArticleStyleState((prev) => ({
				...prev,
				[optionName]: selected,
			}));
		};

	return (
		<div ref={containerRef}>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={submitForm}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={inputArticleStyleState.fontFamilyOption}
						onChange={setOption('fontFamilyOption')}
					/>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={inputArticleStyleState.fontSizeOption}
						onChange={setOption('fontSizeOption')}
						title='Размер шрифта'
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={inputArticleStyleState.fontColor}
						onChange={setOption('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={inputArticleStyleState.backgroundColor}
						onChange={setOption('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={inputArticleStyleState.contentWidth}
						onChange={setOption('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='clear'
							onClick={resetForm}
							htmlType='reset'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
