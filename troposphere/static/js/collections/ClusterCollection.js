import Backbone from "backbone";
import Cluster from "models/Cluster";
import globals from "globals";

export default Backbone.Collection.extend({
    model: Cluster,

    url: globals.API_V2_ROOT + "/sahara_cluster",

    parse: function(data) {
        return data;
    }

});
