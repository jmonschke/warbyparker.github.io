var providers = [
  'gmail.com',
  'ymail.com',
  'yahoo.com',
  'hotmail.com',
  'me.com',
  'warbyparker.com',
  'icloud.com'
];

// var providers = [
//   'gmail.com',
//   'ymail.com',
//   'yahoo.com',
//   'hotmail.com',
//   'att.net',
//   'comcast.com',
//   'outlook.com',
//   'inbox.com',
//   'hushmail.com',
//   'aol.com',
//   'easy.com',
//   'sky.com',
//   'caramail.com',
//   'care2.com',
//   'fastmail.com',
//   'mail.com',
//   'mail2web.com',
//   'mailinater.com',
//   'mail.lycos.com',
//   'fastmail.fm',
//   'dodgeit.com',
//   'example.com',
//   'example.org',
//   'test.com',
//   'me.com',
//   'icloud.com'
// ];

var datalist   = document.createElement('datalist'),
    emailInput = document.getElementById('email'),
    listReady  = false,
    option;

var createOption = function(optionVal) {
  option = document.createElement('option');
  option.appendChild(document.createTextNode(optionVal));
  return option;
};

var addOption = function(val) {
  providers.forEach(function(i) {
    datalist.appendChild(createOption(val + i));
  })
};

if (typeof emailInput.addEventListener != 'undefined') {
  emailInput.addEventListener('keyup', function(e) {

    // checking for @ symbol or 2 key, as the keyCode could reflect the key without shift
    
    if (e.keyCode === 50 || e.keyCode === 220) {
      datalist.id = email.getAttribute('list');
      document.body.appendChild(datalist);
      listReady = true;
    }
    if (listReady) {
      datalist.innerHTML = '';
      addOption(this.value.replace(/@.+$/, '@'));
    }
  }, false);
}
