document.addEventListener("DOMContentLoaded", function () {
    const jobsList = document.getElementById("jobs-list");

    async function fetchJobs() {
        const response = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json");
        const jobIds = await response.json();
        const jobPromises = jobIds.slice(0, 6).map(async jobId => {
            const jobResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`);
            const jobData = await jobResponse.json();
            return jobData;
        });
        return Promise.all(jobPromises);
    }
    function renderJobs(jobs) {
        jobsList.innerHTML = "";
        jobs.forEach(job => {
            const jobElement = document.createElement("div");
            jobElement.classList.add("job");
            const time = new Date(job.time * 1000).toLocaleDateString();
            jobElement.innerHTML = `<h2>${job.title}</h2><p>By ${job.by} - Posted on ${time}</p>`;
            jobsList.appendChild(jobElement);
        });
    }

    fetchJobs().then(jobs => {
        renderJobs(jobs);
    });
});