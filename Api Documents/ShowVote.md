**Show Vote**
----
  Returns JSON data about a single EventHawk event vote.

* **URL**

  /events/:event_id/votes/:vote_id

* **Method:**
  
  GET
 
*  **URL Params**

   **Required:**
 
   `event_id=[string]`
   
   `vote_id=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "vote" : { "value" : [integer], "voter_id" : "[string]" } }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`