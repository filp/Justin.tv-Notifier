/*
 * localstorage.js
 * Service and localStorage framework for JustNotify
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

// Helper class for accessing settings in localStorage
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
        storage_set(KEY.configuration, config);
    },

    get frequency() { return this._get_value(KEY.frequency); },
    set frequency(value) { this._set_value(KEY.frequency, value*1000); },
}

// add regular settings to Configuration
$.each(SETTINGS, function(id, setting)
{
    Configuration.__defineGetter__(setting, (function(setting)
    {
        return function() { return this._get_value(KEY[setting]); };
    })(setting));
    Configuration.__defineSetter__(setting, (function(setting)
    {
        return function(value) { return this._set_value(KEY[setting], value); };
    })(setting));
});

// initialize the configuration table
if (!storage_get(KEY.configuration))
{
    storage_set(KEY.configuration, {});
}

// load defaults
$.each(DEFAULTS, function(key, value)
{
    if (Configuration[key] == undefined)
    {
        Configuration[key] = value;
    }
});