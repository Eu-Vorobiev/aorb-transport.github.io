let inputTel = document.querySelectorAll("input[type=tel]");
let modal = document.querySelector(".modal");
let formMask = document.querySelector(".form--mask");

let im = new Inputmask("+7 999 999 99 99");
im.mask(inputTel);

grecaptcha.ready(function() {
    grecaptcha.execute('6Ld__EscAAAAALt6SylFoLntxZXC-KjhwuV3nIvx', {action: 'homepage'}).then(function(token) {
        document.getElementById('token').value = token
    });
});

new JustValidate('.form', {
  rules: {
    company: {
      required: true,
      minLength: 2
    },
    name: {
      required: true,
      minLength: 2
    },
    tel: {
      required: true
    },
  },
  messages: {
    company: {
      required: 'Вам необходимо ввести название компании',
      minLength: 'Минимум 2 символа'
    },
    name: {
      required: 'Вам необходимо указать свое имя',
      minLength: 'Минимум 2 символов'
    },
    tel: {
      required: 'Введите номер в указанном формате'
    }
  },

  submitHandler: function (form) {
    let xhr = new XMLHttpRequest();
    let formData = new FormData(form);

    xhr.open("POST", 'mail.php', true);

    xhr.addEventListener("load", function () {
      if (xhr.readyState === 4) {
        switch (xhr.status) {
          case 200:
            console.log("YES");
            form.reset();
            successForm();
            break;
          case 404:
            console.log("NO");
            break;
          default:
            console.log("ERROR");
            break;
        };
      };
    });
    xhr.send(formData);
  },
});

function successForm() {
  modal.classList.add("success");
  formMask.classList.add("active");
  setInterval(() => {
    modal.classList.remove("success");
    formMask.classList.remove("active");
  }, 2500);
}