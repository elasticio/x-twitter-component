# X (Twitter) Component

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Post tweet](#post-tweet) 
  * [Make Raw Request](#make-raw-request)
* [Triggers](#triggers)

## Description

X (Twitter) Component is designed to connect with X (Twitter) API v2

## Credentials

To authenticate the component you will need to create an App in [developer portal’s App page](https://developer.twitter.com/en/portal/projects-and-apps), the component uses OAuth 1.0a. [more info](https://developer.twitter.com/en/docs/apps/overview)


Component credentials configuration fields: 
* **Consumer key**  (string, required) - Consumer API key
* **Consumer secret**  (string, required) - Consumer API secret
* **Access token key**  (string, required) - Authentication access token
* **Access token secret**  (string, required) - Authentication access secret

## Actions 

### Post tweet 

Post new tweet

#### Configuration Fields

none

#### Input Metadata

* **Text** - (string, required): Text of your tweet

#### Output Metadata

* **id** - (string, required): Unique identifier of your tweet

* **text** - (string, required): Text of your tweet 
* **edit_history_tweet_ids** - (array, required): list of tweet ids edit history
  
### Make Raw Request 

Executes custom request.

#### Configuration Fields

none

#### Input Metadata

* **Url** - (string, required): Path of the resource. e.g.: `/2/users/me`

* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body or Query** - (object, optional): Body of the request to send for `POST`, `PUT`, and `PATCH` or query for `GET` and `DELETE` methods
<details>
  <summary>Examples</summary>

  #### Get logged user information with creation date using Url 
  ![image](https://github.com/elasticio/twitter-component/assets/7985390/0bbc07d1-b5ff-4856-a6d1-b553d345e55c)
  ```json
  {
    "method": "GET",
    "url": "/2/users/me?user.fields=created_at"
  }
  ```

  #### Get logged user information with creation date using `Request Body or Query` field
  ![image](https://github.com/elasticio/twitter-component/assets/7985390/ad3251dc-0114-4620-b55a-81f830fb5159)
  ```json
{
  "method": "GET",
  "url": "/2/users/me",
  "data": {
    "user.fields": "created_at"
    }
}
  ```
</details>

#### Output Metadata

* **headers** - (object, required): HTTP headers of the response.
* **responseBody** - (object, optional): HTTP response body.

## Triggers
