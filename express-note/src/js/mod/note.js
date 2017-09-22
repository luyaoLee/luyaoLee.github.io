require('less/note.less');

const Toast = require('./toast.js');
const Event = require('./event.js');

let Note = (() => {
    class _Note {
        constructor(opts) {
            this.defaultOpts = {
                id: '',
                uid: '',
                author: 'Admin',
                $ct: $('#content').length > 0
                    ? $('#content')
                    : $('body'),
                context: 'Input something here',
                title: 'Input your title'
            };
            this.initOpts(opts);
            this.createNote();
            this.bindEvent();
        }
        initOpts(opts) {
            this.opts = $.extend({}, this.defaultOpts, opts || {});
            this.id = this.opts.id
                ? this.opts.id
                : '';
            // this.uid = this.opts.uid ? this.opts.uid : '';
            // this.title = this.opts.title ? this.opts.title : 'Input your title...';
            // this.$ct = this.opts.$ct ? this.opts.$ct : ($('#content').length > 0 ? $('#content') : $('body'));
            // this.context = this.opts.context ? this.opts.context : 'Input something here';
            // this.author = this.opts.author ? this.opts.author : 'Admin'
        }
        createNote() {
            let tpl = `<div class="note">
                          <div class="note-head">
                              <span class="delete">&times;</span>
                          </div>
                          <div class="note-ct" contenteditable="true"></div>
                      </div>`;
            this.$note = $(tpl);
            this.$note.find('.note-ct').html(this.opts.context);
            this.opts.$ct.append(this.$note);
            if (!this.id) {
                this.$note.css('bottom', '10px'); //新增放到右边
            }
        }
        setLayout() {
            if (this.clk)
                clearTimeout(this.clk);
            this.clk = setTimeout(() => {
                Event.fire('waterfall');
            }, 100);
        }
        bindEvent() {
            let $noteHead = this.$note.find('.note-head');
            let $noteCt = this.$note.find('.note-ct');
            let $delete = this.$note.find('.delete');

            $delete.click(() => {
                this.delete();
            })

            $noteCt.on('focus', () => {
                if ($noteCt.html() == 'Input something here') {
                    $noteCt.html('');
                }
                $noteCt.data('before', $noteCt.html());
            }).on('blur paste', () => {
                if ($noteCt.data('before') != $noteCt.html()) {
                    $noteCt.data('before', $noteCt.html());
                    this.setLayout();
                    if (this.id) {
                        this.edit($noteCt.html());
                    } else {
                        this.add($noteCt.html());
                    }
                }
            });

            //设置笔记移动
            $noteHead.on('mousedown', e => {
                let evtX = e.pageX - this.$note.offset().left; //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
                let evtY = e.pageY - this.$note.offset().top;
                this.$note.addClass('draggable').data('evtPos', {
                    x: evtX,
                    y: evtY
                }); //把事件到 dialog 边缘的距离保存下来

                $('body').on('mousemove', e => {
                    e.preventDefault();
                    $('.draggable').length && $('.draggable').offset({
                        top: e.pageY - $('.draggable').data('evtPos').y, // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
                        left: e.pageX - $('.draggable').data('evtPos').x
                    });
                });
            }).on('mouseup', () => {
                this.$note.removeClass('draggable').removeData('evtPos');
            });


        }

        edit(msg) {
            $.post('/api/notes/edit', {
                id: this.id,
                note: msg
            }).done(ret => {
                if (ret.status === 0) {
                    Toast.init('update success');
                } else {
                    Toast.init(ret.errorMsg);
                }
            });
        }

        add(msg) {
            $.post('/api/notes/add', {note: msg}).done(ret => {
                if (ret.status === 0) {
                    Toast.init('add success');
                } else {
                    this.$note.remove();
                    Event.fire('waterfall');
                    Toast.init(ret.errorMsg);
                }
            });
        }

        delete() {
            $.post('/api/notes/delete', {id: this.id}).done(ret => {
                if (ret.status === 0) {
                    Toast.init('delete success');
                    this.$note.remove();
                    Event.fire('waterfall');
                } else {
                    Toast.init(ret.errorMsg);
                }
            })
        }
    }
    return {
        init: (opts) => {
            new _Note(opts);
        }
    }
})();

window.Note = Note;
module.exports = Note;
