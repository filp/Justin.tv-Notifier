/*
 * localstorage.js
 * Service and localStorage framework for LiveNotify
 *
 * Copyright (C) 2011 Håvard Pettersson.
 *
 * This software is distributed under the GPL Version 2 license.
 * See the attached LICENSE for more information.
 */

// Get and JSON-decode a value from localStorage
function storage_get(index)
{
    try
    {
        return JSON.parse(localStorage.getItem(index));
    }
    catch (error)
    {
        return null;
    }
}

// JSON-encode and insert a value to localStorage
function storage_set(index, value)
{
    localStorage.setItem(index, JSON.stringify(value));
}

// Helper class for accessing usernames in localStorage
var Configuration = {
    // fetch a value from the configuration table
    _get_value: function(index)
    {
        return storage_get(KEY.configuration)[index];
    },

    // set a value in the configuration table
    _set_value: function(index, value)
    {
        var config = storage_get(KEY.configuration);
        config[index] = value;
        storage_set(KEY.users, config);
    },

    get justintv_username() { return this._get_value(KEY.justintv); },
    set justintv_username(value) { this._set_value(KEY.justintv, value); },
}

// initialize the configuration table
if (!storage_get(KEY.configuration))
{
    storage_set(KEY.configuration, {});
}
