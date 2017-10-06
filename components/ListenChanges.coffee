noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
  c.description = 'Listen for finished change transctions on a graph'
  c.inPorts.add 'in',
    datatype: 'object'
  c.outPorts.add 'out',
    datatype: 'object'
  c.outPorts.add 'error',
    datatype: 'object'
  c.graph = null
  unsubscribe = ->
    return unless c.graph
    c.graph.graph.removeListener 'endTransaction', c.graph.listener
    c.graph.context.deactivate()
    c.graph = null
  c.tearDown = (callback) ->
    do unsubscribe
    do callback
  c.process (input, output, context) ->
    return unless input.hasData 'in'
    graph = input.getData 'in'
    c.graph =
      graph: graph
      listener: (event) ->
        output.send
          out: c.graph.graph
      context: context
    graph.on 'endTransaction', c.graph.listener
