const express = require('express');
const nunjucks = require('nunjucks');
const videos = require('./data');

const server = express();

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
	express: server,
	autoescape: false,
	noCache: true
});

server.get('/', function (req, res) {
	const about = {
		avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
		name: 'JavaScript',
		role: 'Linguagem de Programação',
		description: 'JavaScript é uma linguagem de programação que aplica funcionalidades a uma página <a href="http://google.com.br" target="_blank">Web</a>',
		links: [
			{ name: 'Github', url: 'https://github.com.br'},
			{ name: 'Twitter', url: 'https://twitter.com.br'},
			{ name: 'Linkedin', url: 'https://linkedin.com.br'}
		]
	};

	return res.render('about', { about });
});

server.get('/portfolio', function (req, res) {
	return res.render('portfolio', { items: videos });
});

server.get('/video', function (req, res) {
	const id = req.query.id;
	const video = videos.find(function(video) {
		if (video.id == id) {
			return true;
		}
	});

	if (!video) {
		return res.send('Vídeo não encontrado')
	}

	return res.render('video', { item: video })
});

server.listen(5000, function () {
	console.log('Servidor rodando');
});

