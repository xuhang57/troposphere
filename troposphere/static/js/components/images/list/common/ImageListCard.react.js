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
import truncateText from 'utilities/truncateText';

import MediaCard from 'components/common/ui/MediaCard.react';
import ShowMoreEllipsis from 'components/common/ui/ShowMoreEllipsis.react';

export default React.createClass({
    displayName: "ImageListCard",

    contextTypes: {
        router: React.PropTypes.func
    },

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

    onViewDetails: function(image) {
        this.context.router.transitionTo('image-details', {imageId: image.id});
    },

    render: function() {
        let image = this.props.image;

        // Image next to Title
        let type = stores.ProfileStore.get().get('icon_set');
        let icon = (
            <Router.Link to="image-details" params={{imageId: image.id}}>
                <Gravatar hash={image.get('uuid_hash')} size={40} type={type}/>
            </Router.Link>
        );

        // Title, date and author
        let title = (
            <Router.Link to="image-details" params={{imageId: image.id}}>
                {image.get('name')}
            </Router.Link>
        );

        let imageCreationDate = moment(image.get('start_date'))
            .tz(globals.TZ_REGION).format("MMM Do YYYY hh:mm a z");
        let date = (
            <div className="Media-date">
                <time>{imageCreationDate}</time> by <strong>{image.get('created_by').username}</strong>
            </div>
        );

        // Image Tags
        let allTags = stores.TagStore.getImageTags(image);
        let activeTags = this.props.isExpanded ? allTags :
            allTags.slice(0, 6);
        let showMoreTags;

        if (allTags.length > activeTags.length) {
            showMoreTags = (
                <div>
                    <span style={{color: "darkgrey", fontSize: "12px", marginRight: "10px"}} >
                    {allTags.length - activeTags.length} More Tag(s)
                    </span>
                    <ShowMoreEllipsis/>
                </div>
            )
        }

        // Description
        let descriptionExpanded = image.get('description');
        let descriptionClosed;
        let descriptionActive;

        if (!descriptionExpanded) {
            descriptionActive = "No Description Provided."
        }

        if (descriptionExpanded) {
            if (this.props.isExpanded) {
                descriptionActive = (
                        {descriptionExpanded}
                );
            } else {
                descriptionActive = descriptionExpanded.length < 150 ?
                    (
                        {descriptionExpanded}
                    ) :
                    (
                    <span>
                        {truncateText(descriptionExpanded, 150)}<br/>
                        <ShowMoreEllipsis/>
                    </span>
                    );
            }
        }

        // Detail section in card
        let detail = (
            <div>
                <div className="Media-description col-md-6">
                    {descriptionActive}
                </div>
                <div className="col-md-6">
                    <Tags activeTags={activeTags}/>
                    {showMoreTags}
                </div>
            </div>
        );

        // Image Badges, we only have one for featured now but the list will grow.
        // Possibly want to refactor some of this into common
        let isFeatured = allTags.some(
            (item) => item.get('name') === "Featured"
        );

        let Featured = isFeatured ?
            (
                <li style={{
                        listStyle: "none",
                        padding: "0 5px 0 0",
                        display: "inline-block",
                    }}
                >
                    <div style={{
                            background: "darkgrey",
                            borderRadius: "10px",
                            padding: "1px 5px",
                            color: "white",
                            fontSize: "8px",
                        }}
                    >
                        Featured
                    </div>
                </li>
            ) : null;

        let imageBadges = (
            <ul style={{padding: "0"}}>
                {Featured}
            </ul>
        );

        // Bookmark icon in card header
        let isBookmarked= stores.ImageBookmarkStore.findOne({
            'image.id': image.id
        });
        let Bookmarked = isBookmarked ? (
                <i style={{color: 'darkgrey'}} className="glyphicon glyphicon-bookmark"/>
            ) : null;


        // Contextual menu
        let  bookmarkName = isBookmarked ? "Remove from Bookmarks" : "Add to Bookmarks";

        let  contextualMenu = context.profile ?
            [
                {
                    render: bookmarkName,
                    action: this.onBookmark.bind(this, image)
                },
                {
                    render: "Launch Instance",
                    action: this.onLaunchImage.bind(this, image)
                },
                {   render: "View Details",
                    action: this.onViewDetails.bind(this, image)
                }
            ] : null;

        return (
            <MediaCard
                isExpanded={this.props.isExpanded}
                header={[Bookmarked]}
                image={icon}
                title={title}
                subTitle={date}
                detail={detail}
                titleInfo={imageBadges}
                onExpand={this.props.onExpand}
                contextualMenu={contextualMenu}
            />
        );
    }
});
