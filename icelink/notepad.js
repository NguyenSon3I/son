; (function ($, window, document, undefined) {
    'use strict';
 
    var url = 'http://117.6.131.222:6869';
    // var url         = 'http://localhost:8000';//'https://notepad.iktutor.com:3000';
    var plugin_url = 'https://notepad.s-work.vn/v2/';
    var stanza = 999999; 

    var controlpencil = true;
    var controlrubber = false;
    var positionx = '0';
    var positiony = '0';
    var lastEmit = $.now();
    var touchX, touchY;

    var divrubber = $('#divrubber');

    // A flag for drawing activity
    var drawing = false;
    var cursors = {};
    var dragging = false;

    //  funzione richiesta di nick name
    var username;

    var id = username = Math.round($.now() * Math.random());
    if (!username) {
        username = prompt("Hey there, insert your nick name, please", "");
    }
    var totalSeconds = 0;
    var idtempo;

    var undo_list = [];
    var $state = [];

    var history = function () { };
    var iStep = -1;

    history.saveState = function () {
        iStep++;

        if (iStep < undo_list.length) {
            undo_list.length = iStep;
        }

        var cnt = getCanvas();
        var can = document.getElementById("math4");

        undo_list.push(can.toDataURL());
    };

    history.undo = function () {
        if (iStep > 0) {
            iStep--;

            history.restoreState();
        }
    };
    

    history.redo = function () {
        if (iStep < undo_list.length - 1) {
            iStep++;

            history.restoreState();
        }
    };

    history.restoreState = function () {
        var cnt = getCanvas();
        var can = document.getElementById("math4");
        var ctxcan = can.getContext('2d');
        ctxcan.clearRect(0, 0, can.width, can.height);

        var imgdaclient = new Image();
        imgdaclient.src = undo_list[iStep];
        imgdaclient.onload = function () {
            ctxcan.drawImage(imgdaclient, 0, 0);
        }
    };
    var click_event = document.ontouchstart ? 'touchstart' : 'click';

    var webSyncHandleUrl = 'https://websync.s-work.vn/websync.ashx';
    fm.websync.client.enableMultiple = true;
    var clients = new fm.websync.client(webSyncHandleUrl);
    var testichat = document.getElementById('testichat');
    var cnt = 0;

    loadChat('Tutor', stanza, clients, testichat);
    getSubscribe(clients, stanza, testichat);


    $(function () {
        var sidemenu = $('.opacitySideMenu');
        var tray_menu = $('.menu-tray');
        var $task_wrap = $('.taskbar-notepad');

        $task_wrap.find('.tool-btn').on('click', function () {
            var $this = $(this);

            $('.tooltip-wrap').removeClass('show-tt');

            var cnt = getCanvas();
            $('#panel').find('.typing-input').remove();
            $('#add-type-box').removeClass('active');
            


            if ($this.hasClass('active')) {
                $this.removeClass('active');
                $this.next('.tool-submenu').addClass('hidden');

                tray_menu.removeClass('has-submenutool');
                sidemenu.removeClass('has-submenutool');
            } else {
                $task_wrap.find('.tool-btn').removeClass('active');
                $task_wrap.find('.tool-submenu').addClass('hidden');

                $this.addClass('active');
                $this.next('.tool-submenu').removeClass('hidden');

                tray_menu.addClass('has-submenutool');
                sidemenu.addClass('has-submenutool');
            }
        });

        var timeout;
        $('.tooltip-wrap').on('mouseenter', function () {
            var $thisElement = $(this);

            if (timeout != null) { clearTimeout(timeout); }

            timeout = setTimeout(function () {
                $('.tooltip-wrap').removeClass('show-tt');
                $thisElement.addClass('show-tt');
            }, 1000)
        });

        $('.tooltip-wrap').on('mouseleave', function () {
            if (timeout != null) {
                clearTimeout(timeout);
                timeout = null;
            }
        });

        $(window).on('mouseover', function () {
            $('.tooltip-wrap').removeClass('show-tt');
        });

        $('#change-eraser').on('click', function () {
            $('#divrubber').css({ "display": "block", "width": "30px", "height": "30px", "visibility": "visible" });
            $('#controlrubber').addClass('css-cursor-30');
            $("#erasers-body").find(`[data-eraser='30']`).addClass('active');

            canEraser();
        });

        // $('#change-size-pencil').on('click', function () {

        //     // $(this).addClass('active');
        //     // var cnt = getCanvas();

        //     // $("#erasers-body li").removeClass('active');
        //     // $('#divrubber').css("display", "none");
        //     // canDraw();

        //     // if (parseInt($(this).attr('data-layer')) === (cnt - 3)) {
        //     //     return;
        //     // }

        //     // $(this).attr('data-layer', cnt - 3);
        // });

        //display screenshots
        $("#icon-screenshot").click(function () {
            var check = $('.screenshot-class').hasClass("hidden");
            if (check == true) {
                $('.screenshot-class').removeClass("hidden");
            } else {
                $('.screenshot-class').addClass("hidden");
            }
        });
        
        //onscreen typing tool
        $("#add-type-box").on(click_event, function () {
            var cnt = getCanvas();
            var next = (parseInt(cnt) + 1);
            var can = document.getElementById("math4");
            $('#math4').unbind(click_event, TypingCreatTextarea);
            can.removeEventListener('touchstart', TypingCreatTextareaTouchDevice);

            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $('#change-size-pencil').removeClass('active');
                $('#math4').bind(click_event, TypingCreatTextarea);
                can.addEventListener('touchstart', TypingCreatTextareaTouchDevice);
            } else {
                $(this).removeClass('active');
                 $('#change-size-pencil').addClass('active');
                $('#math4').unbind(click_event, TypingCreatTextarea);
               can.removeEventListener('touchstart', TypingCreatTextareaTouchDevice);
                $('#panel').find('.typing-input').remove();
            }
        });

        // Sheet in Notepad
        $('#open-list-sheet').on('click', function () {
            $('.notepad-sheet-search').removeClass('hidden').addClass('active');
        });

        $('.wls-close').on('click', function () {
            $('.notepad-sheet-search').removeClass('active').addClass('hidden');
        });

        $('.wls-open-subject-list').on('click', function () {
            if ($('.wls-subject-list').hasClass('open')) {
                $('.wls-subject-list').removeClass('open');
            } else {
                $('.wls-subject-list').addClass('open');
            }
        });

        $('.wls-type').on('click', function () {
            var $this = $(this);
            var $state = $this.attr('data-state');
            var $img = $this.find('img');


            if ($state === 'all') {
                $this.attr('data-state', '1');
                $img.attr('src', plugin_url + '/assets/images/worksheet/Search_Type_PRACTICE.png');
            } else if ($state === '1') {
                $this.attr('data-state', '2');
                $img.attr('src', plugin_url + '/assets/images/worksheet/Search_Type_TEST.png');
            } else if ($state === '2') {
                $this.attr('data-state', 'all');
                $img.attr('src', plugin_url + '/assets/images/worksheet/Search_Type_ALL.png');
            }
        });

        $('.wls-subject-list ul li').on('click', function () {
            var $p = $(this).parents('.wls-subject-list');

            $p.find('li').removeClass('active');
            $(this).addClass('active');
            $p.removeClass('open');
        });

        $('.w-list-searchbox .wls-btn').on('click', function () {
            SearchAjaxContent();
        });

        function SearchAjaxContent() {
            var $form = $('.w-list-searchbox'),
                $input = $form.find('input').val(),
                $type = $form.find('.wls-subject-list ul .active').attr('data-value'),
                $mode = $form.find('.wls-type').attr('data-state');

            var data = {
                'action': 'iii_notepad_worksheet_search_worksheet',
                's': $input,
                'type': $type,
                'mode': $mode
            };

            $.ajax({
                method: 'POST',
                url: iii_script.ajax_url,
                data: data,
                dataType: 'json',
                beforeSend: function () {
                    $('#cc-loading').addClass('open');
                },
                success: function (response) {
                    $('#cc-loading').removeClass('open');

                    if (response === '-99') {
                        //alert('You need login to search');
                    } else {
                        $('.wlr-content').empty();
                        $('.wlr-content').append(response);
                    }
                }
            });
        };

        ClickSheetItem();

        function ClickSheetItem() {
            $('.wlr-item-name').on('click', function () {
                var $sid = $(this).parents('.wlr-content-item').attr('data-w');

                NotepadOpenSheet($sid);
            });
        }

        function CreateImageFromQuestionPage() {
            $('.np-sheet-info .sheet-btn .sopen').on('click', function () {
                var data = {
                    'action': 'iii_notepad_notepad_create_image_from_sheet_questions',
                    'sid': $('.sheetid').val(),
                    'qid': $('.page-number-input').val(),
                }

                $.ajax({
                    method: 'POST',
                    url: iii_script.ajax_url,
                    data: data,
                    dataType: 'json',
                    beforeSend: function () {

                    },
                    success: function (response) {
                        var element = $('<div/>', { class: 'htmlcanvas' }).appendTo('body');

                        element.append(response);

                        html2canvas($('.htmlcanvas')[0], {
                            onrendered: function (cv) {
                                var imgageData = cv.toDataURL('image/png');
                                var file = dataURLtoFile(imgageData, 'img.png');
                                var reader = new FileReader();
                                reader.onload = fileOnload;
                                reader.readAsDataURL(file);
                                $('.htmlcanvas').remove();
                                $('.np-sheet-info').addClass('hidden');

                            }
                        });
                    }
                });
            });
        }

        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }

        function NotepadOpenSheet(sid) {
            var data = {
                'action': 'iii_notepad_notepad_call_page_number_per_sheet',
                'sid': sid,
            };

            $.ajax({
                method: 'POST',
                url: iii_script.ajax_url,
                data: data,
                dataType: 'json',
                beforeSend: function () {

                },
                success: function (response) {
                    $('.notepad-sheet-search').removeClass('active').addClass('hidden');
                    $('.np-sheet-info').empty().append(response).removeClass('hidden');
                    CreateImageFromQuestionPage();
                    $('.np-sheet-info .sheet-btn .sclose').on('click', function () {
                        $('.np-sheet-info').empty().addClass('hidden');
                    });
                }
            });
        }

        $('body').on(click_event, function () {
            var cnt = getCanvas();
            var can = document.getElementById("math4");
            //var ctxcan = can.getContext('2d');
            $('#panel').find('.typing-input').each(function () {
                var $this = $(this),
                    position = $this.position(),
                    left = position.left,
                    top = position.top + 10,
                    socket = io.connect(url);
                $(this).focus();
                var arrLine = $this.val().split('\n');
                var $i = 1;
                var layer_num = $('#layers-body .active').attr('data-cnt');
                $.each(arrLine, function (index, item) {
                    var item_top = top + $i * 10;
                    socket.emit('filetest', {
                        'item': item,
                        'left': left,
                        'item_top': item_top,
                        'room': stanza,
                        'layer': layer_num -3,
                        'type': 'text'
                    })
                    $i++;
                });

                if ($('#panel').find('.typing-input').length > 1) {
                    $this.remove();
                }
            });
        });

        $("select").selectBoxIt();

        //event close session
        $("#close-session").on('click', function () {
            $('.close-session').removeClass("hidden");
        });

        $(".close-popup-close").click(function () {
            $('.close-class').addClass("hidden");
        });
        //p2
        //
        //


        $('.hidden-participant-btn').on('click', function () {
            $('#testichat').mCustomScrollbar('destroy');
            $('#testichat').mCustomScrollbar();


            $('#testichat').mCustomScrollbar("scrollTo", "last", {
                moveDragger: true,
                scrollInertia: 0
            });

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.menu-tray').removeClass('hidden-participant');
                $('.hide-participant-line').addClass('hidden');
            } else {
                $(this).addClass('active');
                $('.menu-tray').addClass('hidden-participant');
                $('.hide-participant-line').removeClass('hidden');
            }

        });



        $('.toogle-menu-tray').on('click', function () {
            if ($('.sb-right').hasClass('hidden')) {
                $('.sb-right').removeClass('hidden');
            } else {
                $('.sb-right').addClass('hidden');
            }
        });

        // Event opacitySideMenu side menu
        var slider = document.getElementById("bgopacity");
        var output = document.getElementById("rangevalue");
        output.innerHTML = slider.value;

        slider.oninput = function () {
            output.innerHTML = this.value;
        };

        $('#bgopacity').on('input', function () {
            $(this).parents('.opacitySideMenu').addClass('on-change');
        });

        $('#bgopacity').on('change', function () {
            $('.wrap-sidebar-left').css({
                opacity: $(this).val() * '.01'
            });

            $(this).parents('.opacitySideMenu').removeClass('on-change');
        });

        // Event click for button list student
        $(".student_list").on('click', function () {
            var $actionOnRight = $(".menu-tray"),
                $parent = $('.attend-list'),
                $this = $(this);

            if ($actionOnRight.hasClass('show-both')) {
                updateStatus($this, 'both', 'chat-only', $parent);
            } else if ($actionOnRight.hasClass('student-only')) {
                updateStatus($this, 'me', 'student-only', $parent);
            } else if ($actionOnRight.hasClass('chat-only')) {
                updateStatus($this, 'other', 'chat-only', $parent);
                ResizeWhenShowBoth();
            } else {
                updateStatus($this, 'remove', 'student-only', $parent);
            }
        });

        ResizeWhenShowBoth();

        $(".pop-chat").on('click', function () {
            var $actionOnRight = $(".menu-tray"),
                $parent = $('.chat_box'),
                $this = $(this);

            if ($actionOnRight.hasClass('show-both')) {
                updateStatus($this, 'both', 'student-only', $parent);
            } else if ($actionOnRight.hasClass('student-only')) {
                updateStatus($this, 'other', 'student-only', $parent);
                ResizeWhenShowBoth();
            } else if ($actionOnRight.hasClass('chat-only')) {
                updateStatus($this, 'me', 'chat-only', $parent);
            } else {
                updateStatus($this, 'remove', 'chat-only', $parent);
            }
        });

        function updateStatus($el, $status, $class, $parent) {
            var $wrapper = $('.menu-tray');

            if ($status === 'remove') {
                $el.addClass('active');
                $wrapper.css('display', 'block');
                $parent.css('display', 'block');
                $wrapper.addClass($class);

                $('.opactiyPercentage').css('display', 'flex');
                $('.editBar').css('display', 'block');
                $('.closeSideMenu .hideSideMenu').removeClass('hidden');
                $('.closeSideMenu .showSideMenu').addClass('hidden');
                ShowsideMenu();
            } else if ($status === 'me') {
                $el.removeClass('active');
                $wrapper.css('display', 'none').removeClass($class);
                $parent.css('display', 'none');

                $(".hideSideMenu").addClass("hidden");
                $(".showSideMenu").removeClass("hidden");
                $(".opactiyPercentage").hide();
                $(".editBar").hide();
                $('.showSideMenu').unbind('click');
            } else if ($status === 'other') {
                $el.addClass('active');
                $wrapper.css('display', 'block');
                $parent.css('display', 'block');
                $wrapper.removeClass($class).addClass('show-both');

                $('.opactiyPercentage').css('display', 'flex');
                $('.editBar').css('display', 'block');
                $('.closeSideMenu .hideSideMenu').removeClass('hidden');
                $('.closeSideMenu .showSideMenu').addClass('hidden');

                ShowsideMenu();
            } else if ($status === 'both') {
                $el.removeClass('active');
                $parent.css('display', 'none');
                $wrapper.removeClass('show-both').addClass($class);

                ShowsideMenu();
            }
        }

        function ResizeWhenShowBoth() {
            $('.chat_box').resizable({
                minHeight: 300,
                handles: {
                    's': '.ui-resizable-n'
                },
                start: function (e, ui) {

                }
            }).on("resize", function (event, ui) {
                var hBottom = ui.size.height,
                    ht = $(window).height();
                var hBottom = ui.size.height,
                    hTop = $(window).height() - hBottom;
                $('#testichat').css('max-height', ht - 226 - hTop);
                $('.chat_box').height(hBottom);
                $('.attend-list').height(hTop);
                $(window).resize(function () {
                    $(".attend-list").height($(window).height() - hBottom);
                });

                $(window).trigger('resize');


            });


        };












        var video_chat = 0;
        $("#toggleVideoMute").click(function () {
            video_chat++;
            if (video_chat % 2 != 0) {
                $("#toggleVideoMute").removeClass("active");
                $("#videoAndMic").css("display", "block");
                $("#videoAndMic").removeClass("hidden");
                $(".turnVideo").removeClass("hidden");
                $(".On_Video").removeClass("hidden");
                $(".Off_Video").addClass("hidden");
                $(".turnMic").addClass("hidden");
                $('#videoChat').removeClass('hidden');
                $(".video_list").addClass('active');
                setTimeout('$("#videoAndMic").hide()', 3000);

            } else {
                $(".video_list").removeClass("active");
                $(".On_Video").addClass("hidden");
                $(".Off_Video").removeClass("hidden");
                $("#videoAndMic").show();
                $('#videoChat').addClass('hidden');
                $(".video_list").removeClass('active');
                setTimeout('$("#videoAndMic").hide()', 3000);


            }
        });
        var mic_chat = 0;;
        $("#toggleAudioMute").click(function () {
            mic_chat++;
            if (mic_chat % 2 != 0) {
                $("#videoAndMic").css("display", "block");
                $("#videoAndMic").removeClass("hidden");
                $(".turnVideo").addClass("hidden");
                $(".turnMic").removeClass("hidden");
                $(".On_Mic").removeClass("hidden");
                $(".Off_Mic").addClass("hidden");
                setTimeout('$("#videoAndMic").hide()', 3000);
            } else {
                $(".On_Mic").addClass("hidden")
                $(".Off_Mic").removeClass("hidden");
                $("#videoAndMic").show();
                setTimeout('$("#videoAndMic").hide()', 3000);

            }
        });

        // Event hide/show side menu popup

        $(".hideSideMenu").click(function () {

            $(".menu-tray").hide();
            $(".hideSideMenu").addClass("hidden");
            $(".showSideMenu").removeClass("hidden");
            $(".opactiyPercentage").hide();
            $(".editBar").hide();

        });
        // Event click for hidden & show bottom-menu
        // menu bottom

        $(".clickToHideBottom").click(function () {
            $(".bottom-menu").fadeOut(300);
            $(".clickToShowBottom").css("display", "block");
            $(".clickToHideBottom").css("display", "none");
            $(".end-notepad").css("display", "none");
            $(".message-send").css("bottom", 0);
            $('.menu-tray').addClass('no-bottommenu');

        });
        $(".clickToShowBottom").click(function () {
            $(".bottom-menu").fadeIn(300);
            $(".clickToShowBottom").css("display", "none");
            $(".clickToHideBottom").css("display", "block");
            $(".end-notepad").css("display", "block");
            $(".message-send").css("bottom", 33);
            $('.menu-tray').removeClass('no-bottommenu');
        });

        // Event custom scrollbar
        $('.style-scrollbar').mCustomScrollbar();

        // Event start tutoring
        var $check_start = true;
        $('.start-tutoring').on('click', function () {
            if ($check_start == true) {
                $('body').removeClass('none-active');
                CountdownTime(iii_variable.time_ranger);
            }

            $check_start = false;
        });

        // Event click for button video_list
        var video_list = 0;
        $(".video_list").click(function () {
            video_list++;
            if ($("#videoChat").hasClass('hidden')) {

                $("#videoChat").removeClass("hidden");
                $(this).addClass('active');
            } else {
                $("#videoChat").addClass("hidden");
                $(this).removeClass('active');
            }
        });


        $(".attend-video-list").scroll(function () {
            $('.handle img').css("box-shadow", "0px -4px 0px rgb(186,186,186,0.3)");
            $('.handle hr').css("box-shadow", "0px -3px 0px rgb(186,186,186,0.3)");
        });

        $(".status-selector").click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.status-selector-bar').show();
                $('.status-selector-bar').addClass('hidden');

            } else {
                $(this).addClass('active');
                $('.status-selector-bar').show();
                $('.status-selector-bar').removeClass('hidden');
            }
        });

        $('.status-selector-bar > ul > li').on('click', function () {
            var $val = $(this).data('type');
            $('#emoji').val($val);

            var image_patch = 'assets/images/notepad/emo/';
            var image;

            switch ($val) {
                case 'fast':
                    image = 'Status_TooFast.png';
                    break;
                case 'confused':
                    image = 'Status_Confused.png';
                    break;
                case 'understand':
                    image = 'Status_Good.png';
                    break;
            }

            $('.status-selector img').attr('src', '' + image_patch + image + '');
            $('.status-selector-bar').hide();
            $('.status-selector').removeClass('active');
        });

        $('#file-input').change(function (e) {
            $('#panel').find('.typing-input').remove();
            var file = e.target.files[0],
                imageType = /image.*/;
            if (!file.type.match(imageType))
                return;

            var reader = new FileReader();
            reader.onload = fileOnload;
            reader.readAsDataURL(file);

            var cnt = getCanvas();
            var can = document.getElementById("math4");
            can.addClass('has-image');
        });

        $('#divrubber').draggable();

        // Event purchase
        $('.purchase-cancel').on('click', function () {
            $('.popup-purcharse').addClass('hidden');
        });

        $('.popup-time-extend .pte-ok').on('click', function () {
            let time = $('.popup-time-extend .ctc select').val();

            let data = {
                'action': 'iii_notepad_purchase_time_by_point',
                'student_id': iii_script.user_id,
                'teacher_id': iii_script.teacher_id,
                'sid': iii_script.sid,
                'time': time
            };

            $.ajax({
                method: 'POST',
                url: iii_script.ajax_url,
                data: data,
                dataType: 'json',
                beforeSend: function () {

                },
                success: function (response) {
                    if (response === '0') {
                        alert(iii_script.buy_time_fail);
                    } else if (response === '1') {
                        //alert(iii_script.buy_time_done);

                        let a = $('.time-class').text().split(':');
                        let current_sec = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                        console.log(current_sec + time * 60);
                        CountdownTime(current_sec + time * 60);
                        $('body').removeClass('none-active');
                    }
                }
            });
        });

        //Countdown Time
        $('#time-action').on('click', function () {
            if ($('.time-menu-popup').hasClass('hidden')) {
                $('.time-menu-popup').removeClass('hidden');
            } else {
                $('.time-menu-popup').addClass('hidden');
            }
        });

        $('.btn-extend-time').on('click', function () {
            $('.time-menu-popup').addClass('hidden');
            $('.popup-time-extend').removeClass('hidden');
        });

        $('.pte-close').on('click', function () {
            $('.time-menu-popup').addClass('hidden');
            $('.popup-time-extend').addClass('hidden');
        });

        $('.btn-close-session').on('click', function () {
            window.location.reload();
        });

        $('.popup-time-extend .ctc select').on('change', function () {
            let $time = $(this).val();
            let $x = $(this).attr('data-time');

            $('.time-info .total span').empty().html(parseInt($time * $x) / 30 + iii_script.points);
        });

        function CountdownTime($time) {
            var $clock = $('.time-class');

            var min = new Date(new Date().valueOf() + $time * 1000);

            $clock.empty().countdown(min, function (event) {
                $(this).html(event.strftime('%H:%M:%S'));

                if (event.type == 'finish') {
                    $('.block-status-tutor').addClass('off');
                    $('body.notepad-on').addClass('none-active');
                };
            });
        }

        $(document).on('click', '#btn-undo', function () {
            history.undo();
        });

        $(document).on('click', '#btn-redo', function () {
            history.redo();
        });

        $('#icon-video').on('click', function () {
            if ($('.video-popup-class').hasClass('hidden')) {
                $('.video-popup-class').removeClass('hidden')
            } else {
                $('.video-popup-class').addClass('hidden')
            }
        });

        $('#yotubeVideo .item-video video').mediaelementplayer();

        $('.video-btn').on('click', function () {
            var $this = $(this);
            var $url = $this.parents('.video-popup-class').find('.video-url').val();
            var cnt = getCanvas();

            $('#yotubeVideo .item-video').addClass('hiden');

            if ($url === '') {
                alert(iii_script.empty_video_url);
            } else {
                if ($('#video-' + cnt).length < 1) {
                    createVideo($url);
                    $('#yotubeVideo').removeClass('hidden');
                } else if ($('#video-' + cnt).find('source').attr('src') !== $url) {
                    $('#video-' + cnt).remove();
                    createVideo($url);
                }
            }
        });

        function createVideo($url) {
            var cnt = getCanvas();

            var $div = $('<div/>', {
                class: 'item-video',
                id: 'video-' + cnt
            }).appendTo('#yotubeVideo');

            var video = $('<video/>', {}).appendTo($div);

            var source = $('<source/>', {
                src: $url,
                type: 'video/youtube',
                width: 200,
                height: 200
            }).appendTo(video);

            video.mediaelementplayer();
        }

        // Event User Login
        var ctrlFlag = false;
        $(document).keydown(function (e) {
            var code = e.keyCode || e.which;

            if (code == 17) {
                ctrlFlag = true;
            } else if (code === 53 && ctrlFlag) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                $('.user-login-form').removeClass('hidden');
            }
        });

        $(document).keyup(function () {
            ctrlFlag = false;
        });

        $('.userFormSubmit').on('click', function () {
            var data = $('.userLoginForm').serialize();

            $.ajax({
                method: 'POST',
                url: iii_script.ajax_url,
                data: data + '&action=iii_notepad_user_login',
                dataType: 'json',
                beforeSend: function () {

                },
                success: function (response) {
                    if (typeof (response) === 'string') {
                        alert(response);
                    } else if (typeof (response) === 'object') {
                        window.location.href = iii_script.site_url + '?uid1=' + response.user1_id + '&uid2=' + response.user2_id
                    }
                }
            });
        });

        $('.full-screen-mode').on('click', function () {
            let $this = $(this);

            if ($this.hasClass('full')) {
                $this.removeClass('full').addClass('min');
                openFullscreen();
            } else if ($this.hasClass('min')) {
                $this.removeClass('min').addClass('full');
                closeFullscreen();
            }

        });

        $('#reveal-icon-left').on('click', function () {
            let bar = $('.block-toolbar');
            let reveal = $('.block-reveal');

            if (bar.get(0).scrollWidth - bar.width() === bar.scrollLeft()) {
                reveal.addClass('end').removeClass('left');
            } else {
                reveal.removeClass('begin').addClass('left');
            }

            bar.animate({
                scrollLeft: '+=55'
            }, 1000);
        });

        $('#reveal-icon-right').on('click', function () {
            let bar = $('.block-toolbar');
            let reveal = $('.block-reveal');

            if (bar.scrollLeft() == 0) {
                reveal.addClass('begin').removeClass('right');
            } else {
                reveal.addClass('right').removeClass('end');
            }

            bar.animate({
                scrollLeft: '-=55'
            }, 1000);
        });

        $('.video-mode').on('click', function () {
            if ($('.video-mode-content').hasClass('acite')) {
                $('.video-mode-content').removeClass('acite');
            } else {
                $('.video-mode-content').addClass('acite');
            }
        });


        $('.trigger-action').on('click', function () {
            let divws = $(this).parents('.tutor-ws-div');

            if (divws.hasClass('activate')) {
                divws.removeClass('activate');
            } else {
                divws.addClass('activate');
            }
        });



        // createCanvas();
        initDraw();
        addLayer();
        deleteLayer();
        clearState();
        initChat();
        activeTab();
        initVideo();
        ShowsideMenu();
        hoverMenuShowTooltip();
        testcammic();
    });

    // function testcammic() {
    //     navigator.getMedia = ( navigator.getUserMedia || // use the proper vendor prefix
    //                    navigator.webkitGetUserMedia ||
    //                    navigator.mozGetUserMedia ||
    //                    navigator.msGetUserMedia);
    //     $('.list-action').on('change', function () {
    //
    //        let type = $(this).attr('data-type');
    //
    //        if (type === 'new') {
    //
    //        } else if (type === 'camera') {
    //             navigator.getMedia({video: true}, function() {
    //               alert('Camera Working');
    //             }, function() {
    //               alert('Camera don"t work');
    //             });
    //        } else if (type === 'mic') {
    //             navigator.getMedia({audio: true}, function() {
    //               alert('Micro Working');
    //             }, function() {
    //               alert('Micro don"t work');
    //             });
    //        } else if (type == 'Open') {
    //             $('.notepad-sheet-search').removeClass('hidden').addClass('active');
    //        }
    //     });
    // }

    function hoverMenuShowTooltip() {

        var timeout;
        $('.tooltip-wrap').on('mouseenter', function () {
            var $this = $(this);

            if (timeout != null) { clearTimeout(timeout); }

            timeout = setTimeout(function () {
                $('.tooltip-wrap').removeClass('show-tt');
                $this.addClass('show-tt');
            }, 1000)
        });

        $('.tooltip-wrap').on('mouseleave', function () {
            if (timeout != null) {
                clearTimeout(timeout);
                timeout = null;
            }
        });
        $('.tooltip-wrap').on('mouseover', function () {
            $('.tooltip-wrap').removeClass('show-tt');
        });

        $(window).on('mouseover', function () {
            $('.tooltip-wrap').removeClass('show-tt');
        });
    }

    function openFullscreen() {
        let elem = document.documentElement;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    function ShowsideMenu() {
        $(".showSideMenu").click(function () {
            $(".menu-tray").show();

            $(".hideSideMenu").removeClass("hidden");
            $(".showSideMenu").addClass("hidden");
            $(".opactiyPercentage").show();
            $(".editBar").show();
        });
    }

    function TypingCreatTextarea(e) {
        e.preventDefault();

        var textarea = $('<textarea/>', {
            class: 'typing-input'
        }).appendTo('#panel');

        var top = e.clientY - 70;

        textarea.css({
            resize: 'both',
            top: top + 'px',
            left: e.clientX + 'px'
        });
    }

    function TypingCreatTextareaTouchDevice(e) {
        e.preventDefault();
/*
        var textarea = $('<textarea/>', {
            class: 'typing-input'
        }).appendTo('#panel');

        if (e.touches) {
            if (e.touches.length == 1) {
                var touch = e.touches[0];

                var top = touch.pageY - 70;

                textarea.css({
                    resize: 'both',
                    top: top + 'px',
                    left: touch.pageX + 'px'
                });
            }
        }*/
        canvas.addEventListener('click', function(e) {
            if(!textarea) {
                textarea = document.createElement('textarea');
                textarea.className = 'info';
                document.body.appendChild(textarea);
            }
            var x = e.clientX - canvas.offsetLeft,
            y = e.clientY - canvas.offsetTop;
            textarea.value = "x: " + x + " y: " + y;
            textarea.style.top = e.clientY + 'px';
            textarea.style.left = e.clientX + 'px';
        }, false);
    }

    // function createCanvas() {
    //     $("#layers-body li").each(function (i) {
    //         $(this).addClass("item" + (i + 1));
    //         $(this).attr("data-cnt", (i + 1));
    //         $(this).find('span').text((i + 1));

    //         if ($(this).hasClass('active')) {
    //             var canvas = cloneCanvas((i + 1), true);

    //             $('#panel').append(canvas);
    //             canDraw();
    //         } else {
    //             var canvas = cloneCanvas((i + 1));
    //             $('#panel').append(canvas);
    //         }
    //     });
    // }

    function initDraw() {
        $(document).on('click', '.icon-selector', function () {
            var cnt = $(this).attr('data-cnt');
            var socket = io.connect(url);
            var can = document.getElementById("math4");
            var ctxcan = can.getContext('2d');
            var wd = parseInt($('#math4').css('width'));
            var ht = parseInt($('#math4').css('height'));
            ctxcan.clearRect(0,0, wd, ht);
            
             socket.emit('layernew', {
                    'room': stanza,
                    'layer': cnt-3
                });


            $('#panel').find('.typing-input').remove();
            $('#add-type-box').removeClass('active');
            

            if (!$(this).hasClass('active') && !$(this).hasClass('none-visiable')) {
                $("#layers-body li").removeClass('active');
                $(this).addClass('active');
                $('#divrubber').css("visibility", "hidden");
                $("#erasers-body li").removeClass('active');


               canDraw(cnt);

                $('#yotubeVideo .item-video').addClass('hidden');
                $('#yotubeVideo #video-' + cnt).removeClass('hidden');

                drawVideo();

                

                if ($('.icon-layer.btn-grid').hasClass('active')) {
                    var grid = $('.icon-layer.btn-grid.active').attr('data-grid');
                    var cnv = $('#math' + cnt);
                    var ctxcan = cnv[0].getContext('2d');


                    var bg = getBg();
                    if (bg != '') {
                        $('#panel').css('background-color', bg);
                    }

                    if (grid) {
                        $('#panel').css('background-image', 'url(' + plugin_url + '/assets/images/notepad/grid/grid-' + grid + '.png)')
                    }
                }
            }  
        });

        $(document).on('click', '.btn-color', function () {
            var cnt = getCanvas();
            $('#panel').find('.typing-input').remove();
            $('#add-type-box').removeClass('active');
            $('#math' + cnt).unbind(click_event, TypingCreatTextarea);
            $('#math' + cnt)[0].removeEventListener('touchstart', TypingCreatTextareaTouchDevice);

            if (!$(this).hasClass('active')) {
                $("#colors-body li").removeClass('active');
                $(this).addClass('active');
                $('#divrubber').css("display", "none");
                $("#erasers-body li").removeClass('active');
                //$("#pencils-body li.hr1").addClass('active');
                $('#change-color img').attr('src', plugin_url + '/assets/images/notepad/color/top/' + $(this).attr('data-image-url'));
                canDraw();
            }
        });

        $(document).on('click', '.btn-pencil', function () {
            var cnt = getCanvas();
            $('#panel').find('.typing-input').remove();
            $('#add-type-box').removeClass('active');
            $('#math' + cnt).unbind(click_event, TypingCreatTextarea);
            $('#math' + cnt)[0].removeEventListener('touchstart', TypingCreatTextareaTouchDevice);

            if (!$(this).hasClass('active')) {
                $("#pencils-body li").removeClass('active');
                $("#erasers-body li").removeClass('active');
                $(this).addClass('active');
                $('#divrubber').css("display", "none");
                canDraw();
            }
        });

        $('.btn-eraser').on('click', function () {
            var cnt = getCanvas();
            $('#panel').find('.typing-input').remove();
            $('#add-type-box').removeClass('active');
            $('#math' + cnt).unbind(click_event, TypingCreatTextarea);
            $('#math' + cnt)[0].removeEventListener('touchstart', TypingCreatTextareaTouchDevice);

            var $this = $(this);

            $("#erasers-body li").removeClass('active');
            //$("#pencils-body li").removeClass('active');
            $this.addClass('active');

            var val = $this.attr('data-eraser');

            $('#divrubber').css({ "display": "block", "width": val + "px", "height": val + "px" });
            $('#controlrubber').removeClass('css-cursor-30 css-cursor-50 css-cursor-70 css-cursor-90 css-cursor-100');
            $('#controlrubber').addClass('css-cursor-' + val);

            canEraser();
        });

        var $z;
        $(document).on('click', '.btn-color-grid', function () {
            var bg = $(this).attr('data-color');
            var cnt = getCanvas();
            var can = document.getElementById("math4");
            var ctxcan = can.getContext('2d');

            $('#panel').find('.typing-input').remove();
            $('#add-type-box').removeClass('active');
            $('#math' + cnt).unbind(click_event, TypingCreatTextarea);
            $('#math' + cnt)[0].removeEventListener('touchstart', TypingCreatTextareaTouchDevice);

            var $x = $("#grids-body .btn-color-grid.active").length;

            if (!$(this).hasClass('active')) {
                $("#grids-body .btn-color-grid").removeClass('active');
                $(this).addClass('active');

                if ($x === 0) {
                    //
                }
                //ctxcan.globalCompositeOperation = "destination-over";
                $('#panel').css('background-color', bg);
                //console.log($z);

                //ctxcan.fillStyle = bg;
                //ctxcan.fillRect(0, 0, can.width, can.height);
                //ctxcan.globalCompositeOperation = "source-over";
                //ctxcan.globalCompositeOperation = "destination-over";
                var grid = getGrid();
                if (grid != '') {
                    //drawGrid(can, parseInt(grid), bg);
                    $('#panel').css('background-image', 'url(' + plugin_url + '/assets/images/notepad/grid/grid-' + grid + '.png)');
                    //$('canvas').css('background-image', 'url('+ plugin_url + '/assets/images/grid-' + grid + '.png)');
                }

                //ctxcan.globalCompositeOperation = "source-over";
            }
        });

        var $stepGrid = -1;

        $(document).on('click', '.btn-grid', function () {
            var cnt = getCanvas();
            var cnv = $('#math' + cnt);
            var ctxcan = cnv[0].getContext('2d');

            $('#panel').find('.typing-input').remove();
            $('#add-type-box').removeClass('active');
            $('#math' + cnt).unbind(click_event, TypingCreatTextarea);
            $('#math' + cnt)[0].removeEventListener('touchstart', TypingCreatTextareaTouchDevice);

            // $stepGrid++;
            //
            // if ($stepGrid < $state.length) {
            //     $state.length = $stepGrid;
            // }
            //
            // if (!$('.btn-grid').hasClass('active')) {
            //     $state['grid-' + $stepGrid] = cnv[0].toDataURL();
            // }

            // ctxcan.clearRect(0, 0, cnv[0].width, cnv[0].height);
            var bg = getBg();
            if (bg != '') {
                $('#panel').css('background-color', bg);
            }

            if (!$(this).hasClass('active')) {
                $("#grids-body .btn-grid").removeClass('active');
                $(this).addClass('active');

                var grid = $(this).attr('data-grid');
                // ctxcan.globalCompositeOperation = "destination-over";
                // drawGrid(cnv, grid, bg);
                $('#panel').css('background-image', 'url(' + plugin_url + '/assets/images/notepad/grid/grid-' + grid + '.png)');
                //$('canvas').css('background-image', 'url('+ plugin_url + '/assets/images/grid-' + grid + '.png)');
            } else {
                $(this).removeClass('active');
                $('#panel').css('background-image', '');
                //$('canvas').css('background-image', '');
            }

            // var imgdaclient = new Image();
            // imgdaclient.src = $state['draw'];
            //
            // imgdaclient.onload = function() {
            //     ctxcan.drawImage(imgdaclient, 0, 0);
            // };
            //
            // ctxcan.globalCompositeOperation = "source-over";
        });


        $(document).on('change', '#screenshot-check', function (ev) {
            if (document.getElementById('screenshot-check').checked) {
                $("#select-screenshot").selectBoxIt('disable');
                var val = $('#select-screenshotSelectBoxItText').attr('data-val') * 1000;
                idtempo = setInterval(function () {
                    takepicture();
                }, val);
            } else {
                clearInterval(idtempo);
                $("#select-screenshot").selectBoxIt('enable');
            }
        });
    }

    function takepicture(e) {
        var cnt = getCanvas();
        var can = document.getElementById("math4");
        var datacam = can.toDataURL('image/png');
        var socket = io.connect(url);

        socket.emit('camperaltri', {
            'id': id,
            'positionx': positionx,
            'positiony': positiony,
            'camperaltridati': datacam,
            'room': stanza
        });
    }

    function drawVideo() {
        var mediaSource = "http://www.youtube.com/watch?v=nOEw9iiopwI";

        var muted = true;

        var cnt = getCanvas();
        var can = document.getElementById("math4");
        var ctx = can.getContext("2d");

        var videoContainer;
        var video = $('<video/>', {
            id: '3itest',
        });

        var source = $('<source/>', {
            src: mediaSource,
            type: 'video/youtube'
        }).appendTo(video);

        //video.autoPlay  = false;
        // video.loop      = true;
        //video.muted     = muted;

        videoContainer = {
            video: video,
            ready: false,
        };

        video.appendTo($('body'));

        video.oncanplay = readyToPlayVideo;

        function readyToPlayVideo(event) {
            videoContainer.scale = Math.min(4, 3);
            videoContainer.ready = true;

            requestAnimationFrame(updateCanvas);
        }

        function updateCanvas() {
            ctx.clearRect(0, 0, can.width, can.height);

            if (videoContainer !== undefined && videoContainer.ready) {
                // find the top left of the video on the canvas
                video.muted = muted;
                var scale = videoContainer.scale;
                var vidH = videoContainer.video.videoHeight;
                var vidW = videoContainer.video.videoWidth;
                var top = 200;
                var left = 300;

                // now just draw the video the correct size
                ctx.drawImage(videoContainer.video, left, top, vidW * scale, vidH * scale);
                if (videoContainer.video.paused) { // if not playing show the paused screen
                    drawPayIcon();
                }
            }

            // all done for display
            // request the next frame in 1/60th of a second
            requestAnimationFrame(updateCanvas);
        }

        function drawPayIcon() {
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.5;
            ctx.fillRect(0, 0, can.width, can.height);
            ctx.fillStyle = "#DDD";
            ctx.globalAlpha = 0.75;
            ctx.beginPath();
            var size = (can.height / 2) * 0.5;
            ctx.moveTo(can.width / 2 + size / 2, can.height / 2);
            ctx.lineTo(can.width / 2 - size / 2, can.height / 2 + size);
            ctx.lineTo(can.width / 2 - size / 2, can.height / 2 - size);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        function playPauseClick() {
            if (videoContainer !== undefined && videoContainer.ready) {
                if (videoContainer.video.paused) {
                    videoContainer.video.play();
                } else {
                    videoContainer.video.pause();
                }
            }
        }

        can.addEventListener("click", playPauseClick);
    }

    function drawGrid(cnv, grid, bg) {

        if (bg == '#DEDEDE')
            var border = '#c2c2c2';
        else
            var border = '#c2c2c2';

        if (grid == 1) {
            var gridOptions = {
                minorLines: {
                    separation: 45,
                    color: border
                }
            };
            drawGridLines(cnv, gridOptions.minorLines);
        } else if (grid == 2) {
            var gridOptions = {
                minorLines: {
                    separation: 22,
                    color: border
                }
            };
            drawGridLines(cnv, gridOptions.minorLines);
        } else {
            var gridOptions = {
                minorLines: {
                    separation: 11,
                    color: border
                },
                majorLines: {
                    separation: 44,
                    color: '#B1B1B1'
                }
            };
            drawGridLines(cnv, gridOptions.minorLines);
            drawGridLines(cnv, gridOptions.majorLines);
        }
        return;
    }

    function drawGridLines(cnv, lineOptions) {
        var iWidth = cnv[0].width;
        var iHeight = cnv[0].height;

        var ctx = cnv[0].getContext('2d');

        ctx.strokeStyle = lineOptions.color;
        ctx.strokeWidth = 1;
        ctx.lineWidth = 1;

        ctx.beginPath();

        var iCount = null;
        var i = null;
        var x = null;
        var y = null;

        iCount = Math.floor(iWidth / lineOptions.separation);

        for (i = 1; i <= iCount; i++) {
            x = (i * lineOptions.separation);
            ctx.moveTo(x, 0);
            ctx.lineTo(x, iHeight);
            ctx.stroke();
        }

        iCount = Math.floor(iHeight / lineOptions.separation);

        for (i = 1; i <= iCount; i++) {
            y = (i * lineOptions.separation);
            ctx.moveTo(0, y);
            ctx.lineTo(iWidth, y);
            ctx.stroke();
        }

        ctx.closePath();

        return;
    }

    function addLayer() {
        $(".btn-add-layer").click(function () {
            $('#panel').find('.typing-input').remove();
            var len = $("#layers-body li").length;
            if (len <= 8) {
                $('#layers-body').append('<li class="icon-layer icon-selector item' + (len + 1)
                    + '" data-cnt="' + (len + 1) + '"><img src="' + plugin_url + 'assets/images/notepad/layer/layer-' + (len - 2) + '.png"></li>');

               
            }
        });
    }

    function deleteLayer() {
        $(".btn-delete-layer").click(function () {
            var len = $("#layers-body li").length;
            if (len > 4) {
                $("#math" + len).remove();
                $(".item" + len).remove();
            }
        });
    }

    function clearState() {
        $(document).on('click', '.btn-eraser-clear', function () {
            $("canvas").each(function (i) {
                if ($(this).hasClass('active')) {
                    var can = $(this);
                    var ctxcan = can.getContext('2d');
                    ctxcan.clearRect(0, 0, can.width, can.height);

                    //$("#pencils-body li.hr1").addClass('active');
                    $("#erasers-body li").removeClass('active');
                    $('#divrubber').css("display", "none");
                    canDraw();
                } else {
                    $('#divrubber').css("display", "none");
                    $("#erasers-body li").removeClass('active');
                }
            });
        });
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

    function setTime() {
        ++totalSeconds;
        var time = '-' + pad(parseInt(totalSeconds / 65)) + ':' + pad(totalSeconds % 65);
        $('.time-class').text(time);
    }

    function fileOnload(e) {
        var img = $('<img>', {
            src: e.target.result
        });
        var socket = io.connect(url);
        var cnt = getCanvas();
        var can = document.getElementById("math4");
        var ctxcan = can.getContext('2d');

        // alert(img.src.value);
        // var canvas1 = $('#paper')[0];
        // var context1 = canvas1.getContext('2d');
        img.on('load', function () {
            ctxcan.drawImage(this, positionx, positiony);
            socket.emit('fileperaltri', {
                'id': id,
                'positionx': positionx,
                'positiony': positiony,
                'fileperaltri': e.target.result,
                'room': stanza
            });
        });
    }

    // function canEraser() {
    //     //username = username.substr(0, 20);
    //     var socket = io.connect(url);
    //     var cnt = getCanvas();
    //     var can = document.getElementById("math4");
    //     var ctxcan = can.getContext('2d');

    //     can.off();

    //     divrubber.on('mouseup mouseleave', function (e) {
    //         drawing = false;
    //         controlrubber = false;
    //         dragging = true;
    //     });

    //     divrubber.on('mousemove', function (e) {
    //         var rubbersize = getEraser();

    //         if (dragging) {
    //             ctxcan.clearRect(divrubber.position().left, divrubber.position().top, rubbersize + 4, rubbersize + 4);
    //             controlrubber = true;

    //             socket.emit('rubber', {
    //                 'x': divrubber.position().left,
    //                 'y': divrubber.position().top,
    //                 'id': id,
    //                 'usernamerem': username,
    //                 'controlrubber': controlrubber,
    //                 'width': rubbersize + 4,
    //                 'height': rubbersize + 4,
    //                 'room': stanza
    //             });
    //         }
    //     });

    //     divrubber.on('mousedown', function (e) {
    //         drawing = false;
    //         dragging = true;
    //     });
    // }

    function canDraw(a) {

        var socket = io.connect(url);
        var cnt = getCanvas();
        var can = document.getElementById("math4");

        var ctxcan = can.getContext('2d');

        var prev = {};

        // ctx setup
        ctxcan.lineCap = "round";
        ctxcan.lineJoin = "round";
        ctxcan.lineWidth = getPencil();
        ctxcan.font = "20px Tahoma";

        if (ctxcan) {
            $(window).on('resize', function () {
                resizecanvas(can, ctxcan);
            });

            $(window).on('orientationchange', function () {
                resizecanvas(can, ctxcan);
            });
        }

        socket.emit('setuproom', {
            'room': stanza,
            'id': username,
            'usernamerem': username
        });

        socket.on('setuproomserKO', function (data) {
            stanza = data.room;
        });

        socket.on('setuproomser', function (data) {
            stanza = data.room;
        });

        socket.on('doppioclickser', function (data) {
            ctxcan.fillStyle = data.color;
            ctxcan.font = data.fontsizerem + "px Tahoma";
            ctxcan.fillText(data.scrivi, data.x, data.y);
        });
        socket.on('filetester', function (data) {
            ctxcan.fillStyle = data.color;
            ctxcan.font = data.fontsizerem + "px Tahoma";
            ctxcan.fillText(data.item, data.left, data.item_top);
        });

        socket.on('fileperaltriser', function (data) {
            var imgdaclient = new Image();
            imgdaclient.src = data.fileperaltri;
            imgdaclient.onload = function () {
                //  imgdaclient.src = data.fileperaltri;
                ctxcan.drawImage(imgdaclient, data.positionx, data.positiony);
            }
        });
        if(a){
            
            
            socket.on('moves', function (list) {    
            var layer_number = $('#layers-body .active').attr('data-cnt');
            layer_number=layer_number-3;
               var layer_num = a-3;
               console
                list.forEach(function(data){  
                    if(data.type=='draw'){
                        if(data.layer == layer_num){         
                            if (data.drawing && clients[data.id]) {
                            ctxcan.strokeStyle = data.color;
                            if(layer_number == data.layer){
                            drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y, data.spessremo, data.color, ctxcan);
                            console.log(layer_num);
                            }
                            }
                        }

                        clients[data.id] = data;
                        clients[data.id].updated = $.now();
                    }else if( data.type == 'text'){
                        ctxcan.fillStyle = data.color;
                        ctxcan.font = data.fontsizerem + "px Tahoma";
                        ctxcan.fillText(data.item, data.left, data.item_top);
                    }
                });
       
            });
        }

        socket.on('moving', function (data) {
            // if (!(data.id in clients)) {
            //     // a new user has come online. create a cursor for them
            //     cursors[data.id] = $('<div class="cursor"><div class="identif">' + data.usernamerem + '</div>').appendTo('#cursors');
            // }
             var layer_num = $('#layers-body .active').attr('data-cnt');
                layer_num = layer_num-3;
            
               
                
            // Move the mouse pointer
            // cursors[data.id].css({
            //     'left': data.x,
            //     'top': data.y
            // });

            // Is the user drawing?
            if (data.drawing && clients[data.id]) {
                // Draw a line on the canvas. clients[data.id] holds
                // the previous position of this user's mouse pointer
                ctxcan.strokeStyle = data.color;
                //  drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y,data.spessremo,data.color);
                if(data.layer == layer_num ){
                drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y, data.spessremo, data.color, ctxcan);
                }
            }

            // Saving the current client state
            clients[data.id] = data;
            clients[data.id].updated = $.now();
       
        });

        socket.on('toccomoving', function (list) {
            
            
            if (data.drawing && clients[data.id]) {

               
                ctx.strokeStyle = data.color;
                
                drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y, data.spessremo, data.color, ctxcan);
            }

            // Saving the current client state
            clients[data.id] = data;
            clients[data.id].updated = $.now();
       
        });

        socket.on('rubberser', function (data) {

            // if (!(data.id in clients)) {
            //     // a new user has come online. create a cursor for them
            //     cursors[data.id] = $('<div class="cursor"><div class="identif">' + data.usernamerem + '</div>').appendTo('#cursors');
            // }

            // Move the mouse pointer
            // Is the user drawing?
            if (data.controlrubber && clients[data.id]) {

                cursors[data.id].css({
                    'left': data.x,
                    'top': data.y
                });
                ctxcan.clearRect(data.x, data.y, data.width, data.height);
            }

            // Saving the current client state
            clients[data.id] = data;
            clients[data.id].updated = $.now();
        });

        //  code to draw on canvas
        $('#panel').on('touchstart', function (e) {
            console.log('trung');
            e.preventDefault();
            getTouchPos();
            socket.emit('mousemove', {
                'x': touchX,
                'y': touchY,
                'drawing': drawing,
                'color': getColor(),
                'id': id,
                'usernamerem': username,
                'spessremo': getPencil(),
                'room': stanza
            });
            $(".cursor").css("zIndex", 6);
            drawing = true;
        }, false);

        $('#panel').on('touchend', function (e) {
            console.log('trung1');
            e.preventDefault();
            drawing = false;
            $(".cursor").css("zIndex", 8);
        }, false);
        $('#panel').on('touchmove', function (e) {
            console.log('trung2');
            var cnt = getCanvas();
            var can = document.getElementById("math4");
            var ctxcan = can.getContext('2d');
            e.preventDefault();
            if ($.now() - lastEmit > 25) {
                if (controlpencil) {
                    prev.x = touchX;
                    prev.y = touchY;
                    getTouchPos();

                    drawLineMultiCanvas(prev.x, prev.y, touchX, touchY, ctxcan);

                    lastEmit = $.now();
                    socket.emit('mousemove', {
                        'x': touchX,
                        'y': touchY,
                        'drawing': drawing,
                        'color': getColor(),
                        'id': id,
                        'usernamerem': username,
                        'spessremo': getPencil(),
                        'room': stanza
                    });
                }
            }

        }, false);

        $('#panel').on('mousedown', function (e) {
            if($('#change-size-pencil').hasClass('active')){
                var layer_num = $('#layers-body .active').attr('data-cnt');
                e.preventDefault();
                prev.x = e.pageX + 5;
                prev.y = e.pageY - 55;
                socket.emit('mousemove', {
                    'x': prev.x,
                    'y': prev.y,
                    'drawing': drawing,
                    'color': getColor(),
                    'id': id,
                    'usernamerem': username,
                    'spessremo': getPencil(),
                    'room': stanza,
                    'layer': layer_num-3,
                    'type':'draw'
                });
                drawing = true;
                $(".cursor").css("zIndex", 6);
            }
        });

        $('#panel').on('mouseup mouseleave', function (e) {
            if (drawing) {
                drawing = false;
                $(".cursor").css("zIndex", 8);
                //history.saveState();

                if (!$('.btn-grid').hasClass('active')) {
                    $state['draw'] = can.toDataURL();
                }
            }
        });

        $('#panel').on('mousemove', function (e) {
            var cnt = getCanvas();
            var can = document.getElementById("math4");
            var ctxcan = can.getContext('2d');
            var layer_num = $('#layers-body .active').attr('data-cnt');
            var posmousex = e.pageX + 5;
            var posmousey = e.pageY - 65;
            if ($.now() - lastEmit > 25) {
                if (drawing && (controlpencil)) {
                    //     ctx.strokeStyle = document.getElementById('minicolore').value;
                    drawLineMultiCanvas(prev.x, prev.y, e.pageX + 5, e.pageY - 65, ctxcan);
                    prev.x = e.pageX + 5;
                    prev.y = e.pageY - 65;
                    lastEmit = $.now();
                    socket.emit('mousemove', {
                        'x': prev.x,
                        'y': prev.y,
                        'drawing': drawing,
                        'color': getColor(),
                        'id': id,
                        'usernamerem': username,
                        'spessremo': getPencil(),
                        'room': stanza,
                        'layer': layer_num-3,
                        'type':'draw'
                    });

                }
            }
            // Draw a line for the current user's movement, as it is
            // not received in the socket.on('moving') event above
        });
    }

    function getCanvas() {
        var cnt = '1';
        $("#layers-body li").each(function (i) {
            if ($(this).hasClass('active')) {
                cnt = $(this).attr('data-cnt');
            }
        });
        return cnt;
    }

    function getColor() {
        var color = '#000000';
        $("#colors-body li").each(function (i) {
            if ($(this).hasClass('active')) {
                color = $(this).attr('data-color');
            }
        });
        return color;
    }

    function getPencil() {
        var pencil = '1';
        $("#pencils-body li").each(function (i) {
            if ($(this).hasClass('active')) {
                pencil = $(this).attr('data-pencil');
            }
        });
        return pencil;
    }

    function getEraser() {
        var eraser = 0;
        $("#erasers-body li").each(function (i) {
            if ($(this).hasClass('active')) {
                eraser = parseInt($(this).attr('data-eraser'));
            }
        });
        return eraser;
    }

    function getBg() {
        var bg = '';
        $("#grids-body .btn-color-grid").each(function (i) {
            if ($(this).hasClass('active')) {
                bg = $(this).attr('data-color');
            }
        });
        return bg;
    }

    function getGrid() {
        var grid = '';
        $("#grids-body .btn-grid").each(function (i) {
            if ($(this).hasClass('active')) {
                grid = parseInt($(this).attr('data-grid'));
            }
        });
        return grid;
    }

    function getTab() {
        var tab = 0;
        $("#tab-chat li").each(function (i) {
            if ($(this).hasClass('active')) {
                tab = parseInt($(this).attr('data-id'));
            }
        });
        return tab;
    }

    function cloneCanvas(index, active = false) {
        //create a new canvas
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d');

        //set dimensions
        newCanvas.width = $('.main-notepad').width();
        newCanvas.height = $('.main-notepad').height();
        newCanvas.id = "math" + index;

        if (active) {
            newCanvas.className = "math-panel active";
            newCanvas.style.visibility = "visible";
        } else {
            newCanvas.className = "math-panel";
            newCanvas.style.display = "none";

        }


        //return the new canvas
        return newCanvas;
    }

    function drawLinerem(fromx, fromy, tox, toy, spessore, colorem, ctxcan) {
       
        ctxcan.strokeStyle = colorem;
        ctxcan.lineWidth = spessore;
        ctxcan.beginPath();
        ctxcan.moveTo(fromx, fromy);
        ctxcan.lineTo(tox, toy);
        ctxcan.stroke();
        ctxcan.closePath();
        fromx = tox;
        fromy = toy;

    }

    function drawLineMultiCanvas(fromx, fromy, tox, toy, ctx) {
        ctx.strokeStyle = getColor();
        ctx.lineWidth = getPencil();
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
    }

    function resizecanvas(can, ctxcan) {
        var imgdata = ctxcan.getImageData(0, 0, can.width, can.height);
        can.width = window.innerWidth;
        can.height = window.innerHeight + 65;
        ctxcan.putImageData(imgdata, 0, 0);
    }

    function getTouchPos(e) {
        if (!e)
            var e = event;

        if (e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                // touchX=touch.pageX-touch.target.offsetLeft;
                // touchY=touch.pageY-touch.target.offsetTop;
                touchX = touch.pageX - 17;
                touchY = touch.pageY - 95;
            }
        }
    }

    //Functions of Chat
    function initChat() {
        var socket = io.connect(url);

        $(".btn-student").dblclick(function () {
            var id = $(this).attr('data-id');
            var tab = getTab();
            var channels = [];

            $("#tab-chat li").each(function (i) {
                var room = $(this).attr('data-room');
                channels.push('/' + room);
            });
            if (id != tab && cnt < 1) {
                cnt = cnt + 1;
                $('.inbox-message').css("display", "none");

                var username = $(this).attr('data-name');
                var roomid;
                var stanza = roomid = 'private' + id;
                var ul = document.createElement('ul');
                ul.id = "testichat" + id;
                ul.className = "inbox-message style-scrollbar";

                var img = document.createElement('img');
                img.id = "closePrivate" + id;
                img.className = "close-private";
                img.src = plugin_url + "assets/images/notepad/icon_CLOSE.png";
                $('#chat').append(img);
                $('#chat').append(ul);

                var testichats = document.getElementById('testichat' + id);

                loadChat(username, roomid, clients, testichats);
                getSubscribe(clients, roomid, testichats);
                if (channels.length) unSubscribe(clients, channels);

                socket.emit('privatemessage', {
                    'id': id,
                    'roomid': roomid,
                    'studentid': id,
                    'studentname': username,
                    'room': stanza
                });

                $('.all-message').removeClass('active');
                $('.mess-private').removeClass('active');
                $('<li class="item-stt-message mess-private active" data-id="' + id + '" data-name="' + username + '" data-room="' + roomid + '"><p class="text-overfl">' + username + '</p></li>').insertAfter(".all-message");
            }
        });

        $('.prev-message').click(function () {
            var $prev = $('#tab-chat .active').prev();
            if ($prev.length) {
                $('#tab-chat').animate({
                    scrollLeft: $prev.position().left
                }, 'slow');
            }
        });

        $('.next-message').click(function () {
            var $next = $('#tab-chat .active').next();
            if ($next.length) {
                $('#tab-chat').animate({
                    scrollLeft: $next.position().left
                }, 'slow');
            }
        });

        socket.on('privatecreate', function (data) {
            var channels = [];

            $("#tab-chat li").each(function (i) {
                var room = $(this).attr('data-room');
                channels.push('/' + room);
            });

            $('.inbox-message').css("display", "none");

            var ul = document.createElement('ul');
            ul.id = "testichat" + data.studentid;
            ul.className = "inbox-message style-scrollbar";
            $('#chat').append(ul);
            stanza = data.roomid;

            var testichats = document.getElementById('testichat' + data.studentid);

            loadChat('Tutor', data.roomid, clients, testichats);
            getSubscribe(clients, data.roomid, testichats);
            if (channels.length) unSubscribe(clients, channels);

            $('.all-message').removeClass('active');
            $('.mess-private').removeClass('active');
            $('<li class="item-stt-message mess-private active" data-id="' + data.studentid + '" data-name="' + data.studentname + '" data-room="' + data.roomid + '"><p class="text-overfl">' + data.studentname + '</p></li>').insertAfter(".all-message");
        });
    }

    function activeTab() {
        $(document).on('click', '.item-stt-message', function () {
            var id = $(this).attr('data-id');
            var channels = [];
            $('.item-stt-message').removeClass('active');
            $('.inbox-message').css("display", "none");
            $(this).addClass('active');
            $("#tab-chat li").each(function (i) {
                if (!$(this).hasClass('active')) {
                    var room = $(this).attr('data-room');
                    channels.push('/' + room);
                }
            });
            if (id == 0) {
                getSubscribe(clients, stanza, testichat);
                if (channels.length) unSubscribe(clients, channels);
                $('#testichat').css("display", "block");
            } else {
                var username = $(this).attr('data-name');
                var roomid;
                var stanza = roomid = $(this).attr('data-room');
                var testichats = document.getElementById('testichat' + id);
                getSubscribe(clients, roomid, testichats);
                if (channels.length) unSubscribe(clients, channels);
                $('#testichat' + id).css("display", "block");
            }
        });
    }

    function loadChat(username, roomid, client, testichats) {
        var name = username;
        var rooms = roomid;
        var clients = client;
        var testichat = testichats;
        var iconnn = document.getElementById('hihihi');
        var iconnnAC = document.getElementById('hahhhha');

        fm.util.addOnLoad(function () {

            //init object chat between users a room
            var chat = {
                alias: 'Unknown',
                clientId: 0,
                channels: {
                    main: '/' + rooms
                },
                dom: {
                    chat: {
                        container: document.getElementById('chat'),
                        text: document.getElementById('scrivi'),
                        send: document.getElementById('btn-send'),
                        emoji: document.getElementById('emoji'),
                        username: name,
                        roomid: rooms
                    }
                },
                util: {
                    start: function () {
                        //console.log(name + ':' + room);
                        chat.alias = name;
                        chat.clientId = rooms;
                        //chat.util.hide(chat.dom.prechat.container);
                        chat.util.show(chat.dom.chat.container);
                        chat.util.scroll();
                        chat.dom.chat.text.focus();
                    },
                    stopEvent: function (event) {
                        if (event.preventDefault) {
                            event.preventDefault();
                        } else {
                            event.returnValue = false;
                        }
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    },
                    send: function () {
                        if (chat.util.isEmpty(chat.dom.chat.text)) {
                            chat.util.setInvalid(chat.dom.chat.text);
                        } else {
                            clients.publish({
                                retries: 0,
                                channel: '/' + rooms,
                                data: {
                                    alias: chat.alias,
                                    text: chat.dom.chat.text.value,
                                    emoji: chat.dom.chat.emoji.value
                                },
                                onSuccess: function (args) {
                                    chat.util.clear(chat.dom.chat.text);
                                }
                            });
                        }
                    },
                    show: function (el) {
                        el.style.display = '';
                    },
                    hide: function (el) {
                        el.style.display = 'none';
                    },
                    clear: function (el) {
                        el.value = '';
                    },
                    observe: fm.util.observe,
                    isEnter: function (e) {
                        return (e.keyCode == 13);
                    },
                    isEmpty: function (el) {
                        return (el.value == '');
                    },
                    setInvalid: function (el) {
                        el.className = 'invalid';
                    },
                    clearLog: function () {
                        testichat.innerHTML = '';
                    },
                    logMessage: function (alias, text, me) {
                        var html = '<li';
                        if (me) {
                            html += ' class="item-message"';
                        } else {
                            html += ' class="item-message me"';
                        }
                        html += '><p class="name-sender">' + alias + ':</p><p class="content-mess">' + text + '</p></li>';
                        chat.util.log(html);
                    },
                    logSuccess: function (text) {
                        chat.util.log('<li class="item-message success"><p class="content-mess">' + text + '</p></li>');
                    },
                    logFailure: function (text) {
                        chat.util.log('<li class="item-message failure"><p class="content-mess">' + text + '</p></li>');
                    },
                    log: function (html) {
                        var div = document.createElement('div');
                        div.innerHTML = html;
                        testichat.appendChild(div);
                        chat.util.scroll();
                    },
                    scroll: function () {
                        testichat.scrollTop = testichat.scrollHeight;
                    }
                }
            };

            chat.util.observe(chat.dom.chat.send, 'click', function (e) {
                chat.util.start();
                chat.util.send();
            });

            chat.util.observe(chat.dom.chat.text, 'keydown', function (e) {
                if (chat.util.isEnter(e)) {
                    chat.util.start();
                    chat.util.send();
                    chat.util.stopEvent(e);


                    iconnn.classList.add("hidden");
                    iconnn.classList.remove("active");
                    iconnnAC.classList.remove("active");
                }
            });

            client.setAutoDisconnect({
                synchronous: true
            });

            clients.connect({
                onSuccess: function (args) {
                    chat.clientId = args.clientId;
                    chat.util.clearLog();
                    //chat.util.logSuccess('Connected to WebSync.');
                    //chat.util.show(chat.dom.prechat.container);
                    chat.util.show(chat.dom.chat.container);
                },
                onFailure: function (args) {
                    //var username = args.getData().alias;
                    //var content = c
                    //chat.util.logSuccess('Could not connect to WebSync.');
                }
            });
        });
    }

    function getSubscribe(clients, roomid, testichat) {
        clients.subscribe({
            channel: '/' + roomid,
            onSuccess: function (args) {
                //chat.util.logSuccess('Content chat.');
                var logs = args.getExtensionValue('logs');
                if (logs != null) {
                    for (var i = 0; i < logs.length; i++) {
                        logMessage(logs[i].alias, logs[i].text, false, testichat, logs[i].emoji);
                    }
                }
            },
            onFailure: function (args) {
                //chat.util.logSuccess('Not connecting.');
            },
            onReceive: function (args) {
                var ch = args.getChannel();
                console.log(ch);
                logMessage(args.getData().alias, args.getData().text, args.getWasSentByMe(), testichat, args.getData().emoji);
            }
        });
    }

    function unSubscribe(clients, channels) {
        clients.unsubscribe({
            channels: channels,
            onFailure: function (args) {
                alert(args.error);
            }
        });
    }

    function logMessage(alias, text, me, testichat, emoji) {
        var html = '<li';
        if (me) {
            html += ' class="item-message"';
        } else {
            html += ' class="item-message me"';
        }
        // <p class="emoji fl">
        //         <img src="assets/images/Icons/54_Status_Good.png" alt="emoji">
        //     </p>
        var image_patch = 'assets/images/notepad/emo/';
        var image;

        switch (emoji) {
            case 'fast':
                image = 'Status_TooFast.png';
                break;
            case 'confused':
                image = 'Status_Confused.png';
                break;
            case 'understand':
                image = 'Status_Good.png';
                break;
            case 'default':
                image = 'Status_Defualt.png';
                break;

        }

        html += '><p class="emoji fl"><img src="' + image_patch + image + '" alt="emoji"></p><p class="name-sender">' + alias + ':</p><p class="content-mess">' + text + '</p></li>';
        var div = document.createElement('div');
        div.innerHTML = html;
        testichat.appendChild(div);

        testichat.scrollTop = testichat.scrollHeight;


        // console.log(testichat.scrollHeight);
        // console.log(testichat.clientHeight);


        // if (testichat.scrollHeight == testichat.clientHeight) {


        $(testichat).mCustomScrollbar('destroy');
        $(testichat).mCustomScrollbar();



        $('#testichat').mCustomScrollbar('scrollTo', 'bottom', { scrollInertia: 0 });


        // }

    }

    function initVideo() {
        var videoChat = document.getElementById('videoChat');
        var loading = document.getElementById('loading');
        var video = document.getElementById('video');
        var closeVideo = document.getElementById('closeVideo');
        var toggleAudioMute = document.getElementById('toggleAudioMute');
        var toggleVideoMute = document.getElementById('toggleVideoMute');
        var joinSessionButton = document.getElementById('catturacam');

        var app = new Video(testichat);
        var start = function (sessionId, statusVideo = false, statusAudio = true) {
            if (app.sessionId) {
                return;
            }

            if (sessionId.length != 6) {
                console.log('Session ID must be 6 digits long.');
                return;
            }

            app.sessionId = sessionId;

            // Switch the UI context.
            //location.hash = app.sessionId + '&screen=' + (captureScreenCheckbox.checked ? '1' : '0');
            videoChat.style.display = 'block';

            console.log('Joining session ' + app.sessionId + '.');
            //fm.log.info('Joining session ' + app.sessionId + '.');

            // Start the signalling client.
            app.startSignalling(function (error) {
                if (error != null) {
                    console.log(error);
                    stop();
                    return;
                }

                // Start the local media stream.
                app.startLocalMedia(video, false, statusVideo, statusAudio, function (error) {
                    if (error != null) {
                        console.log(error);
                        stop();
                        return;
                    }

                    // Update the UI context.
                    loading.style.display = 'none';
                    video.style.display = 'block';

                    // Enable the media controls.
                    //toggleAudioMute.removeAttribute('disabled');
                    toggleVideoMute.removeAttribute('disabled');

                    // Start the conference.
                    app.startConference(function (error) {
                        if (error != null) {
                            console.log(error);
                            stop();
                            return;
                        }

                        // Enable the leave button.
                        //leaveButton.removeAttribute('disabled');

                        //fm.log.info('<span style="font-size: 1.5em;">' + app.sessionId + '</span>');
                        console.log('<span style="font-size: 1.5em;">' + app.sessionId + '</span>');
                    }, function () {
                        stop();
                    });
                });
            });
        };

        var stop = function () {
            if (!app.sessionId) {
                return;
            }

            // Disable the leave button.
            // leaveButton.setAttribute('disabled', 'disabled');

            console.log('Leaving session ' + app.sessionId + '.');
            //fm.log.info('Leaving session ' + app.sessionId + '.');

            app.sessionId = '';

            $('#catturacam').removeClass('active');

            app.stopConference(function (error) {
                if (error) {
                    fm.log.error(error);
                }

                // Disable the media controls.
                //toggleAudioMute.setAttribute('disabled', 'disabled');
                //toggleVideoMute.setAttribute('disabled', 'disabled');

                // Update the UI context.
                video.style.display = 'none';
                loading.style.display = 'block';

                app.stopLocalMedia(function (error) {
                    if (error) {
                        fm.log.error(error);
                    }

                    app.stopSignalling(function (error) {
                        if (error) {
                            fm.log.error(error);
                        }
                        // Switch the UI context.
                        //sessionSelector.style.display = 'block';
                        videoChat.style.display = 'none';
                        location.hash = '';
                    });
                });
            });
        };

        // Attach DOM events.
        fm.util.observe(joinSessionButton, 'click', function (evt) {
            stanza = iii_script.roomid;
            var statusAudio;

            if ($(this).hasClass('active')) {
                videoChat.style.display = 'none';
                $(this).removeClass('active');
                stop();
            } else {
                videoChat.style.display = 'block';
                $(this).addClass('active');
                $(".menu-tray").show("slide", { direction: "right" }, "slow");
                if ($('#toggleAudioMute').hasClass('active'))
                    statusAudio = true;
                else
                    statusAudio = false;

                if ($('#toggleVideoMute').hasClass('active'))
                    statusVideo = true;
                else
                    statusVideo = false;

                start(stanza, statusVideo, statusAudio);
            }
        });

        fm.util.observe(closeVideo, 'click', function (evt) {
            videoChat.style.display = 'none';
            $('#catturacam').removeClass('active');
            stop();
        });

        fm.util.observe(window, 'unload', function () {
            stop();
        });

        // function webcame
        var tooglevideomute = 0;
        fm.util.observe(toggleVideoMute, 'click', function (evt) {
            stanza = iii_script.roomid;
            tooglevideomute++;
            if ($(this).hasClass('active')) {
                var muted = app.toggleVideoMute();
                $(this).children().attr('src', plugin_url + 'assets/images/notepad/Video_OFF.png');
                $(this).removeClass('active');
                videoChat.style.display = 'none';
                $('#catturacam').removeClass('active');
            } else {
                $(this).children().attr('src', plugin_url + 'assets/images/notepad/Video_ON.png');
                $(this).addClass('active');
                //  //////
                if ($('#toggleVideoMute').hasClass('active')) {
                    statusVideo = true;
                    start(stanza, statusVideo, true);
                } else
                    statusVideo = false;


            }

        });
    }

    window.addEventListener("load", () => {
        function startPosition(e) {
            painting = true;
            draw(e);
        }

        function finishedPosition() {
            painting = false;
            context.beginPath();
        }

        function draw(e) {
            if (!painting) return;
            context.lineWidth = 1;
            // context.strokeStyle = "red";
            context.lineCap = "round";

            context.lineTo(e.clientX, e.clientY);
            context.stroke();
        }

        if ($('#canvas').length) {
            const canvas = document.querySelector('#canvas');
            const context = canvas.getContext("2d");
            //   resizing
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            //   variables
            let painting = false;

            //   eventListeners
            canvas.addEventListener('mousedown', startPosition);
            canvas.addEventListener('mouseup', finishedPosition);
            canvas.addEventListener('mouseleave', finishedPosition);
            canvas.addEventListener('mousemove', draw);
        }
    });

    const selected = document.querySelector(".selected");
    const optionsContainer = document.querySelector(".options-container");

    const optionList = document.querySelectorAll(".option");

    const optionNew = document.querySelector("#newhihi");

    const optionOpen = document.querySelector("#openhihi");

    const optionSave = document.querySelector("#savehihi");

    const optionPre = document.querySelector("#p");




    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");
    });

    optionList.forEach(o => {
        o.addEventListener("click", () => {
            optionsContainer.classList.remove("active");
        });
    });

    optionNew.addEventListener("click", () => {

    });

    optionOpen.addEventListener("click", () => {
        navigator.getMedia({ video: true }, function () {
            alert('Camera Working');
        }, function () {
            alert('Camera don"t work');
        });
    });

    optionSave.addEventListener("click", () => {
        navigator.getMedia({ audio: true }, function () {
            alert('Micro Working');
        }, function () {
            alert('Micro don"t work');
        });
    });

    optionPre.addEventListener("click", () => {
        $('.notepad-sheet-search').removeClass('hidden').addClass('active');

    });
    $('.sample-close').on('click', function () {
        WS.ClearSimpleData();
    });

    window.addEventListener('mouseup', function (e) {
        if (event.target != selected) {
            optionsContainer.classList.remove("active");
        }
    });


    $('input[type="file"]').attr('title', window.webkitURL ? ' ' : '');


let socket = io(url); 
let canvas = new fabric.Canvas('c');
let line, triangle, origX, origY, isFreeDrawing = false;
let isRectActive = false, isCircleActive = false, isArrowActive = false, activeColor = '#000000';
let isLoadedFromJson = false;

//init variables
let div = $("#panel");
let $canvas = $("#c");
let hw = $('#wrapper');

//width and height of canvas's wrapper
let w, h;
w = hw.width();
h = hw.height();
$canvas.width(w).height(h);

//set w & h for canvas
canvas.setHeight(h);
canvas.setWidth(w);

function initCanvas(canvas) {
    
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: '#ffffff',
    });
    canvas.freeDrawingBrush.width = 5;
    canvas.isDrawingMode = false;

    return canvas;
}

function setBrush(options) {
    if (options.width !== undefined) {
        canvas.freeDrawingBrush.width = parseInt(options.width, 10);
    }

    if (options.color !== undefined) {
        canvas.freeDrawingBrush.color = options.color;
    }
}

function setCanvasSelectableStatus(val) {
    canvas.forEachObject(function(obj) {
        obj.lockMovementX = ! val;
        obj.lockMovementY = ! val;
        obj.hasControls = val;
        obj.hasBorders = val;
        obj.selectable = val;
    });
    canvas.renderAll(); 
}

function setFreeDrawingMode(val) {
    isFreeDrawing = val;
    disableShapeMode();
}

function removeCanvasEvents() {
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
    canvas.off('object:moving');
}

function enableShapeMode() {
    removeCanvasEvents();
    isFreeDrawing = canvas.isDrawingMode;
    canvas.isDrawingMode = false;
    canvas.selection = false;
    setCanvasSelectableStatus(false);
}

function disableShapeMode() {
    removeCanvasEvents();
    canvas.isDrawingMode = isFreeDrawing;
    if (isFreeDrawing) {
        $("#drwToggleDrawMode").addClass('active');
    }
    canvas.selection = true;
    isArrowActive = isRectActive = isCircleActive = false;
    setCanvasSelectableStatus(true);
}

function deleteObjects() {
    let activeGroup = canvas.getActiveObjects();

    if (activeGroup) {
        canvas.discardActiveObject();
        activeGroup.forEach(function (object) {
            canvas.remove(object);
        });
    }
}
function textMode(){      
    var textbox = new fabric.Textbox('', {
        left: 50,
        top: 50,
        width: 150,
        fontSize: 24,
        fontFamily: 'Times New Roman'
  
});
canvas.add(textbox).setActiveObject(textbox);
    

}

function imageMode(e){
    var img = $('<img>', {
            src: e.target.result
        });
    fabric.Image.fromURL(e.target.result, function(myImg) {
 //i create an extra var for to change some image properties
         var img1 = myImg.set({ left: 0, top: 0 });
         canvas.add(img1); 
    });

    canvas.on('mouse:down',function(event){
      if(canvas.getActiveObject()){
        console.log(event.target);
      }

    })
}

//Fabric cho đối tượng hình học (Geometric)
function geometricCircle(e){
    //Vẽ hình tròn
    var circle = new fabric.Circle({
        radius: 20, fill: 'green', left: 100, top: 100
    });

    // Vẽ hình tam giác
    var triangle = new fabric.Triangle({
        width: 20, height: 30, fill: 'blue', left: 50, top: 50
    });

    //Vẽ hình elip
    var elipse = new fabric.Ellipse({
        radius: 20, fill: 'green', left: 100, top: 100
    });

    // Vẽ hình chữ nhật
    var rect = new fabric.Rect({
        width: 20, height: 30, fill: 'blue', left: 50, top: 50
    });
    // Thêm đối tượng hình tròn và hình tam giác vào trong canvas
    canvas.add(circle).setActiveObject(circle);

}

function emitEvent() {
    let aux = canvas;
    let json = aux.toJSON();
    let data = {
        w: w,
        h: h,
        data: json
    };
    socket.emit('drawing', data);
    
}


$(function () {


    //Canvas init
    initCanvas(canvas).renderAll();

    //canvas events

    canvas.on('after:render', function() {
        if (! isLoadedFromJson) {
            emitEvent();
        }
        isLoadedFromJson = false;
        console.log(canvas.toJSON());
    });

    //dynamically resize the canvas on window resize
    $(window)
        .on('resize', function () {
            w = div.width();
            h = div.height();
            canvas.setHeight(h);
            canvas.setWidth(w);
            $canvas.width(w).height(h);
        })
        .on('keydown', function (e) {
            if (e.keyCode === 46) { //delete key
                deleteObjects();
            }
        });

    //Set Brush Size
    $(".size-btns button").on('click', function () {
        $(".size-btns button").removeClass('active');
        $(this).addClass('active');
    });

    //Set brush color
    $(".color-btns button").on('click', function () {
        let val = $(this).data('value');
        activeColor = val;
        $("#brushColor").val(val);
        setBrush({color: val});
    });

    $("#brushColor").on('change', function () {
        let val = $(this).val();
        activeColor = val;
        setBrush({color: val});
    });

    //Toggle between drawing tools
    $("#drwToggleDrawMode").on('click', function () {
        $("#toolbox button").removeClass('active');
        if (canvas.isDrawingMode) {
            setFreeDrawingMode(false);
            $(this).removeClass('active');
        } else {
            setFreeDrawingMode(true);
            $(this).addClass('active');
        }
    });

    $("#drwEraser").on('click', function() { deleteObjects(); });

    $("#drwClearCanvas").on('click', function () { canvas.clear(); });

    $("#textMode").on('click', function() { textMode(); });

    //Thêm đối tượng
    $("#geometricCircle").on('click', function() { geometricCircle(); });

    $("#imageMode").change(function (e) { 
        var file = e.target.files[0],
                imageType = /image.*/;
            if (!file.type.match(imageType))
                return;

            var reader = new FileReader();
            reader.onload = imageMode;
            reader.readAsDataURL(file);
     });

    $("#shapeArrow").on('click', function () {
        if (! isArrowActive || (isRectActive || isCircleActive)) {
            disableShapeMode();
            $("#toolbox button").removeClass('active');
            $(this).addClass('active');
            isArrowActive = true;
            enableShapeMode();
            let arrow = new Arrow(canvas);
        } else {
            disableShapeMode();
            isArrowActive = false;
            $(this).removeClass('active');
        }
    });

    $("#shapeCircle").on('click', function () {
        if (! isCircleActive || (isRectActive || isArrowActive)) {
            disableShapeMode();
            $("#toolbox button").removeClass('active');
            $(this).addClass('active');
            isCircleActive = true;
            enableShapeMode();
            let circle = new Circle(canvas);
        } else {
            disableShapeMode();
            isCircleActive = false;
            $(this).removeClass('active');
        }
    });

    $("#shapeRect").on('click', function () {
        if (! isRectActive || (isArrowActive || isCircleActive)) {
            disableShapeMode();
            isRectActive = true;
            $("#toolbox button").removeClass('active');
            $(this).addClass('active');
            enableShapeMode();
            let squrect = new Rectangle(canvas);
        } else {
            isRectActive = false;
            disableShapeMode();
            $(this).removeClass('active');
        }
    });

    $("#debugButton").on('click', function () {
        deleteObjects();
    });

    canvas.renderAll();

    //Sockets
    socket.emit('ready', "Page loaded");

    socket.on('drawing', function (obj) {

        //set this flag, to disable infinite rendering loop
        isLoadedFromJson = true;

        //calculate ratio by dividing this canvas width to sender canvas width
        let ratio = w / obj.w;

        //reposition and rescale each sent canvas object
        obj.data.objects.forEach(function(object) {
            object.left *= ratio;
            object.scaleX *= ratio;
            object.top *= ratio;
            object.scaleY *= ratio;
        });

        canvas.loadFromJSON(obj.data);
    });

});




})(jQuery, window, document);