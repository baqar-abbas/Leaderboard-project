import './index.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/dfixTZ2ItuQBwA7JrbW1/scores';

const postData = async (user, score) => {
  const res = await fetch(url,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ user, score }),
    });
  const data = await res.json();
  return data.result;
};

const getData = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data.result;
};

const displayOnUI = (data) => {
//   const data = await getData();
  const ul = document.querySelector('.displayScore');
  ul.innerHTML = '';
  data.forEach((users) => {
    const li = document.createElement('li');
    li.innerText = ` ${users.user} : ${users.score} `;
    ul.appendChild(li);
  });
};

const refresh = async () => {
  const data = await getData();
  displayOnUI(data);
};

const form = document.querySelector('.form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { user, score } = form.elements;
  await postData(user.value, score.value);
  refresh();
  form.reset();
});

const refreshBtn = document.querySelector('.refreshbtn');
refreshBtn.addEventListener('click', () => {
  window.location.reload();
  refresh();
});

refresh();
