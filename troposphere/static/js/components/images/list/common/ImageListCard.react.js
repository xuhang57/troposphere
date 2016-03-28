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

    getInitialState() {
        return {
            isExpanded: false
        }
    },

    propTypes: {
      image: React.PropTypes.instanceOf(Backbone.Model).isRequired
    },

    onExpand() {
        let isExpanded = this.state.isExpanded ?
            false : true;
        this.setState({
            isExpanded
        });
        this.props.onExpand()
    },

    onBookmark(image) {
        console.log("bookmark", image);
    },

    onLaunchImage(image) {
        console.log("Launch", image);
    },

    render() {
      let image = this.props.image;
      let type = stores.ProfileStore.get().get('icon_set');
      let imageTags = stores.TagStore.getImageTags(image);
        
      let imageCreationDate = moment(image.get('start_date'))
        .tz(globals.TZ_REGION)
        .format("MMM Do YYYY hh:mm a z");
      let converter = new Showdown.Converter();
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

      if (this.props.isExpanded) {
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
      var bookmarkButton;
      if (context.profile) {
        bookmarkButton = (
          <Bookmark image={image}/>
        );
      };

      let isFeatured = imageTags.some(
              (item) => item.get('name') === "Featured"
      );
      let isBookmarked= stores.ImageBookmarkStore.findOne({
          'image.id': image.id
      });
      let Featured = isFeatured ? 
          (
           <li style={{listStyle: "none", padding: "0 5px 0 0", display: "inline-block" }}>
            <i className="glyphicon glyphicon-thumbs-up"/>
           </li>) :
          null;
      let Bookmarked = isBookmarked ?
          (
           <li style={{listStyle: "none", padding: "0 5px 0 0", display: "inline-block" }}>
            <i className="glyphicon glyphicon-star"/>
           </li>) :
          null;

      let imageIcons = (
              <ul style={{padding: "0",color: "grey"}}>
                {Featured}
                {Bookmarked}
              </ul>
          );

      return (
            <MediaCard 
                isExpanded={this.props.isExpanded}
                image={icon}
                title={title}
                subTitle={date}
                detail={detail}
                header={[bookmarkButton]}
                titleInfo={imageIcons}
                onExpand={this.onExpand}
                contextualMenu={[
                    {
                        name: "Add to Bookmarks",
                        action: this.onBookmark.bind(this, image)
                    },
                    {
                        name: "Launch Instance",
                        action: this.onLaunchImage.bind(this, image)
                    }
                ]}
            />
      );
    }
  });
});
