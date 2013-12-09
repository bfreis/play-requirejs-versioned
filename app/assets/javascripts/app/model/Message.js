define(['backbone'], function(Backbone) {
    var Message = Backbone.Model.extend({
        getContent: function() {
            return this.get('content')
        }
    });
    return Message;
});
