# Validator

Is a Thunderbird plugin in development, it's to detect when the real sender is not sending that email you received, for example in phishing, credit fraud, etc… It's in development because need to finish the front end, the plugin itself and keep doing the research to get a better score, also getting more information of emails, so it can detect when is not the real sender.

# Values
The values here is to use a scale from 5 to 1, 5 showing that is a trustful email, and 1 that must be an untrusted email (Phishing, etc...)
It can also display a number 6, when this happens because the sender is not in the BD.

(In development)
Change the color of the circle at the side of the name, changes in function of the score:
Green is when the score is 4.0 or higher.
Yellow is when the score is between 3.9 and 2.8.
Reg is when the score is below 2.7.
Grey is the default color or when the email is not at the DB.

# Privacy.
This plugin WILL NOT storage any of your information and will never read the body of the email (Where the message of the sender is).

## Installation

1. Download the source code.
2. Get into the folder "Validator-TB-Plugin".
3. Run `make` to generate the `xpi` file.
4. In Thunderbird, go to the `Add-ons Manager`.
5. Click `Install Add-on From File...` and select the `xpi` file from step 2.
