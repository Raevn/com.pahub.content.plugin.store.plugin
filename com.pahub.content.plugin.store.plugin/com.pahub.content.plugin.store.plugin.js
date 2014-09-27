function load_store_plugin(data) {
	pahub.api.content.addContentStore(data.content_id, data.display_name, data);
}

function unload_store_plugin(data) {}

function store_plugin_enabled(content) {
	if (pahub.api.plugin.getPluginLoaded(content.content_id) == false) {
		pahub.api.plugin.loadPlugin(content.local_path, function(content) {
			pahub.api.log.addLogMessage("info", "", "Plugin '" + content.content_id + "' enabled");
		});
	}
}

function store_plugin_disabled(content) {
	if (pahub.api.plugin.getPluginLoaded(content.content_id) == true) {
		pahub.api.plugin.unloadPlugin(content.content_id);
		pahub.api.log.addLogMessage("info", "", "Plugin '" + content.content_id + "' disabled");
	}
}