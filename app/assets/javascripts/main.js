require.config({
    paths: {
        jquery: [
            '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min',
            'lib/jquery/jquery-2.0.3'
        ],
        backbone: [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min',
            'lib/backbone/backbone-1.1.0'
        ],
        underscore: [
            '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.backbone.min',
            'lib/lodash/lodash-backbone-2.4.1'
        ]
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    }
});

require(['jquery', 'backbone', 'app/model/Message'], function($, Backbone, Message) {
    $(function() {
        var msg = new Message({content: "Hello, world!"});
        $('body')
            .append("<div>message: " + msg.getContent() + "</div>")
            .append('<div>backbone version: ' + Backbone.VERSION + '</div>')
            .append('<div>underscore version: ' + $.VERSION + '</div>');
    });
});
