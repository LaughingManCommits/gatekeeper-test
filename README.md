# Gatekeeper Test

A very simple application that regulates resources by access level.

Users can only retrieve/access resources once their session access level is elevated to the required access level.

For example when requesting any content behind the URI "/Level1/\**", the request will be validated and blocked when the attached session does not have the required access level. 

### Current Tech Stack

* Spring Boot
* Apache Freemarker
* Spring Security

### todo
* Complete and improve the unit tests located on ControllerIntegrationTests.java
* Complete and improve the unit tests located on UserInteractionTests.java
* Complete as many "todo"s as you can. Search the code for them.
* Add Unit tests where you see fit.
* Improve what ever code you wish to improve.

NB Required:
* Document all changes that you have made and provide motivation for the changes.

### Getting Started
run the following commands in your console:
* mvn clean install -DskipTests
* mvn spring-boot:run

Open your browser on "http://localhost:8080/home"

### Access levels Supported

* 0 is set to nothing
* 1 is set to numeric password
* 2 is alphanumeric password

### Access Endpoint

POST "http://localhost:8080/authenticate"

Required Headers
* Authorization
* XSRF

Required Cookies
* CSRF Cookie required (given when GET request is done to /home)

Header Input Format
* Authorization: Basic {requested_level}#{username}:{password} encoded base64
* XSRF: alphanumeric (CSRF cookie value)

Authorization Header Example

* Encoded request "Authorization: Basic MSNib2I6MTIzNDE="
* Decoded "Authorization: Basic 1#bob:12341"

Successful Authentication Response

```
{"authenticated":true}
```

Error Authentication Response
Bad Credentials:
```
403
```
Bad CSRF:
```
400
```


on successful authentication responses

* session cookie
* new CSRF cookie

### Resources Endpoint

GET "http://localhost:8080/resources"

Response

```
{ 
   "resources":[ 
      "/Level1/low/access.txt",
      "/Level1/low_access.txt",
      "/Level2/high_access.txt",
      "/Level2/what/am/I/access.txt",
      "/css/main.css",
      "/js/main.js"
   ]
}
```

will give a list of all static resources hosted by the server

#### Resource Access Violations

If no appropriate session is received on a resource request, an access(403) violation is
returned.

```
{"requiredAccess":"Level1","message":"invalid accessLevel level"}
```

### Basic CSRF protection

* A get request to "/home" screen will receive a new csrf token when no csrf token is present.
* Any successful authentication request will receive a new csrf token.
* Any POST request requires a CSRF token to be present


Provide us with your git patch files containing your changes.
Please make sure that if you have large formatting changes that this is not included with the patch files 

