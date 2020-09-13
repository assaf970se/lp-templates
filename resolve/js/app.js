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
            <img src=${prettifyImgUrl(speakerImage) || ''} alt="">
        </div>
        <div class="speaker-details">
            <div class="speaker-name">${speakerName || ''}</div>
            <div class="speaker-link">
                <a href=${speakerSocialLink || ''}>
                    <img src="https://static.wixstatic.com/media/3cac9b_c2b6138b6ed94063b7c0e1648255c096~mv2.png/v1/crop/x_92,y_92,w_2032,h_2032/fill/w_22,h_22,al_c,q_85,usm_0.66_1.00_0.01/3cac9b_c2b6138b6ed94063b7c0e1648255c096~mv2.webp" alt="">
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
            <div class="event">
                <div class="event-date-time">${dateTime || ''}</div>
                <div class="event-type">${eventType || ''}</div>
                <div class="event-title">${eventTitle || ''}</div>
                <div class="participants">${participants.join('<br />') || ''}</div>
                <div class="event-description">${eventDescription || ''}</div>
            </div>
        `;
    }

    let results;

    function renderKeynote() {
        const keynoteHtml = results[0]
            .filter((item) => item.event === "keynote")
            .sort((a,b) => a.speakerNumber - b.speakerNumber)
            .map(renderSpeakerHtml)
            .join("");
        document.querySelector(".keynote").innerHTML = keynoteHtml;
    }

    function renderSpeakers() {
        const speakersHtml = results[0]
            .filter((item) => item.event === "speakers")
            .sort((a,b) => a.speakerNumber - b.speakerNumber)
            .map(renderSpeakerHtml)
            .join("");
        document.querySelector(".speakers").innerHTML = speakersHtml;
    }

    function renderAgenda() {
        const agendaHtml = results[1]
            .sort((a,b) => a.eventNumber - b.eventNumber)
            .map(renderAgendaHtml)
            .join("");
        document.querySelector(".agenda").innerHTML = agendaHtml;
    }

    async function render() {
        results = await Promise.all([getSpeakerData(), getAgendaData()]);
        if (results[0].find((item) => item.event === "keynote"))
            renderKeynote();
        if (results[0].find((item) => item.event === "speakers"))
            renderSpeakers();
        if (results[1].length) renderAgenda();
        console.log("render:", results);
    }

    render();
})();
