setup:
	git config core.fileMode false
	git submodule update --init
	npm install

watch:
	NODE_ENV=development gulp

release:
	NODE_ENV=production gulp build