(function ($) {
    var tool;
    ctx.lineWidth = sizePicker;
    ctx.lineCap = "round";
    ctx.strokeStyle = penColor;

    var history = {
        redo_list: [],
        undo_list: [],
        saveState: function (canvas, list, keep_redo) {
            keep_redo = keep_redo || false;
            if (!keep_redo) {
                this.redo_list = [];
            }

            (list || this.undo_list).push(canvas.toDataURL());
        },
        undo: function (canvas, ctx) {
            this.restoreState(canvas, ctx, this.undo_list, this.redo_list);
        },
        redo: function (canvas, ctx) {
            this.restoreState(canvas, ctx, this.redo_list, this.undo_list);
        },
        restoreState: function (canvas, ctx, pop, push) {
            if (pop.length) {
                this.saveState(canvas, push, true);
                var restore_state = pop.pop();
                var img = new Element('img', {
                    'src': restore_state
                });
                img.onload = function () {
                    ctx.clearRect(0, 0, 3000, 3000);    
                    ctx.drawImage(img, 0, 0, 3000, 3000, 0, 0, 3000, 3000);
                }
            }
        },
        clearBoard: function (canvas, ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  
        }
    }
});