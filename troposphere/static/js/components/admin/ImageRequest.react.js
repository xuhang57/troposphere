define(function (require) {
  "use strict";

  var React = require('react'),
      Router = require('react-router'),
      stores = require('stores'),
      actions = require('actions'),
      ImageRequestActions = require('actions/ImageRequestActions');

  return React.createClass({

    mixins: [Router.State],

    getInitialState: function(){
      return{
        request: stores.ImageRequestStore.get(this.getParams().id),
        response: ""
      }
    },

    componentDidMount: function(){
        var parentMachineId = this.state.request.get('parent_machine').id;
        stores.ProviderMachineStore.onFetchModel(parentMachineId, function(){
            this.setState({parentMachine: stores.ProviderMachineStore.get(parentMachineId)});
        }.bind(this));
    },

    handleResponseChange: function (event) {
      var response = event.target.value;
      if (response) this.setState({response: response});
    },

    approve: function(){

      var request = stores.ImageRequestStore.get(this.getParams().id),
      status = stores.StatusStore.findOne({name: "approved"});

      ImageRequestActions.update({
        request: request,
        response: this.state.response,
        status: status.id
      });

    },

    deny: function(){

      var request = stores.ImageRequestStore.get(this.getParams().id),
      status = stores.StatusStore.findOne({name: "rejected"});

      ImageRequestActions.update({
        request: request,
        response: this.state.response,
        status: status.id
      });

    },

    resubmit: function(){

      var request = stores.ImageRequestStore.get(this.getParams().id),
      status = stores.StatusStore.findOne({name: "pending"});

      ImageRequestActions.update({
        request: request,
        response: this.state.response,
        status: status.id
      });

    },

    render: function () {
      var request = stores.ImageRequestStore.get(this.getParams().id),
          instance = request.get('instance'),
          parentMachine = this.state.parentMachine;

      if(!parentMachine){
        return <div className="loading" />
      }

      var basicInfo, detailedInfo, parentInfo;

      // ensure boolean values are displayed as strings
      var allowImaging = "false";
      var forked = "false";

      if(request.get('new_version_forked')){
        forked = "true";
      }

      if(request.get('new_version_allow_imaging')){
        allowImaging = "true";
      }

      // The API returns a string representation of the list. Convert that string back to an array
      var accessListArray = request.get('access_list').replace(/["' []]*/g, '').split(',');

      var sharedWithText, accessListText;
      if(request.get('new_application_visibility') == 'private'){
        accessListText = accessListArray.map(function(name){
            return(
                <li key={name}>{name}</li>
            )
        });

        sharedWithText = (
            <span>
                <label>Shared with:</label>
                <ul>{accessListText}</ul>
            </span>
        );
      }

      parentInfo = (
        <span>
        <label>Parent Machine:</label>
        <ul>
            <li>
                <label>ID:</label> {parentMachine.id}
            </li>
            <li>
                <label>Image:</label> {parentMachine.get('image').name}
            </li>
            <li>
                <label>Version:</label> {parentMachine.get('version').name}
            </li>
        </ul>
        </span>
      );

      basicInfo = (
        <div className="basic-info pull-left">
            <label>Request ID:</label> {request.get('id')}<br />
            <label>Instance ID:</label> {instance.id}<br />
            <label>Instance name:</label> {instance.name}<br />
            <label>New application name:</label> {request.get('new_application_name')}<br />
            <label>New application description:</label> {request.get('new_application_description')}<br />
            <label>New machine owner:</label> {request.get('new_machine_owner').username}<br />
            <label>Request state:</label> {request.get('old_status')}<br />
            <label>Status:</label> {request.get('status').name}<br />
            <label>New provider:</label> {request.get('new_machine_provider').name}<br />
            <label>Allow imaging:</label> {allowImaging}<br />
            <label>Forked:</label> {forked}<br />
            <label>New version licenses:</label> {request.get('new_version_licenses')}<br />
            <label>New version memory min:</label> {request.get('new_version_memory_min')}<br />
            <label>New version cpu min:</label> {request.get('new_version_cpu_min')}<br />
            <label>New version name:</label> {request.get('new_version_name')}<br />
            <label>New version scripts:</label> {request.get('new_version_scripts')}<br />
            <label>New version tags:</label> {request.get('new_version_tags')}<br />
        </div>
      );

      detailedInfo = (
        <div className="detailed-info pull-right">
            <label>Installed software:</label> {request.get('installed_software')}<br />
            <label>iPlant sys files:</label> {request.get('iplant_sys_files')}<br />
            <label>New application visibility:</label> {request.get('new_application_visibility')}<br />
            {sharedWithText}
            {parentInfo}
        </div>
      );

      return(
        <div className="request-admin pull-right admin-detail">
          {basicInfo}
          {detailedInfo}
          <div className="request-actions">
            <h4>Response:</h4><br />
            <textarea type="text" form="admin" value={this.state.value}
              onChange={this.handleResponseChange}/><br />
            <button disabled={request.get('status').name != 'pending'}onClick={this.approve} type="button" className="btn btn-default btn-sm">Approve</button>
            <button disabled={request.get('status').name != 'pending'}onClick={this.deny} type="button" className="btn btn-default btn-sm">Deny</button>
            <button disabled={request.get('status').name == 'closed'}onClick={this.resubmit} type="button" className="btn btn-default btn-sm">Re-Submit</button>
          </div>
        </div>
      );
    }
  });
});

