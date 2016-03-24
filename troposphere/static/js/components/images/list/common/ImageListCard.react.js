define(function (require) {

  var React = require('react/addons'),
    Gravatar = require('components/common/Gravatar.react'),
    Backbone = require('backbone'),
    Bookmark = require('components/images/common/Bookmark.react'),
    context = require('context'),
    Tags = require('components/images/detail/tags/Tags.react'),
    stores = require('stores'),
    Showdown = require('showdown'),
    globals = require('globals'),
    moment = require('moment'),
    momentTZ = require('moment-timezone'),
    Router = require('react-router'),
    MediaCard = require('components/common/ui/MediaCard.react');

  return React.createClass({
    displayName: "ImageListCard",

    getInitialState: function() {
        return {
            isExpanded: false
        }
    },

    propTypes: {
      image: React.PropTypes.instanceOf(Backbone.Model).isRequired
    },

    onExpand: function() {
        let isExpanded = this.state.isExpanded ?
            false : true;
        this.setState({
            isExpanded
        });
    },

    render: function () {
      var image = this.props.image,
        type = stores.ProfileStore.get().get('icon_set'),
        imageTags = stores.TagStore.getImageTags(image),
        imageCreationDate = moment(image.get('start_date'))
                                .tz(globals.TZ_REGION)
                                .format("MMM Do YYYY hh:mm a z"),
        converter = new Showdown.Converter();
      let descriptionFull = image.get('description');
      let description;
      let descriptionActive;

      if (descriptionFull) {
            description = descriptionFull.length < 150 ? 
                descriptionFull :
                (descriptionFull.substring(0,150) + " ...");
            descriptionActive = description;
      }
      if (!descriptionFull) {
            descriptionActive = "No Description Provided."
      }

      if (this.state.isExpanded) {
          descriptionActive = descriptionFull;

      }

      let iconSize = 40;

      // always use the Gravatar icons
      let icon = (
            <Router.Link to="image-details" params={{imageId: image.id}}>
                    <Gravatar hash={image.get('uuid_hash')} size={iconSize} type={type}/>
            </Router.Link>
      );

      let title = (
            <Router.Link to="image-details" params={{imageId: image.id}}>
                {image.get('name')}
            </Router.Link>
      );

      let date = (
            <div className="Media-date">
                <time>{imageCreationDate}</time> by <strong>{image.get('created_by').username}</strong>
            </div>
      );

      let detail = (
            <div>
                <div className="Media-description col-md-6">
                    {descriptionActive}
                </div>
                <div className="col-md-6">
                    <Tags activeTags={imageTags}/>
                </div>
            </div>
      );

      // Hide bookmarking on the public page
      var bookmark;
      if (context.profile) {
        bookmark = (
          <Bookmark image={image}/>
        );
      }
      let featured = (<i className="glyphicon glyphicon-thumbs-up"/>);
      return (
            <MediaCard 
                isExpanded={this.state.isExpanded}
                image={icon}
                title={title}
                subTitle={date}
                detail={detail}
                header={[bookmark,featured]}
                onExpand={this.onExpand}
            />
      );
    }
  });
});
