const fuseAbilities = (headAbilities, bodyAbilities) => {
	const uniqueAbilities = [...new Set(Object.values(headAbilities).concat(Object.values(bodyAbilities)))];
	var newAbilities = {
		0: uniqueAbilities[0],
	};
	for (var i = 1; i < 6; i++) {
		if (uniqueAbilities[i]) {
			newAbilities[i] = uniqueAbilities[i];
		}
	}
	return newAbilities;
}

const fuseStats = (headStats, bodyStats) => {
	var ADS = {atk: 0, def: 0, spe: 0};
	var HSS = {hp: 0, spa: 0, spd: 0};
	for (var stat in ADS) {
		ADS[stat] = Math.floor(2 * (bodyStats[stat] / 3) + (headStats[stat] / 3))
	}
	for (var stat in HSS) {
		HSS[stat] = Math.floor((bodyStats[stat] / 3) + 2 * (headStats[stat] / 3))
	}
	const newStats = {
		hp: HSS.hp,
		atk: ADS.atk,
		def: ADS.def,
		spa: HSS.spa,
		spd: HSS.spd,
		spe: ADS.spe,
	};
	return newStats;
}

const fuseTypes = (head: Species, body: Species) => {
	var headType = head.types;
	var bodyType = body.types;

	const swappedTypes = {
		magnemite: ["Steel", "Electric"],
		magneton: ["Steel", "Electric"],
		magnezone: ["Steel", "Electric"],
		dewgong: ["Ice", "Water"],	
		omanyte: ["Water", "Rock"],
		omastar: ["Water", "Rock"],	
		scizor: ["Steel", "Bug"],
		empoleon: ["Steel", "Water"],
		spiritomb: ["Dark", "Ghost"],
		ferrothorn: ["Steel", "Grass"],
		celebi: ["Grass", "Psychic"],
	}
	const singleTypes = {
		bulbasaur: "Grass",
		ivysaur: "Grass",
		venusaur: "Grass",
		charizard: "Fire",
		geodude: "Rock",
		graveler: "Rock",
		golem: "Rock",
		gastly: "Ghost",
		haunter: "Ghost",
		gengar: "Ghost",
		onix: "Rock",
		steelix: "Steel",
		scyther: "Bug",
		gyarados: "Water",
		articuno: "Ice",
		zapdos: "Electric",
		moltres: "Fire",
		dragonite: "Dragon",
	}

	for (var pokemon in swappedTypes) {
		if (head.name === pokemon) {
			headType = swappedTypes[pokemon];
		}
		if (body.name === pokemon) {
			bodyType = swappedTypes[pokemon];
		}
	}
	for (var pokemon in singleTypes) {
		if (head.name === pokemon) {
			headType = [singleTypes[pokemon]];
		}
		if (body.name === pokemon) {
			bodyType = [singleTypes[pokemon]];
		}
	}
	if ((headType[0] === "Normal" && headType[1] === "Flying") || (headType[0] === "Flying" && headType[1] === "Normal")) {
		headType = ["Flying"];
	}
	if ((bodyType[0] === "Normal" && bodyType[1] === "Flying") || (bodyType[0] === "Flying" && bodyType[1] === "Normal")) {
		bodyType = ["Flying"];
	}

	const type1 = headType[0];
	var type2 = bodyType[1] ?? bodyType[0];
	// if bodyType[1] is defined and it is equal to type1, then type2 is bodyType[0]
	if (bodyType[1] && bodyType[1] === type1) {
		type2 = bodyType[0];
	}
	return [type1, type2];
}

export const fusePokemon = (pokemon1: Species, pokemon2: Species) => {
	const newAbilities = fuseAbilities(pokemon1.abilities, pokemon2.abilities);
	const newBaseStats = fuseStats(pokemon1.baseStats, pokemon2.baseStats);
	const newTypes = fuseTypes(pokemon1, pokemon2);

	const newSpecies = {
		name: `${pokemon1.name}/${pokemon2.name}`,
		types: newTypes,
		abilities: newAbilities,
		baseStats: newBaseStats,
		eggGroups: pokemon1.eggGroups,
		heightm: (pokemon1.heightm + pokemon2.heightm) / 2,
		weightkg: (pokemon1.weightkg + pokemon2.weightkg) / 2,
		color: pokemon1.color,
	};

  return newSpecies;
}