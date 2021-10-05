var url = 'http://localhost:8080';

$(function() {
    // This demo depends on the canvas element
    if (!('getContext' in document.createElement('canvas'))) {
        alert('Sorry, it looks like your browser does not support canvas!');
        return false;
    }

    // The URL of your web server (the port is set in app.js)
	if (navigator.userAgent.search("MSIE") >= 0) {
		var url = 'http://localhost.com:8080';
	}
	else if (navigator.userAgent.search("Chrome") >= 0) {
		var url = 'http://localhost.com:8080';
	}
	else if (navigator.userAgent.search("Firefox") >= 0) {
		var url = 'http://localhost.com:8080';
	}
    
    //var url = window.location.hostname;
    var stanza = '';
    if (location.href.indexOf('#') != -1) {
        stanza = location.href.substring(location.href.indexOf('#') + 1);
    }
    var controlpencil = true;
    var controlrubber = false;
    var positionx = '23';
    var positiony = '0';
    var lastEmit = $.now();
    var touchX, touchY;
    var iniziotocco = true;

    var doc = $(document),
        canvas = $('#math'),
        canvas1 = $('#paper1'),
        divrubber = $('#divrubber'),
        frecce = document.getElementById('frecce'),
        instructions = $('#instructions');
    var color = '#000000';
    // A flag for drawing activity
    var drawing = false;
    var clients = {};
    var cursors = {};

    //  funzione richiesta di nick name   

    var username = Math.round($.now() * Math.random());

    if (!username) {
        username = prompt("Hey there, insert your nick name, please", "");

        /*	bootbox.prompt("Hey there, insert your nick name, please", function(result) {                
          if (result === null) {                                             
            Example.show("Prompt dismissed");                              
          } else {
            Example.show("Hi <b>"+result+"</b>");                          
          }
        });  */

    }

    //username = username.substr(0, 20);
    var socket = io.connect(url);

    var ctx = canvas[0].getContext('2d');
    var ctx1 = canvas1[0].getContext('2d');
    var spessore = $('#spessore').value;
    var colorem;
    // Force canvas to dynamically change its size to the same width/height
    // as the browser window.
    //  canvas[0].width = document.body.clientWidth;
    //  canvas[0].height = document.body.clientHeight;

    canvas[0].width = window.innerWidth;
    canvas[0].height = window.innerHeight - 0;


    if (ctx) {

        window.addEventListener('resize', resizecanvas, false);
        window.addEventListener('orientationchange', resizecanvas, false);
        resizecanvas();
    }

    // ctx setup
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    ctx.font = "20px Tahoma";

    // var history = {
    //     redo_list: [],
    //     undo_list: [],
    //     saveState: function (canvas, list, keep_redo) {
    //         keep_redo = keep_redo || false;
    //         if (!keep_redo) {
    //             this.redo_list = [];
    //         }

    //         (list || this.undo_list).push(canvas.toDataURL());
    //     },
    //     undo: function (canvas, ctx) {
    //         this.restoreState(canvas, ctx, this.undo_list, this.redo_list);
    //     },
    //     redo: function (canvas, ctx) {
    //         this.restoreState(canvas, ctx, this.redo_list, this.undo_list);
    //     },
    //     restoreState: function (canvas, ctx, pop, push) {
    //         if (pop.length) {
    //             this.saveState(canvas, push, true);
    //             var restore_state = pop.pop();
    //             var img = new Element('img', {
    //                 'src': restore_state
    //             });
    //             img.onload = function () {
    //                 ctx.clearRect(0, 0, 3000, 3000);    
    //                 ctx.drawImage(img, 0, 0, 3000, 3000, 0, 0, 3000, 3000);
    //             }
    //         }
    //     },
    // }


    // $('#undo').addEventListener('click', function () {
    //     history.undo(canvas[0], ctx);
    // });

    // $('#redo').addEvent('click', function () {
    //     history.redo(canvas, ctx);
    // });

    var id = Math.round($.now() * Math.random());
    if (username == '') {
        username = id
    }

    if (stanza.length > 2) {
        socket.emit('setuproom', {
            'room': stanza,
            'id': id,
            'usernamerem': username
        });
    } else {
        socket.emit('setuproom', {
            'room': '999999',
            'id': id,
            'usernamerem': username
        });
    }

    socket.on('setuproomserKO', function(data) {
        stanza = data.room;
        //document.getElementById('audiocall').disabled = false;
        //document.getElementById('videocall').disabled = false;
        //alert(data.inforoom);
    });

    socket.on('setuproomser', function(data) {
        stanza = data.room;
        //$('<div class="testochatser"><span>FROM SERVER:</span> ' + data.inforoom + data.listautenti + '</div>').appendTo('#testichat');
        document.getElementById('frecce').style.backgroundColor = '#ffff00';
        document.getElementById('audiocall').disabled = false;
        // document.getElementById('videocall').disabled = false;
    });

    $("#pencilrubber").click(function() {
        if ($(this).attr('data-title') === 'Eraser') {
            //$('.minicolors').hide();
           $(this).attr('data-title','Pencil');
            document.getElementById('divrubber').style.display = 'block';
            document.getElementById('setrubbersize').style.display = 'inline';
            //document.getElementById('spessore').style.display = 'none';
            controlpencil = false;
            rubbersize = divrubber.width();
        } else {
            $(this).attr('data-title','Eraser');
            document.getElementById('divrubber').style.display = 'none';
            //document.getElementById('setrubbersize').style.display = 'none';
            //document.getElementById('spessore').style.display = 'inline';
            //$('.minicolors').show();
            controlpencil = true;
        }
    });

    $("input[type=radio]").change(function(){
        var val = $(this).val();
        $("input.minicolors").val(String(val));

        $('input.minicolors').minicolors('settings', {
            value: String(val)
        });            
    });
	/*
    $('#scrivi').keypress(function(e) {
        var code = e.keyCode;
        if (code == '13') {
            if (document.getElementById('scrivi').value.length > 0) {

                socket.emit('chat', {
                    'testochat': document.getElementById('scrivi').value,
                    'id': id,
                    'usernamerem': username,
                    'room': stanza
                });
                $('<div class="testochat"><span>ME:</span> ' + document.getElementById('scrivi').value + '</div>').appendTo('#testichat');
                document.getElementById('scrivi').value = '';

                var objDiv = document.getElementById("testichat");
                objDiv.scrollTop = objDiv.scrollHeight;

            }
        }
    });

    $("#btn-send").click(function() {
        if (document.getElementById('scrivi').value.length > 0) {

            socket.emit('chat', {
                'testochat': document.getElementById('scrivi').value,
                'id': id,
                'usernamerem': username,
                'room': stanza
            });
            $('<div class="testochat"><span>ME:</span> ' + document.getElementById('scrivi').value + '</div>').appendTo('#testichat');
            document.getElementById('scrivi').value = '';

            var objDiv = document.getElementById("testichat");
            objDiv.scrollTop = objDiv.scrollHeight;

        }
    });
	*/
    $('#file-input').change(function(e) {
        var file = e.target.files[0],
            imageType = /image.*/;
        if (!file.type.match(imageType))
            return;

        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);

    });

    /*
    $('#salvasulserver').click(function (){
    var dataserver = canvas[0].toDataURL();

    socket.emit('salvasulserver',{
    				'id': id,
    				'dataserver': dataserver,
    				'orario':  $.now()
    			});										  
    });

    */

    $('#vedomonitor').click(function() {
        if (document.getElementById('monitorcam').style.display == 'none') {
            document.getElementById("monitorcam").style.display = 'block';
            document.getElementById('vedomonitor').innerHTML = ' Hide webcam monitor ';
        } else {
            document.getElementById('monitorcam').style.display = 'none';
            document.getElementById('vedomonitor').innerHTML = ' Show webcam monitor ';
        }
    });

    $('#paper').dblclick(function(e) {
        positionx = e.pageX;
        positiony = e.pageY;
        if (document.getElementById('scrivi').value.length > 1) {
            ctx.fillStyle = $('#minicolore').minicolors('rgbaString');
            ctx.font = document.getElementById('fontsize').value + "px Tahoma";
            ctx.fillText(document.getElementById('scrivi').value, e.pageX, e.pageY);

            socket.emit('doppioclick', {
                'x': e.pageX,
                'y': e.pageY,
                'scrivi': document.getElementById('scrivi').value,
                'color': $('#minicolore').minicolors('rgbaString'),
                'id': id,
                'spessremo': document.getElementById('spessore').value,
                'fontsizerem': document.getElementById('fontsize').value,
                'room': stanza
            });

            document.getElementById('scrivi').value = '';
        }

    });
    $('#salvafoto').click(function() {
        var dataURL = canvas[0].toDataURL();
        document.getElementById("canvasimg").src = dataURL;
        window.open(document.getElementById("canvasimg").src, "toDataURL() image", "width=1000, height=1000");

    });

    $('#cancellalavagna').click(function() {
        $("canvas").each(function(i) {
            if($(this).hasClass('active')){
                var can = $(this);
                var ctxcan = can[0].getContext('2d');
                ctxcan.clearRect(0, 0, canvas[0].width, canvas[0].height);
            }else{
                ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
            }
        });
    });

    //$('#audiocall').click(function() {
    //    window.open('https://vrobbi-signalmaster.herokuapp.com/soloaudio.html#' + stanza, 'WEBRTC VOICE CALL', 'width=700,height=400');
    //});

    socket.on('camperaltriser', function(data) {
        var camdaclient = new Image();
        camdaclient.src = data.camperaltridati;
        camdaclient.onload = function() {
            //	imgdaclient.src = data.fileperaltri;
            ctx.drawImage(camdaclient, data.positionx, data.positiony, 320, 240);
        }
    });

    socket.on('fileperaltriser', function(data) {

        var imgdaclient = new Image();
        imgdaclient.src = data.fileperaltri;
        imgdaclient.onload = function() {
            //	imgdaclient.src = data.fileperaltri;
            ctx.drawImage(imgdaclient, data.positionx, data.positiony);
        }
    });

    socket.on('doppioclickser', function(data) {
        ctx.fillStyle = data.color;
        ctx.font = data.fontsizerem + "px Tahoma";
        ctx.fillText(data.scrivi, data.x, data.y);

    });

    socket.on('chatser', function(data) {

        //alert (data.testochat);
        //$('<div class="testochat"><span>' + data.usernamerem + ':</span> ' + data.testochat + '</div>').appendTo('#testichat');
        //document.getElementById('frecce').style.backgroundColor = '#ffff00';
        var objDiv1 = document.getElementById("testichat");
        objDiv1.scrollTop = objDiv1.scrollHeight;
    });

    socket.on('listautentiser', function(data) {
        //$('<div class="testochatser"><span>FROM SERVER:</span> ' + data.listautenti + '</div>').appendTo('#testichat');
        //document.getElementById('frecce').style.backgroundColor = '#ffff00';
    });

    socket.on('moving', function(data) {

        if (!(data.id in clients)) {
            // a new user has come online. create a cursor for them
            cursors[data.id] = $('<div class="cursor"><div class="identif">' + data.usernamerem + '</div>').appendTo('#cursors');
        }
        // Move the mouse pointer

        cursors[data.id].css({
            'left': data.x,
            'top': data.y
        });

        // Is the user drawing?
        if (data.drawing && clients[data.id]) {

            // Draw a line on the canvas. clients[data.id] holds
            // the previous position of this user's mouse pointer

            ctx.strokeStyle = data.color;
            //	drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y,data.spessremo,data.color);
            drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y, data.spessremo, data.color);
        }

        // Saving the current client state
        clients[data.id] = data;
        clients[data.id].updated = $.now();
    });

    socket.on('toccomoving', function(data) {

        if (!(data.id in clients)) {
            // a new user has come online. create a cursor for them
            cursors[data.id] = $('<div class="cursor"><div class="identif">' + data.usernamerem + '</div>').appendTo('#cursors');
        }
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
            //	drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y,data.spessremo,data.color);
            drawLinerem(clients[data.id].x, clients[data.id].y, data.x, data.y, data.spessremo, data.color);
        }

        // Saving the current client state
        clients[data.id] = data;
        clients[data.id].updated = $.now();
    });

    socket.on('rubberser', function(data) {

        if (!(data.id in clients)) {
            // a new user has come online. create a cursor for them
            cursors[data.id] = $('<div class="cursor"><div class="identif">' + data.usernamerem + '</div>').appendTo('#cursors');
        }
        // Move the mouse pointer

        // Is the user drawing?
        if (data.controlrubber && clients[data.id]) {

            cursors[data.id].css({
                'left': data.x,
                'top': data.y
            });

            ctx.clearRect(data.x, data.y, data.width, data.height);

        }

        // Saving the current client state
        clients[data.id] = data;
        clients[data.id].updated = $.now();
    });

    var prev = {};

    // canvas.addEventListener('touchstart', sketchpad_touchStart, false);
    //            canvas.addEventListener('touchend', sketchpad_touchEnd, false);
    //       canvas.addEventListener('touchmove', sketchpad_touchMove, false);

    canvas[0].addEventListener("change", cambiaspessore, true);

    function cambiaspessore() {
        ctx.lineWidth = document.getElementById('spessore').value;
    }

    frecce.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (document.getElementById("controlli").style.left === 0 + "px") {
            document.getElementById("controlli").style.left = -282 + "px";
            document.getElementById('frecce').style.backgroundColor = '#ffffff';
        } else {
            document.getElementById("controlli").style.left = 0 + "px";
        }
    }, false);

    //  code to draw on canvas
    canvas[0].addEventListener('touchstart', function(e) {
        e.preventDefault();
        getTouchPos();
        socket.emit('mousemove', {
            'x': touchX,
            'y': touchY,
            'drawing': drawing,
            'color': $('#minicolore').minicolors('rgbaString'),
            'id': id,
            'usernamerem': username,
            'spessremo': document.getElementById('spessore').value,
            'room': stanza
        });
        $(".cursor").css("zIndex", 6);
        drawing = true;
        // Hide the instructions
        instructions.fadeOut();

    }, false);

    canvas[0].addEventListener('touchend', function(e) {
        e.preventDefault();
        drawing = false;
        $(".cursor").css("zIndex", 8);
    }, false);

    canvas[0].addEventListener('touchmove', function(e) {
        e.preventDefault();
        if ($.now() - lastEmit > 25) {
            if (controlpencil) {
                prev.x = touchX;
                prev.y = touchY;
                getTouchPos();

                drawLine(prev.x, prev.y, touchX, touchY);

                lastEmit = $.now();
                socket.emit('mousemove', {
                    'x': touchX,
                    'y': touchY,
                    'drawing': drawing,
                    'color': $('#minicolore').minicolors('rgbaString'),
                    'id': id,
                    'usernamerem': username,
                    'spessremo': document.getElementById('spessore').value,
                    'room': stanza
                });
            }
        }

    }, false);

    canvas.on('mousedown', function(e) {
        e.preventDefault();
        prev.x = e.pageX;
        prev.y = e.pageY;
        socket.emit('mousemove', {
            'x': prev.x,
            'y': prev.y,
            'drawing': drawing,
            'color': $('#minicolore').minicolors('rgbaString'),
            'id': id,
            'usernamerem': username,
            'spessremo': document.getElementById('spessore').value,
            'room': stanza
        });

        drawing = true;
        $(".cursor").css("zIndex", 6);
        // Hide the instructions
        instructions.fadeOut();
    });

    canvas.on('mouseup mouseleave', function() {
        drawing = false;
        $(".cursor").css("zIndex", 8);
    });

    canvas.on('mousemove', function(e) {
        posmousex = e.pageX;
        posmousey = e.pageY;

        if ($.now() - lastEmit > 25) {

            if (drawing && (controlpencil)) {
                //     ctx.strokeStyle = document.getElementById('minicolore').value;
                drawLine(prev.x, prev.y, e.pageX, e.pageY);
                prev.x = e.pageX;
                prev.y = e.pageY;
                lastEmit = $.now();

                socket.emit('mousemove', {
                    'x': prev.x,
                    'y': prev.y,
                    'drawing': drawing,
                    'color': $('#minicolore').minicolors('rgbaString'),
                    'id': id,
                    'usernamerem': username,
                    'spessremo': document.getElementById('spessore').value,
                    'room': stanza
                });

            }
        }
        // Draw a line for the current user's movement, as it is
        // not received in the socket.on('moving') event above

    });
    divrubber.on('mouseup mouseleave', function(e) {
        drawing = false;
        controlrubber = false;
    });

    divrubber.on('mousemove', function(e) {
        if (document.getElementById('controlrubber').checked) {

            $("canvas").each(function(i) {
                if($(this).hasClass('active')){
                    var can = $(this);
                    var ctxcan = can[0].getContext('2d');
                    ctxcan.clearRect(divrubber.position().left, divrubber.position().top, rubbersize + 4, rubbersize + 4);
                }else{
                    ctx.clearRect(divrubber.position().left, divrubber.position().top, rubbersize + 4, rubbersize + 4);
                }
            });
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
        // controlrubber= true;
        drawing = false;
    });

    // Remove inactive clients after 10 seconds of inactivity
    setInterval(function() {
        var totalOnline = 0;
        for (var ident in clients) {
            if ($.now() - clients[ident].updated > 8000) {

                // Last update was more than 10 seconds ago.
                // This user has probably closed the page

                cursors[ident].remove();
                delete clients[ident];
                delete cursors[ident];
            } else {
                totalOnline++;
            }
        }
        $('#onlineCounter').html('Users connected: ' + totalOnline);
    }, 8000);
    //// end setinterval function ****************************
    function drawLine(fromx, fromy, tox, toy) {
        ctx.strokeStyle = $('#minicolore').minicolors('rgbaString');
        ctx.lineWidth = document.getElementById('spessore').value;
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
    }

    function drawLinerem(fromx, fromy, tox, toy, spessore, colorem) {
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
        ctx.strokeStyle = $('#minicolore').minicolors('rgbaString');
        ctx.lineWidth = document.getElementById('spessore').value;
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
    }

    function fileOnload(e) {
        var img = $('<img>', {
            src: e.target.result
        });
        // alert(img.src.value);
        //     var canvas1 = $('#paper')[0];
        //     var context1 = canvas1.getContext('2d');
        img.load(function() {
            ctx.drawImage(this, positionx, positiony);
            socket.emit('fileperaltri', {
                'id': id,
                'positionx': positionx,
                'positiony': positiony,
                'fileperaltri': this.src,
                'room': stanza
            });
        });
    }
	/*
    (function() {
        var idtempo;
        var streaming = false,
            video = document.getElementById('video'),
            paper1 = document.getElementById('paper1'),
            startbutton = document.getElementById('catturacam'),
            width = 320,
            height = 240;

        navigator.getMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        navigator.getMedia({
                video: true,
                audio: false
            },
            function(stream) {
                if (navigator.mozGetUserMedia) {
                    video.mozSrcObject = stream;
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
                }
                video.play();
            },
            function(err) {
                console.log("An error occured! " + err);
            }
        );

        video.addEventListener('canplay', function(ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);
                video.setAttribute('width', 320);
                video.setAttribute('height', 240);
                //	  video.setAttribute('maxFrameRate',5);
                //     canvas.setAttribute('width', width);
                //   canvas.setAttribute('height', height);
                streaming = true;
            }

        }, false);

        function takepicture(e) {
            ctx.drawImage(video, positionx, positiony, 320, 240);
            ctx1.drawImage(video, 0, 0, 320, 240);
            var datacam = paper1.toDataURL('image/png');
            // paper1 e ctx1 servono per prelevare solo i dati della webcam e inviarli al server per gli altri	
            socket.emit('camperaltri', {
                'id': id,
                'positionx': positionx,
                'positiony': positiony,
                'camperaltridati': datacam,
                'room': stanza
            });
        }

        startbutton.addEventListener('click', function(ev) {
            takepicture();
            ev.preventDefault();
        }, false);

        document.getElementById('autocamabi').addEventListener('change', function(ev) {

            if (document.getElementById('autocamabi').checked) {
                document.getElementById('tempocam').disabled = true;
                idtempo = setInterval(function() {
                    takepicture();
                }, document.getElementById('tempocam').value);
            } else {
                clearInterval(idtempo);
                document.getElementById('tempocam').disabled = false;
            }
        }, false);

    })(); /////   uscita da (function()
	*/
    
    var __20 = document.getElementById("__20");
    var __50 = document.getElementById("__50");
    var __100 = document.getElementById("__100");
    var __150 = document.getElementById("__150");
    var __200 = document.getElementById("__200");

    document.getElementById('_20').addEventListener('click', function(ev) {
        // ev.preventDefault();
        document.getElementById("divrubber").style.display = "block";
        __20.classList.add("active");
        __50.classList.remove("active");
        __100.classList.remove("active");
        __150.classList.remove("active");
        __200.classList.remove("active");
        divrubber.width(20);
        divrubber.height(20);
        rubbersize = divrubber.width();
    }, false);
    document.getElementById('_50').addEventListener('click', function(ev) {
        // ev.preventDefault();
        document.getElementById("divrubber").style.display = "block";
        __20.classList.remove("active");
        __50.classList.add("active");
        __100.classList.remove("active");
        __150.classList.remove("active");
        __200.classList.remove("active");
        divrubber.width(50);
        divrubber.height(50);
        rubbersize = divrubber.width();
    }, false);
    document.getElementById('_100').addEventListener('click', function(ev) {
        // ev.preventDefault();
        document.getElementById("divrubber").style.display = "block";
        __20.classList.remove("active");
        __50.classList.remove("active");
        __100.classList.add("active");
        __150.classList.remove("active");
        __200.classList.remove("active");
        divrubber.width(100);
        divrubber.height(100);
        rubbersize = divrubber.width();
    }, false);
    document.getElementById('_150').addEventListener('click', function(ev) {
        // ev.preventDefault();
        document.getElementById("divrubber").style.display = "block";
        __20.classList.remove("active");
        __50.classList.remove("active");
        __100.classList.remove("active");
        __150.classList.add("active");
        __200.classList.remove("active");
        divrubber.width(150);
        divrubber.height(150);
        rubbersize = divrubber.width();
    }, false);
    document.getElementById('_200').addEventListener('click', function(ev) {
        // ev.preventDefault();
        document.getElementById("divrubber").style.display = "block";
        __20.classList.remove("active");
        __50.classList.remove("active");
        __100.classList.remove("active");
        __150.classList.remove("active");
        __200.classList.add("active");
        divrubber.width(200);
        divrubber.height(200);
        rubbersize = divrubber.width();
    }, false);

    function resizecanvas() {
        var imgdata = ctx.getImageData(0, 0, canvas[0].width, canvas[0].height);
        canvas[0].width = window.innerWidth;
        canvas[0].height = window.innerHeight - 0;
        ctx.putImageData(imgdata, 0, 0);
    }

    function getTouchPos(e) {
        if (!e)
            var e = event;

        if (e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                //   touchX=touch.pageX-touch.target.offsetLeft;
                // touchY=touch.pageY-touch.target.offsetTop;
                touchX = touch.pageX;
                touchY = touch.pageY;
            }
        }
    }

    document.querySelector("html").classList.add('js');

    var fileInput  = document.querySelector( ".inputfile" ),  
        button     = document.querySelector( ".input-file-trigger" );
        //the_return = document.querySelector(".file-return");
          
    button.addEventListener( "keydown", function( event ) {  
        if ( event.keyCode == 13 || event.keyCode == 32 ) {  
            fileInput.focus();  
        }  
    });
    button.addEventListener( "click", function( event ) {
       fileInput.focus();
       return false;
    });  
    // fileInput.addEventListener( "change", function( event ) {  
    //     the_return.innerHTML = this.value;  
    // });  
    var layerOrder = 35;
    var countLayer = 1;
    addButton = document.getElementById('addButton');
    //deleteButton = document.getElementById('deleteButton');
    addButton.addEventListener("click", function(e) {
        //var text = document.getElementById('listItem').value;

        var count = $('ul#layers-body li').length;
        var addItem = document.getElementById('layers-body');
        var entry = document.createElement("li");        
        text = '<span class="link-layer"><img src="assets/Images/Icons/'+layerOrder+'_Layer'+countLayer+'.png"></span>';
        layerOrder++;
        countLayer++;
        entry.innerHTML = text;    
        addItem.appendChild(entry);

        var len = $("#layers-body li").length;
        var canvas = cloneCanvas(len);
        $('#panel').append(canvas);

        $("#layers-body li").each(function(i) {
            $(this).addClass("item" + (i+1));
            $(this).find('.link-layer').attr("data-cnt",(i+1));            
        });
    });

    $(document).on('click','.deleteButton', function() { 
        --layerOrder;
        --countLayer;          
        var len = $("#layers-body li").length;
        // alert(len);
        // for(var j = 1; j < len + 1; j++){
            // $( "#math"+len).remove();
            $(".item"+len).remove();
        // }
        
        for(var j = len; j > 0; j--) {
            $("#math"+j).remove();
        }

        // $(this).parent().remove();
        $("#layers-body li").each(function(i) {
            //$(this).removeClass();
            $(this).addClass("item" + (i+1));
            $(this).find('.link-layer').attr("data-cnt",(i+1));
            
            var canvas = cloneCanvas((i+1));
            $('#panel').append(canvas);
        });
    });

    $(document).on('click','.link-layer', function() {
        var cnt = $(this).attr('data-cnt');            

        // get active layer
        var activeLayer = 34 + Number(cnt);
        // alert(activeLayer);
        if(!$(this).hasClass('active')){    
            $("#layers-body li").removeClass('selected');
            $("#layers-body li").find('.link-layer').removeClass('active');

            $(this).addClass('active');
            $(this).parent().addClass('selected');
            $(this).find('img')[0].src = 'assets/Images/Icons/'+activeLayer+'_Layer'+cnt+'-Selected.png';            
        } else{
            // ++layerOrder;
            // ++countLayer;
            $(this).parent().removeClass('selected');
            $(this).removeClass('active');   
            $(this).find('img')[0].src = 'assets/Images/Icons/'+activeLayer+'_Layer'+cnt+'.png';   
        }

        if(!$('#math'+cnt).hasClass('active') && $(this).hasClass('active')){
            $('canvas').css('display', 'none');
            $('canvas').removeClass('active');

            $('#math'+cnt).addClass('active');
            $('#math'+cnt).css('display', 'block');
        }
        else{
            $('canvas').css('display', 'none');
            $('#math'+cnt).removeClass('active');
            $('#math').css('display', 'block');
        }

        var can = $('#math'+cnt);
        var ctxcan = can[0].getContext('2d');
        //  code to draw on canvas
        can[0].addEventListener('touchstart', function(e) {
            e.preventDefault();
            getTouchPos();
            socket.emit('mousemove', {
                'x': touchX,
                'y': touchY,
                'drawing': drawing,
                'color': $('#minicolore').minicolors('rgbaString'),
                'id': id,
                'usernamerem': username,
                'spessremo': document.getElementById('spessore').value,
                'room': stanza
            });
            $(".cursor").css("zIndex", 6);
            drawing = true;
            // Hide the instructions
            instructions.fadeOut();

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

                    drawLineMultiCanvas(prev.x, prev.y, touchX, touchY,ctxcan);

                    lastEmit = $.now();
                    socket.emit('mousemove', {
                        'x': touchX,
                        'y': touchY,
                        'drawing': drawing,
                        'color': $('#minicolore').minicolors('rgbaString'),
                        'id': id,
                        'usernamerem': username,
                        'spessremo': document.getElementById('spessore').value,
                        'room': stanza
                    });
                }
            }

        }, false);

        can.on('mousedown', function(e) {
            e.preventDefault();
            prev.x = e.pageX;
            prev.y = e.pageY;
            socket.emit('mousemove', {
                'x': prev.x,
                'y': prev.y,
                'drawing': drawing,
                'color': $('#minicolore').minicolors('rgbaString'),
                'id': id,
                'usernamerem': username,
                'spessremo': document.getElementById('spessore').value,
                'room': stanza
            });

            drawing = true;
            $(".cursor").css("zIndex", 6);
            // Hide the instructions
            instructions.fadeOut();
        });

        can.on('mouseup mouseleave', function() {
            drawing = false;
            $(".cursor").css("zIndex", 8);
        });

        can.on('mousemove', function(e) {
            posmousex = e.pageX;
            posmousey = e.pageY;

            if ($.now() - lastEmit > 25) {

                if (drawing && (controlpencil)) {
                    //     ctx.strokeStyle = document.getElementById('minicolore').value;
                    drawLineMultiCanvas(prev.x, prev.y, e.pageX, e.pageY,ctxcan);
                    prev.x = e.pageX;
                    prev.y = e.pageY;
                    lastEmit = $.now();

                    socket.emit('mousemove', {
                        'x': prev.x,
                        'y': prev.y,
                        'drawing': drawing,
                        'color': $('#minicolore').minicolors('rgbaString'),
                        'id': id,
                        'usernamerem': username,
                        'spessremo': document.getElementById('spessore').value,
                        'room': stanza
                    });

                }
            }
            // Draw a line for the current user's movement, as it is
            // not received in the socket.on('moving') event above
        });
    });
    initVideo();  
});

$(document).ready(function() {
    $("#layers-body li").each(function(i) {
        $(this).addClass("item" + (i+1));
        $(this).find('.link-layer').attr("data-cnt",(i+1));

        var canvas = cloneCanvas((i+1));
        $('#panel').append(canvas);
    });

    $( "#testichat" ).resizable({
        grid: [10000, 1]
    });
    $('.collapse').collapse();
});

function cloneCanvas(index) {
    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = $('#math').width();
    newCanvas.height = $('#math').height();
    newCanvas.id = "math"+index;
    newCanvas.style.display = "none";
    newCanvas.className = "math-panel";

    //return the new canvas
    return newCanvas;
}
//Global variables
if (navigator.userAgent.search("MSIE") >= 0) {
    var webSyncHandleUrl = 'https://websync.mapguide.vn/websync.ashx';
}
else if (navigator.userAgent.search("Chrome") >= 0) {
    var webSyncHandleUrl = 'https://websync.mapguide.vn/websync.ashx';
}
else if (navigator.userAgent.search("Firefox") >= 0) {
    var webSyncHandleUrl = 'https://websync.mapguide.vn/websync.ashx';
}

fm.websync.client.enableMultiple = true;
var clients = new fm.websync.client(webSyncHandleUrl);   
var name = Math.round($.now() * Math.random());
fm.util.addOnLoad(function () {

    //init object chat between users a room 
    var chat = {
        alias: 'Unknown',
        clientId: 0,
        channels: {
            main: '/999999'
        },
        dom: {
            chat: {
                container: document.getElementById('chat'),
                text: document.getElementById('scrivi'),
                log: document.getElementById('testichat'),
                send: document.getElementById('btn-send'),
                username: name,
                roomid: '999999'
            }
        },
        util: {
            start: function () {
                chat.alias = name;
                chat.clientId = '999999';
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
                        channel: '/999999',
                        data: {
                            alias: chat.alias,
                            text: chat.dom.chat.text.value
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
                chat.dom.chat.log.innerHTML = '';
            },
            logMessage: function (alias, text, me) {
                var html = '<span';
                if (me) {
                    html += ' class="me"';
                }
                html += '>' + alias + ': ' + text + '</span>';
                chat.util.log(html);
            },
            logSuccess: function (text) {
                chat.util.log('<span class="success">' + text + '</span>');
            },
            logFailure: function (text) {
                chat.util.log('<span class="failure">' + text + '</span>');
            },
            log: function (html) {
                var div = document.createElement('div');
                div.innerHTML = html;
                chat.dom.chat.log.appendChild(div);
                chat.util.scroll();
            },
            scroll: function () {
                chat.dom.chat.log.scrollTop = chat.dom.chat.log.scrollHeight;
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
        }
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
            //var content = ''

            //chat.util.logSuccess('Could not connect to WebSync.');
        }
    });

    clients.subscribe({
        channel: '/999999',
        onSuccess: function (args) {
            chat.util.logSuccess('Content chat.');
            var logs = args.getExtensionValue('logs');
            if(logs != null){
                for (var i = 0; i < logs.length; i++) {
                    chat.util.logMessage(logs[i].alias, logs[i].text, false);
                }
            }
        },
        onFailure: function (args) {
            chat.util.logSuccess('Not connecting.');
        },
        onReceive: function (args) {            
            chat.util.logMessage(args.getData().alias, args.getData().text, args.getWasSentByMe());
        }
    }); 

    //Call video and voice
	var log = document.getElementById('testichat');
	var videoChat = document.getElementById('videoChat');
	var loading = document.getElementById('loading');
	var video = document.getElementById('video');
	var leaveButton = document.getElementById('leaveButton');
	var toggleAudioMute = document.getElementById('audiocall');
	var toggleVideoMute = document.getElementById('toggleVideoMute');
	var joinSessionButton = document.getElementById('catturacam');
	var captureScreenCheckbox = document.getElementById('autocamabi');
	
	// Create new App.
	var app = new Video(log);
	var start = function(sessionId)
    {
        if (app.sessionId)
        {
            return;
        }

        if (sessionId.length != 6)
        {
            alert('Session ID must be 6 digits long.');
            return;
        }

        app.sessionId = sessionId;
        
        // Switch the UI context.
        location.hash = app.sessionId + '&screen=' + (captureScreenCheckbox.checked ? '1' : '0');
        videoChat.style.display = 'block';
        //sessionSelector.style.display = 'none';

        fm.log.info('Joining session ' + app.sessionId + '.');
 
        // Start the signalling client.
        app.startSignalling(function(error)
        {
            if (error != null)
            {
                alert(error);
                stop();
                return;
            }
			
            // Start the local media stream.
            app.startLocalMedia(video, captureScreenCheckbox.checked, function(error)
            {
                if (error != null)
                {
                    alert(error);
                    stop();
                    return;
                }
                
                // Update the UI context.
                loading.style.display = 'none';
                video.style.display = 'block';

                // Enable the media controls.
                toggleAudioMute.removeAttribute('disabled');
                //toggleVideoMute.removeAttribute('disabled');
                
                // Start the conference.
                app.startConference(function(error)
                {
                    if (error != null)
                    {
                        alert(error);
                        stop();
                        return;
                    }

                    // Enable the leave button.
                    //leaveButton.removeAttribute('disabled');

                    fm.log.info('<span style="font-size: 1.5em;">' + app.sessionId + '</span>');
                }, function() {
                    stop();
                });
            });
        });
    };

    var stop = function()
    {
        if (!app.sessionId)
        {
            return;
        }

        // Disable the leave button.
        // leaveButton.setAttribute('disabled', 'disabled');

        fm.log.info('Leaving session ' + app.sessionId + '.');
        
        app.sessionId = '';
        
        app.stopConference(function(error)
        {
            if (error)
            {
                fm.log.error(error);
            }
            
            // Disable the media controls.
            toggleAudioMute.setAttribute('disabled', 'disabled');
            //toggleVideoMute.setAttribute('disabled', 'disabled');
                
            // Update the UI context.
            video.style.display = 'none';
            loading.style.display = 'block';

            app.stopLocalMedia(function(error)
            {
                if (error)
                {
                    fm.log.error(error);
                }

                app.stopSignalling(function(error)
                {
                    if (error)
                    {
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
    fm.util.observe(joinSessionButton, 'click', function(evt)
    {
		if ($('#catturacam').attr('data-title') === 'open') {
			start('999999');			
			$('#catturacam').attr('data-title','close');
			joinSessionButton.innerHTML = 'Close Webcam';			
		}else{
			location.hash = '';
			stop();
			videoChat.style.display = 'none';
			$('#catturacam').attr('data-title','open');
			joinSessionButton.innerHTML = 'Open Webcam';	
		}
    });

    fm.util.observe(window, 'unload', function()
    {
        stop();
    });

    fm.util.observe(toggleAudioMute, 'click', function(evt)
    {
        var muted = app.toggleAudioMute();
        toggleAudioMute.innerHTML = (muted ? 'Open' : 'Close') + ' Voice Call';
    });

    // Automatically join if the session ID is in the URL.
    var hash = location.href.split("#")[1];
    if (hash)
    {
        var sessionId = hash.split('&')[0];
        var screen = (hash.split('&')[1] == 'screen=1');
        if (screen)
        {
            captureScreenCheckbox.checked = 'checked';
        }
        if (sessionId)
        {
            //joinSessionTextBox.value = sessionId;
            start(sessionId);
        }
    }
});

function initVideo(){
    var videoChat = document.getElementById('videoChat');
    var loading = document.getElementById('loading');
    var video = document.getElementById('video');
    var closeVideo = document.getElementById('closeVideo');
    var toggleAudioMute = document.getElementById('toggleAudioMute');
    var toggleVideoMute = document.getElementById('toggleVideoMute');
    var joinSessionButton = document.getElementById('catturacam');

    var app = new Video(testichat);
    var start = function(sessionId, statusVideo = false, statusAudio = true)
    {
        if (app.sessionId)
        {
            return;
        }

        if (sessionId.length != 6)
        {
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
        app.startSignalling(function(error)
        {
            if (error != null)
            {
                console.log(error);
                stop();
                return;
            }
            
            // Start the local media stream.
            app.startLocalMedia(video, false, statusVideo, statusAudio, function(error)
            {
                if (error != null)
                {
                    console.log(error);
                    stop();
                    return;
                }
                
                // Update the UI context.
                loading.style.display = 'none';
                video.style.display = 'block';

                // Enable the media controls.
                //toggleAudioMute.removeAttribute('disabled');
                //toggleVideoMute.removeAttribute('disabled');
                
                // Start the conference.
                app.startConference(function(error)
                {
                    if (error != null)
                    {
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

    var stop = function()
    {
        if (!app.sessionId)
        {
            return;
        }

        // Disable the leave button.
        // leaveButton.setAttribute('disabled', 'disabled');

        console.log('Leaving session ' + app.sessionId + '.');
        //fm.log.info('Leaving session ' + app.sessionId + '.');
        
        app.sessionId = '';

        $('#catturacam').removeClass('active');
        
        app.stopConference(function(error)
        {
            if (error)
            {
                fm.log.error(error);
            }
            
            // Disable the media controls.
            //toggleAudioMute.setAttribute('disabled', 'disabled');
            //toggleVideoMute.setAttribute('disabled', 'disabled');
                
            // Update the UI context.
            video.style.display = 'none';
            loading.style.display = 'block';

            app.stopLocalMedia(function(error)
            {
                if (error)
                {
                    fm.log.error(error);
                }

                app.stopSignalling(function(error)
                {
                    if (error)
                    {
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
    fm.util.observe(joinSessionButton, 'click', function(evt)
    {
        if($(this).hasClass('active')){
            videoChat.style.display = 'none';
            $(this).removeClass('active');
            stop();
        }else{
            videoChat.style.display = 'block';
            $(this).addClass('active');
            $(".menu-tray").show("slide", {direction: "right" }, "slow");
            if($('#toggleAudioMute').hasClass('active'))
                statusAudio = true;
            else
                statusAudio = false;

            if($('#toggleVideoMute').hasClass('active'))
                statusVideo = true;
            else
                statusVideo = false;
            
            start('public', statusVideo, statusAudio);
        }
    });

    fm.util.observe(closeVideo, 'click', function(evt)
    {
        videoChat.style.display = 'none';
        $('#catturacam').removeClass('active');
        stop();
    });

    fm.util.observe(window, 'unload', function()
    {
        stop();
    });

    fm.util.observe(toggleVideoMute, 'click', function(evt)
    {        
        if($(this).hasClass('active')){
            var muted = app.toggleVideoMute();
            $(this).children().attr('src','assets/icons/icon_Toggle_ALL_OFF.png');
            $(this).removeClass('active');
            videoChat.style.display = 'none';
            $('#catturacam').removeClass('active');
        }else{
            $(this).children().attr('src','assets/icons/icon_Toggle_ALL_ON.png');
            $(this).addClass('active');

            if($('#toggleVideoMute').hasClass('active'))
                statusVideo = true;
            else
                statusVideo = false;

            start('public', statusVideo, true);
        }
        
    });

    fm.util.observe(toggleAudioMute, 'click', function(evt)
    {
        if($(this).hasClass('active')){
            var muted = app.toggleAudioMute();
            $(this).children().attr('src','assets/icons/icon_Toggle_ALL_OFF.png');
            $(this).removeClass('active');
        }else{
            $(this).children().attr('src','assets/icons/icon_Toggle_ALL_ON.png');
            $(this).addClass('active');

            if($('#toggleAudioMute').hasClass('active'))
                statusAudio = true;
            else
                statusAudio = false;
        }
        
    });
}