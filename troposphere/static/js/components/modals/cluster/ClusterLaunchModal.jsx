import React from "react";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import stores from "stores";


export default React.createClass({
    displayName: "ClusterLaunchModal",

    mixins: [BootstrapModalMixin],

    getInitialState: function() {
        var identities = stores.IdentityStore.getAll();
        var sizes = stores.SizeStore.getAll();
        return {
            identity: identities ? identities.first().id : null,
            clusterSize: "",
            pluginName: "",
            clusterName: "",
            clusterStatus: ""
        };
    },

    getState: function() {
        var identities = stores.IdentityStore.getAll(),
            identityId = null;

        if (identities) {
            identityId = this.state.identity ? this.state.identity : identities.first().id;
        }

        return {
            identity: identityId
        }
    },

    updateState: function() {
        if (this.isMounted()) this.setState(this.getState());
    },

    componentDidMount: function() {
        stores.IdentityStore.addChangeListener(this.updateState);
        stores.ClusterStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.IdentityStore.removeChangeListener(this.updateState);
        stores.ClusterStore.removeChangeListener(this.getInitialState);
    },

    isSubmittable: function() {
        var haspluginName = !!this.state.pluginName;
        var hasclusterName = !!this.state.clusterName;
        return haspluginName && hasclusterName;
    },

    //
    // Internal Modal Callbacks
    // ------------------------
    //

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        this.hide();
        this.props.onConfirm(this.state.identity, this.state.pluginName, this.state.clusterName, this.state.clusterStatus);
    },


    //
    // Custom Modal Callbacks
    // ----------------------
    //

    // todo: I don't think there's a clusterName to update state unless
    // there's a risk of the component being re-rendered by the parent.
    // Should probably verify this behavior, but for now, we play it safe.

    handlepluginNameChange: function(e) {
        this.setState({
            pluginName: e.target.value
        });
    },

    handleclusterNameChange: function(e) {
        this.setState({
            clusterName: e.target.value
        });
    },

    handlesizeNameChange: function(e) {
        this.setState({
            clusterSize: e.target.value
        });
    },
    //
    // Render
    // ------
    //

    getProviderSizeName(providerSize) {
        let name = providerSize.get("name");
        let cpu = providerSize.get("cpu");
        let disk = providerSize.get("disk");
        let diskStr = ""
        if (disk == 0) {
            disk = providerSize.get("root");
        }
        if (disk != 0) {
            diskStr = `Disk: ${ disk } GB`
        }
        let memory = providerSize.get("mem");

        return `${ name } (CPU: ${ cpu }, Mem: ${ memory } GB, ${ diskStr })`;
    },

    renderSize: function(size) {
        return (
            <option>{size.get("name")}
            </option>
        )
    },

    renderBody: function() {
        var identities = stores.IdentityStore.getAll(),
            username = stores.ProfileStore.get().get("username"),
            clusters = stores.ClusterStore.findClustersWhere({
                "created_by.username": username
            });

        if (username == null || clusters == null) {
            return <div className="loading"></div>;
        }

        if (!identities) return <div className="loading" />;

        var sizes = stores.SizeStore.getAll();
        return (
            <div role="form">
                <div className="form-group">
                    <label htmlFor="project-name">
                        {"Cluster Plugin"}
                    </label>

                    <select className="form-control"
                            value={this.state.pluginName}
                            onChange={this.handlepluginNameChange}>
                        <option>{"not selected"}</option>
                        <option>{"Hadoop/Pig"}</option>
                        <option>{"Spark"}</option>
                        <option>{"Storm"}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="project-description">
                        {"Cluster Name"}
                    </label>
                    <input type="text"
                           className="form-control"
                           placeholder="giji-cluster"
                           value={this.state.clusterName}
                           onChange={this.handleclusterNameChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="size-name">
                        {"Cluster Size"}
                    </label>
                    <select className="form-control"
                            value={this.state.clusterSize}
                            onChange={this.handlesizeNameChange}>
                        {sizes ? sizes.map(this.renderSize): <option>{"Not available"}</option>}
                    </select>
                </div>

                <div>
                    <p><b>{"The cluster will be launched with 1 master and 2 workers."}</b></p>
                </div>
            </div>
        );
    },

    render: function() {
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {this.renderCloseButton()}
                            <h1 className="t-title">Launch a Cluster</h1>
                        </div>
                        <div className="modal-body">
                            {this.renderBody()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this.cancel}>
                                Cancel
                            </button>
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={this.confirm}
                                    disabled={!this.isSubmittable()}>
                                Launch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
