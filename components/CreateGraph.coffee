noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
  c.description = 'Create a NoFlo Graph instance'
  c.inPorts.add 'details',
    datatype: 'object'
  c.outPorts.add 'out',
    datatype: 'object'
  c.process (input, output) ->
    return unless input.hasData 'details'
    details = input.getData 'details'
    if details.type
      details.environment =
        type: details.type
      delete details.type
    graph = new noflo.Graph details.name
    graph.setProperties details
    output.sendDone
      out: graph
