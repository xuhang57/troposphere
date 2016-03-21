import React from 'react/addons';
import Backbone from 'backbone';
import Router from 'react-router';
import stores from 'stores';
import Stats from './Stats.react';

export default React.createClass({
    displayName: "ProvidersList",

    render: function () {
    let providers = this.props.providers;

    let ProviderCards =  providers.map(function(item) {
        let provider = item.attributes;
        return (
            <li key={provider.id} style={{marginBottom: "20px"}}>
                <div className="Media Card" >
                    <Router.Link to = "provider" params = {{id: provider.id}} >
                        <div className="Media-content" >
                            <h2 className="title-3" > {provider.name} </h2>
                        <p className="Media-description" > {provider.description} </p>
                        </div>
                        <div className="Media-footer">
                            <hr/>
                            <Stats provider={provider} />
                        </div>
                    </Router.Link>
                </div>
            </li>
        );
    });
        return (
            <ul className="app-card-list" >
                {ProviderCards}
            </ul>
        );
    }

});
