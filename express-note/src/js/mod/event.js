let EventCenter = (() => {
    let events = {};
    let on = (evt, handler) => {
        events[evt] = events[evt] || [];
        events[evt].push({
            handler: handler
        });
    }
    let off = evt => {
        if(events[evt]) {
            delete events[evt];
        }
    }
    let fire = (evt, args) => {
        if (!events[evt]) return;

        for (let i = 0; i < events[evt].length; i++) {
            events[evt][i].handler(args);
        }
    }

    return {
        on: on,
        off: off,
        fire: fire
    }
})();

window.EventCenter = EventCenter;
module.exports = EventCenter;
