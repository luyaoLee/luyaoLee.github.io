const Toast = require('./toast.js');
const Note = require('./note.js');
const EventCenter = require('./event.js');

let NoteManager = (() => {
    let load = () => {
        $.get('/api/notes').done(ret => {
            if (ret.status === 0) {
                $.each(ret.data, (idx, note) => {
                    Note.init({id: note.id, context: note.text});
                });

                EventCenter.fire('waterfall');
            } else {
                Toast.init(ret.errorMsg);
            }
        }).fail(() => {
            Toast.init('网络异常');
        });
    }

    let add = () => {
        Note.init();
    }

    return {load: load, add: add}
})();

module.exports = NoteManager;
