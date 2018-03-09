
var assert = require('assert');
var testServerWithPort = 'tf.bonta-kun.net:27015'
var testServer = 'tf.bonta-kun.net'
var testPort = 27015

//grab a reference to the library, this is simplier when you're using it as a library.
var steamServerStatus = require(__dirname + '/../lib/steam-server-status')

describe('Single usage', function() {

  it('should accept a server with a port in the hostname', (done) => {
    steamServerStatus.queryServer(testServerWithPort)
      .then((res) => {
        done(null, res)
      })
      .catch(done)
  })

  it('should accept a server with a port as an option', (done) => {
    steamServerStatus.queryServer(testServer, {port: testPort})
      .then((res) => {
        done(null, res)
      })
  })

  it('should accept a server with a port as a second argument', (done) => {
    steamServerStatus.queryServer(testServer, testPort)
      .then((res) => {
        done(null, res)
      })
  })

  it('should reject a server with an incorrect port after a timeout', (done) => {
    steamServerStatus.queryServer(testServer, testPort+1)
      .catch((err) => {
        done()
      })
  }).timeout(5000) // allow more time to timeout

  it('should use the timeout provided when rejecting requests', (done) => {
    var timeoutId
    timeout = new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        reject('Took too long to resolve')
      }, 500);
    }).catch(done)

    steamServerStatus.queryServer(testServer, {timeout:10, port:1234})
      .catch((err) => {
        clearTimeout(timeoutId)
        done(null, err)
      })
  })

})

describe('Multiple usage', function() {

  it('should accept multi servers with a port in the hostname', (done) => {
    steamServerStatus.queryServer(Array(5).fill(testServerWithPort))
      .then((res) => {
        done(null, res)
      })
      .catch(done)
  })

  it('should accept a server with a port as an option', (done) => {
    steamServerStatus.queryServer(Array(5).fill([testServer, {port: testPort}]))
      .then((res) => {
        done(null, res)
      })
  })

  it('should accept a server with a port as a second argument', (done) => {
    steamServerStatus.queryServer(Array(5).fill([testServer, testPort]))
      .then((res) => {
        done(null, res)
      })
  })

  it('should reject a server with an incorrect port after a timeout', (done) => {
    steamServerStatus.queryServer(Array(5).fill([testServer, testPort+1]))
      .catch((err) => {
        done()
      })
  }).timeout(5000) // allow more time to timeout

  it('should use the timeout provided when rejecting requests', (done) => {
    var timeoutId
    timeout = new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        reject('Took too long to resolve')
      }, 500);
    }).catch(done)

    steamServerStatus.queryServer(Array(5).fill([testServer, {timeout:10, port:1234}]))
      .catch((err) => {
        clearTimeout(timeoutId)
        done(null, err)
      })
  })

})
