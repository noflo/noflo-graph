noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
  c.description = 'Load a JSON or FBP string into a NoFlo graph'
  c.inPorts.add 'in',
    datatype: 'string'
  c.outPorts.add 'out',
    datatype: 'object'
  c.outPorts.add 'error',
    datatype: 'object'
  c.process (input, output) ->
    return unless input.hasData 'in'
    source = input.getData 'in'
    if source.indexOf('->') isnt -1
      # FBP file
      noflo.graph.loadFBP source, (err, graph) ->
        return output.done err if err
        output.sendDone
          out: graph
      return
    noflo.graph.loadJSON source, (err, graph) ->
      return output.done err if err
      output.sendDone
        out: graph
