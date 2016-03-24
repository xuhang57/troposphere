define(function (require) {

  var React = require('react/addons'),
    context = require('context'),
    Router = require('react-router'),
    stores = require('stores'),
    SecondaryImageNavigation = require('./common/SecondaryImageNavigation.react'),
    ImageDetailsView = require('./detail/ImageDetailsView.react');

  return React.createClass({
    displayName: "ImageDetailsPage",

    mixins: [Router.State],

    renderBody: function(){
      var image = stores.ImageStore.get(Number(this.getParams().imageId)),
        tags = stores.TagStore.getAll(),
        userLoggedIn = (context.profile && context.profile.get('selected_identity')),
        providers = userLoggedIn ? stores.ProviderStore.getAll() : null,
        identities = userLoggedIn ? stores.IdentityStore.getAll() : null;

      if(!image || !tags) return (<div className='loading'></div>);

      // If the user isn't logged in, display the public view, otherwise
      // wait for providers and instances to be fetched
      if (!userLoggedIn) {
        return (
          <ImageDetailsView
            image={image}
            tags={tags}
            />
        );
      }

      var image_memberships = stores.ImageMembershipStore.getMembershipsFor(image);
      var all_memberships = stores.MembershipStore.getAll();
      if (!providers || !identities || image_memberships == null) return (<div className='loading'></div>);

      return (
        <ImageDetailsView
          image={image}
          providers={providers}
          identities={identities}
          tags={tags}
          all_memberships={all_memberships}
          image_memberships={image_memberships}
          />
      );
    },

    render: function () {
      return (
        <div className="container">
          {this.renderBody()}
        </div>
      );
    }

  });

});
