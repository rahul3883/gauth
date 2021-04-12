# g-auth

Get tokens for your google account.

## Install

```shell script
npm i @rahul171/gauth -g
```

## Prerequisite

1) Create a `config.json` file having the following schema:

```typescript
{
  // Client Id of your google cloud project.
  clientId: string;
  
  // Client Secret of your google cloud project.
  clientSecret: string;
  
  // Scopes you want access to.
  scopes: string[];
  
  // Port to start the application on.
  port: number;
}
```
2) Add `http://localhost:<port>/gac` as a redirect url to your Google cloud project.
   (replace `<port>` with the port number you specified in the `config.json` file)

## Usage

#### Run the program
```shell script
$ gauth [--config /path/to/client.json]
```
It will start a http server listening on port provided in `config.json` file.

Note: If you don't provide `--config` option, it will take `client.json` file from the current working directory.
