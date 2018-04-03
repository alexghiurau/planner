window.addEventListener('load', init);
const elMain = document.querySelector('main');

function init() {
  document.getElementById('submit').addEventListener('click', submitWeek);
  loadWeeks();
}

async function loadWeeks() {
  try {
    elMain.classList.add('loading');
    const url = '/api/weeks';

    const response = await fetch(url);
    if (!response.ok) throw response;
    elMain.classList.remove('loading');
    putWeeksInPage(await response.json());
  } catch (e) {
    console.error('Error getting weeks', e);
    elMain.classList.remove('loading');
    elMain.classList.add('error');
  }
}

// iterates through each week and adds it to the page
function putWeeksInPage(weeks) {
  // clear old weeks
  for (const old of elMain.querySelectorAll('section.week')) {
    old.remove();
  }

  // add weeks into page
  weeks.forEach((week) => {
    const template = document.querySelector('#week_t');
    const newEl = document.importNode(template.content, true);

    newEl.querySelector('p.weekNoT').textContent = week.weekNo;
    newEl.querySelector('p.lecTopicT').textContent = week.lecTopic;
    newEl.querySelector('p.labTopicT').textContent = week.labTopic;
    newEl.querySelector('p.semTopicT').textContent = week.semTopic;
    newEl.querySelector('p.resourcesT').textContent = week.resources;

    newEl.querySelector('div.delete').dataset.id = week.weekNo;
    newEl.querySelector('div.delete').onclick = requestDelete;

    newEl.querySelector('div.save').dataset.id = week.weekNo;
    newEl.querySelector('div.save').onclick = requestUpdate;

    elMain.appendChild(newEl);
  });
}

async function submitWeek() {
  const weekNoEl = document.getElementById('weekNo');
  const lecTopEl = document.getElementById('lecTopic');
  const labTopEl = document.getElementById('labTopic');
  const semTopEl = document.getElementById('semTopic');
  const resEl = document.getElementById('resources');

  let url = '/api/weeks';

  url += '?weekNo=' + encodeURIComponent(weekNoEl.value);
  url += '&lecTopic=' + encodeURIComponent(lecTopEl.value);
  url += '&labTopic=' + encodeURIComponent(labTopEl.value);
  url += '&semTopic=' + encodeURIComponent(semTopEl.value);
  url += '&resources=' + encodeURIComponent(resEl.value);

  // stops the weekNo increment in case these parameters are omitted
  if (!weekNoEl.value || !lecTopEl.value || !labTopEl.value) {
    window.alert('Must provide week number, lecture and lab topics.');
    lecTopEl.focus();
    return;
  }

  const response = await fetch(url, {
    method: 'POST',
  });
  if (!response.ok) throw response;

  // reset the form and set listbox index to match next week
  document.getElementById('addWeekForm').reset();
  weekNoEl.selectedIndex = elMain.childElementCount;
  lecTopEl.focus();

  loadWeeks();
}

async function requestUpdate(e) {
  const elToUpdate = e.target.parentElement;

  // ensure valid values are provided when updating a week
  if (!elToUpdate) {
    console.error('elToUpdate not provided');
    return;
  } else if (elToUpdate.querySelector('p.weekNoT').textContent <= 0 ||
    elToUpdate.querySelector('p.weekNoT').textContent > 24) {
    window.alert('Week number must be between 1 and 24.');
    return;
  } else if (!elToUpdate.querySelector('p.weekNoT').textContent ||
    !elToUpdate.querySelector('p.lecTopicT').textContent ||
    !elToUpdate.querySelector('p.labTopicT').textContent) {
    window.alert('Must provide week number, lecture and lab topics.');
    return;
  }

  let url = '/api/weeks';

  url += '?weekNo=' + encodeURIComponent(elToUpdate.querySelector('p.weekNoT').textContent);
  url += '&lecTopic=' + encodeURIComponent(elToUpdate.querySelector('p.lecTopicT').textContent);
  url += '&labTopic=' + encodeURIComponent(elToUpdate.querySelector('p.labTopicT').textContent);
  url += '&semTopic=' + encodeURIComponent(elToUpdate.querySelector('p.semTopicT').textContent);
  url += '&resources=' + encodeURIComponent(elToUpdate.querySelector('p.resourcesT').textContent);
  url += '&old=' + encodeURIComponent(e.target.dataset.id);

  const response = await fetch(url, {
    method: 'PUT',
  });
  if (!response.ok) throw response;

  loadWeeks();
}

async function requestDelete(e) {
  if (e.target.dataset.id && window.confirm('Wish to delete week ' + e.target.dataset.id + '?')) {
    await fetch('/api/weeks/' + e.target.dataset.id, {
      method: 'DELETE',
    });

    loadWeeks();
  }
}
