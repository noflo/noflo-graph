noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
  c.inPorts.add 'property',
    datatype: 'string'
  c.inPorts.add 'value',
    datatype: 'all'
  c.inPorts.add 'in',
    datatype: 'object'
  c.outPorts.add 'out',
    datatype: 'object'
  c.outPorts.add 'error',
    datatype: 'object'
  c.process (input, output) ->
    return unless input.hasData 'property', 'value', 'in'
    [property, value, graph] = input.getData 'property', 'value', 'in'

    unless typeof graph.setProperties is 'function'
      output.done new Error 'Provided graph is not a Graph object'
      return

    props = {}
    props[property] = value
    graph.setProperties props

    output.sendDone
      out: graph
