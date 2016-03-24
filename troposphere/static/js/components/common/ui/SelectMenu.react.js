import React from 'react';
import backbone from 'backbone';
import _ from 'underscore';

export default React.createClass({
    displayName: "SelectMenu",

    propTypes: {
        defaultId: React.PropTypes.oneOfType([
           React.PropTypes.string,
           React.PropTypes.number
        ]),
        optionName: React.PropTypes.func.isRequired,
        onSelectChange: React.PropTypes.func.isRequired,
        selection: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.bool,
            React.PropTypes.instanceOf(backbone.Model),
            React.PropTypes.object
        ]),
        list: React.PropTypes.oneOfType([
            React.PropTypes.instanceOf(backbone.Collection),
            React.PropTypes.array
        ]),
        hintText: React.PropTypes.string
    },

    onSelectChange: function(e) {
        let val = e.target.value;
        let list = this.props.list
        let obj = list.get(val);

        this.props.onSelectChange(obj);
    },

    hintText: function() {

        if (this.props.hintText) {

            return (
                <option value="hint" disabled hidden>{this.props.hintText}</option>
            );
        }
    },

    renderOption: function (item) {
        // By default, don't set a default selection.
        // If added as a property, select the matching value from the list
        // If necessary, we could make 'the comparator' isSelected as passable info
        var isSelected = false;
        if (this.props.selected) {
            isSelected = this.props.selected == item;
        }
            return (
                <option key={item.id} value={item.id} selected={isSelected}>
                    {this.props.optionName(item)}
                </option>
            );
    },

    render: function () {
        let value = this.props.defaultId;
        if (this.props.hintText) { value = "hint" }
        if (this.props.list) {
            let options = this.props.list.map(this.renderOption);
            
            return (
            <select value={value} className='form-control' onChange={this.onSelectChange}>
                {this.hintText()}
                {options}
            </select>
            );
        }

        return (
            <select value={this.props.defaultId} className='form-control'>
                <option key="1" value="1" > Loading... </option>
            </select>
        );
    }
});

