// documentを使って、HTMLファイルにアクセスしている。
// getElementByIdでIDを指定している。
const spanDate = document.getElementById('date');
const spanMonth = document.getElementById('month'); 
const spanYear = document.getElementById('year');
const spanWeekday = document.getElementById('weekday');
const todoContainer = document.getElementById('todo-container');
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

function renderData(individualDoc) {
  let parentDiv = document.createElement('div');
  parentDiv.className = 'container todo-box';
  // data-idという属性をここで付加している。
  parentDiv.setAttribute('data-id', individualDoc.id);

  // todo div
  let todoDiv = document.createElement('div');
  todoDiv.textContent = individualDoc.data().todos;

  // button to delete todos
  let trash = document.createElement('button');
  // font awesome trash icon
  let i = document.createElement('i');
  i.className = 'fas fa-trash';

  // foo.appendChild()はfooの一番最後に()内の要素を追加する。
  trash.appendChild(i);
  parentDiv.appendChild(todoDiv);
  parentDiv.appendChild(trash);
  todoContainer.appendChild(parentDiv);

  trash.addEventListener('click', e=>{
    // data-idの中にはindividualDoc.idが入っている。
    let id = e.target.parentElement.parentElement.getAttribute('data-id');

    // onAuthStateChangedでユーザがログインしているのか、いるのかいないのかをチェックしている。
    auth.onAuthStateChanged(user=>{
      if(user) {
        fs.collection(user.uid).doc(id).delete();
      };
    });
  });
};

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
      fs.collection(user.uid).doc('_' + id).set({
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

// Flutterのstreambuilderみたいなやつ
auth.onAuthStateChanged(user=>{
  if(user) {
    fs.collection(user.uid).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change=> {
        if(change.type == 'added') {
          // 上で作った関数を使って、新しくHTMLの要素
          // （今回の場合はdiv）とか？を生成
          renderData(change.doc);
        } else if(change.type == 'removed') {
          // querySelector()	指定した要素のうち、
          // 最初に見つかった要素 ( 1 つだけ)を返す。
          // 今回は属性を指定している。
          let li = todoContainer.querySelector('[data-id=' + change.doc.id + ']');
          todoContainer.removeChild(li);
        }
      });
    });
  };
});

function logout() {
  auth.signOut();
}





