/*
 * popup.js
 * JustNotify popup script
 *
 * Copyright (C) 2011 Håvard Pettersson.
 *
 * This software is distributed under the GPL Version 2 license.
 * See the attached LICENSE for more information.
 */

var port;

$(function()
{
    port = chrome.extension.connect();
    
    $(".i18n").each(function()
    {
        var $element = $(this);
        var name = $element.attr("name");
        var text = chrome.i18n.getMessage(name);
        $element.text(text);
        console.log(name, text);
    });

    $("div#footer > a").click(refresh);

    refresh();
});

function refresh()
{
    console.log("Refreshing...");
    port.postMessage({ message: MESSAGE.update_status });
    port.onMessage.addListener(function(message)
    {
        console.log(message);
        var channel = message[0];
        var title = message[1];
        var status = message[2];

        var $channel = $("div.channel[name=" + channel + "]");
        if (!$channel.length)
        {
            $channel = $("<div>");
            $channel.addClass("channel");
            $channel.attr("name", channel);
        }
        $channel.empty();

        if (title)
        {
            $channel.text(title);
            $channel.append("<span>" + channel + "</span>");
        }
        else
        {
            $channel.text(channel);
        }

        var $status = $("div.status[name=" + channel + "]");
        if (!$status.length)
        {
            $status = $("<div>");
            $status.addClass("status");
            $status.attr("name", channel);
        }
        $status.removeClass("online").removeClass("offline");
        $status.addClass(status ? "online" : "offline");
        $status.text(status ? chrome.i18n.getMessage("online") : chrome.i18n.getMessage("offline"));

        $("div#channels").append($channel).append($status);
    });
}
