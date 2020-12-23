const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'Load a JSON or FBP string into a NoFlo graph';
  c.inPorts.add('in',
    { datatype: 'string' });
  c.outPorts.add('out',
    { datatype: 'object' });
  c.outPorts.add('error',
    { datatype: 'object' });
  return c.process((input, output) => {
    if (!input.hasData('in')) { return; }
    const source = input.getData('in');
    let promise;
    if (source.indexOf('->') !== -1) {
      // FBP file
      promise = noflo.graph.loadFBP(source);
    } else {
      promise = noflo.graph.loadJSON(source);
    }
    promise
      .then((graph) => {
        output.sendDone({ out: graph });
      }, output.done);
  });
};
