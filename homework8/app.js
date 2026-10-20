console.log("Hello World!");

const name = "Aiden";

const projects = [
    {
        title: "Homework 1",
        description: "Personal Portfolio. Previous version of this page",
        link: "https://ag5788.github.io/WebProgrammingI/homework1/"
    },
    {
        title: "Homework 2",
        description: "Previous version of this page.",
        link: "https://ag5788.github.io/WebProgrammingI/homework2/",
        image: {
            src: "assets/table.png",
            alt: "The table on the page"
        },
    },
    {
        title: "Homework 7",
        description: "Personal Portfolio. Previous version of this page",
        link: "https://ag5788.github.io/WebProgrammingI/homework7/",
        deadline: "October 12, 2026 23:59:59 UTC-7"
    },
    {
        title: "Random Deadline",
        description: "This deadline is on December 19th, 2026.",
        deadline: "December 19, 2026 00:00:00 UTC-7"
    }
]

let timesDownloaded = 0;

document.getElementById("download-button").addEventListener("click", () => {
    if(timesDownloaded === 0) {
        setTimeout(() => alert('Your download has started!'), 2e3);
    }
    timesDownloaded++;
    document.getElementById("download-count").innerText = `${timesDownloaded} time${timesDownloaded === 1 ? "" : "s"}`;
})

/**
 * @param {string} name
 */
function showGreeting(name) {
    let timeGreeting = "Good ";
    const hour = new Date().getHours();
    if(hour < 12) {
        timeGreeting += "Morning";
    } else {
        if(hour <= 16) { // 4pm
            timeGreeting += "afternoon";
        } else {
            timeGreeting += "evening";
        }
    }
    return timeGreeting + ", my name is " + name + "! Welcome to my portfolio!"
}

document.getElementById("greeting").innerText = showGreeting(name);


function daysUntilDeadline(deadline) {
    const msDistance = deadline.getTime() - Date.now();
    return msDistance / (24 * 60 * 60e3);
}

const projectsArea = document.getElementById("projects-area")
for (let project of projects) {
    //         <div class="card" style="width: 18rem;">
    //           <div class="card-body">
    //             <h5 class="card-title">Homework 1</h5>
    //             <p class="card-text">Personal Portfolio. Previous version of this page</p>
    //             <a href="https://ag5788.github.io/WebProgrammingI/homework1/" class="btn btn-primary">See it</a>
    //           </div>
    //         </div>
    let html = "";
    html += '<div class="card" style="width: 18rem;">';
    if(project.image) html += `<img src="${project.image.src}" class="card-img-top" alt="${project.image.alt}">`
    html += '<div class="card-body">';
    if(project.title) html += `<h5 class="card-title">${project.title}</h5>`;
    if(project.description) html += `<p class="card-text">${project.description}</p>`;
    if(project.deadline) {
        const deadline = new Date(project.deadline);
        const completed = Date.now() >= deadline.getTime();
        html += `<p class="card-text deadline">` +
            `${completed ? "Completed" : "In"} ` +
            `${Math.floor(Math.abs(daysUntilDeadline(deadline)))} days` +
            `${completed ? " ago" : ""}. ` +
            (completed ? "" : "Ongoing.") +
            `</p>`;
    }
    if(project.link) {
        html += `<a href="${project.link}" class="btn btn-primary">See it</a>`
    }
    html += '</div></div>'
    projectsArea.innerHTML += html;
}


const skillInput = document.getElementById("new-skill");
const skillList = document.getElementById("skill-list");

document.getElementById("add-skill").onsubmit = e => {
    e.preventDefault();

    const newSkillItem = document.createElement("li");
    newSkillItem.innerText = skillInput.value;

    skillList.appendChild(newSkillItem);
    skillInput.value = "";
}



const education = [
    {
        status: "Finished",
        degree: "Associates in Computer Science",
        location: "Community College"
    },
    {
        status: "Pursuing",
        degree: "Bachelors in Computer Science",
        location: "This University"
    }
];

for (let row of education) {
    document.getElementById("education-table-body").innerHTML += `
<tr>
    <td>${row.status}</td>
    <td>${row.degree}</td>
    <td>${row.location}</td>
</tr>
    `;
}

const experience = [
    {
        skill: "Java",
        experience: "Since 2016 (10 years)"
    },
    {
        skill: "HTML",
        experience: "Since 2017 (9 years)"
    },
    {
        skill: "CSS",
        experience: "Since 2017 (9 years)"
    },
    {
        skill: "JavaScript",
        experience: "Since 2017 (9 years)"
    },
    {
        skill: "Node.js",
        experience: "Since 2018 (8 years)"
    },
    {
        skill: "PHP",
        experience: "2017-2022 (5 years)"
    },
    {
        skill: "Svelte",
        experience: "Since 2022 (4 years)"
    }
];

for (let row of experience) {
    document.getElementById("experience-table-body").innerHTML += `
<tr>
    <td>${row.skill}</td>
    <td>${row.experience}</td>
</tr>
    `;
}

