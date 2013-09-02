test/build.js: index.js test/test.js
	@component build -o test --name build
	@echo build test/build.js

clean:
	rm -fr build components

.PHONY: clean
