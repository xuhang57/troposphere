import Dispatcher from "dispatchers/Dispatcher";
import BaseStore from "stores/BaseStore";
import ClusterCollection from "collections/ClusterCollection";
import ClusterConstants from "constants/ClusterLaunchConstants";

let ClusterStore = BaseStore.extend({
    collection: ClusterCollection,


    findClustersWhere: function(params) {
        if (!this.models) return this.fetchModels();

        var keys = Object.keys(params);

        var models = this.models.cfilter(function(model) {
            var matchesCriteria = true;

            keys.forEach(function(key) {
                if (!matchesCriteria) return;

                var tokens = key.split(".");
                if (tokens.length === 1) {
                    if (model.get(key) !== params[key])
                        matchesCriteria = false;
                } else {
                    matchesCriteria = false;
                }
            });

            return matchesCriteria;
        });

        return models;
    }

});

let store = new ClusterStore();

Dispatcher.register(function(dispatch) {
    var actionType = dispatch.action.actionType;
    var payload = dispatch.action.payload;
    var options = dispatch.action.options || options;

    switch (actionType) {
        case ClusterConstants.ADD:
            store.add(payload.cluster);
            break;

        case ClusterConstants.UPDATE:
            store.update(payload.cluster);
            break;

        case ClusterConstants.REMOVE:
            store.remove(payload.cluster);
            break;

        default:
            return true;
    }

    if (!options.silent) {
        store.emitChange();
    }

    return true;
});

export default store;
