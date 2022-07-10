const getElement = (tagName, classNames, attrs, content) => {
	const element = document.createElement(tagName);

	if(classNames)
		element.classList.add(...classNames);

	if(attrs){
		for(let attr in attrs){
			element[attr] = attrs[attr];
		}
	}
	if(content)
		element.innerHTML = content;

	return element;
}
const createHeader = (param) => {
	const header = getElement('header'),
		container = getElement('div', ['container']),
		wrapper = getElement('div', ["header"]);

	if(param.logo && param.logo.url){
		const logo = getElement('img', ['logo'], {src: param.logo.url, alt: param.logo.alt});
		wrapper.append(logo)
	}

	if(param.menu){
		const menu = getElement('nav', ['menu-list']),
			allItems = param.menu.map(item => {
				const link = getElement('a', ['menu-link'], {href: item.url, textContent: item.title});
				return link;
			})
		menu.append(...allItems);
		wrapper.append(menu);

		const menuBtn = getElement('button', ['menu-button']);
		menuBtn.addEventListener('click', () => {
			menuBtn.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});
		container.append(menuBtn);
	}

	if(param.social){
		const socialWrapper = getElement('div', ['social']),
			allSocial = param.social.map(item => {
				const socialLink = getElement('a', ['social-link']);
				socialLink.href = item.link;
				socialLink.append(getElement('img', false, {src: item.img, alt: item.title}))
				return socialLink;
			})
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper)
	}

	header.append(container);
	container.append(wrapper);

	return header;
}

const createMain = ({ genre, rating, description, trailer, slider}, title) => {
	const main = getElement("main"),
		container = getElement('div', ['container']),
		wrapper = getElement('div', ['main-content']),
		content = getElement('div', ['content']);
	
	main.append(container)
	container.append(wrapper)
	wrapper.append(content)

	if(genre){
		const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], {textContent: genre});
		content.append(genreSpan);
	}

	if(rating){
		const retingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']),
			ratingStars = getElement('div', ['rating-stars']);
		
		for(let i = 0; i < 10; ++i){
			ratingStars.append(getElement('img', ['star'], {
				alt: i ? '' : `Рейтинг ${rating} из 10`, 
				src: i < rating ? 'img/star.svg' : 'img/star-o.svg'}));
		}
		retingBlock.append(ratingStars);

		const ratingMunber = getElement('div', ['rating-number'], {textContent: `${rating}/10`});
		retingBlock.append(ratingMunber);

		content.append(retingBlock);
	}
	
	if(title)
		content.append(getElement('h1', ["main-title", "animated", "fadeInRight"], {textContent: title}));
	
	if(description)
		content.append(getElement('p', ['main-description', 'animated', 'fadeInRight'], {textContent: description}));

	if(trailer){
		content.append(getElement('a', ['button', 'animated', 'fadeInRight', 'youtube-modal'], {textContent: "Смотреть трейлер", href: trailer}));
		wrapper.append(getElement('a', ['play','youtube-modal'], {innerHTML: '<img src="img/play.svg" alt="play" class="play-img">', href: trailer}));
	}
	
	if(slider){
		const series = getElement('div', ['series']),
			swiperBlock = getElement('div', ['swiper-container']),
			swiperWrapper = getElement('div', ['swiper-wrapper']),
			arrow = getElement('button', ['arrow'])
			allSlide = slider.map(item => {
				const slide = getElement('div', ['swiper-slide'], {
					innerHTML: `
					<figure class="card">
						<img class="card-img" src="${item.img}" alt="${item.title ? item.title : ''}">
						<figcaption class="card-description">
						<p class="card-subtitle">${item.subtitle ? item.subtitle : ''}</p>
						<p class="card-title">${item.title ? item.title : ''}</p>
						</figcaption>
					</figure>
					`
				});
				return slide;
			})
		swiperWrapper.append(...allSlide);		
		swiperBlock.append(swiperWrapper);
		series.append(swiperBlock, arrow);
		container.append(series);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	}
	
	return main;
}

const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector),
		title = options.title;
	app.classList.add('body-app')

	if(options.favicon){
		const type = options.favicon.substring(options.favicon.lastIndexOf('.') + 1);
		const favicon = getElement('link', false, {
			rel: 'icon', 
			href: options.favicon, 
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type)})
		document.head.append(favicon);
	}

	document.title = title;
	app.style.backgroundImage = options.background ? 
		`url(${options.background})` : '';

	app.style.backgroundColor = options.backgroundColor ? options.backgroundColor : '';
	app.style.color = options.fontColor ? options.fontColor : '';

	if(options.subColor) document.documentElement.style.setProperty('--sub-color', options.subColor);

	if(options.header){
		app.append(createHeader(options.header));
	}
	if(options.main){
		app.append(createMain(options.main, title));
	}
}

movieConstructor(".app", {
	title: `Ведьмак`,
	background: "witcher/background.jpg",
	favicon: `witcher/logo.png`,
	fontColor: `#FFFFFF`,
	backgroundColor: '#141218',
	subColor: '#9D2929',
	header: {
		logo: {
			url: `witcher/logo.png`,
			alt: `логотип Ведьмак`
		},
		social: [
			{
				title: 'Twitter',
				link: `https://twitter.com`,
				img: `witcher/social/twitter.svg`
			},
			{
				title: 'Instagram',
				link: `https://instagram.com`,
				img: `witcher/social/instagram.svg`
			},
			{
				title: 'Facebook',
				link: `https://facebook.com`,
				img: `witcher/social/facebook.svg`
			}
		],
		menu: [
			{
				title: 'Описание',
				url: '#'
			},
			{
				title: 'Трейлер',
				url: '#'
			},
			{
				title: 'Отзывы',
				url: '#'
			}
		]
	},
	main: {
		genre: '2019,фэнтези',
		rating: "7",
		description: `Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.`,
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
		slider: [
			{
				img: 'witcher/series/series-1.jpg',
				title: 'Начало конца',
				subtitle: "Серия №1"
			},
			{
				img: 'witcher/series/series-2.jpg',
				title: 'Четыре марки',
				subtitle: "Серия №2"
			},
			{
				img: 'witcher/series/series-3.jpg',
				title: 'Предательская луна',
				subtitle: "Серия №3"
			},
			{
				img: 'witcher/series/series-4.jpg',
				title: 'Банкеты, ублюдки и похороны',
				subtitle: "Серия №4"
			}
		]
	}
});