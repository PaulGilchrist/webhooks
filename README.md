# webhooks - Simple GitHub Webhook Example

## Usage
* Download ngrok from https://ngrok.com/download
* Expose this webhook to the internet (temporarily for development testing only)
```cmd
./ngrok http 4567
```
* Generate a secret to use with GitHub or other webhook sender and use it on GitHub test repo webhook secret and below args["secret"]
```cmd
ruby -rsecurerandom -e 'puts SecureRandom.hex(20)'
```

[nodemon](https://nodemon.io) can optinally be used to simulate environment variables