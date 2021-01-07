function createParticipant (data) {
    const participant = document.createElement('div');
    const participantImg = document.createElement('div');
    const participantDetails = document.createElement('div');
    const participantName = document.createElement('div');
    const participantTitle = document.createElement('div');
    const participantLogo = document.createElement('div');
    const participantImgUrl = document.createElement('img');
    const participantLogoUrl = document.createElement('img');
    
    participant.classList.add('participant');
    participantImg.classList.add('participant-img');
    participantDetails.classList.add('participant-details');
    participantName.classList.add('participant-name');
    participantName.innerText = data.name;
    participantTitle.classList.add('participant-title');
    participantTitle.innerText = data.title;
    participantLogo.classList.add('participant-logo');
    participantImgUrl.setAttribute('src', data.img);
    participantImgUrl.setAttribute('alt', data.name);
    participantLogoUrl.setAttribute('src', data.logo);
    participantLogoUrl.setAttribute('alt', 'logo');

    participant.appendChild(participantImg);
    participant.appendChild(participantDetails);
    participantImg.appendChild(participantImgUrl);
    participantDetails.appendChild(participantName);
    participantDetails.appendChild(participantTitle);
    participantDetails.appendChild(participantLogo);
    participantLogo.appendChild(participantLogoUrl);
    
    return participant;
}