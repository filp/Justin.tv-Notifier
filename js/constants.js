/*
 * constants.js
 * JustNotify constants
 *
 * Copyright (C) 2011 Håvard Pettersson.
 *
 * This software is distributed under the GPL Version 2 license.
 * See the attached LICENSE for more information.
 */

APPNAME = "LiveNotify";
VERSION = "0";

KEY = {
	configuration: "configuration",
    username: "user",
    frequency: "frequency",
    show_notification: "show_notification",
    channels: "channels",
};

SETTINGS = ["username", "show_notification", "channels"];

DEFAULTS = {
    frequency: 10, // interval in seconds to update
    show_notification: true,
    channels: [],
};

SUBSTITUTE = {
	username: "%USER%",
};

URL = {
	favorites: "http://api.justin.tv/api/user/favorites/" + SUBSTITUTE.username + ".json",
	stream: "http://api.justin.tv/api/stream/list.json",
};

MESSAGE = {
    update_status: "update",
}