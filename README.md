# Validator

Is a Thunderbird plugin in development, it's to detect when the real sender is not sending that email you received, for example in phishing, credit fraud, etc… It's in development because need to finish the front end, the plugin itself and keep doing the research to get a better score, also getting more information of emails, so it can detect when is not the real sender.

# Values
The values here is to use a scale from 5 to 0, 5 showing that is a trustful email, and 0 that must be an untrusted email (Phishing, etc...)
It can also display a number 6, when this happens because the sender is not in the BD, so it can mean 2 things, we just dont have collected information about that sender, or it trying to make a phishing email with a similar sender so its not in the BD, so you must be carefull.

(In development)
Change the color of the circle at the side of the name, changes in function of the score:
Green is when the score is 4.0 or higher.
Yellow is when the score is between 3.9 and 2.5.
Reg is when the score is below 2.4.
Grey is the default color or when the email is not at the DB.

# Privacy.
This plugin WILL NOT storage any of your information and will never read the body of the email (Where the message of the sender is).

## Installation

1. Download the source code.
2. ![Clone](https://github.com/CasperClous/Validator-TB-Plugin/blob/main/clone.gif)
3. Get into the folder "Validator-TB-Plugin".
4. Run `make` to generate the `xpi` file.
5. ![Gen XPI](https://github.com/CasperClous/Validator-TB-Plugin/blob/main/XPI.gif)
6. In Thunderbird, go to the `Add-ons Manager`.
7. Click `Install Add-on From File...` and select the `xpi` file from step 2.
![Install](https://github.com/CasperClous/Validator-TB-Plugin/blob/main/PlugInstal.gif)
