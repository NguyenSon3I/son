;(function ($, window, document, undefined) {
	'use strict';

	var WS = window.RS || {};
	var plugin_url = 'http://localhost/notepad-html/';

	var $state	= {};
	var wStep	= -1;
	var $panel	= $('#w-panel');
	console.log("Hello world!");

	// Event change mode from Notepad & Worksheet
	WS.ChangeModeFromNotepadWithWorksheet = function () {
		$('.actions-r .r-mode').on('click', function() {
			let $this = $(this);
			let $type = $this.data('type');

			var $current_url = window.location.href;
			var $new_url = $current_url;

			$('.actions-r').find('.r-mode').removeClass('on');
			$('.main-content').addClass('hidden').removeClass('active');
			$('.r-taskbar').addClass('hidden').removeClass('active');

			if ($this.hasClass('on')) {
				$this.removeClass('on');
				$('.main-' + $type).addClass('hidden').removeClass('active');
				$('.taskbar-' + $type).addClass('hidden').removeClass('active');
				$('body').removeClass($type + '-on');
				$('html').removeClass($type + '-on');
			} else {
				$this.addClass('on');
				$('.main-' + $type).addClass('active').removeClass('hidden');
				$('.taskbar-' + $type).addClass('active').removeClass('hidden');
				$('body').removeClass('worksheet-on notepad-on').addClass($type + '-on');
				$('html').removeClass('worksheet-on notepad-on').addClass($type + '-on');
			}

			if ($this.hasClass('worksheet-mode') && $this.hasClass('on')) {
				if ($current_url.indexOf('mode=ws') == -1) {
					if ($current_url.indexOf('?') > 0) {
						$new_url = $current_url + '&mode=ws';
					} else {
						$new_url = $current_url + '?mode=ws';
					}
				}
			} else {
				if ($current_url.indexOf('&') > 0) {
					$new_url = $current_url.replace('&mode=ws', '');
				} else {
					$new_url = $current_url.replace('?mode=ws', '');
				}
			}
			window.location.href = $new_url;
		});
	};

	// Function save worksheet to localstore for undo/redo
	WS.StoreAction = function() {
		wStep++;

		$panel.find('input').each(function(){
			$(this).keyup(function(){
				$(this).attr('value',$(this).val());
			});
		});

		$panel.find('select').each(function(){
			$(this).keyup(function(){
				$(this).attr('value',$(this).val());
			});
		});

		$state['step_' + wStep] = $panel.html();
		localStorage.setItem('ws_state', JSON.stringify($state));
	};

	WS.ChangeStateSheet = function() {
		$('.wsstate').val('2');
	};

	// function init
	WS.init = function() {
		$('.full-screen-mode').on('click', function () {
            let $this = $(this);

            if ($this.hasClass('full')) {
                $this.removeClass('full').addClass('min');
                WS.openFullscreen();
            } else if ($this.hasClass('min')) {
                $this.removeClass('min').addClass('full');
                WS.closeFullscreen();
            }

        });

		$panel.on('click', function() {
			WS.StoreAction();
		});

		// Clear title
			$('.ws-title-clear').unbind('click').bind('click', function () {
				WS.ClearSimpleData();
				WS.StoreAction();
				WS.ChangeStateSheet();
			});


		// add undo / redo to input title
		$('.ws-title-input').on('click', function () {
			WS.ClearSimpleData();
			WS.StoreAction();
			WS.ChangeStateSheet();
		});

		$('select').bind({
			'change': function () {
				WS.ClearSimpleData();
				WS.StoreAction();
				//WS.ChangeStateSheet();
			}
		});

		// Delete current ws edit
		$('.ws-delete').unbind('click').bind('click', function (el) {
			el.preventDefault();
			WS.ClearSimpleData();

			// if (($('.ws-title-input').val() == '' || $('.ws-subject select').val() == '') && $('.wsstate').val() === '2') {
			// 	$('.ws-notice').removeClass('hidden').addClass('wsn-insert-video');
			// 	$('.ws-notice').find('.wsn-text').text(iii_script.ws_notice_title_empty);
			// 	$('.ws-notice').find('.wsn-type').val('title-can-not-emty');
			// 	return;
			// }

			// if ($('.wsstate').val() === '2') {
			// 	$('.ws-notice').removeClass('hidden');
			// 	$('.ws-notice').find('.wsn-text').text(iii_script.ws_notice_delete);
			// 	$('.ws-notice').find('.wsn-type').val('delete');
			// 	$('.wsstate').val('1');
			// } else {
			// 	$('.ws-title-input').val('');
			// 	$('.ws-questions-number ul').find('li').remove();
			// 	$panel.find('.item-ws').remove();
			// 	$panel.find('.wsid').val('');
			// 	$('.ws-subject select').selectBoxIt('selectOption', 0);
			// 	$('.wsstate').val('1');
			// }
		});

		// Clear current content current ws
		$('.ws-clear').unbind('click').bind('click', function () {
			WS.ClearSimpleData();

			if ($('.wsstate').val() == '2') {
				$('.ws-notice').removeClass('hidden');
				$('.ws-notice').find('.wsn-text').text(iii_script.ws_notice_clear);
				$('.ws-notice').find('.wsn-type').val('clear');
			} else {

			}
		});

		// Delete current question
		$('.wsq-delete-current').unbind('click').bind('click', function () {
			WS.ClearSimpleData();
			$('.ws-notice').removeClass('hidden');
			$('.ws-notice').find('.wsn-text').text(iii_script.ws_notice_question);
			$('.ws-notice').find('.wsn-type').val('question');
		});

		// Add Text component
		$('#btn-ws-add-type-box').unbind('click').bind('click', function () {
			let $ws = $panel.find('.item-ws').not('.hidden');

			WS.ClearSimpleData();
			WS.createComponentText($ws);
			WS.StoreAction();
			WS.ChangeStateSheet();
		});

		// Add Video component
		$('#btn-ws-add-video').unbind('click').bind('click', function () {
			let $ws = $('#w-panel .item-ws').not('.hidden');

			WS.ClearSimpleData();
			WS.createComponentVideo($ws);
			WS.StoreAction();
			WS.ChangeStateSheet();
		});

		// Add Image Component
		$('#btn-ws-add-image').unbind('click').bind('click', function () {
			let $ws = $('#w-panel .item-ws').not('.hidden');

			WS.ClearSimpleData();
			createComponentImage($ws);
			WS.StoreAction();
			WS.ChangeStateSheet();
		});

		// Call User Login
		$('.ws-login').unbind('click').bind('click', function () {
			WS.UserLogin();
		});

		// change ws mode
		$('.btn-ws-mode').unbind('click').bind('click', function() {
			var $this   = $(this);
			var $val    = $this.attr('data-type');
			var $p      = $this.parents('.ws-mode');
			var $input  = $p.find('.ws-mode-input');
			

			WS.ClearSimpleData();

			$p.find('.btn-ws-mode').removeClass('active');
			$this.removeClass('active');
			$input.val($val);
			WS.StoreAction();
			WS.ChangeStateSheet();
		});

		// // Add Quesiton single anwer
		// $('#btn-ws-add-single').unbind('click').bind('click', function() {
		// 	WS.CreateQuestionSingleAnswer();
		// 	WS.StoreAction();
		// 	WS.ChangeStateSheet();
		// });


		// Add Quesiton single anwer
		$('.wsq-insert-single').unbind('click').bind('click', function () {
			
			WS.CreateQuestionSingleAnswer();
			WS.StoreAction();
			WS.ChangeStateSheet();
		});

		// // Add Quesiton multi anwer
		// $('#btn-ws-add-multi').unbind('click').bind('click', function () {
		// 	WS.CreateQuestionMultiAnswer();
		// 	WS.StoreAction();
		// 	WS.ChangeStateSheet();
		// });

		// Add Quesiton multi anwer
		$('.wsq-insert-multi').unbind('click').bind('click', function () {
			
			WS.CreateQuestionMultiAnswer();
			WS.StoreAction();
			WS.ChangeStateSheet();
		});

		// Arrow previous question
		$('.wsq-arrow-left').unbind('click').bind('click', function () {
			var $index = $('.ws-questions-number ul').find('.active').attr('data-index');

			if ($index > 1) {
				var $new_index = parseInt($index) - 1;

				$('.ws-questions-number ul').find('li').removeClass('active');
				$('.ws-questions-number ul').find("[data-index='" + $new_index + "']").addClass('active');
				$panel.find('.item-ws').addClass('hidden');
				$('#ws' + $new_index).removeClass('hidden');
				WS.ClearSimpleData(); // Test new
			}
		});

		// Arrow next question
		$('.wsq-arrow-right').unbind('click').bind('click', function () {
			var $index = $('.ws-questions-number ul').find('.active').attr('data-index');
			WS.ClearSimpleData(); // Test new
			if ($index < $('.ws-questions-number ul').find('li').length) {
				var $new_index = (parseInt($index) + 1);

				$('.ws-questions-number ul').find('li').removeClass('active');
				$('.ws-questions-number ul').find("[data-index='" + $new_index + "']").addClass('active');
				$panel.find('.item-ws').addClass('hidden');
				$('#ws' + $new_index).removeClass('hidden');
			}
		});
	};

	// function User Login
	WS.UserLogin = function() {
		if ($('.ws-popup-login').hasClass('active')) {
				$('.ws-popup-login').removeClass('active');
			} else {
				$('.ws-popup-login').addClass('active');
			}
		};

	// Create Component Video
	WS.createComponentVideo = function($component) {
		var $wrapper_video   = $('<div/>', {class: 'item-component ic-video'});

		$component.prepend($wrapper_video);

		var $video_content = [
			'<div class="ic-inner">',
			'<div class="ic-left">',
			'<div class="ic-btn-video ic-btn"><img src="' + plugin_url + 'assets/images/worksheet/icon_16_Insert_Video.png" />' + iii_script.ic_btn_video + '</div>',
			'<div class="hidden ic-popup-video"><button>' + iii_script.ic_btn_video_button + '</button><input type="text" name="" /></div>',
			'<div class="ic-video-value"></div>',
			'<input type="hidden" class="ic-video-input" />',
			'</div>',
			'<div class="ic-right ic-move">',
			'</div>',
			'</div>'
		];

		$($video_content.join('')).appendTo($wrapper_video);

		$(window).on('resize', function() {
			$('.item-component.ic-video').each(function () {
				var $this = $(this);
				$this.find('.ic-inner').css('height', $this.find('.ic-video-value').height());
				$this.find('.ic-inner').css('align-items', 'flex-start');
			});
		});

		WS.EventButtonComponentVideo();
		WS.createComponentButtonMove($wrapper_video.find('.ic-move'));
	};

	// Event click button in component video
	WS.EventButtonComponentVideo = function() {
		$('.ic-btn-video').on('click', function () {
		   $(this).siblings('.ic-popup-video').removeClass('hidden');
		   $(this).siblings('.ic-video-value').empty();
		   WS.ClearSimpleData(); // Test new
		});

		$('.ic-popup-video button').on('click', function () {
			var $this    = $(this);
			var $popup   = $this.parents('.ic-popup-video');
			var $val     = $this.siblings('input').val();

			if ($val.indexOf('https://www.youtube.com/') != -1) {
				$popup.addClass('hidden');
				$popup.siblings('.ic-video-value').empty().html($val);
				$popup.siblings('.ic-video-input').val($val);
			} else {
				$('.ws-notice').removeClass('hidden').addClass('wsn-insert-video');
				$('.ws-notice').find('.wsn-text').text(iii_script.ws_notice_insert_video);
				$('.ws-notice').find('.wsn-type').val('insert_video');
			}

			WS.ClearSimpleData();
		});
	};

	// Create Component Text
	WS.createComponentText = function($component) {
		var $wrapper_text   = $('<div/>', {class: 'item-component ic-text'});

		$component.prepend($wrapper_text);

		var $text_content = [
			'<div class="ic-inner">',
			'<div class="ic-left">',
			'<div class="ic-btn-text ic-btn"><img src="' + plugin_url + 'assets/images/worksheet/icon_17_Insert_Text.png" />' + iii_script.ic_btn_text + '</div>',
			'<div class="hidden ic-popup-text"><textarea class="autoExpand"></textarea></div>',
			'<div class="ic-text-value"></div>',
			'<input type="hidden" class="ic-text-input" />',
			'</div>',
			'<div class="ic-right ic-move">',
			'</div>',
			'</div>'
		];

		$($text_content.join('')).appendTo($wrapper_text);

		$(document).one('focus.autoExpand', 'textarea.autoExpand', function(){
			var savedValue = this.value;
			this.value = '';
			this.baseScrollHeight = this.scrollHeight;
			this.value = savedValue;
		}).on('input.autoExpand', 'textarea.autoExpand', function(){
			// var minRows = 1;
			// this.rows = minRows;
			// var rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 18);
			//
			// if (rows === -0) {
			// 	this.rows = 1;
			// } else {
			// 	this.rows = rows;
			// }
			//
			// if (rows > 1) {
			// 	$(this).parents('.ic-text').find('.ic-inner').css({
			// 		'height': $(this).height() + 20,
			// 		'align-items': 'flex-start',
			// 	});
			//
			// 	$(this).css({
			// 		'height': 'auto',
			// 		'border-left': 'none',
			// 	});
			//
			// 	$(this).parents('.ic-text').find('.ic-inner .ic-left').css({
			// 		'align-items': 'flex-start',
			// 	});
			//
			// 	$(this).parents('.ic-text').find('.ic-inner .ic-right').css({
			// 		'padding-top': '5',
			// 	});
			// } else if (rows === 1 || rows === -0) {
			// 	$(this).parents('.ic-text').find('.ic-inner').css({
			// 		'height': 'auto',
			// 	});
			// }
		});

		$(window).on('resize', function() {
			// $('.item-component.ic-text').each(function () {
			// 	var $this = $(this);
			//
			// 	console.log($this.find('.ic-popup-text textarea').height());
			//
			// 	$this.find('.ic-inner').css('height', $this.find('.ic-text-value').height());
			// });
		});

		WS.EventButtonComponentText();
		WS.createComponentButtonMove($wrapper_text.find('.ic-move'));

	};

	// Event click button in component text
	WS.EventButtonComponentText = function() {
		$('.ic-btn-text').on('click', function () {
		   $(this).siblings('.ic-popup-text').removeClass('hidden');
		   $(this).siblings('.ic-text-value').empty();
		   WS.ClearSimpleData(); // Test new
		});

		$('.ic-popup-text textarea').on('keypress', function (e) {
		   var $this    = $(this);
		   var $popup   = $this.parents('.ic-popup-text');
		   var $val     = $this.val();

			if (e.keyCode === 13) {
				e.preventDefault();

				$popup.addClass('hidden');
				$popup.siblings('.ic-text-value').empty().html($val);
				$popup.siblings('.ic-text-input').val($val);
			}

			WS.ClearSimpleData();
		});
	};

	// Create Component Image
	WS.createComponentImage = function($component) {
		var $index = $panel.find('.item-ws').length;
		var $wrapper_image   = $('<div/>', {class: 'item-component ic-image'});

 

		$component.prepend($wrapper_image);

		var $image_content = [
			'<div class="ic-inner">',
			'<div class="ic-left">',
			'<div class="ic-btn-image ic-btn"><img src="' + plugin_url + 'assets/images/worksheet/icon_15_Insert_Image.png " />' + iii_script.ic_btn_image + '</div>',
			'<div class="ic-image-value" > </div>',
			'<input type="file" class="ic-image-input" multiple="multiple" id="input'+$index+'" accept="image/*" style="display: none;"/>',
			'<input type="hidden" class="ic-image-has-img" value="0"/>',
			'<input type="hidden" class="ic-image-current-val" />',
			'</div>',
			'<div class="ic-right ic-move">',
			'</div>',
			'</div>'

		];

		$($image_content.join('')).appendTo($wrapper_image);
		var $input = $("#input"+$index);

		WS.EventButtonComponentImage();
		WS.createComponentButtonMove($wrapper_image.find('.ic-move'));
	};

	WS.EventButtonComponentImage = function() {
		$('.ic-btn-image').click(function () {
			let $input 	= $(this).siblings('.ic-image-input');
			let show	= $(this).siblings('.ic-image-value');

			show.empty();
			$input.click();

			$input.unbind('change').bind('change', function (input) {
				let file	= input.target.files;

				$input.siblings('.ic-image-has-img').val('0');

				for(let i = 0; i < file.length; i++) {
					show.append('<span>' + file[i].name + '</span>,');
				}
			});

			WS.ClearSimpleData();
		});
	};

	// function merge create components to one
	WS.createComponent = function($item) {
		WS.createComponentText($item);
		WS.createComponentVideo($item);
		WS.createComponentImage($item);

		WS.EventButtonOrder();
	};

	// function create button up/down/delete for comment
	WS.createComponentButtonMove = function($el) {
		var $btn_content = [
			'<div class="ic-move-up ic-move-btn"><img src="' + plugin_url + 'assets/images/worksheet/icon_01_MoveUP.png" /></div>',
			'<div class="ic-move-down ic-move-btn"><img src="' + plugin_url + 'assets/images/worksheet/icon_02_MoveDOWN.png" /></div>',
			'<div class="ic-move-delete ic-move-btn"><img src="' + plugin_url + 'assets/images/worksheet/icon_03_Delete.png" /></div>',
		];

		$($btn_content.join('')).appendTo($el);
	};

	// Event for buton move up/down/delete for component
	WS.EventButtonOrder = function() {
		$('.ic-move-up').unbind('click').bind('click', function() {
			var $com        = $(this).parents('.item-component');
			WS.ClearSimpleData(); // Test new
			$com.insertBefore($com.prev());
		});

		$('.ic-move-down').unbind('click').bind('click', function () {
			var $com        = $(this).parents('.item-component');
			WS.ClearSimpleData(); // Test new
			$com.insertAfter($com).next();
		});

		$('.ic-move-delete').unbind('click').bind('click', function () {
			var $com        = $(this).parents('.item-component');
			WS.ClearSimpleData(); // Test new
			$com.remove();
		});
	};

	// Function Create Text Editor for question and answser
	WS.makeTextEditor = function($el) {
		$el.Editor({
			'indent': false,
			'outdent': false,
			'print': false,
			'rm_format': false,
			'status_bar': false,
			'strikeout': false,
			'splchars': false,
			'fonteffects': false,
			'actions': false,
			'fonts': false,
			'font_size': false,
			'insert_table': false,
			'select_all': false,
			'togglescreen': false,
			'undo': false,
			'redo': false,
		});

		$('.Editor-editor').each(function () {
			$(this).on('paste', function (e) {
				e.preventDefault();
				let pastedData = e.originalEvent.clipboardData.getData('text');
				pastedData = pastedData.replace(/<!--(.*?)-->/gm, '');
				$(this).parents('.Editor-container').siblings('.txtEditor').Editor('setText', pastedData);
			});
			$(this).on('click', function (e) {	
				WS.ClearSimpleData();
			});

		});

	};



	// Function make active questions
	 WS.ActiveTabQuestion = function() {
		$('.ws-questions-number ul').find('li').on('click', function () {
			$('.ws-questions-number ul').find('li').removeClass('active');
			$(this).addClass('active');
			$panel.find('.item-ws').addClass('hidden');
			$('#ws' + $(this).attr('data-index')).removeClass('hidden');

		});
		$('.ws-questions-number ul').on('click', function () {
			WS.ClearSimpleData();
			WS.StoreAction();
			WS.ChangeStateSheet();
		});
		var $no_ws_clone = $('.ws-no-worksheet');

		$('.ws-no-worksheet').remove();
		$no_ws_clone.insertAfter($('.item-ws').last());
	};

	// Function create button in bottom question, now have button save
	WS.createButtonBottomQuestion = function($item) {
		var $button   = $('<div/>', {class: 'item-btn-bottom'}).appendTo($item);

		var $btn_save_question = [
			'<div class="item-btn-save-question">',
			'<span>' + iii_script.save_question + '</span>',
			'</div>'
		];

		$($btn_save_question.join('')).appendTo($button);

		WS.SaveQuestion();
	};

	WS.SaveQuestionContent = function() {
		var data = {};
		var q   = {};

		if ($('.ws-title-input').val() == '' || $('.ws-subject .iii-select').val() == '') {
			$('.ws-notice').removeClass('hidden').addClass('wsn-insert-video');
			$('.ws-notice').find('.wsn-text').text(iii_script.ws_notice_title_empty);
			$('.ws-notice').find('.wsn-type').val('title-can-not-emty');
			return;
		}

		$panel.find('.item-ws').each(function () {
			var each_data = {};

			each_data = WS.GetDataEachQuestion($(this), each_data);

			var $wrapepr_id = $(this).attr('id');
			var qid         = $wrapepr_id.replace('ws', '');
			q['qid' + qid]  = each_data;
		});

		data['action']      = 'iii_notepad_worksheet_save_worksheet';
		data['wsid']        = $('.wsid').val();
		data['ws_title']    = $('.ws-title-input').val();
		data['question']    = q;
		data['mode']        = $('.ws-mode-input').val();
		data['subject']     = $('.ws-subject select').val();

		$.ajax({
			type: 'POST',
			url: iii_script.ajax_url,
			data: data,
			dataType: 'json',
			beforeSend: function () {
				$('#cc-loading').addClass('open');
			},
			success: function (response) {
				$('#cc-loading').removeClass('open');

				if (response.code === 1 || response.code === 2) {
					$('.ws-notice').removeClass('hidden').addClass('wsn-insert-video');
					$('.ws-notice').find('.wsn-text').text(iii_script.ws_notice_save_ws_done);
					$('.ws-notice').find('.wsn-type').val('save-ws-done');
					//alert('Save Worksheet Done');
					//location.reload(true);
					$('.wsid').val(response.sheet_id);
					$('.wsstate').val('1');
					WS.DisableEvents();
				} else if (response.code === 3) {
					$('.ws-notice').removeClass('hidden').addClass('wsn-insert-video');
					$('.ws-notice').find('.wsn-text').text(iii_script.ws_notice_need_login);
					$('.ws-notice').find('.wsn-type').val('need-login');
				}
			}
		});
	};

	WS.DisableEvents = function() {
		$('#menu-main').addClass('disable-menu');
	};

	WS.EnableEvent = function() {
		$('#menu-main').removeClass('disable-menu');
	};

	// Event save worksheet to database
	WS.SaveQuestion = function() {
		$('.item-btn-save-question').unbind('click').bind('click', function () {
			WS.SaveQuestionContent();
		});
	};

	// Function make data in each Questions to save worksheet
	WS.GetDataEachQuestion = function($wrapper, data) {
		$wrapper.find('.item-component').each(function () {
			var $index = $(this).index();

			if ($(this).find('.ic-text-input').length) {
				data['text_' + $index] = $(this).find('.ic-text-input').val();
			}

			if ($(this).find('.ic-image-input').length) {
				if ($(this).find('.ic-image-has-img').val() == '0') {
					var $image_id = WS.SaveImageToDb($(this).find('.ic-image-input'));
				} else {
					var $image_id = $(this).find('.ic-image-current-val').val();
				}

				data['image_' + $index] = $image_id;
			}

			if ($(this).find('.ic-video-input').length) {
				data['video_' + $index] = $(this).find('.ic-video-input').val();
			}

			if ($(this).find('.item-question').length) {
				data['question_' + $index] = $(this).find('.item-question .txtEditor').Editor('getText');
			}

			if ($(this).find('.multi-choice').length) {
				var $m = {};

				$(this).find('.multi-choice .item-child').each(function() {
					if ($(this).find('.choice-switch input').is(':checked')) {
						$m['choice_' + $(this).index()] = 0;
					} else {
						$m['choice_' + $(this).index()] = 1;
					}

					$m['text_' + $(this).index()] = $(this).find('.choice-text textarea').val();
				});

				var blkstr = [];

				$.each($m, function(index, value) {
					var str = index + ":" + value;
					blkstr.push(str);
				});

				data['multi_choice_' + $index] = blkstr.join(",");
			}

			if ($(this).find('.item-answer').length) {
				data['single_answer_' + $index] = $(this).find('.item-answer .txtEditor').Editor('getText');
			}

		});

		return data;
	};

	// Function Create question single answer
	WS.CreateQuestionSingleAnswer = function() {
		var $index = $panel.find('.item-ws').length;

		$panel.find('.item-ws').addClass('hidden');
		$('.ws-questions-number ul').find('li').removeClass('active');
		$('.ws-questions-number ul').append('<li class="active" data-index="' + ($index + 1) + '">' + ($index + 1) + '</li>');


		var $item       = $('<div/>', {class: 'item-ws', id: 'ws' + ($index + 1)}).appendTo($panel);
		var $qa         = $('<div/>', {class: 'item-component item-qa'}).appendTo($item);

		var $question           = $('<div/>', {class: 'item-question'}).appendTo($qa);
		var $question_title     = $('<div/>', {class: 'item-title q-title', html: iii_script.question_title + '<div class="ic-move"></div>'}).appendTo($question);
		var $question_input     = $('<input/>', {class: 'txtEditor', name: 'q-txt'}).appendTo($question);

		var $answer             = $('<div/>', {class: 'item-answer'}).appendTo($qa);
		var $answer_title       = $('<p/>', {class: 'item-title a-title', text: iii_script.answer_title}).appendTo($answer);
		var $answer_input       = $('<input/>', {class: 'txtEditor', name: 'a-txt'}).appendTo($answer);

		WS.makeTextEditor($question_input);
		WS.makeTextEditor($answer_input);

		WS.ActiveTabQuestion();
		WS.createComponent($item);
		WS.createButtonBottomQuestion($item);
		WS.createComponentButtonMove($qa.find('.q-title .ic-move'));
		WS.EventButtonOrder();
		WS.ClearSimpleData(); // Test new
	}

	// Function Create question multi answer
	WS.CreateQuestionMultiAnswer = function() {
		var $index = $panel.find('.item-ws').length;

		$panel.find('.item-ws').addClass('hidden');
		$('.ws-questions-number ul').find('li').removeClass('active');
		$('.ws-questions-number ul').append('<li class="active" data-index="' + ($index + 1) + '">' + ($index + 1) + '</li>');

		var $item       = $('<div/>', {class: 'item-ws', id: 'ws' + ($index + 1)}).appendTo($panel);
		var $qa         = $('<div/>', {class: 'item-component item-qa'}).appendTo($item);

		var $question           = $('<div/>', {class: 'item-question'}).appendTo($qa);
		var $question_title     = $('<div/>', {class: 'item-title q-title', html: iii_script.question_title + '<div class="ic-move"></div>'}).appendTo($question);
		var $question_input     = $('<input/>', {type: 'text', class: 'txtEditor', name: 'q-txt'}).appendTo($question);

		WS.makeTextEditor($question_input);

		var $answer             = $('<div/>', {class: 'item-answer multi-choice'}).appendTo($qa);
		var $answer_title       = $('<p/>', {class: 'item-title a-title', text: iii_script.multi_answer_title}).appendTo($answer);

		var i = null;

		for (i = 1; i <= 6; i++) {
			var $child_answer   = $('<div/>', {id: 'ac-' + i, class: 'item-child'}).appendTo($answer);

			var $switch_answer = [
				'<div class="choice-switch">',
				'<label class="on-off-switch">',
				'<input type="checkbox" />',
				'<span class="on-off-slider"><img src="' + plugin_url + '/assets/images/worksheet/icon_19_Incorrect_Answer_Switch.png" class="off" /><img class="on" src="' + plugin_url + '/assets/images/worksheet/icon_18_Correct_Answer_Switch.png" /></span>',
				'</label>',
				'</div>'
			];

			$($switch_answer.join('')).appendTo($child_answer);

			var $texarea = [
				'<div class="choice-text">',
				'<label>' + iii_script.choice_text + ' ' + i + ':</label>',
				'<textarea></textarea>',
				'</div>'
			];

			$($texarea.join('')).appendTo($child_answer);
		}

		WS.ActiveTabQuestion();
		WS.createComponent($item);
		WS.createButtonBottomQuestion($item);
		WS.createComponentButtonMove($qa.find('.q-title .ic-move'));
		WS.EventButtonOrder();
		WS.ClearSimpleData(); // Test new
	}

	// Function undo/redo
	WS.UndoRedo = function() {
		$('#btn-ws-undo').on('click', function () {
			if (wStep > 1) {
				wStep--;
			}

			var $ws_state 	= localStorage.getItem('ws_state');
			$ws_state 		= JSON.parse($ws_state);

			$panel.html($ws_state['step_' + wStep]);

			WS.EventForEditWs();
		});

		$('#btn-ws-redo').on('click', function () {
			var $ws_state 	= localStorage.getItem('ws_state');
			$ws_state 		= JSON.parse($ws_state);

			if (wStep < Object.keys($ws_state).length) {
				wStep++;
			}

			$panel.html($ws_state['step_' + wStep]);

			WS.EventForEditWs();
		});
	};

	// List function event for edit ws
	WS.EventForEditWs = function() {
		WS.init();
		WS.EventButtonOrder();
		WS.ActiveTabQuestion();

		WS.EventButtonComponentText();
		WS.EventButtonComponentVideo();
		WS.EventButtonComponentImage();

		WS.SaveQuestion();

		$('.txtEditor').each(function () {
			$(this).siblings('.Editor-container').remove();
			WS.makeTextEditor($(this));
			$(this).Editor('setText', $(this).val());
		});

		//$('select').siblings('.selectboxit-container').remove();
		$("select").selectBoxIt();
	};

	// Function Notice
	WS.Notice = function() {
		$('.wsn-btn-yes').on('click', function () {
			var $this           = $(this),
				$notice_parent  = $this.parents('.ws-notice'),
				$type           = $notice_parent.find('.wsn-type').val();

				if ($type == 'clear') {
					$panel.find('.item-ws .ic-image .ic-image-value').empty();
					$panel.find('.item-ws .ic-image .ic-image-input').val('');
					$panel.find('.item-ws .ic-image .ic-image-input-val').attr('src', '');

					$panel.find('.item-ws .ic-video .ic-video-value').empty();
					$panel.find('.item-ws .ic-video .ic-video-input').val('');
					$panel.find('.item-ws .ic-video .ic-popup-video').addClass('hidden');
					$panel.find('.item-ws .ic-video .ic-popup-video input').val('');

					$panel.find('.item-ws .ic-text .ic-text-value').empty();
					$panel.find('.item-ws .ic-text .ic-text-input').val('');
					$panel.find('.item-ws .ic-text .ic-popup-text textarea').val('');
					$panel.find('.item-ws .ic-text .ic-popup-text').addClass('hidden');

					$panel.find('.item-ws .txtEditor').each(function () {
						$(this).Editor('setText', '');
					});

					$panel.find('.multi-choice .choice-text textarea').val('');
				} else if ($type == 'delete') {
					WS.SaveQuestionContent();

					$('.ws-title-input').val('');
					$('.ws-questions-number ul').find('li').remove();
					$panel.find('.item-ws').remove();
					$panel.find('.wsid').val('');
					$('select').selectBoxIt('selectOption', 0);
				} else if ($type == 'question') {
					var $index = $('.ws-questions-number ul').find('.active').attr('data-index');

					if ($index > 1) {
						var $new_index = parseInt($index) - 1;
					} else {
						var $new_index = parseInt($index) + 1;
					}

					$('.ws-questions-number ul').find("[data-index='" + $index + "']").remove();
					$('#ws' + $index).remove();

					$('.ws-questions-number ul').find('li').removeClass('active');
					$('.ws-questions-number ul').find("[data-index='" + $new_index + "']").addClass('active');
					$panel.find('.item-ws').addClass('hidden');
					$('#ws' + $new_index).removeClass('hidden');
				} else if ($type === 'save-ws-done') {

				} else if ($type === 'title-can-not-emty') {

				} else if ($type === 'need-login') {

				} else if ($type === 'delete-ws-in-list-search') {
					var data = {
						'action': 'iii_notepad_worksheet_delete_worksheet_from_list_search',
						'sid': $('.wlr-content-list > .active').attr('data-w')
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

							if (response === -99) {
								alert('You need login to do action');
							} else if (response === 1) {
								$('.w-list-listworksheet .wlr-content-list > .active').remove();
							} else if (response === 0) {
								alert('Have error on process, please contact with admin');
							}


						}
					});
				} else if ($type === 'save-current-ws-before-open-list') {
					WS.SaveQuestionContent();
				}

				$('.ws-notice').addClass('hidden').removeClass('wsn-insert-video');
				$notice_parent.find('.wsn-type').val('');
				WS.EnableEvent();
		});

		$('.wsn-btn-no').on('click', function () {
			if ($('.wsn-type').val() == 'delete') {
				$('.ws-title-input').val('');
				$('.ws-questions-number ul').find('li').remove();
				$panel.find('.item-ws').remove();
				$panel.find('.wsid').val('');
				$('select').selectBoxIt('selectOption', 0);
			}

			$('.ws-notice').addClass('hidden').removeClass('wsn-insert-video');
		});
	};

	// Test-new
	$('.ws-subject').on('click', function(){
		WS.ClearSimpleData();
	});

	


	
	// Function Seach Worksheet in List
	WS.Search = function() {
		var SearchClone = $('.w-list').clone(true, true);

		$('.wls-open-subject-list').on('click', function () {
			if ($('.wls-subject-list').hasClass('open')) {
				$('.wls-subject-list').removeClass('open');
			} else {
				$('.wls-subject-list').addClass('open');
			}
		});

		$('.wls-type').on('click', function () {
			var $this    = $(this);
			var $state   = $this.attr('data-state');
			var $img     = $this.find('img');


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

		$('.wls-close').on('click', function () {
			$('.w-list').addClass('hidden');
			$('#w-panel').removeClass('hidden');
			$('.w-list').replaceWith(SearchClone);
			WS.Search();
		});

		$('#btn-ws-open-list').on('click', function () {
			if ($('.ws-title-input').val() == '') {
				$('.wsstate').val('1');
			}

			if ($('.wsstate').val() === '2') {
				$('.ws-notice').removeClass('hidden');
				$('.ws-notice').find('.wsn-text').text(iii_script.ws_notice_save_current_sheet_open_list_sheet);
				$('.ws-notice').find('.wsn-type').val('save-current-ws-before-open-list');
				$('.wlr-content-list').find('.wlr-content-item').removeClass('active');
				$(this).parents('.wlr-content-item').addClass('active');
			} else {
				WS.SearchAjaxContent();
				$panel.addClass('hidden');
				$('.ws-preview').addClass('hidden');
				$('.w-list').removeClass('hidden');
				$('.wlr-item-action-list').addClass('hidden');
			}
		});

		WS.SearchItemAction();
		WS.SearchAjaxContent();

		$('.w-list-searchbox .wls-btn').on('click', function () {
			WS.SearchAjaxContent();
		});
	};

	WS.SearchAjaxContent = function() {
		var $form   = $('.w-list-searchbox'),
			$input  = $form.find('input').val(),
			$type   = $form.find('.wls-subject-list ul .active').attr('data-value'),
			$mode   = $form.find('.wls-type').attr('data-state');

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
					WS.EventForEditWs();
					WS.SearchItemAction();
				}
			}
		});
	};

	// Function Open Worksheet from database by Id
	WS.OpenSheetFromDB = function(sid) {
		var data = {
			'action': 'iii_notepad_worksheet_open_sheet_by_id',
			'sid': sid
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
					alert('You need login to search');
				} else {
					$('.w-list').addClass('hidden');
					$('#w-panel').removeClass('hidden');
					$('#w-panel').find('.item-ws').remove();
					$('#w-panel .ws-questions-number ul').find('li').remove();
					$('#w-panel .ws-questions-number ul').append(response.q_html);
					$('#w-panel').append(response.content_html);
					$('#w-panel').find('.ws-title-input').val(response.title);
					$('#w-panel').find('.wsid').val(sid);
					$('#w-panel').find('.ws-mode-input').val(response.mode_type);
					$('#w-panel').find('.btn-ws-mode').removeClass('active');
					$('.ws-subject select').selectBoxIt('selectOption', response.cat_id);
					$('#w-panel').find('.wsstate').val('1');

					if (response.mode_type === '1') {
						$('.practice-mode').addClass('active');
					} else if (response.mode_type === '2') {
						$('.test-mode').addClass('active');
					}

					WS.EventForEditWs();
					//$('#w-panel').find('.wsstate').val('2');
				}
			}
		});
	};

	// Function preview worksheet
	WS.Preview = function() {
		$('.wsp-close').on('click', function () {
			$('.ws-preview').addClass('hidden');
			$('#w-panel').removeClass('hidden');
			$('#btn-ws-preview').removeClass('active');
			$('#btn-ws-edit').addClass('active');
		});

		$('.wsp-arrow-right').on('click', function () {
			var $current_question = $('.wsp-current-q').val();
			var $count_question		= $('.wsp-count-question .qc').html();

			if (parseInt($current_question) < parseInt($count_question)) {
				WS.PreviewChangeQuestion(parseInt($current_question) + 1);
			}
		});

		$('.wsp-arrow-left').on('click', function () {
			var $current_question = $('.wsp-current-q').val();

			if (parseInt($current_question) > 1) {
				WS.PreviewChangeQuestion(parseInt($current_question) - 1);
			}
		});

		$('.wsp-answer-btn-show').on('click', function () {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('.wsp-answer-content').addClass('hidden');
			} else {
				$(this).addClass('active');
				WS.PreviewGetAnswerAjax();
			}

		});

		$('.wsp-choice-item').on('click', function () {
			var $input 	= $('.wsp-answer-input');
			var $this 	= $(this);
			var $index	= $this.attr('data-index');
			var $val	= $this.find('> div').text();
			var $text	= '(' + $index + ') ' + $val;

			if ($this.hasClass('active')) {
				$this.removeClass('active');
				var $current_val = $input.val();

				if ($current_val.charAt(0) === $text) {
					var $new_val = $current_val.replace($text + ',', '');

					$new_val = $new_val.replace($text, '');
					$input.val($new_val);
				} else {
					var $new_val = $current_val.replace(',' + $text, '');
					$input.val($new_val);
				}
			} else {
				$this.addClass('active');

				var $current_val = $input.val();

				$input.val($current_val + ',' + $text);

				if ($input.val().charAt(0) === ',') {
					var $new_val = $input.val().substring(1);
					$input.val($new_val);
				}
			}
		});

		$('.wsp-answer-btn-check').on('click', function () {
			WS.PreviewCheckAnswerAjax();
		});

		$('#btn-ws-preview').on('click', function () {
			$(this).addClass('active');
			$('#btn-ws-edit').removeClass('active');

			var data = {};
			var q   = {};

			$('#w-panel').find('.item-ws').each(function () {
				var each_data = {};

				each_data = WS.GetDataEachQuestion($(this), each_data);

				var $wrapepr_id = $(this).attr('id');
				var qid         = $wrapepr_id.replace('ws', '');
				q['qid' + qid]  = each_data;
			});

			data['action']      = 'iii_notepad_worksheet_save_worksheet';
			data['wsid']        = $('.wsid').val();
			data['ws_title']    = $('.ws-title-input').val();
			data['question']    = q;
			data['mode']        = $('.ws-mode-input').val();
			data['subject']     = $('.ws-subject select').val();

			var form_data = new FormData();

			for (var key in data) {
				form_data.append(key, data[key]);
			}

			$.ajax({
				type: 'POST',
				url: iii_script.ajax_url,
				data: data,
				dataType: 'json',
				// contentType: false,
				// processData: false,
				beforeSend: function () {
					$('#cc-loading').addClass('open');
				},
				success: function (response) {
					$('#cc-loading').removeClass('open');

					if (response.code === 1 || response.code === 2) {
						$('.wsid').val(response.sheet_id);
						WS.PreviewOpenPreviewSheet(response.sheet_id);
					}
				}
			});
		});
	};

	// Change question in preview mode
	WS.PreviewChangeQuestion = function($index) {
		$('.ws-preview-questions-content').find('.wsp-question-item').removeClass('active').addClass('hidden');
		$('.wsp-question-item.qid' + $index).addClass('active').removeClass('hidden');
		$('.wsp-count-question .qn').html($index);
		$('.wsp-current-q').val($index);
		$('.wsp-answer-content').addClass('hidden');
		$('.wsp-answer-btn-check').removeClass('wrong').removeClass('correct');
		$('.wsp-answer-input').val('');
	}

	//Get answer in preview mode
	WS.PreviewGetAnswerAjax = function() {
		var data = {
			'action': 'iii_notepad_worksheet_show_answer_follow_ws_and_q',
			'qid': $('.wsp-current-q').val(),
			'wid': $('.wsp-current-ws').val()
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

				if (response) {
					$('.wsp-answer-content .wspa-content').html(response);
					$('.wsp-answer-content').removeClass('hidden');
				}
			}
		});
	}

	// Check answer in preview mode
	WS.PreviewCheckAnswerAjax = function() {
		var data = {
			'action': 'iii_notepad_worksheet_check_answer_follow_ws_and_q',
			'qid': $('.wsp-current-q').val(),
			'wid': $('.wsp-current-ws').val(),
			'answer': $('.wsp-answer-input').val(),
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

				if (response === 1) {
					$('.wsp-answer-btn-check').removeClass('wrong').addClass('correct');
				} else if (response === 0) {
					$('.wsp-answer-btn-check').removeClass('correct').addClass('wrong');
				}

				setTimeout(function () {
					$('.wsp-answer-btn-check').removeClass('correct').removeClass('wrong');
				}, 2000);
			}
		});
	};

	// Event in each sheet in list search
	WS.SearchItemAction = function() {
		$('.wlr-item-open-action').on('click', function () {
			var $s = $(this).siblings('.wlr-item-action-list');

			if ($s.hasClass('hidden')) {
				$('.wlr-content-list').find('.wlr-item-action-list').addClass('hidden');
				$s.removeClass('hidden');
			} else {
				$('.wlr-content-list').find('.wlr-item-action-list').addClass('hidden');
				$s.addClass('hidden');
			}
		});

		$('.wlr-item-action-remove').on('click', function () {
			$('.ws-notice').removeClass('hidden');
			$('.ws-notice').find('.wsn-text').text(iii_script.ws_notice_delete_ws_in_list_search);
			$('.ws-notice').find('.wsn-type').val('delete-ws-in-list-search');
			$('.wlr-content-list').find('.wlr-content-item').removeClass('active');
			$(this).parents('.wlr-content-item').addClass('active');
		});

		$('.w-list-listworksheet .wlr-content-item .wlr-item-name').on('click', function () {
			var $sid = $(this).parents('.wlr-content-item').attr('data-w');

			WS.OpenSheetFromDB($sid);
		});

		$('.w-list-listworksheet .wlr-content-item .wlr-item-action-edit').on('click', function () {
			var $sid = $(this).parents('.wlr-content-item').attr('data-w');

			WS.OpenSheetFromDB($sid);
		});

		$('#btn-ws-edit').on('click', function () {
			$('#btn-ws-preview').removeClass('active');
			$(this).addClass('active');
			$('.ws-preview').addClass('hidden');

			var $sid = $('.wsid').val();
			WS.OpenSheetFromDB($sid);
		});

		$('.w-list-listworksheet .wlr-content-item .wlr-item-action-detail').on('click', function () {
			var $sid = $(this).parents('.wlr-content-item').attr('data-w');
			WS.PreviewOpenPreviewSheet($sid);
		});
	};

	WS.hoverMenuShowTooltip = function() {
		var timeout; 
		

		$('.tooltip-wrap').on('mouseenter', function () {
			var $thisElement = $(this);

			if(timeout != null) { clearTimeout(timeout);}

			timeout = setTimeout(function () {
                 $('.tooltip-wrap').removeClass('show-tt');
                 $thisElement.addClass('show-tt');
                 // $('.tooltip-wrap').slideUp();
                 // var content = $thisElement.attr("show-tt");
                 // $('#'+ content_show).slideDown();
    //              $('.tooltip-wrap').removeClass('show-tt');
				// if (!$('.tooltip-wrap').hasClass('active')) {
				// 	$thisElement.addClass('show-tt');
				// }
			}, 1000)
		});

		$('.tooltip-wrap').on('mouseleave', function(){
			if(timeout != null){
				clearTimeout(timeout);
				timeout = null;
			}
		});

		$(window).on('mouseover', function(){
           $('.tooltip-wrap').removeClass('show-tt');
		});
    };

	// Function Open Preview Mode
	WS.PreviewOpenPreviewSheet = function($sid) {
		var data = {
			'action': 'iii_notepad_worksheet_open_preview_mode_sheet',
			'sid': $sid,
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

				$('.w-list').addClass('hidden');
				$('#w-panel').addClass('hidden');
				$('.ws-preview').removeClass('hidden');
				$('.ws-preview .ws-preview-inner').empty();
				$('.ws-preview .ws-preview-inner').html(response);
				$('#btn-ws-edit').removeClass('active');
				$('#btn-ws-preview').addClass('active');
				WS.Preview();
			}
		});
	};

	// Function worksheet save image to db
	WS.SaveImageToDb = function($image_data) {
		var fd = new FormData();
		var $image_id = null;

		let ins = $image_data[0].files.length;

		for (let i = 0; i < ins; i++) {
			fd.append('main_image[]', $image_data[0].files[i]);
		}

		fd.append('action', 'iii_notepad_worksheet_save_single_image');

		$.ajax({
			type: 'POST',
			url: iii_script.ajax_url,
			data: fd,
			async: false,
			processData: false,
			contentType: false,
			success: function(response) {
				$image_id = response;
			},
		});

		return $image_id;
	};

	// Function User Login Ajax
	WS.UserLoginForm = function() {
		$('#wp-submit').on('click', function () {
			$.ajax({
				type: 'POST',
				url: iii_script.ajax_url + '?action=iii_notepad_worksheet_check_user_login',
				data: $('#loginform').serialize(),
				dataType: 'json',
				beforeSend: function () {
					$('#cc-loading').addClass('open');
				},
				success: function (response) {
					$('#cc-loading').removeClass('open');

					if (response.code === '1') {
						alert(response.content);
					} else if (response.code === '2') {
						$('.tid').val(response.user_id);
						$('.ws-popup-login').remove();
						$('.ws-login').remove();
						$('.taskbar-worksheet .block-right').append(response.content);
					}
				}
			});
		});
	};

	WS.openFullscreen = function() {
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
    };

    WS.closeFullscreen = function() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
    };

	WS.NewOptionChange = function() {
		$('.select-box').on('change', function () {
			// let $this = $(this),
			// 	val		= $this.val();

			var val = $('input').val();

			if (val == 'n') {
				$('.ws-sample').removeClass('hidden');
				$('.w-panel-disable').addClass('hidden');
				WS.SampleData();


			} else if (val == 'e') {

			} else if (val == 's') {
				WS.SaveQuestionContent();
			} else if (val == 'p') {
				$('#btn-ws-edit').removeClass('active');

				var data = {};
				var q   = {};

				$('#w-panel').find('.item-ws').each(function () {
					var each_data = {};

					each_data = WS.GetDataEachQuestion($(this), each_data);

					var $wrapepr_id = $(this).attr('id');
					var qid         = $wrapepr_id.replace('ws', '');
					q['qid' + qid]  = each_data;
				});

				data['action']      = 'iii_notepad_worksheet_save_worksheet';
				data['wsid']        = $('.wsid').val();
				data['ws_title']    = $('.ws-title-input').val();
				data['question']    = q;
				data['mode']        = $('.ws-mode-input').val();
				data['subject']     = $('.ws-subject select').val();

				var form_data = new FormData();

				for (var key in data) {
					form_data.append(key, data[key]);
				}

				$.ajax({
					type: 'POST',
					url: iii_script.ajax_url,
					data: data,
					dataType: 'json',
					// contentType: false,
					// processData: false,
					beforeSend: function () {
						$('#cc-loading').addClass('open');
					},
					success: function (response) {
						$('#cc-loading').removeClass('open');

						if (response.code === 1 || response.code === 2) {
							$('.wsid').val(response.sheet_id);
							WS.PreviewOpenPreviewSheet(response.sheet_id);
						}
					}
				});
			}
		});

		// $('#acc').click(function(){
		// 	let DataType = $("a").attr("data-type");
		//
		// 	if (DataType == 'n') {
		// 		$('.ws-sample').removeClass('hidden');
		// 		$('.w-panel-disable').addClass('hidden');
		// 		WS.SampleData();
		//
		//
		// 	} else if (DataType == 'e') {
		//
		// 	} else if (DataType == 's') {
		// 		WS.SaveQuestionContent();
		// 	} else if (DataType == 'p') {
		// 		$('#btn-ws-edit').removeClass('active');
		//
		// 		var data = {};
		// 		var q   = {};
		//
		// 		$('#w-panel').find('.item-ws').each(function () {
		// 			var each_data = {};
		//
		// 			each_data = WS.GetDataEachQuestion($(this), each_data);
		//
		// 			var $wrapepr_id = $(this).attr('id');
		// 			var qid         = $wrapepr_id.replace('ws', '');
		// 			q['qid' + qid]  = each_data;
		// 		});
		//
		// 		data['action']      = 'iii_notepad_worksheet_save_worksheet';
		// 		data['wsid']        = $('.wsid').val();
		// 		data['ws_title']    = $('.ws-title-input').val();
		// 		data['question']    = q;
		// 		data['mode']        = $('.ws-mode-input').val();
		// 		data['subject']     = $('.ws-subject select').val();
		//
		// 		var form_data = new FormData();
		//
		// 		for (var key in data) {
		// 			form_data.append(key, data[key]);
		// 		}
		//
		// 		$.ajax({
		// 			type: 'POST',
		// 			url: iii_script.ajax_url,
		// 			data: data,
		// 			dataType: 'json',
		// 			// contentType: false,
		// 			// processData: false,
		// 			beforeSend: function () {
		// 				$('#cc-loading').addClass('open');
		// 			},
		// 			success: function (response) {
		// 				$('#cc-loading').removeClass('open');
		//
		// 				if (response.code === 1 || response.code === 2) {
		// 					$('.wsid').val(response.sheet_id);
		// 					WS.PreviewOpenPreviewSheet(response.sheet_id);
		// 				}
		// 			}
		// 		});
		// 	}
		// })
             


		$('.sample-close').on('click', function () {
			WS.ClearSimpleData();
		});
	};

		

	WS.SampleData = function () {
		$('.ws-title-input').val('Sample: Introduction to the Writing Worksheet');
		WS.CreateQuestionSingleAnswer();
		WS.CreateQuestionSingleAnswer();
		WS.CreateQuestionSingleAnswer();
		WS.CreateQuestionSingleAnswer();
		 for (var i = 1; i <= 5; i++) {
			$('.ic-image-value').append('<span>My writing sample.jpg</span>');
			$('.ic-video-value').append('https://youtube.com');
			$('.ic-text-value').append('This is a beginer guide to creating a worksheet. Should be easy to follow');
			$('#ws'+i+' .item-qa').find('.txtEditor').Editor('setText', 'Writing practice Basic 4, Avoid stringy sentences: Explain how the moon changes from new moon to full moon. Use the least number of sentences possible to explain the entire process. Utilize linking words such as "that", "which", "and", "but", "when", "if", and so on.');
			$('#ws'+i+' .item-answer').find('.txtEditor').Editor('setText', 'The full Moon that occurs closest to the autumnal equinox is commonly referred to as the "Harvest Moon," since its bright presence in the night sky allows farmers to work longer into the fall night, reaping the rewards of their spring and summer labors. ');
			$('.wsstate').val('9');
		}
	};

	WS.ClearSimpleData = function() {
		if ($('.wsstate').val() === '9') {
			$('.ws-sample').addClass('hidden');
			$('.ws-title-input').val('');
			$('.ws-questions-number ul').find('li').remove();
			$panel.find('.item-ws').remove();
			$panel.find('.wsid').val('');
			//$('.ws-subject select').selectBoxIt('selectOption', 0);
			$('.wsstate').val('1');
			WS.CreateQuestionSingleAnswer();
		}
	};

	$(document).ready(function() {
		$("select").selectBoxIt();
		
		$('.trigger-action').on('click', function () {
           let divws = $(this).parents('.tutor-ws-div');

           if (divws.hasClass('activate')) {
                divws.removeClass('activate');
           } else {
                divws.addClass('activate');
           }
        });

		WS.ChangeModeFromNotepadWithWorksheet();

		WS.init();
		WS.Notice();
		WS.Search();
		WS.Preview();

		WS.StoreAction();
		WS.UndoRedo();

		WS.UserLoginForm();

		WS.NewOptionChange();
		WS.hoverMenuShowTooltip();
	});


	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 105) {
			$('.ws-notice').addClass('fixed');
		} else {
			$('.ws-notice').removeClass('fixed');
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

	optionList.forEach( o => {
		o.addEventListener("click", () => {
			optionsContainer.classList.remove("active");
		});
	});

	optionNew.addEventListener("click", ()=>{
		$('.ws-sample').removeClass('hidden');
		$('.w-panel-disable').addClass('hidden');
		WS.SampleData();
	});

	optionOpen.addEventListener("click", ()=>{
		WS.ClearSimpleData();
		// $('.ws-sample').removeClass('hidden');
		// $('.w-panel-disable').addClass('hidden');
		// WS.SampleData();
	});

	optionSave.addEventListener("click", ()=>{
		WS.SaveQuestionContent();
	});

	optionPre.addEventListener("click", ()=>{
		$('#btn-ws-edit').removeClass('active');

		var data = {};
		var q   = {};

		$('#w-panel').find('.item-ws').each(function () {
			var each_data = {};

			each_data = WS.GetDataEachQuestion($(this), each_data);

			var $wrapepr_id = $(this).attr('id');
			var qid         = $wrapepr_id.replace('ws', '');
			q['qid' + qid]  = each_data;
		});

		data['action']      = 'iii_notepad_worksheet_save_worksheet';
		data['wsid']        = $('.wsid').val();
		data['ws_title']    = $('.ws-title-input').val();
		data['question']    = q;
		data['mode']        = $('.ws-mode-input').val();
		data['subject']     = $('.ws-subject select').val();

		var form_data = new FormData();

		for (var key in data) {
			form_data.append(key, data[key]);
		}

		$.ajax({
			type: 'POST',
			url: iii_script.ajax_url,
			data: data,
			dataType: 'json',
			// contentType: false,
			// processData: false,
			beforeSend: function () {
				$('#cc-loading').addClass('open');
			},
			success: function (response) {
				$('#cc-loading').removeClass('open');

				if (response.code === 1 || response.code === 2) {
					$('.wsid').val(response.sheet_id);
					WS.PreviewOpenPreviewSheet(response.sheet_id);
				}
			}
		});
	});
	$('.sample-close').on('click', function () {
		WS.ClearSimpleData();
	});

	 window.addEventListener('mouseup', function(e) {
    if (event.target != selected) {
        optionsContainer.classList.remove("active");
    }
});
     $('input[type="file"]').attr('title', window.webkitURL ? ' ' : '');
	 




})(jQuery, window, document);