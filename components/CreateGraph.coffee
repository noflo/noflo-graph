noflo = require 'noflo'

class CreateGraph extends noflo.Component
  description: 'Create a NoFlo Graph instance'
  constructor: ->
    @inPorts =
      details: new noflo.Port 'object'
    @outPorts =
      out: new noflo.Port 'object'

    @inPorts.details.on 'data', (details) =>
      graph = new noflo.Graph details.name
      graph.properties.environment =
        runtime: details.type
      @outPorts.out.send graph
    @inPorts.details.on 'disconnect', =>
      @outPorts.out.disconnect()

pxports.getComponent = -> new CreateGraph
