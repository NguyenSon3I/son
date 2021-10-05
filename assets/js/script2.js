var url = 'http://localhost:8080';

//var url = window.location.hostname;
var stanza = '';
// if (location.href.indexOf('#') != -1) {
//     stanza = location.href.substring(location.href.indexOf('#') + 1);
// }

var controlpencil = true;
var controlrubber = false;
var positionx = '0';
var positiony = '0';
var lastEmit = $.now();
var touchX, touchY;
var iniziotocco = true;

var doc = $(document),
    divrubber = $('#divrubber');
var color = getColor();
var spessremo = getPencil();
// A flag for drawing activity
var drawing = false;
var clients = {};
var cursors = {};
var dragging = false;

//  funzione richiesta di nick name   
var id = username = Math.round($.now() * Math.random());
if (!username) {
    username = prompt("Hey there, insert your nick name, please", "");
}
var totalSeconds = 0;
var idtempo;
var redo_list = [];
var undo_list = [];

var history = function() {};
var iStep   = -1;

history.saveState = function () {
    iStep++;

    if (iStep < undo_list.length) {
        undo_list.length = iStep;
    }

    var cnt = getCanvas();
    var can = $('#math' + cnt);

    undo_list.push(can[0].toDataURL());
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

history.restoreState = function() {
    var cnt     = getCanvas();
    var can     = $('#math' + cnt);
    var ctxcan  = can[0].getContext('2d');
    ctxcan.clearRect(0, 0, can[0].width, can[0].height);

    var imgdaclient = new Image();
    imgdaclient.src = undo_list[iStep];
    imgdaclient.onload = function() {
        ctxcan.drawImage(imgdaclient, 0, 0);
    }
};

/*
history.saveState = function(list, keep_redo, url) {
    keep_redo = keep_redo || false;
    if (!keep_redo) {
        redo_list = [];
    }
    var cnt = getCanvas();
    var can = $('#math' + cnt);

    if (list) {
        list.push(url);
    } else {
        undo_list.push(can[0].toDataURL());
    }
};

history.undo = function() {
    history.restoreState(undo_list, redo_list, 1);
};

history.redo = function() {
    history.restoreState(redo_list, undo_list, 0);
};

history.restoreState = function(pop, push, type) {
    if (pop.length) {
        var restore_state = pop.pop();
        history.saveState(push, true, restore_state);
        //console.log(push);
        var cnt = getCanvas();
        var can = $('#math' + cnt);
        var ctxcan = can[0].getContext('2d');
        ctxcan.clearRect(0, 0, can[0].width, can[0].height);

        if (type == 1 && pop.length > 0) {
            var imgdaclient = new Image();
            imgdaclient.src = pop[pop.length];
            imgdaclient.onload = function() {
                ctxcan.drawImage(imgdaclient, 0, 0);
            }
        }

        if (type == 0) {
            var imgdaclient = new Image();
            imgdaclient.src = restore_state;
            imgdaclient.onload = function() {
                ctxcan.drawImage(imgdaclient, 0, 0);
            }
        }
    }
};
*/

var webSyncHandleUrl = 'https://websync.s-work.vn/websync.ashx';
fm.websync.client.enableMultiple = true;
var clients = new fm.websync.client(webSyncHandleUrl);
var testichat = document.getElementById('testichat');
var cnt = 0;

loadChat('Tutor', 'public', clients, testichat);
getSubscribe(clients, 'public', testichat);


$(function() {

    // show block-media
    var penClick = 0;
    var eraserClick = 0;
    var colorClick = 0;
    var layerClick = 0;
    var gridClick = 0;
    var iconSelector=0;
    var itemx= 0;
    $("#change-size-pencil").click(function() {
        // startDrawing();
        //$("#rubberControl").addClass("hidden");

        penClick++;
        if (layerClick ==0) {
                 /*Them class hello de tac dong vao the Cancel*/
                $('.hello').removeClass("hidden");
                $('.hello .text-popup-close').text('No layer is selected');
                $(".close-popup-close").click(function() {
                     $('.hello').addClass("hidden");
                     $('.hello').css("z-index","2");
                });
        }
        else if(penClick %2 !=0){
            var cnt = getCanvas();

            $('.hello').removeClass("hidden");
            $('.hello .text-popup-close').text('Layer #' + cnt + ' is selected');
            $(".close-popup-close").click(function() {
                $('.hello').addClass("hidden");
                $('.hello').css("z-index","2");
            });

            $("#change-size-pencil").addClass("active");
            $(".pencil-class").removeClass("hidden");
            $(".modal").addClass("active");
            $(".color-class").addClass("hidden");
            $(".layer-class").addClass("hidden");
            $(".grid-class").addClass("hidden");
            $(".eraser-class").addClass("hidden");
            $("#change-eraser").removeClass("active");
            $("#change-color").removeClass("active");
            $("#add-layer").removeClass("active");
            $(".block-grid").removeClass("active");
            $(".menu-tray").css("margin-top", "40px");
            $(".opacitySideMenu").css("margin-top", "40px");
            // rubbing();
        }
        else {
            $("#change-size-pencil").removeClass("active");
            $(".pencil-class").addClass("hidden");
            $(".modal").removeClass("active");
            $(".menu-tray").css("margin-top", "0px");
            $(".opacitySideMenu").css("margin-top", "0px");
            $(".opacitySideMenu").css("margin-top", "0px");
        }
        eraserClick = 0;
        colorClick = 0;
        //layerClick = 0;
        gridClick = 0;
        // rubbing();
    });
    $("#change-eraser").click(function() {
        //startRubbing();
        // rubbing();
        eraserClick++;
        if (eraserClick % 2 != 0) {
            $("#change-eraser").addClass("active");
            $("#change-size-pencil").removeClass("active");
            $("#change-color").removeClass("active");
            $("#add-layer").removeClass("active");
            $("#icon-grid").removeClass("active");
            $(".pencil-class").addClass("hidden");
            $(".color-class").addClass("hidden");
            $(".layer-class").addClass("hidden");
            $(".grid-class").addClass("hidden");
            $(".eraser-class").removeClass("hidden");
            $(".menu-tray").css("margin-top", "40px");
            $(".opacitySideMenu").css("margin-top", "40px");
        } else {
            $(".menu-tray").css("margin-top", "0px");
            $("change-eraser").removeClass("active");
            $(".eraser-class").addClass("hidden");
            $(".opacitySideMenu").css("margin-top", "0px");

        }
        // rubbing();
        penClick = 0;
        colorClick = 0;
        layerClick = 0;
        gridClick = 0;
    });
    $("#change-color").click(function() {
        //startDrawing();
        // $("#rubberControl").addClass("hidden");
        colorClick++;
        if (colorClick % 2 != 0) {
            $("#change-color").addClass("active");
            $("#change-size-pencil").removeClass("active");
            $("#change-eraser").removeClass("active");
            $("#add-layer").removeClass("active");
            $("#icon-grid").removeClass("active");
            $(".pencil-class").addClass("hidden");
            $(".color-class").removeClass("hidden");
            $(".layer-class").addClass("hidden");
            $(".grid-class").addClass("hidden");
            $(".eraser-class").addClass("hidden");
            $(".menu-tray").css("margin-top", "40px");
            $(".opacitySideMenu").css("margin-top", "40px");
        } else {
            $("#change-color").removeClass("active");
            $(".color-class").addClass("hidden");
            $(".menu-tray").css("margin-top", "0px");
            $(".opacitySideMenu").css("margin-top", "0px");
        }
        penClick = 0;
        eraserClick = 0;
        layerClick = 0;
        gridClick = 0;
    });


    $("#add-layer").click(function() {
        // $("#rubberControl").addClass("hidden");
        //startDrawing();
        layerClick++;
        if (layerClick % 2 != 0) {
            $(".menu-tray").css("margin-top", "40px");
            $("#add-layer").addClass("active");
            $(".pencil-class").addClass("hidden");
            $(".color-class").addClass("hidden");
            $(".layer-class").removeClass("hidden");
            $(".grid-class").addClass("hidden");
            $(".eraser-class").addClass("hidden");
            $(".opacitySideMenu").css("margin-top", "40px");
        } else {
            $("#add-layer").removeClass("active");
            $(".layer-class").addClass("hidden");
            $(".menu-tray").css("margin-top", "0px");
            $(".opacitySideMenu").css("margin-top", "0px");
        }
        penClick = 0;
        eraserClick = 0;
        color = 0;
        gridClick = 0;
    });

    //display grid
    $("#icon-grid").click(function() {
        // $("#rubberControl").addClass("hidden");
        //startDrawing();
        gridClick++;
        if (gridClick % 2 != 0) {
            $("#icon-grid").addClass("active");
            $(".pencil-class").addClass("hidden");
            $(".color-class").addClass("hidden");
            $(".layer-class").addClass("hidden");
            $(".grid-class").removeClass("hidden");
            $(".eraser-class").addClass("hidden");
            $(".menu-tray").css("margin-top", "40px");
            $(".opacitySideMenu").css("margin-top", "40px");
        } else {
            $("#icon-grid").removeClass("active");
            $('.grid-class').addClass("hidden");
            $(".menu-tray").css("margin-top", "0px");
            $(".opacitySideMenu").css("margin-top", "0px");
        }
        penClick = 0;
        eraserClick = 0;
        color = 0;
        layer = 0;
    });

    //display screenshots
    $("#icon-screenshot").click(function() {
        var check = $('.screenshot-class').hasClass("hidden");
        if (check == true) {
            $('.screenshot-class').removeClass("hidden");
        } else {
            $('.screenshot-class').addClass("hidden");
        }
    });



    $("select").selectBoxIt();

    //event close session	  
    $("#close-session").click(function() {
        $('.close-class').removeClass("hidden");
    });
    $(".close-popup-close").click(function() {

        $('.close-class').addClass("hidden");
    });

    //p2


    // Event opacitySideMenu side menu
    var slider = document.getElementById("bgopacity");
    var output = document.getElementById("rangevalue");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    }
    $('#bgopacity').change(function() {
        console.log($('#bgopacity').val());
        if ($('#bgopacity').val() <= 100 && $('#bgopacity').val() >= 70) {
            $('#canvas').css("z-index", "-20");
            $('.wrap-sidebar-left').css("z-index", "1");
        } else {
            $('#canvas').css("z-index", "-19");
            $('#canvas').css("background", "transparent");
            $('.wrap-sidebar-left').css("z-index", "-20");
        }
        $('.wrap-sidebar-left').css({
            opacity: $(this).val() * '.01'
        });
    });

    var studentlist = 0;
    var mess = 0;
    // Event click for button list student
    $(".student_list").on('click', function() {
        var $actionOnRight  = $(".menu-tray"),
            $parent         = $('.attend-list'),
            $this           = $(this);

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

    $(".pop-chat").on('click', function() {
        var $actionOnRight = $(".menu-tray"),
            $parent         = $('.chat_box'),
            $this           = $(this);

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
            $wrapper.show("slide", { direction: "right" }, "slow");
            $parent.show("slide", { direction: "right" }, "slow");
            $wrapper.addClass($class);
        } else if ($status === 'me') {
            $el.removeClass('active');
            $wrapper.hide().removeClass($class);
            $parent.hide();
        } else if ($status === 'other') {
            $el.addClass('active');
            $wrapper.show("slide", { direction: "right" }, "slow");
            $parent.show("slide", { direction: "right" }, "slow");
            $wrapper.removeClass($class).addClass('show-both');
        } else if ($status === 'both') {
            $el.removeClass('active');
            $parent.hide();
            $wrapper.removeClass('show-both').addClass($class);
        }
    }

    function ResizeWhenShowBoth() {
        $('.chat_box').resizable({
            handles: {
                'n': '.ui-resizable-n'
            }
        }).on("resize", function(event, ui) {
            var hBottom = ui.size.height,
                hTop = $(window).height() - hBottom;

            $('.chat_box').height(hBottom);
            $('.attend-list').height(hTop);
        });
    }

    var video_chat = 0;
    $("#toggleVideoMute").click(function() {
        video_chat++;
        if (video_chat % 2 != 0) {
            $("#toggleVideoMute").removeClass("active");
            $("#videoAndMic").css("display", "block");
            $("#videoAndMic").removeClass("hidden");
            $(".turnVideo").removeClass("hidden");
            $(".On_Video").removeClass("hidden");
            $(".Off_Video").addClass("hidden");
            $(".turnMic").addClass("hidden");
            setTimeout('$("#videoAndMic").hide()', 3000);

        } else {
            $(".video_list").removeClass("active");
            $(".On_Video").addClass("hidden");
            $(".Off_Video").removeClass("hidden");
            $("#videoAndMic").show();
            setTimeout('$("#videoAndMic").hide()', 3000);


        }
    });
    var mic_chat = 0;;
    $("#toggleAudioMute").click(function() {
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

    $(".hideSideMenu").click(function() {

        $(".menu-tray").hide();
        $(".hideSideMenu").addClass("hidden");
        $(".showSideMenu").removeClass("hidden");
        $(".opactiyPercentage").hide();
        $(".editBar").hide();

    });
    $(".showSideMenu").click(function() {
        $(".menu-tray").show();

        $(".hideSideMenu").removeClass("hidden");
        $(".showSideMenu").addClass("hidden");
        $(".opactiyPercentage").show();
        $(".editBar").show();
    });
    // Event click for hidden & show bottom-menu
    // menu bottom

    $(".clickToHideBottom").click(function() {
        $(".bottom-menu").fadeOut(300);
        $(".clickToShowBottom").css("display", "block");
        $(".clickToHideBottom").css("display", "none");
        $(".message-send").css("bottom", 0);

    });
    $(".clickToShowBottom").click(function() {
        $(".bottom-menu").fadeIn(300);
        $(".clickToShowBottom").css("display", "none");
        $(".clickToHideBottom").css("display", "block");
        $(".message-send").css("bottom", 33);
    });

    // Event custom scrollbar
    $('.style-scrollbar').mCustomScrollbar();

    // Event click for button video_list
    var video_list = 0;
    $(".video_list").click(function() {
        video_list++;
        if ($("#videoChat").hasClass('hidden')) {
            $("#videoChat").removeClass("hidden");
            $(this).addClass('active');
        } else {
            $("#videoChat").addClass("hidden");
            $(this).removeClass('active');
        }
    });


    $(".attend-video-list").scroll(function() {
        $('.handle img').css("box-shadow", "0px -4px 0px rgb(186,186,186,0.3)");
        $('.handle hr').css("box-shadow", "0px -3px 0px rgb(186,186,186,0.3)")
    });

    $(".status-selector").click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.status-selector-bar').hide();
        } else {
            $(this).addClass('active');
            $('.status-selector-bar').show();
        }
    });

    $('.status-selector-bar > ul > li').on('click', function () {
        var $val = $(this).data('type');
        $('#emoji').val($val);
    });

    $('#file-input').change(function(e) {
        var file = e.target.files[0],
            imageType = /image.*/;
        if (!file.type.match(imageType))
            return;

        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
    });

    var $clock = $('.time-class');
    var min = new Date(new Date().valueOf() + 30 * 65 * 1000);
    $clock.countdown(min, function(event) {
        $(this).html(event.strftime('00:%M:%S'));
        if (event.type == 'finish') {
            $('.time-class').css("color", "red");
            setInterval(setTime, 1000);
        };
    });

    createCanvas();
    initDraw();
    addLayer();
    deleteLayer();
    clearState();
    initChat();
    activeTab();
    initVideo();
});

function createCanvas() {
    $("#layers-body li").each(function(i) {
        $(this).addClass("item" + (i + 1));
        $(this).attr("data-cnt", (i + 1));
        $(this).find('span').text((i + 1));

        var canvas = cloneCanvas((i + 1));
        $('#panel').append(canvas);
    });
}

function initDraw() {
    $(document).on('click', '.icon-selector', function() {
        var cnt = $(this).attr('data-cnt');
        if (!$(this).hasClass('active')) {
            $("#layers-body li").removeClass('active');
            $(this).addClass('active');
            $('#divrubber').css("display", "none");
            $("#erasers-body li").removeClass('active');
            $("#pencils-body li.hr1").addClass('active');
            canDraw();
        }

        if (!$('#math' + cnt).hasClass('active') && $(this).hasClass('active')) {
            $('canvas').css('display', 'none');
            $('canvas').removeClass('active');

            $('#math' + cnt).addClass('active');
            $('#math' + cnt).css('display', 'block');
        }
    });

    $(document).on('click', '.btn-color', function() {
        if (!$(this).hasClass('active')) {
            $("#colors-body li").removeClass('active');
            $(this).addClass('active');
            $('#divrubber').css("display", "none");
            $("#erasers-body li").removeClass('active');
            $("#pencils-body li.hr1").addClass('active');
            canDraw();
        }
    });

    $(document).on('click', '.btn-pencil', function() {
        if (!$(this).hasClass('active')) {
            $("#pencils-body li").removeClass('active');
            $("#erasers-body li").removeClass('active');
            $(this).addClass('active');
            $('#divrubber').css("display", "none");
            canDraw();
        }
    });

    $(document).on('click', '.btn-eraser', function() {
        if (!$(this).hasClass('active')) {
            $("#erasers-body li").removeClass('active');
            $("#pencils-body li").removeClass('active');
            $(this).addClass('active');

            var val = $(this).attr('data-eraser');
            $('#divrubber').css({ "display": "block", "width": val + "px", "height": val + "px" });
            if (val == 30) {
                $('#controlrubber').addClass('css-cursor-30');
                $('#controlrubber').removeClass('css-cursor-50');
                $('#controlrubber').removeClass('css-cursor-70');
                $('#controlrubber').removeClass('css-cursor-90');
                $('#controlrubber').removeClass('css-cursor-100');
            } else if (val == 50) {
                $('#controlrubber').removeClass('css-cursor-30');
                $('#controlrubber').addClass('css-cursor-50');
                $('#controlrubber').removeClass('css-cursor-70');
                $('#controlrubber').removeClass('css-cursor-90');
                $('#controlrubber').removeClass('css-cursor-100');
            } else if (val == 70) {
                $('#controlrubber').removeClass('css-cursor-30');
                $('#controlrubber').removeClass('css-cursor-50');
                $('#controlrubber').addClass('css-cursor-70');
                $('#controlrubber').removeClass('css-cursor-90');
                $('#controlrubber').removeClass('css-cursor-100');
            } else if (val == 90) {
                $('#controlrubber').removeClass('css-cursor-30');
                $('#controlrubber').removeClass('css-cursor-50');
                $('#controlrubber').removeClass('css-cursor-70');
                $('#controlrubber').addClass('css-cursor-90');
                $('#controlrubber').removeClass('css-cursor-100');
            } else if (val == 100) {
                $('#controlrubber').removeClass('css-cursor-30');
                $('#controlrubber').removeClass('css-cursor-50');
                $('#controlrubber').removeClass('css-cursor-70');
                $('#controlrubber').removeClass('css-cursor-90');
                $('#controlrubber').addClass('css-cursor-100');
            }

            canEraser();
        }
    });

    $(document).on('click', '.btn-color-grid', function() {
        if (!$(this).hasClass('active')) {
            $("#grids-body .btn-color-grid").removeClass('active');
            $(this).addClass('active');

            var bg = $(this).attr('data-color');
            var cnt = getCanvas();
            var can = $('#math' + cnt);
            var ctxcan = can[0].getContext('2d');
            ctxcan.fillStyle = bg;
            ctxcan.fillRect(0, 0, can[0].width, can[0].height);

            var grid = getGrid();
            if (grid != '') {
                drawGrid(can, parseInt(grid), bg);
            }
        }
    });

    $(document).on('click', '.btn-grid', function() {
        if (!$(this).hasClass('active')) {
            $("#grids-body .btn-grid").removeClass('active');
            $(this).addClass('active');

            var grid = $(this).attr('data-grid');
            var cnt = getCanvas();
            var cnv = $('#math' + cnt);
            var ctxcan = cnv[0].getContext('2d');
            ctxcan.clearRect(0, 0, cnv[0].width, cnv[0].height);

            var bg = getBg();
            if (bg != '') {
                ctxcan.fillStyle = bg;
                ctxcan.fillRect(0, 0, cnv[0].width, cnv[0].height);
            }
            drawGrid(cnv, grid, bg);
        }
    });

    
    $(document).on('change','#screenshot-check', function(ev) {
    	if (document.getElementById('screenshot-check').checked) {
    		$("#select-screenshot").selectBoxIt('disable');
    		var val = $('#select-screenshotSelectBoxItText').attr('data-val');
	    	idtempo = setInterval(function() {
                takepicture();
            }, val);
	    }else{
	    	clearInterval(idtempo);
	    	$("#select-screenshot").selectBoxIt('enable');
	    }
    });
    

    $(document).on('click', '#btn-undo', function() {
        history.undo();
    });

    $(document).on('click', '#btn-redo', function() {
        history.redo();
    });
}

function takepicture(e) {
    var grid = $(this).attr('data-grid');
    var cnt = getCanvas();
    var can = $('#math' + cnt);
    var datacam = can[0].toDataURL('image/png');
    var socket = io.connect(url);
    socket.emit('camperaltri', {
        'id': id,
        'positionx': positionx,
        'positiony': positiony,
        'camperaltridati': datacam,
        'room': stanza
    });
}

function drawGrid(cnv, grid, bg) {

    if (bg == '#DEDEDE')
        var border = '#E9E9E9';
    else
        var border = '#E9E9E9';

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
    $(".btn-add-layer").click(function() {
        var len = $("#layers-body li").length;
        if (len < 10) {
            $('#layers-body').append('<li class="icon-layer icon-selector item' + (len + 1) 
                + '" data-cnt="' + (len + 1) + '"><img src="assets/icons/icon_Layer_Selector.png"><span>' + (len + 1) + '</span></li>');

            var canvas = cloneCanvas((len + 1));
            $('#panel').append(canvas);

            canDraw();
        }
    });
}

function deleteLayer() {
    $(".btn-delete-layer").click(function() {
        var len = $("#layers-body li").length;
        if (len > 0) {
            $("#math" + len).remove();
            $(".item" + len).remove();
        }
    });
}

function clearState() {
    $(document).on('click', '.btn-eraser-clear', function() {
        $("canvas").each(function(i) {
            if ($(this).hasClass('active')) {
                var can = $(this);
                var ctxcan = can[0].getContext('2d');
                ctxcan.clearRect(0, 0, can[0].width, can[0].height);

                $("#pencils-body li.hr1").addClass('active');
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
    var can = $('#math' + cnt);
    var ctxcan = can[0].getContext('2d');

    // alert(img.src.value);
    // var canvas1 = $('#paper')[0];
    // var context1 = canvas1.getContext('2d');
    img.on('load', function() {
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

function canEraser() {
    //username = username.substr(0, 20);
    var socket = io.connect(url);
    var cnt = getCanvas();
    var can = $('#math' + cnt);
    var ctxcan = can[0].getContext('2d');
    var rubbersize = getEraser();

    can.off();

    divrubber.on('mouseup mouseleave', function(e) {
        drawing = false;
        controlrubber = false;
        dragging = true;
    });

    divrubber.on('mousemove', function(e) {
        if (dragging) {
            ctxcan.clearRect(divrubber.position().left, divrubber.position().top, rubbersize + 4, rubbersize + 4);
            controlrubber = true;
            socket.emit('rubber', {
                'x': divrubber.position().left,
                'y': divrubber.position().top,
                'id': id,
                'usernamerem': username,
                'controlrubber': controlrubber,
                'width': rubbersize + 4,
                'height': rubbersize + 4,
                'room': stanza
            });
        }
    });

    divrubber.on('mousedown', function(e) {
        drawing = false;
        dragging = true;
    });
}

function canDraw() {
    var socket = io.connect(url);
    var cnt = getCanvas();
    var can = $('#math' + cnt);
    var ctxcan = can[0].getContext('2d');

    var prev = {};

    // ctx setup
    ctxcan.lineCap = "round";
    ctxcan.lineJoin = "round";
    ctxcan.lineWidth = getPencil();
    ctxcan.font = "20px Tahoma";

    if (ctxcan) {
        window.addEventListener('resize', resizecanvas, false);
        window.addEventListener('orientationchange', resizecanvas, false);
        resizecanvas(can, ctxcan);
    }

    socket.emit('setuproom', {
        'room': '999999',
        'id': username,
        'usernamerem': username
    });

    socket.on('setuproomserKO', function(data) {
        stanza = data.room;
    });

    socket.on('setuproomser', function(data) {
        stanza = data.room;
    });

    socket.on('doppioclickser', function(data) {
        ctxcan.fillStyle = data.color;
        ctxcan.font = data.fontsizerem + "px Tahoma";
        ctxcan.fillText(data.scrivi, data.x, data.y);
    });

    socket.on('fileperaltriser', function(data) {
        var imgdaclient = new Image();
        imgdaclient.src = data.fileperaltri;
        imgdaclient.onload = function() {
            //	imgdaclient.src = data.fileperaltri;
            ctxcan.drawImage(imgdaclient, data.positionx, data.positiony);
        }
    });

    socket.on('moving', function(data) {
        // if (!(data.id in clients)) {
        //     // a new user has come online. create a cursor for them
        //     cursors[data.id] = $('<div class="cursor"><div class="identif">' + data.usernamerem + '</div>').appendTo('#cursors');
        // }

        // Move the mouse pointer
        cursors[data.id].css({
            'left': data.x,
            'top': data.y
        });

        // Is the user drawing?
        if (data.drawing && clients[data.id]) {
            // Draw a line on the canvas. clients[data.id] holds
            // the previous position of this user's mouse pointer
            ctxcan.strokeStyle = data.color;
            //  drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y,data.spessremo,data.color);
            drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y, data.spessremo, data.color, ctxcan);
        }

        // Saving the current client state
        clients[data.id] = data;
        clients[data.id].updated = $.now();
    });

    socket.on('toccomoving', function(data) {

        // if (!(data.id in clients)) {
        //     // a new user has come online. create a cursor for them
        //     cursors[data.id] = $('<div class="cursor"><div class="identif">' + data.usernamerem + '</div>').appendTo('#cursors');
        // }

        // Move the mouse pointer
        // Is the user drawing?
        if (data.drawing && clients[data.id]) {

            cursors[data.id].css({
                'left': data.x,
                'top': data.y
            });

            // Draw a line on the canvas. clients[data.id] holds
            // the previous position of this user's mouse pointer
            ctx.strokeStyle = data.color;
            //  drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y,data.spessremo,data.color);
            drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y, data.spessremo, data.color, ctxcan);
        }

        // Saving the current client state
        clients[data.id] = data;
        clients[data.id].updated = $.now();
    });

    socket.on('rubberser', function(data) {

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
    can[0].addEventListener('touchstart', function(e) {
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

    can[0].addEventListener('touchend', function(e) {
        e.preventDefault();
        drawing = false;
        $(".cursor").css("zIndex", 8);
    }, false);

    can[0].addEventListener('touchmove', function(e) {
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

    can.on('mousedown', function(e) {
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
            'room': stanza
        });
        drawing = true;
        $(".cursor").css("zIndex", 6);
    });

    can.on('mouseup mouseleave', function() {
        if (drawing) {
            drawing = false;
            $(".cursor").css("zIndex", 8);
            history.saveState();
        }
    });

    can.on('mousemove', function(e) {
        posmousex = e.pageX + 5;
        posmousey = e.pageY - 65;
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
                    'room': stanza
                });

            }
        }
        // Draw a line for the current user's movement, as it is
        // not received in the socket.on('moving') event above
    });
}

function getCanvas() {
    var cnt = '1';
    $("#layers-body li").each(function(i) {
        if ($(this).hasClass('active')) {
            cnt = $(this).attr('data-cnt');
        }
    });
    return cnt;
}

function getColor() {
    var color = '#000000';
    $("#colors-body li").each(function(i) {
        if ($(this).hasClass('active')) {
            color = $(this).attr('data-color');
        }
    });
    return color;
}

function getPencil() {
    var pencil = '1';
    $("#pencils-body li").each(function(i) {
        if ($(this).hasClass('active')) {
            pencil = $(this).attr('data-pencil');
        }
    });
    return pencil;
}

function getEraser() {
    var eraser = 0;
    $("#erasers-body li").each(function(i) {
        if ($(this).hasClass('active')) {
            eraser = parseInt($(this).attr('data-eraser'));
        }
    });
    return eraser;
}

function getBg() {
    var bg = '';
    $("#grids-body .btn-color-grid").each(function(i) {
        if ($(this).hasClass('active')) {
            bg = $(this).attr('data-color');
        }
    });
    return bg;
}

function getGrid() {
    var grid = '';
    $("#grids-body .btn-grid").each(function(i) {
        if ($(this).hasClass('active')) {
            grid = parseInt($(this).attr('data-grid'));
        }
    });
    return grid;
}

function getTab() {
    var tab = 0;
    $("#tab-chat li").each(function(i) {
        if ($(this).hasClass('active')) {
            tab = parseInt($(this).attr('data-id'));
        }
    });
    return tab;
}

function cloneCanvas(index) {
    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = $('.main-content').width();
    newCanvas.height = $('.main-content').height();
    newCanvas.id = "math" + index;
    newCanvas.style.display = "none";
    newCanvas.className = "math-panel";

    //return the new canvas
    return newCanvas;
}

function drawLinerem(fromx, fromy, tox, toy, spessore, colorem, ctx) {
    ctx.strokeStyle = colorem;
    ctx.lineWidth = spessore;
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();
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
    var imgdata = ctxcan.getImageData(0, 0, can[0].width, can[0].height);
    can[0].width = window.innerWidth;
    can[0].height = window.innerHeight + 65;
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
            touchX = touch.pageX + 65;
            touchY = touch.pageY - 95;
        }
    }
}

//Functions of Chat
function initChat() {
    var socket = io.connect(url);

    $(".btn-student").dblclick(function() {
        var id = $(this).attr('data-id');
        var tab = getTab();
        var channels = [];

        $("#tab-chat li").each(function(i) {
            var room = $(this).attr('data-room');
            channels.push('/' + room);
        });
        if (id != tab && cnt < 1) {
            cnt = cnt + 1;
            $('.inbox-message').css("display", "none");

            var username = $(this).attr('data-name');
            var stanza = roomid = 'private' + id;
            var ul = document.createElement('ul');
            ul.id = "testichat" + id;
            ul.className = "inbox-message style-scrollbar";

            var img = document.createElement('img');
            img.id = "closePrivate" + id;
            img.className = "close-private";
            img.src = "assets/icons/icon_CLOSE.png";
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

    $('.prev-message').click(function() {
        var $prev = $('#tab-chat .active').prev();
        if ($prev.length) {
            $('#tab-chat').animate({
                scrollLeft: $prev.position().left
            }, 'slow');
        }
    });

    $('.next-message').click(function() {
        var $next = $('#tab-chat .active').next();
        if ($next.length) {
            $('#tab-chat').animate({
                scrollLeft: $next.position().left
            }, 'slow');
        }
    });

    socket.on('privatecreate', function(data) {
        var channels = [];

        $("#tab-chat li").each(function(i) {
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
    $(document).on('click', '.item-stt-message', function() {
        var id = $(this).attr('data-id');
        var channels = [];
        $('.item-stt-message').removeClass('active');
        $('.inbox-message').css("display", "none");
        $(this).addClass('active');
        $("#tab-chat li").each(function(i) {
            if (!$(this).hasClass('active')) {
                var room = $(this).attr('data-room');
                channels.push('/' + room);
            }
        });
        if (id == 0) {
            getSubscribe(clients, 'public', testichat);
            if (channels.length) unSubscribe(clients, channels);
            $('#testichat').css("display", "block");
        } else {
            var username = $(this).attr('data-name');
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

    fm.util.addOnLoad(function() {

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
                start: function() {
                    //console.log(name + ':' + room);
                    chat.alias = name;
                    chat.clientId = rooms;
                    //chat.util.hide(chat.dom.prechat.container);
                    chat.util.show(chat.dom.chat.container);
                    chat.util.scroll();
                    chat.dom.chat.text.focus();
                },
                stopEvent: function(event) {
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
                send: function() {
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
                            onSuccess: function(args) {
                                chat.util.clear(chat.dom.chat.text);
                            }
                        });
                    }
                },
                show: function(el) {
                    el.style.display = '';
                },
                hide: function(el) {
                    el.style.display = 'none';
                },
                clear: function(el) {
                    el.value = '';
                },
                observe: fm.util.observe,
                isEnter: function(e) {
                    return (e.keyCode == 13);
                },
                isEmpty: function(el) {
                    return (el.value == '');
                },
                setInvalid: function(el) {
                    el.className = 'invalid';
                },
                clearLog: function() {
                    testichat.innerHTML = '';
                },
                logMessage: function(alias, text, me) {
                    var html = '<li';
                    if (me) {
                        html += ' class="item-message"';
                    } else {
                        html += ' class="item-message me"';
                    }
                    html += '><p class="name-sender">' + alias + ':</p><p class="content-mess">' + text + '</p></li>';
                    chat.util.log(html);
                },
                logSuccess: function(text) {
                    chat.util.log('<li class="item-message success"><p class="content-mess">' + text + '</p></li>');
                },
                logFailure: function(text) {
                    chat.util.log('<li class="item-message failure"><p class="content-mess">' + text + '</p></li>');
                },
                log: function(html) {
                    var div = document.createElement('div');
                    div.innerHTML = html;
                    testichat.appendChild(div);
                    chat.util.scroll();
                },
                scroll: function() {
                    testichat.scrollTop = testichat.scrollHeight;
                }
            }
        };

        chat.util.observe(chat.dom.chat.send, 'click', function(e) {
            chat.util.start();
            chat.util.send();
        });

        chat.util.observe(chat.dom.chat.text, 'keydown', function(e) {
            if (chat.util.isEnter(e)) {
                chat.util.start();
                chat.util.send();
                chat.util.stopEvent(e);
            }
        });

        client.setAutoDisconnect({
            synchronous: true
        });

        clients.connect({
            onSuccess: function(args) {
                chat.clientId = args.clientId;
                chat.util.clearLog();
                //chat.util.logSuccess('Connected to WebSync.');
                //chat.util.show(chat.dom.prechat.container);
                chat.util.show(chat.dom.chat.container);
            },
            onFailure: function(args) {
                //var username = args.getData().alias;
                //var content = ''

                //chat.util.logSuccess('Could not connect to WebSync.');
            }
        });
    });
}

function getSubscribe(clients, roomid, testichat) {
    clients.subscribe({
        channel: '/' + roomid,
        onSuccess: function(args) {
            //chat.util.logSuccess('Content chat.');               
            var logs = args.getExtensionValue('logs');
            if (logs != null) {
                for (var i = 0; i < logs.length; i++) {
                    logMessage(logs[i].alias, logs[i].text, false, testichat, logs[i].emoji);
                }
            }
        },
        onFailure: function(args) {
            //chat.util.logSuccess('Not connecting.');
        },
        onReceive: function(args) {
            var ch = args.getChannel();
            console.log(ch);
            logMessage(args.getData().alias, args.getData().text, args.getWasSentByMe(), testichat, args.getData().emoji);
        }
    });
}

function unSubscribe(clients, channels) {
    clients.unsubscribe({
        channels: channels,
        onFailure: function(args) {
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
    //         <img src="assets/Images/Icons/54_Status_Good.png" alt="emoji">
    //     </p>
    console.log(emoji);
    var image_patch = 'assets/Images/Icons/';
    var image;

    switch (emoji) {
        case 'fast':
            image = '56_Status_TooFast.png';
            break;
        case 'confused':
            image = '55_Status_Confused.png';
            break;
        case 'understand':
            image = '54_Status_Good.png';
            break;
    }

    html += '><p class="emoji fl"><img src="' + image_patch + image + '" alt="emoji"></p><p class="name-sender">' + alias + ':</p><p class="content-mess">' + text + '</p></li>';
    var div = document.createElement('div');
    div.innerHTML = html;
    testichat.appendChild(div);
    testichat.scrollTop = testichat.scrollHeight;

    if (testichat.scrollHeight > testichat.clientHeight) {
        $(testichat).mCustomScrollbar();
    }
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
    var start = function(sessionId, statusVideo = false, statusAudio = true) {
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
        app.startSignalling(function(error) {
            if (error != null) {
                console.log(error);
                stop();
                return;
            }

            // Start the local media stream.
            app.startLocalMedia(video, false, statusVideo, statusAudio, function(error) {
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
                app.startConference(function(error) {
                    if (error != null) {
                        console.log(error);
                        stop();
                        return;
                    }

                    // Enable the leave button.
                    //leaveButton.removeAttribute('disabled');

                    //fm.log.info('<span style="font-size: 1.5em;">' + app.sessionId + '</span>');
                    console.log('<span style="font-size: 1.5em;">' + app.sessionId + '</span>');
                }, function() {
                    stop();
                });
            });
        });
    };

    var stop = function() {
        if (!app.sessionId) {
            return;
        }

        // Disable the leave button.
        // leaveButton.setAttribute('disabled', 'disabled');

        console.log('Leaving session ' + app.sessionId + '.');
        //fm.log.info('Leaving session ' + app.sessionId + '.');

        app.sessionId = '';

        $('#catturacam').removeClass('active');

        app.stopConference(function(error) {
            if (error) {
                fm.log.error(error);
            }

            // Disable the media controls.
            //toggleAudioMute.setAttribute('disabled', 'disabled');
            //toggleVideoMute.setAttribute('disabled', 'disabled');

            // Update the UI context.
            video.style.display = 'none';
            loading.style.display = 'block';

            app.stopLocalMedia(function(error) {
                if (error) {
                    fm.log.error(error);
                }

                app.stopSignalling(function(error) {
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
    // fm.util.observe(joinSessionButton, 'click', function(evt) {
    //     if ($(this).hasClass('active')) {
    //         videoChat.style.display = 'none';
    //         $(this).removeClass('active');
    //         stop();
    //     } else {
    //         videoChat.style.display = 'block';
    //         $(this).addClass('active');
    //         $(".menu-tray").show("slide", { direction: "right" }, "slow");
    //         if ($('#toggleAudioMute').hasClass('active'))
    //             statusAudio = true;
    //         else
    //             statusAudio = false;

    //         if ($('#toggleVideoMute').hasClass('active'))
    //             statusVideo = true;
    //         else
    //             statusVideo = false;

    //         start('public', statusVideo, statusAudio);
    //     }
    // });

    fm.util.observe(closeVideo, 'click', function(evt) {
        videoChat.style.display = 'none';
        $('#catturacam').removeClass('active');
        stop();
    });

    fm.util.observe(window, 'unload', function() {
        stop();
    });

    // function webcame
    var tooglevideomute = 0;
    fm.util.observe(toggleVideoMute, 'click', function(evt) {
        tooglevideomute++;
        if ($(this).hasClass('active')) {
            var muted = app.toggleVideoMute();
            $(this).children().attr('src', 'assets/Images/Icons/25_Video_OFF.png');
            $(this).removeClass('active');
            videoChat.style.display = 'none';
            $('#catturacam').removeClass('active');
        } else {
            $(this).children().attr('src', 'assets/Images/Icons/24_Video_ON.png');
            $(this).addClass('active');

            //  //////
            if ($('#toggleVideoMute').hasClass('active')) {
                statusVideo = true;
                start('public', statusVideo, true);
            } else
                statusVideo = false;


        }

    });
}

window.addEventListener("load", () => {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext("2d");
    //   resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    //   variables
    let painting = false;

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
    //   eventListeners 
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mouseleave', finishedPosition);
    canvas.addEventListener('mousemove', draw);
});