import actions from "actions";
import ModalHelpers from "components/modals/ModalHelpers";

import ClusterLaunchModal from "components/modals/cluster/ClusterLaunchModal";

export default {

    clusterLaunch: function() {
        ModalHelpers.renderModal(ClusterLaunchModal, null, function(identity, pluginName, clusterName, clusterSize, clusterStatus) {

            actions.ClusterActions.clusterLaunch({
                identity,
                pluginName,
                clusterName,
                clusterSize,
                clusterStatus
            });
        });
    }
};
