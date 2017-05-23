#!/usr/bin/env node
var fetch = require('node-fetch');
var readline = require('readline');

require('yargs')
	.usage('$0 <cmd> [args]')
	.command('pokemon [name]', 'and then you put your pokemon name or number', {
		pokemon: {
			name: 'bulbasaur'
		}
	}, function(argv){
		if(argv){
			fetch('https://pokeapi.co/api/v2/pokemon/' + argv.name)
				.then(function(response){
					return response.json();
				})
				.then(function(json){
					console.log(json);
				});
		} else{
		var userChoise = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		userChoise.question('What is the number of your pokemon?', (answer) => {
			fetch('https://pokeapi.co/api/v2/pokemon/' + answer)
				.then(function(response){
					return response.json();
				})
				.then(function(json){
					console.log(json);
				});
		userChoise.close();
		})}
	})
	.help()
	.argv