define(
  [
    'react',
    './header/HeaderView.react',
    './tags/TagsView.react',
    'components/common/membership/MembershipView.react',
    './launch/ImageLaunchCard.react',
    './name/NameView.react',
    './created/CreatedView.react',
    './removed/RemovedView.react',
    './author/AuthorView.react',
    './description/DescriptionView.react',
    './privacy/PrivacyView.react',
    './versions/VersionsView.react',
    'actions',
    'stores'
  ],
  function (React, HeaderView, TagsView, MembershipView, ImageLaunchCard, NameView, CreatedView, RemovedView, AuthorView, DescriptionView, PrivacyView, VersionsView, actions, stores) {

    return React.createClass({
      displayName: "ViewImageDetails",

      propTypes: {
        image: React.PropTypes.instanceOf(Backbone.Model).isRequired,
        providers: React.PropTypes.instanceOf(Backbone.Collection),
        identities: React.PropTypes.instanceOf(Backbone.Collection),
        tags: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
        image_memberships: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
        onEditImageDetails: React.PropTypes.func.isRequired
      },

      renderEditLink: function(){
        var profile = stores.ProfileStore.get(),
            image = this.props.image;

        if(profile.id && profile.get('username') === image.get('created_by').username || profile.get('is_staff')){
          return (
            <div className="edit-link-row clearfix">
              <a className="pull-right" onClick={this.props.onEditImageDetails}>
                <span className="glyphicon glyphicon-pencil"></span> Edit details</a>
            </div>
          )
        }
      },

      render: function () {
        var membershipView = (<MembershipView activeMemberships={this.props.image_memberships}/>);
        return (
          <div>
            <div>
              <NameView image={this.props.image}/>
              <CreatedView image={this.props.image}/>
              <RemovedView image={this.props.image}/>
              <AuthorView image={this.props.image}/>
              <DescriptionView image={this.props.image}/>
              <TagsView image={this.props.image} tags={this.props.tags}/>
              <PrivacyView image={this.props.image}/>
              { membershipView }
            </div>
            {this.renderEditLink()}
          </div>
        );
      }

    });

});
