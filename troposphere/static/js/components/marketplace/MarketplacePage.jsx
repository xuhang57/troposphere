import React from "react";

import modals from "modals";
import stores from "stores";
import CallToAction from "./CallToAction";

// images
import openstack from "themeImages/openstack.png";
import dataverse from "themeImages/dataverse.jpg";
import openshift from "themeImages/openshift.png";
import comming from "themeImages/comming.jpg";

export default React.createClass({
    displayName: "MarketplacePage",

    renderRequestMoreResources: function(e) {
        e.preventDefault();
        modals.HelpModals.requestMoreResources();
    },

    updateState: function() {
        this.forceUpdate();
    },

    componentDidMount: function() {
        stores.SizeStore.addChangeListener(this.updateState);
        stores.ProviderStore.addChangeListener(this.updateState);
        stores.IdentityStore.addChangeListener(this.updateState);
        stores.ProjectStore.addChangeListener(this.updateState);
        stores.MaintenanceMessageStore.addChangeListener(this.updateState);
        stores.ImageStore.addChangeListener(this.updateState);
        stores.InstanceStore.addChangeListener(this.updateState);
        stores.VolumeStore.addChangeListener(this.updateState);
        stores.SizeStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.SizeStore.removeChangeListener(this.updateState);
        stores.ProviderStore.removeChangeListener(this.updateState);
        stores.IdentityStore.removeChangeListener(this.updateState);
        stores.ProjectStore.removeChangeListener(this.updateState);
        stores.MaintenanceMessageStore.removeChangeListener(this.updateState);
        stores.ImageStore.removeChangeListener(this.updateState);
        stores.InstanceStore.removeChangeListener(this.updateState);
        stores.VolumeStore.removeChangeListener(this.updateState);
        stores.SizeStore.removeChangeListener(this.updateState);
    },

    render: function() {
        let providers = stores.ProviderStore.getAll(),
            identities = stores.IdentityStore.getAll(),
            projects = stores.ProjectStore.getAll(),
            maintenanceMessages = stores.MaintenanceMessageStore.getAll(),
            images = stores.ImageStore.getAll(),
            instances = stores.InstanceStore.getAll(),
            volumes = stores.VolumeStore.getAll(),
            sizes = stores.SizeStore.fetchWhereNoCache({
                "archived": "true",
                "page_size": 250
            });

        // Test that all resources are truthy
        let resourcesLoaded =
            [ providers
                , identities
                , projects
                , maintenanceMessages
                , images
                , instances
                , volumes
                , sizes].every(obj => obj)

        if (!resourcesLoaded) {
            return <div className="loading"></div>;
        }


        return (
            <div id="dashboard-view">
                <div style={{ paddingTop: "30px" }} className="container">
                    <h2 className="t-headline">Available MOC Services</h2>
                    <div className="row calls-to-action">
                        <div className="col-md-4 col-sm-12">
                            <CallToAction title="MOC OpenStack Service"
                                          image={openstack}
                                          description="Launch an instance, view projects, or view current resources."
                                          linksTo="images" />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <CallToAction title="MOC Cloud Dataverse"
                                          image={dataverse}
                                          description="Data Processing with Sahara and Cloud Dataverse."
                                          linksTo="dataverse" />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <CallToAction title="MOC RedHat OpenShift"
                                          image={openshift}
                                          description="Quickly develop, host, and scale applications in a cloud environment."
                                          linksTo="openshift" />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <CallToAction title="HIL"
                                          image={comming}
                                          description="Bare metal isolation service that automates allocation and management of isolated pools of non-virtualized compute resources to users."
                                          linksTo="hil" />
                        </div>
                    </div>
                    <h2 className="t-headline">GIJI Enablements</h2>
                    <div className="row calls-to-action">
                        <div className="col-xs-6 col-sm-3">
                            <CallToAction title="Mix&Match"
                                          image={comming}
                                          description="Proxy Service that will forward REST API requests to a remote service provider which is federated using Keystone-to-Keystone Federation."
                                          linksTo="mixmatch" />
                        </div>
                        <div className="col-xs-6 col-sm-3">
                            <CallToAction title="NetEx"
                                          image={comming}
                                          description="NetEx enables MOC to provide an analogous marketplace where multiple network providers can offer network connectivity options."
                                          linksTo="netex" />
                        </div>
                        <div className="col-xs-6 col-sm-3">
                            <CallToAction title="Bare Metal Imaging"
                                          image={comming}
                                          description="Provisions numerous nodes quickly while preserving support for multitenancy using HIL introduces the image management techniques."
                                          linksTo="bmi" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

