/*
 * constants.js
 * Constants for JustNotify
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
    justintv: "justintv",
    frequency: "frequency",
};

DEFAULTS = {
    frequency: 10, // interval in seconds to update
};

SUBSTITUTE = {
	username: "%USER%",
};

URL = {
	justintv_favorites: "http://api.justin.tv/api/user/favorites/" + SUBSTITUTE.username + ".json",
	justintv_stream: "http://api.justin.tv/api/stream/list.json",
};