// ��ʼ�� LeanCloud
var { Query, User } = AV;
AV.init({
  appId: 'HiLEQW3JY361nRTpUYIdu8V3-gzGzoHsz',
  appKey: 'xDW9CgvGM3XNWt5eFp7AOBRA',
  serverURL: 'https://hileqw3j.lc-cn-n1-shared.com',
});

// ���Ա��ύ�¼�����
document.getElementById('messageForm').addEventListener('submit', function(event) {
  event.preventDefault(); // ��ֹ���ύ��Ĭ����Ϊ

  var name = document.getElementById('nameInput').value;
  var message = document.getElementById('messageInput').value;

  const now = new Date();
  const formattedTime = now.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).replace(/[^\\d]/g, '');
  var time = formattedTime;



  // ����һ����Ϊ "Message" �� LeanCloud ����
  var Message = AV.Object.extend('Message');
  var newMessage = new Message();
  newMessage.set('name', name);
  newMessage.set('message', message);
  newMessage.set('time',time);

  newMessage.save().then(function() {
    // ��ձ��ֶ�
    document.getElementById('messageInput').value = '';

    // ���������б�
    updateMessageList();
  }).catch(function(error) {
    console.error('Failed to save message: ' + error.message);
  });
});

// ע����ύ�¼�����
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); // ��ֹ���ύ��Ĭ����Ϊ

  var email = document.getElementById('emailInput').value;
  var password = document.getElementById('passwordInput').value;

  // ���� LeanCloud �û�
  var user = new AV.User();
  user.setUsername(email);
  user.setPassword(password);

  user.signUp().then(function() {
    // ע��ɹ�
    console.log('User signed up successfully!');
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";
    alert("ע��ɹ�����ӭ���ļ��룡");
  }).catch(function(error) {
    console.error('Failed to sign up: ' + error.message);
  });
});

// ���������б�
function updateMessageList() {
  var query = new AV.Query('Message');
  query.find().then(function(messages) {
    var messageList = document.getElementById('messageList');
    messageList.innerHTML = ''; // ��������б�

    // �������ԣ������б�����ʾ
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

// ҳ�������ɺ󣬸��������б�
document.addEventListener('DOMContentLoaded', function() {
  updateMessageList();
});