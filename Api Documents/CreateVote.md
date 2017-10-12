**Create New Vote**
----
  Create a new vote for an EventHawk event.

* **URL**

  /events/:id/votes

* **Method:**
  
  POST
 
* **Data Params**

   **Required:**
 
   `{ "vote" : { "value" : [integer] } }`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ "vote" : { "value" : [integer], "voter_id" : "[string]" } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`