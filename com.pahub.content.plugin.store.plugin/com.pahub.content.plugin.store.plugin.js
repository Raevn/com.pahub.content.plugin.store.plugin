function load_store_plugin(data) {
	pahub.api.content.addContentStore(data.content_id, data.display_name, data);
	var pahubPlugin = {
		"content_id": "com.pahub",
		"store_id": "com.pahub.content.plugin.store.plugin",
		"display_name": "PA Hub",
		"description": "Plugin representing PA Hub, for dependency/versioning purposes",
		"author": "Raevn",
		"version": pahubPackage.version,
		"enabled": true
	};
	model.loaded_plugins.push(pahubPlugin);
	model.core_plugins.push(pahubPlugin);
	pahub.api.content.addContentItem(true, pahubPlugin.store_id, pahubPlugin.content_id, pahubPlugin.display_name, "", pahubPlugin);
	
	//Needed?
	if (model.pte_build() || model.stable_build()) {
		var paPlugin = {
			"content_id": "com.pa",
			"store_id": "com.pahub.content.plugin.store.plugin",
			"display_name": "PA PTE Stream",
			"description": "Plugin representing PA (PTE stream), for dependency/versioning purposes",
			"author": "Uber Entertainment",
			"version": parseInt(model.pte_build()) + ".0.0",
			"enabled": true
		};
		
		if (model.pte_build().indexOf("-") > -1) {
			paPlugin.version += model.pte_build().substring(model.pte_build().indexOf("-"), model.pte_build().length);
		}
		model.loaded_plugins.push(paPlugin);
		model.core_plugins.push(paPlugin);
		pahub.api.content.addContentItem(true, paPlugin.store_id, paPlugin.content_id, paPlugin.display_name, "", paPlugin);
	}
	setPAplugin();
	model.stream.subscribe(setPAplugin);
}

var setPAplugin = function() {
	var content = pahub.api.content.getContentItem(true, "com.pa");
	if (model.stream() == "STEAM") {
		content.data.display_name = "PA (Steam)";
		content.display_name("PA (Steam)");
		content.data.description = "Plugin representing PA (Steam), for dependency/versioning purposes";
		content.data.version = parseInt(model.stable_build()) + ".0.0";
		if (model.stable_build().indexOf("-") > -1) {
			content.data.version += model.stable_build().substring(model.stable_build().indexOf("-"), model.stable_build().length);
		}
		content.version(pahub.api.content.fixVersionString(content.data.version));		
	}
	if (model.stream() == "STABLE") {
		content.data.display_name = "PA Stable Stream";
		content.display_name("PA Stable Stream");
		content.data.description = "Plugin representing PA (Stable stream), for dependency/versioning purposes";
		content.data.version = parseInt(model.stable_build()) + ".0.0";
		if (model.stable_build().indexOf("-") > -1) {
			content.data.version += model.stable_build().substring(model.stable_build().indexOf("-"), model.stable_build().length);
		}
		content.version(pahub.api.content.fixVersionString(content.data.version));			
	}
	if (model.stream() == "PTE") {
		content.data.display_name = "PA PTE Stream";
		content.display_name("PA PTE Stream");
		content.data.description = "Plugin representing PA (PTE stream), for dependency/versioning purposes";
		content.data.version = parseInt(model.pte_build()) + ".0.0";
		if (model.pte_build().indexOf("-") > -1) {
			content.data.version += model.pte_build().substring(model.pte_build().indexOf("-"), model.pte_build().length);
		}
		content.version(pahub.api.content.fixVersionString(content.data.version));			
	}
	
	model.content.getContentItems(true).valueHasMutated();
	pahub.api.content.verifyContentDependencies();
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