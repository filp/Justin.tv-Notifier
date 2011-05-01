/*
 * background.js
 * JustNotify background script
 *
 * Copyright (C) 2011 Håvard Pettersson.
 *
 * This software is distributed under the GPL Version 2 license.
 * See the attached LICENSE for more information.
 */

// test data
Configuration.username = "harpyon";
Configuration.frequency = 300;

// keep track of online streams
var channels;

// initialize
$(function()
{
	update_channels();
});

function update_channels()
{
	console.log("Updating channels...");
	var url = URL.favorites.replace(SUBSTITUTE.username, Configuration.username);
	$.getJSON(url, null, function(data, textStatus, jqXHR)
	{
		channels = {};
		$.each(data, function(index, channel)
		{
			// initially set the channel to offline (false)
			channels[channel.login] = false;
		});

		// add user-defined channels
		$.each(Configuration.channels, function(index, channel)
		{
			channels[channel] = false;
		});
		console.log("Channels:", channels);

		// update channel statuses
		poll();
	});
}

function poll()
{
	console.log("Checking channels...");
	$.each(channels, function(channel, online)
	{
		$.getJSON(URL.stream, { "channel": channel }, (function(channel)
		{
			return function(data, textStatus, jqXHR)
			{
				if (data && data.length > 0)
				{
					// stream is online
					stream = data[0];
					if (!channels[channel])
					{
						if (Configuration.show_notification)
						{
							// it was not online last time we checked - display a notification
							var title = stream.channel.title;
							var icon = stream.channel.image_url_tiny;
							var text = chrome.i18n.getMessage("just_went_online", "Justin.tv");

							webkitNotifications.createNotification(icon, title, text).show();
						}
						channels[channel] = true;
						console.log("Online:", stream.channel.title);
					}
				}
				else
				{
					// stream is offline
					channels[channel] = false;
					console.log("Offline:", channel);
				}
			};
		})(channel));
	});
	console.log("Next check in " + Configuration.frequency/1000 + " seconds");
	setTimeout(poll, Configuration.frequency);
}
