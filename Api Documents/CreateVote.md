**Create New Vote**
----
  Create a new vote for an EventHawk event.

* **URL**

  /votes

* **Method:**
  
  POST
 
* **Data Params**

   **Required:**
 
   `{ "vote" : { "value" : [integer], "event_id" : [string] } }`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ "vote" : { "value" : [integer], "voter_id" : "[string]", "event_id" : [string] } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
