/*
 * background.js
 * JustNotify background script
 *
 * Copyright (C) 2011 Håvard Pettersson.
 *
 * This software is distributed under the GPL Version 2 license.
 * See the attached LICENSE for more information.
 */

// keep track of online streams
Configuration.justintv_username = "harpyon";
Configuration.frequency = 300;

var online = [];
var justintv_favorites;

function update_justintv_favorites()
{
	var url = URL.justintv_favorites.replace(SUBSTITUTE.username, Configuration.justintv_username);
	$.getJSON(url, null, function(data, textStatus, jqXHR)
	{
		justintv_favorites = [];
		$.each(data, function(index, channel)
		{
			justintv_favorites.push(channel.login);
		});
	});
}

function poll_justintv()
{
	$.each(justintv_favorites, function(index, channel)
	{
		$.getJSON(URL.justintv_stream, { "channel": channel }, (function(channel)
		{
			return function(data, textStatus, jqXHR)
			{
				if (data.length > 0)
				{
					// stream is online
					stream = data[0];
					if (online.indexOf(stream.channel.login) == -1)
					{
						// it was not online last time we checked - display a notification
						var title = stream.channel.title;
						var icon = stream.channel.image_url_tiny;
						var text = chrome.i18n.getMessage("just_went_online", "Justin.tv");

						webkitNotifications.createNotification(icon, title, text).show();

						online.push(stream.channel.login);
					}
				}
				else
				{
					// stream is offline
					online.splice(online.indexOf(channel), 1);
				}
			};
		})(channel));
	});
	setTimeout(poll_justintv, Configuration.frequency);
}

update_justintv_favorites();
setTimeout(poll_justintv, Configuration.frequency);