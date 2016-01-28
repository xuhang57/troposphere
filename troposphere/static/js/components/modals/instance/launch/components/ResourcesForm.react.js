import React from 'react';
import Backbone from 'backbone';
import stores from 'stores';
import ResourceGraphs from '../components/ResourceGraphs.react';
import SelectMenu from 'components/common/ui/SelectMenu.react';

export default React.createClass({

    renderSelectProvider: function() {
        if (!this.props.provider) {
            return (<input class="form-control"/>);
        }

        let defaultProviderId = this.props.provider.id;

        // Here we are defining the callback used by SelectMenu's optionName
        // item reffers the parameter passed by map
        let providerName = (item) => item.get('name');

        return (
            <SelectMenu
                defaultId={defaultProviderId}
                list={this.props.providerList}
                optionName={providerName}
                onSelectChange={this.props.onProviderChange}
            />
        );
    },

    renderSelectSize: function() {
        if (!this.props.providerSize) {
            return (<input class="form-control"/>);
        }

        let sizeId = this.props.providerSize.get('id');

        // Here we are defining the callback used by SelectMenu's optionName 
        // item reffers the parameter passed by map
        let sizeName = (item) => `${item.get('name')} (CPU: ${item.get('cpu')}, Mem: ${Math.round(item.get('mem') * 100) / 100}GB)`;

        return (
            <SelectMenu
            //TODO Set default Size
                defaultId={sizeId}
                list={this.props.providerSizeList}
                optionName={sizeName}
                onSelectChange={this.props.onSizeChange}
            />
        );
    },

    render: function () {

        return (
            <form>
                <div className="form-group">
                    <label for="instanceName">
                        Provider
                    </label>
                    {this.renderSelectProvider()}
                </div>
                <div className="form-group">
                    <label for="instanceSize">
                            Instance Size
                    </label>
                    {this.renderSelectSize()}
                </div>
                <div className="form-group">
                    <ResourceGraphs
                        provider={this.props.provider}
                        resourcesUsed={this.props.resourcesUsed}
                        size={this.props.providerSize}
                        sizes={this.props.providerSizeList}
                        identityProvider={this.props.identityProvider}
                        onRequestResources={this.props.onRequestResources}
                    />
                </div>
            </form>
        );
    },
});
