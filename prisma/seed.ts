import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

async function main() {
	// Here be all your seeds 🌱

	/**
	 * Users
	 */

	const users = [
		{ email: "gamer.gilda@gaming.com", password: "levelup1337", firstName: "Gilda", lastName: "Gamer" },
		{ email: "adventurous.alex@adventures.com", password: "adventure123", firstName: "Alex", lastName: "Adventurer" },
		{ email: "baking.bella@cookies.com", password: "yumYumCakes456", firstName: "Bella", lastName: "Baker" },
		{ email: "coding.chris@code.com", password: "consthacker", firstName: "Chris", lastName: "Coder" },
	  ];

	  for (const user of users) {
		const hashedPassword = bcrypt.hashSync(user.password, 10);
		try {
		  const result = await prisma.user.upsert({
			where: { email: user.email },
			update: {},
			create: {
			  email: user.email,
			  password: hashedPassword,
			  first_name: user.firstName,
			  last_name: user.lastName,
			},
		  });
		} catch (error) {
		  console.error('Error seeding user:', error);
		}
	  }

	/**
	 * Album
	 */

	// Gamer Gilda's Albums


	const epicWinsAlbum = await prisma.album.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			title: "Epic Wins",
			userId: 1,
		}
	});

	const retroClassicsAlbum = await prisma.album.upsert({
		where: { id: 2 },
		update: {},
		create: {
			id: 2,
			title: "Retro Classics",
			userId: 1,
		}
	});

	const gameConAdventuresAlbum = await prisma.album.upsert({
		where: { id: 3 },
		update: {},
		create: {
			id: 3,
			title: "GameCon Adventures",
			userId: 1,
		}
	});

	// Adventurer Alex's Albums
	const mountainPeaksAlbum = await prisma.album.upsert({
		where: { id: 4 },
		update: {},
		create: {
			id: 4,
			title: "Mountain Peaks",
			userId: 2,
		}
	});

	const hiddenGemsAlbum = await prisma.album.upsert({
		where: { id: 5 },
		update: {},
		create: {
			id: 5,
			title: "Hidden Gems",
			userId: 2,
		}
	});

	// Baker Bella's Albums
	const sweetCreationsAlbum = await prisma.album.upsert({
		where: { id: 6 },
		update: {},
		create: {
			id: 6,
			title: "Sweet Creations",
			userId: 3,
		}
	});

	const breadHeavenAlbum = await prisma.album.upsert({
		where: { id: 7 },
		update: {},
		create: {
			id: 7,
			title: "Bread Heaven",
			userId: 3,
		}
	});

	const holidayTreatsAlbum = await prisma.album.upsert({
		where: { id: 8 },
		update: {},
		create: {
			id: 8,
			title: "Holiday Treats",
			userId: 3,
		}
	});

	const bakingWorkshopsAlbum = await prisma.album.upsert({
		where: { id: 9 },
		update: {},
		create: {
			id: 9,
			title: "Baking Workshops",
			userId: 3,
		}
	});

	// Coder Chris's Albums
	const hackathonsAlbum = await prisma.album.upsert({
		where: { id: 10 },
		update: {},
		create: {
			id: 10,
			title: "Hackathons",
			userId: 4,
		}
	});

	const mySetupAlbum = await prisma.album.upsert({
		where: { id: 11 },
		update: {},
		create: {
			id: 11,
			title: "My Setup",
			userId: 4,
		}
	});

	const techConferencesAlbum = await prisma.album.upsert({
		where: { id: 12 },
		update: {},
		create: {
			id: 12,
			title: "Tech Conferences",
			userId: 4,
		}
	});


		/**
	 * Photos
	 */
	// Photos for Gamer Gilda
const photoGamer1 = await prisma.photo.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        title: "Victory Royale",
        url: "https://via.placeholder.com/600/92c952",
        comment: "My first win in Battle Royale!",
        userId: 1,
    }
});

const photoGamer2 = await prisma.photo.upsert({
    where: { id: 2 },
    update: {},
    create: {
        id: 2,
        title: "Classic Console Collection",
        url: "https://via.placeholder.com/600/b0f7cc",
        comment: "Retro gaming at its finest.",
        userId: 1,
    }
});

const photoGamer3 = await prisma.photo.upsert({
    where: { id: 8 },
    update: {},
    create: {
        id: 8,
        title: "Legendary Loot",
        url: "https://via.placeholder.com/600/92c952",
        comment: "Got these epic items in last night's raid!",
        userId: 1,
    }
});

const photoGamer4 = await prisma.photo.upsert({
    where: { id: 9 },
    update: {},
    create: {
        id: 9,
        title: "Arcade High Scores",
        url: "https://via.placeholder.com/600/b0f7cc",
        comment: "Top of the leaderboard, where I belong.",
        userId: 1,
    }
});

// Photos for Adventurer Alex
const photoAdventurer1 = await prisma.photo.upsert({
    where: { id: 3 },
    update: {},
    create: {
        id: 3,
        title: "Summit Sunrise",
        url: "https://via.placeholder.com/600/d32776",
        comment: "Sunrise at the peak of Mount Everest.",
        userId: 2,
    }
});

const photoAdventurer2 = await prisma.photo.upsert({
    where: { id: 10 },
    update: {},
    create: {
        id: 10,
        title: "Desert Dunes",
        url: "https://via.placeholder.com/600/d32776",
        comment: "Exploring the vast Sahara.",
        userId: 2,
    }
});

const photoAdventurer3 = await prisma.photo.upsert({
    where: { id: 11 },
    update: {},
    create: {
        id: 11,
        title: "Underwater Caves",
        url: "https://via.placeholder.com/600/f778de",
        comment: "Diving into the unknown.",
        userId: 2,
    }
});



// Photos for Baker Bella
const photoBaker1 = await prisma.photo.upsert({
    where: { id: 4 },
    update: {},
    create: {
        id: 4,
        title: "Chocolate Layer Cake",
        url: "https://via.placeholder.com/600/a393af",
        comment: "A decadent dessert for any occasion.",
        userId: 3,
    }
});

const photoBaker2 = await prisma.photo.upsert({
    where: { id: 5 },
    update: {},
    create: {
        id: 5,
        title: "Artisan Sourdough",
        url: "https://via.placeholder.com/600/33a8a6",
        comment: "Fresh from the oven.",
        userId: 3,
    }
});

const photoBaker3 = await prisma.photo.upsert({
    where: { id: 12 },
    update: {},
    create: {
        id: 12,
        title: "Macaron Madness",
        url: "https://via.placeholder.com/600/a393af",
        comment: "A rainbow of flavors.",
        userId: 3,
    }
});

const photoBaker4 = await prisma.photo.upsert({
    where: { id: 13 },
    update: {},
    create: {
        id: 13,
        title: "Pie Perfection",
        url: "https://via.placeholder.com/600/33a8a6",
        comment: "Apple pie, a classic favorite.",
        userId: 3,
    }
});


// Photos for Coder Chris
const photoCoder1 = await prisma.photo.upsert({
    where: { id: 6 },
    update: {},
    create: {
        id: 6,
        title: "Late Night Coding",
        url: "https://via.placeholder.com/600/47792",
        comment: "Working on my latest project.",
        userId: 4,
	    }
});

const photoCoder2 = await prisma.photo.upsert({
    where: { id: 7 },
    update: {},
    create: {
        id: 7,
        title: "My Ergonomic Setup",
        url: "https://via.placeholder.com/600/37a0f4",
        comment: "Finally, no more back pain.",
        userId: 4,
    }
});

const photoCoder3 = await prisma.photo.upsert({
    where: { id: 14 },
    update: {},
    create: {
        id: 14,
        title: "Code & Coffee",
        url: "https://via.placeholder.com/600/47792",
        comment: "The developer's breakfast.",
        userId: 4,
    }
});

const photoCoder4 = await prisma.photo.upsert({
    where: { id: 15 },
    update: {},
    create: {
        id: 15,
        title: "Virtual Reality Setup",
        url: "https://via.placeholder.com/600/37a0f4",
        comment: "Exploring new worlds from my living room.",
        userId: 4,
    }
});


}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
