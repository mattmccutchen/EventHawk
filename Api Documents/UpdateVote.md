**Update Vote**
----
  Update a single EventHawk event vote.

* **URL**

  /events/:event_id/votes/:vote_id

* **Method:**
  
  PUT
 
*  **URL Params**

   **Required:**
 
   `event_id=[string]`
   
   `vote_id=[string]`
 
* **Data Params**

   **Required:**
 
   `{ "vote" : { "value" : [integer] } }`

* **Success Response:**

  * **Code:** 202 ACCEPTED <br />
    **Content:** `{ "vote" : { "value" : [integer], "voter_id" : "[string]" } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`