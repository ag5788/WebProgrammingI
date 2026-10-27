console.log("Hello World!");

const name = "Aiden";

const navItems = [
    { label: "Intro", target: "#intro" },
    { label: "Skills", target: "#skills" },
    { label: "Projects", target: "#projects" },
    { label: "Education and Experience", target: "#experience" },
    { label: "Contact", target: "#contact" }
];

const projects = [
    {
        title: "Homework 1",
        description: "Personal Portfolio. Previous version of this page",
        link: "https://ag5788.github.io/WebProgrammingI/homework1/",
        deadline: new Date("2026-08-31T23:59:59-07:00"),
    },
    {
        title: "Homework 2",
        description: "Previous version of this page.",
        link: "https://ag5788.github.io/WebProgrammingI/homework2/",
        deadline: new Date("2026-09-07T23:59:59-07:00"),
        imageURL: "assets/table.png"
    },
    {
        title: "Homework 7",
        description: "Personal Portfolio. Previous version of this page",
        link: "https://ag5788.github.io/WebProgrammingI/homework7/",
        deadline: new Date("2026-10-12T23:59:59-07:00"),
        imageURL: "assets/list.png"
    },
    {
        title: "Random Deadline",
        description: "This deadline is on December 19th, 2026.",
        deadline: new Date("2026-12-19T00:00:00-07:00"),
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
const showGreeting = (name) => {
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


const daysUntilDeadline = (deadline) => {
    const msDistance = deadline.getTime() - Date.now();
    return msDistance / (24 * 60 * 60e3);
}

const byDeadlineAscending = (a, b) => a.deadline - b.deadline;

const byDeadlineDescending = (a, b) => b.deadline - a.deadline;

const renderProjects = () => {
    const container = $("#project-cards");
    container.empty();

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const completed = Date.now() >= project.deadline.getTime();
        const daysText = `${completed ? "Completed" : "In"} ` +
            `${Math.floor(Math.abs(daysUntilDeadline(project.deadline)))} days` +
            `${completed ? " ago" : ""}. ` +
            (completed ? "" : "Ongoing.");

        const card = $("<div></div>")
            .addClass("card")
            .attr("style", "width: 18rem;");

        if (project.imageURL) {
            card.append($("<img>")
                .attr("src", project.imageURL)
                .attr("alt", project.title)
                .addClass("card-img-top"));
        }

        const body = $("<div></div>").addClass("card-body");
        if (project.title) {
            body.append($("<h5></h5>").addClass("card-title").text(project.title));
        }
        if (project.description) {
            body.append($("<p></p>").addClass("card-text").text(project.description));
        }
        body.append($("<p></p>").addClass("card-text deadline").text(daysText));
        if (project.link) {
            body.append($("<a></a>")
                .attr("href", project.link)
                .addClass("btn btn-primary")
                .text("See it"));
        }

        card.append(body);
        container.append(card);
    }
}


let skills = ["HTML", "CSS", "JavaScript"];

const validateSkill = (name, excludeIndex) => {
    const trimmed = name.trim();
    const rules = [
        {
            test: value => value.length > 0,
            message: "Skill name cannot be empty."
        },
        {
            test: value => !skills.some((skill, index) => index !== excludeIndex && skill.toLowerCase() === value.toLowerCase()),
            message: `"${trimmed}" is already in your skills list.`
        }
    ];

    for (const rule of rules) {
        if (!rule.test(trimmed)) {
            return rule.message;
        }
    }
    return null;
}

const updateSkills = (mutator, ...onUpdate) => {
    mutator(skills);
    for (const callback of onUpdate) {
        callback(skills);
    }
}

const clearSkillFeedback = () => {
    const feedback = $("#skill-feedback");
    if (feedback.is(":visible")) {
        feedback.stop(true, true).fadeOut();
    }
}

const renderSkills = () => {
    const list = $("#skill-list");
    list.empty();

    skills.forEach((skill, index) => {
        const item = $("<li></li>")
            .attr("data-index", index)
            .append(
                $("<span></span>").addClass("skill-name").text(skill),
                " ",
                $("<button></button>")
                    .attr("type", "button")
                    .addClass("btn btn-sm btn-outline-danger delete-skill")
                    .attr("aria-label", "Remove skill")
                    .text("✕")
            );
        list.append(item);
    });

    filterSkills();
}

const filterSkills = () => {
    const term = $("#skillSearch").val().trim().toLowerCase();

    $("#skill-list li").each(function () {
        const name = $(this).find(".skill-name").text().toLowerCase();
        $(this).toggle(term.length === 0 || name.includes(term));
    });
}

const editSkill = (index) => {
    const list = $("#skill-list");
    if (list.find(".skill-edit-input").length > 0) {
        return;
    }

    const item = list.find(`li[data-index="${index}"]`);
    const nameSpan = item.find(".skill-name");
    const currentValue = skills[index];

    const input = $("<input>")
        .attr("type", "text")
        .addClass("skill-edit-input form-control form-control-sm d-inline-block w-auto")
        .val(currentValue)
        .hide()
        .on("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                commitEdit(index, $(this).val());
            } else if (event.key === "Escape") {
                cancelEdit();
            }
        })
        .on("blur", function () {
            commitEdit(index, $(this).val());
        });

    nameSpan.hide();
    item.append(input);
    input.slideDown(() => {
        input.focus();
    });
}

const cancelEdit = () => {
    const input = $("#skill-list .skill-edit-input");
    if (input.length === 0) {
        return;
    }
    input.off("blur");
    const item = input.closest("li");
    input.remove();
    item.find(".skill-name").show();
}

const commitEdit = (index, newName) => {
    const trimmed = newName.trim();
    const error = validateSkill(trimmed, index);
    if (error) {
        $("#skill-feedback").text(error).stop(true, true).slideDown();
        return;
    }

    clearSkillFeedback();
    updateSkills(
        list => { list[index] = trimmed; },
        renderSkills
    );
}

const addSkill = () => {
    const input = $("#new-skill");
    const name = input.val().trim();
    const error = validateSkill(name);

    if (error) {
        $("#skill-feedback").text(error).stop(true, true).slideDown();
        return;
    }

    clearSkillFeedback();
    updateSkills(
        list => { list.push(name); },
        renderSkills
    );

    const newItem = $("#skill-list li").last();
    if (newItem.is(":visible")) {
        newItem.hide().fadeIn();
    }
    input.val("").focus();
}

const handleSkillKeydown = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addSkill();
    } else if (event.key === "Escape") {
        $("#add-skill").find("input").val("");
        clearSkillFeedback();
    }
}

const scrollToSection = (target) => {
    const navOffset = $(".navbar").outerHeight() || 65;
    const section = $(target).closest(".relative");
    const anchor = section.length > 0 ? section : $(target);
    $("html, body").animate({
        scrollTop: anchor.offset().top - navOffset
    }, 600);
}

const renderNav = () => {
    const navList = $("#navbarSupportedContent .navbar-nav");
    navList.empty();

    for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i];
        const li = $("<li></li>").addClass("nav-item");
        const link = $("<a></a>")
            .addClass("nav-link")
            .attr("href", item.target)
            .text(item.label);
        li.append(link);
        navList.append(li);
    }
}

$(() => {
    renderNav();
    renderProjects();
    renderSkills();

    $("#navbarSupportedContent .navbar-nav").on("click", ".nav-link", function (event) {
        event.preventDefault();
        const target = $(this).attr("href");
        scrollToSection(target);
    });

    $("#add-skill").on("submit", (event) => {
        event.preventDefault();
        addSkill();
    });

    $("#new-skill").on("keydown", handleSkillKeydown);
    $("#skillSearch").on("input", filterSkills);

    $("#sort-earliest").on("click", () => {
        projects.sort(byDeadlineAscending);
        renderProjects();
        $("#project-cards").children().hide().fadeIn();
    });

    $("#sort-latest").on("click", () => {
        projects.sort(byDeadlineDescending);
        renderProjects();
        $("#project-cards").children().hide().fadeIn();
    });

    $("#skill-list")
        .on("click", ".skill-name", function () {
            const index = parseInt($(this).closest("li").attr("data-index"), 10);
            editSkill(index);
        })
        .on("click", ".delete-skill", function (event) {
            event.stopPropagation();
            const item = $(this).closest("li");
            const index = parseInt(item.attr("data-index"), 10);

            item.slideUp(() => {
                updateSkills(
                    list => { list.splice(index, 1); },
                    renderSkills
                );
            });
        });
});



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

