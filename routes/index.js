var express = require('express');
    router = express.Router();
    Threads= require('webworker-threads');
    redis = require('redis');


var fibNumber = 0;
    time = null;
    diff = null;
    client = redis.createClient(6379,'127.0.0.1');
    method = null;
    elapsedTime = null;
 client.on('connect', function() {
   //console.log('connected');
  });
  
router.get('/:nth', function(req, res) {
  
  // handle non number n values
  time = process.hrtime();
  var n = req.params.nth;
  method = req.query.method;
    if(n == null || n == 'undefined' || 
        (method !== 'recursive' && method !== 'iterative') ||
        method == 'undefined'){
      res.status(500).json({ 
                            error: 'Bad request. Expecting parameters - /n?method=recursive or /n?method=iterative'});
        res.end();
    } else if(n > 45) {
        res.status(500).json({ error: 'Enter a value less than 45 ',
                              nth: n});
        res.end();
    } else {
       client.exists(n, function(err, reply) {
            if (err) throw err;
            if (reply === 1) {
                //console.log('exists');
                client.get(n, function(err, reply) {
                  if (err) throw err;
                  fibNumber = reply;
                  diff = process.hrtime(time);
                  elapsedTime = diff[0]*1000000 + diff[1]/1000000 + ' ms';
                  res.status(200).json(
                    {
                      nth: req.params.nth,
                      value: fibNumber,
                      timestamp: new Date().toISOString(),
                      elapsed: elapsedTime
                    });
                  res.end();
                  time = null;
                  //console.log(reply);
                });
            } else { 
                //console.log('doesn\'t exist');
                var t = Threads.create();
                // get fib and return
                if(method === 'iterative'){
                  //console.log("iterative");
                  function fibo (n) {
                      console.log("iterative");
                      var a = 0 ;
                      var b = 1 ;
                      var f = 1;
                      for(var i = 2; i <= n; i++) {
                          f = a + b;
                          a = b;
                          b = f;
                        }
                      return f;
                      
                  }
                } else if (method === "recursive") {
                    //console.log("recursive");
                    function fibo (n) {
                        return n < 2 ? (n < 1 ? 0 : 1) : fibo(n - 1) + fibo(n - 2);
                    }

                }  // handle other method inputs that are not valid
                t.eval(fibo);
                t.eval('fibo('+n+')', function(err, result) {
                    if (err) throw err; // something abnormal
                    fibNumber = result;
                    step5();
                    diff = process.hrtime(time);
                    elapsedTime = diff[0]*1000 + diff[1]/1000000 + ' ms';
                    client.set(n, fibNumber, function(err, reply) {
                        if (err) throw err;
                          //console.log(reply);
                        });
                        res.status(200).json(
                        {
                          nth: n,
                          value: fibNumber,
                          timestamp: new Date().toISOString(),
                          elapsed: elapsedTime
                          
                        });
                        res.end();
                   
                  });
                  function step5() {
                   t.destroy();
                  }
                // end fib gen
                
           }

        });
     }

});


module.exports = router;