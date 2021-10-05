$(document).ready(function () {
    // opacity side menu
    // $('#bgopacity').change(function () {
    //     console.log($('#bgopacity').val());
    //     if ($('#bgopacity').val() <= 100 && $('#bgopacity').val() >= 70) {
    //         // $('#canvas').css("z-index","-20");
    //         // $('#sideBarMenu').css("z-index","100");
    //     } else {
    //         // $('#canvas').css("z-index","-19");
    //         // $('#canvas').css("background","transparent");
    //         // $('#sideBarMenu').css("z-index","-100");
    //     }
    //     $('#sideBarMenu').css({
    //         opacity: $(this).val() * '.01'
    //     });
    // });

    // // menu bottom
    // $(".clickToHideBottom").click(function () {
    //     $("#menu-bottom").fadeOut(300);
    //     $(".clickToShowBottom").css("display", "block");
    //     $(".clickToHideBottom").css("display", "none");
    //     $(".message-send").css("bottom", "0");
    // });
    // $(".clickToShowBottom").click(function () {
    //     $("#menu-bottom").fadeIn(300);
    //     $(".clickToShowBottom").css("display", "none");
    //     $(".clickToHideBottom").css("display", "block");
    //     $(".message-send").css("bottom", "40px");
    // });

    // // time popup
    // $("#hideTiming").click(function() {
    //     $(".timing").css("display","none");
    //     $("#hideTiming").addClass("hidden");
    //     $("#showTiming").removeClass("hidden");
    // });
    // $("#showTiming").click(function() {
    //     $(".timing").css("display","block");
    //     $("#hideTiming").removeClass("hidden");
    //     $("#showTiming").addClass("hidden");
    // });

    // // side menu popup
    // $(".hideSideMenu").click(function() {
    //     $("#sideBarMenu").hide();
    //     $(".hideSideMenu").addClass("hidden");
    //     $(".showSideMenu").removeClass("hidden");
    //     $(".opacitySideMenu").hide();
    // });
    // $(".showSideMenu").click(function() {
    //     $("#sideBarMenu").show();
    //     $(".hideSideMenu").removeClass("hidden");
    //     $(".showSideMenu").addClass("hidden");
    //     $(".opacitySideMenu").show();
    // });

    // pen size
    // $(".hr1").click(function{
    //     if($(".hr1").hasClass("active")) {
    //         $("#pencils-body .active").css("padding: 1px");
    //     }
    // });
    // $(".hr2").click(function{
    //     if($(".hr2").hasClass("active")) {
    //         $("#pencils-body .active").css("padding: 1px");
    //     }
    // });
    // $(".hr3").click(function{
    //     if($(".hr3").hasClass("active")) {
    //         $("#pencils-body .active").css("padding: 1px");
    //     }
    // });
    // $(".hr4").click(function{
    //     if($(".hr4").hasClass("active")) {
    //         $("#pencils-body .active").css("padding: 1px");
    //     }
    // });
    $("#damn").click(function{
        alert("damn");
        if($(".hr5").hasClass("active")) {
            $("#pencils-body .active").css("padding: 3px");
        }
    });

    
    // if($(".hr2").hasClass("active")) {
    //     $("#pencils-body .active").css("padding: 1px");
    // }
    // if($(".hr3").hasClass("active")) {
    //     $("#pencils-body .active").css("padding: 1px");
    // }
    // if($(".hr4").hasClass("active")) {
    //     $("#pencils-body .active").css("padding: 1px");
    // }
    // if($(".hr5").hasClass("active")) {
    //     $("#pencils-body .active").css("padding: 3px");
    // }

    // $("#_1").click(function() {
    //     $("#_1").addClass("active");
    //     $("#_5").removeClass("active");
    //     $("#_9").removeClass("active");
    //     $("#_12").removeClass("active");
    //     $("#_15").removeClass("active");
    // });
    // $("#_5").click(function() {
    //     $("#_1").removeClass("active");
    //     $("#_5").addClass("active");
    //     $("#_9").removeClass("active");
    //     $("#_12").removeClass("active");
    //     $("#_15").removeClass("active");
    // });
    // $("#_9").click(function() {
    //     $("#_1").removeClass("active");
    //     $("#_5").removeClass("active");
    //     $("#_9").addClass("active");
    //     $("#_12").removeClass("active");
    //     $("#_15").removeClass("active");
    // });
    // $("#_12").click(function() {
    //     $("#_1").removeClass("active");
    //     $("#_5").removeClass("active");
    //     $("#_9").removeClass("active");
    //     $("#_12").addClass("active");
    //     $("#_15").removeClass("active");
    // });
    // $("#_15").click(function() {
    //     $("#_1").removeClass("active");
    //     $("#_5").removeClass("active");
    //     $("#_9").removeClass("active");
    //     $("#_12").removeClass("active");
    //     $("#_15").addClass("active");
    // });

    // show block-media
    var penClick = 0;
    var eraserClick = 0;
    var colorClick = 0;
    var layerClick = 0;
    var gridClick = 0;
    $("#pencil").click(function() {
        document.getElementById("divrubber").style.display = "none";
        penClick++;
        if(penClick % 2 != 0 ) {
            $(".pencil").addClass("active");
            $(".penOptions").removeClass("hidden");
            $(".colorOptions").addClass("hidden");
            $(".layerOptions").addClass("hidden");
            $(".gridOptions").addClass("hidden");
            $(".eraserOptions").addClass("hidden");
            $(".eraser").removeClass("active");
            $(".color").removeClass("active");
            $(".layer").removeClass("active");
            $(".grid").removeClass("active");
            // rubbing();
        } else {
            $(".pencil").removeClass("active");
            $(".penOptions").addClass("hidden");
        }
        eraserClick = 0;
        colorClick = 0;
        layerClick = 0;
        gridClick = 0;
        // rubbing();
    });
    $("#eraser").click(function() {
        $("#__20").removeClass("active");
        $("#__50").removeClass("active");
        $("#__100").removeClass("active");
        $("#__150").removeClass("active");
        $("#__200").removeClass("active");
        eraserClick++;
        if (eraserClick % 2 != 0) {
            $(".eraser").addClass("active");
            $("#rubberControl").removeClass("hidden");
            $(".pencil").removeClass("active");
            $(".color").removeClass("active");
            $(".layer").removeClass("active");
            $(".grid").removeClass("active");
            $(".penOptions").addClass("hidden");
            $(".colorOptions").addClass("hidden");
            $(".layerOptions").addClass("hidden");
            $(".gridOptions").addClass("hidden");
            $(".eraserOptions").removeClass("hidden");
        } else {
            document.getElementById("divrubber").style.display = "none";
            $(".eraser").removeClass("active");
            $(".eraserOptions").addClass("hidden");
            $("#rubberControl").addClass("hidden");
        }
        // rubbing();
        penClick = 0;
        colorClick = 0;
        layerClick = 0;
        gridClick = 0;
    });
    $("#color").click(function() {
        document.getElementById("divrubber").style.display = "none";
        colorClick++;
        if(colorClick % 2 != 0) {
            $(".color").addClass("active");
            $(".pencil").removeClass("active");
            $(".eraser").removeClass("active");
            $(".layer").removeClass("active");
            $(".grid").removeClass("active");
            $(".penOptions").addClass("hidden");
            $(".colorOptions").removeClass("hidden");
            $(".layerOptions").addClass("hidden");
            $(".gridOptions").addClass("hidden");
            $(".eraserOptions").addClass("hidden");
        } else {
            $(".color").removeClass("active");
            $(".colorOptions").addClass("hidden");
        }
        penClick = 0;
        eraserClick = 0;
        layerClick = 0;
        gridClick = 0;
    });
    $("#layer").click(function() {
        document.getElementById("divrubber").style.display = "none";
        layerClick++;
        if(layerClick % 2 != 0) {
            $(".eraser").removeClass("active");
            $(".pencil").removeClass("active");
            $(".color").removeClass("active");
            $(".layer").addClass("active");
            $(".grid").removeClass("active");
            $(".penOptions").addClass("hidden");
            $(".colorOptions").addClass("hidden");
            $(".layerOptions").removeClass("hidden");
            $(".gridOptions").addClass("hidden");
            $(".eraserOptions").addClass("hidden");
        } else {
            $(".layer").removeClass("active");
            $(".layerOptions").addClass("hidden");
        }
        penClick = 0;
        eraserClick = 0;
        color = 0;
        gridClick = 0;
    });
    $("#grid").click(function() {
        document.getElementById("divrubber").style.display = "none";
        gridClick++;
        if (gridClick % 2 != 0) {
            $(".eraser").removeClass("active");
            $(".pencil").removeClass("active");
            $(".color").removeClass("active");
            $(".layer").removeClass("active");
            $(".grid").addClass("active");
            $(".penOptions").addClass("hidden");
            $(".colorOptions").addClass("hidden");
            $(".layerOptions").addClass("hidden");
            $(".gridOptions").removeClass("hidden");
            $(".eraserOptions").addClass("hidden");
        } else {
            $(".grid").removeClass("active");
            $(".gridOptions").addClass("hidden");
        }
        penClick = 0;
        eraserClick = 0;
        color = 0;
        layer = 0;
    });

    // var partici = 0;
    // var mess = 0;
    // var videoChat = 0;
    // var mic = 0;

    // // show/hide Participant Tab Content
    // $(".show_hideSideParticipant").click(function() {
    //     partici++;
    //     if (partici % 2 != 0) {

    //         $(".show_hideSideParticipant").addClass("active");
    //         $(".participants").removeClass("hidden");
    //     } else {
    //         $(".show_hideSideParticipant").removeClass("active");
    //         $(".participants").addClass("hidden");
    //     }

    // });

    // show/hide Message Tab Content
    // $(".show_hideSideMessage").click(function() {
    //     mess++;
    //     if (mess % 2 != 0) {

    //         $(".show_hideSideMessage").addClass("active");
    //         $(".message").removeClass("hidden");
    //     } else {
    //         $(".show_hideSideMessage").removeClass("active");
    //         $(".message").addClass("hidden");
    //     }

    // });

    // show/hide VideoChat Tab Content
    // $(".show_hideVideoChat").click(function() {
    //     videoChat++;
    //     if (videoChat % 2 != 0) {

    //         $(".show_hideVideoChat").addClass("active");
    //         $("#videoChat").removeClass("hidden");
    //         $(".opacitySideMenu").addClass("hidden");


    //     } else {
    //         $(".show_hideVideoChat").removeClass("active");
    //         $("#videoChat").addClass("hidden");
    //     }

    // });
});

// time countdown
// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         hours = 0;
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);
        
//         hours = hours < 10 ? "0" + hours : hours;
//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;
//        display.textContent = hours + ":" +  minutes + ":" + seconds;

//         if (--timer < 0) {
//             timer = duration;
//             }
//         }, 1000);
//     }

// window.onload = function () {
//     var time = 3000,
//         display = document.querySelector('.countDown');
//     startTimer(time, display);
// };

// (function ($) {
//     var tool;
//     ctx.lineWidth = sizePicker;
//     ctx.lineCap = "round";
//     ctx.strokeStyle = penColor;

//     var history = {
//         redo_list: [],
//         undo_list: [],
//         saveState: function (canvas, list, keep_redo) {
//             keep_redo = keep_redo || false;
//             if (!keep_redo) {
//                 this.redo_list = [];
//             }

//             (list || this.undo_list).push(canvas.toDataURL());
//         },
//         undo: function (canvas, ctx) {
//             this.restoreState(canvas, ctx, this.undo_list, this.redo_list);
//         },
//         redo: function (canvas, ctx) {
//             this.restoreState(canvas, ctx, this.redo_list, this.undo_list);
//         },
//         restoreState: function (canvas, ctx, pop, push) {
//             if (pop.length) {
//                 this.saveState(canvas, push, true);
//                 var restore_state = pop.pop();
//                 var img = new Element('img', {
//                     'src': restore_state
//                 });
//                 img.onload = function () {
//                     ctx.clearRect(0, 0, 3000, 3000);    
//                     ctx.drawImage(img, 0, 0, 3000, 3000, 0, 0, 3000, 3000);
//                 }
//             }
//         },
//         clearBoard: function (canvas, ctx) {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);  
//         }
//     }
// });