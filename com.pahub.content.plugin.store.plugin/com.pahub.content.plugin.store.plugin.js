/*
	Plugin "Plugin Store"
	=====================
	(Store) Manage installed Plugins
	
	content_id: com.pahub.content.plugin.store.plugin
	store_id: com.pahub.content.plugin.store.plugin
	author: Raevn
*/

function load_store_plugin(data, folder) {
	pahub.api.content.addContentStore(data.content_id, data.display_name, data);
	var pahubPlugin = {
		"content_id": "com.pahub",
		"store_id": "com.pahub.content.plugin.store.plugin",
		"display_name": "PA Hub",
		"description": "Plugin representing PA Hub, for dependency/versioning purposes",
		"author": "Raevn",
		"version": pahubPackage.version,
		"enabled": true,
		"icon": path.join(folder, "pahub.png")
	};
	model.loaded_plugins.push(pahubPlugin);
	model.core_plugins.push(pahubPlugin);
	pahub.api.content.addContentItem(true, pahubPlugin.store_id, pahubPlugin.content_id, pahubPlugin.display_name, "", pahubPlugin);
	
	if (Object.keys(streams).length > 0 && model.stream() != "") {
		var paPlugin = {
			"content_id": "com.pa",
			"store_id": "com.pahub.content.plugin.store.plugin",
			"display_name": "Planetary Annihilation",
			"description": "Plugin representing Planetary Annihilation, for dependency/versioning purposes",
			"author": "Uber Entertainment",
			"version": pahub.api.content.fixVersionString(streams[model.stream()].build + ".0.0"),
			"enabled": true,
			"icon": path.join(folder, "pa.png")
		};
		model.loaded_plugins.push(paPlugin);
		model.core_plugins.push(paPlugin);
		pahub.api.content.addContentItem(true, paPlugin.store_id, paPlugin.content_id, paPlugin.display_name, "", paPlugin);
	}
	setPAplugin();
	model.stream.subscribe(setPAplugin);
}

var setPAplugin = function() {
	var content = pahub.api.content.getContentItem(true, "com.pa");
	if (pahub.api.content.contentItemExists(true, "com.pa") == true) {
		content.version(pahub.api.content.fixVersionString(streams[model.stream()].build + ".0.0"));	
		model.content.getContentItems(true).valueHasMutated();
		pahub.api.content.verifyContentDependencies();
	}
}

function unload_store_plugin(data) {
	//This plugin is core; it cannot be unloaded
}

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