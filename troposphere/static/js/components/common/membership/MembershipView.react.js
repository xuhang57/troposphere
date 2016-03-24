define(function (require) {

  var React = require('react/addons'),
      Backbone = require('backbone');

  var ENTER_KEY = 13;

  return React.createClass({
    displayName: 'MembershipView',

    propTypes: {
      activeMemberships: React.PropTypes.instanceOf(Backbone.Collection),
      label: React.PropTypes.string.isRequired,
      noMembershipText: React.PropTypes.string,
    },

    getDefaultProps: function() {
      return {
        activeMemberships: new Backbone.Collection(),
        label: 'Membership',
        noMembershipText: 'No members'
      }
    },
    renderMembershipItem: function(membership) {
        return (
            <li className='tag' key={membership.id}>
              <a href='javascript:void(0)'>{membership.get('name')}</a>
            </li>
        );
    },
    render: function () {
      var link,
          membershipView,
          memberships = this.props.activeMemberships.models,
          membershipList = memberships.map(this.renderMembershipItem);
      var membershipContent;
      if (membershipList.length > 0) {
          membershipContent = (
            <ul className='tags'>
              {membershipList}
            </ul>
          );
      } else {
          membershipContent = this.props.noMembershipText;
      }
      return (
        <div className='image-membership image-info-segment row'>
          <h4 className='t-title col-md-2'>{this.props.label}</h4>
          <div className='content col-md-10'>
            {membershipContent}
          </div>
        </div>
      );
    }

  });

});
