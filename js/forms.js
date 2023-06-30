


const FORM__URL = './mail.php';
const ANSWER = 'Спасибо, ваша заявка принята! Мы перезвоним вам в ближайшее время!';

const maskOptions = {
    mask: '+{7} (000) 000-00-00',
    lazy: true,
    placeholderChar: '_'
};


$(document).ready (() => {

    // Set iMask to Phone Inputs
    $('[imask=phone]').each((index, element) => {
        const mask = IMask(element, maskOptions);
        // Bind to element
        element.imask = mask;
        // Show only on focus
        $(element).on('focus', () => {
            mask.updateOptions ({
                lazy: false
            });
        });
        // Hide on blur
        $(element).on('blur', () => {
            mask.updateOptions ({
                lazy: true
            });
        });
    });

    // Sending mail by submit
    $('form').on('submit', e => {
        e.preventDefault();
        e.stopPropagation();
        const phoneField = $(e.target).find('[name=phone]')[0];
        const nameField = $(e.target).find('[name=name]')[0];
        // Check phone
        if (phoneField && phoneField.imask && phoneField.imask._selection.end != 18) {
            showPopup (
                'Ошибка',
                'Введите номер телефона'
                );
            return;
        }
        // Check name
        if (nameField) {
            const nameValue = nameField.value;
            if (nameValue.length < 2) {
                showPopup (
                    'Ошибка',
                    'Введите имя'
                    );
                return;
            }
        }
        // Send Form
        var data = $(e.target).serialize();
        $.post(FORM__URL, data, e => {
            try {
                const res = JSON.parse(e);
                console.log (res)
                if (!res.success) throw new Error(res.error || 'Неизвестная ошибка почтового сервера');
                showPopup (
                    'Письмо отправлено',
                    ANSWER
                );
            } catch (e) {
                showPopup (
                    'Ошибка',
                    e.message || 'Ошибка сервера'
                );
                return;
            }
        });
    });

});