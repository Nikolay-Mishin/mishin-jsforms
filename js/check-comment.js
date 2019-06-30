$(document).ready(function () {
	var check_comment = (function () {
        // Переменные модуля
        var isValid = true,
            _button = $('#button'),
            formGroup,
            tooltip;

        // Метод инициализации (запуска) модуля
        var init = function () {
            _sayHello(); // Запускаем модули которые должны стартовать при запуске модуля
            _setUpListeners(); // Запускаем прослушку событий
        };

        // Метод прослушки событий
		// В нем прослушиваем события на странице, например клики по кнопкам, и при срабатывании события запускаем нужный метод нашего модуля
        var _setUpListeners = function () {
            _button.on('click', _validateForm).on('click', _sendEmail);
        };

        // Приватные методы

        var _sayHello = function () {
			console.log('Hello from _sayHello()');
		};

        var _validateForm = function (e) {
            e.preventDefault();
            console.log('private method _validateForm - runs');

            var inputs = $('input, textarea'),
                valid = true;

            // Loop through each input field
            $.each(inputs, function (i, val) {
                var input = $(val),
                    value = input.val().trim();
                formGroup = input.parents('.form__group');
                tooltip = $('<div class="notify notify--error">Комментарий не может быть пустым</div>');

                if (value.length === 0) {
                    // Show errors
                    _showError();
                    valid = false;
                }
                else {
                    _hideError();
                }

                // Hide errors
                input.on('focus', function () {
                    _hideError();
                });
                input.on('keydown', function () {
                    _hideError();
                });
            });

            isValid = valid;
        };

        var _sendEmail = function () {
            console.log('formValidation.isValid = ' + isValid);
            if (isValid === true) {
                console.log('Sending form!');
            }
            else {
                console.log('Validation FAILED!');
            }
        };

        var _showError = function () {
            formGroup.find('.notify--error').remove();
            tooltip.appendTo(formGroup);
        };

        var _hideError = function () {
            formGroup.find('.notify--error').remove();
        };

        // Возвращаем публичные медоты, которые будут доступны снаружи
		return {
			isValid,
            init
		};
	}());

    // Запускаем модуль
    check_comment.init();
});