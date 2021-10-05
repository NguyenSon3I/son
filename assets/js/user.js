;
(function($, window, document, undefined) {
    'use strict';

    var WUSER = window.WUSER || {};

    WUSER.LOGIN = function() {
        $('#tb-login-submit').on('click', function() {
            $.ajax({
                type: 'POST',
                url: iii_script.ajax_url + '?action=iii_notepad_worksheet_check_user_login',
                data: $('#tb-login-form').serialize(),
                dataType: 'json',
                beforeSend: function() {
                    $('#cc-loading').addClass('open');
                },
                success: function(response) {
                    $('#cc-loading').removeClass('open');

                    if (response.code === '1') {
                        alert(response.content);
                    } else if (response.code === '2') {
                        window.location.reload();
                    }
                }
            });
        });
    };

    WUSER.BTN = function() {
        $('.tb-login-btn').on('click', function(el) {
            el.preventDefault();

            $('.tb-login-popup').removeClass('hidden');
        });

        $('#tb-login-cancel').on('click', function() {
            $('.tb-login-popup').addClass('hidden');
            $('#user_login').val('');
            $('#user_pass').val('');
        });
    };

    $(document).ready(function() {
        WUSER.LOGIN();
        WUSER.BTN();
    });
})(jQuery, window, document);