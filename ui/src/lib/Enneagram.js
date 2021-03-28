
/**
 * Enneagram
 * 
 */
export default class Enneagram
{
	static enneatypes = {
		0: "Inconnu",
		1: "Ennéatype 1 - Le perfectionniste",
		2: "Ennéatype 2 - L'altruiste",
		3: "Ennéatype 3 - Le battant",
		4: "Ennéatype 4 - L'artiste",
		5: "Ennéatype 5 - L'observateur",
		6: "Ennéatype 6 - Le loyaliste",
		7: "Ennéatype 7 - L'épicurien",
		8: "Ennéatype 8 - Le leader",
		9: "Ennéatype 9 - Le médiateur",
	}

	static centrePrefere = {
		0: 0,
		1: 1,
		2: 2,
		3: 2,
		4: 2,
		5: 3,
		6: 3,
		7: 3,
		8: 1,
		9: 1,
	}

	static centres = {
		0: "Inconnu",
		1: "Instinctif",
		2: "Emotionnel",
		3: "Mental",
	}

	static getAiles(enneatype)
	{
		if (enneatype == 0) return {
			0: "Inconnue",
		}

		let before = enneatype - 1;
		let after = enneatype + 1;

		if (before < 1) before = 9;
		if (after > 9) after = 1;

		let res = {
			0: "Inconnue",
		}

		res[before] = Enneagram.enneatypes[before];
		res[after] = Enneagram.enneatypes[after];

		res[10] = "Les deux";

		return res;
	}
	

	
	static getVariates(enneatype)
	{
		if (enneatype == 0) return {
			0: "Inconnue",
		}

		let c1 = Enneagram.centrePrefere[enneatype];
		let alphaC2 = 0;
		let alphaC3 = 0;
		let muC2 = 0;
		let muC3 = 0;

		if (enneatype == 8 || enneatype == 9)
		{
			alphaC2 = 3; alphaC3 = 2;
			muC2 = 2; muC3 = 3;
		}

		if (enneatype == 1)
		{
			alphaC2 = 2; alphaC3 = 3;
			muC2 = 3; muC3 = 2;
		}

		if (enneatype == 2 || enneatype == 3)
		{
			alphaC2 = 1;
			alphaC3 = 3;
			muC2 = 3;
			muC3 = 1;
		}

		if (enneatype == 4)
		{
			alphaC2 = 3; alphaC3 = 1;
			muC2 = 1; muC3 = 3;
		}

		if (enneatype == 5 || enneatype == 6)
		{
			alphaC2 = 2; alphaC3 = 1;
			muC2 = 1; muC3 = 2;
		}

		if (enneatype == 7)
		{
			alphaC2 = 1; alphaC3 = 2;
			muC2 = 2; muC3 = 1;
		}

		return {
			'': "Inconnue",
			'alpha': "Alpha => " + Enneagram.centres[c1] + " - " + Enneagram.centres[alphaC2] + " - " + Enneagram.centres[alphaC3],
			'mu': "Mu => " + Enneagram.centres[c1] + " - " + Enneagram.centres[muC2] + " - " + Enneagram.centres[muC3],
		}
	}
}
