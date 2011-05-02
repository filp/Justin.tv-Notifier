/*
 * popup.js
 * JustNotify popup script
 *
 * Copyright (C) 2011 Håvard Pettersson.
 *
 * This software is distributed under the GPL Version 2 license.
 * See the attached LICENSE for more information.
 */

var port, $live, $offline, $channels, $loading;

$(function()
{
    port = chrome.extension.connect();
    
    $(".i18n").each(function()
    {
        var $element = $(this);
        var name = $element.attr("name");
        var text = chrome.i18n.getMessage(name);
        $element.text(text);
    });

    $("div#footer > a").click(refresh);

    $channels = $("#channels");
    $live = $("#live");
    $offline_header = $("#offline_header");
    $offline = $("#offline");
    $loading = $("#loading");

    $offline_header.one("click", function()
    {
        $offline_header.text(chrome.i18n.getMessage("popup_offline"));
        $offline_header.removeClass("offline");
        $offline.slideDown();
    });

    $("a").live("click", function()
    {
        chrome.tabs.create({ url: $(this).attr("href") });
    });

    port.onMessage.addListener(function(message)
    {
        console.log(message);
        $loading.hide();
        $channels.show();

        var $channel = $("<li>");
        if (message.status)
        {
            $channel.append('<a href="http://justin.tv/' + message.channel + '/">' + message.stream.channel.title + '</a>');
            $channel.append("<span>" + message.channel + "</span>");
        }
        else
        {
            $channel.append('<a href="http://justin.tv/' + message.channel + '/">' + message.channel + '</a>');
        }
        
        $channel.hide();
        if (message.status)
        {
            $live.append($channel);
        }
        else
        {
            $offline.append($channel);
        }
        $channel.slideDown();
    });

    refresh();
});

function refresh()
{
    console.log("Refreshing...");
    $channels.hide();
    $loading.show();
    port.postMessage({ message: MESSAGE.update_status });
}
