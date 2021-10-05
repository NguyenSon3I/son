(function() {

    console.log('checkSystemRequirements');
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

    // it's option if you want to change the WebSDK dependency link resources.
    // ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.0/lib', '/av'); // CDN version default
    // ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.0/lib', '/av'); // china cdn option 
    // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default
    ZoomMtg.preLoadWasm();

    ZoomMtg.prepareJssdk();

    var data = {
        'action': 'iii_notepad_zoom_create_meeting',
    };

    var mid;
    var mpas;

    $.ajax({
        type: 'POST',
        url: iii_script.ajax_url,
        data: data,
        dataType: 'json',
        beforeSend: function() {
            $('#cc-loading').addClass('open');
        },
        success: function(response) {
            $('#cc-loading').removeClass('open');
            var data = JSON.parse(response);
            console.log(data);
            mid = data.id;
            mpas = data.encrypted_password;

            var API_KEY = 'AjfLvY45S62iTggkKDwwMQ';

            /**
             * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
             * The below generateSignature should be done server side as not to expose your api secret in public
             * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/tutorial/generate-signature
             */
            var API_SECRET = 'P7ZcCyyiZhB620pAINa5Cek0OFMhQXEorkOa';



            var meetConfig = {
                apiKey: API_KEY,
                apiSecret: API_SECRET,
                // meetingNumber: parseInt(document.getElementById('meeting_number').value),
                // userName: document.getElementById('display_name').value,
                meetingNumber: mid,
                userName: 'Trung Hieu',
                passWord: mpas,
                leaveUrl: "https://zoom.us",
                role: 0
            };


            var signature = ZoomMtg.generateSignature({
                meetingNumber: meetConfig.meetingNumber,
                apiKey: meetConfig.apiKey,
                apiSecret: meetConfig.apiSecret,
                role: meetConfig.role,
                success: function(res) {
                    console.log(res.result);
                }
            });

            ZoomMtg.init({
                debug: true,
                leaveUrl: 'http://www.zoom.us',
                isSupportAV: true,
                success: function() {
                    ZoomMtg.join({
                        meetingNumber: meetConfig.meetingNumber,
                        userName: meetConfig.userName,
                        signature: signature,
                        apiKey: meetConfig.apiKey,
                        userEmail: 'test@gmail.com',
                        passWord: meetConfig.passWord,
                        success: function(res) {
                            //$('#nav-tool').hide();
                            console.log('join meeting success');
                        },
                        error: function(res) {
                            console.log(res);
                        }
                    });
                },
                error: function(res) {
                    console.log(res);
                }
            });
        }
    });
})();