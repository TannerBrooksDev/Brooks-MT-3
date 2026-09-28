const songGrid = document.querySelector(".song-grid");
const player = document.querySelector("body > footer");
const searchInput = document.querySelector("#music-search");
const navLinks = Array.from(document.querySelectorAll("aside nav a"));
const mainHeading = document.querySelector("#songs-heading");

for (const link of navLinks) {
	if (link.getAttribute("aria-current") === "page") {
		link.classList.add("active");
	}

	link.addEventListener("click", (event) => {
		event.preventDefault();
		window.scrollTo({ top: 0, behavior: "instant" });

		for (const navLink of navLinks) {
			navLink.classList.remove("active");
			navLink.removeAttribute("aria-current");
		}

		link.classList.add("active");
		link.setAttribute("aria-current", "page");

		if (mainHeading) {
			mainHeading.textContent = link.textContent.trim();
		}
	});
}

if (songGrid && searchInput) {
	const songCards = Array.from(songGrid.querySelectorAll(".song-card"));

	searchInput.addEventListener("input", () => {
		const query = searchInput.value.trim().toLowerCase();

		for (const card of songCards) {
			const title = card.querySelector("h2")?.textContent.toLowerCase() ?? "";
			const artist = card.querySelector("p")?.textContent.toLowerCase() ?? "";
			const matches = title.includes(query) || artist.includes(query);

			card.hidden = !matches;
			card.style.display = matches ? "" : "none";
		}
	});

	searchInput.form?.addEventListener("submit", (event) => event.preventDefault());
}

if (songGrid && player) {
	const playerInfo = player.querySelector("section:first-child p");
	const playerImage = player.querySelector("section:first-child img");
	const playButton = player.querySelector("button.play-toggle");
	const previousButton = player.querySelector('button[aria-label="Previous track"]');
	const nextButton = player.querySelector('button[aria-label="Next track"]');
	const playerTitle = playerInfo?.querySelector("strong");
	const playerArtist = playerInfo && Array.from(playerInfo.childNodes).find(
		(node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
	);
	const songs = Array.from(songGrid.querySelectorAll(".song-card"), (card) => ({
		card,
		title: card.querySelector("h2")?.textContent.trim() ?? "",
		artist: card.querySelector("p")?.textContent.trim() ?? "",
		image: card.querySelector("img")?.src ?? ""
	}));
	let currentSongIndex = songs.findIndex((song) => song.title === playerTitle?.textContent.trim());

	if (currentSongIndex < 0) {
		currentSongIndex = 0;
	}

	const updateNowPlaying = (index) => {
		const song = songs[index];

		if (!song || !playerTitle || !playerArtist || !playerImage) {
			return;
		}

		currentSongIndex = index;
		playerTitle.textContent = song.title;
		playerArtist.textContent = song.artist;
		playerImage.src = song.image;
		playerImage.alt = `Album art for ${song.title}`;
	};

	songGrid.addEventListener("click", (event) => {
		const card = event.target.closest(".song-card");

		if (!card || !songGrid.contains(card)) {
			return;
		}

		const selectedIndex = songs.findIndex((song) => song.card === card);

		if (selectedIndex >= 0) {
			updateNowPlaying(selectedIndex);
		}
	});

	previousButton?.addEventListener("click", () => {
		if (songs.length) {
			updateNowPlaying((currentSongIndex - 1 + songs.length) % songs.length);
		}
	});

	nextButton?.addEventListener("click", () => {
		if (songs.length) {
			updateNowPlaying((currentSongIndex + 1) % songs.length);
		}
	});

	if (playButton) {
		let isPlaying = false;

		const updatePlayButton = () => {
			playButton.textContent = isPlaying ? "⏸️" : "▶️";
			playButton.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
			playButton.setAttribute("aria-pressed", String(isPlaying));
		};

		updatePlayButton();
		playButton.addEventListener("click", () => {
			isPlaying = !isPlaying;
			updatePlayButton();
		});
	}
}
