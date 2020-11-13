// let answersData;

function getParamData() {
    const strUrl = window.location.href;
    const url = new URL(strUrl);
    const encodedData = url.searchParams.get('ta');
    const strData = decodeURIComponent(encodedData);
    const data = JSON.parse(strData);
    return data;
}

async function getAnswersData() {
    const res = await fetch(
        'https://customerexperiencefestival.com/_functions/getAnswers'
    );
    const data = await res.json();
    return data.answers;
}

function mapUsersAnswers(usersAnswers, allAnswers) {
    return usersAnswers.map((answer) =>
        allAnswers.find((record) => record.answer === answer)
    );
}

function renderDetailsScoreTitle(score) {
    if (score > 85) {
        return 'your support tech stack is onwards and upwards from here!';
    } else if (score > 60) {
        return 'your support tech stack is okay.';
    } else {
        return 'it’s time to make some much-needed improvements.';
    }
}

function renderDetailsScoreSubtitle(score) {
    if (score > 85) {
        return "Now, let's take it to greater heights! Here are some tips and resources to help maximize your stack:";
    } else if (score > 60) {
        return "Now, let's see how we can bump up that score with practical tips and resources to help enhance and maximize your stack:";
    } else {
        return "We've set the foundation with practical tips and resources that'll go a long way toward helping you enhance your stack:";
    }
}

function renderSummaryScoreTitle(score) {
    if (score >= 60) {
        return 'Ready to take your tech stack to the next level?';
    } else {
        return 'Tap into the real value of your customer support.';
    }
}

function renderSummaryScoreText(score) {
    if (score >= 60) {
        return 'See how easy it is to manage and optimize your support operation with all essentials in one place.';
    } else {
        return 'See how easy it is to manage and optimize your support operation, connect better with customers, boost agent productivty, and much more.';
    }
}

function addSubjectColors(subject) {
    if (!!subject) {
        if (subject === 'Tech stack') {
            return {
                bgColor: '#f4fdfc',
                barBgColor: '#d7f1ef',
                barFillColor: '#39aea4',
            };
        } else if (subject === 'Productivity') {
            return {
                bgColor: '#fff8f5',
                barBgColor: '#ffe6e6',
                barFillColor: '#db3838',
            };
        } else if (subject === 'Scalability') {
            return {
                bgColor: '#f5f9ff',
                barBgColor: '#ffe4d4',
                barFillColor: '#39aea4',
            };
        } else if (subject === 'Insights') {
            return {
                bgColor: '#F9F7FE',
                barBgColor: '#ffe4d4',
                barFillColor: '#ffbc89',
            };
        } else {
            return {
                bgColor: '#f4fdfc',
                barBgColor: '#d7f1ef',
                barFillColor: '#39aea4',
            };
        }
    } else {
        return {
            bgColor: '#f4fdfc',
            barBgColor: '#d7f1ef',
            barFillColor: '#39aea4',
        };
    }
}

function prettifyImgUrl(imgUrl) {
    return `https://static.wixstatic.com/media/${imgUrl.split('/')[3]}`;
}

function prettifyRichText(richText) {
    return richText
        .replace(/<p class="font_8">/g, '')
        .replace(/<\/p>/g, '')
        .replace(/&amp;/g, '')
        .replace(/&nbsp;/g, '')
        .replace(/\n/g, '')
        .split('<br>');
}

function renderCardText(richText, textType) {
    if (textType === 'p') {
        return prettifyRichText(richText)
            .filter((textline) => textline[0] !== '-')
            .map((textline) => {
                return `<p>${textline}</p>`;
            })
            .join('');
    }
    if (textType === 'li') {
        return prettifyRichText(richText)
            .filter((textline) => textline[0] === '-')
            .map((textline, idx) => {
                return `<li>${textline.replace('-', '')}</li>`;
            })
            .join('');
    }
}

function filterAnswersData(data, filter) {
    return data.filter((answer) => answer.subject.toUpperCase() === filter);
}

function calcTotalScore(data) {
    return data.reduce((acc, value) => acc + value.score, 0);
}

function renderDetailsCardHtml(cardData) {
    const { icon, topic, text } = cardData;

    return `
    <div class="ta-result-details-card_container">
        <div class="ta-result-details-card_icon">
            <img src=${prettifyImgUrl(icon)} alt="" />
        </div>
        <div class="ta-result-details-card_title">${topic}</div>
        <div class="ta-result-details-card_text">
            ${renderCardText(text, 'p')}
            <ul>${renderCardText(text, 'li')}</ul>
        </div>
    </div>
    `;
}

function renderDetailsContainerHtml(containerData) {
    const subjectColor = addSubjectColors(containerData[0].subject);
    const containerMaxScore = 25;
    const score = containerData.reduce((acc, value) => acc + value.score, 0);

    return `
    <div class="ta-result-details-section_container" style="background-color: ${
        subjectColor.bgColor || '#fff8f5'
    }">
        <div class="ta-result-details-section_score">${score}/${containerMaxScore}</div>
        <div class="ta-result-details-section_bar"
            style="background-color: ${subjectColor.barBgColor || '#0d387b'}">
            <div class="ta-result-details-section_bar-fill" style="background-color: ${
                subjectColor.barFillColor || '#40c6bb'
            }; width: ${score * (220 / containerMaxScore)}px;"></div>
            </div>
        <div class="ta-result-details-section_title">
            <span><img src="${prettifyImgUrl(
                containerData[0].subjectIcon
            )}" alt=""/></span>
            <span>${containerData[0].subject}</span>
        </div>
        <div class="ta-result-details-section_cards">
            ${containerData.map(renderDetailsCardHtml).join('')}
        </div>
    </div>
    `;
}

function renderSummaryBarHtml(barData) {
    const { subject, currentValue, maxValue, barColor } = barData;

    return `
    <div class="ta-result-summary-bar_container">
    <div class="ta-result-summary-bar_details">
        <div>${subject}</div>
        <div>
            <span>${currentValue}</span>/${maxValue}
        </div>
    </div>
    <div class="ta-result-summary-bar_bar">
        <div class="ta-result-summary-bar_bar-fill" style="width: ${
            currentValue * (220 / maxValue)
        }px; background-color: ${barColor}">
        </div>
    </div>
</div>
    `;
}

function renderSummaryContainerHtml(containerData, fullName, company) {
    const totalScore = containerData.reduce(
        (acc, value) => acc + value.score,
        0
    );
    function subjectScore(data, filter) {
        return data
            .filter(
                (answer) =>
                    answer.subject.toLowerCase() === filter.toLowerCase()
            )
            .reduce((acc, value) => acc + value.score, 0);
    }

    return `
    <div class="ta-result-summary">
        <div class="ta-result-summary-logo">
            <img
                src="https://static.wixstatic.com/media/dba05e_b1eb7b6bff2d4b328c35d484a47a7dd0~mv2.png"
                alt="logo"
            />
        </div>
        <div class="ta-result-summary-grade">
            <div
                class="ta-donut-base-circle"
                style="background: conic-gradient(#7493CE ${totalScore}%, #1A3777 0%);"
            >
                <div class="ta-donut-inner-circle"></div>
            </div>
            <span>${totalScore}</span>
        </div>
        <div class="ta-result-summary-company">${company}</div>
        <div class="ta-result-summary-header">
            <div class="ta-result-summary-header_title">
                ${renderDetailsHeaderTitleHtml(fullName, totalScore)}, 
            </div>
            <div class="ta-result-summary-header_subtitle">
                ${renderDetailsScoreSubtitle(totalScore)}
            </div>
        </div>
        ${renderSummaryBarHtml({
            currentValue: subjectScore(containerData, 'Tech stack'),
            maxValue: 25,
            subject: 'Tech stack',
            barColor: '#40c6bb',
        })}
        ${renderSummaryBarHtml({
            currentValue: subjectScore(containerData, 'Productivity'),
            maxValue: 25,
            subject: 'Productivity',
            barColor: '#db3838',
        })}
        ${renderSummaryBarHtml({
            currentValue: subjectScore(containerData, 'Scalability'),
            maxValue: 25,
            subject: 'Scalability',
            barColor: '#40c6bb',
        })}
        ${renderSummaryBarHtml({
            currentValue: subjectScore(containerData, 'Insights'),
            maxValue: 25,
            subject: 'Insights',
            barColor: '#ffbc89',
        })}
        <div class="ta-result-summary_small-header">
            ${renderSummaryScoreTitle(totalScore)}
        </div>
        <div class="ta-result-summary_small-text">
            ${renderSummaryScoreText(totalScore)}
        </div>
        <a href="https://app.wixanswers.com/mk-signup" >
            <button class="ta-result-summary_button">
                Try for free
            </button>
        </a>
        <div class="ta-result-summary_disclaimer">
            No credit card needed
        </div>
    </div>
    `;
}

function renderDetailsHeaderTitleHtml(fullName, totalScore) {
    return `
        ${fullName || 'Hey'}, 
        ${renderDetailsScoreTitle(totalScore)}
    `;
}

async function init() {
    const userFullData = getParamData();
    const usersAnswers = userFullData.answers;
    const answersData = await getAnswersData();
    const usersAnswersData = mapUsersAnswers(usersAnswers, answersData);
    const totalScore = usersAnswersData.reduce(
        (acc, value) => acc + value.score,
        0
    );
    const subjects = usersAnswersData
        .map((x) => x.subject)
        .reduce(
            (unique, item) =>
                unique.includes(item) ? unique : [...unique, item],
            []
        );
    const DetailsContainerHtml = subjects
        .map((subject) =>
            usersAnswersData.filter((answer) => answer.subject === subject)
        )
        .map(renderDetailsContainerHtml)
        .join('');
    const summaryContainerHtml = renderSummaryContainerHtml(
        usersAnswersData,
        userFullData.fullName,
        userFullData.company
    );
    document.querySelector(
        '.ta-result-summary-container'
    ).innerHTML = summaryContainerHtml;
    document.querySelector(
        '.ta-result-details-containers-wrapper'
    ).innerHTML = DetailsContainerHtml;
    document.querySelector(
        '.ta-result-details-header_title'
    ).innerHTML = renderDetailsHeaderTitleHtml(
        userFullData.fullName,
        totalScore
    );
    document.querySelector(
        '.ta-result-details-header_subtitle'
    ).innerHTML = renderDetailsScoreSubtitle(totalScore);
    document.querySelector(
        '.ta-loader-container'
    ).style = "display: none";
    document.querySelector(
        '.ta-results-container'
    ).style = "display: grid";
}
