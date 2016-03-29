import React from 'react/addons';
import Gravatar from 'components/common/Gravatar.react';
import Backbone from 'backbone';
import Bookmark from 'components/images/common/Bookmark.react';
import context from 'context';
import Tags from 'components/images/detail/tags/Tags.react';
import actions from 'actions';
import stores from 'stores';
import modals from 'modals';
import Showdown from 'showdown';
import globals from 'globals';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import Router from 'react-router';
import MediaCard from 'components/common/ui/MediaCard.react';

export default React.createClass({
    displayName: "ImageListCard",

    propTypes: {
        image: React.PropTypes.instanceOf(Backbone.Model).isRequired
    },

    onBookmark: function(image) {
        let imageBookmark = stores.ImageBookmarkStore.findOne({
            'image.id': image.id
        });
        if (imageBookmark) {
            actions.ImageBookmarkActions.removeBookmark({image});
        } else {
            actions.ImageBookmarkActions.addBookmark({image});
        }
    },

    onLaunchImage: function(image) {
        modals.InstanceModals.launch({ image, initialView: "BASIC_VIEW" });
    },

    render: function() {
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

        // always use the Gravatar icons
        let icon = (
            <Router.Link to="image-details" params={{imageId: image.id}}>
                    <Gravatar hash={image.get('uuid_hash')} size={40} type={type}/>
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

        let isFeatured = imageTags.some(
            (item) => item.get('name') === "Featured"
        );
        let isBookmarked= stores.ImageBookmarkStore.findOne({
            'image.id': image.id
        });
        let Featured = isFeatured ?
            (
                <li style={{listStyle: "none", padding: "0 5px 0 0", display: "inline-block" }}>
                    <i className="glyphicon glyphicon-star"/>
                </li>
            ) : null;

        let Bookmarked = isBookmarked ?
            (
                <li style={{listStyle: "none", padding: "0 5px 0 0", display: "inline-block" }}>
                    <i className="glyphicon glyphicon-bookmark"/>
                </li>
            ) : null;

        let imageIcons = (
            <ul style={{padding: "0",color: "grey"}}>
                {Featured}
                {Bookmarked}
            </ul>
        );

        let  bookmarkName = isBookmarked ? "Remove from Bookmarks" : "Add to Bookmarks";
        let  contextualMenu = context.profile ?
            [{
                name: bookmarkName,
                action: this.onBookmark.bind(this, image)
            },
            {
                name: "Launch Instance",
                action: this.onLaunchImage.bind(this, image)
            }] : null;

        return (
            <MediaCard
                isExpanded={this.props.isExpanded}
                image={icon}
                title={title}
                subTitle={date}
                detail={detail}
                titleInfo={imageIcons}
                onExpand={this.props.onExpand}
                contextualMenu={contextualMenu}
            />
        );
    }
});
