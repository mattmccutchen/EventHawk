**Index Events**
----
  Returns JSON data about all future EventHawk events.

* **URL**

  /events

* **Method:**
  
  GET

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ [ { "event_id" : [integer] }, { "event_id" : [integer] }, ... ] }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`
