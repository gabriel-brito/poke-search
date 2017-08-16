#!/usr/bin/env node
let fetch = require("node-fetch");
let readline = require("readline");

require("yargs")
	.usage("$0 <cmd> [args]")
	.command(
		"pokemon [name]",
		"and then you put your pokemon name or number",
		{
			pokemon: { name: "bulbasaur" }
		},
		argv => {
			if (argv.name) {
				setTimeout(() => {
					fetch("https://pokeapi.co/api/v2/pokemon/" + argv.name)
						.then(data => data.json())
						.then((data, err) => {
							let { id, name, weight, height } = data;
							if (typeof id == "undefined") {
								console.log(
									`pokemon's name or number is wrong`
								);
							} else {
								console.log(`pokemon id: ${id}`);
								console.log(`pokemon name: ${name}`);
								console.log(`pokemon weight: ${weight} kg`);
								console.log(`pokemon height: ${height}`);

							}
						})
						.catch(err => {
							console.log("Something went wrong");
						});
				}, 100);
			} else {
				var userChoise = readline.createInterface({
					input: process.stdin,
					output: process.stdout
				});
				userChoise.question(
					"What is the number or name of your pokemon? \n",
					answer => {
						let answerLower = answer.toLowerCase()
						fetch("https://pokeapi.co/api/v2/pokemon/" + answerLower)
							.then(data => data.json())
							.then((data, err) => {
								let { id, name, weight, height, abilities, moves } = data;
								if (typeof id == "undefined") {
									console.log(
										`pokemon's name or number is wrong`
									);
								} else {
									console.log(`pokemon id: ${id}`);
									console.log(`pokemon name: ${name}`);
									console.log(`pokemon weight: ${weight} kg`);
									console.log(`pokemon height: ${height}`);
									console.log(`pokemon abilities: ${abilities[0].ability.name}`);
									var num = 10;
									for(let i = moves.length-10; i<moves.length; i++){
										console.log(`pokemon main movement ${num}: ${moves[i].move.name} `);
										num--;
									}
								}
							})
							.catch(err => {
								console.log("Something went wrong");
							});
						userChoise.close();
					}
				);
			}
		}
	)
	.help().argv;
