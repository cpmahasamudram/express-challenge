## Fibonacci's API
![fib](https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Fibonacci_spiral_34.svg/220px-Fibonacci_spiral_34.svg.png)

The Fibonacci Sequence is an integer sequence commonly used in places where increasing sequences are needed, like login throttling or coding interview questions :smile:. Formally it's defined as:

```
fib(n) = fib(n-1) + fib(n-2)
```

For this exercise we'll use the following base cases:
```
fib(0) = 0
fib(1) = 1
```


### What do I do?

This is a simple test of basic CS fundamentals as well as basic API knowledge.
You'll be creating an API route using [Node.js](https://nodejs.org/en/about/) and [Express](http://expressjs.com/en/guide/routing.html) that returns the `n`th fibonacci number

The spec is as follows:

- [ ] A single API route that will return a JSON object containing the `n`th fibonacci number
- [ ] The route must contain a parameter representing the `n`th fibonacci number
- [ ] The JSON response returns a valid HTTP response code, as well as the following properties:
  - [ ] `nth` - the index of the number in the fibonacci sequence
  - [ ] `value` - the `n`th value of the fibonacci sequence
  - [ ] `timestamp` - the date/time when the response was sent, as an ISO string
  - [ ] `elapsed` - the time it took to calculate the `n`th fibonacci number, in milliseconds

### For consideration:

- Performance is important here. Make sure to watch how frequently you're evaluating a `fib()` function such that you're only running it as needed.
- Update the last section of this `README.md` with any thoughts or explanations you may have.
- You can choose to use either recursion or iteration for your implementation, but please let us know why you chose the one you did in the README.

### Extra Credit

- Implement iterative _and_ recursive fib functions, and allow for a `method` query parameter that can specify which method to use
- Automated tests included for the project. Use your framework of choice for testing and include dependencies such that we can run the tests here.


### Solution Discussion:


- Considering the time it takes to compute the fibonacci numbers as n increases, i have set a limit on n to 45. I did this in part to use my time to work on other details like caching, automated tests etc. I used a single thread to compute the fibonacci number. This approach was faster than using just a standalone method.

- I used Redis to implement caching. These are the links i referred for set up -
http://jasdeep.ca/2012/05/installing-redis-on-mac-os-x/
http://redis.io/topics/quickstart

- The method to generate the fibonacci number is only hit when it is not found in the cache. When the method gets called and a new fibonacci number id generated, it is stored in the cache with n as key.

- Iterative and recursive methods have been implemented.

- 5 Automated tests using Mocha, Chai and SuperTest.

- There are other more effective approaches to generate bigger fibonacci numbers. Those needed multithreading, which might take more time to implement with my comparatively new node.js skills. 

