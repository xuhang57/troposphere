define(
  [
    'jquery',
    'rsvp',
    'backbone',

    // Cross-app models
    './context',
    'models/session',
    'controllers/profile',

    // Routers
    'routers/projects',
    'routers/applications',
    'routers/settings',
    'routers/help',
    'routers/providers',
    'routers/volumes',
    'routers/instances'
  ],
  function ($, RSVP, Backbone, context, Session, ProfileController, ProjectsRouter, ApplicationsRouter, SettingsRouter, HelpRouter, ProvidersRouter, VolumesRouter, InstancesRouter) {

    function startApplication() {

      // Catch-all for errors within promises
      RSVP.on('error', function (reason) {
        console.assert(false, reason);
      });

      $(document).ready(function () {

        // Start the project routers - one of them should be listening for the
        // default empty route ("")
        ProjectsRouter.start();
        ApplicationsRouter.start();
        SettingsRouter.start();
        HelpRouter.start();
        ProvidersRouter.start();
        VolumesRouter.start();
        InstancesRouter.start();

        // For push state support:
        // Route all internal links to the Backbone router(s). External links
        // will still work as expected.  This only affects routes beginning
        // with "/" (ie.e <a href="/projects"></a>)
        //
        // Note about Backbone root:
        // When root is set, Backbone prepends it to all urls.  If root is /app,
        // then Backbone.history.navigate("/fox") will navigate to /app/fox. While
        // this is great when navigating internally through Backbone.history.navigate
        // if we are catching a link with an href of /app/fox, the new link after
        // calling navigate will be /app/app/fox, so we need to remove the base from
        // links that have it before letting Backbone add it back.
        // http://artsy.github.io/blog/2012/06/25/replacing-hashbang-routes-with-pushstate/
        //

        var urlRoot = '/application/';
        Backbone.history.start({
          pushState: true,
          root: urlRoot
        });

        $(document).on("click", "a[href^='" + urlRoot + "']", function (event) {
          if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
            event.preventDefault();
            var regExp = new RegExp("^" + urlRoot); // Ex: /^\/application\//
            var url = $(event.currentTarget).attr("href").replace(regExp, "");
            Backbone.history.navigate(url, { trigger: true });
          }
        });
      });
    }

    return {
      run: function () {

        // todo: store user session in some lightweight object
        // accessible across the app (but not on window)
        var session = new Session();

        // todo: remove in production - development mode only
        if (window.location.hostname == 'localhost') {
            window.access_token = "api-token";

            $.ajaxSetup({
              headers: {'Authorization': 'Token ' + window.access_token}
            });

            session.set({
              access_token: window.access_token
            });

        // For Chris to use w/ Apache config
        } else { // if (window.access_token)
          $.ajaxSetup({
            headers: {'Authorization': 'Bearer ' + window.access_token}
          });
          session.set({
            access_token: window.access_token
          });
        }

        // Fetch the users profile
        ProfileController.getProfile().then(function (profile) {

          // set user context
          context.session = session;
          context.profile = profile;

          startApplication();
        });
      }
    }

  });
