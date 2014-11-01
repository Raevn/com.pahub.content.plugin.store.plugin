function load_store_plugin(data) {
	pahub.api.content.addContentStore(data.content_id, data.display_name, data);
	var pahubPlugin = {
		"content_id": "com.pahub",
		"store_id": "com.pahub.content.plugin.store.plugin",
		"display_name": "PA Hub",
		"description": "Plugin representing PA Hub, for dependency/versioning purposes",
		"author": "Raevn",
		"version": pahubPackage.version,
		"date": "2014/10/25",
		"enabled": true
	};
	model.loaded_plugins.push(pahubPlugin);
	model.core_plugins.push(pahubPlugin);
	pahub.api.content.addContentItem(true, pahubPlugin.store_id, pahubPlugin.content_id, pahubPlugin.display_name, "", pahubPlugin);
	
	//TODO: Add PA plugin.
}

function unload_store_plugin(data) {}

function store_plugin_enabled(content) {
	if (pahub.api.plugin.getPluginLoaded(content.content_id) == false) {
		pahub.api.plugin.loadPlugin(path.dirname(content.url));
	}
}

function store_plugin_disabled(content) {
	if (pahub.api.plugin.getPluginLoaded(content.content_id) == true) {
		if (pahub.api.content.contentStoreExists(content.content_id) == true) {
			pahub.api.content.removeContentStore(content.content_id);
		}
		pahub.api.plugin.unloadPlugin(content.content_id);
	}
}