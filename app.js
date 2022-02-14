// documentを使って、HTMLファイルにアクセスしている。
// getElementByIdでIDを指定している。
const spanDate = document.getElementById('date');
const spanMonth = document.getElementById('month'); 
const spanYear = document.getElementById('year');
const spanWeekday = document.getElementById('weekday');

function loadbody() {
  console.log('body is laoded');
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

// signUp
const signupForm = document.getElementById('signup-form');
// 対象要素.addEventListener( イベントの種類, 関数, false )
// 上で取得した、signup-form要素のsubmitが押された時
// 2番目の引数に指定した関数が発火する
signupForm.addEventListener('submit', e=>{
  e.preventDefault();
  // signupForm['獲得したい値のidを指定する']
  const name = signupForm['name'].value;
  const email = signupForm['email'].value;
  const password = signupForm['password'].value;
  console.log(name, email, password);
  signupForm.reset();
  auth.createUserWithEmailAndPassword(email, password).then(cred=>{
    return db.collection('people').doc(cred.user.uid).set({
      Name: name,
      Email: email,
      Password: password,
    }).then(() => {
      console.log('ログインに成功しました。');
      location = 'index.html';
    }).catch(err => {
      console.log(err.message);
      const signupError = document.getElementById('signupError');
      signupError.innerText = err.message;
      console.log('ログインに失敗しました。');
    }).catch(err => {
      console.log(err.message);
      const signupError2 = document.getElementById('signupError2');
      signupError2.innerText = err.message;
      console.log('ログインに失敗しました。');
    });
  });
});






