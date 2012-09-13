// enable Ext autoloader
Ext.Loader.setConfig({
	enabled: true
});

Ext.application({
	name: 'webtrakt',

	statusBarStyle: 'black',
	viewport: {
		// hide navigation bar of browser
		autoMaximize: true
	},

	// launch function is called as soon as app is ready
	launch: function() {
		console.log('launched');
	}
});

var hash = CryptoJS.SHA1("Message");
console.log(hash.toString(CryptoJS.enc.Base64));

$(document).ready(function() {
        $.ajax({
                url: "http://api.trakt.tv/movies/trending.json/9d10cd057c3ae8d3531cffdef7ea8aec",
                data: "format=json",
                jsonp: "jsoncallback",
                dataType: "jsonp",
                success: function(data) {
                        console.log(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                }
        });
});