// 初始化 LeanCloud
var { Query, User } = AV;
AV.init({
  appId: 'HiLEQW3JY361nRTpUYIdu8V3-gzGzoHsz',
  appKey: 'xDW9CgvGM3XNWt5eFp7AOBRA',
  serverURL: 'https://hileqw3j.lc-cn-n1-shared.com',
});

// 留言表单提交事件处理
document.getElementById('messageForm').addEventListener('submit', function(event) {
  event.preventDefault(); // 阻止表单提交的默认行为

  var name = document.getElementById('nameInput').value;
  var message = document.getElementById('messageInput').value;

  var now = new Date();
  var time = now.toUTCString();

  // 创建一个名为 "Message" 的 LeanCloud 对象
  var Message = AV.Object.extend('Message');
  var newMessage = new Message();
  newMessage.set('name', name);
  newMessage.set('message', message);
  newMessage.set('time',time);

  newMessage.save().then(function() {
    // 清空表单字段
    document.getElementById('messageInput').value = '';

    // 更新留言列表
    updateMessageList();
  }).catch(function(error) {
    console.error('Failed to save message: ' + error.message);
  });
});

// 注册表单提交事件处理
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); // 阻止表单提交的默认行为

  var email = document.getElementById('emailInput').value;
  var password = document.getElementById('passwordInput').value;

  // 创建 LeanCloud 用户
  var user = new AV.User();
  user.setUsername(email);
  user.setPassword(password);

  user.signUp().then(function() {
    // 注册成功
    console.log('User signed up successfully!');
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";
    alert("注册成功！欢迎您的加入！");
  }).catch(function(error) {
    console.error('Failed to sign up: ' + error.message);
  });
});

// 更新留言列表
function updateMessageList() {
  var query = new AV.Query('Message');
  query.find().then(function(messages) {
    var messageList = document.getElementById('messageList');
    messageList.innerHTML = ''; // 清空留言列表

    // 遍历留言，并在列表中显示
    for (var i = 0; i < messages.length; i++) {
      var name = messages[i].get('name');
      var message = messages[i].get('message');
      var time = message[i].get('name');

      var listItem = document.createElement('li');
      listItem.textContent = name + ': ' + message + '            ----' + time;

      messageList.appendChild(listItem);
    }
  }).catch(function(error) {
    console.error('Failed to fetch messages: ' + error.message);
  });
}

// 页面加载完成后，更新留言列表
document.addEventListener('DOMContentLoaded', function() {
  updateMessageList();
});
