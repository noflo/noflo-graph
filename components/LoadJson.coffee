noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
  c.description = 'Convert a Graph JSON structure into a NoFlo Graph'
  c.inPorts.add 'in',
    datatype: 'object'
  c.outPorts.add 'out',
    datatype: 'object'
  c.outPorts.add 'error',
    datatype: 'object'
  c.process (input, output) ->
    return unless input.hasData 'in'
    source = input.getData 'in'
    noflo.graph.loadJSON source, (err, graph) ->
      return output.done err if err

      if (source.id and graph.properties.id isnt source.id) or (source.project and graph.properties.project isnt source.project)
        graph.setProperties
          id: source.id
          project: source.project

      output.sendDone
        out: graph
    return
