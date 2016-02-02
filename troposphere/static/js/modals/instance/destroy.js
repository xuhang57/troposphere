define(function (require) {
  "use strict";

  var actions = require('actions'),
    stores = require('stores'),
    ModalHelpers = require('components/modals/ModalHelpers'),
    InstanceDeleteModal = require('components/modals/instance/InstanceDeleteModal.react'),
    ExplainInstanceDeleteConditionsModal = require('components/modals/instance/ExplainInstanceDeleteConditionsModal.react'),
    Router = require('Router');

  return {

    destroy: function (payload, options) {
      if (!payload.project) throw new Error("Missing project");
      if (!payload.instance) throw new Error("Missing instance");

      var project = payload.project,
        instance = payload.instance,
        attachedVolumes = stores.VolumeStore.getVolumesAttachedToInstance(instance),
        ModalComponent,
        props = {
            instance,
            attachedVolumes,
        };

       ModalComponent = 
           attachedVolumes.length > 0 
           ? ExplainInstanceDeleteConditionsModal
           : InstanceDeleteModal;

      ModalHelpers.renderModal(ModalComponent, props, function () {
        actions.InstanceActions.destroy(payload, options);
        Router.getInstance().transitionTo("project-resources", {projectId: project.id});
      })
    },

  };

});
