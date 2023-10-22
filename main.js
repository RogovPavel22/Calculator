// Нахожу тег "p" (он будет отображать результаты вычислений в браузере)
const display = document.querySelector('p')

// Объявляю 2 переменные. Все вычисления будут проозводиться в "mainStr",
// а переменная "extraStr" будет ей в этом помогать, для более крректного результата.
// Переменная "display" будет принимать значения одной из двух этих переменнных, в зависимости от ситуации.
let mainStr = '';
let extraStr = '';


// Прослушиваю событие 'click' по кнопкам и описываю поведение каждой кнопки или группы кнопок
document.addEventListener('click', (e) => {
    if (e.target.dataset.btn != undefined) {

        const btnValue = e.target.textContent;

        switch(btnValue) {
            case "" + btnValue.match(/[0-9]/):
                if (extraStr == '' && btnValue == "0") {
                    extraStr = '';
                } else {
                    extraStr += btnValue;
                    display.textContent = extraStr;
                };
                break;
            case "" + btnValue.match(/[+]|[-]|[*]|[/]/):
                if (!/[+]$|[-]$|[*]$|[/]$/.test(mainStr)) {
                    mainStr += extraStr + btnValue;
                    extraStr = '';
                } else {
                    if (extraStr != '') {
                        mainStr = '' + (eval(mainStr + extraStr));
                        display.textContent = mainStr;
                        mainStr += btnValue;
                        extraStr = '';
                    } else {
                        mainStr = mainStr.slice(0, -1) + btnValue;
                    };
                }
                break;
            case ".":
                if (!/[.]/.test(extraStr)) {
                    extraStr == '' ? extraStr = '0.' : extraStr += '.';
                    display.textContent = extraStr;
                }
            break;
            case "=":
                mainStr += extraStr;
                mainStr.length == 0 ? mainStr = '' : mainStr = '' + (eval(mainStr));
                extraStr = '';
                mainStr ? display.textContent = mainStr : display.textContent = '0';
            break;
            case "C":
                mainStr = '';
                extraStr = '';
                display.textContent = "0";
            break;
            case "←":
                extraStr = extraStr.slice(0, -1);
                extraStr.length == 0 ?  display.textContent = "0" : display.textContent = extraStr;
            break;
        };
    };
});
