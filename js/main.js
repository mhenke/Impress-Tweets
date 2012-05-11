/* Author:

*/

(function() {

	var Twitter = {
		init: function( config ) {
			this.url = 'https://api.twitter.com/1/statuses/user_timeline.json?include_rts=true&screen_name=' + config.user + '&count=' + config.count + '&callback=?';
			this.template = config.template;
			this.container = config.container;

			this.fetch();
		},

		attachTemplate: function() {
			var template = Handlebars.compile( this.template );

			this.container.append( template( this.tweets ) );
			
			impress().init();
		},

		fetch: function() {
			var self = this;

			$.getJSON( this.url, function( data ) {
			self.tweets = $.map( data, function( tweet, i ) {
					console.log(tweet);
					var tempTime = new Date(tweet.created_at);
					return {
						author: tweet.user.screen_name,
						tweet: tweet.text,
						time: tempTime.toDateString(),
						name: tweet.user.name,
						url: 'http://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
						x: (i*500) + (Math.random() * 500),
						y: (i*500) + (Math.random() * 500),
						z: (i*500) + (Math.random() * 500),
						rotateX: (i*15) + (Math.random() * 25),
						rotateY: (i*15) + (Math.random() * 25),
						rotateZ: (i*15) + (Math.random() * 25)
					};
				});

				// For future lessons, research $.deferred, viewers. :)
				self.attachTemplate(); 
			});
		},
	};

	Twitter.init({
		template: $('#tweets-template').html(),
		container: $('#impress'),
		user: 'martinansty',
		count: 20
	});

})();
