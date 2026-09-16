/*import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';


import styles from './ArticleParamsForm.module.scss';
import {
  OptionType,
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions
} from 'src/constants/articleProps';


interface ArticleParamsFormProps {
  initialSettings: {
    fontFamilyOption: OptionType;
    fontColor: OptionType;
    backgroundColor: OptionType;
    contentWidth: OptionType;
    fontSizeOption: OptionType;
  };
  onApply: (newSettings: typeof initialSettings) => void;
  onReset: () => void;
}

export const ArticleParamsForm = ({
  initialSettings,
  onApply,
  onReset
}: ArticleParamsFormProps) => {
  const [formSettings, setFormSettings] = useState(initialSettings);

  const handleSettingChange = <K extends keyof typeof formSettings>(
    key: K,
    value: string
  ) => {
    setFormSettings(prev => {
      let newOption: OptionType | undefined;

      // Определяем, в каком массиве искать опцию, исходя из ключа
      switch (key) {
        case 'fontFamilyOption':
          newOption = fontFamilyOptions.find(opt => opt.value === value);
          break;
        case 'fontColor':
          newOption = fontColors.find(opt => opt.value === value);
          break;
        case 'backgroundColor':
          newOption = backgroundColors.find(opt => opt.value === value);
          break;
        case 'contentWidth':
          newOption = contentWidthArr.find(opt => opt.value === value);
          break;
        case 'fontSizeOption':
          newOption = fontSizeOptions.find(opt => opt.value === value);
          break;
        default:
          newOption = undefined;
      }

      // Если опция не найдена (например, пользователь выбрал цвет через picker), создаём временную
      if (!newOption) {
        newOption = {
          title: 'Custom',
          value: value,
          className: 'custom-option'
        };
      }

      return {
        ...prev,
        [key]: newOption
      };
    });
  };

  const handleReset = () => {
    setFormSettings(initialSettings);
    onReset();
  };

  const handleApply = () => {
    onApply(formSettings);
  };

  return (
    <>
      <ArrowButton
        isOpen={false}
        onClick={() => {}}
      />
      <aside className={styles.container}>
        <form
          className={styles.form}
          onSubmit={(e) => { e.preventDefault(); handleApply(); }}
        >
          <div className={styles.settingsGroup}>
            <label className={styles.label}>Шрифт</label>
            <select
              value={formSettings.fontFamilyOption.value}
              onChange={(e) => handleSettingChange('fontFamilyOption', e.target.value)}
              className={styles.select}
            >
              {fontFamilyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.settingsGroup}>
            <label className={styles.label}>Размер шрифта</label>
            <div className={styles.radioGroup}>
              {fontSizeOptions.map(size => (
                <label key={size.value} className={styles.radioLabel}>
                  <input
                    type="radio"
            name="fontSize"
            checked={formSettings.fontSizeOption.value === size.value}
            onChange={() => handleSettingChange('fontSizeOption', size.value)}
          />
          <span>{size.title}</span>
        </label>
      ))}
    </div>
  </div>

  <div className={styles.settingsGroup}>
    <label className={styles.label}>Цвет текста</label>
    <input
      type="color"
      value={formSettings.fontColor.value}
      onChange={(e) => handleSettingChange('fontColor', e.target.value)}
      className={styles.colorPicker}
    />
  </div>

  <div className={styles.settingsGroup}>
    <label className={styles.label}>Фон страницы</label>
    <input
      type="color"
      value={formSettings.backgroundColor.value}
      onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
      className={styles.colorPicker}
    />
  </div>

  <div className={styles.settingsGroup}>
    <label className={styles.label}>Ширина контента</label>
    <div className={styles.radioGroup}>
      {contentWidthArr.map(width => (
        <label key={width.value} className={styles.radioLabel}>
          <input
            type="radio"
            name="contentWidth"
            checked={formSettings.contentWidth.value === width.value}
            onChange={() => handleSettingChange('contentWidth', width.value)}
          />
          <span>{width.title}</span>
        </label>
      ))}
    </div>
  </div>

  <div className={styles.bottomContainer}>
    <Button
      title="Сбросить"
      htmlType="button"
      type="clear"
      onClick={handleReset}
    />
    <Button
      title="Применить"
      htmlType="submit"
      type="apply"
    />
  </div>
</form>
</aside>
</>
  );
};*/
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
