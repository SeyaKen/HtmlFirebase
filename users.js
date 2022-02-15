// documentを使って、HTMLファイルにアクセスしている。
// getElementByIdでIDを指定している。
const spanDate = document.getElementById('date');
const spanMonth = document.getElementById('month'); 
const spanYear = document.getElementById('year');
const spanWeekday = document.getElementById('weekday');
// const spanUsername = document.getElementById('username');

function loadbody() {
  // spanUsername.innerText = '瀬谷　剣';
  // console.log('body is laoded');
  const data = new Date();
  console.log(`data:${data}`);
  const month = data.toLocaleString('ja-JP', {month:'long'});
  console.log(`month:${month}`);
  const year = data.getFullYear() + '年';
  console.log(`year:${year}`);
  var dat = new Date(data);
  const weekday = dat.toLocaleDateString('ja-JP', {weekday: 'long'});
  console.log(`weekday:${weekday}`);
  const myDate = data.getDate()  + '日';
  console.log(myDate);

  spanDate.innerText=myDate;
  spanMonth.innerText=month;
  spanYear.innerText=year;
  spanWeekday.innerText=weekday;
} 

// ユーザーがログインしているか確認
auth.onAuthStateChanged(user=>{
  if(user) {
    console.log('ログイン済み');
  } else {
    alert('ログインしていません。');
    location = 'login.html';
  }
});

// ユーザの名前を回収する
auth.onAuthStateChanged(user=>{
  if(user) {
    const username = document.getElementById('username');
    fs.collection('users').doc(user.uid).get().then(snapshot=>{
      username.innerText = snapshot.data().Name + 'さん';
    });
  }
});

// adding todos
const form = document.getElementById('form');
const date = new Date();
const time = date.getTime();
let counter = time;
form.addEventListener('submit', e=>{
  e.preventDefault();
  const todos = form['todos'].value;
  let id = counter += 1;
  form.reset();
  auth.onAuthStateChanged(user=>{
    if(user) {
      fs.collection('users').doc('_' + id).set({
        id: '_' + id,
        todos,
      }).then(() => {
        console.log('todo added');
      }).catch(err=>{
        console.log(err.message);
      });
    }
  });
});







