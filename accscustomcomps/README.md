# Overview

This custom component service implementation based on express.js includes the following files:

  package.json - This is a standard package.json file.

  index.js - The main javascript file.
  Implements the Bots custom components service REST API, delegating to the shell.js for most of its functionality.

  registry.js - Lists custom components managed by a component service.

  shell.js - Utility object shipped which finds and invokes custom components.

  hello_world/hello_world.js - An example custom component implemantion.

  hello_world/hello_world.json - A bot export which uses hello_world/hello_world.js custom component.