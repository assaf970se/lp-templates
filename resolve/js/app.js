(function () {
    async function getSpeakerData() {
        const res = await fetch(
            "https://www.customerexperiencefestival.com/_functions/speakers"
        );
        const data = await res.json();
        console.log(data);
        return data.items;
    }

    async function getAgendaData() {
        const res = await fetch(
            "https://www.customerexperiencefestival.com/_functions/agenda"
        );
        const data = await res.json();
        console.log(data);
        return data.items;
    }

    function prettifyImgUrl(imgUrl) {
        return `https://static.wixstatic.com/media/${imgUrl.split("/")[3]}`;
    }

    function renderSpeakerHtml(speakerData) {
        const {
            speakerImage,
            speakerName,
            speakerSocialLink,
            speakerTitle,
            companyLogo,
        } = speakerData;
        return `
        <div class="speaker">
        <div class="speaker-img">
            <img src=${prettifyImgUrl(speakerImage)} alt="">
        </div>
        <div class="speaker-details">
            <div class="speaker-name">${speakerName}</div>
            <div class="speaker-link">
                <a href=${speakerSocialLink}>
                    <!-- img src= alt="" -->
                linkedin
                </a>
            </div>
        </div>
        <div class="speaker-work">
            <div class="speaker-title">${speakerTitle}</div>
        </div>
    </div>
        `;
    }

    function renderAgendaHtml(agendaData) {
        const {
            dateTime,
            eventType,
            eventTitle,
            participants,
            eventDescription,
        } = agendaData;

        return `
            
        `;
    }

    let results;

    function renderKeynote() {
        const keynoteHtml = results[0]
            .filter((item) => item.event === "keynote")
            .map(renderSpeakerHtml)
            .join("");
        document.querySelector(".keynote").innerHTML = keynoteHtml;
    }

    function renderSpeakers() {
        const speakersHtml = results[0]
            .filter((item) => item.event === "speakers")
            .map(renderSpeakerHtml)
            .join("");
        document.querySelector(".speakers").innerHTML = speakersHtml;
    }

    async function render() {
        results = await Promise.all([getSpeakerData(), getAgendaData()]);
        if (results[0].find((item) => item.event === "keynote"))
            renderKeynote();
        if (results[0].find((item) => item.event === "speakers"))
            renderSpeakers();
        console.log("render:", results);
    }

    render();
})();
