const projects = [
    {
        title: "My PC Shop!",
        description: "A full-scale computer hardware store game featuring large frameworks, object serialization, and reliable saving/loading via DataStores. Includes secure server-client communication and scalable systems.",
        tags: ["Large-Scale", "DataStores", "Frameworks", "Client-Server"],
        media: {
            type: "image",
            src: "https://cdn.discordapp.com/attachments/1341730729335193681/1451370972954492938/mypcshop3.png?ex=6945ee0d&is=69449c8d&hm=ea514d6385b315b67b36842d4e296b8eb24e567725dc6e05253e0db464aecc3d&"
        }
    },
    {
        title: "Axon Bodycam System",
        description: "A fully functional body camera system allowing recording, playback, and viewing other player's bodycams all natively inside Roblox.",
        tags: ["Systems Design", "Persistence", "Networking"],
        media: {
            type: "video",
            src: "https://cdn.discordapp.com/attachments/1341730729335193681/1451370972308443358/bodycamvideo.mp4?ex=6945ee0c&is=69449c8c&hm=b54806a83e7c6444c1b7ce01c0a52d1995255dc72c3e4ab586e5d24a24cb5711&"
        }
    },
    {
        title: "Locker System",
        description: "A modular locker system for a US Army roleplay game. Supports models, clothing, and accessories with a clean, responsive UI across all devices.",
        tags: ["Modular", "UI Systems", "Customization"],
        media: {
            type: "video",
            src: "https://cdn.discordapp.com/attachments/1341730729335193681/1451370970349830264/lockersystem.mp4?ex=6945ee0c&is=69449c8c&hm=975b3efc6bbb384add1ca84b24924af094825f7d76bb6f4bd0b3718939317138&"
        }
    },
    {
        title: "Phantasma",
        description: "Worked for over a year as a scripter and GFX designer on a tower defense game. Involved large systems, OOP-heavy architecture, and complex gameplay logic.",
        tags: ["Team Project", "OOP", "Game Logic"],
        media: {
            type: "image",
            src: "https://cdn.discordapp.com/attachments/1341730729335193681/1451370969275961384/phantasma.png?ex=6945ee0c&is=69449c8c&hm=7ba8bddbd4b2ea46ec091301be4059024cd017b9aa5c48c470c31616a6c232f4&"
        }
    },
    {
        title: "Outfit Purchasing System",
        description: "Commissioned system allowing players to load, customize, bulk-purchase, and share outfits via custom IDs.",
        tags: ["E-Commerce", "Avatar Systems", "UX"],
        media: {
            type: "video",
            src: "https://cdn.discordapp.com/attachments/1341730729335193681/1451370966859911359/outfits.mp4?ex=6945ee0b&is=69449c8b&hm=734699a5e182c6e2d7a43fdf46a30fe552995fcb0283117065e57d3cde78a93f&"
        }
    }
];


const skills = [
	{
		title: "Scalable Architecture",
		description: "Experienced in OOP, ModuleScripts, modular frameworks, optimized patterns, and production-ready codebases."
	},
	{
		title: "Gameplay Systems",
		description: "Crate mechanics, progression systems, round/match logic, team mechanics, and large gameplay systems."
	},
	{
		title: "Datastores & Saving/Loading",
		description: "Robust DataStore systems for currency, levels, structured data, session safety, and reliability."
	},
	{
		title: "UI & UX Programming",
		description: "Functional, responsive UI with clean animations and smooth user experiences across devices."
	}
];


function renderProjects() {
    const container = document.getElementById("projectsGrid");

    projects.forEach(project => {
        const row = document.createElement("div");
        row.className = "project-row";

        const media = project.media.type === "video"
            ? `<video src="${project.media.src}" controls muted></video>`
            : `<img src="${project.media.src}" alt="${project.title}">`;

        row.innerHTML = `
			<div class="project-media">
				${media}
			</div>
			<div class="project-content">
				<h3>${project.title}</h3>
				<p>${project.description}</p>
				<div class="project-tags">
					${project.tags.map(tag => `<span>${tag}</span>`).join("")}
				</div>
			</div>
		`;

        container.appendChild(row);
    });
}

renderProjects();

function calculateRate() {
    const workType = Number(document.getElementById("workType").value);
    const complexity = Number(document.getElementById("complexity").value);
    const urgency = Number(document.getElementById("urgency").value);

    const resultBox = document.getElementById("rateResult");
    const allRates = document.getElementById("allRates");

    if (!workType || !complexity || !urgency) {
        resultBox.innerText = "Please answer all questions to get a recommendation.";
        return;
    }

    const score = workType + complexity + urgency;

    document.querySelectorAll(".rate-card").forEach(card => {
        card.classList.remove("recommended");
    });

    let recommendedId = "";

    if (workType === 5) {
        recommendedId = "rate-fulltime";
        resultBox.innerText = "Recommended: Full-Time / Long-Term Work";
    } else if (score <= 4) {
        recommendedId = "rate-small";
        resultBox.innerText = "Recommended: Small Bug Fixes — 15–30 USD or 5,000 Robux";
    } else if (score <= 6) {
        recommendedId = "rate-medium";
        resultBox.innerText = "Recommended: Medium Bug Fixes — 30–60 USD or 10,000 Robux";
    } else if (score <= 8) {
        recommendedId = "rate-large";
        resultBox.innerText = "Recommended: Large Bug Fixes — 80–150 USD or 50,000 Robux";
    } else if (workType === 4) {
        recommendedId = "rate-advanced";
        resultBox.innerText = "Recommended: Advanced Systems Commission — 100–250 USD";
    } else {
        recommendedId = "rate-generic";
        resultBox.innerText = "Recommended: Generic Systems Commission — 30–50 USD";
    }

    allRates.classList.remove("hidden");

    const card = document.getElementById(recommendedId);
    if (card) {
        card.classList.add("recommended");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}


function toggleAllRates() {
    document.getElementById("allRates").classList.toggle("hidden");
}

function renderSkillsBento() {
    const container = document.getElementById("skillsGrid");

    const layoutMap = [
        "bento-big",    // Scalable Architecture
        "bento-wide",   // Gameplay Systems
        "bento-tall",   // Datastores
        ""              // UI & UX
    ];

    skills.forEach((skill, index) => {
        const card = document.createElement("div");
        const sizeClass = layoutMap[index] || "";

        card.className = `bento-card ${sizeClass}`;

        card.innerHTML = `
			<h3>${skill.title}</h3>
			<p>${skill.description}</p>
		`;

        container.appendChild(card);
    });
}

renderSkillsBento();



