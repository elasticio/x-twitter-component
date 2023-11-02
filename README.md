# Twitter Component

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Post tweet](#post-tweet) 
  * [Make Raw Request](#make-raw-request)
* [Triggers](#triggers)

## Description

Twitter Component is designed to connect with Twitter API v2

## Credentials

To authenticate component you will need to create App in [developer portal’s App page](https://developer.twitter.com/en/portal/projects-and-apps), component use OAuth 1.0a. [more info](https://developer.twitter.com/en/docs/apps/overview)

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

* **id** - (string, required): Unique identifier for your tweet
* **text** - (string, required): Text of your tweet 
* **edit_history_tweet_ids** - (array, required): list of tweet ids edit history
  
### Make Raw Request 

Executes custom request.

#### Configuration Fields

none

#### Input Metadata

* **Url** - (string, required): Path of the resource. ex: `/2/users/me`
* **Method** - (string, required): HTTP verb to use in the request, one of `get`, `post`, `put`, `patch`, `delete`.
* **Request Body or Query** - (object, optional): Body of the request to send for `post`, `put`, and `patch` or query for `get` and `delete` methods
<details>
  <summary>Examples</summary>

  #### Get logged user information with creation date using Url 
  ![image](https://github.com/elasticio/twitter-component/assets/7985390/c01ac661-01d4-41a6-8e18-e0b2420a6fd1)
  ```json
  {
    "method": "get",
    "url": "/2/users/me?user.fields=created_at"
  }
  ```

  #### Get logged user information with creation date using `Request Body or Query` field
  ![image](https://github.com/elasticio/twitter-component/assets/7985390/5464f571-03cd-4d54-a974-e1b924ae6338)
  ```json
{
  "method": "get",
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
