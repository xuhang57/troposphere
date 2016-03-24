import React from 'react';
import backbone from 'backbone';
import _ from 'underscore';

export default React.createClass({
    displayName: "SelectMenu",

    propTypes: {
        selection: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.bool,
        ]),
        optionName: React.PropTypes.func.isRequired,
        onSelectChange: React.PropTypes.func.isRequired,
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

    renderOption: function (item, idx) {
        // By default, don't set a default selection.
        // If added as a property, select the matching value from the list
        // If necessary, we could make 'the comparator' isSelected as passable info
        var itemId = item.id ? item.id : idx,
            itemValue = item.id ? item.id : itemValue;
            return (
                <option key={itemId} value={itemValue}>
                    {this.props.optionName(item)}
                </option>
            );
    },

    render: function () {
        if (this.props.list) {
            let options = this.props.list.length == 0 ? [this.hintText()] : this.props.list.map(this.renderOption),
                selection = this.props.selection ? this.props.selection : "0";
            return (
            <div>
              <select defaultValue={selection} className='form-control' onChange={this.onSelectChange}>
                  {options}
              </select>
              {this.props.hintText}
            </div>
            );
        }

        return (
            <select value="hint" className='form-control'>
                <option key="0" value="0" > Loading... </option>
            </select>
        );
    }
});

