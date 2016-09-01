
# To test a 'Node Restful API with Mocha and Chai' in [Chart Application] (https://github.com/mariam-crissi/chartapptest)

#Introduction

Initally,a 'test-server.js' file is created in the 'test' folder for testing.For testing purpose, a database is defined in  'config.js' file in the 'app' folder.A NODE_ENV variable with value 'test' is defined in 'test-server.js'.The main application's 'server.js' file establishes db connection using the NODE_ENV variable.

The dependencies are defined in the  'test-server.js' as follows.The environment for making test is created with 'Mocha.And using 'chai' as assertion library ,a test case is implemented to test whether a GET request is actually returning a JSON file. The addon 'chai HTTP' allows chai library to easily use assertions on HTTP requests and the addon 'Chai Things' allows chai library to easily use assertions on Arrays.The testing suite is defined in 'describe' and each test case is defined using 'it'.A functionality to add and remove a dummy datas to the db is included for running test case before and after each test.A GET request is made to the /linechart endpoint and then checked that the response contains the following assertions.

1)should return 200 HTTP status code.                             

2)should be an object.

3)should return as json

4)body properties should be _id,name,status,unit period,values.

5)body properties values should be as inserted.

Run the test by the command 'mocha' in command prompt.It will display the db defined for testing.If the test is passed,it returns pass message.
