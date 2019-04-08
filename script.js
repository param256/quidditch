var form = document.getElementById('form');
var register = document.getElementById('register');

var fieldPositionErrorMessage = document.getElementById('field-position-error-message'); //ошибка с невыбранной позицией на поле
var ballErrorMessage = document.getElementById('ball-error-message'); //ошибка с невыбранном любимым мячом
var facultyErrorMessage = document.getElementById('faculty-error-message'); //ошибка с невыбранным факультетом
var firstNameErrorMessage = document.getElementById('first-name-error-message'); //ошибка с незаполненной фамилией
var lastNameErrorMessage = document.getElementById('last-name-error-message'); //ошибка с незаполненным именем

var fileErrorMessage = document.getElementById('file-error-message'); //ошибка с расширением файла или отсутствием расширения
var addFileErrorMessage = document.getElementById('add-file-error-message'); //ошибка с отсутствием самого файла

var fileInput = document.getElementById('file');
var photo = document.getElementById('photo');

var lastName = document.getElementById('last-name');
var firstName = document.getElementById('first-name');

//обратобка загружаемого файла
fileInput.onchange = function fileInputChange(event) { 
    var file = this.files[0];

    //обнуление, чтобы не показывалась предыдущая картинка и чтобы вместо иконки с разорванной картинкой было серое поле. 
    photo.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAQAAADTdEb+AAACIklEQVR42u3SQQ0AAAjEMM6/NTyBCRI+rYRl6Sk4F2NhLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC2OJgLEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWxjIWxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJYGAuMhbEwFhgLY2EsMBbGwlgYy1gYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY/FvAd6jGy+nkXYXAAAAAElFTkSuQmCC';


    //если вызвали меню выбора файла, но не выбрали ничего. здесь юзер не увидит текста об ошибке, 
    //т.к. юзер может, например, закрыть меню, 
    //чтобы в другом месте перенести файл с фото. ошибку он получит, 
    //когда попробует нажать на кнопку, так и не загрузив файл - это будет обрабатываться ниже по коду
    if (!file) {
        return; //не выполнять дальше функцию по обработке файла, если файла нет
    }
    
    //если у файла нет расширения
    if (!file.name.includes('.')) {
        fileErrorMessage.classList.remove('message-hidden');
        return;
    }

    //найти расширение файла
    var extension = file.name.split('.').pop();

    //если расширение неправильное
    if (!['jpg', 'png'].includes(extension)) {
        fileErrorMessage.classList.remove('message-hidden');
        return;
    }

    var reader = new FileReader(); //взяла из примера с занятия

    reader.onload = function(event) {
        photo.src = event.target.result;
    }

    reader.readAsDataURL(this.files[0]);

    fileErrorMessage.classList.add('message-hidden');
};


//проверка, выбрано ли что-то в каждом пункте при нажатии на кнопку регистрации
form.onsubmit = function(event) {
    
    //в массив будут записаны все чекнутые чекбоксы на момент нажатия кнопки регистрации    
    var fieldPositions = []; 
    document.getElementsByName('field-position').forEach(function(item){
        if (item.checked) {
            fieldPositions.push(item); 
        }    
    });

    //если массив пуст, т.е. нет чекнутых чекбоксов - то выдать сообщение об ошибке
    if (fieldPositions.length === 0) { 
        event.preventDefault();
        
        fieldPositionErrorMessage.classList.remove('message-hidden');
    } else { 
        fieldPositionErrorMessage.classList.add('message-hidden');
    };

    //в массив записывается чекнутая радио кнопка
    var faveBalls = []; 
    document.getElementsByName('fave-ball').forEach(function(item){
        if (item.checked) {
            faveBalls.push(item); 
        }    
    });

    //если радио кнока не чекнута - выдать соообщение об ошибке
    if (faveBalls.length === 0) { 
        event.preventDefault();
        ballErrorMessage.classList.remove('message-hidden');
    } else {
        ballErrorMessage.classList.add('message-hidden');
    };

    //select с факультетами
    var faculties = document.getElementById('faculty'); 

    //если значение в селекте пустое, т.е. ничего не выбрано - то выдать сообщение об ошибке
    if (faculties.value === "") { 
        event.preventDefault();
        facultyErrorMessage.classList.remove('message-hidden');
    } else {
        facultyErrorMessage.classList.add('message-hidden');
    };

    //если фамилия не заполнена - выдать сообщение об ошибке
    if (lastName.value === "") { 
        event.preventDefault();
        lastNameErrorMessage.classList.remove('message-hidden');
    } else {
        lastNameErrorMessage.classList.add('message-hidden');
    };

    //если имя не заполнено - выдать сообщение об ошибке
    if (firstName.value === "") { 
        event.preventDefault();
        firstNameErrorMessage.classList.remove('message-hidden');
    } else {
        firstNameErrorMessage.classList.add('message-hidden');
    };
    
    //если нет файла или файл есть, но с неправильным расширением - то выдать сообщение об ошибке
    if ((fileInput.value === "") || (!fileErrorMessage.classList.value.includes('message-hidden'))) { 
        event.preventDefault();
        addFileErrorMessage.classList.remove('message-hidden');
    } else {
        addFileErrorMessage.classList.add('message-hidden');
    };

};


